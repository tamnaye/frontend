
<div align=center>
  
## '더큰내일센터 온라인 회의실 예약 시스템' 프로젝트
</div>

<br/>

### 📌 목차 
1. [프로젝트 배경]
2. [프로젝트 소개]
3. [기술스택]
4. [DB구조]
5. [페이지별 구현기능]
6. [개발 및 기획]

<br/>

## 1. 프로젝트 배경
<div align=center>
  
### 현재 더큰내일센터(이하 센터) 내 회의실 예약 시스템 현황

<br/>
</div>

| 수기 작성 | LMS(센터 내 웹사이트) 장소대관 페이지|
|:------:|:------------:|
|<img width="425" alt="스크린샷 2022-09-12 오후 9 52 30" src="https://user-images.githubusercontent.com/85235063/189785872-15dd59a3-fbaf-4da6-adaa-2da3f15a8847.png">|<img width="567" alt="스크린샷 2022-09-12 오후 9 51 03" src="https://user-images.githubusercontent.com/85235063/189785946-8269da48-11f6-4f4e-9696-b3ea04f8e3d1.png">|
 <div align=right>
(*더큰내일센터: 제주의 미래를 위한 프로젝트를 창출할 수 있는 혁신적 인재를 육성하는 기관)
</div>

<br/>

* 수기작성: 직접 회의실들을 돌아다녀야 하는 번거로움과 언제 적었는지 모르는 모호함으로인해 종종 혼란 야기
* LMS: 센터 내 알고 있는 사람이 많지는 않으며 실 사용자 10명, 작성 횟수 15번일 정도로 활용도가 낮음. 또한 한눈에 현재 회의실 현황을 알 수 없어 불편함이 따름

#### 📌 프로젝트 목적 : 실제 센터 내에서 사용할 수 있는 더큰내일센터 회의실 온라인 예약 시스템을 개발한다. 센터 내 상황을 최대한 반영하여 사용하는데 가장 편리한 기능들을 구현한다.

<br/>

## 2. 프로젝트 소개 

- 프로젝트 기간(기회부터 개발까지): 2022/08/01 ~ 2022/09/23 
- 센터 내 상황을 반영하여 직원(MANAGER)과 교육생(USER)일 때의 권한 차이를 두어 기능의 범위를 다르게 구현
- 편의를 위해 로그인을 LMS와 연동하여 간편로그인으로 구현 및 모바일 화면을 위한 반응형 웹 구현 
- 유지보수를 위한 어드민페이지를 통해 모든 데이터를 다룰 수 있도록 구현 

<br/>


## 3. 기술스택

