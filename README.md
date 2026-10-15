# 시편 읽기표 v19

시편 150편 읽기 체크 앱입니다. (성경 본문은 없고, 읽은 편만 체크합니다)

## 깃허브에 올리는 방법
1. 깃허브에서 새 저장소(Repository)를 만들어요. 예: `psalm` · Public 선택
2. **Add file → Upload files** 에서 이 폴더의 파일을 **모두** 끌어다 놓고 **Commit changes**
3. **Settings → Pages** → Branch를 `main` / `/(root)` 로 고르고 **Save**
4. 1~2분 뒤 주소가 생겨요: `https://아이디.github.io/psalm/`

## 파일 설명
- `index.html` — 앱 본체
- `manifest.webmanifest` — 앱 이름·아이콘 정보 (설치용)
- `sw.js` — 인터넷이 없어도 열리게 하는 파일
- `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` — 아이콘

## 고칠 때
- `index.html` 을 바꿔 올리면 다음에 앱을 열 때 새 버전이 보여요.
- 같이 `sw.js` 첫 줄의 `psalm-v19` 숫자도 올려 주세요 (예: `psalm-v20`).

## 주의
- 기록은 각자 휴대폰(그 브라우저)에만 저장돼요. 다른 폰으로 옮길 때는 설정 → 기록 내보내기/불러오기를 써요.
- 주소(저장소 이름)를 나중에 바꾸면 기존 기록이 안 보일 수 있어요. 처음부터 정한 이름을 계속 쓰세요.
