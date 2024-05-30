/*! For license information please see 17896441.9c7c2968.js.LICENSE.txt */
"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[401],{9033:(e,t,n)=>{n.d(t,{A:()=>p});var r=n(4977),s=n(5793),a=n(6595),i=n(2627),l=n(6540),c=n(5556),o=n.n(c),d=n(4848);const h=(0,l.forwardRef)(((e,t)=>{let{children:n,className:l,...c}=e;return(0,d.jsx)(s.F,{features:a.l,children:(0,d.jsx)(i.m.button,{className:(0,r.$z)("clean-btn",l),ref:t,type:"button",...c,children:n})})}));h.displayName="Button",h.propTypes={children:o().oneOfType([o().arrayOf(o().node),o().node]),className:o().string};const p=(0,l.memo)(h)},4862:(e,t,n)=>{n.d(t,{A:()=>b});var r=n(5793),s=n(6595),a=n(7667),i=n(2627),l=n(4977),c=n(6540),o=n(8849),d=n(5556),h=n.n(d),p=n(6962);const u="picture_PCRc",g="shimmer_JYe1";var f=n(4848);const m=(0,c.memo)((function(e){let{alt:t,className:n,onLoad:o,picture:d,ref:h,...m}=e;const{images:y}=d?.fallback?.src||{},[{background:b,fit:j,loaded:x,show:v},k]=(0,c.useState)({background:!0,fit:y?.[0]||{width:0},loaded:!1,show:!1});h=h||(0,c.useRef)();const{visible:w}=(0,p.c5)({ref:h,threshold:.1}),N=(0,c.useCallback)((e=>{k((e=>e.loaded?e:{...e,loaded:!0})),o?.(e),setTimeout((()=>k((e=>e.background?{...e,background:!1}:e))),450)}),[o]);return(0,c.useEffect)((()=>{if(h?.current){let e=y;const t=h.current.clientWidth||h.current.parentNode.clientWidth;Array.isArray(e)||"string"!=typeof d?.fallback||(e=[{path:d.fallback,width:t}]),k((n=>{const r=e?.find((e=>e.width>=t))||e?.slice(-1)?.[0];return r.path===n.fit?.path?n:{...n,fit:r}}))}}),[y,d,h]),(0,c.useEffect)((()=>{w&&k((e=>e.show?e:{...e,show:!0}))}),[w]),(0,f.jsx)("picture",{className:(0,l.$z)(n,u,b&&!d.fallback?.preSrc&&g),ref:h,style:b&&d.fallback?.preSrc?{backgroundImage:`url(${d.fallback?.preSrc})`}:{},children:(0,f.jsx)(r.F,{features:s.l,children:(0,f.jsx)(a.N,{children:v&&(0,f.jsxs)(f.Fragment,{children:[d?.avif&&(0,f.jsx)("source",{srcSet:d.avif,type:"image/avif"}),d?.webp&&(0,f.jsx)("source",{srcSet:d.webp,type:"image/webp"}),d?.fallback&&(0,c.createElement)(i.m.img,{...m,alt:x?t:null,animate:{opacity:x?1:0},draggable:!1,height:j.height,initial:{opacity:0},key:(0,l.Eb)(t,"picture"),onLoad:N,src:j.path,srcSet:d.fallback?.src?.srcSet,transition:{duration:.5,ease:"easeInOut"},width:j.width})]})})})})}));m.propTypes={alt:h().string,className:h().string,onLoad:h().func,picture:h().shape({avif:h().string,fallback:h().oneOfType([h().shape(),h().string]),webp:h().string}),ref:h().oneOfType([h().func,h().shape({current:h().shape()})])};const y=(0,c.forwardRef)(((e,t)=>{let{link:n,...r}=e;return n?(0,f.jsx)(o.A,{...n,children:(0,f.jsx)(m,{ref:t,...r})}):(0,f.jsx)(m,{ref:t,...r})}));y.displayName="Image",y.propTypes={link:h().shape({className:h().string,href:h().string,title:h().string,whileTap:h().shape({scale:h().number})})};const b=(0,c.memo)(y)},8849:(e,t,n)=>{n.d(t,{A:()=>g});var r=n(4977),s=n(5793),a=n(6595),i=n(2627),l=n(6540),c=n(5556),o=n.n(c),d=n(2088);const h="link_uBI6";var p=n(4848);const u=(0,l.forwardRef)(((e,t)=>{let{children:n,className:l,href:c,title:o,validate:u=!1,...g}=e;const f=(0,d.A)();return c&&!["https://",".pdf"].filter((e=>c.includes(e))).length&&f.collectLink(c),!u||u&&c?(0,p.jsx)(s.F,{features:a.l,children:(0,p.jsx)(i.m.a,{...(0,r.z$)(o),className:(0,r.$z)(l,h),href:c,ref:t,rel:c?.includes("https://")?"noopener noreferrer":null,target:c?.includes("https://")?"_blank":null,...g,children:n})}):(0,p.jsx)("span",{className:l,children:n})}));u.displayName="Link",u.propTypes={children:o().oneOfType([o().arrayOf(o().node),o().node]).isRequired,className:o().string,href:o().string,title:o().string,validate:o().bool};const g=(0,l.memo)(u)},5242:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(8561),s=n(4977),a=n(6540),i=n(6962);const l="admonition_sD_b";var c=n(4848);const o=(0,a.memo)((function(){const[e]=(0,i.fw)();return!e&&(0,c.jsx)("aside",{"aria-hidden":"true",className:(0,s.$z)(l,"row"),children:(0,c.jsx)("div",{className:"col",children:(0,c.jsx)(r.A,{type:s.gF.print.type,children:(0,c.jsx)("p",{children:s.gF.print.text})})})})}))},1875:(e,t,n)=>{n.d(t,{A:()=>b});var r=n(8561),s=n(9033),a=n(4977),i=n(1414),l=n(6540),c=n(5556),o=n.n(c),d=n(6962);const h="control_y43M",p="controls_Z1tt";var u=n(4848);function g(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M3,21 L9,21 L9,3 L3,3 L3,21 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z"},child:[]}]})(e)}function f(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polygon",attr:{fill:"none",strokeWidth:"2",points:"3 22 21 12 3 2"},child:[]}]})(e)}function m(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M1,20 L6,20 L6,4 L1,4 L1,20 Z M11,19.0000002 L22,12 L11,5 L11,19.0000002 Z"},child:[]}]})(e)}function y(e){return(0,i.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"rect",attr:{width:"16",height:"16",x:"4",y:"4",fill:"none",strokeWidth:"2"},child:[]}]})(e)}const b=(0,l.memo)(Object.assign((function(e){let{children:t,className:n,lang:i="id-ID",names:c,pitch:o=1,rate:b=.9,volume:j=1}=e;const[{paused:x,playing:v},k]=(0,l.useState)({paused:!1,playing:!1}),[w]=(0,d.mt)(),N=(0,l.useRef)(),_="string"==typeof t?t:t?.props?.children,A=(0,l.useRef)(),[L,T]=(0,l.useState)({lang:null}),S=(0,l.useCallback)((()=>{N.current?.pause(),k({paused:!0,playing:!1})}),[]),O=(0,l.useCallback)((async()=>{N.current?.speaking&&(N.current?.cancel(),await new Promise((e=>{setTimeout(e,250)}))),N.current?.speak(A.current),k({paused:!1,playing:!0})}),[]),$=(0,l.useCallback)((()=>{N.current?.resume(),k({paused:!1,playing:!0})}),[]),z=(0,l.useCallback)((()=>{N.current?.cancel(),k({paused:!1,playing:!1})}),[]);return(0,l.useEffect)((()=>{const e=c?.length?c:["Damayanti","Microsoft Gadis Online (Natural) - Indonesian (Indonesia)","Google Bahasa Indonesia"];(async()=>{let t=speechSynthesis?.getVoices();t?.length||(await new Promise((e=>{speechSynthesis?.addEventListener("voiceschanged",e,{once:!0})})),t=speechSynthesis?.getVoices());let n=t.find((t=>e.includes(t.name)));if(i&&"string"!=typeof n?.lang)if((t[0]?.lang?.split(/-_/g)?.[0]?.length||0)>2){const e=i.split("-")[0];n=t.find((t=>t.lang?.startsWith(e)))}else n=t.find((e=>e.lang?.replace(/_/g,"-")===i));"string"!=typeof n?.lang&&(n={lang:!1}),T(n)})()}),[i,c]),(0,l.useEffect)((()=>(w&&(async()=>{N.current=speechSynthesis,A.current=new SpeechSynthesisUtterance(_),A.current.addEventListener("end",z),A.current.addEventListener("error",z),A.current.pitch=o,A.current.rate=b,A.volume=j,"string"==typeof L?.lang&&(A.current.lang=L.lang,A.current.voice=L)})(),()=>{N.current?.cancel(),A.current?.removeEventListener("end",z),A.current?.removeEventListener("error",z)})),[z,o,b,w,_,L,j]),(0,u.jsxs)(u.Fragment,{children:[w&&!1===L?.lang&&(0,u.jsx)(r.A,{type:"info",children:(0,u.jsx)("p",{children:`${new Intl.DisplayNames(["en"],{type:"language"}).of(i)} voice is not available in this browser. Please try different browser.`})}),(0,u.jsxs)("div",{className:p,children:[v&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.A,{...(0,a.z$)("Stop"),className:(0,a.$z)(n,h),onClick:z,whileTap:{scale:.85},children:(0,u.jsx)(y,{})}),(0,u.jsx)(s.A,{...(0,a.z$)("Pause"),className:(0,a.$z)(n,h),onClick:S,whileTap:{scale:.85},children:(0,u.jsx)(g,{})})]}),!v&&!!_?.length&&"string"==typeof L?.lang&&(0,u.jsx)(s.A,{...(0,a.z$)(x?"Resume":"Play"),className:(0,a.$z)(n,h),onClick:x?$:O,whileTap:{scale:.85},children:x?(0,u.jsx)(m,{}):(0,u.jsx)(f,{})})]})]})}),{propTypes:{children:o().oneOfType([o().arrayOf(o().node),o().node]),className:o().string,lang:o().string,names:o().arrayOf(o().string),pitch:o().number,rate:o().number,volume:o().number}}))},2131:(e,t,n)=>{n.d(t,{A:()=>$});var r=n(4991),s=n(3973),a=n(7192),i=n(6540),l=n(5556),c=n.n(l),o=n(4848);const d=(0,i.memo)(Object.assign((function(e){let{chinese:t,sanskrit:n,tibetan:r}=e;return(0,o.jsxs)(o.Fragment,{children:[n&&(0,o.jsxs)(a.A,{title:n.title,children:[n.children,"\u0965"]}),r&&(0,o.jsxs)(a.A,{title:r.title,children:[r.children,"\u0f0e"]}),t&&(0,o.jsxs)(a.A,{title:t.title,children:[t.children,"\u3002"]})]})}),{propTypes:{chinese:c().shape(),sanskrit:c().shape(),tibetan:c().shape()}}));var h=n(1414),p=n(4862),u=n(4977),g=n(8849),f=n(8687);const m="controls_ShKW",y="badge_kGSE",b=(0,i.memo)(Object.assign((function(e){let{value:t=1}=e;return t<2?null:(0,o.jsx)("div",{className:m,children:(0,o.jsx)("span",{className:(0,u.$z)(y,"badge","badge--primary"),title:`Preferred repetition: ${t} times`,children:`${t}x`})})}),{propTypes:{value:c().number}}));var j=n(1875);const x={"arya-tara":["roll","#buddhism/phrases/_arya_tara.js"],"dependent-origination":["roll","#buddhism/phrases/_dependent_origination.js"],"rakta-tara":["roll","#buddhism/phrases/_rakta_tara.js"],"sita-tara":["roll","#buddhism/phrases/_sita_tara.js"]},v="picture_vvTR",k="roll_u7ld";function w(e){return(0,h.k5)({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z"},child:[]}]})(e)}const N=(0,i.memo)(Object.assign((function(e){let{image:t,instruction:n,repetition:r=0,transliteration:s}=e;return s?(0,o.jsxs)(o.Fragment,{children:[(n||t)&&(0,o.jsxs)(f.A,{children:[(0,o.jsx)("summary",{children:n||s.title}),t&&(0,o.jsx)(p.A,{alt:s.title,className:v,picture:{fallback:t}})]}),(0,o.jsxs)(a.A,{children:[s.children,"\u0965"]}),(0,o.jsx)(b,{value:r||s.repetition}),Object.prototype.hasOwnProperty.call(x,s.pdf)&&(0,o.jsx)(g.A,{className:k,href:(0,u.Eb)(s.title,"/pdf","/","pdf","."),rel:"noopener noreferrer",target:"_blank",title:`Open ${s.title} mantra roll`,children:(0,o.jsx)(w,{})}),(0,o.jsx)(j.A,{children:s.speech})]}):null}),{propTypes:{image:c().string,instruction:c().node,repetition:c().number,transliteration:c().shape()}}));var _=n(5242),A=n(8561),L=n(6962);const T="admonition_vZD4",S=(0,i.memo)((function(){const[e]=(0,L.mt)();return!1===e&&(0,o.jsx)("aside",{"aria-hidden":"true",className:(0,u.$z)(T,"row"),children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)(A.A,{type:u.gF.speech.type,children:(0,o.jsx)("p",{children:u.gF.speech.text})})})})})),O=(0,i.memo)(Object.assign((function(e){let{navigation:t=!1}=e;return(0,L.W4)({navigation:t}),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_.A,{}),(0,o.jsx)(S,{})]})}),{propTypes:{navigation:c().bool}})),$={...s.A,Link:r.A,MultiLingual:d,Phrase:N,Welcome:O}}}]);