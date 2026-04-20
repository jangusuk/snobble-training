const { useState, useEffect, useRef } = React;

// ─── LOGO (원본 그대로) ────────────────────────────────────────────────────────
const LOGO_URL = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAChAKEDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAIBBQYHCAME/8QANxAAAQMDAwIFAgQFAwUAAAAAAQACAwQFEQYHEiExCBNBUpEiURRhcYEVFiMysTNCcjWDktPw/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwQFB//EACoRAQEAAQMDBAAFBQAAAAAAAAABAgMRIQQSYRMxQVEFgZGxwRQVMnGh/9oADAMBAAIRAxEAPwDR3N/vd8pzf73fKii+gPPS5v8Ae75Tm/3u+VFEEub/AHu+U5v97vlRRBLm/wB7vlOb/e75UUQS5v8Ae75Tm/3u+VFEEub/AHu+U5v97vlRRBLm/wB7vlOb/e75UUQS5v8Ae75Tm/3u+VFEEub/AHu+U5v97vlRRBLm/wB7vlOb/e75UUQS5v8Ae75RRRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFeNI1mnKK7tl1PZ6u7UOMeTT1n4c5yOpPE5GM9Mt/VWdZps/t9V7janfZqW50luEUJnkkny5xaHAEMYMcndfuBjPXsterljjhbndoslt4Z9bdXeHSLj5u2185+vKoMgz+84z8Kx6v3C26bVGLSG1NlFOB/r3UPe9x/4MeAP/I5Xv4h9q7JtlRWKOguVdX1lwMxmfNxawCMM/taBkZL/UnstQjsuPp9DR1ZNTG2zzazytnDZul9wtFtrY26n2p05UUZOHvtzJIpWD7gOe4O/TLf1WV1+sPDjLkM23vn5Fknl/4nWiQtkeH7QNo3F1XX2O7VtbR+VQOqoZKYtzybIxpBDgcj68+nZXX6fSwxuplbJPq0mVt2Y1r2v0dcbgyTR+na6ywDPNtRX+eH/bDS3LfX/c5Y2tk747U1O2VdRB96prlS15k8jDfLmZxxnkzJ6fV0IPp2HTOtl06GeGenLhd4wyll5ERFuQREQEREBERAREQEREBERAXpS1FRR1MdVSVEtPPE4OjlieWvYR2II6grzWdbIaq03pDWYump7A270jovLYeLXupnZB8xrHdHHpjuCM9D6HDVyuOFsm/hZ7s62ixr+eem3ejvdys1NSOnt91qnTMhpCMGTlOMDDmgf3kjLMDqet6uOkfDHTyuada17CPSnqHSj9iInf5W5bLvTtVf6R0X8y0dO2RhZJDcI3QDB6EHmA0j9CQtSax2e2iv1xfX6U3Js1lbK4ufTGqinhBPs/qNLR+WSB6YXgY69y1L392nPqe37Ojt4+3wUelfDJLKGjW90dk9pZHsHz5I/wAry3MobJoWz2+4bKxXZ81dHJ+NvdA+WpjEAIBhMnVrXF7Q44w4cB6Hr9OnNkdsLdXNqNT7p2i407Opp4KqKnDv+TvMccfpg/mtzT7qbSaSs8NDS6ltUdLTMDIae3gzhoHYARgqZ61xynp3LPxfb9kmPHMkcK3S43C618lfdK6prquT++aolMj3Y6DLiSV8y2r4itd6R1zfaao0vYDRug5fiK+SMRSVROOhaO4GOhcc9T2x11Uve0crlpy3Ht8NGU2oiItqCIiAiIgIiICIiAiKjuyCuD9imD9iu7LbS6ypNA6Th0BS6SZTi1QmpbdBM3DjGwjgIvvlxOfUhYNuW3cT+YtAHWUOkmUR1TSCI2kTmQyZPR3mdOOM9uucLycPxPvy27Z8/PPHjZtulxu5LyFIdAM9M9l1x4ktAWzXdNcbvpUMk1Pp0Nir6SNuHTxOYJGjGMlwa7LSO/1N6kDF6uFFSVHiA0G2opYpBHpyaRgcwHi8YAd+oyVZ+KY3CZTHnnef6m//AE9K77OKzgnuFUA+i6i0vvxqW67tUmkprHYmUU13dROkZDJ5gYJC3IJfjOB9sfkss2yopqXcvd+n0/SUEVWyeldSRzsIgEzopCOYb14lxycdepV1Ovz05bnhtxv7+diYS+1cZFpAyRhB2XetFJrWlpLpU7jUWj5NPw2+V8zLXBUTSuxjILHghzePPIAz2/NY1s0zVJ8PumHaLgsJrjLUeaLuJPLEXnzdvL68s8fyxlav7re23t+ZPfjnfx4X0eXF3YdUPddf+IKW+QbB3Zuu6Oxm6y1kTKF9ohlfEz6mnJc8ZY7AkGegwQO5Wt/F41janRQY0DNlBJHr1aujp+u9Wybe9vz9MctPtaIHU4HVV4u9p+FtDwyDVB3FlOkmWR1wFBJyF28zyfL5Mzjy+vLOMenddNE7446022fzVp1PXXRz7Np+u38GOn3Tdwoi+i5+Z/EqrzuHmec/nw/tzyOcZ9F869CXeNYiIqCIiAiIgKh6hVRBvCy13h5bZaJlzj1Oa8QM/E+XJLx8ziOWMO7ZyrhrHdLb8R6CsOl4bm20afvUNwmmqWkuYxryS0Akucfrcf2A656c/Edcqq4f6DC3fLK382z1L9NxXfd5ts8QFfrzTDp57VV+THUU8jeBqIhExrmkHs4FpIPoQPQkHNNRb4aOm3q05q2jjr5rbSW6ajqsw8ZIzI7IcGk/UB6//A80rN9t4tMz2XUkl80/T3Cpt9vNbTSSVk0Je4Swx+VhjwCMPc779PssdXotGSWy8Tb+Empk2va9UeHO26qi1NSUeom3KKqNW15EhaJC4uzx5Yxknoo6e3Z2/Zq3caovZuj7TqcwMhEMBEhjETmPzhwLT9XTBWK1el9ADauS4RxxnUDbNBVmON8zpfNlmcxrv9Tyy36cFoZkZBOMr767amw22LStNVuD6+KuoW6gDqocZoaqTALC1/0iNzXRnGCch32XJ6ehZZncvrnxyz3u3DJNJ7kbHaHrKu86Zo9SyXB9K+Fsc73ua8Eh3H6nkDJa3rjorXpTcHams2gsejtatvL5LfPLUObSBzAHuklI+prgSOMnb7qyyaK0BLo+eugq2xXak01LXTUj6h2JpnOcI5Yzy7tLS1zO31NOO6u8e3+2lRdoKB1Q2kqmXC5OEb6p5jqqaBzmtjDuWWvbljgf9wa/Oeil0+n2v+W+/wCfG6y5PLXm4e2FNs9dtD6EpryXXOpZM41Zc4MIcwl3JzicYjaMD75Vz1Br/ZHXFoskusaO/sr6CiZTcIA4BmAMjLXYcMjusP1RovT9LtGNQUdBSQVbKK3yiYzyvkndKyIyEf1eAIe97S3h0Df0WovRdGh0ulqY74Wza355Y5Z2XZto1OxkGvKeSCjv8mmv4c8TML5BN+K5jiQeYPHhn17rIzd/DSB/0jVJ/wC/L/7VoLCr6Loy6OZbb55fqx779PSpdE6qlMAcIi88A7uG56Z/ZeaIuyTZgIiICIiAiIgIiICIiAqEZVUQUAHXIHU5VAxgPRjR+ykimwpxGMY9coQCCMDB7qqKiIY0HIAypIimwIiKgiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiD//Z";

// ─── APPLE DESIGN SYSTEM (DESIGN.md 기반) ─────────────────────────────────────
const SF = `-apple-system, 'SF Pro Display', 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif`;

// Colors
const BLACK   = "#000000";      // 히어로 배경
const LGRAY   = "#f5f5f7";      // 라이트 섹션 배경
const CARD_BG = "rgba(255,255,255,0.72)";  // 블러 카드
const NBLACK  = "#1d1d1f";      // 기본 텍스트
const ABLUE   = "#0071e3";      // 유일한 인터랙티브 색상
const LBLUE   = "#0066cc";      // 라이트 배경 링크
const DBLUE   = "#2997ff";      // 다크 배경 링크
const WHITE   = "#ffffff";
const T80     = "rgba(0,0,0,0.8)";
const T48     = "rgba(0,0,0,0.48)";
const DS1     = "#272729";      // 다크 카드 배경
const GREEN   = "#34c759";
const RED     = "#ff3b30";
const AMBER   = "#ff9500";
const PINK    = "#ff2d55";

// Glass Nav
const GLASS_BG  = "rgba(0,0,0,0.8)";
const GLASS_FX  = "saturate(180%) blur(20px)";
// Card shadow
const CARD_SH   = "0px 1px 3px rgba(0,0,0,0.06), 0px 4px 16px rgba(0,0,0,0.06)";

// ─── Storage ──────────────────────────────────────────────────────────────────
// ── Supabase 설정 (배포 시 아래 두 값 교체) ────────────────────────────────────
const SUPABASE_URL = "https://sspxauwdxxthkjuudpop.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_KEY";
const isSupabaseConfigured = !SUPABASE_URL.includes("YOUR_PROJECT_ID");

const store = {
  async get(k){
    if(isSupabaseConfigured){
      try{
        const res=await fetch(`${SUPABASE_URL}/rest/v1/app_data?id=eq.main&select=data`,
          {headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`}});
        if(!res.ok) return null;
        const rows=await res.json();
        return rows?.[0]?.data||null;
      }catch{return null;}
    }
    // Claude 아티팩트 환경
    try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}
  },
  async set(k,v){
    if(isSupabaseConfigured){
      try{
        await fetch(`${SUPABASE_URL}/rest/v1/app_data?id=eq.main`,
          {method:"PATCH",headers:{"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json","Prefer":"return=minimal"},
           body:JSON.stringify({data:v,updated_at:new Date().toISOString()})});
      }catch{}
      return;
    }
    // Claude 아티팩트 환경
    try{await window.storage.set(k,JSON.stringify(v));}catch{}
  }
};

// ─── BMR Calculator ───────────────────────────────────────────────────────────
const calcCalories = (gender, age, height, weight, activityLevel, goal) => {
  const a = {거의없음:1.2,가벼운활동:1.375,보통:1.55,활동적:1.725,매우활동적:1.9};
  const bmr = gender==="남"
    ? 88.362 + (13.397*weight) + (4.799*height) - (5.677*age)
    : 447.593 + (9.247*weight) + (3.098*height) - (4.330*age);
  const tdee = bmr * (a[activityLevel]||1.55);
  const adj = goal==="다이어트" ? -500 : goal==="근력증진" ? 500 : 0;
  return Math.round(tdee + adj);
};

// ─── Init Data ────────────────────────────────────────────────────────────────
const INIT = {
  _v:3,
  trainers:[{id:"t1",name:"김스노블",pin:"1234",approved:true,closedSlots:[]},{id:"t2",name:"이코치",pin:"5678",approved:true,closedSlots:[]}],
  pendingTrainers:[],
  archivedMembers:[],
  members:[
  // ── 다이어트 예시 회원
  {
    id:"m1",name:"박후영",pin:"0000",trainerId:"t1",
    profile:{gender:"여",age:29,height:165,weight:57,targetWeight:52,startWeight:62,startDate:"2025-02-01",bodyFat:27,heartRate:74,goal:"다이어트",activityLevel:"보통",workoutFrequency:"3~4회",targetCalories:1550,consultation:"출산 후 체중 증가. 체중 감량 및 체형 개선 목표. 무릎 통증 이력 있음. 직장인으로 앉아서 일하는 시간이 많음. 스트레스가 많고 야식을 자주 먹는 편.",menstrualCycle:true,whyAnalysis:""},
    ptLogs:[
      {id:"l1",session:1,date:"2025-02-03",weight:62,bodyFat:30,heartRate:80,condition:"보통",content:"체력 측정 및 기초 동작 패턴 평가",trainerNote:"기초 체력 부족. 하체 위주로 시작",nextFocus:"스쿼트 패턴",exercises:[{id:"e1",name:"스쿼트",weight:8,reps:12,sets:3},{id:"e2",name:"푸쉬업",weight:0,reps:10,sets:3},{id:"e3",name:"크런치",weight:0,reps:12,sets:3}]},
      {id:"l2",session:2,date:"2025-02-10",weight:61.2,bodyFat:29.5,heartRate:77,condition:"보통",content:"하체 근력 강화 - 스쿼트, 런지 패턴",trainerNote:"무릎 안쪽 쏠림 주의",nextFocus:"힙힌지 패턴"},
      {id:"l3",session:3,date:"2025-03-03",weight:60.5,bodyFat:29,heartRate:75,condition:"좋음",content:"힙힌지 + 코어 기초",trainerNote:"힙힌지 이해 빠름",nextFocus:"상체 연동"},
      {id:"l4",session:4,date:"2025-03-24",weight:59.1,bodyFat:28,heartRate:73,condition:"좋음",content:"전신 복합 동작 + 밴드 운동",trainerNote:"동작 연결성 좋아짐",nextFocus:"강도 점진적 증가"},
      {id:"l5",session:5,date:"2025-04-10",weight:57,bodyFat:27,heartRate:74,condition:"좋음",content:"케이블 + 힙쓰러스트 위주",trainerNote:"힙 패턴 완성도 높음",nextFocus:"상체 볼륨",exercises:[{id:"e1",name:"케이블 로우",weight:15,reps:15,sets:3},{id:"e2",name:"힙쓰러스트",weight:20,reps:12,sets:3},{id:"e3",name:"사이드 런지",weight:4,reps:15,sets:3}]},
    ],
    selfRecords:[
      {id:"r1",date:"2025-04-13",meal:"아침: 그릭요거트+바나나, 점심: 닭가슴살 도시락",workout:"산책 30분",note:"컨디션 좋음",trainerFeedback:"그릭요거트 선택 훌륭합니다! 이 페이스 유지하세요.",feedbackRead:true},
      {id:"r2",date:"2025-04-14",meal:"아침: 없음, 점심: 김치찌개+흰쌀밥, 간식: 과자",workout:"없음",note:"야근으로 피곤. 야식 참음",trainerFeedback:"",feedbackRead:false},
    ],
    messages:[
      {id:"mg1",from:"member",text:"다음 주 수업 시간 변경 가능한가요?",time:"2025-04-14 11:00",read:true},
      {id:"mg2",from:"trainer",text:"네, 화요일 오전 10시는 어떠세요?",time:"2025-04-14 11:30",read:true},
      {id:"mg3",from:"member",text:"좋아요! 감사합니다 ㅎㅎ",time:"2025-04-14 11:35",read:true},
    ],
    reservations:[
      {id:"rs1",date:"2025-04-22",time:"10:00",status:"확정",note:""},
      {id:"rs2",date:"2025-04-29",time:"10:00",status:"대기",note:""},
    ],
    reviewPoints:[
      {id:"rp1",date:"2025-04-10",tags:["스쿼트","힙힌지"],content:"스쿼트: 발 뒤꿈치가 들리지 않도록 발 전체로 지면을 밀어내세요. 무릎이 안쪽으로 모이지 않게 바깥쪽으로 밀어주는 느낌이 중요합니다.\n\n힙힌지: 등이 굽지 않게 중립 척추를 유지하면서 엉덩이를 뒤로 밀어주세요. 햄스트링에 당기는 느낌이 나면 정확한 겁니다.",read:false},
    ],
    points:5,unreadMessages:0,unreadFeedback:1,expiryDate:"2026-12-31",
  },
  // ── 근력증진 예시 회원
  {
    id:"m2",name:"김근력",pin:"1111",trainerId:"t1",
    profile:{gender:"남",age:27,height:178,weight:75,targetWeight:80,startWeight:70,startDate:"2025-01-15",bodyFat:18,heartRate:65,goal:"근력증진",activityLevel:"활동적",workoutFrequency:"5회이상",targetCalories:2800,consultation:"군 전역 후 체계적인 근력 운동 시작. 3대 운동 합계 300kg 목표.",menstrualCycle:false,whyAnalysis:""},
    ptLogs:[
      {id:"s1",session:1,date:"2025-01-20",weight:70,bodyFat:20,heartRate:68,condition:"보통",content:"기초 체력 측정",trainerNote:"기초 체력 양호",nextFocus:"스쿼트 자세",exercises:[{id:"e1",name:"스쿼트",weight:0,reps:15,sets:3,isCardio:false},{id:"e2",name:"벤치프레스",weight:30,reps:12,sets:3,isCardio:false},{id:"e3",name:"데드리프트",weight:40,reps:10,sets:3,isCardio:false}]},
      {id:"s2",session:2,date:"2025-02-03",weight:71,bodyFat:19.5,heartRate:66,condition:"좋음",content:"하체 강화",trainerNote:"스쿼트 자세 개선 중",nextFocus:"힙힌지",exercises:[{id:"e1",name:"스쿼트",weight:20,reps:12,sets:3,isCardio:false},{id:"e2",name:"벤치프레스",weight:40,reps:10,sets:3,isCardio:false},{id:"e3",name:"데드리프트",weight:60,reps:8,sets:3,isCardio:false}]},
      {id:"s3",session:3,date:"2025-02-17",weight:72,bodyFat:19,heartRate:65,condition:"좋음",content:"상체 강화",trainerNote:"벤치프레스 진도 빠름",nextFocus:"랫풀다운 추가",exercises:[{id:"e1",name:"스쿼트",weight:40,reps:10,sets:4,isCardio:false},{id:"e2",name:"벤치프레스",weight:55,reps:8,sets:4,isCardio:false},{id:"e3",name:"데드리프트",weight:80,reps:6,sets:3,isCardio:false},{id:"e4",name:"풀업",weight:0,reps:8,sets:3,isCardio:false}]},
      {id:"s4",session:4,date:"2025-03-10",weight:73.5,bodyFat:18.5,heartRate:64,condition:"매우좋음",content:"전신 복합 운동",trainerNote:"3대 운동 모두 증량 성공",nextFocus:"볼륨 증가",exercises:[{id:"e1",name:"스쿼트",weight:60,reps:8,sets:4,isCardio:false},{id:"e2",name:"벤치프레스",weight:70,reps:6,sets:4,isCardio:false},{id:"e3",name:"데드리프트",weight:100,reps:5,sets:3,isCardio:false},{id:"e4",name:"풀업",weight:5,reps:8,sets:3,isCardio:false}]},
      {id:"s5",session:5,date:"2025-04-01",weight:75,bodyFat:18,heartRate:63,condition:"매우좋음",content:"최고 기록 갱신",trainerNote:"3대 합계 230kg 달성",nextFocus:"230→270kg 목표",exercises:[{id:"e1",name:"스쿼트",weight:80,reps:6,sets:5,isCardio:false},{id:"e2",name:"벤치프레스",weight:85,reps:5,sets:5,isCardio:false},{id:"e3",name:"데드리프트",weight:120,reps:4,sets:4,isCardio:false},{id:"e4",name:"풀업",weight:10,reps:8,sets:3,isCardio:false},{id:"e5",name:"카디오",weight:0,reps:0,sets:0,isCardio:true,cardioTime:20,cardioAvgHR:145}]},
    ],
    selfRecords:[],messages:[],reservations:[{id:"rs1",date:"2026-04-22",time:"09:00",status:"확정",note:""}],reviewPoints:[],
    points:8,unreadMessages:0,unreadFeedback:0,expiryDate:"2026-12-31",
  },
  // ── 통증해결 예시 회원
  {
    id:"m3",name:"이통증",pin:"2222",trainerId:"t1",
    profile:{gender:"여",age:42,height:163,weight:62,targetWeight:62,startWeight:65,startDate:"2025-02-01",bodyFat:30,heartRate:76,goal:"통증해결",activityLevel:"가벼운활동",workoutFrequency:"1~2회",targetCalories:1800,consultation:"오른쪽 무릎 반월판 연골 손상 이력. 허리 디스크 L4-L5. 일상생활에서 통증 줄이고 기능 회복 목표.",menstrualCycle:true,whyAnalysis:"",painAreas:["무릎(우)","허리"]},
    ptLogs:[
      {id:"p1",session:1,date:"2025-02-10",weight:65,bodyFat:31,heartRate:78,condition:"나쁨",content:"통증 평가 및 기초 운동",trainerNote:"무릎·허리 통증 심함. 낮은 강도로 시작",nextFocus:"코어 강화",exercises:[{id:"e1",name:"폼롤러",weight:0,reps:10,sets:2,isCardio:false},{id:"e2",name:"버드독",weight:0,reps:10,sets:3,isCardio:false}]},
      {id:"p2",session:2,date:"2025-02-24",weight:64.5,bodyFat:30.5,heartRate:77,condition:"보통",content:"코어 강화 중심",trainerNote:"통증 조금 줄었다고 함",nextFocus:"스트레칭 루틴",exercises:[{id:"e1",name:"플랭크",weight:0,reps:30,sets:3,isCardio:false},{id:"e2",name:"버드독",weight:0,reps:12,sets:3,isCardio:false},{id:"e3",name:"스트레칭",weight:0,reps:5,sets:1,isCardio:false},{id:"e4",name:"카디오",weight:0,reps:0,sets:0,isCardio:true,cardioTime:15,cardioAvgHR:120}]},
      {id:"p3",session:3,date:"2025-03-15",weight:63.5,bodyFat:30,heartRate:76,condition:"보통",content:"하체 기능 강화",trainerNote:"무릎 통증 50% 감소 보고",nextFocus:"계단 오르기 연습",exercises:[{id:"e1",name:"플랭크",weight:0,reps:45,sets:3,isCardio:false},{id:"e2",name:"런지",weight:0,reps:10,sets:2,isCardio:false},{id:"e3",name:"카디오",weight:0,reps:0,sets:0,isCardio:true,cardioTime:20,cardioAvgHR:115}]},
      {id:"p4",session:4,date:"2025-04-05",weight:62,bodyFat:29.5,heartRate:75,condition:"좋음",content:"기능적 움직임 훈련",trainerNote:"일상생활 통증 크게 줄어듦",nextFocus:"계단·경사로 훈련",exercises:[{id:"e1",name:"사이드플랭크",weight:0,reps:30,sets:3,isCardio:false},{id:"e2",name:"스텝업",weight:0,reps:12,sets:3,isCardio:false},{id:"e3",name:"카디오",weight:0,reps:0,sets:0,isCardio:true,cardioTime:25,cardioAvgHR:118}]},
    ],
    selfRecords:[
      {id:"pr1",date:"2025-04-08",condition:"보통",meals:{아침:"",점심:"",저녁:"",간식:""},exerciseLogs:[],reviewChecks:{},painLog:{areas:["무릎(우)"],intensity:5,memo:"계단 오를 때 약간 불편함"},trainerFeedback:"",feedbackRead:false},
      {id:"pr2",date:"2025-04-09",condition:"좋음",meals:{},exerciseLogs:[],reviewChecks:{},painLog:{areas:["허리"],intensity:4,memo:"아침 기상 시 뻣뻣함, 오후에 풀림"},trainerFeedback:"",feedbackRead:false},
      {id:"pr3",date:"2025-04-10",condition:"좋음",meals:{},exerciseLogs:[],reviewChecks:{},painLog:{areas:["무릎(우)","허리"],intensity:3,memo:"전반적으로 어제보다 나음"},trainerFeedback:"",feedbackRead:false},
      {id:"pr4",date:"2025-04-11",condition:"매우좋음",meals:{},exerciseLogs:[],reviewChecks:{},painLog:{areas:["무릎(우)"],intensity:2,memo:"무릎 거의 안 아팠어요!"},trainerFeedback:"통증이 많이 줄었네요! 이 페이스 계속 유지해요 :)",feedbackRead:true},
      {id:"pr5",date:"2025-04-12",condition:"좋음",meals:{},exerciseLogs:[],reviewChecks:{},painLog:{areas:[],intensity:1,memo:"오늘은 거의 통증 없었음"},trainerFeedback:"",feedbackRead:false},
      {id:"pr6",date:"2025-04-13",condition:"보통",meals:{},exerciseLogs:[],reviewChecks:{},painLog:{areas:["허리"],intensity:3,memo:"오래 앉아 있었더니 허리가 뻐근함"},trainerFeedback:"",feedbackRead:false},
      {id:"pr7",date:"2025-04-14",condition:"좋음",meals:{},exerciseLogs:[],reviewChecks:{},painLog:{areas:["무릎(우)"],intensity:2,memo:"걷기 운동 30분, 무릎 괜찮았음"},trainerFeedback:"",feedbackRead:false},
    ],
    messages:[],reservations:[],reviewPoints:[],
    points:4,unreadMessages:0,unreadFeedback:1,expiryDate:"2026-12-31",
  }]
};

// ─── AI ───────────────────────────────────────────────────────────────────────
const aiCall = async(system,msg,hist=[])=>{
  try{
    const messages = hist.length>0 ? [...hist,{role:"user",content:msg}] : [{role:"user",content:msg}];
    const res = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages})
    });
    const d = await res.json();
    return d.content?.[0]?.text || "오류가 발생했습니다.";
  }catch{return "AI 연결 오류. 잠시 후 다시 시도해주세요.";}
};

// ─── Design Tokens applied to components ─────────────────────────────────────

// 글래스 내비 스타일
const navStyle = {
  background: "rgba(0,0,0,0.82)",
  backdropFilter: "saturate(200%) blur(24px)",
  WebkitBackdropFilter: "saturate(200%) blur(24px)",
  padding: "0 20px",
  height: 52,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  position: "sticky",
  top: 0,
  zIndex: 100,
  borderBottom: "0.5px solid rgba(255,255,255,0.08)",
};

// 버튼 컴포넌트
const Btn = ({ch, onClick, v="primary", full, sm, dis, sx={}}) => {
  const base = {
    fontFamily: SF, cursor: dis?"not-allowed":"pointer", opacity: dis?0.4:1,
    width: full?"100%":"auto", border:"none", transition:"opacity 0.15s",
    fontSize: sm?14:17, fontWeight:400, letterSpacing:"normal",
    padding: sm?"7px 15px":"10px 20px",
  };
  const variants = {
    primary: {...base, background:ABLUE, color:WHITE, borderRadius:8},
    dark:    {...base, background:NBLACK, color:WHITE, borderRadius:8},
    pill:    {...base, background:"transparent", color:LBLUE, borderRadius:980, border:`1px solid ${LBLUE}`, fontSize:14, letterSpacing:"-0.224px"},
    "pill-dark": {...base, background:"transparent", color:DBLUE, borderRadius:980, border:`1px solid ${DBLUE}30`, fontSize:14, letterSpacing:"-0.224px"},
    "pill-filled":{...base, background:ABLUE, color:WHITE, borderRadius:980, fontSize:14},
    ghost:   {...base, background:"transparent", color:NBLACK, border:`1px solid #d2d2d7`, borderRadius:8},
    danger:  {...base, background:RED, color:WHITE, borderRadius:8},
    success: {...base, background:GREEN, color:WHITE, borderRadius:8},
  };
  return <button onClick={onClick} disabled={dis} style={{...variants[v],...sx}}>{ch}</button>;
};

// 인풋
const Inp = ({label,...p}) => (
  <div style={{marginBottom:14}}>
    {label && <div style={{fontFamily:SF,fontSize:12,color:T48,marginBottom:6,letterSpacing:"-0.12px",fontWeight:500}}>{label}</div>}
    <input {...p} style={{
      width:"100%", padding:"13px 15px", borderRadius:12,
      border:"1px solid rgba(0,0,0,0.1)", fontSize:16, color:NBLACK,
      background:WHITE, outline:"none", boxSizing:"border-box",
      fontFamily:SF, letterSpacing:"-0.374px", lineHeight:1.47,
      transition:"border-color 0.15s",
      ...p.style
    }}/>
  </div>
);

// 칩
const Chip = ({label, active, onClick}) => (
  <button onClick={onClick} style={{
    padding:"7px 15px", borderRadius:980, fontSize:13, fontWeight: active?600:400,
    cursor:"pointer", fontFamily:SF, letterSpacing:"-0.2px",
    background: active?NBLACK:WHITE, color: active?WHITE:T48,
    border: `1px solid ${active?NBLACK:"rgba(0,0,0,0.1)"}`,
    transition:"all 0.15s",
    boxShadow: active?"0 2px 8px rgba(0,0,0,0.2)":"none",
  }}>{label}</button>
);

// 카드 — 흰색, 보더 없음, 애플 쉐도우
const Card = ({children, dark=false, sx={}, onClick}) => (
  <div onClick={onClick} style={{
    background: dark?DS1:WHITE,
    borderRadius:14,
    padding:16,
    boxShadow: CARD_SH,
    border: dark?"none":"1px solid rgba(0,0,0,0.04)",
    ...sx
  }}>{children}</div>
);

// 뱃지
const Bdg = ({n}) => n>0 ? (
  <span style={{background:RED, color:WHITE, borderRadius:20, padding:"1px 7px", fontSize:11, fontWeight:700, marginLeft:4}}>{n}</span>
) : null;

// 로고
const Logo = ({sz=36}) => (
  <img src={LOGO_URL} alt="SNOBBLE" style={{width:sz, height:sz, borderRadius:sz*0.18, objectFit:"cover"}}/>
);

// 상태 뱃지
const StatusBadge = ({s}) => {
  const col = {확정:GREEN, 대기:AMBER, 취소:RED}[s]||T48;
  return (
    <span style={{background:`${col}18`, color:col, padding:"4px 12px", borderRadius:980, fontSize:12, fontWeight:600, fontFamily:SF}}>{s}</span>
  );
};

// ─── Blog ─────────────────────────────────────────────────────────────────────
const BLOG_URL = "https://blog.naver.com/igtrainer";
const RSS_URL  = "https://rss.blog.naver.com/igtrainer";
const PROXY    = "https://api.allorigins.win/get?url=";

const fetchBlogPosts = async () => {
  try{
    const res = await fetch(PROXY+encodeURIComponent(RSS_URL),{signal:AbortSignal.timeout(6000)});
    const data = await res.json();
    const doc  = new DOMParser().parseFromString(data.contents,"text/xml");
    const items = Array.from(doc.querySelectorAll("item")).slice(0,5);
    if(!items.length) return null;
    return items.map(item => {
      const t = tag => (item.getElementsByTagName(tag)[0]?.textContent||"").replace(/<!\[CDATA\[/g,"").replace(/\]\]>/g,"").trim();
      const body = t("description").replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
      return {title:t("title")||"제목 없음", body:body.length>100?body.slice(0,100)+"...":body||"블로그에서 확인하세요.", link:t("link")||BLOG_URL, date:t("pubDate")?new Date(t("pubDate")).toLocaleDateString("ko-KR"):null};
    });
  }catch{return null;}
};

const DEFAULT_COLS = [
  {title:"왜 살을 빼러 운동을 시작하면 안 되는가",body:"체중 감량만을 목적으로 운동을 시작했을 때 90%는 3개월 안에 포기합니다.",link:BLOG_URL,date:null},
  {title:"생리주기와 운동 — 몸의 리듬을 존중하는 훈련",body:"여성의 몸은 4주를 주기로 완전히 다른 호르몬 환경에 놓입니다.",link:BLOG_URL,date:null},
  {title:"동작의 원리를 이해하면 운동이 달라진다",body:"왜 스쿼트를 할 때 무릎이 발끝을 넘으면 안 될까요?",link:BLOG_URL,date:null},
  {title:"지속할 수 있는 선순환 — SNOBBLE 코칭 철학",body:"운동이 살을 빼기 위한 수단이 아닌 삶 전체를 바꾸는 시작점이 되어야 합니다.",link:BLOG_URL,date:null},
  {title:"보조제 없이 체중을 유지하는 유일한 방법",body:"보조제 없이 체중을 유지하는 사람들의 공통점은 딱 하나입니다.",link:BLOG_URL,date:null},
];

// ─────────────────────────────────────────────────────────────────────────────
// LANDING — Pure black hero, Apple cinematic style
// ─────────────────────────────────────────────────────────────────────────────
function Landing({onM, onT, onMS, onTS}) {
  const [c, setC] = useState(0);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchBlogPosts().then(posts=>{ if(posts?.length) setCols(posts); setLoading(false); });
  },[]);
  useEffect(()=>{
    const t = setInterval(()=>setC(x=>(x+1)%cols.length),4000);
    return ()=>clearInterval(t);
  },[cols.length]);

  const cur = cols[c]||DEFAULT_COLS[0];

  return(
    <div style={{minHeight:"100vh", background:BLACK, fontFamily:SF}}>

      {/* ── Hero section — full black, centered ── */}
      <div style={{
        background:BLACK, minHeight:"100vh",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"0 24px", textAlign:"center", position:"relative",
      }}>
        {/* Logo */}
        <div style={{marginBottom:28}}>
          <Logo sz={80}/>
        </div>

        {/* Display Hero — 56px SF Pro Display weight 600 line-height 1.07 */}
        <div style={{
          fontSize:52, fontWeight:600, color:WHITE,
          lineHeight:1.07, letterSpacing:"-0.5px",
          marginBottom:12,
        }}>SNOBBLE</div>

        {/* Sub-heading — 21px weight 400 line-height 1.19 */}
        <div style={{
          fontSize:21, fontWeight:400, color:"rgba(255,255,255,0.6)",
          lineHeight:1.19, letterSpacing:"0.231px", marginBottom:8,
        }}>TRAINING</div>

        {/* Body — 17px weight 400 line-height 1.47 */}
        <div style={{
          fontSize:17, color:"rgba(255,255,255,0.55)",
          lineHeight:1.47, letterSpacing:"-0.374px", marginBottom:48,
        }}>지속할 수 있는 선순환</div>

        {/* 로그인 CTAs */}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
          <button onClick={onM} style={{background:"transparent",color:WHITE,fontFamily:SF,border:"1px solid rgba(255,255,255,0.45)",borderRadius:980,padding:"11px 24px",fontSize:17,cursor:"pointer",fontWeight:400,letterSpacing:"-0.374px"}}>회원 로그인</button>
          <button onClick={onT} style={{background:ABLUE,color:WHITE,fontFamily:SF,border:"none",borderRadius:980,padding:"11px 24px",fontSize:17,cursor:"pointer",fontWeight:400,letterSpacing:"-0.374px"}}>전문가 로그인</button>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onMS} style={{background:"transparent",color:"rgba(255,255,255,0.4)",fontFamily:SF,border:"1px solid rgba(255,255,255,0.15)",borderRadius:980,padding:"8px 18px",fontSize:13,cursor:"pointer",letterSpacing:"-0.2px"}}>회원 가입하기</button>
          <button onClick={onTS} style={{background:"transparent",color:"rgba(255,255,255,0.4)",fontFamily:SF,border:"1px solid rgba(255,255,255,0.15)",borderRadius:980,padding:"8px 18px",fontSize:13,cursor:"pointer",letterSpacing:"-0.2px"}}>전문가 신청하기</button>
        </div>

        {/* Scroll hint */}
        <div style={{
          position:"absolute", bottom:32,
          fontSize:12, color:"rgba(255,255,255,0.2)",
          letterSpacing:3, textTransform:"uppercase",
        }}>scroll</div>
      </div>

      {/* ── Column section — dark surface #111, 애플 style ── */}
      <div style={{background:"#111111", padding:"52px 24px 64px"}}>
        <div style={{maxWidth:600, margin:"0 auto"}}>

          {/* Section label */}
          <div style={{
            fontSize:12, color:"rgba(255,255,255,0.28)",
            letterSpacing:4, textTransform:"uppercase", marginBottom:6,
          }}>{loading ? "불러오는 중..." : "SNOBBLE 칼럼"}</div>
          <div style={{
            fontSize:40, fontWeight:600, color:WHITE,
            lineHeight:1.10, letterSpacing:"-0.5px", marginBottom:40,
          }}>트레이너의 생각</div>

          {/* Article hero card */}
          <button
            onClick={()=>window.open(cur.link,"_blank")}
            style={{
              display:"block", width:"100%", textAlign:"left",
              background:DS1, borderRadius:18, padding:"32px 28px",
              border:"none", cursor:"pointer", opacity:loading?0.5:1,
              transition:"opacity 0.3s", boxSizing:"border-box",
              boxShadow:CARD_SH, marginBottom:24,
            }}
          >
            {cur.date && (
              <div style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginBottom:14,letterSpacing:1,fontFamily:SF}}>{cur.date}</div>
            )}
            <div style={{
              fontSize:24, fontWeight:600, color:WHITE,
              lineHeight:1.4, letterSpacing:"-0.3px", marginBottom:14, fontFamily:SF,
            }}>{loading ? "불러오는 중..." : cur.title}</div>
            <div style={{
              fontSize:15, color:"rgba(255,255,255,0.5)",
              lineHeight:1.6, marginBottom:20, fontFamily:SF, letterSpacing:"-0.2px",
            }}>{cur.body}</div>
            {/* Pill link — Apple signature */}
            <span style={{
              fontSize:14, color:DBLUE,
              fontFamily:SF, letterSpacing:"-0.224px",
            }}>더 읽기 ›</span>
          </button>

          {/* Dots */}
          <div style={{display:"flex", justifyContent:"center", gap:7, marginBottom:36}}>
            {cols.map((_,i)=>(
              <button key={i} onClick={()=>setC(i)} style={{
                width:i===c?24:7, height:7, borderRadius:4,
                background:i===c?WHITE:"rgba(255,255,255,0.22)",
                border:"none", cursor:"pointer", padding:0, transition:"all 0.3s",
              }}/>
            ))}
          </div>

          <button
            onClick={()=>window.open(BLOG_URL,"_blank")}
            style={{
              display:"block", width:"100%", textAlign:"center",
              background:"transparent", border:"1px solid rgba(255,255,255,0.18)",
              borderRadius:980, padding:"11px 24px",
              fontSize:14, color:"rgba(255,255,255,0.55)",
              cursor:"pointer", fontFamily:SF, letterSpacing:"-0.224px",
            }}
          >전체 칼럼 보기</button>
        </div>
      </div>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({type, data, onLogin, onBack}) {
  const [name,setName]=useState("");
  const [pin,setPin]=useState("");
  const [err,setErr]=useState("");
  const go = ()=>{
    setErr("");
    if(type==="trainer"){
      const pending=(data.pendingTrainers||[]).find(x=>x.name===name&&x.pin===pin);
      if(pending){setErr("승인 대기 중입니다. 관리자 승인 후 로그인 가능합니다.");return;}
    }
    const list = type==="member" ? data.members : data.trainers;
    const u = list.find(x=>x.name===name&&x.pin===pin);
    if(!u){setErr("이름 또는 PIN이 올바르지 않습니다.");return;}
    // 회원 유효기간 체크
    if(type==="member" && u.expiryDate){
      const today=new Date().toISOString().slice(0,10);
      if(today > u.expiryDate){setErr(`유효기간이 만료됐습니다 (${u.expiryDate}). 트레이너에게 문의하세요.`);return;}
    }
    onLogin(u);
  };

  return(
    <div style={{minHeight:"100vh", background:LGRAY, fontFamily:SF}}>
      {/* Glass nav */}
      <nav style={navStyle}>
        <button onClick={onBack} style={{background:"none",border:"none",color:WHITE,fontSize:22,cursor:"pointer",lineHeight:1,padding:0}}>‹</button>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo sz={28}/>
          <span style={{color:WHITE,fontSize:15,fontWeight:600,letterSpacing:"-0.2px"}}>
            {type==="member"?"회원 로그인":"전문가 로그인"}
          </span>
        </div>
        <div style={{width:24}}/>
      </nav>

      {/* Content — light gray section */}
      <div style={{padding:"48px 24px 24px", maxWidth:480, margin:"0 auto"}}>
        <div style={{fontSize:40,fontWeight:600,color:NBLACK,lineHeight:1.10,letterSpacing:"-0.5px",marginBottom:8}}>
          {type==="member"?"환영합니다":"전문가 전용"}
        </div>
        <div style={{fontSize:17,color:T80,lineHeight:1.47,letterSpacing:"-0.374px",marginBottom:32}}>
          {type==="member"?"이름과 PIN으로 로그인하세요":"트레이너 계정으로 접속하세요"}
        </div>

        <Card sx={{marginBottom:16}}>
          <Inp label="이름" value={name} onChange={e=>setName(e.target.value)} placeholder="이름을 입력하세요"/>
          <Inp label="PIN 4자리" value={pin} onChange={e=>setPin(e.target.value)} placeholder="●●●●" type="password" maxLength={4}/>
          {err && <div style={{color:RED,fontSize:14,marginBottom:14,letterSpacing:"-0.2px",fontFamily:SF}}>{err}</div>}
          <Btn ch="로그인" full onClick={go}/>
        </Card>

        <Card sx={{background:LGRAY, boxShadow:"none", border:"1px solid #d2d2d7"}}>
          <div style={{fontSize:12,color:T48,marginBottom:8,fontFamily:SF}}>테스트 계정</div>
          {type==="member"
            ? <div style={{fontSize:14,color:NBLACK,letterSpacing:"-0.2px"}}>이름: 박후영 / PIN: 0000</div>
            : <>
                <div style={{fontSize:14,color:NBLACK,letterSpacing:"-0.2px"}}>이름: 김스노블 / PIN: 1234</div>
                <div style={{fontSize:14,color:NBLACK,marginTop:4,letterSpacing:"-0.2px"}}>이름: 이코치 / PIN: 5678</div>
              </>
          }
        </Card>
      </div>
    </div>
  );
}

// ─── Member App ───────────────────────────────────────────────────────────────
// ── 알림 패널 컴포넌트 ──────────────────────────────────────────────────────────
function NotificationPanel({items, onClose, onGo}) {
  if(items.length===0) return(
    <div style={{
      position:"fixed",top:52,right:0,width:"min(360px,100vw)",
      background:WHITE,borderRadius:"0 0 16px 16px",
      boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
      zIndex:300,padding:"20px 16px",fontFamily:SF,
    }} onClick={e=>e.stopPropagation()}>
      <div style={{textAlign:"center",padding:"24px 0"}}>
        <div style={{fontSize:32,marginBottom:8}}>🔔</div>
        <div style={{fontSize:15,fontWeight:600,color:NBLACK,marginBottom:4}}>알림 없음</div>
        <div style={{fontSize:13,color:T48}}>새로운 알림이 없어요</div>
      </div>
    </div>
  );
  return(
    <div style={{
      position:"fixed",top:52,right:0,width:"min(360px,100vw)",
      background:WHITE,borderRadius:"0 0 16px 16px",
      boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
      zIndex:300,fontFamily:SF,maxHeight:"70vh",overflowY:"auto",
    }} onClick={e=>e.stopPropagation()}>
      <div style={{padding:"12px 16px",borderBottom:"1px solid #f2f2f2",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:15,fontWeight:600,color:NBLACK}}>알림</div>
        <div style={{fontSize:12,color:T48}}>{items.length}개</div>
      </div>
      {items.map((item,i)=>(
        <div key={i} onClick={()=>{onGo(item.tab,item.extra);onClose();}}
          style={{
            display:"flex",alignItems:"flex-start",gap:12,
            padding:"14px 16px",
            borderBottom:i<items.length-1?"1px solid #f9f9f9":"none",
            cursor:"pointer",
            background:item.unread?"rgba(0,113,227,0.04)":WHITE,
            transition:"background 0.1s",
          }}>
          <div style={{
            width:40,height:40,borderRadius:12,flexShrink:0,
            display:"flex",alignItems:"center",justifyContent:"center",
            background:item.unread?`${item.color||ABLUE}15`:LGRAY,
            fontSize:20,
          }}>{item.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <div style={{fontSize:14,fontWeight:item.unread?600:400,color:NBLACK,letterSpacing:"-0.2px"}}>{item.title}</div>
              {item.unread&&<div style={{width:8,height:8,background:item.color||ABLUE,borderRadius:"50%",flexShrink:0}}/>}
            </div>
            <div style={{fontSize:13,color:T48,lineHeight:1.4,letterSpacing:"-0.1px"}}>{item.desc}</div>
            {item.time&&<div style={{fontSize:11,color:"rgba(0,0,0,0.25)",marginTop:3}}>{item.time}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function MemberApp({member, data, onSave, onLogout}) {
  const [tab,setTab] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const [showNoti, setShowNoti] = useState(false);

  // 유효기간 실시간 체크
  useEffect(()=>{
    if(member.expiryDate){
      const today=new Date().toISOString().slice(0,10);
      if(today > member.expiryDate) onLogout();
    }
  },[member.expiryDate]);

  const tabs = [
    {id:"home",lb:"홈",ic:"⌂"},
    {id:"progress",lb:"진도",ic:"📈"},
    {id:"lessons",lb:"수업",ic:"📋"},
    {id:"record",lb:"기록",ic:"✏️"},
    {id:"message",lb:"메시지",ic:"💬"},
    {id:"reserve",lb:"예약",ic:"📅"},
    {id:"ai",      lb:"AI코칭",ic:"🤖"},
  ];

  // 알림 목록 계산
  const notiItems = [];
  // 읽지 않은 피드백
  const unreadFb = (member.selfRecords||[]).filter(r=>r.trainerFeedback&&!r.feedbackRead);
  if(unreadFb.length>0) notiItems.push({
    icon:"✍️",title:"트레이너 피드백",
    desc:`${unreadFb.length}개의 피드백이 도착했어요`,
    tab:"record",unread:true,color:ABLUE,
  });
  // 읽지 않은 메시지
  if((member.unreadMessages||0)>0) notiItems.push({
    icon:"💬",title:"새 메시지",
    desc:`${member.unreadMessages}개의 메시지가 있어요`,
    tab:"message",unread:true,color:ABLUE,
  });
  // 예약 상태 변경 (확정/취소된 것)
  const recentRes = (member.reservations||[]).filter(r=>r.status==="확정"||r.status==="취소");
  recentRes.slice(0,2).forEach(r=>{
    notiItems.push({
      icon:r.status==="확정"?"✅":"❌",
      title:`예약 ${r.status}`,
      desc:`${r.date} ${r.time} 수업이 ${r.status}됐어요`,
      tab:"reserve",unread:false,
      color:r.status==="확정"?GREEN:RED,
    });
  });
  // 새 복습 포인트
  const unreadReview = (member.reviewPoints||[]).filter(p=>!p.read);
  if(unreadReview.length>0) notiItems.push({
    icon:"🎬",title:"복습 포인트 도착",
    desc:`트레이너가 ${unreadReview.length}개의 복습 포인트를 남겼어요`,
    tab:"record",unread:true,color:"#5856d6",
  });
  // D-7 유효기간
  if(member.expiryDate){
    const today=new Date().toISOString().slice(0,10);
    const days=Math.ceil((new Date(member.expiryDate)-new Date(today))/(1000*60*60*24));
    if(days>=0&&days<=7) notiItems.push({
      icon:"⏳",title:"유효기간 임박",
      desc:`${days}일 후 만료돼요. 트레이너에게 문의하세요`,
      tab:"message",unread:true,color:AMBER,
    });
  }

  const totalNoti = notiItems.filter(n=>n.unread).length;
  const unread = totalNoti;

  const goTab = (tabId) => { setTab(tabId); setShowNoti(false); };

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#f2f2f7",fontFamily:SF}}>
      {showProfile&&<MProfileEdit m={member} data={data} onSave={onSave} onClose={()=>setShowProfile(false)}/>}
      {showNoti&&<div style={{position:"fixed",inset:0,zIndex:299}} onClick={()=>setShowNoti(false)}/>}
      {showNoti&&<NotificationPanel items={notiItems} onClose={()=>setShowNoti(false)} onGo={(t)=>goTab(t)}/>}
      <nav style={navStyle}>
        <Logo sz={26}/>
        <div style={{color:WHITE,fontSize:15,fontWeight:600,letterSpacing:"-0.2px"}}>{member.name}님</div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {/* 알림 버튼 */}
          <button onClick={()=>setShowNoti(v=>!v)} style={{
            position:"relative",background:"rgba(255,255,255,0.08)",
            border:"0.5px solid rgba(255,255,255,0.15)",color:WHITE,
            width:34,height:34,borderRadius:"50%",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
          }}>
            🔔
            {totalNoti>0&&(
              <div style={{
                position:"absolute",top:-2,right:-2,
                background:RED,color:WHITE,borderRadius:"50%",
                width:16,height:16,fontSize:10,fontWeight:700,
                display:"flex",alignItems:"center",justifyContent:"center",
                border:"1.5px solid rgba(0,0,0,0.82)",
              }}>{totalNoti}</div>
            )}
          </button>
          <button onClick={()=>setShowProfile(true)} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",padding:"5px 10px",borderRadius:980,fontSize:11,cursor:"pointer",fontFamily:SF}}>수정</button>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",padding:"5px 10px",borderRadius:980,fontSize:12,cursor:"pointer",fontFamily:SF}}>로그아웃</button>
        </div>
      </nav>

      <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0,overflow:"hidden"}}>
        {tab==="message"?(
          <MMemberMessage m={member} data={data} onSave={onSave}/>
        ):(
          <div style={{flex:1,overflowY:"auto"}}>
            {tab==="home"     && <MHome m={member} data={data} onSave={onSave}/>}
            {tab==="progress" && <MProgress m={member}/>}
            {tab==="lessons"  && <MLessons m={member}/>}
            {tab==="record"   && <MRecord m={member} data={data} onSave={onSave}/>}
            {tab==="ai"       && <MAICoaching m={member} data={data} onSave={onSave}/>}
            {tab==="reserve"  && <MReserve m={member} data={data} onSave={onSave}/>}
          </div>
        )}
      </div>

      {/* Apple-style tab bar */}
      <div style={{
        background:"rgba(251,251,253,0.95)",
        backdropFilter:"saturate(180%) blur(20px)", WebkitBackdropFilter:"saturate(180%) blur(20px)",
        borderTop:"0.5px solid rgba(0,0,0,0.12)",
        display:"flex", flexShrink:0, paddingBottom:"env(safe-area-inset-bottom,0px)",
      }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1, padding:"6px 1px 10px", border:"none", cursor:"pointer",
            background:"transparent", display:"flex", flexDirection:"column", alignItems:"center", gap:2,
            position:"relative", minWidth:0,
          }}>
            <div style={{
              fontSize:t.id===tab?18:16,
              transition:"transform 0.15s",
              transform:t.id===tab?"scale(1.1)":"scale(1)",
            }}>{t.ic}</div>
            <div style={{
              fontSize:9,
              color:t.id===tab?ABLUE:"rgba(0,0,0,0.35)",
              fontWeight:t.id===tab?600:400,
              fontFamily:SF,
              letterSpacing:"-0.2px",
              whiteSpace:"nowrap",
              overflow:"hidden",
              textOverflow:"ellipsis",
              maxWidth:"100%",
            }}>{t.lb}</div>
            {t.id===tab&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:16,height:2.5,background:ABLUE,borderRadius:"0 0 3px 3px"}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Member Home ────────────────────────────────────────────────────────────────
// ── 운동 카테고리 매핑 ────────────────────────────────────────────────────────
const EX_CATEGORY = {
  하체:["스쿼트","레그프레스","런지","레그컬","레그익스텐션","힙쓰러스트","글루트킥백","불가리안스플릿","스텝업","카프레이즈","데드리프트","힙힌지","루마니안데드"],
  상체:["벤치프레스","체스트플라이","인클라인프레스","숄더프레스","사이드레터럴","프론트레이즈","케이블크로스","바이셉컬","트라이셉익스텐션","풀업","친업","랫풀다운","바벨로우","시티드로우","케이블로우","로우"],
  코어:["플랭크","사이드플랭크","크런치","레그레이즈","러시안트위스트","버드독","밴드운동"],
  심폐:["카디오","런닝","바이크","로잉머신","버피","마운틴클라이머"],
};

const getCategoryColor = (cat) => ({하체:ABLUE,상체:"#5856d6",코어:GREEN,심폐:AMBER}[cat]||T48);

// PT일지에서 운동 성장 분석 (카테고리별, 회차별 최신 추적)
const analyzeStrength = (ptLogs) => {
  if(!ptLogs||ptLogs.length===0) return {하체:[],상체:[],코어:[],심폐:[]};
  const exMap = {};
  [...ptLogs].sort((a,b)=>(a.session||0)-(b.session||0)).forEach(log=>{
    if(!log) return;
    (log.exercises||[]).filter(e=>e&&!e.isCardio&&e.name&&e.name.trim()).forEach(e=>{
      const key=e.name.trim();
      if(!exMap[key]) exMap[key]=[];
      const w=parseFloat(e.weight)||0;
      const r=parseFloat(e.reps)||0;
      const s=parseFloat(e.sets)||0;
      exMap[key].push({
        session: log.session||0,
        date: log.date||"",
        weight: w, reps: r, sets: s,
        vol: Math.round(w*r*s),
        e1rm: (w>0&&r>0)?Math.round(w*(1+r/30)):0
      });
    });
  });

  const result = {하체:[],상체:[],코어:[],심폐:[]};
  Object.entries(exMap).forEach(([name,records])=>{
    if(!records||records.length===0) return;
    let cat="상체";
    for(const [c,exs] of Object.entries(EX_CATEGORY)){
      if(exs.some(e=>name.includes(e)||e.includes(name)||(e.length>2&&name.includes(e.slice(0,3))))){cat=c;break;}
    }
    if(records.length===0) return;
    const first=records[0]||{weight:0,reps:0,sets:0,session:1,date:"",vol:0,e1rm:0};
    const latest=records[records.length-1]||{weight:0,reps:0,sets:0,session:1,date:"",vol:0,e1rm:0};
    // prRecord: 중량 기준 최고 (없으면 first)
    const prRecord=records.reduce((best,r)=>(r.weight||0)>(best.weight||0)?r:best, records[0]);
    const wGain=(latest.weight||0)-(first.weight||0);
    const rGain=(latest.reps||0)-(first.reps||0);
    const e1rms=records.map(r=>r.e1rm||0).filter(v=>v>0);
    const bestE1RM=e1rms.length>0?Math.max(...e1rms):0;
    result[cat].push({name, first, latest, prRecord, wGain, rGain, records, bestE1RM});
  });
  Object.keys(result).forEach(k=>{result[k].sort((a,b)=>b.records.length-a.records.length);});
  return result;
};

// 통증 부위 목록
const PAIN_AREAS = ["목","어깨(좌)","어깨(우)","등(상)","허리","고관절","무릎(좌)","무릎(우)","발목(좌)","발목(우)","기타"];

// ── 공통 카드 컴포넌트 ─────────────────────────────────────────────────────────
const HeroCard = ({name, subtitle, prog, progLabel, startLabel, endLabel, accentColor="#0071e3"}) => (
  <div style={{background:`linear-gradient(135deg,#1a1a1a,#000)`,borderRadius:20,padding:"24px 20px",color:WHITE,boxShadow:"0 8px 32px rgba(0,0,0,0.28)"}}>
    <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:4,letterSpacing:"1px",textTransform:"uppercase"}}>안녕하세요</div>
    <div style={{fontSize:26,fontWeight:600,lineHeight:1.07,letterSpacing:"-0.5px",marginBottom:4}}>{name}님</div>
    {subtitle&&<div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:16,letterSpacing:"-0.2px"}}>{subtitle}</div>}
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:8,marginTop:subtitle?0:16}}>
      <span>{progLabel}</span><span style={{color:WHITE,fontWeight:600}}>{prog}%</span>
    </div>
    <div style={{background:"rgba(255,255,255,0.12)",borderRadius:6,height:5}}>
      <div style={{background:`linear-gradient(90deg,${accentColor}90,${accentColor})`,borderRadius:6,height:5,width:`${prog}%`,transition:"width 1.4s cubic-bezier(0.4,0,0.2,1)"}}/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:6}}>
      <span>{startLabel}</span><span>{endLabel}</span>
    </div>
  </div>
);

