# Trollgg

web site for find troll

1. 학습시킨 후 db에 저장된 data로부터 웹으로 정보를 부른다.
2. 소환사 이름으로 트롤 위험도를 나타내서 보여준다.



## 폴더구조

├── README.md                               - 프로젝트 설명 파일
├── SECURITY.md                             - github LSD dependency issue 해결용 파일
└── trollgg/                                - 전체 소스 저장된 폴더
    │
    ├── public/                             - 공용폴더
    │   ├── index.html                      - html로 출력용 파일
    │   └── robots.txt                      - github crawl bot용 파일
    │
    ├── src/                                - UI components
    │   ├── api/                            - api 묶음
    │   │   ├── API.js                      - 서버에게 request할 url. 필요한 response 정보를 return하는 함수 정의
    │   │   └── fetch.js                    - 서버와 http 통신할 때 공용으로 사용하는 함수 정의
    │   │
    │   ├── assets/                         - text font, images 폴더
    │   │
    │   │── components/                     - UI components
    │   │   ├── summoner_profile/           - Result.js의 component 묶음
    │   │   │   │   
    │   │   │   ├── header_contents/        - Troll 위험도 text 상단에 위치한 component 묶음
    │   │   │   │   └── TopHeaderBox.js     - progressBar 위에 위치한 유저 명, tier 테두리, profile image
    │   │   │   │   
    │   │   │   ├── main_contents/          - Result.js의 우측 component 묶음
    │   │   │   │   ├── game_stats_box/     - Game status box component 묶음
    │   │   │   │   │   ├── Box1.js         - 좌측 component, 최근 솔로랭크 20 경기의 승률 graph, KDA, 평점, 킬 관여율
    │   │   │   │   │   ├── Box2.js         - 중앙 component, 가장 많이 play한 캐릭터 의 승패 수, 평점
    │   │   │   │   │   ├── Box3.js         - 우측 component, 가장 선호하는 2개 position 승률, 빈도
    │   │   │   │   │   └── GameStatsBox.js - Game status box's root
    │   │   │   │   │   
    │   │   │   │   ├── GameAndItemList.js  - 매 game 정보 list
    │   │   │   │   ├── HeaderBox.js        - Main content's header
    │   │   │   │   └── MainContents.js     - Main content's root
    │   │   │   │   
    │   │   │   └── side_contents/          - Result.js의 좌측 component 묶음
    │   │   │       ├── MostPickInfoBox.js  - Most 7picks 정보
    │   │   │       ├── SideContents.js     - Side content's root
    │   │   │       └── TierRaingBox.js     - user tier, rating 정보 
    │   │   │    
    │   │   ├── Home.js                     - Main page
    │   │   ├── Rank.js                     - user의 rank 정보
    │   │   ├── Result.js                   - user 정보 및 troll 결과
    │   │   ├── Statistics.js               - user tier 통계
    │   │   └── test.js                     - test with dummy data(JSON)
    │   │
    │   ├── container/                      - Component 부기능 UI 묶음
    │   │   └── ProgressBar.js              - ProgressBar
    │   │
    │   ├── router/                         - routing 묶음
    │   │   └── TopNavBar.js                - 최상단 navbar routing
    │   │
    │   ├── util/                           - 부차적 기능 묶음
    │   │   ├── Tier.js                     - user tier 정보 
    │   │   └── User.js                     - tier별 user 수 
    │   │
    │   ├── App.js                          - Component 묶음
    │   ├── index.css                       - Root html 속성
    │   ├── index.js                        - React component 
    │   ├── Root.js                         - App.js를 Browser로 출력
    │   ├── serviceWorker.js                - Execute script in Browser background
    │   └── setupTests.js                   - Unit test
    │ 
    ├── debug.log                           - 디버깅
    ├── package.json                        - npm 설정
    ├── package-lock.json                   - npm 버전범위 설정
    ├── yarn.lock                           - yarn 버전범위 설정
    └── .gitignore                          - github로 업로드 하지 않을 파일 및 폴더 리스트