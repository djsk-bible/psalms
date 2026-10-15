/* 시편 읽기표 오프라인 파일 — 고칠 때마다 VER 숫자를 올려 주세요 */
var VER="psalm-v19";
var FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","favicon-32.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(VER).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VER}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==="navigate"){
    /* 화면: 인터넷 먼저(새 버전), 안 되면 저장본 */
    e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(VER).then(function(c){c.put("index.html",cp)});return res})
      .catch(function(){return caches.match("index.html").then(function(m){return m||caches.match("./")})}));
    return;
  }
  /* 그림·설정 파일: 저장본 먼저 */
  e.respondWith(caches.match(r).then(function(m){return m||fetch(r)}));
});