const StatCard = ({label, value, sub, accent=false}) => (
  <Card sx={{textAlign:"center",padding:"18px 12px",background:"rgba(255,255,255,0.9)"}}>
    <div style={{fontSize:10,color:T48,marginBottom:6,letterSpacing:"0.5px",textTransform:"uppercase",fontFamily:SF}}>{label}</div>
    <div style={{fontSize:21,fontWeight:600,color:accent?ABLUE:NBLACK,lineHeight:1.07,letterSpacing:"-0.5px",fontFamily:SF}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:T48,marginTop:4,letterSpacing:"-0.1px",fontFamily:SF}}>{sub}</div>}
  </Card>
);

const NextLessonCard = ({nxt}) => nxt?(
  <Card>
    <div style={{fontSize:11,color:T48,marginBottom:12,letterSpacing:"0.3px",textTransform:"uppercase"}}>다음 수업</div>
    <div style={{display:"flex",alignItems:"center",gap:16}}>
      <div style={{background:BLACK,borderRadius:10,padding:"10px 14px",color:WHITE,textAlign:"center",minWidth:52}}>
        <div style={{fontSize:22,fontWeight:600,letterSpacing:"-0.4px"}}>{nxt.date.slice(8)}</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.45)"}}>{nxt.date.slice(5,7)}월</div>
      </div>
      <div>
        <div style={{fontSize:18,fontWeight:600,color:NBLACK,letterSpacing:"-0.3px"}}>{nxt.time}</div>
        <div style={{fontSize:13,color:T48,marginTop:2}}>SNOBBLE TRAINING</div>
      </div>
    </div>
  </Card>
):null;

// ── 다이어트 홈 ────────────────────────────────────────────────────────────────
function MHomeDiet({m}) {
  const logs=m.ptLogs||[], p=m.profile;
  // 인바디 최신 기록이 있으면 우선 사용
  const latestInbody = (m.inbodyRecords||[]).sort((a,b)=>b.date.localeCompare(a.date))[0];
  const curWeight = latestInbody?.weight || p?.weight || 0;
  const prog=p&&p.startWeight&&p.targetWeight&&p.startWeight!==p.targetWeight
    ?Math.max(0,Math.min(100,Math.round(((p.startWeight-curWeight)/(p.startWeight-p.targetWeight))*100))):0;
  const nxt=(m.reservations||[]).find(r=>r.status==="확정");
  const lost=p?(p.startWeight-p.weight).toFixed(1):0;
  const remain=p?Math.max(0,p.weight-p.targetWeight).toFixed(1):0;
  return(
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <HeroCard name={m.name} subtitle={`감량 목표 ${p?.targetWeight}kg · ${lost}kg 감량`}
        prog={prog} progLabel="목표 달성률"
        startLabel={`시작 ${p?.startWeight}kg`} endLabel={`목표 ${p?.targetWeight}kg`}
        subtitle={`감량 목표 ${p?.targetWeight}kg · ${((p?.startWeight||0)-(curWeight||0)).toFixed(1)}kg 감량${latestInbody?` · 인바디 ${latestInbody.date.slice(5)} 기준`:""}`}
        accentColor={ABLUE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <StatCard label="현재 체중" value={`${p?.weight}kg`} sub={`목표까지 ${remain}kg`}/>
        <StatCard label="체지방" value={`${p?.bodyFat}%`} sub="현재 기준"/>
        <StatCard label="총 수업" value={`${logs.length}회`} sub={`포인트 ${m.points||0}P`}/>
        <StatCard label="목표 칼로리" value={`${p?.targetCalories||"-"}`} sub="kcal/일"/>
      </div>
      <HomeHRBadge profile={m.profile}/>
      <NextLessonCard nxt={nxt}/>
      {m.unreadFeedback>0&&(
        <Card sx={{background:`${AMBER}08`,border:`1px solid ${AMBER}30`}}>
          <div style={{fontSize:14,color:AMBER,fontWeight:600}}>📬 피드백 {m.unreadFeedback}건</div>
          <div style={{fontSize:12,color:T48,marginTop:3}}>기록 탭에서 확인하세요</div>
        </Card>
      )}
    </div>
  );
}

// ── 근력증진 홈 ────────────────────────────────────────────────────────────────
function MHomeStrength({m}) {
  const logs = m.ptLogs||[];
  const nxt  = (m.reservations||[]).find(r=>r.status==="확정");
  const totalSessions = logs.length;
  const sorted = [...logs].sort((a,b)=>(a.session||0)-(b.session||0));
  const lastLog = sorted[sorted.length-1];

  // 최근 3회차 세션 번호
  const recentSessions = sorted.slice(-3).map(l=>l.session||0);

  // 종목별 히스토리: 같은 종목끼리만 비교
  // 최근 3회차 안에 나온 종목 중 증량된 것만 → 홈 신기록
  const exMap = {};
  sorted.forEach(log=>{
    (log.exercises||[]).filter(e=>!e.isCardio&&e.name&&e.name.trim()).forEach(e=>{
      const key = e.name.trim();
      if(!exMap[key]) exMap[key]=[];
      exMap[key].push({session:log.session||0, weight:parseFloat(e.weight)||0, reps:parseFloat(e.reps)||0, sets:parseFloat(e.sets)||0, date:log.date});
    });
  });

  // 신기록 배지: 최근 3회차 안에 나타난 종목 + 직전 동일 종목 대비 증량
  const prAlerts = [];
  Object.entries(exMap).forEach(([name, records])=>{
    if(records.length<2) return;
    const latest = records[records.length-1];
    const prev   = records[records.length-2];
    if(!recentSessions.includes(latest.session)) return; // 최근 3회차 아님
    if(latest.weight > prev.weight && latest.weight > 0){
      prAlerts.push({name, weight:latest.weight, gain:+(latest.weight-prev.weight).toFixed(1)});
    }
  });

  // 총 볼륨
  const calcVol = (log) => (log?.exercises||[])
    .filter(e=>!e.isCardio)
    .reduce((a,e)=>{const w=parseFloat(e.weight)||0,r=parseFloat(e.reps)||0,s=parseFloat(e.sets)||0;return a+w*r*s;},0);
  const totalVol = logs.reduce((acc,l)=>acc+calcVol(l),0);

  return(
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
      <HeroCard name={m.name} subtitle="근력증진 프로그램"
        prog={Math.min(100,Math.round((totalSessions/30)*100))}
        progLabel={`${totalSessions}회 완료`}
        startLabel="0회" endLabel="30회 목표"
        accentColor="#5856d6"/>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <StatCard label="총 수업" value={`${totalSessions}회`} sub={`포인트 ${m.points||0}P`}/>
        <StatCard label="누적 볼륨"
          value={totalVol>=1000?`${(totalVol/1000).toFixed(1)}t`:`${Math.round(totalVol)}kg`}
          sub="중량×횟수×세트 합산"/>
      </div>

      {/* 신기록 배지 — 최근 3회차 안에 직전 대비 증량된 종목만 */}
      {prAlerts.length>0&&(
        <Card sx={{background:"linear-gradient(135deg,#5856d620,#5856d608)",border:"1px solid #5856d630"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#5856d6",marginBottom:10}}>
            🏆 최근 수업 증량 종목
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {prAlerts.map((a,i)=>(
              <div key={i} style={{
                background:"#5856d6",color:WHITE,
                padding:"6px 14px",borderRadius:980,
                fontSize:13,fontWeight:600,
                boxShadow:"0 2px 8px #5856d640",
              }}>
                {a.name} {a.weight}kg <span style={{fontSize:11,opacity:0.8}}>+{a.gain}kg↑</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:11,color:"#5856d6",opacity:0.7,marginTop:8}}>최근 3회차 기준 · 진도 탭에서 전체 확인</div>
        </Card>
      )}

      {/* 최근 수업 요약 */}
      {lastLog&&(
        <Card>
          <div style={{fontSize:11,color:T48,marginBottom:10,letterSpacing:"0.3px",textTransform:"uppercase"}}>
            최근 수업 — {lastLog.session}회차
          </div>
          <div style={{fontSize:14,color:NBLACK,marginBottom:10}}>
            {lastLog.date}
            {lastLog.condition&&<span style={{marginLeft:8,fontSize:12,color:T48}}>· {lastLog.condition}</span>}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:lastLog.nextFocus?10:0}}>
            {(lastLog.exercises||[]).filter(e=>e.name&&!e.isCardio).map((e,i)=>(
              <div key={i} style={{background:LGRAY,borderRadius:8,padding:"5px 10px",fontSize:12,color:NBLACK}}>
                {e.name}{parseFloat(e.weight)>0&&<span style={{color:"#5856d6",fontWeight:600}}> {e.weight}kg</span>}
              </div>
            ))}
          </div>
          {lastLog.nextFocus&&(
            <div style={{padding:"8px 12px",background:"#5856d608",borderRadius:8,borderLeft:"2px solid #5856d6",fontSize:13,color:"#5856d6",fontWeight:500}}>
              다음 집중 → {lastLog.nextFocus}
            </div>
          )}
        </Card>
      )}

      <HomeHRBadge profile={m.profile}/>
      <NextLessonCard nxt={nxt}/>
    </div>
  );
}

// ── 통증해결 홈 ────────────────────────────────────────────────────────────────
function MHomePain({m, data, onSave}) {
  const logs=m.ptLogs||[], p=m.profile;
  const nxt=(m.reservations||[]).find(r=>r.status==="확정");
  const today=new Date().toISOString().slice(0,10);

  // 오늘 통증 기록 찾기
  const todayRec=(m.selfRecords||[]).find(r=>r.date===today);
  const todayPain=todayRec?.painLog||null;

  const [areas, setAreas]=useState(todayPain?.areas||[]);
  const [intensity, setIntensity]=useState(todayPain?.intensity||0);
  const [memo, setMemo]=useState(todayPain?.memo||"");
  const [saved, setSaved]=useState(!!todayPain);

  const savePain=()=>{
    const painLog={areas,intensity,memo,date:today};
    const recs=m.selfRecords||[];
    const existing=recs.find(r=>r.date===today);
    const upd=existing
      ?recs.map(r=>r.date===today?{...r,painLog}:r)
      :[{id:`r${Date.now()}`,date:today,condition:"",meals:{아침:"",점심:"",저녁:"",간식:""},exerciseLogs:[],reviewChecks:{},painLog,trainerFeedback:"",feedbackRead:false},...recs];
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,selfRecords:upd}:x)});
    setSaved(true);
  };

  // 최근 7일 통증 강도 트렌드
  const recentPain=(m.selfRecords||[])
    .filter(r=>r.painLog&&r.date>=new Date(Date.now()-7*86400000).toISOString().slice(0,10))
    .sort((a,b)=>a.date.localeCompare(b.date));

  const avgIntensity=recentPain.length>0
    ?Math.round(recentPain.reduce((a,r)=>a+(r.painLog?.intensity||0),0)/recentPain.length*10)/10:0;

  const intensityColor=(v)=>v<=3?"#34c759":v<=6?AMBER:RED;

  return(
    <div style={{padding:16,display:"flex",flexDirection:"column",gap:12}}>
      {/* 히어로 */}
      <div style={{background:`linear-gradient(135deg,#1a1a1a,#000)`,borderRadius:20,padding:"24px 20px",color:WHITE,boxShadow:"0 8px 32px rgba(0,0,0,0.28)"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:4,letterSpacing:"1px",textTransform:"uppercase"}}>안녕하세요</div>
        <div style={{fontSize:26,fontWeight:600,lineHeight:1.07,letterSpacing:"-0.5px",marginBottom:8}}>{m.name}님</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:16}}>통증 해결 프로그램 · {logs.length}회차</div>
        {recentPain.length>0&&(
          <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
            {recentPain.map((r,i)=>{
              const iv=r.painLog?.intensity||0;
              const h=Math.max(4,iv*8);
              return(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{
                    width:"100%",height:h,background:intensityColor(iv),
                    borderRadius:3,opacity:0.85,
                  }}/>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>{r.date.slice(8)}</div>
                </div>
              );
            })}
          </div>
        )}
        {recentPain.length===0&&(
          <div style={{fontSize:13,color:"rgba(255,255,255,0.35)"}}>아직 통증 기록이 없어요. 아래에서 기록해주세요.</div>
        )}
      </div>

      {/* 오늘 통증 체크 */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:600,color:NBLACK,letterSpacing:"-0.2px"}}>오늘 통증 체크</div>
          <div style={{fontSize:12,color:T48}}>{today}</div>
        </div>

        {/* 부위 선택 */}
        <div style={{fontSize:12,color:T48,marginBottom:8}}>통증 부위 (복수 선택)</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
          {PAIN_AREAS.map(a=>(
            <button key={a} onClick={()=>setAreas(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a])} style={{
              padding:"6px 13px",borderRadius:980,fontSize:12,fontFamily:SF,cursor:"pointer",
              background:areas.includes(a)?RED:WHITE,
              color:areas.includes(a)?WHITE:T48,
              border:`1px solid ${areas.includes(a)?RED:"rgba(0,0,0,0.1)"}`,
              transition:"all 0.15s",fontWeight:areas.includes(a)?600:400,
            }}>{a}</button>
          ))}
        </div>

        {/* 강도 슬라이더 */}
        <div style={{fontSize:12,color:T48,marginBottom:8}}>통증 강도</div>
        <div style={{display:"flex",gap:4,marginBottom:6}}>
          {Array.from({length:10},(_,i)=>i+1).map(n=>(
            <button key={n} onClick={()=>setIntensity(n)} style={{
              flex:1,aspectRatio:"1",borderRadius:8,border:"none",cursor:"pointer",
              background:n<=intensity?intensityColor(n):LGRAY,
              color:n<=intensity?WHITE:T48,
              fontSize:11,fontWeight:600,fontFamily:SF,
              transition:"all 0.1s",
            }}>{n}</button>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T48,marginBottom:14}}>
          <span>없음</span><span>보통</span><span>극심</span>
        </div>

        {/* 메모 */}
        <textarea value={memo} onChange={e=>setMemo(e.target.value)} rows={2}
          placeholder="특이사항 기록 (예: 계단 오를 때 무릎 소리, 아침에 특히 심함)"
          style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:13,color:NBLACK,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.5,marginBottom:10}}/>

        {saved&&<div style={{fontSize:12,color:GREEN,marginBottom:8}}>✓ 저장됐습니다</div>}
        <Btn ch="통증 기록 저장" full onClick={savePain} dis={areas.length===0&&intensity===0}/>
      </Card>

      {/* 7일 평균 */}
      {recentPain.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <StatCard label="7일 평균 강도" value={`${avgIntensity}/10`} sub={avgIntensity<=3?"개선 중":avgIntensity<=6?"관리 필요":"주의 필요"}/>
          <StatCard label="총 수업" value={`${logs.length}회`} sub={`포인트 ${m.points||0}P`}/>
        </div>
      )}

      <HomeHRBadge profile={m.profile}/>
      <NextLessonCard nxt={nxt}/>
    </div>
  );
}

