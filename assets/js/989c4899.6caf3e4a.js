/*! For license information please see 989c4899.6caf3e4a.js.LICENSE.txt */
"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[754],{6753:(e,t,a)=>{a.d(t,{A:()=>y});var r=a(9250),n=a(1414),s=a(6540),i=a(5556),l=a.n(i),c=a(1062);const o="reaction_VoB3",d="heart_nUN9",h="added_H39b",m="count_x2me";var p=a(4848);function u(e){return(0,n.k5)({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"},child:[]}]})(e)}function f(e){return(0,n.k5)({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"},child:[]}]})(e)}const y=(0,s.memo)(Object.assign((function(e){let{className:t,id:a}=e;const n=(0,c.A)(),i=`heart-${a}`,[{added:l,count:y,timestamp:x=(new Date).valueOf()-864e5}={},v]=(0,s.useState)((e=>{let t;try{t=JSON.parse(localStorage.getItem(e)||"undefined")}catch{}return void 0===t?{}:t})(i)),g=l&&n,{fetchAsJson:w}={fetchAsJson:(0,s.useCallback)((async function(){let e={};const t=await fetch(...arguments);try{e=await t.json()}catch(a){}return e}),[])},k=g?u:f,j=g?"Hearted":"Heart",E=`https://counterapi.com/api/ricky.one/heart/${a}`,b=(0,s.useCallback)(((e,t)=>{v(t),localStorage.setItem(e,JSON.stringify(t))}),[]),M=(0,s.useCallback)((async()=>{l||(await w(`${E}?trackOnly=true`),b(i,{added:!0,count:y+1,timestamp:(new Date).valueOf()}))}),[l,y,w,i,b,E]);return(0,s.useEffect)((()=>{(async()=>{if((new Date).valueOf()-x>864e5){const{value:e}=await w(`${E}?readOnly=true`);b(i,{added:l,count:e,timestamp:(new Date).valueOf()})}})()}),[l,w,i,b,x,E]),(0,p.jsxs)("span",{className:(0,r.$z)(t,o),children:[(0,p.jsx)("span",{"aria-hidden":!0,className:(0,r.$z)(g&&h,d),onClick:M,onKeyPress:M,children:(0,p.jsx)(k,{...(0,r.z$)(j,{role:"img"})})}),(0,p.jsx)("span",{"aria-hidden":"true",className:m,children:n&&y||0})]})}),{propTypes:{className:l().string,id:l().string.isRequired}}))},784:(e,t,a)=>{a.d(t,{A:()=>h});var r=a(9250),n=a(1141),s=a(6540),i=a(5556),l=a.n(i),c=a(3844),o=a(1579),d=a(4848);const h=(0,s.memo)(Object.assign((function(e){let{children:t,className:a,description:s,keywords:i,metadatas:l,title:h}=e;return(0,o.W4)(),(0,d.jsxs)(c.A,{description:s,title:h,children:[(0,d.jsxs)(n.A,{children:[(0,d.jsx)("meta",{name:"keyword",content:i.join(",")}),l?.map((e=>e)),(0,d.jsx)("script",{type:"application/ld+json",children:(0,r._O)({description:s,keywords:i,title:h})}),(0,d.jsx)("meta",{name:"twitter:description",content:s}),(0,d.jsx)("meta",{name:"twitter:title",content:h})]}),(0,d.jsx)("main",{className:a,children:(0,d.jsx)("div",{className:"container",children:t})})]})}),{propTypes:{children:l().oneOfType([l().arrayOf(l().node),l().node]).isRequired,className:l().string,description:l().string,keywords:l().arrayOf(l().string),metadatas:l().arrayOf(l().shape()),title:l().string}}))},9677:(e,t,a)=>{a.d(t,{A:()=>h});var r=a(9250),n=a(5225),s=a(6540),i=a(5620),l=a(5556),c=a.n(l);const o="preamble_iCsp";var d=a(4848);const h=(0,s.memo)(Object.assign((function(e){let{description:t,printAdmonition:a,title:s}=e;return(0,d.jsxs)(d.Fragment,{children:[a?(0,d.jsx)(i.A,{}):null,(0,d.jsx)("header",{className:"row",children:(0,d.jsxs)("div",{className:(0,r.$z)("col","col--8","col--offset-2",o),children:[(0,d.jsx)(n.A,{as:"h1",children:s}),(0,d.jsx)("p",{children:t})]})})]})}),{propTypes:{description:c().string.isRequired,printAdmonition:c().bool,title:c().string.isRequired}}))},5620:(e,t,a)=>{a.d(t,{A:()=>o});var r=a(4182),n=a(9250),s=a(6540),i=a(1579);const l="admonition_sD_b";var c=a(4848);const o=(0,s.memo)((function(){const[e]=(0,i.fw)();return e?null:(0,c.jsx)("aside",{"aria-hidden":"true",className:(0,n.$z)(l,"row"),children:(0,c.jsx)("div",{className:"col",children:(0,c.jsx)(r.A,{type:n.gF.print.type,children:(0,c.jsx)("p",{children:n.gF.print.text})})})})}))},7166:(e,t,a)=>{a.r(t),a.d(t,{default:()=>U});var r,n,s,i,l,c,o,d,h,m=a(9250),p=a(5793),u=a(6595),f=a(5008),y=a(5225),x=a(6753),v=a(6540);function g(){return g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},g.apply(this,arguments)}var w,k,j,E,b,M,N,A,T;function I(){return I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},I.apply(this,arguments)}const O={attributes:['I am "people" and "task" oriented.',"I am outgoing and socially skilled.","I provide a clear vision and purpose, able to translate ideas into action.","I am a good coordinator. I get things done by my ability to inspire people with me.","I focused on excellence and delivery.","I get the best from people due to insight and understanding into what makes different people respond and the ability to empathize with differing needs and viewpoints.","I value individual qualities and skills."],title:"My key characteristics:"},_={description:"I am a Transformer-Transactor type and I build ultimate things | Ricky Huang",keywords:["ricky huang","richard huang","transformer-transactor type","vision and purpose","coordinator and inspirator","qualities and skills","full stack developer","engineering leader","value proposition","technical innovation","business strategy","software engineering","smart creative","master degree"],title:"Type and key characteristics"},z=["I am a Transformer People Type, who combines interpersonal sensitivity with strong social networks, and definite leadership impact.","I am a Transactor Task Type, who combines thoughtful analysis with the driven pursuit of goals. I enjoy challenges and can be relied upon to deliver results."],q={description:"I combine the focus on achieving goals with thoughtful analysis and judgment.",title:"About Ricky Huang"},C=[{alt:"Transformer People Type",Image:e=>{let{title:t,titleId:a,...m}=e;return v.createElement("svg",g({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 250 270","aria-labelledby":a},m),t?v.createElement("title",{id:a},t):null,v.createElement("defs",null,v.createElement("marker",{id:"people-arrow",markerHeight:10,markerWidth:10,orient:"auto",refY:3,viewBox:"0 0 17 17"},v.createElement("path",{d:"M0 0v6l9-3z",style:{fill:"red"}})),r||(r=v.createElement("style",null,"path.arrow{stroke:orange;stroke-width:2px}text{fill:#999;font:12px Arial,sans-serif}text.axis{fill:#00f;font-size:16px}text.quadrant{font-size:14px}"))),v.createElement("g",{transform:"translate(25 25)"},v.createElement("rect",{style:{fill:"#f5f5f5",height:200,stroke:"#777",strokeWidth:1,width:200}}),n||(n=v.createElement("path",{markerEnd:"url(#people-arrow)",d:"M0 240h190",className:"arrow"})),s||(s=v.createElement("path",{markerEnd:"url(#people-arrow)",d:"M-5 200V10",className:"arrow"})),i||(i=v.createElement("text",{y:-5,className:"quadrant"},v.createElement("title",null,"Adaptors are supportive, resilient and flexible in response to change. They are quiet and accommodating."),"Adaptor")),l||(l=v.createElement("text",{x:200,y:-5,className:"quadrant",textAnchor:"end"},v.createElement("title",null,"Transformers combine interpersonal sensitivity with powerful social networks and definite leadership impact."),"Transformer")),c||(c=v.createElement("text",{y:215,className:"quadrant"},v.createElement("title",null,"Individualists are task-rather than people-focused. They favor environments where their specialist expertise is valued."),"Individualist")),o||(o=v.createElement("text",{x:200,y:215,className:"quadrant",textAnchor:"end"},v.createElement("title",null,"Influencers excel at communicating their message. They enjoy using power and single-mindedly pursue their goals."),"Influencer")),d||(d=v.createElement("text",{x:100,y:235,className:"axis",textAnchor:"middle"},"INFLUENCE")),h||(h=v.createElement("text",{x:-100,y:-10,className:"axis",textAnchor:"middle",transform:"rotate(-90)"},"ADAPTABILITY")),v.createElement("path",{d:"M20 0v200M40 0v200M60 0v200M80 0v200M100 0v200M120 0v200M140 0v200M160 0v200M180 0v200M0 20h200M0 40h200M0 60h200M0 80h200M0 100h200M0 120h200M0 140h200M0 160h200M0 180h200M0 200h200",style:{stroke:"#777",fill:"none",opacity:.5,strokeWidth:".5px"}}),v.createElement("path",{d:"M0 100h200M100 0v200",style:{stroke:"#777",fill:"none",opacity:.7,strokeWidth:2}}),v.createElement("circle",{cx:190,cy:30,r:10,style:{fill:"green",fillOpacity:.6,stroke:"#009d00"}})))}},{alt:"Transactor Task Type",Image:e=>{let{title:t,titleId:a,...r}=e;return v.createElement("svg",I({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 250 270","aria-labelledby":a},r),t?v.createElement("title",{id:a},t):null,v.createElement("defs",null,v.createElement("marker",{id:"task-arrow",markerHeight:10,markerWidth:10,orient:"auto",refY:3,viewBox:"0 0 17 17"},v.createElement("path",{d:"M0 0v6l9-3z",style:{fill:"red"}})),w||(w=v.createElement("style",null,"path.arrow{stroke:orange;stroke-width:2px}text{fill:#999;font:12px Arial,sans-serif}text.axis{fill:#00f;font-size:16px}text.quadrant{font-size:14px}"))),v.createElement("g",{transform:"translate(25 25)"},v.createElement("rect",{style:{fill:"#f5f5f5",height:200,stroke:"#777",strokeWidth:1,width:200}}),k||(k=v.createElement("path",{markerEnd:"url(#task-arrow)",d:"M0 240h190",className:"arrow"})),j||(j=v.createElement("path",{markerEnd:"url(#task-arrow)",d:"M-5 200V10",className:"arrow"})),E||(E=v.createElement("text",{y:-5,className:"quadrant"},v.createElement("title",null,"Thinkers get straight to the core of a problem to find solutions. They may pursue ideas at the expense of accomplishing results."),"Thinker")),b||(b=v.createElement("text",{x:200,y:-5,className:"quadrant",textAnchor:"end"},v.createElement("title",null,"Transactors combine thoughtful analysis with the driven pursuit of goals. They enjoy challenges and can be relied upon to deliver results."),"Transactor")),M||(M=v.createElement("text",{y:215,className:"quadrant"},v.createElement("title",null,"Preservers adopt conventional approaches to their work and steer clear of participation in intellectual debate."),"Preserver")),N||(N=v.createElement("text",{x:200,y:215,className:"quadrant",textAnchor:"end"},v.createElement("title",null,"Doers approach their work with dynamism and conscientiousness. They favor action over intellectualized debate."),"Doer")),A||(A=v.createElement("text",{x:100,y:235,className:"axis",textAnchor:"middle"},"DELIVERY")),T||(T=v.createElement("text",{x:-100,y:-10,className:"axis",textAnchor:"middle",transform:"rotate(-90)"},"THOUGHT")),v.createElement("path",{d:"M20 0v200M40 0v200M60 0v200M80 0v200M100 0v200M120 0v200M140 0v200M160 0v200M180 0v200M0 20h200M0 40h200M0 60h200M0 80h200M0 100h200M0 120h200M0 140h200M0 160h200M0 180h200M0 200h200",style:{stroke:"#777",fill:"none",opacity:.5,strokeWidth:".5px"}}),v.createElement("path",{d:"M0 100h200M100 0v200",style:{stroke:"#777",fill:"none",opacity:.7,strokeWidth:2}}),v.createElement("circle",{cx:190,cy:10,r:10,style:{fill:"green",fillOpacity:.6,stroke:"#009d00"}})))}}],$="content_G2H1";var H=a(4848);const L=(0,v.memo)((function(){return(0,H.jsx)(p.F,{features:u.l,children:(0,H.jsxs)(f.m.article,{className:$,initial:{opacity:[0,1],scale:[.85,1]},transition:{delay:.25,duration:.5},viewport:{once:!0},whileInView:{opacity:[0,1],scale:[.85,1]},children:[(0,H.jsxs)(y.A,{as:"h2",children:["I am a Transformer-Transactor type and I build ultimate things.",(0,H.jsx)(x.A,{id:"about-landing"})]}),z.map((e=>(0,H.jsx)("p",{children:e},(0,m.Eb)(e,"about-paragraph")))),(0,H.jsx)(y.A,{as:"h3",children:O.title}),(0,H.jsx)("ul",{children:O.attributes.map((e=>(0,H.jsx)("li",{children:e},(0,m.Eb)(e,"about-characteristic"))))})]})})})),D="figure_pVeL",W="shape_AsGH",B=(0,v.memo)((function(){return(0,H.jsx)(p.F,{features:u.l,children:(0,H.jsx)(f.m.figure,{className:D,initial:{opacity:[0,1],scale:[.85,1]},transition:{delay:.25,duration:.5},viewport:{once:!0},whileInView:{opacity:[0,1],scale:[.85,1]},children:(0,H.jsx)("div",{className:W,children:C.map((e=>{let{alt:t,Image:a}=e;return(0,H.jsx)(a,{...(0,m.z$)(t,{role:"img"})},(0,m.Eb)(t,"about-figure"))}))})})})}));var F=a(784),P=a(1579);const R={oracle:"oracle_OFo8",oraculares:"oraculares_zTwF",oracular1:"oracular1_gQ4u",oracular2:"oracular2_9Ihf",oracular3:"oracular3_MOo4",play:"play_UdMa",spin:"spin_gZZK",breath:"breath_n_g2"},V=(0,v.memo)((function(){const{ref:e,visible:t}=(0,P.c5)({threshold:.15});return(0,H.jsx)("div",{className:(0,m.$z)(t&&R.play,R.oracle),children:(0,H.jsx)("div",{className:R.oraculares,ref:e,children:Array.from({length:3},((e,t)=>(0,H.jsx)("div",{className:R[`oracular${t+1}`]},t)))})})}));var J=a(9677);const S="row_AJEL",U=(0,v.memo)((function(){return(0,H.jsxs)(F.A,{..._,children:[(0,H.jsx)(J.A,{...q}),(0,H.jsxs)("section",{className:(0,m.$z)("row",S),children:[(0,H.jsx)("div",{className:"col col--1"}),(0,H.jsx)("div",{className:"col col--6",children:(0,H.jsx)(L,{})}),(0,H.jsx)("div",{className:"col col--4 col--offset-1",children:(0,H.jsx)(B,{})})]}),(0,H.jsx)(V,{})]})}))}}]);