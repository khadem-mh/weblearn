"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[634],{1432:(e,t,n)=>{n.d(t,{A:()=>c});n(5043);var s=n(579);function c(e){let{msg:t}=e;return(0,s.jsx)("div",{className:"parent-err-msg",children:(0,s.jsx)("h1",{className:"err-msg",children:t})})}},1073:(e,t,n)=>{n.d(t,{A:()=>s});const s=e=>{const t=t=>27===t.keyCode&&e();return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)}},8692:(e,t,n)=>{n.d(t,{A:()=>o});n(5043);var s=n(7950),c=n(579);function o(e){let{submitAction:t,cancleAction:n,title:o}=e;return s.createPortal((0,c.jsx)("div",{className:"modal-parent active",children:(0,c.jsxs)("div",{className:"delete-modal",children:[(0,c.jsx)("h1",{children:o}),(0,c.jsxs)("div",{className:"delete-modal-btns",children:[(0,c.jsx)("button",{className:"delete-btn delete-modal-accept-btn",onClick:e=>t(e),children:"\u0628\u0644\u0647"}),(0,c.jsx)("button",{className:"delete-btn delete-modal-reject-btn",onClick:()=>n(),children:"\u062e\u06cc\u0631"})]})]})}),document.getElementById("modals-parent"))}},8030:(e,t,n)=>{n.d(t,{A:()=>a});var s=n(5043),c=n(7950),o=n(1073),l=n(579);function a(e){let{onHide:t,tHead:n,tdIntoTbody:a}=e;const[r]=(0,s.useState)(n),[d]=(0,s.useState)(a);return(0,s.useEffect)((()=>{(0,o.A)(t)})),(0,s.useEffect)((()=>{let e=0,n=0;const s=s=>{e+=s.x,n+=s.y,e===s.x&&n===s.y||t()};return window.addEventListener("click",s),()=>window.removeEventListener("click",s)})),c.createPortal((0,l.jsx)("div",{className:"modal-parent active",children:(0,l.jsx)("div",{className:"details-modal",children:(0,l.jsxs)("table",{className:"cms-table",children:[(0,l.jsx)("thead",{children:(0,l.jsx)("tr",{children:r&&r.map(((e,t)=>(0,l.jsx)("th",{children:e},t)))})}),(0,l.jsx)("tbody",{children:(0,l.jsx)("tr",{children:d&&d.map(((e,t)=>(0,l.jsx)("td",{children:e},t)))})})]})})}),document.getElementById("modals-parent"))}},5061:(e,t,n)=>{n.d(t,{A:()=>a});var s=n(5043),c=n(7950),o=n(1073),l=n(579);function a(e){let{children:t,onClose:n,onSubmit:a,title:r,btnIsActive:d=!0}=e;return(0,s.useEffect)((()=>{(0,o.A)(n)})),c.createPortal((0,l.jsx)("div",{className:"modal-parent active",children:(0,l.jsxs)("form",{className:"edit-modal-form",children:[(0,l.jsx)("h1",{children:r}),t,d&&(0,l.jsx)("button",{className:"edit-form-submit",onClick:a,children:"\u0627\u062f\u0627\u0645\u0647"})]})}),document.getElementById("modals-parent"))}},8634:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var s=n(5043),c=n(8030),o=n(8692),l=n(5061),a=n(1432),r=n(3023),d=n.n(r),i=n(579);function h(){const[e,t]=(0,s.useState)([]),[n,r]=(0,s.useState)(!1),[h,u]=(0,s.useState)(!1),[m,j]=(0,s.useState)(!1),[x,b]=(0,s.useState)(!1),[p,v]=(0,s.useState)(!1),[f,g]=(0,s.useState)(!1),[A,N]=(0,s.useState)(""),[S,y]=(0,s.useState)("");(0,s.useEffect)((()=>{k()}),[]);const k=()=>{fetch("http://localhost:4000/v1/comments").then((e=>e.json())).then((e=>{console.log(e),t(e)}))},C=e=>{e(!1)};return(0,i.jsxs)("div",{children:[e?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:"products-title",children:"\u06a9\u0627\u0645\u0646\u062a \u0647\u0627"}),(0,i.jsx)("div",{className:"parent-table",children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"col",children:"\u0634\u0646\u0627\u0633\u0647"}),(0,i.jsx)("th",{scope:"col",children:"\u0627\u0633\u0645 \u06a9\u0627\u0631\u0628\u0631"}),(0,i.jsx)("th",{scope:"col",children:"\u062f\u0648\u0631\u0647"}),(0,i.jsx)("th",{scope:"col",children:"\u0645\u0634\u0627\u0647\u062f\u0647 \u06a9\u0627\u0645\u0646\u062a"}),(0,i.jsx)("th",{scope:"col",children:"\u062a\u0627\u0631\u06cc\u062e"}),(0,i.jsx)("th",{scope:"col",children:"\u06a9\u0646\u062a\u0631\u0644"})]})}),(0,i.jsx)("tbody",{children:e.map(((e,t)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:t+1}),(0,i.jsx)("td",{children:e.creator.name}),(0,i.jsx)("td",{style:{fontSize:"1.2rem",color:"gray"},children:e.course}),(0,i.jsx)("td",{children:(0,i.jsx)("button",{onClick:()=>{r(!0),N(e.body)},className:"products-table-btn",children:"\u062f\u06cc\u062f\u0646 \u0645\u062a\u0646"})}),(0,i.jsx)("td",{children:e.creator.createdAt.slice(0,9).split("-").join("/")}),(0,i.jsxs)("td",{children:[(0,i.jsx)("button",{className:"products-table-btn",onClick:()=>{u(!0),y(e._id)},children:"\u062d\u0630\u0641"}),1===e.answer?(0,i.jsx)("button",{className:"products-table-btn",onClick:()=>{var t;r(!0),N(null===(t=e.answerContent)||void 0===t?void 0:t.body)},children:1===e.answer&&"\u0645\u0634\u0627\u0647\u062f\u0647 \u067e\u0627\u0633\u062e"}):(0,i.jsx)("button",{className:"products-table-btn",onClick:()=>{v(!0),N(""),y(e._id)},children:1!==e.answer&&"\u062b\u0628\u062a \u067e\u0627\u0633\u062e"}),1===e.answer?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("button",{className:"products-table-btn",onClick:()=>{b(!0),y(e._id)},children:"\u0631\u062f \u06a9\u0627\u0645\u0646\u062a"})}):(0,i.jsx)("button",{className:"products-table-btn",onClick:()=>{j(!0),y(e._id)},children:"\u062a\u0627\u06cc\u06cc\u062f"})]})]},t)))})]})})]}):(0,i.jsx)(a.A,{msg:"\u0647\u06cc\u0686 \u06a9\u0627\u0645\u0646\u062a\u06cc \u06cc\u0627\u0641\u062a \u0646\u0634\u062f"}),n&&(0,i.jsx)(c.A,{onHide:()=>C(r),tdIntoTbody:[A]}),h&&(0,i.jsx)(o.A,{cancleAction:()=>u(!1),submitAction:e=>(e=>{e.preventDefault(),fetch("http://localhost:4000/v1/comments/".concat(S),{method:"DELETE",headers:{Authorization:"Bearer ".concat(JSON.parse(localStorage.getItem("user")).token)}}).then((e=>e.json())).then((e=>{console.log(e),k(),u(!1),d()({title:"\u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u06a9\u0627\u0645\u0646\u062a \u062d\u0630\u0641 \u0634\u062f",icon:"success",buttons:"\u0628\u0627\u0634\u0647"})}))})(e),title:"\u0622\u06cc\u0627 \u0627\u0632 \u062d\u0630\u0641 \u06a9\u0627\u0645\u0646\u062a \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062f\u0627\u0631\u06cc\u062f"}),m&&(0,i.jsx)(o.A,{cancleAction:()=>C(j),submitAction:e=>{e.preventDefault(),fetch("http://localhost:4000/v1/comments/accept/".concat(S),{method:"PUT",headers:{Authorization:"Bearer ".concat(JSON.parse(localStorage.getItem("user")).token)}}).then((e=>e.json())).then((e=>{console.log(e),k(),d()({title:"\u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u06a9\u0627\u0645\u0646\u062a \u062a\u0627\u06cc\u06cc\u062f \u0634\u062f",icon:"success",buttons:"\u0628\u0627\u0634\u0647"})})),j(!1)},title:"\u0622\u06cc\u0627 \u0627\u0632 \u062a\u0627\u06cc\u06cc\u062f \u06a9\u0627\u0645\u0646\u062a \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062f\u0627\u0631\u06cc\u062f"}),x&&(0,i.jsx)(o.A,{cancleAction:()=>C(b),submitAction:e=>{e.preventDefault(),fetch("http://localhost:4000/v1/comments/reject/".concat(S),{method:"PUT",headers:{Authorization:"Bearer ".concat(JSON.parse(localStorage.getItem("user")).token)}}).then((e=>e.json())).then((e=>{k(),d()({title:"\u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u06a9\u0627\u0645\u0646\u062a \u0631\u062f \u0634\u062f",icon:"success",buttons:"\u0628\u0627\u0634\u0647"})})),b(!1)},title:"\u0622\u06cc\u0627 \u0627\u0632 \u0631\u062f \u06a9\u0627\u0645\u0646\u062a \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062f\u0627\u0631\u06cc\u062f"}),p&&(0,i.jsx)(l.A,{onClose:()=>C(v),onSubmit:e=>{e.preventDefault(),fetch("http://localhost:4000/v1/comments/answer/".concat(S),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(JSON.parse(localStorage.getItem("user")).token)},body:JSON.stringify({body:A})}).then((e=>e.json())).then((e=>{console.log(e),k(),d()({title:"\u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u06a9\u0627\u0645\u0646\u062a \u067e\u0627\u0633\u062e \u062f\u0627\u062f\u0647 \u0634\u062f",icon:"success",buttons:"\u0628\u0627\u0634\u0647"})})),v(!1),N("")},title:"\u067e\u0627\u0633\u062e \u0645\u0648\u0631\u062f \u0646\u0638\u0631 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u0646\u0645\u0627\u06cc\u06cc\u062f",children:(0,i.jsx)("textarea",{value:A,onChange:e=>N(e.target.value)})}),f&&(0,i.jsx)(l.A,{onClose:()=>C(g),onSubmit:e=>{e.preventDefault(),fetch("http://localhost:8000/api/comments/reply/".concat(S),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({body:A})}).then((e=>e.json())).then((e=>{console.log(e),k()})),g(!1)},title:"\u067e\u0627\u0633\u062e \u062e\u0648\u062f \u0631\u0627 \u0648\u06cc\u0631\u0627\u06cc\u0634 \u0646\u0645\u0627\u06cc\u06cc\u062f",children:(0,i.jsx)("textarea",{value:A,onChange:e=>N(e.target.value)})})]})}}}]);
//# sourceMappingURL=634.48598afe.chunk.js.map