// ── 메인 MHome — 목표별 분기 ───────────────────────────────────────────────────
function MHome({m, data, onSave}) {
  const goal=m.profile?.goal||"다이어트";
  if(goal==="근력증진") return <MHomeStrength m={m}/>;
  if(goal==="통증해결") return <MHomePain m={m} data={data} onSave={onSave}/>;
  return <MHomeDiet m={m}/>;
}

// ── Member Progress ────────────────────────────────────────────────────────────
// ─── 공통 라인 차트 SVG ──────────────────────────────────────────────────────
const LineChart = ({data, color, height=140, unit=""}) => {
  if(!data||data.length<2) return(
    <div style={{height:80,display:"flex",alignItems:"center",justifyContent:"center",color:T48,fontSize:13,fontFamily:SF}}>
      데이터가 쌓이면 표시돼요
    </div>
  );
  const vals=data.map(d=>parseFloat(d.v)||0);
  const mn=Math.min(...vals), mx=Math.max(...vals);
  const range=mx-mn||1;
  // 상단 20px: 값 텍스트, 중간 80px: 그래프, 하단 20px: 레이블
  const PH=80, PT=20, PB=20;
  const TH=PT+PH+PB; // 총 높이 = 120
  const W=260;
  const pts=data.map((d,i)=>{
    const x=10+(i/Math.max(1,data.length-1))*W;
    const y=PT+(1-(parseFloat(d.v)||0-mn)/range)*PH;
    return{x,y,v:d.v,lb:d.lb};
  });
  return(
    <div style={{width:"100%",overflowX:"auto",overflowY:"hidden"}}>
      <svg viewBox={`0 0 ${W+20} ${TH}`} style={{width:"100%",height:TH,display:"block"}}>
        {/* 격자선 */}
        {[0,1,2,3].map(i=>(
          <line key={i} x1="10" y1={PT+i*(PH/3)} x2={W+10} y2={PT+i*(PH/3)} stroke="#f0f0f5" strokeWidth="1"/>
        ))}
        {/* 면적 */}
        {pts.length>1&&(
          <polygon fill={`${color}12`}
            points={`10,${PT+PH} ${pts.map(p=>`${p.x},${p.y}`).join(" ")} ${W+10},${PT+PH}`}/>
        )}
        {/* 선 */}
        {pts.length>1&&(
          <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
            points={pts.map(p=>`${p.x},${p.y}`).join(" ")}/>
        )}
        {/* 점 + 텍스트 */}
        {pts.map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={color} stroke={WHITE} strokeWidth="1.5"/>
            {/* 값 텍스트 - 점 위에 */}
            <text x={p.x} y={Math.max(12,p.y-7)} textAnchor="middle" fontSize="10" fill={NBLACK} fontFamily={SF} fontWeight="500">
              {p.v}{unit}
            </text>
            {/* 레이블 - 하단 고정 */}
            <text x={p.x} y={TH-3} textAnchor="middle" fontSize="9" fill={T48} fontFamily={SF}>
              {p.lb}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// ── 다이어트 진도 ─────────────────────────────────────────────────────────────
function MProgressDiet({m}) {
  const logs = m.ptLogs||[];
  const p = m.profile;
  const [met, setMet] = useState("weight");
  const mts = {
    weight:  {lb:"체중",   col:ABLUE, unit:"kg"},
    bodyFat: {lb:"체지방", col:PINK,  unit:"%"},
  };

  // 인바디 기록
  const inbodyRecs = (m.inbodyRecords||[]).sort((a,b)=>a.date.localeCompare(b.date));
  // 회원 자가기록 체중
  const selfRecs = (m.selfRecords||[]).filter(r=>r.bodyWeight&&parseFloat(r.bodyWeight)>0)
    .sort((a,b)=>a.date.localeCompare(b.date));

  // 체중 차트 데이터: 인바디 + 자가기록 + PT일지 통합, 날짜순
  const weightPoints = [
    ...inbodyRecs.map(r=>({v:r.weight, lb:r.date.slice(5), date:r.date, src:"인바디"})),
    ...selfRecs.map(r=>({v:parseFloat(r.bodyWeight), lb:r.date.slice(5), date:r.date, src:"자가"})),
    ...logs.filter(l=>l.weight>0).map(l=>({v:l.weight, lb:l.date.slice(5), date:l.date, src:"수업"})),
  ].sort((a,b)=>a.date.localeCompare(b.date))
   .filter((pt,i,arr)=>i===0||pt.date!==arr[i-1].date);

  const bodyFatPoints = inbodyRecs.filter(r=>r.bodyFat>0)
    .map(r=>({v:r.bodyFat, lb:r.date.slice(5), date:r.date}));

  // 최신 체중 (인바디 > 자가기록 > 프로필 순)
  const latestW = weightPoints.length>0
    ? weightPoints[weightPoints.length-1].v
    : (p?.weight||0);

  // 달성률
  const prog = (p&&p.startWeight&&p.targetWeight&&p.startWeight!==p.targetWeight)
    ? Math.max(0,Math.min(100,Math.round(((p.startWeight-latestW)/(p.startWeight-p.targetWeight))*100)))
    : 0;

  // 선택된 탭 차트 데이터
  const chartData = met==="weight"
    ? weightPoints
    : bodyFatPoints.length>0
      ? bodyFatPoints
      : logs.filter(l=>l.bodyFat>0).map(l=>({v:l.bodyFat, lb:l.date.slice(5)}));

  return(
    <div style={{padding:16}}>
      {/* 달성률 카드 */}
      <Card sx={{marginBottom:12}}>
        <div style={{fontSize:12,color:T48,marginBottom:10,letterSpacing:"0.3px",textTransform:"uppercase"}}>
          목표 달성률
          {inbodyRecs.length>0&&(
            <span style={{marginLeft:6,background:`${ABLUE}15`,color:ABLUE,fontSize:10,padding:"1px 7px",borderRadius:980,fontWeight:600}}>
              인바디 {inbodyRecs.length}회 반영
            </span>
          )}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:8}}>
          <span style={{color:T48}}>시작 {p?.startWeight}kg</span>
          <span style={{fontWeight:700,color:NBLACK,fontSize:18,letterSpacing:"-0.3px"}}>{prog}%</span>
          <span style={{color:T48}}>목표 {p?.targetWeight}kg</span>
        </div>
        <div style={{background:"rgba(0,0,0,0.06)",borderRadius:6,height:10}}>
          <div style={{background:ABLUE,borderRadius:6,height:10,width:`${prog}%`,
            transition:"width 1.4s cubic-bezier(0.4,0,0.2,1)",boxShadow:`0 0 8px ${ABLUE}60`}}/>
        </div>
        <div style={{marginTop:14,display:"flex",gap:20,fontSize:14,flexWrap:"wrap"}}>
          <span style={{color:T48}}>현재 <b style={{color:NBLACK}}>{latestW}kg</b></span>
          <span style={{color:T48}}>감량 <b style={{color:GREEN}}>-{((p?.startWeight||0)-latestW).toFixed(1)}kg</b></span>
          <span style={{color:T48}}>남은 <b style={{color:AMBER}}>
            {Math.max(0,latestW-(p?.targetWeight||0)).toFixed(1)}kg
          </b></span>
        </div>
        {inbodyRecs.length>0&&(
          <div style={{marginTop:8,fontSize:11,color:T48}}>
            최근 인바디: {inbodyRecs[inbodyRecs.length-1].date}
            {inbodyRecs[inbodyRecs.length-1].bodyFat>0&&` · 체지방 ${inbodyRecs[inbodyRecs.length-1].bodyFat}%`}
            {inbodyRecs[inbodyRecs.length-1].muscleMass>0&&` · 근육 ${inbodyRecs[inbodyRecs.length-1].muscleMass}kg`}
          </div>
        )}
      </Card>

      {/* 체중/체지방 그래프 */}
      <Card>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {Object.entries(mts).map(([k,v])=><Chip key={k} label={v.lb} active={met===k} onClick={()=>setMet(k)}/>)}
        </div>
        {chartData.length>=2?(
          <LineChart data={chartData} color={mts[met].col} height={140} unit={mts[met].unit}/>
        ):(
          <div style={{height:100,display:"flex",alignItems:"center",justifyContent:"center",color:T48,fontSize:13,textAlign:"center",lineHeight:1.6}}>
            {met==="weight"?"체중 기록이 2개 이상 쌓이면 그래프가 표시돼요":"인바디 기록이 쌓이면 체지방 그래프가 표시돼요"}
          </div>
        )}
        {weightPoints.length>0&&met==="weight"&&(
          <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["🔵 인바디",inbodyRecs.length],["🟢 자가기록",selfRecs.length],["⚫ 수업",logs.filter(l=>l.weight>0).length]]
              .filter(([,n])=>n>0)
              .map(([lb,n])=><span key={lb} style={{fontSize:11,color:T48}}>{lb} {n}회</span>)}
          </div>
        )}
      </Card>
    </div>
  );
}

function MProgressStrength({m}) {
  const logs = m.ptLogs||[];
  const [selCat, setSelCat] = useState("하체");
  const [selEx,  setSelEx]  = useState(null);
  const [period, setPeriod] = useState("3개월");

  // 기간 필터
  const filteredLogs = (() => {
    if(period==="전체") return logs;
    const months = period==="1개월" ? 1 : 3;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth()-months);
    const cutStr = cutoff.toISOString().slice(0,10);
    return logs.filter(l=>l.date>=cutStr);
  })();

  const strength    = analyzeStrength(filteredLogs);
  const catExercises = (strength&&strength[selCat])||[];
  const color       = getCategoryColor(selCat);

  // 종목 상세
  if(selEx&&selEx.records&&selEx.records.length>0){
    const pr  = selEx.prRecord||selEx.records[0]||{};
    const lat = selEx.latest||selEx.records[selEx.records.length-1]||{};
    const fst = selEx.first||selEx.records[0]||{};
    const chartData = selEx.records.filter(r=>r.weight>0).map(r=>({v:r.weight,lb:`${r.session}회`}));
    const volData   = selEx.records.filter(r=>r.vol>0).map(r=>({v:r.vol,lb:`${r.session}회`}));
    const c = getCategoryColor(selCat);
    return(
      <div style={{padding:16}}>
        <button onClick={()=>setSelEx(null)} style={{background:"none",border:"none",color:ABLUE,fontSize:15,cursor:"pointer",marginBottom:14,fontFamily:SF,padding:0}}>‹ 목록으로</button>
        <Card sx={{marginBottom:12}}>
          <div style={{fontSize:18,fontWeight:700,color:NBLACK,marginBottom:4}}>{selEx.name}</div>
          <div style={{fontSize:12,color:T48,marginBottom:16}}>{selCat} · {selEx.records.length}회 기록 ({period})</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
            {[
              ["🏆 최고",(pr.weight||0)>0?`${pr.weight}kg`:"맨몸",`${pr.session||1}회차`],
              ["📊 최근",(lat.weight||0)>0?`${lat.weight}kg`:"맨몸",`${lat.reps||0}회×${lat.sets||0}세트`],
              ["📈 증량",(selEx.wGain||0)>0?`+${selEx.wGain}kg`:`${selEx.wGain||0}kg`,`${(fst.weight||0)>0?fst.weight+"kg":"맨몸"} →`],
            ].map(([lb,v,s],i)=>(
              <div key={i} style={{textAlign:"center",background:LGRAY,borderRadius:10,padding:"10px 6px"}}>
                <div style={{fontSize:10,color:T48,marginBottom:4,lineHeight:1.3}}>{lb}</div>
                <div style={{fontSize:14,fontWeight:700,color:i===0?c:NBLACK}}>{v}</div>
                <div style={{fontSize:10,color:T48,marginTop:2}}>{s}</div>
              </div>
            ))}
          </div>
          {chartData.length>1&&(
            <div style={{marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:8}}>회차별 중량 (같은 종목끼리)</div>
              <LineChart data={chartData} color={c} height={120} unit="kg"/>
            </div>
          )}
          <div style={{marginTop:12}}>
            <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:8}}>전체 기록</div>
            {[...selEx.records].reverse().map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #f5f5f7"}}>
                <div style={{fontSize:13,color:T48}}>{r.session}회차 <span style={{color:NBLACK,fontSize:11}}>{r.date}</span></div>
                <div style={{fontSize:13,fontWeight:600,color:r.weight===(pr.weight||0)&&r.weight>0?c:NBLACK}}>
                  {r.weight>0?`${r.weight}kg`:"맨몸"} × {r.reps}회 × {r.sets}세트
                  {r.weight===(pr.weight||0)&&r.weight>0&&<span style={{fontSize:10,color:c,marginLeft:4}}>PR</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return(
    <div style={{padding:16}}>
      {/* 기간 필터 */}
      <div style={{display:"flex",gap:3,marginBottom:14,background:"rgba(0,0,0,0.05)",borderRadius:10,padding:3}}>
        {["1개월","3개월","전체"].map(p=>(
          <button key={p} onClick={()=>{setPeriod(p);setSelEx(null);}} style={{
            flex:1,padding:"8px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:SF,fontSize:13,
            background:period===p?WHITE:"transparent",
            color:period===p?NBLACK:T48,
            fontWeight:period===p?600:400,
            boxShadow:period===p?"0 1px 4px rgba(0,0,0,0.1)":"none",
            transition:"all 0.15s",
          }}>{p}</button>
        ))}
      </div>

      {/* 요약 카드 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <Card sx={{textAlign:"center",padding:"16px 10px"}}>
          <div style={{fontSize:10,color:T48,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>{period} 수업</div>
          <div style={{fontSize:22,fontWeight:700,color:NBLACK}}>{filteredLogs.length}회</div>
          <div style={{fontSize:11,color:T48,marginTop:3}}>전체 {logs.length}회</div>
        </Card>
        <Card sx={{textAlign:"center",padding:"16px 10px"}}>
          <div style={{fontSize:10,color:T48,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>추적 종목</div>
          <div style={{fontSize:22,fontWeight:700,color:NBLACK}}>{Object.values(strength).flat().length}종</div>
          <div style={{fontSize:11,color:T48,marginTop:3}}>{period} 기준</div>
        </Card>
      </div>

      {/* 카테고리 탭 */}
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
        {["하체","상체","코어","심폐"].map(cat=>{
          const c2=getCategoryColor(cat);
          const cnt=(strength[cat]||[]).length;
          return(
            <button key={cat} onClick={()=>{setSelCat(cat);setSelEx(null);}} style={{
              padding:"9px 16px",borderRadius:980,fontSize:13,fontFamily:SF,flexShrink:0,cursor:"pointer",
              background:selCat===cat?c2:WHITE,color:selCat===cat?WHITE:T48,
              border:`1px solid ${selCat===cat?c2:"rgba(0,0,0,0.1)"}`,
              fontWeight:selCat===cat?600:400,
              boxShadow:selCat===cat?`0 3px 12px ${c2}40`:"none",
              transition:"all 0.15s",
            }}>
              {cat} {cnt>0&&<span style={{fontSize:10,opacity:0.75}}>{cnt}종</span>}
            </button>
          );
        })}
      </div>

      {/* 종목 카드 */}
      {catExercises.length===0?(
        <Card sx={{textAlign:"center",padding:"36px 20px"}}>
          <div style={{fontSize:32,marginBottom:10}}>🏋️</div>
          <div style={{fontSize:15,fontWeight:600,color:NBLACK,marginBottom:6}}>{period} 기간 내 {selCat} 기록 없음</div>
          <div style={{fontSize:13,color:T48}}>기간을 늘리거나 수업이 쌓이면 표시돼요</div>
        </Card>
      ):catExercises.map((ex,i)=>{
        const improved = (ex.wGain||0)>0||(ex.rGain||0)>0;
        const chartPoints = ex.records.filter(r=>r.weight>0);
        return(
          <Card key={i} sx={{marginBottom:10,cursor:"pointer"}} onClick={()=>setSelEx(ex)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:NBLACK}}>{ex.name}</div>
                <div style={{fontSize:11,color:T48,marginTop:2}}>{ex.records.length}회 기록 · {period}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {improved&&(
                  <div style={{background:`${color}15`,borderRadius:980,padding:"4px 10px",fontSize:12,color:color,fontWeight:700}}>
                    {(ex.wGain||0)>0?`+${ex.wGain}kg ↑`:(ex.rGain||0)>0?`+${ex.rGain}회 ↑`:""}
                  </div>
                )}
                <div style={{fontSize:14,color:T48}}>›</div>
              </div>
            </div>
            {ex.first&&ex.latest&&(
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{flex:1,background:LGRAY,borderRadius:8,padding:"7px 10px",textAlign:"center"}}>
                  <div style={{fontSize:10,color:T48,marginBottom:2}}>첫 기록</div>
                  <div style={{fontSize:13,fontWeight:600,color:NBLACK}}>{(ex.first.weight||0)>0?`${ex.first.weight}kg`:"맨몸"}</div>
                  <div style={{fontSize:10,color:T48}}>{ex.first.reps||0}회×{ex.first.sets||0}세트</div>
                </div>
                <div style={{fontSize:16,color:color,fontWeight:700}}>→</div>
                <div style={{flex:1,background:improved?`${color}10`:LGRAY,borderRadius:8,padding:"7px 10px",textAlign:"center",border:improved?`1px solid ${color}25`:"none"}}>
                  <div style={{fontSize:10,color:improved?color:T48,marginBottom:2}}>최근</div>
                  <div style={{fontSize:13,fontWeight:700,color:improved?color:NBLACK}}>{(ex.latest.weight||0)>0?`${ex.latest.weight}kg`:"맨몸"}</div>
                  <div style={{fontSize:10,color:T48}}>{ex.latest.reps||0}회×{ex.latest.sets||0}세트</div>
                </div>
              </div>
            )}
            {chartPoints.length>1&&(()=>{
              const mn=Math.min(...chartPoints.map(p=>p.weight));
              const mx=Math.max(...chartPoints.map(p=>p.weight));
              const range=mx-mn||1;
              const pts=chartPoints.map((r,ci)=>{
                const x=ci/(chartPoints.length-1)*196+2;
                const y=28-(r.weight-mn)/range*22;
                return`${x},${y}`;
              }).join(" ");
              const lp=chartPoints[chartPoints.length-1];
              const lx=196+2, ly=28-(lp.weight-mn)/range*22;
              return(
                <svg viewBox="0 0 200 32" style={{width:"100%",height:32}}>
                  <polyline fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" points={pts}/>
                  <circle cx={lx} cy={ly} r="3.5" fill={color}/>
                </svg>
              );
            })()}
          </Card>
        );
      })}
    </div>
  );
}

