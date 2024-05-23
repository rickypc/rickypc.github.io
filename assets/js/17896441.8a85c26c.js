/*! For license information please see 17896441.8a85c26c.js.LICENSE.txt */
"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[401],{9033:(e,t,n)=>{n.d(t,{A:()=>p});var a=n(4977),s=n(5793),r=n(6595),o=n(2627),i=n(6540),c=n(5556),l=n.n(c),d=n(4848);const u=(0,i.forwardRef)(((e,t)=>{let{children:n,className:i,...c}=e;return(0,d.jsx)(s.F,{features:r.l,children:(0,d.jsx)(o.m.button,{className:(0,a.$z)("clean-btn",i),ref:t,type:"button",...c,children:n})})}));u.displayName="Button",u.propTypes={children:l().oneOfType([l().arrayOf(l().node),l().node]),className:l().string};const p=(0,i.memo)(u)},5242:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(8561),s=n(4977),r=n(6540),o=n(6962);const i="admonition_sD_b";var c=n(4848);const l=(0,r.memo)((function(){const[e]=(0,o.fw)();return e?null:(0,c.jsx)("aside",{"aria-hidden":"true",className:(0,s.$z)(i,"row"),children:(0,c.jsx)("div",{className:"col",children:(0,c.jsx)(a.A,{type:s.gF.print.type,children:(0,c.jsx)("p",{children:s.gF.print.text})})})})}))},1875:(e,t,n)=>{n.d(t,{A:()=>y});var a=n(8561),s=n(9033),r=n(4977),o=n(1414),i=n(6540),c=n(5556),l=n.n(c),d=n(6962);const u="control_y43M",p="controls_Z1tt";var f=n(4848);function h(e){return(0,o.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M3,21 L9,21 L9,3 L3,3 L3,21 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z"},child:[]}]})(e)}function g(e){return(0,o.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polygon",attr:{fill:"none",strokeWidth:"2",points:"3 22 21 12 3 2"},child:[]}]})(e)}function m(e){return(0,o.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M1,20 L6,20 L6,4 L1,4 L1,20 Z M11,19.0000002 L22,12 L11,5 L11,19.0000002 Z"},child:[]}]})(e)}function v(e){return(0,o.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"rect",attr:{width:"16",height:"16",x:"4",y:"4",fill:"none",strokeWidth:"2"},child:[]}]})(e)}const b=(0,i.memo)((function(e){let{value:t=1}=e;return t<2?null:(0,f.jsx)("span",{className:"badge badge--primary",title:`Preferred repetition: ${t} times`,children:`${t}x`})}));b.propTypes={value:l().number};const x=(e,t)=>{const n=speechSynthesis.getVoices();return n.find((t=>t.name===e))||n.find((e=>e.lang===t))},y=(0,i.memo)(Object.assign((function(e){let{children:t,className:n,lang:o="id-ID",name:c="Damayanti",pitch:l=1,rate:y=.9,repetition:N=1,volume:j=1}=e;const[$,k]=(0,i.useState)(!1),[A,S]=(0,i.useState)(!1),[w]=(0,d.mt)(),z=(0,i.useRef)(),L=(0,i.useRef)(),C=(0,i.useCallback)((()=>{z.current?.pause(),k(!0),S(!1)}),[]),T=(0,i.useCallback)((async()=>{z.current?.speaking&&(z.current?.cancel(),await new Promise((e=>{setTimeout(e,250)}))),z.current?.speak(L.current),k(!1),S(!0)}),[]),R=(0,i.useCallback)((()=>{z.current?.resume(),k(!1),S(!0)}),[]),H=(0,i.useCallback)((()=>{z.current?.cancel(),k(!1),S(!1)}),[]);if((0,i.useEffect)((()=>{if(w){z.current=speechSynthesis;const e="string"==typeof t?t:t.props.children;L.current=new SpeechSynthesisUtterance(e),L.current.onend=H,L.current.onerror=H,L.current.pitch=l,L.current.rate=y,L.current.voice=x(c,o),L.current.lang=L.current.voice?.lang||o,L.current.voice?.voiceURI&&(L.current.voiceURI=L.current.voice?.voiceURI),L.volume=j}return()=>z.current?.cancel()}),[t,o,c,H,l,y,w,j]),!w||w&&x(c,o)?.lang!==o){const e=w?new Intl.DisplayNames(["en"],{type:"language"}).of(o):"";return(0,f.jsxs)(f.Fragment,{children:[w?(0,f.jsx)(a.A,{type:"info",children:(0,f.jsx)("p",{children:`${e} voice is not available in this browser. Please try different browser.`})}):null,(0,f.jsx)("div",{className:p,children:(0,f.jsx)(b,{value:N})})]})}return A?(0,f.jsxs)("div",{className:p,children:[(0,f.jsx)(b,{value:N}),(0,f.jsx)(s.A,{...(0,r.z$)("Stop"),className:(0,r.$z)(n,u),onClick:H,whileTap:{scale:.85},children:(0,f.jsx)(v,{})}),(0,f.jsx)(s.A,{...(0,r.z$)("Pause"),className:(0,r.$z)(n,u),onClick:C,whileTap:{scale:.85},children:(0,f.jsx)(h,{})})]}):(0,f.jsxs)("div",{className:p,children:[(0,f.jsx)(b,{value:N}),(0,f.jsx)(s.A,{...(0,r.z$)($?"Resume":"Play"),className:(0,r.$z)(n,u),onClick:$?R:T,whileTap:{scale:.85},children:$?(0,f.jsx)(m,{}):(0,f.jsx)(g,{})})]})}),{propTypes:{children:l().oneOfType([l().arrayOf(l().node),l().node]).isRequired,className:l().string,lang:l().string,name:l().string,pitch:l().number,rate:l().number,repetition:l().number,volume:l().number}}))},2907:(e,t,n)=>{n.d(t,{A:()=>z});var a=n(6623),s=n(1414),r=n(6540),o=n(9033),i=n(4977),c=n(7164),l=n.n(c),d=n(5556),u=n.n(d),p=n(4740),f=n(8557);const h="control_NWYX",g="controls_zXjB";var m=n(4848);function v(e){return(0,s.k5)({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-   64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"},child:[]}]})(e)}const b=(0,r.memo)(Object.assign((function(e){let{className:t,definition:a,Icon:s=v,label:c="Print",layouts:d}=e;const u=(0,f.A)();l().fonts=(0,r.useMemo)((()=>{if(!u)return{};const{origin:e}=window.location,t=`${e}${n(8230).A}`,a=`${e}${n(5759).A}`,s=`${e}${n(5282).A}`;return{Kokonor:{bold:s,bolditalics:s,italics:s,normal:s},NotoSans:{bold:`${e}${n(5491).A}`,bolditalics:`${e}${n(27).A}`,italics:`${e}${n(6066).A}`,normal:`${e}${n(5434).A}`},NotoSerifDevanagari:{bold:a,bolditalics:a,italics:t,normal:t}}}),[u]);const{siteConfig:b}=(0,p.A)(),x=(0,r.useCallback)((()=>l().createPdf(JSON.parse(JSON.stringify(a)),d).print()),[a,d]);return(0,r.useEffect)((()=>{"object"==typeof a&&(a.info={author:b.title,creator:b.url,producer:b.url,title:c})}),[a,c,b]),u?(0,m.jsx)("div",{className:g,children:(0,m.jsx)(o.A,{...(0,i.z$)(c),className:(0,i.$z)(t,h),onClick:x,whileTap:{scale:.85},children:(0,m.jsx)(s,{})})}):null}),{propTypes:{className:u().string,definition:u().shape(),Icon:u().func,label:u().string,layouts:u().shape()}}));function x(e){return(0,s.k5)({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z"},child:[]}]})(e)}const y=(0,r.memo)(Object.assign((function(e){let{children:t,label:n="",lang:a="bo-CN",repeat:s=1,total:r=6,...o}=e,i="|";const c=s-1,l=r-1;let d=.71,u=2.5,p=0,f="\ua8fc ",h="NotoSerifDevanagari",g="NotoSans",v="||";switch(a){case"bo-CN":i="\u0f0d",d=.84,u=1,p=.25,f="\u0f04\u0f05\u0f0d ",h="Kokonor",g="Kokonor",v="\u0f0e";break;case"sa-IN":i="\u0964",d=.805,u=1,p=1,g="NotoSerifDevanagari",v="\u0965"}const y={roll:{paddingBottom:()=>u,paddingLeft:()=>2.5,paddingRight:()=>2.5,paddingTop:()=>p}},N="string"==typeof t?t:t.props.children,j={content:Array.from({length:r},((e,t)=>[{layout:"roll",margin:[0,0,0,t===l?0:7.5],table:{body:[[[{text:[{fontSize:4,text:`${n.toUpperCase()} ${s}x `},{text:[{style:"prefix",text:f},{text:Array.from({length:s},((e,t)=>({style:"roll",text:`${i}${N}${t===c?"":`${i} `}`})))},{style:"roll",text:v}]}]}]]],heights:[65]}},t===l?null:{canvas:[{dash:{length:3.5,space:2.5},lineWidth:1,type:"line",x1:0,x2:777,y1:0,y2:0}],margin:[0,0,0,7.5]}])),defaultStyle:{font:"NotoSans",fontSize:6,lineHeight:d},pageMargins:[7.5,7.5,7.5,7.5],pageOrientation:"landscape",pageSize:"LETTER",styles:{prefix:{font:h},roll:{font:g}}};return(0,m.jsx)(b,{...o,definition:j,Icon:x,label:`Print ${n} roll`,lang:a,layouts:y})}),{propTypes:{children:u().oneOfType([u().arrayOf(u().node),u().node]).isRequired,className:u().string,label:u().string.isRequired,lang:u().string,repeat:u().number,total:u().number}}));var N=n(1875),j=n(5242),$=n(8561),k=n(6962);const A="admonition_vZD4",S=(0,r.memo)((function(){const[e]=(0,k.mt)();return e?null:(0,m.jsx)("aside",{"aria-hidden":"true",className:(0,i.$z)(A,"row"),children:(0,m.jsx)("div",{className:"col",children:(0,m.jsx)($.A,{type:i.gF.speech.type,children:(0,m.jsx)("p",{children:i.gF.speech.text})})})})})),w=(0,r.memo)(Object.assign((function(e){let{navigation:t=!1}=e;return(0,k.W4)({navigation:t}),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(j.A,{}),(0,m.jsx)(S,{})]})}),{propTypes:{navigation:u().bool}})),z={...a.A,RollPrint:y,Speech:N.A,Welcome:w}},5282:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/Kokonor-Regular-096b665059b2209d451d3ebea07e7f42.ttf"},5491:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/NotoSans-Bold-5f7ac340604afb2500f135e038771f4c.ttf"},27:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/NotoSans-BoldItalic-d07373228430d3c4704660a05f3678e0.ttf"},6066:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/NotoSans-Italic-326dc17f956af13748958d8e43b1caab.ttf"},5434:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/NotoSans-Regular-e49f7cc81283eef694a3a8c1986a681c.ttf"},5759:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/NotoSerifDevanagari-Bold-7c9bf156581487cb191d5714943e0103.ttf"},8230:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/fonts/NotoSerifDevanagari-Regular-ff6c31f6471165c10a08bd57e76546a3.ttf"}}]);