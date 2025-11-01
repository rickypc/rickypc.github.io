/*!
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 * ----------------------------------------------------------------------------
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundContent from '@theme/NotFound/Content';
import { useWelcome } from '@site/src/hooks/observer';

jest.unmock('@theme/NotFound/Content');

describe('theme.NotFound.Content', () => {
  it('calls useWelcome with navigation default false and forwards props to original NotFoundContent', () => {
    render(<NotFoundContent some="prop" />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    const el = screen.getByTestId('content');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('some')).toBe('prop');
  });

  it('when navigation prop true, useWelcome is called with navigation true and navigation is not forwarded', () => {
    render(<NotFoundContent navigation other="x" />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: true });

    const el = screen.getByTestId('content');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('other')).toBe('x');
  });

  it('preserves arbitrary props and rerender calls hook again and updates forwarded props', () => {
    const props = { a: 1, b: 'two' };
    const { rerender } = render(<NotFoundContent {...props} />);

    expect(useWelcome).toHaveBeenCalledTimes(1);
    expect(useWelcome).toHaveBeenCalledWith({ navigation: false });

    let el = screen.getByTestId('content');
    expect(el.getAttribute('a')).toEqual(props.a.toString());
    expect(el.getAttribute('b')).toEqual(props.b);

    rerender(<NotFoundContent {...props} b="changed" />);
    expect(useWelcome).toHaveBeenCalledTimes(2);

    el = screen.getByTestId('content');
    expect(el.getAttribute('a')).toEqual(props.a.toString());
    expect(el.getAttribute('b')).toBe('changed');
  });
});