// ── 통증해결 진도 ─────────────────────────────────────────────────────────────
function MProgressPain({m}) {
  const recs=(m.selfRecords||[]).filter(r=>r.painLog).sort((a,b)=>a.date.localeCompare(b.date));
  const logs=m.ptLogs||[];

  // 날짜별 통증 강도 (최근 14일)
  const intensityData=recs.slice(-14).map(r=>({v:r.painLog.intensity||0,lb:r.date.slice(5)}));

  // 최근 7일 vs 이전 7일 비교
  const now=Date.now();
  const d7=new Date(now-7*86400000).toISOString().slice(0,10);
  const d14=new Date(now-14*86400000).toISOString().slice(0,10);
  const recent7=recs.filter(r=>r.date>=d7);
  const prev7=recs.filter(r=>r.date>=d14&&r.date<d7);
  const avgRecent=recent7.length>0?(recent7.reduce((a,r)=>a+(r.painLog?.intensity||0),0)/recent7.length):null;
  const avgPrev=prev7.length>0?(prev7.reduce((a,r)=>a+(r.painLog?.intensity||0),0)/prev7.length):null;
  const avgRecentRound=avgRecent!==null?Math.round(avgRecent*10)/10:null;
  const avgPrevRound=avgPrev!==null?Math.round(avgPrev*10)/10:null;
  const improving=avgRecentRound!==null&&avgPrevRound!==null&&avgRecentRound<avgPrevRound;
  const diff=avgRecentRound!==null&&avgPrevRound!==null?Math.abs(avgRecentRound-avgPrevRound).toFixed(1):null;

  // 7일 평균 그래프 데이터 (주별)
  const weeklyData=[];
  for(let i=5;i>=0;i--){
    const wStart=new Date(now-(i+1)*7*86400000).toISOString().slice(0,10);
    const wEnd=new Date(now-i*7*86400000).toISOString().slice(0,10);
    const weekRecs=recs.filter(r=>r.date>=wStart&&r.date<wEnd);
    if(weekRecs.length>0){
      const avg=weekRecs.reduce((a,r)=>a+(r.painLog?.intensity||0),0)/weekRecs.length;
      weeklyData.push({v:Math.round(avg*10)/10,lb:`${6-i}주전`});
    }
  }

  // 부위별 빈도
  const areaCount={};
  recs.forEach(r=>(r.painLog?.areas||[]).forEach(a=>{areaCount[a]=(areaCount[a]||0)+1;}));
  const sortedAreas=Object.entries(areaCount).sort((a,b)=>b[1]-a[1]);
  const maxAreaCount=sortedAreas[0]?.[1]||1;

  const intensityColor=(v)=>v<=3?"#34c759":v<=5?GREEN:v<=7?AMBER:RED;

  return(
    <div style={{padding:16}}>
      {recs.length===0&&(
        <Card sx={{textAlign:"center",padding:"48px 20px",marginBottom:12}}>
          <div style={{fontSize:36,marginBottom:12}}>📊</div>
          <div style={{fontSize:16,fontWeight:600,color:NBLACK,marginBottom:6}}>통증 기록이 없어요</div>
          <div style={{fontSize:13,color:T48,lineHeight:1.6}}>홈 화면에서 매일 통증을 기록하면<br/>여기서 개선 추이를 확인할 수 있어요</div>
        </Card>
      )}

      {/* 개선 현황 + 7일 평균 그래프 */}
      {avgRecentRound!==null&&(
        <Card sx={{marginBottom:12}}>
          <div style={{fontSize:12,color:T48,marginBottom:10,letterSpacing:"0.3px",textTransform:"uppercase"}}>통증 개선 현황</div>

          {/* 7일 평균 막대 그래프 */}
          {weeklyData.length>1&&(
            <div style={{marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10}}>주별 평균 통증 강도</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
                {weeklyData.map((w,i)=>{
                  const barH=Math.max(4,(w.v/10)*72);
                  const col=intensityColor(w.v);
                  const isLast=i===weeklyData.length-1;
                  return(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <div style={{fontSize:10,color:isLast?col:T48,fontWeight:isLast?700:400}}>{w.v}</div>
                      <div style={{
                        width:"100%",height:barH,
                        background:isLast?col:`${col}60`,
                        borderRadius:"4px 4px 0 0",
                        transition:"height 0.8s ease",
                      }}/>
                      <div style={{fontSize:9,color:T48,textAlign:"center"}}>{w.lb}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 숫자 요약 */}
          <div style={{
            padding:"14px 16px",
            background:improving?`${GREEN}08`:`${AMBER}06`,
            borderRadius:12,
            borderLeft:`3px solid ${improving?GREEN:AMBER}`,
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:28,fontWeight:700,color:improving?GREEN:AMBER,letterSpacing:"-0.5px"}}>{avgRecentRound}<span style={{fontSize:14,fontWeight:400}}>/10</span></div>
                <div style={{fontSize:12,color:T48,marginTop:2}}>최근 7일 평균</div>
              </div>
              {diff&&(
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:20,fontWeight:700,color:improving?GREEN:RED}}>{improving?`▼ -${diff}`:`▲ +${diff}`}</div>
                  <div style={{fontSize:11,color:T48,marginTop:2}}>이전 7일 대비</div>
                </div>
              )}
            </div>
            {diff&&(
              <div style={{fontSize:13,color:T48,marginTop:8,lineHeight:1.5}}>
                {improving?`이전 주 ${avgPrevRound}점 → 이번 주 ${avgRecentRound}점으로 ${diff}점 개선됐어요 👍`
                  :`이전 주 ${avgPrevRound}점 → 이번 주 ${avgRecentRound}점으로 ${diff}점 증가했어요. 트레이너에게 알려주세요`}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 날짜별 통증 강도 꺾은선 그래프 */}
      {intensityData.length>1&&(
        <Card sx={{marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:4}}>날짜별 통증 강도</div>
          <div style={{fontSize:11,color:T48,marginBottom:12}}>최근 {intensityData.length}일 · 강도가 낮을수록 개선</div>
          <LineChart data={intensityData} color={RED} height={120}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T48,marginTop:4}}>
            <span style={{color:GREEN}}>낮을수록 좋음</span><span>10점 만점</span>
          </div>
        </Card>
      )}

      {/* 통증 부위별 빈도 바 차트 */}
      {sortedAreas.length>0&&(
        <Card sx={{marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:12}}>통증 부위 빈도</div>
          {sortedAreas.slice(0,6).map(([area,cnt])=>(
            <div key={area} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{fontSize:13,color:NBLACK,width:72,flexShrink:0,letterSpacing:"-0.1px"}}>{area}</div>
              <div style={{flex:1,background:"rgba(0,0,0,0.06)",borderRadius:6,height:10,overflow:"hidden"}}>
                <div style={{
                  background:`linear-gradient(90deg,${RED}80,${RED})`,
                  height:10,borderRadius:6,
                  width:`${(cnt/maxAreaCount)*100}%`,
                  transition:"width 1s ease",
                }}/>
              </div>
              <div style={{fontSize:12,color:T48,width:28,textAlign:"right",fontWeight:500}}>{cnt}회</div>
            </div>
          ))}
        </Card>
      )}

      {/* 특이사항 타임라인 */}
      {recs.filter(r=>r.painLog?.memo).length>0&&(
        <Card>
          <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:12}}>특이사항 타임라인</div>
          <div style={{position:"relative",paddingLeft:20}}>
            {/* 세로선 */}
            <div style={{position:"absolute",left:7,top:6,bottom:0,width:2,background:"rgba(0,0,0,0.06)",borderRadius:2}}/>
            {recs.filter(r=>r.painLog?.memo).slice(-8).reverse().map((r,i)=>(
              <div key={i} style={{display:"flex",gap:12,marginBottom:16,position:"relative"}}>
                <div style={{
                  position:"absolute",left:-20,top:3,
                  width:14,height:14,borderRadius:"50%",
                  background:intensityColor(r.painLog.intensity||0),
                  border:`2px solid ${WHITE}`,flexShrink:0,
                }}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,color:T48}}>{r.date}</span>
                    <span style={{fontSize:11,background:`${intensityColor(r.painLog.intensity||0)}15`,color:intensityColor(r.painLog.intensity||0),padding:"1px 7px",borderRadius:980,fontWeight:600}}>강도 {r.painLog.intensity||0}</span>
                    {(r.painLog.areas||[]).map(a=>(
                      <span key={a} style={{fontSize:10,background:`${RED}10`,color:RED,padding:"1px 7px",borderRadius:980}}>{a}</span>
                    ))}
                  </div>
                  <div style={{fontSize:13,color:NBLACK,lineHeight:1.5,background:LGRAY,padding:"8px 12px",borderRadius:8}}>{r.painLog.memo}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── MProgress — 목표별 분기 ───────────────────────────────────────────────────
function MProgress({m}) {
  const goal=m.profile?.goal||"다이어트";
  if(goal==="근력증진") return <MProgressStrength m={m}/>;
  if(goal==="통증해결") return <MProgressPain m={m}/>;
  return <MProgressDiet m={m}/>;
}


// ── Member Lessons ─────────────────────────────────────────────────────────────
function MLessons({m}) {
  const logs=[...(m.ptLogs||[])].reverse(), [sel,setSel]=useState(null);
  if(sel) return(
    <div style={{padding:16}}>
      <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:ABLUE,fontSize:15,cursor:"pointer",marginBottom:14,fontWeight:400,fontFamily:SF,padding:0,letterSpacing:"-0.2px"}}>‹ 목록으로</button>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontSize:21,fontWeight:600,color:NBLACK,lineHeight:1.19,letterSpacing:"0.231px"}}>{sel.session}회차</div>
          <div style={{fontSize:14,color:T48}}>{sel.date}</div>
        </div>
        {[["체중",sel.weight?`${sel.weight}kg`:"미기록"],["체지방",sel.bodyFat?`${sel.bodyFat}%`:"미기록"],["컨디션",sel.condition||"미기록"]].filter(([,v])=>v!=="미기록"||true).map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f2f2f2"}}>
            <span style={{color:T48,fontSize:15,letterSpacing:"-0.374px"}}>{k}</span>
            <span style={{fontWeight:600,color:NBLACK,fontSize:15,letterSpacing:"-0.374px"}}>{v}</span>
          </div>
        ))}
        {/* exercises 형식 (새 버전) */}
        {sel.exercises?.length>0&&(
          <div style={{marginTop:16}}>
            <div style={{fontSize:12,color:T48,marginBottom:8,letterSpacing:"-0.12px"}}>운동 목록</div>
            {(sel.exercises||[]).filter(e=>e.name).map((e,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:LGRAY,borderRadius:8,marginBottom:6}}>
                <div style={{fontSize:14,fontWeight:500,color:NBLACK}}>{e.name}</div>
                <div style={{fontSize:12,color:T48}}>
                  {e.isCardio?`${e.cardioTime||"-"}분 · avg ${e.cardioAvgHR||"-"}bpm`:`${e.weight>0?e.weight+"kg · ":""}${e.reps||"-"}회 × ${e.sets||"-"}세트`}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* content 형식 (이전 버전 호환) */}
        {sel.content&&!sel.exercises?.length&&(
          <div style={{marginTop:16}}>
            <div style={{fontSize:12,color:T48,marginBottom:6,letterSpacing:"-0.12px"}}>운동 내용</div>
            <div style={{fontSize:15,color:NBLACK,lineHeight:1.47,letterSpacing:"-0.374px"}}>{sel.content}</div>
          </div>
        )}
        {sel.trainerNote&&(
          <div style={{marginTop:12,padding:"12px 14px",background:LGRAY,borderRadius:10,borderLeft:`2px solid ${ABLUE}`}}>
            <div style={{fontSize:12,color:T48,marginBottom:4}}>트레이너 메모</div>
            <div style={{fontSize:14,color:NBLACK,lineHeight:1.47,letterSpacing:"-0.2px"}}>{sel.trainerNote}</div>
          </div>
        )}
        {sel.nextFocus&&(
          <div style={{marginTop:10,padding:"12px 14px",background:`${GREEN}08`,borderRadius:10,borderLeft:`2px solid ${GREEN}`}}>
            <div style={{fontSize:12,color:T48,marginBottom:4}}>다음 집중 포인트</div>
            <div style={{fontSize:14,color:GREEN,fontWeight:600,letterSpacing:"-0.2px"}}>{sel.nextFocus}</div>
          </div>
        )}
      </Card>
    </div>
  );
  return(
    <div style={{padding:16}}>
      {logs.length===0&&(
        <Card sx={{textAlign:"center",padding:"52px 20px"}}>
          <div style={{fontSize:40,marginBottom:14}}>📋</div>
          <div style={{fontSize:17,fontWeight:600,color:NBLACK,letterSpacing:"-0.374px",marginBottom:8}}>수업 기록 없음</div>
          <div style={{fontSize:14,color:T48,lineHeight:1.6}}>트레이너가 PT일지를 작성하면 여기서 확인할 수 있어요</div>
        </Card>
      )}
      {logs.map(l=>(
        <Card key={l.id} sx={{marginBottom:10,cursor:"pointer"}} onClick={()=>setSel(l)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,color:NBLACK,fontSize:17,letterSpacing:"-0.374px"}}>{l.session}회차</div>
              <div style={{fontSize:13,color:T48,marginTop:3,letterSpacing:"-0.2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {(l.exercises?.filter(e=>e.name).map(e=>e.name).join(" · ")||l.content||"수업 기록").slice(0,32)}
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
              <div style={{fontSize:12,color:T48}}>{l.date}</div>
              {l.weight>0&&<div style={{fontSize:15,color:ABLUE,fontWeight:600,marginTop:3}}>{l.weight}kg</div>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── 통합 기록 탭 ───────────────────────────────────────────────────────────────
const CONDITIONS = ["매우좋음","좋음","보통","나쁨","매우나쁨"];
const MEAL_TYPES = ["아침","점심","저녁","간식"];

function MRecord({m, data, onSave}) {
  const today = new Date().toISOString().slice(0,10);
  const [selDate, setSelDate] = useState(today);
  const [view, setView] = useState("today"); // today | history

  // 오늘 날짜의 기존 기록 찾기
  const existing = (m.selfRecords||[]).find(r=>r.date===selDate);

  // 오늘 날짜의 PT 일지 찾기
  const todayPT = (m.ptLogs||[]).find(l=>l.date===selDate);

  // 최신 복습 포인트
  const latestReview = [...(m.reviewPoints||[])].sort((a,b)=>b.date.localeCompare(a.date))[0];

  return(
    <div style={{padding:16,fontFamily:SF}}>
      {/* 날짜 탭 */}
      {/* 세그먼트 컨트롤 — Apple 스타일 */}
      <div style={{
        display:"flex",gap:2,marginBottom:16,
        background:"rgba(0,0,0,0.06)",
        borderRadius:10,padding:3,
      }}>
        {[["today","오늘 기록"],["history","히스토리"]].map(([id,lb])=>(
          <button key={id} onClick={()=>{setView(id);if(id==="today")setSelDate(today);}} style={{
            flex:1,padding:"8px 10px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:SF,
            background:view===id?WHITE:"transparent",
            color:view===id?NBLACK:T48,
            fontWeight:view===id?600:400,fontSize:14,letterSpacing:"-0.2px",
            boxShadow:view===id?"0 1px 4px rgba(0,0,0,0.1)":"none",
            transition:"all 0.2s",
          }}>{lb}</button>
        ))}
      </div>

      {view==="today" && <MRecordForm m={m} data={data} onSave={onSave} date={selDate} existing={existing} todayPT={todayPT} latestReview={latestReview}/>}
      {view==="history" && <MRecordHistory m={m} data={data} onSave={onSave}/>}
    </div>
  );
}

function MRecordForm({m, data, onSave, date, existing, todayPT, latestReview}) {
  const [condition, setCondition] = useState(existing?.condition||"");
  const [meals, setMeals] = useState(existing?.meals||{아침:"",점심:"",저녁:"",간식:""});
  const [mealTab, setMealTab] = useState("아침");
  const [exerciseLogs, setExLogs] = useState(()=>{
    if(existing?.exerciseLogs) return existing.exerciseLogs;
    if(todayPT?.exercises) return todayPT.exercises.map(e=>({
      id:e.id, name:e.name, isCardio:e.isCardio||false,
      prescribedWeight:e.weight, prescribedReps:e.reps, prescribedSets:e.sets,
      prescribedCardioTime:e.cardioTime, prescribedCardioAvgHR:e.cardioAvgHR,
      actualWeight:"", actualReps:"", actualSets:"",
      actualCardioTime:"", actualCardioAvgHR:"",
      note:"", alerted:false,
    }));
    return [];
  });
  const [reviewChecks, setReviewChecks] = useState(existing?.reviewChecks||{});
  const [bodyWeight, setBodyWeight] = useState(existing?.bodyWeight||"");
  const [photos, setPhotos] = useState(existing?.photos||[]);
  const [saved, setSaved] = useState(false);
  const [addEx, setAddEx] = useState(false);
  const [newEx, setNewEx] = useState({name:"",isCardio:false,actualWeight:"",actualReps:"",actualSets:"",actualCardioTime:"",actualCardioAvgHR:"",note:""});

  const updateEx = (id, field, val) => {
    setExLogs(prev=>prev.map(e=>e.id===id?{...e,[field]:val}:e));
  };

  const alertTrainer = (exId) => {
    setExLogs(prev=>prev.map(e=>e.id===exId?{...e,alerted:true}:e));
    // 트레이너에게 알림 추가
    const ex = exerciseLogs.find(e=>e.id===exId);
    if(!ex) return;
    const alertMsg = {
      id:`mg${Date.now()}`,from:"member",
      text:`[운동 특이사항] ${ex.name}: ${ex.note}`,
      time:new Date().toLocaleString("ko-KR"),read:false
    };
    const updMsgs = [...(m.messages||[]), alertMsg];
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,messages:updMsgs,unreadMessages:(x.unreadMessages||0)+1}:x)});
  };

  const save = () => {
    const rec = {
      id: existing?.id || `r${Date.now()}`,
      date, condition, meals, exerciseLogs, reviewChecks,
      bodyWeight: bodyWeight||"",
      photos: photos||[],
      trainerFeedback: existing?.trainerFeedback||"",
      feedbackRead: existing?.feedbackRead||false,
    };
    const others = (m.selfRecords||[]).filter(r=>r.date!==date);
    const upd = [rec, ...others].sort((a,b)=>b.date.localeCompare(a.date));
    // 체중 입력 시 프로필 자동 반영
    const profileUpdate = bodyWeight ? {profile:{...m.profile, weight:parseFloat(bodyWeight)}} : {};
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,...profileUpdate,selfRecords:upd}:x)});
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const reviewBlocks = latestReview?.content?.split("\n\n").filter(Boolean)||[];

  return(
    <div>
      {saved&&<div style={{background:`${GREEN}08`,color:GREEN,padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:12,fontWeight:600,borderLeft:`2px solid ${GREEN}`,fontFamily:SF}}>✓ 저장됐습니다</div>}
      {/* 사진 첨부 */}
      <Card sx={{marginBottom:12}}>
        <PhotoUploader photos={photos} onChange={setPhotos} label="오늘 기록 사진" maxCount={3}/>
        {photos.length>0&&<div style={{fontSize:11,color:T48,marginTop:8}}>💡 사진은 자동 압축되어 저장돼요 (AI 분석 가능 품질 유지)</div>}
      </Card>

      {/* 오늘 수업 배너 */}
      {todayPT&&(
        <Card sx={{marginBottom:14,background:BLACK,color:WHITE}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",marginBottom:4}}>오늘 수업</div>
          <div style={{fontSize:17,fontWeight:600,letterSpacing:"-0.374px",marginBottom:4}}>{todayPT.session}회차 · {todayPT.content?.slice(0,30)}</div>
          {todayPT.nextFocus&&<div style={{fontSize:13,color:"rgba(255,255,255,0.6)",letterSpacing:"-0.2px"}}>다음 집중 → {todayPT.nextFocus}</div>}
        </Card>
      )}

      {/* 컨디션 */}
      <Card sx={{marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10,letterSpacing:"-0.2px"}}>오늘 컨디션</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {CONDITIONS.map((c,ci)=>{
            const cColors=["#30b44a","#34c759","#ff9500","#ff6b30","#ff3b30"];
            const isActive=condition===c;
            return(
              <button key={c} onClick={()=>setCondition(c)} style={{
                padding:"8px 14px",borderRadius:980,fontSize:13,fontFamily:SF,cursor:"pointer",
                background:isActive?cColors[ci]:WHITE,
                color:isActive?WHITE:T48,
                border:`1px solid ${isActive?cColors[ci]:"rgba(0,0,0,0.1)"}`,
                transition:"all 0.15s",
                fontWeight:isActive?600:400,
                boxShadow:isActive?`0 2px 10px ${cColors[ci]}40`:"none",
              }}>{c}</button>
            );
          })}
        </div>
      </Card>

      {/* 체중 (선택) */}
      {m.profile?.goal==="다이어트"&&(
        <Card sx={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:600,color:NBLACK,letterSpacing:"-0.2px"}}>오늘 체중 <span style={{fontSize:11,color:T48,fontWeight:400}}>(선택)</span></div>
            {m.profile?.weight&&<div style={{fontSize:12,color:T48}}>현재 {m.profile.weight}kg</div>}
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{position:"relative",flex:1}}>
              <input value={bodyWeight} onChange={e=>setBodyWeight(e.target.value.replace(/[^0-9.]/g,""))}
                type="number" inputMode="decimal" placeholder={`${m.profile?.weight||""}kg 입력`}
                style={{width:"100%",padding:"11px 40px 11px 14px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box"}}/>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:T48}}>kg</span>
            </div>
            {bodyWeight&&m.profile?.weight&&(
              <div style={{fontSize:13,color:parseFloat(bodyWeight)<m.profile.weight?GREEN:parseFloat(bodyWeight)>m.profile.weight?RED:T48,fontWeight:600,flexShrink:0}}>
                {parseFloat(bodyWeight)<m.profile.weight?`▼ ${(m.profile.weight-parseFloat(bodyWeight)).toFixed(1)}kg`:
                 parseFloat(bodyWeight)>m.profile.weight?`▲ +${(parseFloat(bodyWeight)-m.profile.weight).toFixed(1)}kg`:"변동없음"}
              </div>
            )}
          </div>
          {bodyWeight&&<div style={{fontSize:11,color:T48,marginTop:6}}>저장 시 프로필 체중에 자동 반영돼요</div>}
        </Card>
      )}

      {/* 식사 기록 */}
      <Card sx={{marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10,letterSpacing:"-0.2px"}}>식사 기록</div>
        <div style={{display:"flex",gap:2,marginBottom:12,background:"rgba(0,0,0,0.05)",borderRadius:9,padding:3}}>
          {MEAL_TYPES.map(t=>(
            <button key={t} onClick={()=>setMealTab(t)} style={{
              flex:1,padding:"7px 4px",borderRadius:7,fontSize:12,fontFamily:SF,cursor:"pointer",border:"none",
              background:mealTab===t?WHITE:"transparent",
              color:mealTab===t?NBLACK:T48,
              fontWeight:mealTab===t?600:400,
              boxShadow:mealTab===t?"0 1px 3px rgba(0,0,0,0.1)":"none",
              transition:"all 0.15s",
            }}>{t}</button>
          ))}
        </div>
        <textarea
          value={meals[mealTab]||""}
          onChange={e=>setMeals(p=>({...p,[mealTab]:e.target.value}))}
          rows={3}
          placeholder={`${mealTab} 식사 내용을 입력하세요\n예) 닭가슴살 200g, 현미밥 1/2공기`}
          style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",
            fontSize:14,color:NBLACK,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.6,letterSpacing:"-0.2px"}}
        />
        {/* 사진 업로드 (베타 후) */}
        <div style={{marginTop:8,padding:"10px 14px",background:LGRAY,borderRadius:8,
          display:"flex",alignItems:"center",gap:8,cursor:"not-allowed",opacity:0.5}}>
          <span style={{fontSize:18}}>📷</span>
          <div>
            <div style={{fontSize:13,color:NBLACK,fontWeight:600,letterSpacing:"-0.2px"}}>사진 추가</div>
            <div style={{fontSize:11,color:T48}}>베타 이후 활성화</div>
          </div>
        </div>
      </Card>

      {/* 운동 기록 */}
      <Card sx={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:600,color:NBLACK,letterSpacing:"-0.2px"}}>
            운동 기록{todayPT?` · ${todayPT.session}회차`:""}
          </div>
          {!todayPT&&<button onClick={()=>setAddEx(!addEx)} style={{
            background:ABLUE,border:"none",color:WHITE,padding:"5px 12px",
            borderRadius:980,fontSize:12,cursor:"pointer",fontFamily:SF,
          }}>+ 추가</button>}
        </div>

        {exerciseLogs.length===0&&!addEx&&(
          <div style={{textAlign:"center",padding:"20px 0",color:T48,fontSize:14}}>
            {todayPT?"운동 기록을 불러오는 중...":"수업 기록이 없어요. 자율 운동을 추가해보세요."}
          </div>
        )}

        {exerciseLogs.map((ex,i)=>(
          <div key={ex.id||i} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid #f2f2f2"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontWeight:600,color:NBLACK,fontSize:15,letterSpacing:"-0.2px"}}>{ex.name}</div>
              {ex.isCardio?(
                ex.prescribedCardioTime&&<div style={{fontSize:11,color:T48,background:LGRAY,padding:"3px 8px",borderRadius:980}}>처방 {ex.prescribedCardioTime}분 · avg {ex.prescribedCardioAvgHR}bpm</div>
              ):(
                ex.prescribedWeight!==undefined&&<div style={{fontSize:11,color:T48,background:LGRAY,padding:"3px 8px",borderRadius:980}}>처방 {ex.prescribedWeight}kg×{ex.prescribedReps}회×{ex.prescribedSets}세트</div>
              )}
            </div>
            {/* 실제 수행 */}
            {ex.isCardio?(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                {[["시간(분)","actualCardioTime"],["평균 심박수(bpm)","actualCardioAvgHR"]].map(([lb,field])=>(
                  <div key={field}>
                    <div style={{fontSize:11,color:T48,marginBottom:4,fontFamily:SF}}>{lb}</div>
                    <input value={ex[field]||""} onChange={e=>updateEx(ex.id||i,field,e.target.value)} type="number"
                      placeholder={field==="actualCardioTime"?ex.prescribedCardioTime||"-":ex.prescribedCardioAvgHR||"-"}
                      style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:14,color:NBLACK,background:WHITE,outline:"none",boxSizing:"border-box",fontFamily:SF,textAlign:"center"}}/>
                  </div>
                ))}
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
                {[["중량(kg)","actualWeight"],["횟수","actualReps"],["세트","actualSets"]].map(([lb,field])=>(
                  <div key={field}>
                    <div style={{fontSize:11,color:T48,marginBottom:4,fontFamily:SF}}>{lb}</div>
                    <input value={ex[field]||""} onChange={e=>updateEx(ex.id||i,field,e.target.value)} type="number"
                      placeholder={ex[`prescribed${field.replace("actual","")}`]||"-"}
                      style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:14,color:NBLACK,background:WHITE,outline:"none",boxSizing:"border-box",fontFamily:SF,textAlign:"center"}}/>
                  </div>
                ))}
              </div>
            )}
            {/* 특이사항 */}
            <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
              <input
                value={ex.note||""}
                onChange={e=>updateEx(ex.id||i,"note",e.target.value)}
                placeholder="특이사항 입력 (예: 왼쪽 무릎 통증)"
                style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${ex.note&&!ex.alerted?AMBER:"#d2d2d7"}`,
                  fontSize:13,color:NBLACK,fontFamily:SF,outline:"none"}}
              />
              {ex.note&&!ex.alerted&&(
                <button onClick={()=>alertTrainer(ex.id||i)} style={{
                  background:AMBER,border:"none",color:WHITE,padding:"8px 12px",
                  borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:SF,whiteSpace:"nowrap",flexShrink:0,
                }}>트레이너 전달</button>
              )}
              {ex.alerted&&<span style={{fontSize:11,color:GREEN,padding:"8px 4px",flexShrink:0}}>✓ 전달됨</span>}
            </div>
          </div>
        ))}

        {/* 자율 운동 추가 */}
        {addEx&&(
          <div style={{background:LGRAY,borderRadius:10,padding:12,marginTop:8}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
              <input value={newEx.name} onChange={e=>setNewEx(p=>({...p,name:e.target.value}))} placeholder="운동 종목 입력" style={{flex:1,padding:"8px 12px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:14,color:NBLACK,fontFamily:SF,outline:"none"}}/>
              <button onClick={()=>setNewEx(p=>({...p,isCardio:!p.isCardio}))} style={{padding:"8px 12px",borderRadius:8,fontSize:12,fontFamily:SF,cursor:"pointer",background:newEx.isCardio?AMBER:WHITE,color:newEx.isCardio?WHITE:T48,border:`1px solid ${newEx.isCardio?AMBER:"#d2d2d7"}`,flexShrink:0}}>유산소</button>
            </div>
            {newEx.isCardio?(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                <Inp label="시간(분)" value={newEx.actualCardioTime} onChange={e=>setNewEx(p=>({...p,actualCardioTime:e.target.value}))} placeholder="-" style={{textAlign:"center"}}/>
                <Inp label="평균 심박수(bpm)" value={newEx.actualCardioAvgHR} onChange={e=>setNewEx(p=>({...p,actualCardioAvgHR:e.target.value}))} placeholder="-" style={{textAlign:"center"}}/>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                {[["중량(kg)","actualWeight"],["횟수","actualReps"],["세트","actualSets"]].map(([lb,f])=>(
                  <Inp key={f} label={lb} value={newEx[f]} onChange={e=>setNewEx(p=>({...p,[f]:e.target.value}))} placeholder="-" style={{textAlign:"center"}}/>
                ))}
              </div>
            )}
            <div style={{display:"flex",gap:8}}>
              <Btn ch="취소" v="ghost" sm onClick={()=>setAddEx(false)} sx={{flex:1}}/>
              <Btn ch="추가" sm onClick={()=>{
                if(!newEx.name) return;
                setExLogs(p=>[...p,{id:`e${Date.now()}`,...newEx,alerted:false}]);
                setNewEx({name:"",isCardio:false,actualWeight:"",actualReps:"",actualSets:"",actualCardioTime:"",actualCardioAvgHR:"",note:""});
                setAddEx(false);
              }} sx={{flex:2}}/>
            </div>
          </div>
        )}
      </Card>

      {/* 복습 체크리스트 (최신 1개) */}
      {latestReview&&(
        <Card sx={{marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:4,letterSpacing:"-0.2px"}}>
            복습 체크리스트
          </div>
          <div style={{fontSize:12,color:T48,marginBottom:10,display:"flex",flexWrap:"wrap",gap:6}}>
            {latestReview.tags.map(t=>(
              <span key={t} style={{background:LGRAY,color:ABLUE,padding:"2px 10px",borderRadius:980,fontSize:12}}>{t}</span>
            ))}
          </div>
          {reviewBlocks.map((block,i)=>(
            <div key={i} onClick={()=>setReviewChecks(p=>({...p,[i]:!p[i]}))}
              style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",
                borderBottom:"1px solid #f2f2f2",cursor:"pointer"}}>
              <div style={{
                width:20,height:20,borderRadius:5,flexShrink:0,marginTop:2,
                background:reviewChecks[i]?ABLUE:WHITE,
                border:`2px solid ${reviewChecks[i]?ABLUE:"#d2d2d7"}`,
                display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
              }}>
                {reviewChecks[i]&&<span style={{color:WHITE,fontSize:11,fontWeight:700}}>✓</span>}
              </div>
              <div style={{fontSize:14,color:reviewChecks[i]?T48:NBLACK,lineHeight:1.5,
                textDecoration:reviewChecks[i]?"line-through":"none",letterSpacing:"-0.2px",transition:"color 0.2s"}}>
                {block}
              </div>
            </div>
          ))}
          <div style={{fontSize:12,color:T48,textAlign:"center",marginTop:10}}>
            {Object.values(reviewChecks).filter(Boolean).length}/{reviewBlocks.length} 완료
          </div>
        </Card>
      )}

      {/* 트레이너 피드백 */}
      {existing?.trainerFeedback&&(
        <Card sx={{marginBottom:12,borderLeft:`2px solid ${ABLUE}`}}>
          <div style={{fontSize:12,color:T48,marginBottom:6}}>트레이너 피드백</div>
          <div style={{fontSize:14,color:NBLACK,lineHeight:1.6,letterSpacing:"-0.2px"}}>{existing.trainerFeedback}</div>
        </Card>
      )}

      <Btn ch="기록 저장" full onClick={save} dis={!condition&&!Object.values(meals).some(Boolean)&&exerciseLogs.length===0}/>
    </div>
  );
}

function MRecordHistory({m, data, onSave}) {
  const recs = [...(m.selfRecords||[])].sort((a,b)=>b.date.localeCompare(a.date));
  const [sel, setSel] = useState(null);

  if(sel) {
    const ptLog = (m.ptLogs||[]).find(l=>l.date===sel.date);
    return(
      <div>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:ABLUE,fontSize:15,cursor:"pointer",marginBottom:14,fontFamily:SF,padding:0}}>‹ 목록으로</button>
        <MRecordForm m={m} data={data} onSave={nd=>{onSave(nd);}} date={sel.date} existing={sel} todayPT={ptLog} latestReview={null}/>
      </div>
    );
  }

  if(!recs.length) return(
    <Card sx={{textAlign:"center",padding:"40px 20px"}}>
      <div style={{fontSize:40,marginBottom:12}}>📝</div>
      <div style={{fontSize:15,fontWeight:600,color:NBLACK,letterSpacing:"-0.374px"}}>기록이 없어요</div>
      <div style={{fontSize:13,color:T48,marginTop:6}}>오늘 기록 탭에서 첫 기록을 남겨보세요</div>
    </Card>
  );

  return(
    <div>
      {recs.map(r=>{
        const exDone = (r.exerciseLogs||[]).filter(e=>e.actualWeight||e.actualReps||e.actualSets).length;
        const condColor = {매우좋음:GREEN,좋음:GREEN,보통:AMBER,나쁨:RED,매우나쁨:RED}[r.condition]||T48;
        return(
          <Card key={r.id} sx={{marginBottom:10,cursor:"pointer"}} onClick={()=>setSel(r)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontWeight:600,color:NBLACK,fontSize:15,letterSpacing:"-0.2px"}}>{r.date}</div>
              {r.condition&&<span style={{fontSize:12,color:condColor,background:`${condColor}12`,
                padding:"3px 10px",borderRadius:980,fontFamily:SF}}>{r.condition}</span>}
            </div>
            <div style={{display:"flex",gap:12,fontSize:12,color:T48}}>
              {Object.values(r.meals||{}).some(Boolean)&&<span>🍽 식사 기록 있음</span>}
              {exDone>0&&<span>💪 운동 {exDone}종목</span>}
              {r.trainerFeedback&&<span style={{color:ABLUE}}>💬 피드백</span>}
            </div>
          </Card>
        );
      })}
    </div>
  );
}



// ── Member Reserve ─────────────────────────────────────────────────────────────
function MReserve({m, data, onSave}) {
  const now     = new Date();
  const today   = now.toISOString().slice(0,10);
  const nowHour = now.getHours() + now.getMinutes()/60;

  // 이번 주 월요일
  const getMonday = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    const diff = day===0 ? -6 : 1-day;
    d.setDate(d.getDate()+diff);
    return d.toISOString().slice(0,10);
  };

  const thisMonday = getMonday(today);
  const nextMonday = (() => { const d=new Date(thisMonday); d.setDate(d.getDate()+7); return d.toISOString().slice(0,10); })();
  const thisSunday = (() => { const d=new Date(thisMonday); d.setDate(d.getDate()+6); return d.toISOString().slice(0,10); })();

  // 다음 주 예약 오픈: 이번 주 일요일 12:00 이후
  const nextWeekOpen = today > thisSunday || (today===thisSunday && nowHour>=12);

  const [viewNext, setViewNext] = useState(false);
  const [selDate, setSelDate] = useState("");
  const [selTime, setSelTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const actualView = viewNext && nextWeekOpen;
  const weekStart  = actualView ? nextMonday : thisMonday;

  // 이번/다음 주 7일 (월~일)
  const weekDays = Array.from({length:7},(_,i)=>{
    const d = new Date(weekStart);
    d.setDate(d.getDate()+i);
    return d.toISOString().slice(0,10);
  });
  const DAY_LABELS = ["월","화","수","목","금","토","일"];

  // 트레이너·마감 정보
  const myTrainer      = (data.trainers||[]).find(t=>t.id===m.trainerId);
  const closedSlots    = myTrainer?.closedSlots||[];
  const trainerMembers = (data.members||[]).filter(x=>x.trainerId===m.trainerId);

  const getSlotStatus = (date, time) => {
    const dayIdx = new Date(date).getDay(); // 0=일, 6=토
    if(dayIdx===0||dayIdx===6) return "closed";   // 토·일 운영 안 함
    if(closedSlots.some(cs=>cs.date===date&&cs.time===time)) return "closed";
    const allRes = trainerMembers.flatMap(mem=>
      (mem.reservations||[])
        .filter(r=>r.date===date&&r.time===time&&(r.status==="확정"||r.status==="대기"))
        .map(r=>({...r,isMe:mem.id===m.id}))
    );
    if(!allRes.length) return "available";
    if(allRes.some(r=>r.isMe)) return "mine";
    if(allRes.some(r=>r.status==="확정")) return "booked";
    return "pending";
  };

  // 운영 시간: 06:00 ~ 22:00
  const HOURS = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
  const statusColor = {available:GREEN, pending:AMBER, booked:RED, mine:ABLUE, closed:"rgba(0,0,0,0.15)"};
  const statusLabel = {available:"", pending:"대기", booked:"확정", mine:"내예약", closed:"마감"};

  const submit = () => {
    if(!selDate||!selTime) return;
    const nr = {id:`rs${Date.now()}`,date:selDate,time:selTime,status:"대기",note:""};
    const upd = [...(m.reservations||[]),nr];
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,reservations:upd}:x)});
    setSubmitted(true); setSelDate(""); setSelTime("");
    setTimeout(()=>setSubmitted(false),3000);
  };

  // 다음 주 오픈 안내
  const nextOpenMsg = nextWeekOpen
    ? null
    : today===thisSunday
      ? `오늘(일) 12:00부터 다음 주 예약이 열려요`
      : `다음 주 예약은 일요일(${thisSunday.slice(5)}) 12:00부터 가능해요`;

  const myReservations = [...(m.reservations||[])].sort((a,b)=>b.date.localeCompare(a.date));

  return(
    <div style={{padding:16,fontFamily:SF}}>
      {submitted&&(
        <div style={{background:`${GREEN}08`,color:GREEN,padding:"12px 16px",borderRadius:12,fontSize:14,marginBottom:14,fontWeight:600,borderLeft:`3px solid ${GREEN}`}}>
          ✓ 예약 요청 완료! 트레이너 확정 후 알려드려요.
        </div>
      )}

      {/* 이번 주 / 다음 주 세그먼트 */}
      <div style={{display:"flex",gap:3,marginBottom:10,background:"rgba(0,0,0,0.05)",borderRadius:10,padding:3}}>
        {[["이번 주",false],[`다음 주${nextWeekOpen?"":" 🔒"}`,true]].map(([lb,isNext])=>(
          <button key={lb} onClick={()=>{
            if(isNext&&!nextWeekOpen) return;
            setViewNext(isNext); setSelDate(""); setSelTime("");
          }} style={{
            flex:1,padding:"9px 6px",borderRadius:8,border:"none",fontFamily:SF,fontSize:13,
            cursor:isNext&&!nextWeekOpen?"not-allowed":"pointer",
            background:actualView===isNext?WHITE:"transparent",
            color:actualView===isNext?NBLACK:isNext&&!nextWeekOpen?"rgba(0,0,0,0.25)":T48,
            fontWeight:actualView===isNext?600:400,
            boxShadow:actualView===isNext?"0 1px 4px rgba(0,0,0,0.1)":"none",
            transition:"all 0.2s",
          }}>{lb}</button>
        ))}
      </div>

      {/* 다음 주 오픈 안내 */}
      {nextOpenMsg&&(
        <div style={{
          display:"flex",alignItems:"center",gap:8,
          padding:"9px 14px",marginBottom:12,
          background:`${AMBER}10`,borderRadius:10,
          border:`1px solid ${AMBER}30`,
        }}>
          <span style={{fontSize:14}}>⏰</span>
          <div style={{fontSize:12,color:AMBER,fontWeight:500}}>{nextOpenMsg}</div>
        </div>
      )}

      {/* 운영 안내 */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:"rgba(0,0,0,0.03)",borderRadius:8}}>
          <span style={{fontSize:11,color:T48}}>🕕 운영시간 06:00~22:00 · 월~금 · 토일 휴무</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",background:`${AMBER}08`,borderRadius:8,border:`1px solid ${AMBER}25`}}>
          <span style={{fontSize:11,color:AMBER,lineHeight:1.5}}>⚠️ 예약은 수업 <b>1시간 전</b>까지만 가능해요 · 당일 취소는 <b>노쇼 처리</b>될 수 있어요</span>
        </div>
      </div>

      <Card sx={{marginBottom:14}}>
        {/* 날짜 헤더 */}
        <div style={{display:"grid",gridTemplateColumns:"36px repeat(7,1fr)",gap:2,marginBottom:6}}>
          <div/>
          {weekDays.map((d,i)=>{
            const isToday=d===today;
            const isPast=d<today;
            const dayIdx=new Date(d).getDay();
            const isWeekend=dayIdx===0||dayIdx===6;
            return(
              <div key={d} style={{textAlign:"center",padding:"2px 0"}}>
                <div style={{fontSize:10,color:isWeekend?"rgba(0,0,0,0.2)":isToday?ABLUE:T48,fontWeight:isToday?700:400}}>{DAY_LABELS[i]}</div>
                <div style={{fontSize:12,fontWeight:isToday?700:400,
                  color:isPast||isWeekend?"rgba(0,0,0,0.2)":isToday?ABLUE:NBLACK,
                  background:isToday?`${ABLUE}15`:"transparent",borderRadius:5,padding:"1px 0"}}>
                  {d.slice(8)}
                </div>
              </div>
            );
          })}
        </div>

        {/* 시간 × 요일 그리드 */}
        <div style={{maxHeight:340,overflowY:"auto"}}>
          {HOURS.map(t=>(
            <div key={t} style={{display:"grid",gridTemplateColumns:"36px repeat(7,1fr)",gap:2,marginBottom:2}}>
              <div style={{fontSize:9,color:T48,paddingTop:7,textAlign:"right",paddingRight:4}}>{t}</div>
              {weekDays.map(d=>{
                const status  = getSlotStatus(d,t);
                const h       = parseInt(t);
                const isPast  = d<today||(d===today&&h<Math.floor(nowHour));
                const isSel   = selDate===d&&selTime===t;
                const col     = statusColor[status]||GREEN;
                // 당일은 현재 시간 기준 1시간 이후만 예약 가능
                const tooSoon = d===today && h <= Math.floor(nowHour)+1;
                const canSel  = status==="available"&&!isPast&&!tooSoon;
                return(
                  <button key={d}
                    onClick={canSel?()=>{
                      if(isSel){setSelDate("");setSelTime("");}
                      else{setSelDate(d);setSelTime(t);}
                    }:undefined}
                    style={{
                      height:26,borderRadius:4,border:"none",
                      background:isSel?col:status==="available"?isPast||tooSoon?"rgba(0,0,0,0.03)":`${col}20`:`${col}22`,
                      cursor:canSel?"pointer":"default",
                      fontSize:8,color:isSel?WHITE:isPast?"rgba(0,0,0,0.12)":col,
                      fontWeight:600,fontFamily:SF,
                      transition:"all 0.1s",
                      opacity:isPast?0.4:1,
                    }}>
                    {isSel?"✓":statusLabel[status]}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* 범례 */}
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {[["available",GREEN,"예약 가능"],["mine",ABLUE,"내 예약"],["pending",AMBER,"대기"],["booked",RED,"확정"],["closed","rgba(0,0,0,0.2)","마감/휴무"]].map(([s,c,lb])=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:T48}}>
              <div style={{width:9,height:9,borderRadius:2,background:c}}/>
              {lb}
            </div>
          ))}
        </div>
      </Card>

      {/* 선택 확인 */}
      {selDate&&selTime&&(
        <Card sx={{marginBottom:14,border:`1.5px solid ${ABLUE}`,background:`${ABLUE}06`}}>
          <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:10}}>
            선택: <span style={{color:ABLUE}}>{selDate} {selTime}</span>
          </div>
          <Btn ch="이 시간으로 예약 요청" full onClick={submit}/>
        </Card>
      )}

      {/* 내 예약 목록 */}
      <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:10}}>내 예약 내역</div>
      {myReservations.length===0?(
        <Card sx={{textAlign:"center",padding:"28px"}}>
          <div style={{fontSize:13,color:T48}}>원하는 시간 칸을 탭해서 예약하세요</div>
        </Card>
      ):myReservations.slice(0,10).map(r=>(
        <Card key={r.id} sx={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:600,color:NBLACK,fontSize:15}}>{r.date} {r.time}</div>
              {r.note&&<div style={{fontSize:13,color:T48,marginTop:3}}>{r.note}</div>}
            </div>
            <StatusBadge s={r.status}/>
          </div>
          {r.status!=="취소"&&(
            <div style={{marginTop:8,padding:"7px 12px",background:LGRAY,borderRadius:8,fontSize:12,color:T48}}>
              변경·취소는 트레이너에게 메시지로 요청해주세요
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}


// ─── Trainer App ──────────────────────────────────────────────────────────────
function TrainerApp({trainer, data, onSave, onLogout}) {
  const [scr,setScr]=useState("home"),[sel,setSel]=useState(null);
  const [showTProfile,setShowTProfile]=useState(false);
  const [showNoti,setShowNoti]=useState(false);
  const mine=data.members.filter(x=>x.trainerId===trainer.id);

  // 트레이너 알림 목록
  const today=new Date().toISOString().slice(0,10);
  const tNotiItems=[];

  // 예약 대기 요청
  const pendingRes=mine.flatMap(m=>(m.reservations||[]).filter(r=>r.status==="대기").map(r=>({...r,mName:m.name,mId:m.id})));
  if(pendingRes.length>0) tNotiItems.push({
    icon:"📅",title:"예약 대기",
    desc:`${pendingRes[0].mName} 외 ${pendingRes.length}명이 예약을 요청했어요`,
    tab:"members",unread:true,color:AMBER,
  });

  // 회원 운동 특이사항 알림
  const exAlerts=mine.flatMap(m=>(m.selfRecords||[]).flatMap(r=>(r.exerciseLogs||[]).filter(e=>e.note&&e.alerted).map(e=>({...e,mName:m.name,date:r.date}))));
  if(exAlerts.length>0) tNotiItems.push({
    icon:"⚠️",title:"운동 특이사항",
    desc:`${exAlerts[0].mName}님 외 ${exAlerts.length}건 특이사항이 있어요`,
    tab:"members",unread:true,color:AMBER,
  });

  // 읽지 않은 메시지 (회원→트레이너)
  const unreadMsgs=mine.filter(m=>(m.messages||[]).some(msg=>msg.from==="member"&&!msg.read));
  if(unreadMsgs.length>0) tNotiItems.push({
    icon:"💬",title:"새 메시지",
    desc:`${unreadMsgs.map(m=>m.name).join(", ")}님의 메시지`,
    tab:"members",unread:true,color:ABLUE,
  });

  // 유효기간 D-7 이내 회원
  const expiring=mine.filter(m=>{
    if(!m.expiryDate) return false;
    const days=Math.ceil((new Date(m.expiryDate)-new Date(today))/(1000*60*60*24));
    return days>=0&&days<=7;
  });
  expiring.forEach(m=>{
    const days=Math.ceil((new Date(m.expiryDate)-new Date(today))/(1000*60*60*24));
    tNotiItems.push({
      icon:"⏳",title:`${m.name} 유효기간 임박`,
      desc:`D-${days} (${m.expiryDate})`,
      tab:"members",unread:days<=3,color:AMBER,
    });
  });

  // 만료된 회원
  const expired=mine.filter(m=>m.expiryDate&&today>m.expiryDate);
  expired.forEach(m=>{
    tNotiItems.push({
      icon:"🔴",title:`${m.name} 유효기간 만료`,
      desc:`${m.expiryDate} 만료됨. 보관함 이동 또는 갱신 필요`,
      tab:"members",unread:true,color:RED,
    });
  });

  // 승인 대기 트레이너
  const pendingT=(data.pendingTrainers||[]).length;
  if(pendingT>0) tNotiItems.push({
    icon:"✓",title:"전문가 승인 대기",
    desc:`${pendingT}명의 전문가 가입 신청이 있어요`,
    tab:"approval",unread:true,color:"#5856d6",
  });

  const tTotalNoti=tNotiItems.filter(n=>n.unread).length;
  const openMember=(m)=>{setSel(m);setScr("detail");};
  const pendingCount=(data.pendingTrainers||[]).length;

  const tabs=[
    {id:"home",lb:"홈",ic:"⌂"},
    {id:"members",lb:"회원",ic:"👥"},
    {id:"archive",lb:"보관함",ic:"📦"},
    {id:"approval",lb:"승인",ic:"✓",badge:pendingCount},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#f2f2f7",fontFamily:SF}}>
      {showNoti&&<div style={{position:"fixed",inset:0,zIndex:299}} onClick={()=>setShowNoti(false)}/>}
      {showNoti&&<NotificationPanel items={tNotiItems} onClose={()=>setShowNoti(false)}
        onGo={(tabId)=>{setScr(tabId==="members"||tabId==="approval"?tabId:"home");setShowNoti(false);}}/>}
      {showTProfile&&<TrainerProfileEdit trainer={trainer} data={data} onSave={onSave} onClose={()=>setShowTProfile(false)}/>}
      <nav style={navStyle}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {(scr==="consult"||scr==="detail")&&<button onClick={()=>{setScr("home");setSel(null);setShowNoti(false);}} style={{background:"none",border:"none",color:WHITE,fontSize:22,cursor:"pointer",padding:0,marginRight:4}}>‹</button>}
          <Logo sz={26}/>
          <span style={{color:WHITE,fontSize:15,fontWeight:600,letterSpacing:"-0.2px"}}>{trainer.name}</span>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={()=>setShowNoti(v=>!v)} style={{
            position:"relative",background:"rgba(255,255,255,0.08)",
            border:"0.5px solid rgba(255,255,255,0.15)",color:WHITE,
            width:34,height:34,borderRadius:"50%",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
          }}>
            🔔
            {tTotalNoti>0&&(
              <div style={{
                position:"absolute",top:-2,right:-2,
                background:RED,color:WHITE,borderRadius:"50%",
                width:16,height:16,fontSize:10,fontWeight:700,
                display:"flex",alignItems:"center",justifyContent:"center",
                border:"1.5px solid rgba(0,0,0,0.82)",
              }}>{tTotalNoti}</div>
            )}
          </button>
          <button onClick={()=>setShowTProfile(true)} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",padding:"5px 10px",borderRadius:980,fontSize:11,cursor:"pointer",fontFamily:SF}}>수정</button>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",padding:"5px 10px",borderRadius:980,fontSize:12,cursor:"pointer",fontFamily:SF}}>로그아웃</button>
        </div>
      </nav>
      <div style={{flex:1,overflowY:"auto"}}>
        {scr==="home"     && <THome mine={mine} onOpen={openMember} onConsult={()=>setScr("consult")} onList={()=>setScr("members")} data={data} onSave={onSave}/>}
        {scr==="members"  && <TList mine={mine} onOpen={openMember}/>}
        {scr==="archive"  && <Archive data={data} onSave={onSave}/>}
        {scr==="approval" && <TrainerApproval data={data} onSave={onSave}/>}
        {scr==="consult"  && <TConsult trainer={trainer} data={data} onSave={nd=>{onSave(nd);setScr("members");}} onCancel={()=>setScr("home")}/>}
        {scr==="detail"&&sel && <MDetail m={sel} data={data} onSave={nd=>{onSave(nd);const up=nd.members.find(x=>x.id===sel.id);if(up)setSel(up);else{setSel(null);setScr("members");}}}/>}
      </div>
      {scr!=="consult"&&scr!=="detail"&&(
        <div style={{background:"rgba(249,249,249,0.94)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:"1px solid rgba(0,0,0,0.08)",display:"flex",flexShrink:0}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setScr(t.id)} style={{flex:1,padding:"8px 2px 10px",border:"none",cursor:"pointer",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <div style={{fontSize:t.id===scr?20:17,position:"relative"}}>
                {t.ic}
                {t.badge>0&&<span style={{position:"absolute",top:-4,right:-8,background:RED,color:WHITE,borderRadius:20,padding:"1px 5px",fontSize:9,fontWeight:700}}>{t.badge}</span>}
              </div>
              <div style={{fontSize:10,color:t.id===scr?ABLUE:T48,fontWeight:t.id===scr?600:400,fontFamily:SF}}>{t.lb}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function THome({mine, onOpen, onConsult, onList, data, onSave}) {
  const today=new Date().toISOString().slice(0,10);
  const [selDate, setSelDate]=useState(today);
  const nowH=new Date().getHours();
  const sched=mine.flatMap(m=>(m.reservations||[]).filter(r=>r.date===today&&r.status==="확정").map(r=>({...r,m}))).sort((a,b)=>a.time.localeCompare(b.time));
  // 트레이너 마감 슬롯
  const trainerData = (data.trainers||[]).find(t=>mine[0]?.trainerId===t.id)||{};
  const closedSlots = trainerData.closedSlots||[];
  const pend=mine.flatMap(m=>(m.reservations||[]).filter(r=>r.status==="대기").map(r=>({...r,m})));
  const expiringMembers=mine.filter(m=>{
    if(!m.expiryDate) return false;
    const days=Math.ceil((new Date(m.expiryDate)-new Date(today))/(1000*60*60*24));
    return days>=0&&days<=7;
  });
  const expiredMembers=mine.filter(m=>m.expiryDate&&today>m.expiryDate);

  // 6~23시 타임슬롯
  const HOURS=Array.from({length:18},(_,i)=>i+6); // 6,7,...,23

  return(
    <div style={{padding:16,fontFamily:SF}}>
      {/* 상단 액션 버튼 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <button onClick={onList} style={{background:BLACK,border:"none",color:WHITE,borderRadius:14,padding:"18px 14px",cursor:"pointer",textAlign:"left",fontFamily:SF,boxShadow:CARD_SH}}>
          <div style={{fontSize:24,marginBottom:8}}>👥</div>
          <div style={{fontSize:15,fontWeight:600}}>회원 목록</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",marginTop:2}}>{mine.length}명</div>
        </button>
        <button onClick={onConsult} style={{background:ABLUE,border:"none",color:WHITE,borderRadius:14,padding:"18px 14px",cursor:"pointer",textAlign:"left",fontFamily:SF,boxShadow:CARD_SH}}>
          <div style={{fontSize:24,marginBottom:8}}>＋</div>
          <div style={{fontSize:15,fontWeight:600}}>신규 상담</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:2}}>회원 등록</div>
        </button>
      </div>

      {/* 유효기간 알림 */}
      {(expiringMembers.length>0||expiredMembers.length>0)&&(
        <Card sx={{marginBottom:12,background:`${AMBER}08`,borderLeft:`3px solid ${AMBER}`}}>
          <div style={{fontSize:13,fontWeight:600,color:AMBER,marginBottom:6}}>유효기간 알림</div>
          {expiredMembers.map(m=><div key={m.id} style={{fontSize:13,color:RED,marginBottom:3}}>⚠️ {m.name} — 만료됨 ({m.expiryDate})</div>)}
          {expiringMembers.map(m=>{const days=Math.ceil((new Date(m.expiryDate)-new Date(today))/(1000*60*60*24));return<div key={m.id} style={{fontSize:13,color:AMBER,marginBottom:3}}>⏳ {m.name} — D-{days}</div>;})}
        </Card>
      )}

      {/* 타임라인 스케줄 */}
      <Card sx={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <div style={{fontSize:17,fontWeight:600,color:NBLACK,letterSpacing:"-0.374px"}}>오늘 스케줄</div>
            <div style={{fontSize:12,color:T48,marginTop:2}}>{today} · 확정 {sched.length}건</div>
          </div>
          {sched.length>0&&<div style={{fontSize:12,color:ABLUE,fontFamily:SF}}>{sched.length}건 확정</div>}
        </div>

        {/* 날짜 선택 */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <input type="date" value={selDate} onChange={e=>setSelDate(e.target.value)}
            style={{flex:1,padding:"8px 12px",borderRadius:8,border:"1px solid rgba(0,0,0,0.1)",fontSize:14,color:NBLACK,fontFamily:SF,outline:"none"}}/>
          <div style={{fontSize:12,color:T48,fontFamily:SF}}>확정 {sched.filter(s=>s.date===selDate).length}건</div>
        </div>

        {/* 타임라인 */}
        <div style={{position:"relative"}}>
          {HOURS.map(h=>{
            const timeStr=`${String(h).padStart(2,"0")}:00`;
            const dayLessons=sched.filter(s=>s.date===selDate&&s.time.startsWith(String(h).padStart(2,"0")));
            const isPast=selDate===today&&h<nowH;
            const isCurrent=selDate===today&&h===nowH;
            const isClosed=closedSlots.some(cs=>cs.date===selDate&&cs.time===timeStr);
            const myTrainer=(data.trainers||[]).find(t=>t.id===mine[0]?.trainerId);
            const toggleClose=()=>{
              if(!myTrainer) return;
              const newSlots=isClosed
                ?(myTrainer.closedSlots||[]).filter(cs=>!(cs.date===selDate&&cs.time===timeStr))
                :[...(myTrainer.closedSlots||[]),{date:selDate,time:timeStr}];
              onSave({...data,trainers:(data.trainers||[]).map(tr=>tr.id===myTrainer.id?{...tr,closedSlots:newSlots}:tr)});
            };
            return(
              <div key={h} style={{display:"flex",gap:10,minHeight:46,marginBottom:2}}>
                <div style={{width:40,fontSize:11,color:isCurrent?ABLUE:isPast?"rgba(0,0,0,0.18)":T48,flexShrink:0,paddingTop:3,fontWeight:isCurrent?700:400,fontFamily:SF,textAlign:"right"}}>{timeStr}</div>
                <div style={{flex:1,borderTop:`1px solid ${isCurrent?ABLUE:"#f2f2f2"}`,paddingTop:4}}>
                  {dayLessons.length>0?(
                    dayLessons.map(s=>(
                      <button key={s.id} onClick={()=>onOpen(s.m)} style={{display:"block",width:"100%",marginBottom:4,background:isPast?`${NBLACK}06`:ABLUE,border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",textAlign:"left",fontFamily:SF}}>
                        <div style={{fontSize:13,fontWeight:600,color:isPast?T48:WHITE}}>{s.m.name}</div>
                        <div style={{fontSize:11,color:isPast?"rgba(0,0,0,0.28)":"rgba(255,255,255,0.72)",marginTop:1}}>{s.m.profile?.goal} · {s.m.ptLogs?.length||0}회차</div>
                      </button>
                    ))
                  ):(
                    <button onClick={!isPast?toggleClose:undefined} style={{
                      width:"100%",height:40,
                      background:isClosed?`${RED}08`:`rgba(0,0,0,0.025)`,
                      border:isClosed?`1.5px solid ${RED}40`:`1px dashed rgba(0,0,0,0.12)`,
                      borderRadius:8,
                      cursor:isPast?"default":"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      gap:6,fontFamily:SF,transition:"all 0.15s",
                    }}>
                      {isClosed
                        ? <span style={{fontSize:13,color:RED,fontWeight:600}}>🔒 마감됨 — 다시 클릭하면 해제</span>
                        : !isPast
                          ? <span style={{fontSize:11,color:"rgba(0,0,0,0.25)",letterSpacing:"-0.1px"}}>클릭하여 마감 설정</span>
                          : null
                      }
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {selDate===today&&<div style={{position:"absolute",top:`${(nowH-6)*48+3}px`,left:50,right:0,height:2,background:ABLUE,borderRadius:1,opacity:0.55}}/>}
        </div>

      </Card>

      {/* 대기 예약 */}
      {pend.length>0&&(
        <Card>
          <div style={{fontSize:15,fontWeight:600,color:NBLACK,marginBottom:12}}>대기 중인 예약<Bdg n={pend.length}/></div>
          {pend.map(r=>(
            <button key={r.id} onClick={()=>onOpen(r.m)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",padding:"10px 0",borderBottom:"1px solid #f2f2f2",fontFamily:SF}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:600,color:NBLACK,fontSize:15}}>{r.m.name}</div>
                  <div style={{fontSize:12,color:T48,marginTop:2}}>{r.m.profile?.goal}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,color:AMBER,fontWeight:500}}>{r.date}</div>
                  <div style={{fontSize:13,color:NBLACK,fontWeight:600}}>{r.time}</div>
                </div>
              </div>
            </button>
          ))}
        </Card>
      )}
    </div>
  );
}


function TList({mine, onOpen}) {
  const [q,setQ]=useState("");
  return(
    <div style={{padding:16}}>
      <Inp placeholder="이름 검색" value={q} onChange={e=>setQ(e.target.value)}/>
      {mine.filter(m=>m.name.includes(q)).map(m=>(
        <Card key={m.id} sx={{marginBottom:10,cursor:"pointer"}} onClick={()=>onOpen(m)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,background:BLACK,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:WHITE,fontWeight:600,fontSize:17}}>{m.name[0]}</div>
              <div>
                <div style={{fontWeight:600,color:NBLACK,fontSize:17,letterSpacing:"-0.374px"}}>{m.name}</div>
                <div style={{fontSize:13,color:T48,marginTop:2}}>{m.profile?.goal} · {m.ptLogs?.length||0}회차</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              {m.unreadMessages>0&&<Bdg n={m.unreadMessages}/>}
              {m.unreadFeedback>0&&<div style={{fontSize:11,color:AMBER,marginTop:4}}>피드백 대기</div>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TConsult({trainer, data, onSave, onCancel}) {
  const [name,setName]=useState(""),[pin,setPin]=useState(""),[memo,setMemo]=useState(""),[aiL,setAiL]=useState(false),[aiR,setAiR]=useState(null);
  const go=()=>{
    const nm={id:`m${Date.now()}`,name,pin,trainerId:trainer.id,profile:{gender:"",age:0,height:0,weight:0,targetWeight:0,startWeight:0,startDate:new Date().toISOString().slice(0,10),bodyFat:0,heartRate:0,targetCalories:aiR?.targetCalories||2000,goal:aiR?.goal||"다이어트",activityLevel:aiR?.activityLevel||"보통",workoutFrequency:aiR?.workoutFrequency||"3~4회",consultation:memo,menstrualCycle:false,whyAnalysis:""},ptLogs:[],selfRecords:[],messages:[],reservations:[],reviewPoints:[],points:0,unreadMessages:0,unreadFeedback:0,expiryDate:""};
    onSave({...data,members:[...data.members,nm]});
  };
  return(
    <div style={{padding:16}}>
      <div style={{fontSize:40,fontWeight:600,color:NBLACK,lineHeight:1.10,letterSpacing:"-0.5px",marginBottom:8}}>신규 상담</div>
      <div style={{fontSize:17,color:T80,lineHeight:1.47,letterSpacing:"-0.374px",marginBottom:24}}>상담 내용을 입력하면 AI가 자동 분석합니다</div>
      <Card>
        <Inp label="회원 이름" value={name} onChange={e=>setName(e.target.value)} placeholder="이름 입력"/>
        <Inp label="PIN 4자리 설정" value={pin} onChange={e=>setPin(e.target.value)} placeholder="●●●●" type="password" maxLength={4}/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:T48,marginBottom:6,fontFamily:SF}}>상담 내용</div>
          <textarea value={memo} onChange={e=>setMemo(e.target.value)} rows={5} placeholder="상담 내용 자유 입력" style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",fontSize:15,color:NBLACK,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.6}}/>
        </div>
        <Btn ch="AI 자동 분석" full dis sx={{marginBottom:6,opacity:0.4}}/>
        <div style={{fontSize:11,color:T48,textAlign:"center",marginBottom:10,fontFamily:SF}}>🔒 베타 기간 비활성화</div>
        <div style={{display:"flex",gap:8}}>
          <Btn ch="취소" v="ghost" onClick={onCancel} sx={{flex:1}}/>
          <Btn ch="저장" onClick={go} dis={!name||!pin} sx={{flex:2}}/>
        </div>
      </Card>
    </div>
  );
}

const DTABS = [
  {id:"profile",  ic:"📊",lb:"프로필"},
  {id:"expiry",   ic:"⏳",lb:"유효기간"},
  {id:"lesson",   ic:"📋",lb:"수업일지"},
  {id:"inbody",   ic:"📋",lb:"인바디"},
  {id:"diet",     ic:"🍽️",lb:"식단"},
  {id:"comm",     ic:"💬",lb:"소통"},
  {id:"reserve",  ic:"📅",lb:"예약"},
  {id:"progress", ic:"📈",lb:"진도"},
  {id:"heartrate",ic:"❤️",lb:"심박수"},
  {id:"aitools",  ic:"🤖",lb:"AI도구"},
];

function MDetail({m, data, onSave}) {
  const [tab,setTab]=useState("profile");
  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 48px)"}}>
      <div style={{background:WHITE,padding:"14px 16px",borderBottom:"1px solid #f2f2f2",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,background:BLACK,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:WHITE,fontWeight:600,fontSize:17}}>{m.name[0]}</div>
          <div>
            <div style={{fontWeight:600,color:NBLACK,fontSize:18,letterSpacing:"-0.3px"}}>{m.name}</div>
            <div style={{fontSize:13,color:T48,marginTop:1}}>{m.profile?.goal} · {m.ptLogs?.length||0}회차 · {m.points||0}P{m.expiryDate?` · 만료 ${m.expiryDate}`:""}</div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",overflowX:"auto",background:WHITE,borderBottom:"1px solid #f2f2f2",flexShrink:0,scrollbarWidth:"none"}}>
        {DTABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"8px 12px",border:"none",cursor:"pointer",background:"transparent",fontFamily:SF,borderBottom:tab===t.id?`2px solid ${ABLUE}`:"2px solid transparent",color:tab===t.id?ABLUE:T48,fontWeight:tab===t.id?600:400,fontSize:11,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <span style={{fontSize:16}}>{t.ic}</span><span>{t.lb}</span>
          </button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",background:LGRAY}}>
        {tab==="profile"  &&<DTProfile m={m}/>}
        {tab==="expiry"   &&<DTExpiry m={m} data={data} onSave={onSave}/>}
        {tab==="lesson"   &&<DTLesson m={m} data={data} onSave={onSave}/>}
        {tab==="diet"     &&<DTDiet m={m} data={data} onSave={onSave}/>}
        {tab==="comm"     &&<DTComm m={m} data={data} onSave={onSave}/>}
        {tab==="reserve"  &&<DTReserve m={m} data={data} onSave={onSave}/>}
        {tab==="progress" &&<MProgress m={m}/>}
        {tab==="inbody"   &&<DTInbody m={m} data={data} onSave={onSave}/>}
        {tab==="inbody"   &&<DTInbody m={m} data={data} onSave={onSave}/>}
        {tab==="heartrate"&&<DTHeartRate m={m} data={data} onSave={onSave}/>}
        {tab==="aitools"  &&<DTAITools m={m}/>}
      </div>
    </div>
  );
}

// ─── 유효기간 관리 ─────────────────────────────────────────────────────────────
function DTExpiry({m, data, onSave}) {
  const today=new Date().toISOString().slice(0,10);
  const [date,setDate]=useState(m.expiryDate||"");
  const [saved,setSaved]=useState(false);
  const isExpired=m.expiryDate&&today>m.expiryDate;
  const daysLeft=m.expiryDate?Math.ceil((new Date(m.expiryDate)-new Date(today))/(1000*60*60*24)):null;
  const presets=[{lb:"1개월",days:30},{lb:"3개월",days:90},{lb:"6개월",days:180},{lb:"1년",days:365}];
  const addDays=(d)=>{const base=(m.expiryDate&&!isExpired)?new Date(m.expiryDate):new Date();base.setDate(base.getDate()+d);setDate(base.toISOString().slice(0,10));};
  const save=()=>{onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,expiryDate:date}:x)});setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const [archiveStep, setArchiveStep] = useState(0); // 0: 기본, 1: 확인대기
  const [archiving, setArchiving] = useState(false);
  const doArchive= async ()=>{
    setArchiving(true);
    try {
      // 보관함 이동 시 사진 압축 (0.2 = 저화질, 서버 용량 절약)
      const compressedRecords = await Promise.all(
        (m.selfRecords||[]).map(r => compressPhotosInRecord(r))
      );
      const compressedLogs = await Promise.all(
        (m.ptLogs||[]).map(async log => {
          if(!log.photos?.length) return log;
          const cPhotos = [];
          for(const p of log.photos) {
            if(p?.startsWith('data:image')) {
              const blob = await fetch(p).then(r=>r.blob());
              const file = new File([blob],'photo.jpg',{type:'image/jpeg'});
              cPhotos.push(await compressImage(file, 0.2, 400, 400));
            } else { cPhotos.push(p); }
          }
          return {...log, photos:cPhotos};
        })
      );
      const archivedMember = {
        ...m,
        selfRecords: compressedRecords,
        ptLogs: compressedLogs,
        archivedAt: today,
        photosCompressed: true, // 복원 시 참고
      };
      const nd = {
        ...data,
        members: data.members.filter(x=>x.id!==m.id),
        archivedMembers: [...(data.archivedMembers||[]), archivedMember]
      };
      onSave(nd);
    } catch(e) {
      console.error('보관 처리 중 오류:', e);
      // 압축 실패 시 그냥 보관
      onSave({...data,
        members:data.members.filter(x=>x.id!==m.id),
        archivedMembers:[...(data.archivedMembers||[]),{...m,archivedAt:today}]
      });
    } finally {
      setArchiving(false);
    }
  };
  return(
    <div style={{padding:16}}>
      <Card sx={{marginBottom:14,background:isExpired?`${RED}08`:m.expiryDate?`${GREEN}08`:WHITE,borderLeft:isExpired?`3px solid ${RED}`:m.expiryDate?`3px solid ${GREEN}`:"none"}}>
        <div style={{fontSize:12,color:T48,marginBottom:8}}>현재 유효기간</div>
        {m.expiryDate?<>
          <div style={{fontSize:28,fontWeight:600,color:isExpired?RED:NBLACK,letterSpacing:"-0.5px"}}>{m.expiryDate}</div>
          <div style={{fontSize:14,color:isExpired?RED:daysLeft<=7?AMBER:GREEN,marginTop:6}}>
            {isExpired?"⚠️ 만료됨":daysLeft<=7?`⚠️ D-${daysLeft} 임박`:`✓ D-${daysLeft} 남음`}
          </div>
        </>:<div style={{fontSize:17,color:T48}}>미설정</div>}
      </Card>
      <Card sx={{marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:12}}>유효기간 설정</div>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",fontSize:17,color:NBLACK,background:WHITE,outline:"none",boxSizing:"border-box",fontFamily:SF,marginBottom:12}}/>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {presets.map(p=><button key={p.lb} onClick={()=>addDays(p.days)} style={{padding:"8px 16px",borderRadius:980,fontSize:13,fontFamily:SF,background:LGRAY,color:NBLACK,border:"none",cursor:"pointer"}}>{p.lb} 추가</button>)}
        </div>
        {saved&&<div style={{fontSize:13,color:GREEN,marginBottom:8}}>✓ 저장됐습니다</div>}
        <Btn ch="유효기간 저장" full onClick={save} dis={!date}/>
      </Card>
      <Card sx={{background:`${RED}05`}}>
        <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:4}}>보관함으로 이동</div>
        <div style={{fontSize:13,color:T48,lineHeight:1.6,marginBottom:12}}>회원 데이터를 보관합니다. 언제든 복원할 수 있어요.</div>
        {archiveStep===0&&(
          <button onClick={()=>setArchiveStep(1)} style={{
            width:"100%",padding:"12px",borderRadius:10,border:`1px solid ${RED}`,
            background:"transparent",color:RED,fontSize:15,cursor:"pointer",fontFamily:SF,fontWeight:500,
          }}>보관함으로 이동</button>
        )}
        {archiveStep===1&&(
          <div style={{background:`${RED}08`,borderRadius:10,padding:"14px",border:`1px solid ${RED}30`}}>
            <div style={{fontSize:13,color:RED,marginBottom:12,fontWeight:600,textAlign:"center"}}>
              {m.name}님을 보관함으로 이동할까요?
            </div>
            <div style={{fontSize:12,color:T48,marginBottom:12,textAlign:"center"}}>언제든 복원할 수 있어요</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setArchiveStep(0)} style={{
                flex:1,padding:"10px",borderRadius:8,border:"1px solid rgba(0,0,0,0.1)",
                background:WHITE,color:NBLACK,fontSize:14,cursor:"pointer",fontFamily:SF,
              }}>취소</button>
              <button onClick={doArchive} disabled={archiving} style={{
                flex:2,padding:"10px",borderRadius:8,border:"none",
                background:archiving?"rgba(0,0,0,0.2)":RED,color:WHITE,fontSize:14,
                cursor:archiving?"not-allowed":"pointer",fontFamily:SF,fontWeight:600,
              }}>{archiving?"📦 압축 중...":"보관함으로 이동"}</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── DT Tabs ───────────────────────────────────────────────────────────────────
function DTProfile({m}) {
  const p=m.profile;
  return(
    <div style={{padding:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {[["성별",p?.gender],["나이",`${p?.age}세`],["키",`${p?.height}cm`],["체중",`${p?.weight}kg`],["목표체중",`${p?.targetWeight}kg`],["목표칼로리",`${p?.targetCalories}kcal`],["활동량",p?.activityLevel],["운동빈도",p?.workoutFrequency]].map(([k,v])=>(
          <div key={k} style={{background:WHITE,borderRadius:10,padding:"12px",boxShadow:CARD_SH}}>
            <div style={{fontSize:11,color:T48,fontFamily:SF}}>{k}</div>
            <div style={{fontSize:17,fontWeight:600,color:NBLACK,marginTop:3,letterSpacing:"-0.374px"}}>{v}</div>
          </div>
        ))}
      </div>
      <Card sx={{marginBottom:14}}>
        <div style={{fontSize:12,color:T48,marginBottom:8}}>원본 상담 메모</div>
        <div style={{fontSize:15,color:NBLACK,lineHeight:1.47,letterSpacing:"-0.374px"}}>{p?.consultation||"없음"}</div>
      </Card>
      <Btn ch="AI 심층 프로필 생성" full dis sx={{marginBottom:6,opacity:0.4}}/>
      <div style={{fontSize:11,color:T48,textAlign:"center",marginBottom:12,fontFamily:SF}}>🔒 베타 기간 비활성화</div>
    </div>
  );
}

function DTPersonality({m}) {
  return(
    <div style={{padding:16}}>
      <Btn ch="성향 분석 생성" full dis sx={{marginBottom:6,opacity:0.4}}/>
      <div style={{fontSize:11,color:T48,textAlign:"center",marginBottom:14,fontFamily:SF}}>🔒 베타 기간 비활성화</div>
      <Card sx={{textAlign:"center",padding:"52px 20px"}}><div style={{fontSize:44,marginBottom:16}}>🧠</div><div style={{color:T48,fontSize:15}}>베타 이후 오픈</div></Card>
    </div>
  );
}

function DTLesson({m, data, onSave}) {
  const [subTab, setSubTab] = useState("ptlog"); // ptlog | review

  return(
    <div style={{fontFamily:SF}}>
      {/* 서브탭 */}
      <div style={{display:"flex",background:WHITE,borderBottom:"1px solid #f2f2f2"}}>
        {[{id:"ptlog",lb:"PT 일지"},{id:"review",lb:"복습 포인트"}].map(t=>(
          <button key={t.id} onClick={()=>setSubTab(t.id)} style={{
            flex:1,padding:"12px",border:"none",cursor:"pointer",background:"transparent",
            fontFamily:SF,fontSize:14,
            borderBottom:subTab===t.id?`2px solid ${ABLUE}`:"2px solid transparent",
            color:subTab===t.id?ABLUE:T48,fontWeight:subTab===t.id?600:400,
          }}>{t.lb}</button>
        ))}
      </div>
      {subTab==="ptlog"&&<DTPTLog m={m} data={data} onSave={onSave}/>}
      {subTab==="review"&&<DTVideo m={m} data={data} onSave={onSave}/>}
    </div>
  );
}

function DTComm({m, data, onSave}) {
  const [subTab, setSubTab] = useState("kakao"); // kakao | message

  return(
    <div style={{fontFamily:SF}}>
      <div style={{display:"flex",background:WHITE,borderBottom:"1px solid #f2f2f2"}}>
        {[{id:"kakao",lb:"카톡 멘트"},{id:"message",lb:"메시지"}].map(t=>(
          <button key={t.id} onClick={()=>setSubTab(t.id)} style={{
            flex:1,padding:"12px",border:"none",cursor:"pointer",background:"transparent",
            fontFamily:SF,fontSize:14,
            borderBottom:subTab===t.id?`2px solid ${ABLUE}`:"2px solid transparent",
            color:subTab===t.id?ABLUE:T48,fontWeight:subTab===t.id?600:400,
          }}>{t.lb}</button>
        ))}
      </div>
      {subTab==="kakao"&&<DTKakao m={m}/>}
      {subTab==="message"&&<DTMessage m={m} data={data} onSave={onSave}/>}
    </div>
  );
}

const KAKAO_SITUATIONS = [
  {id:"motivation",ic:"💪",lb:"동기부여"},
  {id:"reminder",ic:"🔔",lb:"수업 리마인더"},
  {id:"noshow",ic:"😢",lb:"노쇼 후 연락"},
  {id:"reregister",ic:"🔄",lb:"재등록 유도"},
  {id:"celebrate",ic:"🎉",lb:"성과 축하"},
  {id:"feedback",ic:"✍️",lb:"수업 피드백"},
];

function DTKakao({m}) {
  const [sit, setSit] = useState("");
  const [res, setRes] = useState("");
  const [notice, setNotice] = useState("");

  const sysPrompts = {
    motivation: `당신은 SNOBBLE TRAINING 트레이너입니다. 운동 동기부여 카톡 메시지를 작성하세요. 회원의 목표와 진행 상황을 언급하며 격려해주세요. 이모지 2~3개 자연스럽게 포함. 따뜻하고 전문적인 트레이너 말투로. 한국어로.`,
    reminder: `당신은 SNOBBLE TRAINING 트레이너입니다. 수업 전날 리마인더 카톡을 작성하세요. 수업 시간, 준비물, 기대감을 담아주세요. 이모지 1~2개 포함. 한국어로.`,
    noshow: `당신은 SNOBBLE TRAINING 트레이너입니다. 노쇼 후 연락 카톡을 작성하세요. 걱정되는 마음을 표현하되 부담주지 않고, 다음 수업 일정 조율을 제안하세요. 이모지 없이. 한국어로.`,
    reregister: `당신은 SNOBBLE TRAINING 트레이너입니다. 수업 종료 후 재등록 유도 카톡을 작성하세요. 그동안의 성과를 언급하고, 자연스럽게 다음 목표와 연결하세요. 직접적인 판매 멘트 금지. 이모지 1~2개. 한국어로.`,
    celebrate: `당신은 SNOBBLE TRAINING 트레이너입니다. 회원의 목표 달성/성과를 축하하는 카톡을 작성하세요. 진심 어린 축하와 함께 다음 목표를 제시해주세요. 이모지 2~3개. 한국어로.`,
    feedback: `당신은 SNOBBLE TRAINING 트레이너입니다. 수업 후 피드백 카톡을 작성하세요.
