/*!
 * Copyright © 2015 Richard Huang <rickypc@users.noreply.github.com>
 * All rights reserved.
 */

import { normalizeRoute } from '@site/src/data/common';

type ModelContext = {
  registerTool?: (descriptor: ToolDescriptor, options?: { signal?: AbortSignal }) => unknown;
  unregisterTool?: (name: string) => unknown;
};

type NavigateDomain = 'doc' | 'page';

export type ToolDescriptor = {
  description: string;
  execute: (
    args?: Record<string, unknown>,
    signal?: AbortSignal,
  ) => ToolOutcome | Promise<ToolOutcome>;
  inputSchema?: ToolInputSchema;
  name: string;
};

export type ToolInputProperty = {
  description?: string;
  enum?: string[];
  type: string;
};

export type ToolInputSchema = {
  properties?: Record<string, ToolInputProperty>;
  required?: string[];
  type: string;
};

export type ToolOutcome = Record<string, unknown> & {
  error?: string;
  truncated?: boolean;
};

const capOutcome = (outcome: ToolOutcome | undefined): ToolOutcome => {
  if (!outcome || typeof outcome !== 'object') {
    return {};
  }
  let truncated = false;
  const capped = Object.fromEntries(
    Object.entries(outcome).map(([key, value]) => {
      const over = Array.isArray(value) && value.length > MODEL_CONTEXT_RESULT_CAP;
      truncated ||= over;
      return [key, over ? value.slice(0, MODEL_CONTEXT_RESULT_CAP) : value];
    }),
  ) as ToolOutcome;
  return truncated ? { ...capped, truncated } : capped;
};

export const getModelContext = (): ModelContext | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const { modelContext: context } = document as typeof document & { modelContext?: ModelContext };
  return context && typeof context === 'object' ? context : undefined;
};

const isAborted = (error: unknown, signal: AbortSignal, executeSignal?: AbortSignal) =>
  signal.aborted || executeSignal?.aborted || (error as Error)?.name === 'AbortError';

const isObjectArgs = (args: unknown): args is Record<string, unknown> | undefined =>
  args === undefined || (typeof args === 'object' && !Array.isArray(args));

const messageOf = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export const MODEL_CONTEXT_RESULT_CAP = 12;

/**
 * Builds the same-origin navigation tool for one domain so the pages and docs mounts
 * share one matcher and one allowance of routes.
 * @param {object} options - The routes the agent may reach, the router push, and the domain.
 * @param {readonly string[]} options.routes - The domain's allowlisted routes.
 * @param {(path: string) => void} options.navigate - The router push wrapper.
 * @param {NavigateDomain} options.domain - Either 'doc' or 'page'.
 * @returns {ToolDescriptor} The domain-scoped navigate tool descriptor.
 */
export const navigateTool = (options: {
  domain: NavigateDomain;
  navigate: (path: string) => void;
  routes: readonly string[];
}): ToolDescriptor => {
  const { domain, navigate, routes } = options;
  const routeError = () => ({
    error: `navigate expects one of the site ${domain} routes: ${routes.join(', ')}`,
  });
  return {
    description: `Navigates to another ${domain} route of this site.`,
    execute: (args) => {
      const path = args?.path;
      if (typeof path !== 'string' || path.trim() === '') {
        return routeError();
      }
      const target = routes.find((route) => normalizeRoute(route) === normalizeRoute(path));
      if (target === undefined) {
        return routeError();
      }
      navigate(target);
      return { path: target };
    },
    inputSchema: {
      properties: { path: { description: `A ${domain} route of this site.`, type: 'string' } },
      type: 'object',
    },
    name: 'navigate',
  };
};

// Before registerTools assignment.
const wrapTool = (descriptor: ToolDescriptor, signal: AbortSignal): ToolDescriptor => ({
  ...descriptor,
  execute: async (args, executeSignal) => {
    if (!isObjectArgs(args)) {
      return { error: `Tool ${descriptor.name} expects an object (received ${typeof args})` };
    }
    try {
      return capOutcome(await descriptor.execute(args, executeSignal ?? signal));
    } catch (error) {
      return isAborted(error, signal, executeSignal) ? {} : { error: messageOf(error) };
    }
  },
});

/**
 * Registers validated tool descriptors with the host model context and returns the
 * cancellation handle. The return union is deliberate: `undefined` means the context is
 * absent (or the caller's signal already aborted), `{ error }` means the descriptor list
 * was rejected, and an `AbortController` is a live registration.
 * @param {readonly ToolDescriptor[]} tools - The descriptors to register.
 * @param {object} [options] - Optional caller-owned abort signal.
 * @param {AbortSignal} [options.signal] - Optional caller-owned abort signal.
 * @returns {AbortController | { error: string } | undefined} Cancellation handle, or the failure reason.
 */
export const registerTools = (
  tools: readonly ToolDescriptor[],
  options: { signal?: AbortSignal } = {},
): AbortController | { error: string } | undefined => {
  const context = getModelContext();
  if (!context || typeof context.registerTool !== 'function' || options.signal?.aborted) {
    return undefined;
  }
  const valid = (tool?: ToolDescriptor) =>
    !!tool
    && typeof tool.name === 'string'
    && tool.name.length > 0
    && typeof tool.description === 'string'
    && typeof tool.execute === 'function';
  if (!Array.isArray(tools) || tools.length === 0 || !tools.every(valid)) {
    const error = 'registerTools expects a non-empty array of validated tool descriptors';
    console.error(error);
    return { error };
  }
  const controller = new AbortController();
  const registered: string[] = [];
  const unregisterAll = () => {
    for (const name of registered.splice(0)) {
      try {
        context.unregisterTool?.(name);
      } catch {
        // Unregistration is best effort; a host restart supersedes it.
      }
    }
  };
  controller.signal.addEventListener('abort', unregisterAll, { once: true });
  options.signal?.addEventListener('abort', () => controller.abort(), { once: true });
  try {
    for (const tool of tools) {
      context.registerTool(wrapTool(tool, controller.signal), { signal: controller.signal });
      registered.push(tool.name);
    }
  } catch (error) {
    controller.abort();
    return { error: messageOf(error) };
  }
  return controller;
};
