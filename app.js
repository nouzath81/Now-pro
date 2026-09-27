const state={q:"",cat:"ALL"};
const $=s=>document.querySelector(s);
const categories=[...new Set(PRODUCTS.map(p=>p.category))].sort();

function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderCategories(){
  const el=$("#categories");
  el.innerHTML=`<button class="chip active" data-cat="ALL">All</button>`+
    categories.map(c=>`<button class="chip" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  el.addEventListener("click",e=>{
    const b=e.target.closest(".chip"); if(!b)return;
    state.cat=b.dataset.cat;
    el.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));
    render();
  });
}
function filtered(){
  const q=state.q.toLowerCase().trim();
  return PRODUCTS.filter(p=>(state.cat==="ALL"||p.category===state.cat) &&
    (!q || p.code.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)));
}
function render(){
  const arr=filtered();
  $("#count").textContent=arr.length.toLocaleString();
  $("#products").innerHTML=arr.map((p,i)=>`
    <article class="card" data-index="${PRODUCTS.indexOf(p)}">
      <div class="tag">${esc(p.category)}</div>
      <div class="code">${esc(p.code)}</div>
      <div class="desc">${esc(p.description)}</div>
      <div class="cardPrice">${esc(p.priceDisplay)}</div>
    </article>`).join("");
  $("#empty").hidden=arr.length>0;
}
function openDetail(p){
  $("#detailCat").textContent=p.category;
  $("#detailCode").textContent=p.code;
  $("#detailDesc").textContent=p.description;
  $("#detailPrice").textContent=p.priceDisplay;
  $("#waBtn").onclick=()=>{
    const text=`Product: ${p.code}\n${p.description}\nPrice: ${p.priceDisplay}`;
    location.href="https://wa.me/?text="+encodeURIComponent(text);
  };
  $("#detail").hidden=false;
}
$("#products").addEventListener("click",e=>{
  const c=e.target.closest(".card"); if(c)openDetail(PRODUCTS[+c.dataset.index]);
});
$("#closeDetail").onclick=()=>$("#detail").hidden=true;
document.querySelector(".backdrop").onclick=()=>$("#detail").hidden=true;
$("#search").addEventListener("input",e=>{state.q=e.target.value;render()});
$("#clearBtn").onclick=()=>{$("#search").value="";state.q="";render();$("#search").focus()};
$("#shareBtn").onclick=async()=>{
  if(navigator.share){try{await navigator.share({title:"Product Catalogue",text:"View our product catalogue"})}catch(e){}}
  else alert("Open this page in your browser and share the page link.");
};
renderCategories();render();