[이름]님! 금일 수업 피드백입니다! 로 시작. ㅎㅎ 1~2번. 운동 원리 쉽게 설명. 집에서 할 숙제 구체적으로. 오늘도 너무 고생하셨습니다 [이름]님!~ 로 마무리. 이모지 절대 금지. 한국어로.`,
  };

  const copy=()=>{if(navigator.clipboard)navigator.clipboard.writeText(res).then(()=>{setNotice("복사됨!");setTimeout(()=>setNotice(""),2000);});};

  const p = m.profile;
  const lastLog = m.ptLogs?.[m.ptLogs.length-1];
  const memberInfo = `회원: ${m.name} / 목표: ${p?.goal} / ${m.ptLogs?.length||0}회차 완료 / 체중변화: ${p?.startWeight}kg → ${p?.weight}kg / 다음 집중: ${lastLog?.nextFocus||"미정"}`;

  return(
    <div style={{padding:16}}>
      {/* 상황 선택 */}
      <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:12,letterSpacing:"-0.2px"}}>상황 선택</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:20}}>
        {KAKAO_SITUATIONS.map(s=>(
          <button key={s.id} onClick={()=>setSit(s.id)} style={{
            padding:"12px 18px",borderRadius:12,fontSize:14,fontFamily:SF,
            cursor:"pointer",
            background:sit===s.id?BLACK:WHITE,
            color:sit===s.id?WHITE:NBLACK,
            border:`1px solid ${sit===s.id?BLACK:"#d2d2d7"}`,
            fontWeight:sit===s.id?600:400,
            boxShadow:sit===s.id?CARD_SH:"none",
            transition:"all 0.15s",
          }}>{s.ic} {s.lb}</button>
        ))}
      </div>

      {/* 생성 버튼 */}
      <div style={{position:"relative",marginBottom:14}}>
        <Btn ch="카톡 멘트 생성" full dis sx={{opacity:0.4}}/>
        <div style={{fontSize:11,color:T48,textAlign:"center",marginTop:6,fontFamily:SF}}>🔒 베타 기간 비활성화</div>
      </div>

      {/* 미리보기: 직접 작성 */}
      <Card>
        <div style={{fontSize:12,color:T48,marginBottom:8}}>직접 작성 / 베타 후 AI 자동 생성</div>
        {sit&&(
          <div style={{background:`${ABLUE}06`,borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:13,color:T48,lineHeight:1.5}}>
            💡 상황: <b style={{color:ABLUE}}>{KAKAO_SITUATIONS.find(s=>s.id===sit)?.lb}</b> · 회원: {m.name} ({m.ptLogs?.length||0}회차)
          </div>
        )}
        <textarea
          value={res} onChange={e=>setRes(e.target.value)}
          rows={5}
          placeholder={sit?"여기에 카톡 멘트를 직접 작성하거나, 베타 후에는 AI가 자동 생성해줘요":"상황을 먼저 선택해주세요"}
          style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",fontSize:14,color:NBLACK,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.6}}
        />
        {res&&(
          <div style={{marginTop:8}}>
            {notice&&<div style={{fontSize:12,color:GREEN,marginBottom:6}}>{notice}</div>}
            <button onClick={copy} style={{width:"100%",background:BLACK,border:"none",color:WHITE,padding:"12px",borderRadius:10,fontSize:15,cursor:"pointer",fontFamily:SF}}>복사하기</button>
          </div>
        )}
      </Card>
    </div>
  );
}

function DTMessage({m, data, onSave}) {
  const [msgs,setMsgs]=useState(m.messages||[]),[txt,setTxt]=useState(""),ref=useRef(null);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs]);
  const send=()=>{
    if(!txt.trim())return;
    const nm={id:`mg${Date.now()}`,from:"trainer",text:txt,time:new Date().toLocaleString("ko-KR"),read:false};
    const upd=[...msgs,nm];setMsgs(upd);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,messages:upd}:x)});
    setTxt("");
  };
  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 200px)"}}>
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map(msg=>(
          <div key={msg.id} style={{display:"flex",justifyContent:msg.from==="trainer"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"75%",background:msg.from==="trainer"?BLACK:WHITE,color:msg.from==="trainer"?WHITE:NBLACK,padding:"10px 14px",borderRadius:18,fontSize:15,lineHeight:1.47,fontFamily:SF,boxShadow:msg.from==="member"?CARD_SH:"none"}}>
              {msg.text}
              <div style={{fontSize:10,opacity:0.38,marginTop:5,textAlign:"right"}}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px 14px",borderTop:"1px solid #f2f2f2",display:"flex",gap:8,background:WHITE}}>
        <input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="메시지 입력..." style={{flex:1,padding:"10px 14px",borderRadius:980,border:"1px solid #d2d2d7",fontSize:15,fontFamily:SF,outline:"none"}}/>
        <button onClick={send} style={{background:ABLUE,border:"none",color:WHITE,padding:"10px 18px",borderRadius:980,cursor:"pointer",fontFamily:SF,fontSize:15}}>전송</button>
      </div>
    </div>
  );
}

function DTDiet({m, data, onSave}) {
  const [recs,setRecs]=useState(m.selfRecords||[]);
  const [fbs,setFbs]=useState({});
  const [notice,setNotice]=useState("");

  const save=(id)=>{
    const fb=fbs[id]||"";
    if(!fb.trim())return;
    const upd=recs.map(r=>r.id===id?{...r,trainerFeedback:fb,feedbackRead:false}:r);
    setRecs(upd);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,selfRecords:upd,unreadFeedback:(x.unreadFeedback||0)+1}:x)});
    setNotice("저장됨! 회원에게 피드백이 전달됐어요");
    setTimeout(()=>setNotice(""),3000);
  };

  const noAlert = (recs||[]).filter(r=>(r.exerciseLogs||[]).some(e=>e.note&&e.alerted));

  return(
    <div style={{padding:16,fontFamily:SF}}>
      {notice&&<div style={{background:`${GREEN}08`,color:GREEN,padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:12,fontWeight:600,borderLeft:`2px solid ${GREEN}`}}>{notice}</div>}

      {/* 특이사항 알림 */}
      {noAlert.length>0&&(
        <Card sx={{marginBottom:14,background:`${AMBER}08`,borderLeft:`3px solid ${AMBER}`}}>
          <div style={{fontSize:13,fontWeight:600,color:AMBER,marginBottom:8}}>운동 특이사항 알림</div>
          {noAlert.flatMap(r=>(r.exerciseLogs||[]).filter(e=>e.note&&e.alerted).map((e,i)=>(
            <div key={`${r.id}-${i}`} style={{fontSize:13,color:NBLACK,marginBottom:4}}>
              <b>{r.date}</b> · {e.name}: <span style={{color:AMBER}}>{e.note}</span>
            </div>
          )))}
        </Card>
      )}

      {recs.length===0&&(
        <Card sx={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontSize:40,marginBottom:12}}>📋</div>
          <div style={{fontSize:15,fontWeight:600,color:NBLACK}}>기록 없음</div>
          <div style={{fontSize:13,color:T48,marginTop:6}}>회원이 기록을 남기면 여기서 확인하고 피드백할 수 있어요</div>
        </Card>
      )}

      {recs.map(r=>(
        <Card key={r.id} sx={{marginBottom:12}}>
          {/* 날짜 + 컨디션 */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontWeight:600,color:NBLACK,fontSize:15}}>{r.date}</div>
            {r.condition&&(
              <span style={{
                fontSize:12,padding:"3px 10px",borderRadius:980,fontFamily:SF,
                background:{매우좋음:`${GREEN}15`,좋음:`${GREEN}15`,보통:`${AMBER}15`,나쁨:`${RED}15`,매우나쁨:`${RED}15`}[r.condition]||LGRAY,
                color:{매우좋음:GREEN,좋음:GREEN,보통:AMBER,나쁨:RED,매우나쁨:RED}[r.condition]||T48,
              }}>{r.condition}</span>
            )}
          </div>

          {/* 식사 기록 */}
          {r.meals&&Object.entries(r.meals).filter(([,v])=>v).length>0&&(
            <div style={{marginBottom:10}}>
              <div style={{fontSize:12,color:T48,marginBottom:6}}>식사</div>
              {Object.entries(r.meals).filter(([,v])=>v).map(([k,v])=>(
                <div key={k} style={{fontSize:13,color:NBLACK,marginBottom:3,lineHeight:1.5}}>
                  <span style={{color:T48,marginRight:6}}>{k}</span>{v}
                </div>
              ))}
            </div>
          )}

          {/* 운동 기록 */}
          {(r.exerciseLogs||[]).length>0&&(
            <div style={{background:LGRAY,borderRadius:8,padding:"10px 12px",marginBottom:10}}>
              <div style={{fontSize:12,color:T48,marginBottom:6}}>운동</div>
              {r.exerciseLogs.map((e,i)=>(
                <div key={i} style={{fontSize:13,marginBottom:4}}>
                  <span style={{color:NBLACK,fontWeight:500}}>{e.name}</span>
                  {e.isCardio?(
                    <span style={{color:T48}}> · {e.actualCardioTime||e.prescribedCardioTime}분 avg {e.actualCardioAvgHR||e.prescribedCardioAvgHR}bpm</span>
                  ):(
                    <span style={{color:T48}}> · {e.actualWeight||e.prescribedWeight}kg × {e.actualReps||e.prescribedReps}회 × {e.actualSets||e.prescribedSets}세트</span>
                  )}
                  {e.note&&<div style={{fontSize:12,color:AMBER,marginTop:2}}>⚠️ {e.note}</div>}
                </div>
              ))}
            </div>
          )}

          {/* 트레이너 피드백 */}
          {r.trainerFeedback?(
            <div style={{padding:"10px 14px",background:`${ABLUE}08`,borderRadius:8,fontSize:13,color:NBLACK,lineHeight:1.6,borderLeft:`2px solid ${ABLUE}`}}>
              <div style={{fontSize:11,color:T48,marginBottom:4}}>내 피드백</div>
              {r.trainerFeedback}
            </div>
          ):(
            <div>
              <textarea
                value={fbs[r.id]||""}
                onChange={e=>setFbs(p=>({...p,[r.id]:e.target.value}))}
                rows={2}
                placeholder="피드백 입력 후 저장하면 회원에게 전달돼요"
                style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:13,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.5}}
              />
              <Btn ch="피드백 저장" sm onClick={()=>save(r.id)} dis={!fbs[r.id]?.trim()} sx={{marginTop:6}}/>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function DTReserve({m, data, onSave}) {
  const [res,setRes]=useState(m.reservations||[]);
  const [editId,setEditId]=useState(null);
  const [editDate,setEditDate]=useState("");
  const [editTime,setEditTime]=useState("");
  const [editNote,setEditNote]=useState("");

  const upd=(id,status,note="")=>{
    const u=res.map(r=>r.id===id?{...r,status,note}:r);
    setRes(u);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,reservations:u}:x)});
  };

  const saveEdit=(id)=>{
    const u=res.map(r=>r.id===id?{...r,date:editDate,time:editTime,note:editNote,status:"확정"}:r);
    setRes(u);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,reservations:u}:x)});
    setEditId(null);
  };

  const sorted=[...res].sort((a,b)=>b.date.localeCompare(a.date));

  return(
    <div style={{padding:16,fontFamily:SF}}>
      {sorted.map(r=>(
        <Card key={r.id} sx={{marginBottom:12}}>
          {editId===r.id?(
            <div>
              <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:12}}>일정 변경</div>
              <Inp label="날짜" type="date" value={editDate} onChange={e=>setEditDate(e.target.value)}/>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:T48,marginBottom:6}}>시간</div>
                <select value={editTime} onChange={e=>setEditTime(e.target.value)} style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1px solid rgba(0,0,0,0.1)",fontSize:15,color:NBLACK,fontFamily:SF}}>
                  {"07:00,08:00,09:00,10:00,11:00,12:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00".split(",").map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <Inp label="메모 (회원에게 전달)" value={editNote} onChange={e=>setEditNote(e.target.value)} placeholder="변경 이유 등"/>
              <div style={{display:"flex",gap:8}}>
                <Btn ch="취소" v="ghost" sm onClick={()=>setEditId(null)} sx={{flex:1}}/>
                <Btn ch="저장" sm onClick={()=>saveEdit(r.id)} dis={!editDate||!editTime} sx={{flex:2}}/>
              </div>
            </div>
          ):(
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:r.status==="대기"?12:0}}>
                <div>
                  <div style={{fontWeight:600,color:NBLACK,fontSize:16,letterSpacing:"-0.2px"}}>{r.date} {r.time}</div>
                  {r.note&&<div style={{fontSize:13,color:T48,marginTop:3,lineHeight:1.4}}>{r.note}</div>}
                </div>
                <StatusBadge s={r.status}/>
              </div>
              {/* 대기 상태: 확정/취소 */}
              {r.status==="대기"&&(
                <div style={{display:"flex",gap:8,marginBottom:8}}>
                  <Btn ch="확정" sm v="success" onClick={()=>upd(r.id,"확정")} sx={{flex:1}}/>
                  <Btn ch="거절" sm v="danger" onClick={()=>upd(r.id,"취소","요청하신 일정이 어렵습니다. 메시지로 조율해요.")} sx={{flex:1}}/>
                </div>
              )}
              {/* 확정 상태: 변경/취소 */}
              {r.status==="확정"&&(
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <Btn ch="일정 변경" sm v="ghost" onClick={()=>{setEditId(r.id);setEditDate(r.date);setEditTime(r.time);setEditNote("");}} sx={{flex:1}}/>
                  <Btn ch="취소" sm v="danger" onClick={()=>upd(r.id,"취소","부득이한 사정으로 취소됐습니다. 새로운 일정을 메시지로 잡아요.")} sx={{flex:1}}/>
                </div>
              )}
            </>
          )}
        </Card>
      ))}
      {sorted.length===0&&(
        <Card sx={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontSize:13,color:T48}}>예약 내역이 없어요</div>
        </Card>
      )}
    </div>
  );
}

function DTPTLog({m, data, onSave}) {
  const [logs,setLogs]=useState(m.ptLogs||[]);
  const [add,setAdd]=useState(false);
  const [notice,setNotice]=useState("");
  const [sel,setSel]=useState(null); // 상세 보기 선택된 회차
  const [editing,setEditing]=useState(false); // 수정 모드
  const [form,setForm]=useState({
    date:new Date().toISOString().slice(0,10),
    weight:"",bodyFat:"",heartRate:"",condition:"좋음",
    trainerNote:"",nextFocus:"",
    exercises:[{id:`e${Date.now()}`,name:"",weight:"",reps:"",sets:"",isCardio:false,cardioTime:"",cardioAvgHR:""}],
  });

  const addEx=()=>setForm(p=>({...p,exercises:[...p.exercises,{id:`e${Date.now()}`,name:"",weight:"",reps:"",sets:"",isCardio:false,cardioTime:"",cardioAvgHR:""}]}));
  const removeEx=(idx)=>setForm(p=>({...p,exercises:p.exercises.filter((_,i)=>i!==idx)}));
  const updateEx=(idx,field,val)=>setForm(p=>({...p,exercises:p.exercises.map((e,i)=>i===idx?{...e,[field]:val}:e)}));

  const go=()=>{
    const nl={
      id:`l${Date.now()}`,session:logs.length+1,
      ...form,weight:+form.weight,bodyFat:+form.bodyFat,heartRate:+form.heartRate,
      content:form.exercises.filter(e=>e.name).map(e=>e.isCardio?`${e.name} ${e.cardioTime}분 avg${e.cardioAvgHR}bpm`:`${e.name} ${e.weight?e.weight+"kg ":""}${e.reps}회×${e.sets}세트`).join(", "),
    };
    const upd=[...logs,nl];setLogs(upd);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,ptLogs:upd,points:(x.points||0)+1}:x)});
    setAdd(false);setNotice(`${nl.session}회차 저장! 회원 기록 탭에 자동 반영됐습니다.`);setTimeout(()=>setNotice(""),4000);
  };

  // 상세 뷰
  if(sel) {
    const editForm = editing ? sel : null;
    return(
      <div style={{padding:16,fontFamily:SF}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <button onClick={()=>{setSel(null);setEditing(false);}} style={{background:"none",border:"none",color:ABLUE,fontSize:15,cursor:"pointer",padding:0}}>‹ 목록으로</button>
          <button onClick={()=>setEditing(!editing)} style={{background:editing?RED:NBLACK,border:"none",color:WHITE,padding:"6px 14px",borderRadius:980,fontSize:12,cursor:"pointer",fontFamily:SF}}>
            {editing?"취소":"수정"}
          </button>
        </div>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <div style={{fontSize:21,fontWeight:600,color:NBLACK,letterSpacing:"-0.3px"}}>{sel.session}회차</div>
            <div style={{fontSize:14,color:T48}}>{sel.date}</div>
          </div>
          {/* 기본 정보 */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
            {[["체중",sel.weight||0,"kg"],["체지방",sel.bodyFat||0,"%"],["심박수",sel.heartRate||0,"bpm"]].map(([k,v,u])=>(
              <div key={k} style={{textAlign:"center",background:LGRAY,borderRadius:8,padding:"10px 6px"}}>
                <div style={{fontSize:11,color:T48,marginBottom:3}}>{k}</div>
                <div style={{fontSize:16,fontWeight:600,color:NBLACK}}>{v}{u}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
            <span style={{fontSize:13,color:T48}}>컨디션</span>
            <span style={{fontSize:13,fontWeight:600,color:NBLACK}}>{sel.condition}</span>
          </div>
          {/* 운동 목록 */}
          {sel.exercises?.length>0&&(
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:T48,marginBottom:8}}>운동 목록</div>
              {sel.exercises.map((e,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:LGRAY,borderRadius:8,marginBottom:6}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:NBLACK}}>{e.name}</div>
                    {e.isCardio?(
                      <div style={{fontSize:12,color:T48,marginTop:2}}>유산소 · {e.cardioTime}분 · avg {e.cardioAvgHR}bpm</div>
                    ):(
                      <div style={{fontSize:12,color:T48,marginTop:2}}>{e.weight?e.weight+"kg · ":""}{e.reps}회 × {e.sets}세트</div>
                    )}
                  </div>
                  {e.isCardio&&<span style={{fontSize:10,color:WHITE,background:AMBER,padding:"2px 8px",borderRadius:980}}>유산소</span>}
                </div>
              ))}
            </div>
          )}
          {/* 트레이너 메모 */}
          {sel.trainerNote&&(
            <div style={{marginBottom:10,padding:"10px 14px",background:`${ABLUE}08`,borderRadius:8,borderLeft:`2px solid ${ABLUE}`}}>
              <div style={{fontSize:11,color:T48,marginBottom:4}}>트레이너 메모</div>
              <div style={{fontSize:14,color:NBLACK,lineHeight:1.6}}>{sel.trainerNote}</div>
            </div>
          )}
          {sel.nextFocus&&(
            <div style={{padding:"10px 14px",background:`${GREEN}08`,borderRadius:8,borderLeft:`2px solid ${GREEN}`}}>
              <div style={{fontSize:11,color:T48,marginBottom:4}}>다음 집중 포인트</div>
              <div style={{fontSize:14,color:GREEN,fontWeight:600}}>{sel.nextFocus}</div>
            </div>
          )}
          {/* 수정 모드 */}
          {editing&&(
            <div style={{marginTop:14}}>
              <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10}}>수정하기</div>
              <Inp label="트레이너 메모" value={sel.trainerNote||""} onChange={e=>setSel(p=>({...p,trainerNote:e.target.value}))} placeholder="트레이너 메모"/>
              <Inp label="다음 집중 포인트" value={sel.nextFocus||""} onChange={e=>setSel(p=>({...p,nextFocus:e.target.value}))} placeholder="다음 수업 집중 포인트"/>
              <Btn ch="수정 저장" full v="primary" onClick={()=>{
                const upd=logs.map(l=>l.id===sel.id?{...sel}:l);
                setLogs(upd);
                onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,ptLogs:upd}:x)});
                setSel({...sel});
                setEditing(false);
                setNotice("수정됐습니다.");
                setTimeout(()=>setNotice(""),2000);
              }}/>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return(
    <div style={{padding:16}}>
      {notice&&<div style={{background:`${GREEN}08`,color:GREEN,padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:12,fontWeight:600,borderLeft:`2px solid ${GREEN}`,fontFamily:SF}}>{notice}</div>}
      <Btn ch={add?"취소":`${logs.length+1}회차 기록 추가`} full onClick={()=>setAdd(!add)} v={add?"ghost":"primary"} sx={{marginBottom:14}}/>
      {add&&(
        <Card sx={{marginBottom:14}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
            <Inp label="날짜" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/>
            <div>
              <div style={{fontSize:12,color:T48,marginBottom:6,fontFamily:SF}}>컨디션</div>
              <select value={form.condition} onChange={e=>setForm(p=>({...p,condition:e.target.value}))} style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",fontSize:15,color:NBLACK,fontFamily:SF}}>
                {["좋음","보통","나쁨"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <Inp label="체중(kg)" type="number" value={form.weight} onChange={e=>setForm(p=>({...p,weight:e.target.value}))}/>
            <Inp label="체지방(%)" type="number" value={form.bodyFat} onChange={e=>setForm(p=>({...p,bodyFat:e.target.value}))}/>
          </div>
          <Inp label="안정시 심박수(bpm)" type="number" value={form.heartRate} onChange={e=>setForm(p=>({...p,heartRate:e.target.value}))}/>

          <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10,marginTop:4}}>운동 목록</div>
          {form.exercises.map((ex,idx)=>(
            <div key={ex.id} style={{background:LGRAY,borderRadius:10,padding:"12px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <input value={ex.name} onChange={e=>updateEx(idx,"name",e.target.value)} placeholder="운동 종목" style={{flex:1,padding:"8px 10px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:14,color:NBLACK,fontFamily:SF,outline:"none",marginRight:8}}/>
                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  <button onClick={()=>updateEx(idx,"isCardio",!ex.isCardio)} style={{padding:"5px 10px",borderRadius:980,fontSize:11,fontFamily:SF,cursor:"pointer",background:ex.isCardio?AMBER:WHITE,color:ex.isCardio?WHITE:T48,border:`1px solid ${ex.isCardio?AMBER:"#d2d2d7"}`}}>유산소</button>
                  {form.exercises.length>1&&<button onClick={()=>removeEx(idx)} style={{background:"none",border:"none",color:RED,fontSize:18,cursor:"pointer",padding:"0 4px",lineHeight:1}}>×</button>}
                </div>
              </div>
              {ex.isCardio?(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[["시간(분)","cardioTime"],["평균 심박수(bpm)","cardioAvgHR"]].map(([lb,field])=>(
                    <div key={field}>
                      <div style={{fontSize:11,color:T48,marginBottom:4,fontFamily:SF}}>{lb}</div>
                      <input value={ex[field]||""} onChange={e=>updateEx(idx,field,e.target.value)} type="number" placeholder="-" style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:14,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
                    </div>
                  ))}
                </div>
              ):(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["중량(kg)","weight"],["횟수","reps"],["세트","sets"]].map(([lb,field])=>(
                    <div key={field}>
                      <div style={{fontSize:11,color:T48,marginBottom:4,fontFamily:SF}}>{lb}</div>
                      <input value={ex[field]||""} onChange={e=>updateEx(idx,field,e.target.value)} type="number" placeholder="-" style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #d2d2d7",fontSize:14,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={addEx} style={{width:"100%",padding:"10px",borderRadius:10,border:"1px dashed #d2d2d7",background:"transparent",color:ABLUE,fontSize:14,cursor:"pointer",fontFamily:SF,marginBottom:12}}>+ 운동 추가</button>
          <Inp label="트레이너 메모" value={form.trainerNote} onChange={e=>setForm(p=>({...p,trainerNote:e.target.value}))} placeholder="내부 메모"/>
          <Inp label="다음 집중 포인트" value={form.nextFocus} onChange={e=>setForm(p=>({...p,nextFocus:e.target.value}))} placeholder="다음 수업 집중 포인트"/>
          <Btn ch="저장 (회원 기록 탭에 자동 반영)" full onClick={go}/>
        </Card>
      )}
      {[...logs].reverse().map(l=>(
        <Card key={l.id} sx={{marginBottom:10,cursor:"pointer"}} onClick={()=>setSel(l)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:600,color:NBLACK,fontSize:17}}>{l.session}회차</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontSize:13,color:T48}}>{l.date}</div>
              <div style={{fontSize:12,color:ABLUE}}>상세 ›</div>
            </div>
          </div>
          <div style={{display:"flex",gap:14,fontSize:14,marginBottom:6}}>
            <span style={{color:T48}}>체중 <b style={{color:NBLACK}}>{l.weight}kg</b></span>
            {l.bodyFat>0&&<span style={{color:T48}}>체지방 <b style={{color:NBLACK}}>{l.bodyFat}%</b></span>}
          </div>
          {l.exercises?.length>0&&(
            <div style={{fontSize:12,color:T48}}>{l.exercises.filter(e=>e.name).map(e=>e.name).join(" · ")}</div>
          )}
          {l.nextFocus&&<div style={{fontSize:12,color:ABLUE,marginTop:4,fontWeight:600}}>→ {l.nextFocus}</div>}
        </Card>
      ))}
    </div>
  );
}

// 운동 카테고리별 전체 목록
const ALL_EXERCISES = {
  "하체": ["스쿼트","레그프레스","런지","레그컬","레그익스텐션","힙쓰러스트","글루트킥백","불가리안스플릿","스텝업","카프레이즈"],
  "등·힙힌지": ["데드리프트","힙힌지","루마니안데드","케이블로우","바벨로우","시티드로우","랫풀다운","풀업","친업"],
  "가슴·어깨": ["벤치프레스","체스트플라이","인클라인프레스","숄더프레스","사이드레터럴","프론트레이즈","케이블크로스"],
  "팔·코어": ["바이셉컬","트라이셉익스텐션","플랭크","사이드플랭크","크런치","레그레이즈","러시안트위스트","버드독"],
  "유산소·이동성": ["카디오","런닝","바이크","로잉머신","버피","마운틴클라이머","폼롤러","스트레칭","힙플렉서","밴드운동"],
};

function DTVideo({m, data, onSave}) {
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState([]);
  const [res, setRes] = useState("");
  const [pts, setPts] = useState(m.reviewPoints||[]);
  const [openCat, setOpenCat] = useState("");

  const toggle = t => setSel(s=>s.includes(t)?s.filter(x=>x!==t):[...s,t]);

  // 검색 결과
  const searchResults = search.trim().length>0
    ? Object.values(ALL_EXERCISES).flat().filter(e=>e.includes(search.trim()))
    : [];

  const saveP=()=>{
    if(!sel.length||!res.trim())return;
    const np={id:`rp${Date.now()}`,date:new Date().toISOString().slice(0,10),tags:sel,content:res,read:false};
    const upd=[np,...pts];setPts(upd);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,reviewPoints:upd}:x)});
    setSel([]);setRes("");setSearch("");
  };

  return(
    <div style={{padding:16,fontFamily:SF}}>
      <Card sx={{marginBottom:14}}>
        {/* 선택된 태그 */}
        {sel.length>0&&(
          <div style={{marginBottom:12}}>
            <div style={{fontSize:12,color:T48,marginBottom:6}}>선택된 동작 ({sel.length}개)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {sel.map(t=>(
                <button key={t} onClick={()=>toggle(t)} style={{
                  padding:"5px 12px",borderRadius:980,fontSize:13,fontFamily:SF,
                  background:ABLUE,color:WHITE,border:"none",cursor:"pointer",
                }}>
                  {t} ×
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 검색 */}
        <div style={{marginBottom:12}}>
          <input
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="운동 검색 (예: 스쿼트, 플랭크...)"
            style={{width:"100%",padding:"10px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",fontSize:14,color:NBLACK,outline:"none",boxSizing:"border-box",fontFamily:SF}}
          />
          {searchResults.length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
              {searchResults.map(t=><Chip key={t} label={t} active={sel.includes(t)} onClick={()=>toggle(t)}/>)}
            </div>
          )}
          {search.trim().length>0&&searchResults.length===0&&(
            <div style={{fontSize:13,color:T48,marginTop:8}}>검색 결과 없음 — 아래 카테고리에서 선택하세요</div>
          )}
        </div>

        {/* 카테고리별 선택 */}
        {search.trim().length===0&&(
          <div style={{marginBottom:12}}>
            <div style={{fontSize:12,color:T48,marginBottom:8}}>카테고리별 선택</div>
            {Object.entries(ALL_EXERCISES).map(([cat,exercises])=>(
              <div key={cat} style={{marginBottom:8}}>
                <button onClick={()=>setOpenCat(openCat===cat?"":cat)} style={{
                  width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"8px 12px",borderRadius:8,border:"1px solid #d2d2d7",
                  background:WHITE,cursor:"pointer",fontFamily:SF,marginBottom:openCat===cat?6:0,
                }}>
                  <span style={{fontSize:13,fontWeight:600,color:NBLACK}}>{cat}</span>
                  <span style={{fontSize:11,color:T48}}>{openCat===cat?"▲":"▼"}</span>
                </button>
                {openCat===cat&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,padding:"4px 0"}}>
                    {exercises.map(t=><Chip key={t} label={t} active={sel.includes(t)} onClick={()=>toggle(t)}/>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 복습 내용 작성 */}
        <div style={{fontSize:12,color:T48,marginBottom:6}}>복습 핵심 포인트 작성</div>
        <div style={{fontSize:11,color:`${ABLUE}`,marginBottom:8,background:`${ABLUE}08`,padding:"8px 12px",borderRadius:8}}>
          💡 항목 사이를 빈 줄(엔터 2번)로 구분하면 회원 앱에서 체크리스트로 표시돼요
        </div>
          placeholder={"예시:\n스쿼트: 발뒤꿈치 들리지 않게, 무릎은 바깥으로\n\n힙힌지: 등 중립 유지, 햄스트링 당기는 느낌"}
          style={{width:"100%",padding:"12px 14px",borderRadius:11,border:"1.5px solid #d2d2d7",fontSize:14,color:NBLACK,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.6}}/>

        <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>
          <Btn ch="AI 자동 생성 (베타 후 오픈)" full dis sx={{opacity:0.4}}/>
          <Btn ch="저장 → 회원 기록 탭에 전달" v="success" full onClick={saveP} dis={!sel.length||!res.trim()}/>
        </div>
      </Card>

      {/* 저장된 복습 포인트 목록 */}
      {pts.length>0&&(
        <div>
          <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10}}>전달한 복습 포인트</div>
          {pts.map(p=>(
            <Card key={p.id} sx={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {p.tags.map(t=><span key={t} style={{background:LGRAY,color:ABLUE,padding:"2px 10px",borderRadius:980,fontSize:12}}>{t}</span>)}
                </div>
                <div style={{fontSize:11,color:T48}}>{p.date}</div>
              </div>
              <div style={{fontSize:13,color:T48,lineHeight:1.5}}>{p.content.slice(0,70)}...</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 트레이너용 회원 심박수 설정 탭 ──────────────────────────────────────────────
function DTHeartRate({m, data, onSave}) {
  const p = m.profile;
  const age   = p?.age    || 30;
  const rhr   = p?.heartRate || 60;
  const apmhr = Math.max(0, 220 - age);
  const hrr   = Math.max(0, apmhr - rhr);

  const savedZone = HR_ZONES.find(z=>z.id===p?.preferredHRZone);

  const setZone = (zone) => {
    const thrLow  = Math.round(rhr + hrr * zone.pct[0]/100);
    const thrHigh = Math.round(rhr + hrr * zone.pct[1]/100);
    const updated = {
      ...m,
      profile: {
        ...p,
        preferredHRZone:  zone.id,
        preferredTHRLow:  thrLow,
        preferredTHRHigh: thrHigh,
      }
    };
    onSave({...data, members: data.members.map(x=>x.id===m.id?updated:x)});
  };

  return(
    <div style={{padding:16, fontFamily:SF}}>
      {/* 회원 기본 정보 */}
      <Card sx={{marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:12}}>
          {m.name}님 심박수 정보
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[
            ["나이",    `${age}세`,    ""],
            ["안정시 HR", `${rhr}bpm`,  "RHR"],
            ["최대 HR",  `${apmhr}bpm`,"APMHR"],
          ].map(([lb,v,sub])=>(
            <div key={lb} style={{textAlign:"center",background:LGRAY,borderRadius:10,padding:"10px 6px"}}>
              <div style={{fontSize:10,color:T48,marginBottom:4}}>{lb}</div>
              <div style={{fontSize:16,fontWeight:700,color:NBLACK}}>{v}</div>
              {sub&&<div style={{fontSize:10,color:T48,marginTop:2}}>{sub}</div>}
            </div>
          ))}
        </div>
        <div style={{marginTop:10,padding:"8px 12px",background:`${"#5856d6"}08`,borderRadius:8,fontSize:13,color:"#5856d6",textAlign:"center"}}>
          여유 심박수 HRR = {apmhr} − {rhr} = <b>{hrr} bpm</b>
        </div>
      </Card>

      {/* 현재 설정된 구간 */}
      {savedZone&&p?.preferredTHRLow&&(
        <Card sx={{marginBottom:12,background:`${savedZone.color}08`,borderLeft:`3px solid ${savedZone.color}`}}>
          <div style={{fontSize:12,color:T48,marginBottom:4}}>현재 설정된 유산소 구간</div>
          <div style={{fontSize:17,fontWeight:700,color:savedZone.color}}>
            {savedZone.icon} {savedZone.lb} — {p.preferredTHRLow}~{p.preferredTHRHigh} bpm
          </div>
          <div style={{fontSize:12,color:T48,marginTop:3}}>{savedZone.pct[0]}~{savedZone.pct[1]}% 강도</div>
        </Card>
      )}

      {/* 구간별 THR 계산 & 선택 */}
      <div style={{fontSize:13,fontWeight:600,color:NBLACK,marginBottom:10}}>
        유산소 목표 심박수 구간 설정
      </div>
      <div style={{fontSize:12,color:T48,marginBottom:12,lineHeight:1.5}}>
        구간을 탭하면 회원 앱 홈 화면에 자동으로 반영돼요
      </div>
      {HR_ZONES.map(z=>{
        const lo = Math.round(rhr + hrr * z.pct[0]/100);
        const hi = Math.round(rhr + hrr * z.pct[1]/100);
        const isSet = p?.preferredHRZone===z.id;
        return(
          <button key={z.id} onClick={()=>setZone(z)}
            style={{
              width:"100%",display:"flex",alignItems:"center",gap:12,
              padding:"14px 16px",marginBottom:8,
              borderRadius:12,
              border:`2px solid ${isSet?z.color:"rgba(0,0,0,0.08)"}`,
              background:isSet?`${z.color}12`:WHITE,
              cursor:"pointer",textAlign:"left",fontFamily:SF,
              boxShadow:isSet?`0 2px 12px ${z.color}25`:"none",
              transition:"all 0.15s",
            }}>
            <span style={{fontSize:24,flexShrink:0}}>{z.icon}</span>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:15,fontWeight:isSet?700:500,color:isSet?z.color:NBLACK}}>{z.lb}</span>
                  {isSet&&<span style={{fontSize:10,background:z.color,color:WHITE,padding:"1px 8px",borderRadius:980,fontWeight:600}}>설정됨</span>}
                </div>
                <span style={{fontSize:14,fontWeight:700,color:isSet?z.color:NBLACK}}>{lo}~{hi}<span style={{fontSize:11,fontWeight:400,color:T48}}> bpm</span></span>
              </div>
              <div style={{fontSize:12,color:T48,marginTop:2}}>{z.pct[0]}~{z.pct[1]}% · {z.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── 인바디 측정 기록 (트레이너용) ───────────────────────────────────────────────
function DTInbody({m, data, onSave}) {
  const today = new Date().toISOString().slice(0,10);
  const [form, setForm] = useState({
    date: today,
    checkpoint: "2주",
    weight: "",
    bodyFat: "",
    muscleMass: "",
    bmi: "",
    visceralFat: "",
    note: "",
  });
  const [saved, setSaved] = useState(false);

  const records = (m.inbodyRecords||[]).sort((a,b)=>b.date.localeCompare(a.date));
  const first   = records.length>0 ? records[records.length-1] : null;
  const latest  = records.length>0 ? records[0] : null;

  const save = () => {
    if(!form.weight) return;
    const rec = {id:`ib${Date.now()}`, ...form,
      weight:parseFloat(form.weight)||0,
      bodyFat:parseFloat(form.bodyFat)||0,
      muscleMass:parseFloat(form.muscleMass)||0,
      bmi:parseFloat(form.bmi)||0,
      visceralFat:parseFloat(form.visceralFat)||0,
    };
    const upd = [rec, ...(m.inbodyRecords||[])];
    // 프로필 체중·체지방 자동 반영
    const updProfile = {
      ...m.profile,
      weight:   rec.weight   || m.profile?.weight,
      bodyFat:  rec.bodyFat  || m.profile?.bodyFat,
    };
    onSave({...data, members: data.members.map(x=>
      x.id===m.id ? {...x, inbodyRecords:upd, profile:updProfile} : x
    )});
    setSaved(true);
    setForm({date:today, checkpoint:"2주", weight:"", bodyFat:"", muscleMass:"", bmi:"", visceralFat:"", note:""});
    setTimeout(()=>setSaved(false), 2500);
  };

  const diff = (key) => {
    if(!first||!latest||first.id===latest.id) return null;
    const d = (latest[key]||0) - (first[key]||0);
    return d;
  };
  const wDiff = diff("weight");
  const fDiff = diff("bodyFat");
  const mDiff = diff("muscleMass");

  return(
    <div style={{padding:16, fontFamily:SF}}>
      {/* 인바디 변화 요약 */}
      {records.length>=2&&(
        <Card sx={{marginBottom:14, background:"linear-gradient(135deg,#1a1a1a,#000)", color:WHITE}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:8,letterSpacing:"0.5px",textTransform:"uppercase"}}>인바디 변화 요약</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[
              ["체중",    wDiff, "kg", wDiff<0],
              ["체지방",  fDiff, "%",  fDiff<0],
              ["골격근량", mDiff, "kg", mDiff>0],
            ].map(([lb,d,u,isGood])=>d!==null&&(
              <div key={lb} style={{textAlign:"center",background:"rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 6px"}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:4}}>{lb}</div>
                <div style={{fontSize:18,fontWeight:800,color:isGood?GREEN:Math.abs(d)<0.1?"rgba(255,255,255,0.6)":RED}}>
                  {d>0?"+":""}{d.toFixed(1)}{u}
                </div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{first.date.slice(5)}→{latest.date.slice(5)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 입력 폼 */}
      <Card sx={{marginBottom:14}}>
        <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:14}}>인바디 측정 입력</div>

        {/* 날짜 + 체크포인트 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
          <Inp label="측정일" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/>
          <div>
            <div style={{fontSize:12,color:T48,marginBottom:6,fontWeight:500}}>측정 시점</div>
            <div style={{display:"flex",gap:6}}>
              {["2주","4주","기타"].map(cp=>(
                <button key={cp} onClick={()=>setForm(p=>({...p,checkpoint:cp}))} style={{
                  flex:1,padding:"11px 4px",borderRadius:10,fontSize:13,fontFamily:SF,cursor:"pointer",
                  background:form.checkpoint===cp?ABLUE:WHITE,
                  color:form.checkpoint===cp?WHITE:NBLACK,
                  border:`1px solid ${form.checkpoint===cp?ABLUE:"rgba(0,0,0,0.1)"}`,
                  fontWeight:form.checkpoint===cp?600:400,
                }}>{cp}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 핵심 수치 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <div style={{fontSize:12,color:T48,marginBottom:5,fontWeight:500}}>체중 (kg) <span style={{color:RED}}>*</span></div>
            <input value={form.weight} onChange={e=>setForm(p=>({...p,weight:e.target.value}))}
              type="number" inputMode="decimal" placeholder="kg"
              style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1.5px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div>
            <div style={{fontSize:12,color:T48,marginBottom:5,fontWeight:500}}>체지방률 (%)</div>
            <input value={form.bodyFat} onChange={e=>setForm(p=>({...p,bodyFat:e.target.value}))}
              type="number" inputMode="decimal" placeholder="%"
              style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div>
            <div style={{fontSize:12,color:T48,marginBottom:5,fontWeight:500}}>골격근량 (kg)</div>
            <input value={form.muscleMass} onChange={e=>setForm(p=>({...p,muscleMass:e.target.value}))}
              type="number" inputMode="decimal" placeholder="kg"
              style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div>
            <div style={{fontSize:12,color:T48,marginBottom:5,fontWeight:500}}>내장지방 레벨</div>
            <input value={form.visceralFat} onChange={e=>setForm(p=>({...p,visceralFat:e.target.value}))}
              type="number" inputMode="decimal" placeholder="1~20"
              style={{width:"100%",padding:"12px 14px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box"}}/>
          </div>
        </div>

        <div style={{marginTop:10,marginBottom:14}}>
          <div style={{fontSize:12,color:T48,marginBottom:5,fontWeight:500}}>트레이너 코멘트</div>
          <textarea value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))}
            rows={2} placeholder="이번 측정 결과에 대한 코멘트"
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:14,color:NBLACK,resize:"none",boxSizing:"border-box",fontFamily:SF,lineHeight:1.5}}/>
        </div>

        {saved&&<div style={{fontSize:13,color:GREEN,marginBottom:8,fontWeight:600}}>✓ 저장됐습니다. 회원 프로필에 자동 반영됐어요.</div>}
        <div style={{background:`${ABLUE}08`,borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:12,color:T48}}>
          💡 저장 시 체중·체지방률이 회원 프로필에 자동 반영돼요
        </div>
        <button onClick={save} disabled={!form.weight} style={{
          width:"100%",padding:"13px",borderRadius:10,border:"none",
          background:form.weight?ABLUE:"rgba(0,0,0,0.1)",
          color:form.weight?WHITE:T48,
          fontSize:16,cursor:form.weight?"pointer":"not-allowed",
          fontFamily:SF,fontWeight:600,
        }}>저장 → 회원 프로필 반영</button>
      </Card>

      {/* 기록 히스토리 */}
      {records.length>0&&(
        <div>
          <div style={{fontSize:14,fontWeight:600,color:NBLACK,marginBottom:10}}>측정 기록</div>
          {records.map((r,i)=>(
            <Card key={r.id} sx={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:NBLACK}}>{r.date}</div>
                  <div style={{fontSize:12,color:T48,marginTop:2}}>{r.checkpoint} 측정</div>
                </div>
                {i===0&&<span style={{fontSize:11,background:ABLUE,color:WHITE,padding:"2px 10px",borderRadius:980,fontWeight:600}}>최신</span>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  ["체중",     r.weight,     "kg"],
                  ["체지방",   r.bodyFat,    "%"],
                  ["골격근량", r.muscleMass, "kg"],
                  ["내장지방", r.visceralFat,"Lv"],
                ].filter(([,v])=>v>0).map(([lb,v,u])=>(
                  <div key={lb} style={{background:LGRAY,borderRadius:8,padding:"8px 10px"}}>
                    <div style={{fontSize:10,color:T48,marginBottom:2}}>{lb}</div>
                    <div style={{fontSize:15,fontWeight:700,color:NBLACK}}>{v}{u}</div>
                  </div>
                ))}
              </div>
              {r.note&&<div style={{marginTop:8,fontSize:13,color:T48,lineHeight:1.5,padding:"8px 10px",background:LGRAY,borderRadius:8}}>{r.note}</div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function DTAITools({m}) {
  const p=m.profile;
  const tools=[
    {ic:"🧠",title:"성향 분석",desc:"상담 내용 기반 성격·소통 방식·운동 접근법 분석"},
    {ic:"🌸",title:"생리주기 운동 가이드",desc:"호르몬 주기별 운동 강도·식이 팁 제공",show:p?.menstrualCycle},
    {ic:"🎓",title:"자가운동 처방전",desc:"PT 종료 후 홈트레이닝 루틴 + 팔로업 카톡 생성"},
    {ic:"📝",title:"인수인계 메모",desc:"팀원 트레이너에게 전달할 핵심 인수인계 자동 작성"},
  ];
  return(
    <div style={{padding:16}}>
      <div style={{background:BLACK,borderRadius:16,padding:"20px",marginBottom:20,color:WHITE,boxShadow:CARD_SH}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.45)",marginBottom:4}}>준비 중</div>
        <div style={{fontSize:21,fontWeight:600,letterSpacing:"-0.3px",lineHeight:1.19,marginBottom:8}}>AI 분석 도구</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>베타 이후 회원 데이터를 바탕으로 영양학·운동생리학 기반 전문 분석을 제공해요.</div>
      </div>
      {tools.filter(t=>t.show!==false).map((t,i)=>(
        <Card key={i} sx={{marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:28,width:48,height:48,background:LGRAY,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{t.ic}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <div style={{fontSize:15,fontWeight:600,color:NBLACK}}>{t.title}</div>
                <span style={{background:LGRAY,color:T48,fontSize:10,padding:"2px 8px",borderRadius:980}}>🔒 베타 후</span>
              </div>
              <div style={{fontSize:13,color:T48,lineHeight:1.5}}>{t.desc}</div>
            </div>
          </div>
        </Card>
      ))}
      <Card sx={{marginTop:4}}>
        <div style={{fontSize:12,color:T48,marginBottom:8}}>원본 상담 메모</div>
        <div style={{fontSize:14,color:NBLACK,lineHeight:1.7}}>{p?.consultation||"없음"}</div>
      </Card>
    </div>
  );
}

// ─── 보관함 ────────────────────────────────────────────────────────────────────
function Archive({data, onSave}) {
  const archived=data.archivedMembers||[];
  const today=new Date().toISOString().slice(0,10);
  const restore=(m)=>{onSave({...data,members:[...data.members,{...m,archivedAt:undefined,expiryDate:""}],archivedMembers:archived.filter(x=>x.id!==m.id)});};
  if(!archived.length) return(
    <div style={{padding:16}}><Card sx={{textAlign:"center",padding:"52px 20px"}}><div style={{fontSize:44,marginBottom:14}}>📦</div><div style={{fontSize:17,fontWeight:600,color:NBLACK,marginBottom:8}}>보관함이 비어 있어요</div><div style={{fontSize:14,color:T48}}>만료된 회원이 여기 보관돼요</div></Card></div>
  );
  return(
    <div style={{padding:16}}>
      <div style={{fontSize:17,fontWeight:600,color:NBLACK,marginBottom:16}}>보관함 ({archived.length}명)</div>
      {archived.map(m=>(
        <Card key={m.id} sx={{marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <div style={{width:42,height:42,background:NBLACK,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:WHITE,fontWeight:600,fontSize:16,opacity:0.4}}>{m.name[0]}</div>
            <div>
              <div style={{fontWeight:600,color:NBLACK,fontSize:15}}>{m.name}</div>
              <div style={{fontSize:12,color:T48,marginTop:2}}>{m.profile?.goal} · {m.ptLogs?.length||0}회차{m.archivedAt?` · 보관일 ${m.archivedAt}`:""}</div>
            </div>
          </div>
          <Btn ch="복원하기" full onClick={()=>restore(m)}/>
        </Card>
      ))}
    </div>
  );
}

// ─── 트레이너 승인 ──────────────────────────────────────────────────────────────
function TrainerApproval({data, onSave}) {
  const pending=data.pendingTrainers||[];
  const approve=(t)=>onSave({...data,trainers:[...data.trainers,{...t,approved:true}],pendingTrainers:pending.filter(x=>x.id!==t.id)});
  const reject=(t)=>onSave({...data,pendingTrainers:pending.filter(x=>x.id!==t.id)});
  if(!pending.length) return(
    <div style={{padding:16}}><Card sx={{textAlign:"center",padding:"48px 20px"}}><div style={{fontSize:40,marginBottom:14}}>✓</div><div style={{fontSize:17,fontWeight:600,color:NBLACK,marginBottom:8}}>대기 중인 신청 없음</div></Card></div>
  );
  return(
    <div style={{padding:16}}>
      <div style={{fontSize:17,fontWeight:600,color:NBLACK,marginBottom:4}}>승인 대기 <span style={{color:AMBER}}>({pending.length})</span></div>
      <div style={{fontSize:13,color:T48,marginBottom:16}}>신청한 전문가를 승인하거나 거절하세요</div>
      {pending.map(t=>(
        <Card key={t.id} sx={{marginBottom:10}}>
          <div style={{marginBottom:12}}>
            <div style={{fontWeight:600,color:NBLACK,fontSize:17}}>{t.name}</div>
            {t.specialty&&<div style={{fontSize:13,color:T48,marginTop:3}}>{t.specialty}</div>}
            <div style={{fontSize:12,color:T48,marginTop:3}}>신청일 {t.appliedAt}</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn ch="거절" sm v="danger" onClick={()=>reject(t)} sx={{flex:1}}/>
            <Btn ch="승인" sm v="success" onClick={()=>approve(t)} sx={{flex:2}}/>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── 회원 AI 코칭 ───────────────────────────────────────────────────────────────
// ── 회원 메시지 ───────────────────────────────────────────────────────────────
function MMemberMessage({m, data, onSave}) {
  const [msgs,setMsgs]=useState(m.messages||[]);
  const [txt,setTxt]=useState("");
  const ref=useRef(null);

  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs]);

  // 읽지 않은 메시지 읽음 처리
  useEffect(()=>{
    if((m.unreadMessages||0)>0){
      onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,unreadMessages:0}:x)});
    }
  },[]);

  const send=()=>{
    if(!txt.trim())return;
    const nm={id:`mg${Date.now()}`,from:"member",text:txt,time:new Date().toLocaleString("ko-KR"),read:false};
    const upd=[...msgs,nm];setMsgs(upd);
    onSave({...data,members:data.members.map(x=>x.id===m.id?{...x,messages:upd}:x)});
    setTxt("");
  };

  const trainer=(data.trainers||[]).find(t=>t.id===m.trainerId);

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",fontFamily:SF,minHeight:0}}>
      {/* 헤더 */}
      <div style={{padding:"12px 16px",background:WHITE,borderBottom:"1px solid #f2f2f2",flexShrink:0}}>
        <div style={{fontSize:15,fontWeight:600,color:NBLACK}}>
          {trainer?`${trainer.name} 트레이너`:"트레이너"}
        </div>
        <div style={{fontSize:12,color:T48,marginTop:2}}>1:1 메시지 · 트레이너만 볼 수 있어요</div>
      </div>

      {/* 메시지 목록 */}
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:8,background:"#f2f2f7"}}>
        {msgs.length===0&&(
          <div style={{textAlign:"center",color:T48,fontSize:14,marginTop:40}}>
            <div style={{fontSize:32,marginBottom:10}}>💬</div>
            트레이너에게 메시지를 보내보세요
          </div>
        )}
        {msgs.map(msg=>(
          <div key={msg.id} style={{display:"flex",justifyContent:msg.from==="member"?"flex-end":"flex-start"}}>
            {msg.from==="trainer"&&(
              <div style={{width:32,height:32,background:NBLACK,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:WHITE,fontSize:12,fontWeight:600,flexShrink:0,marginRight:8,marginTop:"auto"}}>{(trainer?.name||"T")[0]}</div>
            )}
            <div style={{
              maxWidth:"72%",
              background:msg.from==="member"?ABLUE:WHITE,
              color:msg.from==="member"?WHITE:NBLACK,
              padding:"10px 14px",
              borderRadius:msg.from==="member"?"18px 18px 4px 18px":"18px 18px 18px 4px",
              fontSize:15,lineHeight:1.47,fontFamily:SF,
              boxShadow:msg.from==="trainer"?CARD_SH:"none",
            }}>
              {msg.text}
              <div style={{fontSize:10,opacity:0.5,marginTop:4,textAlign:msg.from==="member"?"right":"left"}}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div style={{padding:"10px 14px",borderTop:"0.5px solid rgba(0,0,0,0.1)",display:"flex",gap:8,background:WHITE,flexShrink:0}}>
        <input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="메시지 입력..."
          style={{flex:1,padding:"10px 14px",borderRadius:980,border:"1px solid rgba(0,0,0,0.1)",fontSize:15,fontFamily:SF,outline:"none",background:"#f2f2f7"}}/>
        <button onClick={send} disabled={!txt.trim()} style={{
          background:ABLUE,border:"none",color:WHITE,padding:"10px 18px",
          borderRadius:980,cursor:"pointer",fontFamily:SF,fontSize:15,
          opacity:txt.trim()?1:0.4,
        }}>전송</button>
      </div>
    </div>
  );
}

// ── 프로필 수정 (회원용) ──────────────────────────────────────────────────────
function MProfileEdit({m, data, onSave, onClose}) {
  const p=m.profile;
  const [f,setF]=useState({
    name:m.name||"",
    gender:p?.gender||"",age:String(p?.age||""),
    height:String(p?.height||""),weight:String(p?.weight||""),
    targetWeight:String(p?.targetWeight||""),
    goal:p?.goal||"",activityLevel:p?.activityLevel||"",
    workoutFrequency:p?.workoutFrequency||"",
    targetCalories:String(p?.targetCalories||""),
    menstrualCycle:p?.menstrualCycle||false,
  });
  const [saved,setSaved]=useState(false);

  const save=()=>{
    const updated={...m,name:f.name,profile:{...p,
      gender:f.gender,age:+f.age,height:+f.height,weight:+f.weight,
      targetWeight:+f.targetWeight,goal:f.goal,
      activityLevel:f.activityLevel,workoutFrequency:f.workoutFrequency,
      targetCalories:+f.targetCalories,menstrualCycle:f.menstrualCycle,
    }};
    onSave({...data,members:data.members.map(x=>x.id===m.id?updated:x)});
    setSaved(true);setTimeout(()=>{setSaved(false);onClose();},1200);
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{background:WHITE,borderRadius:"20px 20px 0 0",padding:"20px 20px 40px",maxHeight:"85vh",overflowY:"auto",fontFamily:SF}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:600,color:NBLACK,letterSpacing:"-0.3px"}}>내 정보 수정</div>
          <button onClick={onClose} style={{background:"rgba(0,0,0,0.06)",border:"none",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:16,color:T48}}>×</button>
        </div>
        <Inp label="이름" value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))} placeholder="이름"/>
        <div style={{display:"flex",gap:12,marginBottom:14}}>
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:T48,marginBottom:6}}>성별</div>
            <div style={{display:"flex",gap:6}}>{["남","여"].map(g=><button key={g} onClick={()=>setF(p=>({...p,gender:g}))} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${f.gender===g?ABLUE:"rgba(0,0,0,0.1)"}`,background:f.gender===g?ABLUE:WHITE,color:f.gender===g?WHITE:NBLACK,fontSize:14,cursor:"pointer",fontFamily:SF}}>{g}</button>)}</div>
          </div>
          <div style={{flex:1}}><Inp label="나이" value={f.age} onChange={e=>setF(p=>({...p,age:e.target.value}))} type="number" placeholder="만 나이"/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="키 (cm)" value={f.height} onChange={e=>setF(p=>({...p,height:e.target.value}))} type="number"/>
          <Inp label="체중 (kg)" value={f.weight} onChange={e=>setF(p=>({...p,weight:e.target.value}))} type="number"/>
        </div>
        <Inp label="목표 체중 (kg, 선택)" value={f.targetWeight} onChange={e=>setF(p=>({...p,targetWeight:e.target.value}))} type="number" placeholder="선택사항"/>
        <Inp label="목표 칼로리 (kcal)" value={f.targetCalories} onChange={e=>setF(p=>({...p,targetCalories:e.target.value}))} type="number"/>
        {saved&&<div style={{color:GREEN,fontSize:13,marginBottom:10,textAlign:"center"}}>✓ 저장됐습니다</div>}
        <Btn ch="저장" full onClick={save}/>
      </div>
    </div>
  );
}

