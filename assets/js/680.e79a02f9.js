"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[680],{7667:(e,t,r)=>{r.d(t,{N:()=>b});var n=r(4848),o=r(6540),i=r(5128);function s(){const e=(0,o.useRef)(!1);return(0,i.E)((()=>(e.current=!0,()=>{e.current=!1})),[]),e}var c=r(104);var u=r(6719),a=r(8601),l=r(5446);class f extends o.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function p({children:e,isPresent:t}){const r=(0,o.useId)(),i=(0,o.useRef)(null),s=(0,o.useRef)({width:0,height:0,top:0,left:0}),{nonce:c}=(0,o.useContext)(l.Q);return(0,o.useInsertionEffect)((()=>{const{width:e,height:n,top:o,left:u}=s.current;if(t||!i.current||!e||!n)return;i.current.dataset.motionPopId=r;const a=document.createElement("style");return c&&(a.nonce=c),document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`\n          [data-motion-pop-id="${r}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${n}px !important;\n            top: ${o}px !important;\n            left: ${u}px !important;\n          }\n        `),()=>{document.head.removeChild(a)}}),[t]),(0,n.jsx)(f,{isPresent:t,childRef:i,sizeRef:s,children:o.cloneElement(e,{ref:i})})}const d=({children:e,initial:t,isPresent:r,onExitComplete:i,custom:s,presenceAffectsLayout:c,mode:l})=>{const f=(0,a.M)(h),d=(0,o.useId)(),m=(0,o.useMemo)((()=>({id:d,initial:t,isPresent:r,custom:s,onExitComplete:e=>{f.set(e,!0);for(const t of f.values())if(!t)return;i&&i()},register:e=>(f.set(e,!1),()=>f.delete(e))})),c?[Math.random()]:[r]);return(0,o.useMemo)((()=>{f.forEach(((e,t)=>f.set(t,!1)))}),[r]),o.useEffect((()=>{!r&&!f.size&&i&&i()}),[r]),"popLayout"===l&&(e=(0,n.jsx)(p,{isPresent:r,children:e})),(0,n.jsx)(u.t.Provider,{value:m,children:e})};function h(){return new Map}var m=r(9473);var y=r(5238);const v=e=>e.key||"";const b=({children:e,custom:t,initial:r=!0,onExitComplete:u,exitBeforeEnter:a,presenceAffectsLayout:l=!0,mode:f="sync"})=>{(0,y.V)(!a,"Replace exitBeforeEnter with mode='wait'");const p=(0,o.useContext)(m.L).forceRender||function(){const e=s(),[t,r]=(0,o.useState)(0),n=(0,o.useCallback)((()=>{e.current&&r(t+1)}),[t]);return[(0,o.useCallback)((()=>c.Gt.postRender(n)),[n]),t]}()[0],h=s(),b=function(e){const t=[];return o.Children.forEach(e,(e=>{(0,o.isValidElement)(e)&&t.push(e)})),t}(e);let g=b;const O=(0,o.useRef)(new Map).current,w=(0,o.useRef)(g),j=(0,o.useRef)(new Map).current,x=(0,o.useRef)(!0);var E;if((0,i.E)((()=>{x.current=!1,function(e,t){e.forEach((e=>{const r=v(e);t.set(r,e)}))}(b,j),w.current=g})),E=()=>{x.current=!0,j.clear(),O.clear()},(0,o.useEffect)((()=>()=>E()),[]),x.current)return(0,n.jsx)(n.Fragment,{children:g.map((e=>(0,n.jsx)(d,{isPresent:!0,initial:!!r&&void 0,presenceAffectsLayout:l,mode:f,children:e},v(e))))});g=[...g];const P=w.current.map(v),C=b.map(v),k=P.length;for(let n=0;n<k;n++){const e=P[n];-1!==C.indexOf(e)||O.has(e)||O.set(e,void 0)}return"wait"===f&&O.size&&(g=[]),O.forEach(((e,r)=>{if(-1!==C.indexOf(r))return;const o=j.get(r);if(!o)return;const i=P.indexOf(r);let s=e;if(!s){const e=()=>{O.delete(r);const e=Array.from(j.keys()).filter((e=>!C.includes(e)));if(e.forEach((e=>j.delete(e))),w.current=b.filter((t=>{const n=v(t);return n===r||e.includes(n)})),!O.size){if(!1===h.current)return;p(),u&&u()}};s=(0,n.jsx)(d,{isPresent:!1,onExitComplete:e,custom:t,presenceAffectsLayout:l,mode:f,children:o},v(o)),O.set(r,s)}g.splice(i,0,s)})),g=g.map((e=>{const t=e.key;return O.has(t)?e:(0,n.jsx)(d,{isPresent:!0,presenceAffectsLayout:l,mode:f,children:e},v(e))})),(0,n.jsx)(n.Fragment,{children:O.size?g:g.map((e=>(0,o.cloneElement)(e)))})}},1414:(e,t,r)=>{r.d(t,{k5:()=>d});var n=r(6540),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=n.createContext&&n.createContext(o),s=["attr","size","title"];function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u.apply(this,arguments)}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t,r){var n;return(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?n:n+"")in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e){return e&&e.map(((e,t)=>n.createElement(e.tag,l({key:t},e.attr),p(e.child))))}function d(e){return t=>n.createElement(h,u({attr:l({},e.attr)},t),p(e.child))}function h(e){var t=t=>{var r,{attr:o,size:i,title:a}=e,f=c(e,s),p=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",u({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,f,{className:r,style:l(l({color:e.color||t.color},t.style),e.style),height:p,width:p,xmlns:"http://www.w3.org/2000/svg"}),a&&n.createElement("title",null,a),e.children)};return void 0!==i?n.createElement(i.Consumer,null,(e=>t(e))):t(o)}}}]);