"use strict";(self.webpackChunkrickypc_github_io=self.webpackChunkrickypc_github_io||[]).push([[279],{5028:(e,t,n)=>{n.d(t,{A:()=>o});n(6540);var s=n(4164),i=n(6838),r=n(6745),l=n(8561),a=n(4848);function c(e){let{className:t}=e;return(0,a.jsx)(l.A,{type:"caution",title:(0,a.jsx)(i.Rc,{}),className:(0,s.A)(t,r.G.common.unlistedBanner),children:(0,a.jsx)(i.Uh,{})})}function o(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.AE,{}),(0,a.jsx)(c,{...e})]})}},1323:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});n(6540);var s=n(4164),i=n(4991),r=n(8851),l=n(7491),a=n(6745),c=n(5630),o=n(2237),d=n(5028),u=n(5008),g=n(4848);function h(e){const t=function(){const{selectMessage:e}=(0,r.W)();return t=>e(t,(0,c.T)({id:"theme.docs.tagDocListPageTitle.nDocsTagged",description:'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One doc tagged|{count} docs tagged"},{count:t}))}();return(0,c.T)({id:"theme.docs.tagDocListPageTitle",description:"The title of the page for a docs tag",message:'{nDocsTagged} with "{tagName}"'},{nDocsTagged:t(e.tag.count),tagName:e.tag.label})}function m(e){let{doc:t}=e;return(0,g.jsxs)("article",{className:"margin-vert--lg",children:[(0,g.jsx)(i.A,{to:t.permalink,children:(0,g.jsx)(u.A,{as:"h2",children:t.title})}),t.description&&(0,g.jsx)("p",{children:t.description})]})}function p(e){let{title:t,tag:n}=e;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.be,{title:t,description:n.description}),(0,g.jsx)(o.A,{tag:"doc_tag_doc_list"})]})}function f(e){let{tag:t,title:n}=e;return(0,g.jsx)(l.e3,{className:(0,s.A)(a.G.page.docsTagDocListPage),children:(0,g.jsx)("div",{className:"container margin-vert--lg",children:(0,g.jsx)("div",{className:"row",children:(0,g.jsxs)("main",{className:"col col--8 col--offset-2",children:[t.unlisted&&(0,g.jsx)(d.A,{}),(0,g.jsxs)("header",{className:"margin-bottom--xl",children:[(0,g.jsx)(u.A,{as:"h1",children:n}),t.description&&(0,g.jsx)("p",{children:t.description}),(0,g.jsx)(i.A,{href:t.allTagsPath,children:(0,g.jsx)(c.A,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page",children:"View all tags"})})]}),(0,g.jsx)("section",{className:"margin-vert--lg",children:t.items.map((e=>(0,g.jsx)(m,{doc:e},e.id)))})]})})})})}function x(e){const t=h(e);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p,{...e,title:t}),(0,g.jsx)(f,{...e,title:t})]})}},6838:(e,t,n)=>{n.d(t,{AE:()=>c,Rc:()=>l,TT:()=>d,Uh:()=>a,Yh:()=>o});n(6540);var s=n(5630),i=n(4922),r=n(4848);function l(){return(0,r.jsx)(s.A,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"})}function a(){return(0,r.jsx)(s.A,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,r.jsx)(i.A,{children:(0,r.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function o(){return(0,r.jsx)(s.A,{id:"theme.contentVisibility.draftBanner.title",description:"The draft content banner title",children:"Draft page"})}function d(){return(0,r.jsx)(s.A,{id:"theme.contentVisibility.draftBanner.message",description:"The draft content banner message",children:"This page is a draft. It will only be visible in dev and be excluded from the production build."})}},8851:(e,t,n)=>{n.d(t,{W:()=>o});var s=n(6540),i=n(4740);const r=["zero","one","two","few","many","other"];function l(e){return r.filter((t=>e.includes(t)))}const a={locale:"en",pluralForms:l(["one","other"]),select:e=>1===e?"one":"other"};function c(){const{i18n:{currentLocale:e}}=(0,i.A)();return(0,s.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:l(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),a}}),[e])}function o(){const e=c();return{selectMessage:(t,n)=>function(e,t,n){const s=e.split("|");if(1===s.length)return s[0];s.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${s.length}: ${e}`);const i=n.select(t),r=n.pluralForms.indexOf(i);return s[Math.min(r,s.length-1)]}(n,t,e)}}}}]);