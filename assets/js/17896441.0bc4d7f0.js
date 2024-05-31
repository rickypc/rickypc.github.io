/*! For license information please see 17896441.0bc4d7f0.js.LICENSE.txt */
"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[401],{9033:(e,t,n)=>{n.d(t,{A:()=>h});var r=n(4977),a=n(5793),s=n(6595),i=n(2627),l=n(6540),c=n(5556),o=n.n(c),d=n(4848);const p=(0,l.forwardRef)(((e,t)=>{let{children:n,className:l,...c}=e;return(0,d.jsx)(a.F,{features:s.l,children:(0,d.jsx)(i.m.button,{className:(0,r.$z)("clean-btn",l),ref:t,type:"button",...c,children:n})})}));p.displayName="Button",p.propTypes={children:o().oneOfType([o().arrayOf(o().node),o().node]),className:o().string};const h=(0,l.memo)(p)},4862:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(5793),a=n(6595),s=n(7667),i=n(2627),l=n(4977),c=n(6540),o=n(8849),d=n(5556),p=n.n(d),h=n(6962);const u="picture_PCRc",g="shimmer_JYe1";var m=n(4848);const f=(0,c.memo)((function(e){let{alt:t,className:n,onLoad:o,picture:d,ref:p,...f}=e;const{images:y}=d?.fallback?.src||{},[{background:j,fit:b,loaded:x,show:v},k]=(0,c.useState)({background:!0,fit:y?.[0]||{width:0},loaded:!1,show:!1});p=p||(0,c.useRef)();const{visible:w}=(0,h.c5)({ref:p,threshold:.1}),N=(0,c.useCallback)((e=>{k((e=>e.loaded?e:{...e,loaded:!0})),o?.(e),setTimeout((()=>k((e=>e.background?{...e,background:!1}:e))),450)}),[o]);return(0,c.useEffect)((()=>{if(p?.current){let e=y;const t=p.current.clientWidth||p.current.parentNode.clientWidth;Array.isArray(e)||"string"!=typeof d?.fallback||(e=[{path:d.fallback,width:t}]),k((n=>{const r=e?.find((e=>e.width>=t))||e?.slice(-1)?.[0];return r.path===n.fit?.path?n:{...n,fit:r}}))}}),[y,d,p]),(0,c.useEffect)((()=>{w&&k((e=>e.show?e:{...e,show:!0}))}),[w]),(0,m.jsx)("picture",{className:(0,l.$z)(n,u,j&&!d.fallback?.preSrc&&g),ref:p,style:j&&d.fallback?.preSrc?{backgroundImage:`url(${d.fallback?.preSrc})`}:{},children:(0,m.jsx)(r.F,{features:a.l,children:(0,m.jsx)(s.N,{children:v&&(0,m.jsxs)(m.Fragment,{children:[d?.avif&&(0,m.jsx)("source",{srcSet:d.avif,type:"image/avif"}),d?.webp&&(0,m.jsx)("source",{srcSet:d.webp,type:"image/webp"}),d?.fallback&&(0,c.createElement)(i.m.img,{...f,alt:x?t:null,animate:{opacity:x?1:0},draggable:!1,height:b.height,initial:{opacity:0},key:(0,l.Eb)(t,"picture"),onLoad:N,src:b.path,srcSet:d.fallback?.src?.srcSet,transition:{duration:.5,ease:"easeInOut"},width:b.width})]})})})})}));f.propTypes={alt:p().string,className:p().string,onLoad:p().func,picture:p().shape({avif:p().string,fallback:p().oneOfType([p().shape(),p().string]),webp:p().string}),ref:p().oneOfType([p().func,p().shape({current:p().shape()})])};const y=(0,c.forwardRef)(((e,t)=>{let{link:n,...r}=e;return n?(0,m.jsx)(o.A,{...n,children:(0,m.jsx)(f,{ref:t,...r})}):(0,m.jsx)(f,{ref:t,...r})}));y.displayName="Image",y.propTypes={link:p().shape({className:p().string,href:p().string,title:p().string,whileTap:p().shape({scale:p().number})})};const j=(0,c.memo)(y)},8849:(e,t,n)=>{n.d(t,{A:()=>g});var r=n(4977),a=n(5793),s=n(6595),i=n(2627),l=n(6540),c=n(5556),o=n.n(c),d=n(2088);const p="link_uBI6";var h=n(4848);const u=(0,l.forwardRef)(((e,t)=>{let{children:n,className:l,href:c,title:o,validate:u=!1,...g}=e;const m=(0,d.A)();return c&&!["https://",".pdf"].filter((e=>c.includes(e))).length&&m.collectLink(c),!u||u&&c?(0,h.jsx)(a.F,{features:s.l,children:(0,h.jsx)(i.m.a,{...(0,r.z$)(o),className:(0,r.$z)(l,p),href:c,ref:t,rel:c?.includes("https://")?"noopener noreferrer":null,target:c?.includes("https://")?"_blank":null,...g,children:n})}):(0,h.jsx)("span",{className:l,children:n})}));u.displayName="Link",u.propTypes={children:o().oneOfType([o().arrayOf(o().node),o().node]).isRequired,className:o().string,href:o().string,title:o().string,validate:o().bool};const g=(0,l.memo)(u)},5242:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(8561),a=n(4977),s=n(6540),i=n(6962);const l="admonition_sD_b";var c=n(4848);const o=(0,s.memo)((function(){const[e]=(0,i.fw)();return!e&&(0,c.jsx)("aside",{"aria-hidden":"true",className:(0,a.$z)(l,"row"),children:(0,c.jsx)("div",{className:"col",children:(0,c.jsx)(r.A,{type:a.gF.print.type,children:(0,c.jsx)("p",{children:a.gF.print.text})})})})}))},1875:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(8561),a=n(9033),s=n(4977),i=n(1414),l=n(6540),c=n(5556),o=n.n(c),d=n(6962);const p="controls_Z1tt",h="control_y43M";var u=n(4848);function g(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M3,21 L9,21 L9,3 L3,3 L3,21 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z"},child:[]}]})(e)}function m(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polygon",attr:{fill:"none",strokeWidth:"2",points:"3 22 21 12 3 2"},child:[]}]})(e)}function f(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M1,20 L6,20 L6,4 L1,4 L1,20 Z M11,19.0000002 L22,12 L11,5 L11,19.0000002 Z"},child:[]}]})(e)}function y(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"rect",attr:{width:"16",height:"16",x:"4",y:"4",fill:"none",strokeWidth:"2"},child:[]}]})(e)}const j=(0,l.memo)(Object.assign((function(e){let{children:t,className:n,lang:i="id-ID",names:c,pitch:o=1,rate:j=.9,volume:b=1}=e;const[{paused:x,playing:v},k]=(0,l.useState)({paused:!1,playing:!1}),[w]=(0,d.mt)(),N=(0,l.useRef)(),_="string"==typeof t?t:t?.props?.children,A=(0,l.useRef)(),[L,T]=(0,l.useState)({lang:null}),O=(0,l.useCallback)((()=>{N.current?.pause(),k({paused:!0,playing:!1})}),[]),$=(0,l.useCallback)((async()=>{N.current?.speaking&&(N.current?.cancel(),await new Promise((e=>{setTimeout(e,250)}))),N.current?.speak(A.current),k({paused:!1,playing:!0})}),[]),S=(0,l.useCallback)((()=>{N.current?.resume(),k({paused:!1,playing:!0})}),[]),z=(0,l.useCallback)((()=>{N.current?.cancel(),k({paused:!1,playing:!1})}),[]);return(0,l.useEffect)((()=>{const e=c?.length?c:["Damayanti","Microsoft Gadis Online (Natural) - Indonesian (Indonesia)","Google Bahasa Indonesia"];(async()=>{let t=speechSynthesis?.getVoices();t?.length||(await new Promise((e=>{speechSynthesis?.addEventListener("voiceschanged",e,{once:!0})})),t=speechSynthesis?.getVoices());let n=t.find((t=>e.includes(t.name)));if(i&&"string"!=typeof n?.lang)if((t[0]?.lang?.split(/-_/g)?.[0]?.length||0)>2){const e=i.split("-")[0];n=t.find((t=>t.lang?.startsWith(e)))}else n=t.find((e=>e.lang?.replace(/_/g,"-")===i));"string"!=typeof n?.lang&&(n={lang:!1}),T(n)})()}),[i,c]),(0,l.useEffect)((()=>(w&&(async()=>{N.current=speechSynthesis,A.current=new SpeechSynthesisUtterance(_),A.current.addEventListener("end",z),A.current.addEventListener("error",z),A.current.pitch=o,A.current.rate=j,A.volume=b,"string"==typeof L?.lang&&(A.current.lang=L.lang,A.current.voice=L)})(),()=>{N.current?.cancel(),A.current?.removeEventListener("end",z),A.current?.removeEventListener("error",z)})),[z,o,j,w,_,L,b]),(0,u.jsxs)(u.Fragment,{children:[w&&!1===L?.lang&&(0,u.jsx)(r.A,{type:"info",children:(0,u.jsx)("p",{children:`${new Intl.DisplayNames(["en"],{type:"language"}).of(i)} voice is not available in this browser. Please try different browser.`})}),(0,u.jsxs)("div",{className:p,children:[v&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a.A,{...(0,s.z$)("Stop"),className:(0,s.$z)(n,h),onClick:z,whileTap:{scale:.85},children:(0,u.jsx)(y,{})}),(0,u.jsx)(a.A,{...(0,s.z$)("Pause"),className:(0,s.$z)(n,h),onClick:O,whileTap:{scale:.85},children:(0,u.jsx)(g,{})})]}),!v&&!!_?.length&&"string"==typeof L?.lang&&(0,u.jsx)(a.A,{...(0,s.z$)(x?"Resume":"Play"),className:(0,s.$z)(n,h),onClick:x?S:$,whileTap:{scale:.85},children:x?(0,u.jsx)(f,{}):(0,u.jsx)(m,{})})]})]})}),{propTypes:{children:o().oneOfType([o().arrayOf(o().node),o().node]),className:o().string,lang:o().string,names:o().arrayOf(o().string),pitch:o().number,rate:o().number,volume:o().number}}))},4970:(e,t,n)=>{n.d(t,{A:()=>C});var r=n(4991),a=n(3973),s=n(7192),i=n(6540),l=n(5556),c=n.n(l),o=n(4848);const d=(0,i.memo)(Object.assign((function(e){let{chinese:t,sanskrit:n,tibetan:r}=e;return(0,o.jsxs)(o.Fragment,{children:[n&&(0,o.jsxs)(s.A,{title:n.title,children:[n.children,"\u0965"]}),r&&(0,o.jsxs)(s.A,{title:r.title,children:[r.children,"\u0f0e"]}),t&&(0,o.jsxs)(s.A,{title:t.title,children:[t.children,"\u3002"]})]})}),{propTypes:{chinese:c().shape(),sanskrit:c().shape(),tibetan:c().shape()}}));var p=n(1414),h=n(4862),u=n(4977),g=n(8849),m=n(8687),f=n(1875);const y={"arya-tara":["roll","#buddhism/phrases/_arya_tara.js"],"dependent-origination":["roll","#buddhism/phrases/_dependent_origination.js"],"rakta-tara":["roll","#buddhism/phrases/_rakta_tara.js"],"sita-tara":["roll","#buddhism/phrases/_sita_tara.js"]},j="instruction_AjaQ",b="picture_vvTR",x="phrase_iqIa",v="support_gbZm",k="badge_a6NP",w="roll_u7ld";function N(e){return(0,p.k5)({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z"},child:[]}]})(e)}const _=(0,i.memo)((function(e){let{image:t,text:n,transliteration:r}=e;return t?(0,o.jsxs)(m.A,{children:[(0,o.jsx)("summary",{children:n||r.title}),(0,o.jsx)(h.A,{alt:r.title,className:b,picture:{fallback:t}})]}):n?(0,o.jsx)("div",{className:j,children:n}):void 0}));_.propTypes={image:c().string,text:c().oneOfType([c().arrayOf(c().node),c().node,c().string]),transliteration:c().shape()};const A=(0,i.memo)(Object.assign((function(e){let{value:t=1}=e;return t<2?null:(0,o.jsx)("span",{className:(0,u.$z)(k,"badge","badge--primary"),title:`Preferred repetition: ${t} times`,children:`${t}x`})}),{propTypes:{value:c().number}})),L=(0,i.memo)((function(e){let{repetition:t=0,transliteration:n}=e;return t||Object.prototype.hasOwnProperty.call(y,n?.pdf)||n.repetition||n.speech?(0,o.jsxs)("div",{className:v,children:[(0,o.jsx)(A,{value:t||n.repetition}),Object.prototype.hasOwnProperty.call(y,n?.pdf)&&(0,o.jsx)(g.A,{className:w,href:(0,u.Eb)(n.pdf,"/pdf","/","pdf","."),rel:"noopener noreferrer",target:"_blank",title:`Open ${n.title} mantra roll`,children:(0,o.jsx)(N,{})}),(0,o.jsx)(f.A,{children:n.speech})]}):null}));L.propTypes={repetition:c().number,transliteration:c().shape()};const T=(0,i.memo)(Object.assign((function(e){let{image:t,instruction:n,repetition:r=0,transliteration:a}=e;return a?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_,{image:t,text:n,transliteration:a}),(0,o.jsxs)(s.A,{className:x,language:"js",children:[a.className&&`// ${a.className}\n`,a.children,"\u0965"]}),(0,o.jsx)(L,{repetition:r,transliteration:a})]}):null}),{propTypes:{image:c().string,instruction:c().node,repetition:c().number,transliteration:c().shape()}}));var O=n(5242),$=n(8561),S=n(6962);const z="admonition_vZD4",F=(0,i.memo)((function(){const[e]=(0,S.mt)();return!1===e&&(0,o.jsx)("aside",{"aria-hidden":"true",className:(0,u.$z)(z,"row"),children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)($.A,{type:u.gF.speech.type,children:(0,o.jsx)("p",{children:u.gF.speech.text})})})})})),E=(0,i.memo)(Object.assign((function(e){let{navigation:t=!1}=e;return(0,S.W4)({navigation:t}),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(O.A,{}),(0,o.jsx)(F,{})]})}),{propTypes:{navigation:c().bool}})),C={...a.A,Link:r.A,MultiLingual:d,Phrase:T,Welcome:E}}}]);