/*! For license information please see common.4826b982.js.LICENSE.txt */
"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[76],{8561:(e,n,t)=>{t.d(n,{A:()=>z});var i=t(6540),o=t(4848);function r(e){const{mdxAdmonitionTitle:n,rest:t}=function(e){const n=i.Children.toArray(e),t=n.find((e=>i.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),r=n.filter((e=>e!==t)),s=t?.props.children;return{mdxAdmonitionTitle:s,rest:r.length>0?(0,o.jsx)(o.Fragment,{children:r}):null}}(e.children),r=e.title??n;return{...e,...r&&{title:r},children:t}}var s=t(4164),a=t(5630),c=t(6745);const l={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function d(e){let{type:n,className:t,children:i}=e;return(0,o.jsx)("div",{className:(0,s.A)(c.G.common.admonition,c.G.common.admonitionType(n),l.admonition,t),children:i})}function u(e){let{icon:n,title:t}=e;return(0,o.jsxs)("div",{className:l.admonitionHeading,children:[(0,o.jsx)("span",{className:l.admonitionIcon,children:n}),t]})}function m(e){let{children:n}=e;return n?(0,o.jsx)("div",{className:l.admonitionContent,children:n}):null}function h(e){const{type:n,icon:t,title:i,children:r,className:s}=e;return(0,o.jsxs)(d,{type:n,className:s,children:[i||t?(0,o.jsx)(u,{title:i,icon:t}):null,(0,o.jsx)(m,{children:r})]})}function f(e){return(0,o.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const p={icon:(0,o.jsx)(f,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function g(e){return(0,o.jsx)(h,{...p,...e,className:(0,s.A)("alert alert--secondary",e.className),children:e.children})}function v(e){return(0,o.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const y={icon:(0,o.jsx)(v,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function w(e){return(0,o.jsx)(h,{...y,...e,className:(0,s.A)("alert alert--success",e.className),children:e.children})}function x(e){return(0,o.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const b={icon:(0,o.jsx)(x,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function j(e){return(0,o.jsx)(h,{...b,...e,className:(0,s.A)("alert alert--info",e.className),children:e.children})}function k(e){return(0,o.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const A={icon:(0,o.jsx)(k,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function C(e){return(0,o.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const E={icon:(0,o.jsx)(C,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const N={icon:(0,o.jsx)(k,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const S={...{note:g,tip:w,info:j,warning:function(e){return(0,o.jsx)(h,{...A,...e,className:(0,s.A)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,o.jsx)(h,{...E,...e,className:(0,s.A)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,o.jsx)(g,{title:"secondary",...e}),important:e=>(0,o.jsx)(j,{title:"important",...e}),success:e=>(0,o.jsx)(w,{title:"success",...e}),caution:function(e){return(0,o.jsx)(h,{...N,...e,className:(0,s.A)("alert alert--warning",e.className),children:e.children})}}};function z(e){const n=r(e),t=(i=n.type,S[i]||(console.warn(`No admonition component found for admonition type "${i}". Using Info as fallback.`),S.info));var i;return(0,o.jsx)(t,{...n})}},4977:(e,n,t)=>{t.d(n,{$z:()=>r,Eb:()=>a,_O:()=>s,gF:()=>o,z$:()=>i});const i=function(e,n){return void 0===n&&(n={}),{"aria-label":e,title:e,...n}},o={print:{text:"The print content is not ready. Please try again.",type:"warning"},speech:{text:"Change or update your browser for a better experience.",type:"warning"}};function r(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.filter((e=>e&&"string"==typeof e)).join(" ")}const s=function(e){let{description:n="Engineering Leader, Full Stack Developer, Smart Creative, Innovator",keywords:t=["ricky huang","richard huang","full stack developer","professional software engineer","engineering leader","value proposition","technical innovation","technology foundation","business strategy","business objective","software engineering","innovator","smart creative","secure product","high quality","master degree"],title:i="Engineering Leader, Full Stack Developer, Smart Creative, Innovator"}=void 0===e?{}:e;return JSON.stringify({"@context":"https://schema.org/","@type":"ProfilePage",description:n,headline:"Ricky Huang Leadership, Full Stack Development, Innovation, and Characteristic",keywords:t.join(","),mainEntity:{"@id":"https://ricky.one#Person","@type":"Person",address:{"@type":"PostalAddress",addressLocality:"Orange County",addressRegion:"CA"},alumniOf:[{"@type":"OrganizationRole",alumniOf:{"@type":"CollegeOrUniversity",name:"California State University, Fullerton",sameAs:"https://en.wikipedia.org/wiki/California_State_University,_Fullerton"},startDate:"2007"},{"@type":"OrganizationRole",alumniOf:{"@type":"CollegeOrUniversity",name:"Petra Christian University",sameAs:"https://en.wikipedia.org/wiki/Petra_Christian_University"},startDate:"1997"}],familyName:"Huang",gender:"Male",givenName:"Richard",honorificSuffix:"MSE",image:"https://ricky.one/img/self.png",jobTitle:"Engineering Leader, Full Stack Developer, Smart Creative, Innovator",name:"Ricky Huang",nationality:{"@type":"Country",name:"USA",sameAs:"https://en.wikipedia.org/wiki/United_States"},sameAs:["https://hub.docker.com/u/rickypc","https://github.com/rickypc","https://keybase.io/rickypc","https://libraries.io/github/rickypc","https://www.linkedin.com/in/rihuang","https://www.npmjs.com/~rickypc"],worksFor:{"@type":"Organization",name:"Experian",sameAs:"https://en.wikipedia.org/wiki/Experian"}},name:i,url:"https://ricky.one"})},a=function(e,n,t,i,o){void 0===n&&(n=""),void 0===t&&(t="-"),void 0===i&&(i=""),void 0===o&&(o="");const r=i?`${o}${i}`:"";return`${n?`${n}${t}`:""}${e.toLowerCase().replace(/\s+/,"-").replace(/\.[^/.]+$/,"")}${r}`}},6962:(e,n,t)=>{t.d(n,{Qf:()=>a,W4:()=>m,c5:()=>u,fw:()=>c,mt:()=>d});var i=t(4977),o=t(6540),r=t(8557);const s="docusaurus";function a(e){const[n,t]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{const n=window.matchMedia(e),i=e=>t(e.matches);return i(n),n.addEventListener("change",i),()=>n.removeEventListener("change",i)}),[e]),[n]}function c(){const[e,n]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{const e={once:!1,scroll:{back:!1,bottom:!1,top:0===window.scrollY},scrollbar:20,scrollHeight:document.body.scrollHeight},t=async t=>{if(e.once)return;e.once=!0;const{clientHeight:i}=document.documentElement,{scrollY:o}=window;0===o||e.scroll.top||(e.scroll.back=!0,t.target.scrollTo(0,0)),i===e.scrollHeight||e.scroll.bottom||(e.scroll.back&&await new Promise((e=>{setTimeout(e,500)})),e.scroll.back=!0,t.target.scrollTo(0,e.scrollHeight)),e.scroll.back&&(await new Promise((e=>{setTimeout(e,500)})),t.target.scrollTo(0,o)),n(!0)},i=()=>{if(e.scroll.bottom&&e.scroll.top)n((e=>e||!0));else{const{clientHeight:n}=document.documentElement,{scrollY:t}=window;e.scrollHeight-n-e.scrollbar<t&&(e.scroll.bottom=!0),t<e.scrollbar&&(e.scroll.top=!0)}};return window.addEventListener("beforeprint",t),window.addEventListener("scroll",i),()=>{window.removeEventListener("beforeprint",t),window.removeEventListener("scroll",i)}}),[]),[e]}const l="undefined"!=typeof window?o.useLayoutEffect:o.useEffect;function d(){const[e,n]=(0,o.useState)();return(0,o.useEffect)((()=>{n("undefined"!=typeof speechSynthesis&&"undefined"!=typeof SpeechSynthesisUtterance)}),[]),[e]}function u(e){let{ref:n=(0,o.useRef)(),threshold:t=1,...i}=void 0===e?{}:e;const[r,s]=(0,o.useState)(!1),a=(0,o.useCallback)((()=>s("visible"===document.visibilityState)),[]);return(0,o.useEffect)((()=>{const{current:e}=n;let o;return e&&(o=new IntersectionObserver((e=>{let[n]=e;s(n.isIntersecting)}),{threshold:t,...i}),o.observe(e)),()=>o?.unobserve(e)}),[n,i,t]),l((()=>(document.addEventListener("visibilitychange",a),()=>document.removeEventListener("visibilitychange",a))),[]),{ref:n,visible:r}}function m(e){let{navigation:n=!0}=void 0===e?{}:e;const t=(0,r.A)();(0,o.useEffect)((()=>{t&&top===window&&(document.getElementById(`__${s}`).className=(0,i.$z)(!n&&`${s}--exclusive`,`${s}--welcome`))}),[t,n])}}}]);