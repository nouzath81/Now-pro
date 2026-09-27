const state={q:"",cat:"ALL",cart:{}};const $=s=>document.querySelector(s);
function cartCount(){return Object.values(state.cart).reduce((a,b)=>a+b,0)}
function cartTotal(){return Object.entries(state.cart).reduce((sum,[code,qty])=>{const p=PRODUCTS.find(x=>x.code===code);return sum+(p?p.price*qty:0)}, 0)}
function fmtLKR(n){return "LKR "+n.toLocaleString("en-LK",{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2})}
function addToCart(code,qty){qty=qty||1;state.cart[code]=(state.cart[code]||0)+qty;updateCartUI()}
function setQty(code,qty){if(qty<=0){delete state.cart[code]}else{state.cart[code]=qty}updateCartUI();renderCartItems()}
function updateCartUI(){const n=cartCount();$("#cartFab").hidden=n===0;$("#cartCount").textContent=n}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function slug(s){return encodeURIComponent(String(s).trim().replace(/\s+/g,"-"))}
const categories=[...new Set(PRODUCTS.map(p=>p.category))].sort();
function imgUrl(p){/* Replace/extend this function with exact supplier image URLs in image-map.js when available. */return p.imageUrl||""}
function placeholder(p){return categoryIcon(p.category, p.code)}
function imageFor(p){return imgUrl(p)||placeholder(p)}
function renderCategories(){const e=$("#categories");e.innerHTML=`<button class="chip active" data-cat="ALL">All</button>`+categories.map(c=>`<button class="chip" data-cat="${esc(c)}">${esc(categoryLabel(c))}</button>`).join("");e.onclick=x=>{let b=x.target.closest(".chip");if(!b)return;state.cat=b.dataset.cat;e.querySelectorAll(".chip").forEach(y=>y.classList.toggle("active",y===b));render()}}
function filtered(){let q=state.q.toLowerCase().trim();return PRODUCTS.filter(p=>(state.cat==="ALL"||p.category===state.cat)&&(!q||p.code.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)))}
function categoryLabel(cat){return (window.CATEGORY_LABEL&&window.CATEGORY_LABEL[cat])||cat}
function cardHtml(p){return `<article class="card" data-i="${PRODUCTS.indexOf(p)}"><img class="photo" loading="lazy" decoding="async" src="${imageFor(p)}" alt="${esc(p.code)}" onerror="this.src='${placeholder(p)}'"><div class="body"><div class="tag">${esc(categoryLabel(p.category))}</div><div class="code">${esc(p.code)}</div><div class="desc">${esc(p.description)}</div><div class="cardPrice">${esc(p.priceDisplay)}</div><button class="addOrder cardAdd" data-code="${esc(p.code)}">Add to order</button></div></article>`}
function render(){
  let a=filtered();
  $("#count").textContent=a.length.toLocaleString();
  const byCat={};
  a.forEach(p=>{(byCat[p.category]=byCat[p.category]||[]).push(p)});
  const orderedCats=categories.filter(c=>byCat[c]&&byCat[c].length);
  $("#products").innerHTML=orderedCats.map(cat=>{
    const items=byCat[cat];
    return `<section class="catSection">
      <div class="catHeader"><h2>${esc(categoryLabel(cat))}</h2><span class="catCount">${items.length} item${items.length===1?"":"s"}</span></div>
      <div class="grid">${items.map(cardHtml).join("")}</div>
    </section>`;
  }).join("");
  $("#empty").hidden=a.length>0;
}
function openDetail(p){$("#detailImg").src=imageFor(p);$("#detailImg").alt=p.code;$("#detailCat").textContent=categoryLabel(p.category);$("#detailCode").textContent=p.code;$("#detailDesc").textContent=p.description;$("#detailPrice").textContent=p.priceDisplay;$("#waBtn").onclick=()=>location.href="https://wa.me/?text="+encodeURIComponent(`Product: ${p.code}\n${p.description}\nPrice: ${p.priceDisplay}`);$("#detail").hidden=false}
$("#products").onclick=e=>{
  let addBtn=e.target.closest(".cardAdd");
  if(addBtn){e.stopPropagation();addToCart(addBtn.dataset.code,1);addBtn.textContent="Added ✓";setTimeout(()=>{addBtn.textContent="Add to order"},900);return}
  let c=e.target.closest(".card");if(c)openDetail(PRODUCTS[+c.dataset.i])
};
$("#closeDetail").onclick=()=>$("#detail").hidden=true;document.querySelectorAll("#detail .backdrop")[0].onclick=()=>$("#detail").hidden=true;
$("#search").oninput=e=>{state.q=e.target.value;render()};$("#clearBtn").onclick=()=>{$("#search").value="";state.q="";render()};
$("#shareBtn").onclick=async()=>{if(navigator.share)try{await navigator.share({title:"Techtrends Pvt Ltd - Product Catalogue",text:"View Techtrends Pvt Ltd product catalogue",url:location.href})}catch(e){}};

let detailProduct=null;
const _origOpenDetail=openDetail;
openDetail=function(p){detailProduct=p;_origOpenDetail(p)};
$("#detailAddBtn").onclick=()=>{if(!detailProduct)return;addToCart(detailProduct.code,1);$("#detailAddBtn").textContent="Added ✓";setTimeout(()=>{$("#detailAddBtn").textContent="Add to order"},900)};

function renderCartItems(){
  const entries=Object.entries(state.cart);
  $("#cartEmpty").hidden=entries.length>0;
  $("#cartItems").innerHTML=entries.map(([code,qty])=>{
    const p=PRODUCTS.find(x=>x.code===code);
    if(!p)return"";
    return `<div class="cartRow" data-code="${esc(code)}">
      <div class="cartRowInfo"><div class="code">${esc(p.code)}</div><div class="desc">${esc(p.description)}</div><div class="cardPrice">${esc(p.priceDisplay)}</div></div>
      <div class="qtyBox"><button class="qtyBtn" data-act="dec">−</button><span class="qtyVal">${qty}</span><button class="qtyBtn" data-act="inc">+</button></div>
    </div>`;
  }).join("");
  $("#cartTotal").textContent=fmtLKR(cartTotal());
}

$("#cartFab").onclick=()=>{renderCartItems();$("#cartModal").hidden=false};
$("#closeCart").onclick=()=>$("#cartModal").hidden=true;
document.querySelectorAll("#cartModal .backdrop")[0].onclick=()=>$("#cartModal").hidden=true;

$("#cartItems").onclick=e=>{
  const row=e.target.closest(".cartRow");if(!row)return;
  const code=row.dataset.code;const btn=e.target.closest(".qtyBtn");if(!btn)return;
  const current=state.cart[code]||0;
  setQty(code, btn.dataset.act==="inc"?current+1:current-1);
};

$("#sendOrderBtn").onclick=()=>{
  const entries=Object.entries(state.cart);
  if(entries.length===0)return;
  const name=$("#custName").value.trim();
  let lines=[`Techtrends Pvt Ltd - New order${name?" from "+name:""}:`,""];
  entries.forEach(([code,qty])=>{
    const p=PRODUCTS.find(x=>x.code===code);if(!p)return;
    lines.push(`${qty} x ${p.code} - ${p.description} (${p.priceDisplay} each)`);
  });
  lines.push("",`Total: ${fmtLKR(cartTotal())}`);
  location.href="https://wa.me/?text="+encodeURIComponent(lines.join("\n"));
};

if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
renderCategories();render();updateCartUI();