/* 시편 읽기표 오프라인 파일 — 고칠 때마다 index.html의 APP_VER, version.json의 v, 이 CACHE 번호를 같이 올려 주세요 */
const CACHE = 'psalm-v26';
const FILES = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon-32.png'];
// 설치할 때 브라우저 캐시를 건너뛰고 새 파일을 받아요 (깃허브 10분 캐시 때문에 옛 파일이 저장되는 것을 막아요)
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE)
  .then(c => c.addAll(FILES.map(f => new Request(f, {cache:'reload'})))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('/version.json')) return;            // 새 버전 확인은 항상 인터넷
  if (/\.(png|webmanifest)$/.test(url.pathname)) {               // 아이콘·앱 정보는 인터넷 먼저
    e.respondWith(fetch(req, {cache:'no-cache'}).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; })
      .catch(() => caches.match(req)));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: req.mode === 'navigate'}).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.type === 'basic') { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return res;
  }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : undefined)));
});
