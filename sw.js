const VERSION="catalogue-cache-v4";const STATIC=[ "./","./index.html","./style.css","./app.js","./products.js","./category-icons.js","./manifest.webmanifest" ];
self.addEventListener("install",e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 const r=e.request;
 if(r.method!=="GET")return;
 if(r.destination==="image"){
   e.respondWith((async()=>{
     const c=await caches.open(VERSION);
     const hit=await c.match(r);
     if(hit)return hit;
     try{const res=await fetch(r);if(res.ok)c.put(r,res.clone());return res}catch(err){return new Response("",{status:503})}
   })());
 }else{
   e.respondWith((async()=>{const c=await caches.open(VERSION);const hit=await c.match(r);if(hit)return hit;try{const res=await fetch(r);if(res.ok)c.put(r,res.clone());return res}catch(err){return caches.match("./index.html")}})());
 }
});