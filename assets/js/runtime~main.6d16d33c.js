(()=>{"use strict";var e,t,r,a,o,f={},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={id:e,loaded:!1,exports:{}};return f[e].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}i.m=f,i.c=n,e=[],i.O=(t,r,a,o)=>{if(!r){var f=1/0;for(b=0;b<e.length;b++){r=e[b][0],a=e[b][1],o=e[b][2];for(var n=!0,c=0;c<r.length;c++)(!1&o||f>=o)&&Object.keys(i.O).every((e=>i.O[e](r[c])))?r.splice(c--,1):(n=!1,o<f&&(f=o));if(n){e.splice(b--,1);var d=a();void 0!==d&&(t=d)}}return t}o=o||0;for(var b=e.length;b>0&&e[b-1][2]>o;b--)e[b]=e[b-1];e[b]=[r,a,o]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var f={};t=t||[null,r({}),r([]),r(r)];for(var n=2&a&&e;"object"==typeof n&&!~t.indexOf(n);n=r(n))Object.getOwnPropertyNames(n).forEach((t=>f[t]=()=>e[t]));return f.default=()=>e,i.d(o,f),o},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>"assets/js/"+({4:"43d83052",48:"a94703ab",64:"bf5000bb",76:"common",84:"7626ceb6",98:"a7bd4aaa",228:"1cff678b",235:"a7456010",279:"df203c0f",308:"4edc808e",401:"17896441",412:"79e1b933",570:"3de27022",617:"9dd8a0d2",647:"5e95c892",659:"ea84f538",737:"b5ba1184",742:"aba21aa0",787:"3720c009",815:"b4afea8a",874:"2cfa63df",969:"14eb3368"}[e]||e)+"."+{4:"28048428",48:"9bc6f91e",64:"87bcbf28",76:"d671b2b3",84:"c6c8f06d",98:"455cbc02",113:"fdc6b1fd",228:"96458a4f",235:"f94a7895",254:"b12cc60d",279:"1b7a459a",308:"c7911de4",401:"9510508d",412:"3bc09970",570:"4a04e55a",617:"9aca671e",647:"b90e74dc",659:"f28d7ee7",680:"e79a02f9",687:"b508e772",737:"86f9b4aa",742:"1d7baf47",787:"7b321146",815:"5b32f00b",874:"53fa1061",969:"4af23d14"}[e]+".js",i.miniCssF=e=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a={},o="rickypc.github.io:",i.l=(e,t,r,f)=>{if(a[e])a[e].push(t);else{var n,c;if(void 0!==r)for(var d=document.getElementsByTagName("script"),b=0;b<d.length;b++){var u=d[b];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+r){n=u;break}}n||(c=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,i.nc&&n.setAttribute("nonce",i.nc),n.setAttribute("data-webpack",o+r),n.src=e),a[e]=[t];var l=(t,r)=>{n.onerror=n.onload=null,clearTimeout(s);var o=a[e];if(delete a[e],n.parentNode&&n.parentNode.removeChild(n),o&&o.forEach((e=>e(r))),t)return t(r)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=l.bind(null,n.onerror),n.onload=l.bind(null,n.onload),c&&document.head.appendChild(n)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="/",i.gca=function(e){return e={17896441:"401","43d83052":"4",a94703ab:"48",bf5000bb:"64",common:"76","7626ceb6":"84",a7bd4aaa:"98","1cff678b":"228",a7456010:"235",df203c0f:"279","4edc808e":"308","79e1b933":"412","3de27022":"570","9dd8a0d2":"617","5e95c892":"647",ea84f538:"659",b5ba1184:"737",aba21aa0:"742","3720c009":"787",b4afea8a:"815","2cfa63df":"874","14eb3368":"969"}[e]||e,i.p+i.u(e)},(()=>{var e={354:0,869:0};i.f.j=(t,r)=>{var a=i.o(e,t)?e[t]:void 0;if(0!==a)if(a)r.push(a[2]);else if(/^(354|869)$/.test(t))e[t]=0;else{var o=new Promise(((r,o)=>a=e[t]=[r,o]));r.push(a[2]=o);var f=i.p+i.u(t),n=new Error;i.l(f,(r=>{if(i.o(e,t)&&(0!==(a=e[t])&&(e[t]=void 0),a)){var o=r&&("load"===r.type?"missing":r.type),f=r&&r.target&&r.target.src;n.message="Loading chunk "+t+" failed.\n("+o+": "+f+")",n.name="ChunkLoadError",n.type=o,n.request=f,a[1](n)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,f=r[0],n=r[1],c=r[2],d=0;if(f.some((t=>0!==e[t]))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(c)var b=c(i)}for(t&&t(r);d<f.length;d++)o=f[d],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(b)},r=self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})()})();