// ── 트레이너 프로필 수정 ──────────────────────────────────────────────────────
function TrainerProfileEdit({trainer, data, onSave, onClose}) {
  const [name,setName]=useState(trainer.name||"");
  const [specialty,setSpecialty]=useState(trainer.specialty||"");
  const [saved,setSaved]=useState(false);

  const save=()=>{
    if(!name.trim())return;
    const updated={...trainer,name:name.trim(),specialty};
    onSave({...data,trainers:data.trainers.map(t=>t.id===trainer.id?updated:t)});
    setSaved(true);setTimeout(()=>{setSaved(false);onClose();},1200);
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div style={{background:WHITE,borderRadius:"20px 20px 0 0",padding:"20px 20px 40px",fontFamily:SF}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:600,color:NBLACK,letterSpacing:"-0.3px"}}>프로필 수정</div>
          <button onClick={onClose} style={{background:"rgba(0,0,0,0.06)",border:"none",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:16,color:T48}}>×</button>
        </div>
        <Inp label="이름" value={name} onChange={e=>setName(e.target.value)} placeholder="트레이너 이름"/>
        <Inp label="전문 분야" value={specialty} onChange={e=>setSpecialty(e.target.value)} placeholder="예) 다이어트, 근력 강화, 재활"/>
        {saved&&<div style={{color:GREEN,fontSize:13,marginBottom:10,textAlign:"center"}}>✓ 저장됐습니다</div>}
        <Btn ch="저장" full onClick={save} dis={!name.trim()}/>
      </div>
    </div>
  );
}