| React | Springboot | Mariadb | Mybatis | OracleColud | 
|:------:|:------:|:------:|:------:|:------:|
|![React-icon svg](https://user-images.githubusercontent.com/85235063/189798318-2c7fe7d2-b9ea-45a8-a373-8386474da228.png)|![spring](https://user-images.githubusercontent.com/85235063/189798456-35af17d6-c99e-4412-9057-e01c79cf6d9c.png)|![mariadb](https://user-images.githubusercontent.com/85235063/189801497-829ad6eb-1649-446b-968c-073416987b59.png) | ![mybatis](https://user-images.githubusercontent.com/85235063/189801070-15b28cf1-78e7-4e76-9bf1-82f86999a86f.jpeg) | <img width="114" alt="oracle" src="https://user-images.githubusercontent.com/85235063/189800843-0b890118-80b8-4ec6-80af-0ece725a8441.png"> | 

<br/>

## 4. DB 구조
<img width="567" alt="스크린샷 2022-09-26 오후 2 04 09" src="https://user-images.githubusercontent.com/85235063/193454923-11e75bd8-da82-496d-9597-13ad60d7a25a.png">

<br/>

## 5. 페이지별 구현기능
> ### 1. 로그인 및 로그인 유지 기능
> LMS와 연동한 간편 로그인, Filter를 활용한 JWT 구현
>
> *로그인 유지: access토큰이 만료된 경우 refresh토큰을 통해 재발급되도록 구현
>
>     (1) 로그인 시 access, refresh 토큰을 발급하여 refresh토큰은 DB에 저장하고 두 토큰을 헤더에 실어 프론트로 보냄
>     (2) 프론트는 헤더를 통해 받은 두 토큰을 브라우저의 로컬스토리지에 저장하여 요청시 마다 헤더에 두 토큰을 실어 보냄
>     (3) access토큰이 만료된 경우 프론트에서 받은 refresh토큰과 DB에 저장된 refresh토큰을 비교하고 일치할 경우 access토큰을 재발급함

|로그인 페이지| JWT|
|:-----:|:-----:|
|<img width="400" alt="스크린샷 2022-09-13 오후 3 18 53" src="https://user-images.githubusercontent.com/85235063/189826559-a79dd59d-f698-4af1-a51f-fdc16d55703a.png">|<img width="450" alt="KakaoTalk_Photo_2022-09-26-16-00-46" src="https://user-images.githubusercontent.com/85235063/193456915-aea6e7dc-adff-435f-890c-4914877fe57c.png">|

<br/>

> ### 2. 메인 페이지
> 교육생 기수마다 사용하는 층수가 달라 사용하는 층수의 회의실만을 보여주고 매니저는 회의실을 관리하므로 모든 층의 회의실을 보여줌
> 
> 회의실의 위치를 파악할 수 있도록 센터 내 구조를 반영, 예약만료 기능 구현, 예약은 당일예약만을 하므로 오전 8시반 ~ 오후 9시에만 활성화

| 최신 기수 | 나머지 기수 | 매니저(직원) |
|:------:|:------:|:------:|
|<img width="284" alt="스크린샷 2022-09-13 오후 3 45 25" src="https://user-images.githubusercontent.com/85235063/189829598-a8957004-7c21-4f16-a7e8-459a4ad85a6f.png">  | <img width="284" alt="스크린샷 2022-09-13 오후 3 36 56" src="https://user-images.githubusercontent.com/85235063/189828022-75e13892-6f25-474b-bee7-6197f8da3b6d.png">| ![화면_기록_2022-09-13_오후_3_51_04_AdobeExpress](https://user-images.githubusercontent.com/85235063/189830918-bb2127b4-7e5f-48b2-862f-1c5f440beb83.gif)|

<br/>
<br/>

> ### 3. 예약 페이지 
> 회의실은 2인이상을 규칙으로함으로 함께 쓸 팀원 검색 및 버튼을 통해 선택 가능
> 
> 회의실 및 개인 자습실 최대 시간에 맞게 시간버튼 활성화, 현재 시간보다 지난 시간 및 이미 예약된 시간 버튼 비활성화
>
> ❗️회의실 예약 규칙
> 
> 규칙1. 현재 센터내 회의실 예약 규칙을 반영하여 회의실 및 개인 자습실, 스튜디오 각각의 횟수에 맞게 구현
> 
>     (1) 회의실 및 스튜디오: 각각 1일 1회 예약 신청 가능(단, 예약의 팀원으로는 동시간대를 제외하고 제한없이 참여 가능)
>     (2) 개인 자습실일 경우: 1일 최대 2시간 예약 가능(즉, 2시간 연속 허용 및 1시간씩 2번 예약 허용)
> 규칙2. 교육생 동시간대 예약불가 기능 구현
> 
> 규칙3. 공식일정으로 인해 매니저가 예약하는 경우 우선예약 구현  
> 
> ❗️매니저인 경우: 시간버튼에 추가적으로 인재예약 확인이 가능하도록 구현, 예약 회의실 최대 예약 시간 제한 없음, 동시간대 예약 가능


|인재 화면 기준|
|:------------:|

| 회의실 | 개인 자습실 |
|:------:|:------:|
|<img width="510" alt="스크린샷 2022-09-13 오후 4 00 28" src="https://user-images.githubusercontent.com/85235063/189855406-07916773-cf6f-4e43-8340-0772fa4cf18f.png"> | <img width="510" alt="스크린샷 2022-09-13 오후 4 02 24" src="https://user-images.githubusercontent.com/85235063/189833070-1c90dd22-96e5-4aaa-9887-40a8a70522fd.png">|


|매니저 화면 기준|
|:--------------:|

| 회의실 |
|:------:|
|<img width="317" alt="스크린샷 2022-10-02 오후 10 16 06" src="https://user-images.githubusercontent.com/85235063/193456040-90a5ef53-374f-424b-93f2-f5597e1bb4ec.png">|
<br/>
<br/>

> ### 4. 마이페이지
> 자신의 예약 현황을 보여줌(선택된 팀원일 경우에도 마이페이지에서 자신이 예약된 예약들을 모두 볼 수 있음)
> 
> 내 예약이 매니저의 공식일정으로 인한 예약과 겹쳤을 경우 사용불가로 표시하여 알림, 시간이 지난 예약은 비활성화, 자신이 예약한 예약만 취소가능
> 
> *공식일정이 취소되었을 시: 예약 취소 당시 2시간 이후의 예약들만 다시 예약 활성화(단, 기존 규칙에 벗어나지 않는 한의 예약만을 활성화)
>
> *기존 규칙을 벗어나는 예약: 
> 
>     (1) 공식일정으로 바뀐 후 기존 예약자가 다시 다른 회의실을 예약한 경우(1인 1회 예약 규칙을 벗어남)
>     (2) 공식일정으로 취소된 기존 예약과 동시간대 새로운 회의에 연관된 회의 참여자가 있을 경우(동시간대 예약 불가 규칙을 벗어남)
> 위의 두가지 경우 공식 일정을 취소할 경우 기존 예약을 활성화하지 않고 삭제되도록 구현. 즉, 가장 최신의 예약을 우선시함

| 교육생 마이페이지| 매니저 마이페이지 |
|:------:|:------:|
| <img width="510" alt="스크린샷 2022-09-13 오후 4 19 55" src="https://user-images.githubusercontent.com/85235063/189836387-a9f24f6c-8333-4c66-b797-338c8f861d18.png"> | <img width="510" alt="스크린샷 2022-09-13 오후 4 10 48" src="https://user-images.githubusercontent.com/85235063/189835817-c8c632c9-5493-494d-8029-056aaf193dbc.png"> |

<br/>
<br/>

> ### 5. 예약 현황페이지 
> 예약 현황을 한눈에 파악할 수 있고, 상단의 회의실 이름을 클릭하여 예약페이지로 쉽게 이동할 수 있도록 구현

<img width="510" alt="스크린샷 2022-09-13 오후 4 58 12" src="https://user-images.githubusercontent.com/85235063/189845062-e328f7bf-0ea8-468c-8720-02849613d006.png"> 
<br/>
<br/>

>  ### 6. 어드민페이지
> 파일 업로드를 통한 최신기수 업로드, 유저 회원정보 CRUD, 기수별 층수관리, 회의실 데이터 수정
>
<img width="510" alt="스크린샷 2022-10-02 오후 11 12 21" src="https://user-images.githubusercontent.com/85235063/193458532-9f1632f5-b422-469a-9d52-d3ffe51d6fc5.png">

## 6. 개발 및 기획
- 송민아 [m1naworld](https://github.com/m1naworld)
- 안수빈 [AnSuebin](https://github.com/AnSuebin)
- 이현정 [cchloe0927](https://github.com/cchloe0927)
- 조무결 [mugyeol](https://github.com/mugyeol)


## 7. 프로젝트 과정 기록
 - 노션 : https://www.notion.so/621ecd901e604f6d922ab080b0c77a0f
 - 프레젠테이션 : https://docs.google.com/presentation/d/1Klc-cPABwICCtTyXdc9YBTwJiMS7nWjG/edit?usp=sharing&ouid=116140859951012349127&rtpof=true&sd=true