// ── 사진 압축 유틸 ──────────────────────────────────────────────────────────────
// quality: 0~1 (1=원본, 0.6=AI분석용, 0.2=보관함용)
// maxW/maxH: 리사이즈 최대 크기
const compressImage = (file, quality=0.6, maxW=1200, maxH=1200) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        // 비율 유지하며 리사이즈
        let w = img.width, h = img.height;
        if(w > maxW || h > maxH) {
          const ratio = Math.min(maxW/w, maxH/h);
          w = Math.round(w*ratio); h = Math.round(h*ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        // base64 dataURL로 변환
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// 보관함 압축: 모든 사진 필드를 저화질로 재압축
const compressPhotosInRecord = async (rec) => {
  const compressed = {...rec};
  // 식사 사진
  if(rec.mealPhotos) {
    compressed.mealPhotos = {};
    for(const [k,v] of Object.entries(rec.mealPhotos||{})) {
      if(v && v.startsWith('data:image')) {
        const blob = await fetch(v).then(r=>r.blob());
        const file = new File([blob], 'photo.jpg', {type:'image/jpeg'});
        compressed.mealPhotos[k] = await compressImage(file, 0.2, 400, 400);
      } else {
        compressed.mealPhotos[k] = v;
      }
    }
  }
  // PT일지 사진
  if(rec.photos) {
    compressed.photos = [];
    for(const p of rec.photos||[]) {
      if(p && p.startsWith('data:image')) {
        const blob = await fetch(p).then(r=>r.blob());
        const file = new File([blob], 'photo.jpg', {type:'image/jpeg'});
        compressed.photos.push(await compressImage(file, 0.2, 400, 400));
      } else {
        compressed.photos.push(p);
      }
    }
  }
  return compressed;
};

// 사진 업로드 버튼 컴포넌트
const PhotoUploader = ({photos=[], onChange, label="사진 추가", maxCount=3}) => {
  const [loading, setLoading] = useState(false);
  const handleFile = async (e) => {
    const files = Array.from(e.target.files||[]);
    if(!files.length) return;
    if(photos.length + files.length > maxCount) {
      alert(`최대 ${maxCount}장까지 첨부 가능해요`);
      return;
    }
    setLoading(true);
    try {
      const compressed = await Promise.all(
        files.map(f => compressImage(f, 0.6, 1200, 1200))
      );
      onChange([...photos, ...compressed]);
    } catch(err) {
      console.error('압축 실패:', err);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };
  return(
    <div>
      {label&&<div style={{fontSize:12,color:T48,marginBottom:6,fontWeight:500}}>{label} <span style={{opacity:0.6}}>(최대 {maxCount}장 · 자동 압축)</span></div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-start"}}>
        {photos.map((p,i)=>(
          <div key={i} style={{position:"relative",width:72,height:72,flexShrink:0}}>
            <img src={p} alt="" style={{width:72,height:72,objectFit:"cover",borderRadius:10,border:"1px solid rgba(0,0,0,0.08)"}}/>
            <button onClick={()=>onChange(photos.filter((_,j)=>j!==i))} style={{
              position:"absolute",top:-6,right:-6,width:20,height:20,
              background:RED,border:"none",borderRadius:"50%",color:WHITE,
              fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
            }}>×</button>
          </div>
        ))}
        {photos.length < maxCount && (
          <label style={{
            width:72,height:72,borderRadius:10,border:`1.5px dashed rgba(0,0,0,0.2)`,
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            cursor:"pointer",background:LGRAY,flexShrink:0,
          }}>
            <input type="file" accept="image/*" multiple onChange={handleFile} style={{display:"none"}}/>
            {loading ? <div style={{fontSize:10,color:T48}}>압축중...</div>
              : <><div style={{fontSize:22,lineHeight:1}}>📷</div><div style={{fontSize:9,color:T48,marginTop:3}}>추가</div></>}
          </label>
        )}
      </div>
    </div>
  );
};

// ── AI 호출 제한 (하루 5회) ─────────────────────────────────────────────────────
const AI_DAILY_LIMIT = 5;

const useAILimit = (userId) => {
  const storageKey = `ai_count_${userId}_${new Date().toISOString().slice(0,10)}`;
  const [count, setCount] = useState(() => {
    try { return parseInt(localStorage.getItem(storageKey)||'0'); } catch { return 0; }
  });
  const canUse = count < AI_DAILY_LIMIT;
  const remaining = AI_DAILY_LIMIT - count;
  const increment = () => {
    const next = count + 1;
    setCount(next);
    try { localStorage.setItem(storageKey, String(next)); } catch {}
  };
  return {canUse, remaining, increment, count};
};

// AI 제한 배지 컴포넌트
const AILimitBadge = ({remaining}) => (
  <div style={{
    display:"inline-flex",alignItems:"center",gap:5,
    padding:"4px 10px",borderRadius:980,
    background:remaining>2?`${GREEN}15`:remaining>0?`${AMBER}15`:`${RED}15`,
    border:`1px solid ${remaining>2?GREEN:remaining>0?AMBER:RED}20`,
    fontSize:11,fontWeight:600,
    color:remaining>2?GREEN:remaining>0?AMBER:RED,
  }}>
    🤖 AI 오늘 {remaining}회 남음
  </div>
);

// 카르보넨 목표 심박수 구간
const HR_ZONES = [
  {id:"recovery",  lb:"회복",        pct:[50,60], color:"#34c759", icon:"🧘", desc:"대화 편하게 가능 · 준비/마무리"},
  {id:"fatburn",   lb:"지방 연소",   pct:[60,70], color:"#30b44a", icon:"🚶", desc:"약간 숨참 · 지방 연소 최적"},
  {id:"cardio",    lb:"심폐 체력",   pct:[70,80], color:AMBER,     icon:"🏃", desc:"대화 어려움 · 심폐 기능 향상"},
  {id:"hiit",      lb:"고강도 훈련", pct:[80,90], color:RED,       icon:"🔥", desc:"VO₂max↑ · 단시간 고강도"},
];
// 회원 프로필에서 자동으로 목표 심박수 계산
const getAutoHR = (profile) => {
  const age   = profile?.age    || 0;
  const rhr   = profile?.heartRate || 0;
  if(!age || !rhr) return null;
  const apmhr = 220 - age;
  const hrr   = apmhr - rhr;
  if(hrr <= 0) return null;
  // 저장된 구간 우선, 없으면 목표별 기본값
  const zoneId = profile?.preferredHRZone || ({
    "다이어트":"fatburn", "근력증진":"cardio", "통증해결":"recovery",
  }[profile?.goal] || "fatburn");
  const zone = HR_ZONES.find(z=>z.id===zoneId) || HR_ZONES[1];
  return {
    zone,
    low:  Math.round(rhr + hrr * zone.pct[0]/100),
    high: Math.round(rhr + hrr * zone.pct[1]/100),
    isSaved: !!profile?.preferredHRZone,
  };
};

// 홈 심박수 인라인 표시 컴포넌트
const HomeHRBadge = ({profile}) => {
  const hr = getAutoHR(profile);
  if(!hr) return null;
  const {zone,low,high,isSaved} = hr;
  return(
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"10px 14px",borderRadius:12,
      background:`${zone.color}10`,
      border:`1px solid ${zone.color}${isSaved?"40":"20"}`,
    }}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16}}>{zone.icon}</span>
        <div>
          <div style={{fontSize:10,color:T48,letterSpacing:"0.2px",textTransform:"uppercase",fontFamily:SF}}>유산소 목표 심박수</div>
          <div style={{fontSize:11,color:T48,marginTop:1,fontFamily:SF}}>
            {zone.lb} {zone.pct[0]}~{zone.pct[1]}%
            {!isSaved&&<span style={{marginLeft:4,opacity:0.6}}>· 기본값</span>}
          </div>
        </div>
      </div>
      <div style={{fontSize:18,fontWeight:800,color:zone.color,letterSpacing:"-0.5px",fontFamily:SF}}>
        {low}~{high}<span style={{fontSize:11,fontWeight:400,color:T48}}> bpm</span>
      </div>
    </div>
  );
};


function KarvonenCalc({m, data, onSave}) {
  const p = m.profile;
  const defaultAge = p?.age||30;
  const defaultRHR = p?.heartRate||60;

  const [age,   setAge] = useState(String(defaultAge));
  const [rhr,   setRhr] = useState(String(defaultRHR));
  const [saved, setSaved] = useState(false);

  // 저장된 구간 불러오기 (없으면 목표별 기본값)
  const defaultZone = p?.preferredHRZone || {
    "다이어트": "fatburn",
    "근력증진": "cardio",
    "통증해결": "recovery",
  }[p?.goal||"다이어트"] || "fatburn";

  const [selZone, setSelZone] = useState(defaultZone);

  const goalZoneDesc = {
    "다이어트": {zone:"fatburn",  msg:"다이어트 목표엔 지방 연소 구간이 효과적이에요"},
    "근력증진": {zone:"cardio",   msg:"근력 운동 사이 심폐 능력도 함께 키워보세요"},
    "통증해결": {zone:"recovery", msg:"통증 회복 중엔 부담 없는 회복 구간부터 시작해요"},
  }[p?.goal||"다이어트"];

  const ageN  = parseInt(age)||0;
  const rhrN  = parseInt(rhr)||0;
  const apmhr = Math.max(0, 220 - ageN);
  const hrr   = Math.max(0, apmhr - rhrN);
  const zone  = HR_ZONES.find(z=>z.id===selZone)||HR_ZONES[1];
  const thrLow  = Math.round(rhrN + hrr * zone.pct[0]/100);
  const thrHigh = Math.round(rhrN + hrr * zone.pct[1]/100);
  const valid = ageN>0 && rhrN>0 && apmhr>rhrN;

  // 구간 저장
  const saveZone = () => {
    const updated = {
      ...m,
      profile: {
        ...p,
        preferredHRZone: selZone,
        preferredTHRLow: valid ? thrLow : null,
        preferredTHRHigh: valid ? thrHigh : null,
      }
    };
    onSave({...data, members: data.members.map(x=>x.id===m.id?updated:x)});
    setSaved(true);
    setTimeout(()=>setSaved(false), 2500);
  };

  return(
    <Card sx={{marginBottom:12}}>
      {/* 헤더 */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <div style={{width:44,height:44,background:`${zone.color}15`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{zone.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:NBLACK,letterSpacing:"-0.3px"}}>유산소 목표 심박수</div>
          <div style={{fontSize:12,color:T48,marginTop:2}}>카르보넨 공식 · 설정 저장 가능</div>
        </div>
        {p?.preferredHRZone&&(
          <div style={{fontSize:11,color:GREEN,background:`${GREEN}12`,padding:"3px 9px",borderRadius:980,fontWeight:600}}>저장됨</div>
        )}
      </div>

      {/* 나이 / 안정시 심박수 입력 */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[["나이","세",age,setAge],["안정시 심박수","bpm",rhr,setRhr]].map(([lb,unit,val,setter])=>(
          <div key={lb}>
            <div style={{fontSize:11,color:T48,marginBottom:5,fontWeight:500,letterSpacing:"0.2px",textTransform:"uppercase"}}>{lb}</div>
            <div style={{position:"relative"}}>
              <input value={val} onChange={e=>setter(e.target.value.replace(/[^0-9]/g,""))}
                type="number" inputMode="numeric"
                style={{width:"100%",padding:"11px 36px 11px 12px",borderRadius:10,border:"1px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,fontFamily:SF,outline:"none",boxSizing:"border-box"}}/>
              <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:T48}}>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 공식 계산 과정 */}
      {valid&&(
        <div style={{background:LGRAY,borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,color:T48,lineHeight:1.9,fontFamily:SF}}>
          <div>최대 심박수 <b style={{color:NBLACK}}>APMHR = 220 − {ageN} = <span style={{color:RED,fontWeight:700}}>{apmhr} bpm</span></b></div>
          <div>여유 심박수 <b style={{color:NBLACK}}>HRR = {apmhr} − {rhrN} = <span style={{color:"#5856d6",fontWeight:700}}>{hrr} bpm</span></b></div>
        </div>
      )}

      {/* 강도 구간 선택 */}
      <div style={{fontSize:11,color:T48,marginBottom:8,fontWeight:500,letterSpacing:"0.3px",textTransform:"uppercase"}}>운동 강도 선택 (탭해서 변경)</div>

      {goalZoneDesc&&(
        <div style={{
          padding:"8px 12px",
          background:`${HR_ZONES.find(z=>z.id===goalZoneDesc.zone)?.color}12`,
          borderRadius:8,marginBottom:8,fontSize:12,color:T48,
          borderLeft:`2px solid ${HR_ZONES.find(z=>z.id===goalZoneDesc.zone)?.color}`,
        }}>
          💡 <b style={{color:NBLACK}}>{p?.goal}</b> 목표 추천 구간이 표시돼 있어요. 변경 후 저장하면 반영돼요.
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
        {HR_ZONES.map(z=>{
          const isRec = goalZoneDesc?.zone===z.id;
          const isSel = selZone===z.id;
          const thr_lo = valid ? Math.round(rhrN + hrr * z.pct[0]/100) : null;
          const thr_hi = valid ? Math.round(rhrN + hrr * z.pct[1]/100) : null;
          return(
            <button key={z.id} onClick={()=>setSelZone(z.id)} style={{
              display:"flex",alignItems:"center",gap:12,padding:"12px 14px",
              borderRadius:12,
              border:`2px solid ${isSel?z.color:isRec?"rgba(0,0,0,0.12)":"rgba(0,0,0,0.07)"}`,
              background:isSel?`${z.color}12`:WHITE,
              cursor:"pointer",textAlign:"left",fontFamily:SF,transition:"all 0.15s",
              boxShadow:isSel?`0 2px 12px ${z.color}30`:"none",
            }}>
              <span style={{fontSize:22,flexShrink:0}}>{z.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:14,fontWeight:isSel?700:500,color:isSel?z.color:NBLACK}}>{z.lb}</span>
                    {isRec&&<span style={{fontSize:10,background:z.color,color:WHITE,padding:"1px 7px",borderRadius:980,fontWeight:600}}>추천</span>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <span style={{fontSize:12,color:isSel?z.color:T48,fontWeight:600}}>{z.pct[0]}~{z.pct[1]}%</span>
                    {valid&&<div style={{fontSize:12,color:isSel?z.color:T48,fontWeight:700}}>{thr_lo}~{thr_hi} bpm</div>}
                  </div>
                </div>
                <div style={{fontSize:11,color:T48,marginTop:1}}>{z.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 결과 + 저장 */}
      {valid?(
        <>
          <div style={{
            background:`linear-gradient(135deg,${zone.color}18,${zone.color}06)`,
            borderRadius:14,padding:"16px 18px",
            border:`2px solid ${zone.color}30`,
            textAlign:"center",marginBottom:12,
          }}>
            <div style={{fontSize:12,color:T48,marginBottom:6,letterSpacing:"0.3px",textTransform:"uppercase"}}>목표 심박수 (THR)</div>
            <div style={{fontSize:40,fontWeight:800,color:zone.color,letterSpacing:"-1px",lineHeight:1}}>
              {thrLow} ~ {thrHigh}
              <span style={{fontSize:16,fontWeight:500,opacity:0.7}}> bpm</span>
            </div>
            <div style={{fontSize:11,color:T48,marginTop:6}}>
              = {rhrN} + {hrr} × {zone.pct[0]}% ~ {rhrN} + {hrr} × {zone.pct[1]}%
            </div>
            {/* 시각화 바 */}
            <div style={{marginTop:12}}>
              <div style={{position:"relative",height:12,background:"rgba(0,0,0,0.06)",borderRadius:6,overflow:"hidden"}}>
                <div style={{position:"absolute",left:`${zone.pct[0]}%`,width:`${zone.pct[1]-zone.pct[0]}%`,height:"100%",background:zone.color,borderRadius:6,transition:"all 0.4s ease"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T48,marginTop:4}}>
                <span>{rhrN}</span>
                <span style={{color:zone.color,fontWeight:700}}>{thrLow}~{thrHigh} bpm</span>
                <span>{apmhr}</span>
              </div>
            </div>
          </div>
          {saved&&<div style={{fontSize:13,color:GREEN,textAlign:"center",marginBottom:8,fontWeight:600}}>✓ 홈 화면에 저장됐어요!</div>}
          <Btn ch={`이 구간으로 설정 저장 (${zone.icon} ${zone.lb} ${zone.pct[0]}~${zone.pct[1]}%)`} full onClick={saveZone} v="primary"/>
        </>
      ):(
        <div style={{background:LGRAY,borderRadius:12,padding:"16px",textAlign:"center",color:T48,fontSize:13}}>
          나이와 안정시 심박수를 입력하면 목표 심박수가 계산돼요
        </div>
      )}
    </Card>
  );
}

function MAICoaching({m, data, onSave}) {
  const recentRecords=(m.selfRecords||[]).slice(0,5);
  const aiLimit = useAILimit(m.id);
  const features=[
    {ic:"🍽️",title:"식단 AI 코칭",desc:"기록된 식단을 분석해서 목표에 맞는 피드백을 드려요"},
    {ic:"💪",title:"운동 처방 AI",desc:"PT일지의 운동 종목·중량·세트를 분석해 홈트레이닝을 추천해드려요"},
    {ic:"📊",title:"체성분 변화 분석",desc:"체중·체지방 데이터로 변화 추이와 앞으로의 예측을 알려드려요"},
    {ic:"😴",title:"컨디션 패턴 분석",desc:"매일 기록된 컨디션·식사·운동 패턴으로 내 몸의 리듬을 파악해요"},
  ];
  return(
    <div style={{padding:16,fontFamily:SF}}>
      {/* 카르보넨 계산기 — 즉시 사용 가능 */}
      <KarvonenCalc m={m} data={data} onSave={onSave}/>

      {/* AI 기능 예고 */}
      <div style={{background:BLACK,borderRadius:16,padding:"20px",marginBottom:14,color:WHITE,boxShadow:CARD_SH}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>준비 중</div>
          <AILimitBadge remaining={aiLimit.remaining}/>
        </div>
        <div style={{fontSize:20,fontWeight:600,letterSpacing:"-0.3px",lineHeight:1.19,marginBottom:8}}>AI 코칭 기능</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>베타 테스트가 끝나면 식단·운동·체성분 데이터를 분석해서 맞춤 코칭을 제공해요.</div>
        {!aiLimit.canUse&&<div style={{marginTop:10,fontSize:12,color:`${RED}`,background:`${RED}15`,borderRadius:8,padding:"8px 12px"}}>오늘 AI 사용 한도(5회)를 모두 사용했어요. 내일 다시 이용 가능해요.</div>}
      </div>
      {features.map((f,i)=>(
        <Card key={i} sx={{marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:26,width:46,height:46,background:LGRAY,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{f.ic}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <div style={{fontSize:14,fontWeight:600,color:NBLACK,letterSpacing:"-0.2px"}}>{f.title}</div>
                <span style={{background:LGRAY,color:T48,fontSize:10,padding:"2px 8px",borderRadius:980}}>🔒 베타 후</span>
              </div>
              <div style={{fontSize:13,color:T48,lineHeight:1.5}}>{f.desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── 회원가입 ──────────────────────────────────────────────────────────────────
const ACTIVITIES=["거의없음","가벼운활동","보통","활동적","매우활동적"];
const GOALS=["다이어트","근력증진","통증해결"];
const FREQS=["0회","1~2회","3~4회","5회이상"];

function MemberSignup({data,onSave,onBack,onDone}){
  const [step,setStep]=useState(1);
  const [f,setF]=useState({name:"",pin:"",pin2:"",gender:"",age:"",height:"",weight:"",targetWeight:"",goal:"",activity:"",frequency:"",calories:"",trainerId:"",painAreas:[],menstrualCycle:false});
  const [err,setErr]=useState("");
  const calcBMR=()=>{
    if(!f.gender||!f.age||!f.height||!f.weight||!f.activity||!f.goal){setErr("모든 항목을 입력해주세요");return;}
    const cal=calcCalories(f.gender,+f.age,+f.height,+f.weight,f.activity,f.goal);
    setF(p=>({...p,calories:String(cal)}));setErr("");
  };
  const approvedTrainers=(data.trainers||[]).filter(t=>t.approved!==false);
  const submit=()=>{
    if(!f.name||!f.pin)return setErr("이름과 PIN을 입력하세요");
    if(f.pin!==f.pin2)return setErr("PIN이 일치하지 않습니다");
    if(f.pin.length!==4)return setErr("PIN은 4자리여야 합니다");
    if(data.members.find(x=>x.name===f.name))return setErr("이미 존재하는 이름입니다");
    const nm={
      id:`m${Date.now()}`,name:f.name,pin:f.pin,
      trainerId:f.trainerId||null,
      profile:{
        gender:f.gender,age:+f.age,height:+f.height,weight:+f.weight,
        targetWeight:+f.targetWeight,startWeight:+f.weight,
        startDate:new Date().toISOString().slice(0,10),
        bodyFat:0,heartRate:0,
        goal:f.goal,activityLevel:f.activity,workoutFrequency:f.frequency,
        targetCalories:+f.calories||2000,
        consultation:"",menstrualCycle:f.menstrualCycle,whyAnalysis:"",
        painAreas:f.goal==="통증해결"?f.painAreas:[],
      },
      ptLogs:[],selfRecords:[],messages:[],reservations:[],reviewPoints:[],
      points:0,unreadMessages:0,unreadFeedback:0,expiryDate:"",
    };
    onSave({...data,members:[...data.members,nm]});onDone();
  };
  const SelectRow=({label,opts,val,onSel})=>(
    <div style={{marginBottom:18}}>
      <div style={{fontSize:12,color:T48,marginBottom:8,fontFamily:SF}}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {opts.map(o=><button key={o} onClick={()=>onSel(o)} style={{padding:"8px 16px",borderRadius:980,fontSize:14,fontFamily:SF,cursor:"pointer",border:`1px solid ${val===o?ABLUE:"#d2d2d7"}`,background:val===o?ABLUE:WHITE,color:val===o?WHITE:NBLACK,fontWeight:val===o?600:400,transition:"all 0.15s"}}>{o}</button>)}
      </div>
    </div>
  );
  return(
    <div style={{minHeight:"100vh",background:LGRAY,fontFamily:SF}}>
      <nav style={navStyle}>
        <button onClick={onBack} style={{background:"none",border:"none",color:WHITE,fontSize:22,cursor:"pointer",padding:0}}>‹</button>
        <span style={{color:WHITE,fontSize:15,fontWeight:600}}>회원 가입</span>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>{step}/3</div>
      </nav>
      <div style={{padding:"32px 20px",maxWidth:480,margin:"0 auto"}}>
        {step===1&&<>
          <div style={{fontSize:28,fontWeight:600,color:NBLACK,letterSpacing:"-0.5px",marginBottom:24}}>기본 정보</div>
          <Card>
            <Inp label="이름" value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))} placeholder="실명 입력"/>
            <Inp label="PIN 4자리" value={f.pin} onChange={e=>setF(p=>({...p,pin:e.target.value}))} placeholder="●●●●" type="password" maxLength={4}/>
            <Inp label="PIN 확인" value={f.pin2} onChange={e=>setF(p=>({...p,pin2:e.target.value}))} placeholder="●●●●" type="password" maxLength={4}/>
            <div style={{display:"flex",gap:12,marginBottom:14}}>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:T48,marginBottom:6}}>성별</div>
                <div style={{display:"flex",gap:8}}>{["남","여"].map(g=><button key={g} onClick={()=>setF(p=>({...p,gender:g}))} style={{flex:1,padding:"11px",borderRadius:8,border:`1px solid ${f.gender===g?ABLUE:"#d2d2d7"}`,background:f.gender===g?ABLUE:WHITE,color:f.gender===g?WHITE:NBLACK,fontSize:15,cursor:"pointer",fontFamily:SF}}>{g}</button>)}</div>
              </div>
              <div style={{flex:1}}><Inp label="나이" value={f.age} onChange={e=>setF(p=>({...p,age:e.target.value}))} placeholder="만 나이" type="number"/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Inp label="키 (cm)" value={f.height} onChange={e=>setF(p=>({...p,height:e.target.value}))} placeholder="cm" type="number"/>
              <Inp label="체중 (kg)" value={f.weight} onChange={e=>setF(p=>({...p,weight:e.target.value}))} placeholder="kg" type="number"/>
            </div>
            {f.goal==="다이어트"||!f.goal?(
              <Inp label="목표 체중 (kg)" value={f.targetWeight} onChange={e=>setF(p=>({...p,targetWeight:e.target.value}))} placeholder="kg (다이어트 목표 시 필수)" type="number"/>
            ):(
              <Inp label="목표 체중 (kg)" value={f.targetWeight} onChange={e=>setF(p=>({...p,targetWeight:e.target.value}))} placeholder="kg (선택사항)" type="number"/>
            )}
            {err&&<div style={{color:RED,fontSize:13,marginBottom:12}}>{err}</div>}
            <Btn ch="다음" full onClick={()=>{
              if(!f.name||!f.pin||!f.pin2||!f.gender||!f.age||!f.height||!f.weight)return setErr("모든 항목을 입력해주세요");
              if(f.goal==="다이어트"&&!f.targetWeight)return setErr("다이어트 목표는 목표 체중을 입력해주세요");
              if(f.pin!==f.pin2)return setErr("PIN이 일치하지 않습니다");
              if(f.pin.length!==4)return setErr("PIN은 4자리여야 합니다");
              if(data.members.find(x=>x.name===f.name))return setErr("이미 존재하는 이름입니다");
              setErr("");setStep(2);
            }}/>
          </Card>
        </>}
        {step===2&&<>
          <div style={{fontSize:28,fontWeight:600,color:NBLACK,letterSpacing:"-0.5px",marginBottom:24}}>운동 정보</div>
          <Card>
            <SelectRow label="운동 목표" opts={GOALS} val={f.goal} onSel={v=>setF(p=>({...p,goal:v}))}/>
            <SelectRow label="평소 활동량" opts={ACTIVITIES} val={f.activity} onSel={v=>setF(p=>({...p,activity:v}))}/>
            <SelectRow label="주간 운동 빈도" opts={FREQS} val={f.frequency} onSel={v=>setF(p=>({...p,frequency:v}))}/>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:T48,marginBottom:6}}>하루 목표 칼로리</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={f.calories} onChange={e=>setF(p=>({...p,calories:e.target.value}))} placeholder="직접 입력 또는 자동 계산" type="number" style={{flex:1,padding:"13px 15px",borderRadius:12,border:"1px solid rgba(0,0,0,0.1)",fontSize:16,color:NBLACK,background:WHITE,outline:"none",boxSizing:"border-box",fontFamily:SF}}/>
                <button onClick={calcBMR} style={{background:NBLACK,color:WHITE,border:"none",borderRadius:10,padding:"13px 14px",fontSize:13,cursor:"pointer",fontFamily:SF,whiteSpace:"nowrap",fontWeight:500}}>자동 계산</button>
              </div>
              {f.calories&&<div style={{fontSize:12,color:T48,marginTop:6}}>하루 목표: {f.calories} kcal</div>}
            </div>
            {/* 여성 회원 생리주기 */}
            {f.gender==="여"&&(
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:T48,marginBottom:8}}>생리주기 고려 프로그램 적용</div>
                <div style={{display:"flex",gap:8}}>
                  {["예","아니요"].map(v=>(
                    <button key={v} onClick={()=>setF(p=>({...p,menstrualCycle:v==="예"}))} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${(f.menstrualCycle&&v==="예")||(!f.menstrualCycle&&v==="아니요")?ABLUE:"rgba(0,0,0,0.1)"}`,background:(f.menstrualCycle&&v==="예")||(!f.menstrualCycle&&v==="아니요")?ABLUE:WHITE,color:(f.menstrualCycle&&v==="예")||(!f.menstrualCycle&&v==="아니요")?WHITE:NBLACK,fontSize:14,cursor:"pointer",fontFamily:SF}}>{v}</button>
                  ))}
                </div>
              </div>
            )}
            {err&&<div style={{color:RED,fontSize:13,marginBottom:12}}>{err}</div>}
            <div style={{display:"flex",gap:8}}>
              <Btn ch="이전" v="ghost" onClick={()=>setStep(1)} sx={{flex:1}}/>
              <Btn ch="다음" onClick={()=>{if(!f.goal||!f.activity||!f.frequency||!f.calories)return setErr("모든 항목을 입력해주세요");setErr("");setStep(3);}} dis={!f.goal||!f.activity||!f.frequency||!f.calories} sx={{flex:2}}/>
            </div>
          </Card>
        </>}
        {step===3&&<>
          <div style={{fontSize:28,fontWeight:600,color:NBLACK,letterSpacing:"-0.5px",marginBottom:4}}>마지막 단계</div>
          <div style={{fontSize:14,color:T48,marginBottom:24,lineHeight:1.6}}>트레이너를 선택하고{f.goal==="통증해결"?" 통증 부위를 알려주세요":""}.</div>
          <Card>
            {/* 트레이너 선택 */}
            <div style={{fontSize:12,color:T48,marginBottom:8,fontWeight:500}}>담당 트레이너 선택</div>
            {approvedTrainers.length>0?(
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                {approvedTrainers.map(t=>(
                  <button key={t.id} onClick={()=>setF(p=>({...p,trainerId:t.id}))} style={{
                    padding:"14px 16px",borderRadius:12,
                    border:`1.5px solid ${f.trainerId===t.id?ABLUE:"rgba(0,0,0,0.08)"}`,
                    background:f.trainerId===t.id?`${ABLUE}08`:WHITE,
                    cursor:"pointer",textAlign:"left",fontFamily:SF,
                  }}>
                    <div style={{fontSize:15,fontWeight:600,color:f.trainerId===t.id?ABLUE:NBLACK}}>{t.name}</div>
                    {t.specialty&&<div style={{fontSize:12,color:T48,marginTop:2}}>{t.specialty}</div>}
                  </button>
                ))}
                <button onClick={()=>setF(p=>({...p,trainerId:""}))} style={{
                  padding:"12px 16px",borderRadius:12,
                  border:`1px solid ${!f.trainerId?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.06)"}`,
                  background:!f.trainerId?LGRAY:WHITE,
                  cursor:"pointer",textAlign:"left",fontFamily:SF,
                  fontSize:14,color:T48,
                }}>나중에 선택할게요</button>
              </div>
            ):(
              <div style={{fontSize:14,color:T48,marginBottom:16,padding:"12px",background:LGRAY,borderRadius:10}}>아직 등록된 트레이너가 없어요. 나중에 연결할 수 있어요.</div>
            )}

            {/* 통증 부위 (통증해결 목표인 경우) */}
            {f.goal==="통증해결"&&(
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,color:T48,marginBottom:8,fontWeight:500}}>주요 통증 부위 (복수 선택)</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {PAIN_AREAS.map(a=>(
                    <button key={a} onClick={()=>setF(p=>({...p,painAreas:p.painAreas.includes(a)?p.painAreas.filter(x=>x!==a):[...p.painAreas,a]}))} style={{
                      padding:"7px 14px",borderRadius:980,fontSize:13,fontFamily:SF,cursor:"pointer",
                      background:f.painAreas.includes(a)?RED:WHITE,
                      color:f.painAreas.includes(a)?WHITE:T48,
                      border:`1px solid ${f.painAreas.includes(a)?RED:"rgba(0,0,0,0.1)"}`,
                      fontWeight:f.painAreas.includes(a)?600:400,
                    }}>{a}</button>
                  ))}
                </div>
              </div>
            )}

            {err&&<div style={{color:RED,fontSize:13,marginBottom:12}}>{err}</div>}
            <div style={{display:"flex",gap:8}}>
              <Btn ch="이전" v="ghost" onClick={()=>setStep(2)} sx={{flex:1}}/>
              <Btn ch="가입 완료 🎉" onClick={submit} sx={{flex:2}}/>
            </div>
          </Card>
        </>}
      </div>
    </div>
  );
}

function TrainerSignup({data,onSave,onBack,onDone}){
  const [f,setF]=useState({name:"",pin:"",pin2:"",specialty:""});
  const [err,setErr]=useState("");
  const submit=()=>{
    if(!f.name||!f.pin)return setErr("이름과 PIN을 입력하세요");
    if(f.pin!==f.pin2)return setErr("PIN이 일치하지 않습니다");
    if(f.pin.length!==4)return setErr("PIN은 4자리여야 합니다");
    const all=[...(data.trainers||[]),...(data.pendingTrainers||[])];
    if(all.find(x=>x.name===f.name))return setErr("이미 존재하는 이름입니다");
    const nt={id:`t${Date.now()}`,name:f.name,pin:f.pin,specialty:f.specialty,approved:false,appliedAt:new Date().toISOString().slice(0,10)};
    onSave({...data,pendingTrainers:[...(data.pendingTrainers||[]),nt]});onDone();
  };
  return(
    <div style={{minHeight:"100vh",background:LGRAY,fontFamily:SF}}>
      <nav style={navStyle}>
        <button onClick={onBack} style={{background:"none",border:"none",color:WHITE,fontSize:22,cursor:"pointer",padding:0}}>‹</button>
        <span style={{color:WHITE,fontSize:15,fontWeight:600}}>전문가 신청</span>
        <div style={{width:24}}/>
      </nav>
      <div style={{padding:"32px 20px",maxWidth:480,margin:"0 auto"}}>
        <div style={{fontSize:28,fontWeight:600,color:NBLACK,letterSpacing:"-0.5px",marginBottom:8}}>전문가 가입 신청</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${AMBER}15`,borderRadius:980,padding:"6px 14px",marginBottom:24}}>
          <span style={{fontSize:12,color:AMBER}}>⏳ 승인 대기 후 이용 가능</span>
        </div>
        <Card>
          <Inp label="이름" value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))} placeholder="실명 입력"/>
          <Inp label="PIN 4자리" value={f.pin} onChange={e=>setF(p=>({...p,pin:e.target.value}))} placeholder="●●●●" type="password" maxLength={4}/>
          <Inp label="PIN 확인" value={f.pin2} onChange={e=>setF(p=>({...p,pin2:e.target.value}))} placeholder="●●●●" type="password" maxLength={4}/>
          <Inp label="전문 분야 (선택)" value={f.specialty} onChange={e=>setF(p=>({...p,specialty:e.target.value}))} placeholder="예) 다이어트, 근력 강화"/>
          {err&&<div style={{color:RED,fontSize:13,marginBottom:12}}>{err}</div>}
          <Btn ch="신청하기" full onClick={submit} dis={!f.name||!f.pin||!f.pin2}/>
        </Card>
      </div>
    </div>
  );
}

function SignupDone({msg,onBack}){
  return(
    <div style={{minHeight:"100vh",background:BLACK,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:SF,padding:32,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:24}}>✓</div>
      <div style={{fontSize:28,fontWeight:600,color:WHITE,lineHeight:1.07,letterSpacing:"-0.5px",marginBottom:12}}>{msg}</div>
      <div style={{fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.47,marginBottom:36}}>{msg.includes("신청")?"관리자 승인 후 로그인할 수 있어요":"로그인 화면에서 접속하세요"}</div>
      <button onClick={onBack} style={{background:ABLUE,color:WHITE,border:"none",borderRadius:980,padding:"11px 28px",fontSize:17,cursor:"pointer",fontFamily:SF}}>로그인하기</button>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function App() {
  const [scr,setScr]=useState("landing");
  const [data,setData]=useState(null);
  const [user,setUser]=useState(null);
  const [utype,setUtype]=useState(null);
  const [init,setInit]=useState(true);

  useEffect(()=>{(async()=>{
    const s=await store.get("snobble_v3");
    // snobble_v3 키 사용 - 이전 캐시 완전 무시
    // 저장된 데이터가 있고 버전이 맞으면 사용, 아니면 INIT
    const d = (s && s._v === INIT._v) ? s : JSON.parse(JSON.stringify(INIT));
    if(!d.pendingTrainers)d.pendingTrainers=[];
    if(!d.archivedMembers)d.archivedMembers=[];
    d.trainers=d.trainers.map(t=>({...t,approved:t.approved!==false}));
    d.members=d.members.map(m=>({...m,expiryDate:m.expiryDate||"",
      profile:{...m.profile,goal:m.profile?.goal||"다이어트"}}));
    setData(d);setInit(false);
  })();},[]);

  const save=async(nd)=>{
    setData(nd);await store.set("snobble_v3",nd);
    if(user&&utype==="member"){const up=nd.members.find(x=>x.id===user.id);if(up)setUser(up);}
  };
  const login=(u,t)=>{setUser(u);setUtype(t);setScr("app");};
  const logout=()=>{setUser(null);setUtype(null);setScr("landing");};

  if(init)return(<div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:BLACK}}><Logo sz={80}/></div>);
  if(scr==="landing")return <Landing onM={()=>setScr("ml")} onT={()=>setScr("tl")} onMS={()=>setScr("ms")} onTS={()=>setScr("ts")}/>;
  if(scr==="ml")return <LoginScreen type="member" data={data} onLogin={u=>login(u,"member")} onBack={()=>setScr("landing")}/>;
  if(scr==="tl")return <LoginScreen type="trainer" data={data} onLogin={u=>login(u,"trainer")} onBack={()=>setScr("landing")}/>;
  if(scr==="ms")return <MemberSignup data={data} onSave={save} onBack={()=>setScr("landing")} onDone={()=>setScr("ms-done")}/>;
  if(scr==="ts")return <TrainerSignup data={data} onSave={save} onBack={()=>setScr("landing")} onDone={()=>setScr("ts-done")}/>;
  if(scr==="ms-done")return <SignupDone msg="가입 완료!" onBack={()=>setScr("ml")}/>;
  if(scr==="ts-done")return <SignupDone msg="신청 완료!" onBack={()=>setScr("tl")}/>;
  if(scr==="app"&&utype==="member")return <MemberApp member={user} data={data} onSave={save} onLogout={logout}/>;
  if(scr==="app"&&utype==="trainer")return <TrainerApp trainer={user} data={data} onSave={save} onLogout={logout}/>;
  return null;
}
window.App = App;
