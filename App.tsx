import React, { useState } from 'react';
import {
  AlertTriangle,
  Anchor,
  ArrowRight,
  Box,
  CheckCircle2,
  Eye,
  Hammer,
  Heart,
  LayoutTemplate,
  Lightbulb,
  Menu,
  MessageCircle,
  MousePointer2,
  Repeat,
  Search,
  Target,
  Zap,
  X
} from 'lucide-react';

// --- Neo-Brutalist Components ---

const NeoSection: React.FC<{ children?: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id = "" }) => (
  <section id={id} className={`py-16 md:py-24 border-b-4 border-black ${className}`}>
    <div className="max-w-6xl mx-auto px-6">
      {children}
    </div>
  </section>
);

const NeoCard: React.FC<{ children?: React.ReactNode; title?: string; icon?: React.ReactNode; color?: string; className?: string }> = ({ children, title, icon, color = "bg-white", className = "" }) => (
  <div className={`border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 ${color} ${className}`}>
    {(title || icon) && (
      <div className="flex items-center gap-3 mb-4 border-b-4 border-black pb-4">
        {icon && <div className="p-2 bg-black text-white rounded-none">{icon}</div>}
        {title && <h3 className="text-xl md:text-2xl font-black uppercase">{title}</h3>}
      </div>
    )}
    <div className="font-bold leading-relaxed">{children}</div>
  </div>
);

const NeoButton: React.FC<{ children?: React.ReactNode; onClick?: () => void; className?: string; active?: boolean }> = ({ children, onClick, className = "", active = false }) => (
  <button
    onClick={onClick}
    className={`
      font-black px-6 py-3 border-4 border-black text-lg transition-all
      ${active
        ? 'bg-black text-white translate-x-[4px] translate-y-[4px] shadow-none'
        : 'bg-white hover:bg-yellow-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'
      }
      ${className}
    `}
  >
    {children}
  </button>
);

const NeoBadge = ({ text, color = "bg-pink-500 text-white" }: { text: string; color?: string }) => (
  <span className={`inline-block px-3 py-1 text-sm font-black border-2 border-black ${color} mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
    {text}
  </span>
);

// --- Data ---

const templates = [
  {
    id: 1,
    title: "실수 1위 박살",
    desc: "대중의 흔한 실수를 지적하며 권위를 확보하는 구조",
    content: [
      { time: "0~1초", text: "대부분 여기서 망한다. (강한 부정)" },
      { time: "1~6초", text: "겉은 A 문제처럼 보이는데, 진짜는 B다. (원인 재정의)" },
      { time: "6~12초", text: "교정 1개만 해봐. 바로 달라진다. (즉각적 해결)" },
      { time: "12~15초", text: "다음 편은 2위 실수다. (연속성 예고)" },
    ]
  },
  {
    id: 2,
    title: "Before → After 반전",
    desc: "결과를 먼저 보여주고 과정을 역설계하는 구조",
    content: [
      { time: "0~2초", text: "전/후 결과를 먼저 보여라. (시각적 충격)" },
      { time: "2~6초", text: "차이는 원인 1개 (단순화)" },
      { time: "6~12초", text: "구체적 세팅/방법 (정보)" },
      { time: "12~15초", text: "다음 상위 버전 예고 (기대감)" },
    ]
  },
  {
    id: 3,
    title: "금지 / 경고",
    desc: "손실 회피 심리를 자극하는 강력한 훅",
    content: [
      { time: "0~1초", text: "절대 하지 마. (명령조)" },
      { time: "1~6초", text: "부작용 설명 (공포 자극)" },
      { time: "6~12초", text: "대안 제시 (구원)" },
      { time: "12~15초", text: "다음 편은 '해야 하는 것' (양면성)" },
    ]
  },
  {
    id: 4,
    title: "질문 한 방 (미스터리)",
    desc: "호기심을 자극하여 끝까지 보게 만드는 구조",
    content: [
      { time: "0~2초", text: "왜 어떤 사람만 OO 될까? (비교 심리)" },
      { time: "2~8초", text: "오해 깨기 (통념 반박)" },
      { time: "8~13초", text: "원리 + 적용 (인사이트)" },
      { time: "13~15초", text: "다음 질문 예고 (꼬리 물기)" },
    ]
  },
  {
    id: 5,
    title: "시리즈 씨앗",
    desc: "단건 영상을 연속극으로 만드는 엔딩 전략",
    content: [
      { time: "전략 1", text: "'이건 1편이고, 다음 편에서 진짜 핵심을 공개한다.'" },
      { time: "전략 2", text: "'댓글에 키워드 남기면 2편으로 이어간다.' (참여 유도)" },
      { time: "전략 3", text: "'다음 편은 그립 하나로 기록 바뀌는 구조다.' (구체적 예고)" },
    ]
  }
];

// --- Main App ---

const App = () => {
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-black overflow-x-hidden selection:bg-pink-500 selection:text-white">

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-black text-xl md:text-2xl flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <LayoutTemplate className="w-8 h-8 fill-yellow-400" />
            유튜브 컨텐츠 실패이유?
          </div>

          <div className="hidden md:flex gap-4">
            <button onClick={() => scrollTo('intro')} className="font-bold hover:underline hover:text-pink-600">진실</button>
            <button onClick={() => scrollTo('cores')} className="font-bold hover:underline hover:text-pink-600">3가지 마음</button>
            <button onClick={() => scrollTo('funnel')} className="font-bold hover:underline hover:text-pink-600">조회수 물리학</button>
            <button onClick={() => scrollTo('structure')} className="font-bold hover:underline hover:text-pink-600">설계도</button>
            <button onClick={() => scrollTo('templates')} className="font-bold hover:underline hover:text-pink-600">템플릿</button>
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b-4 border-black p-4 flex flex-col gap-4 shadow-xl">
            <button onClick={() => scrollTo('intro')} className="text-left font-bold text-xl py-2 border-b border-gray-200">진실: 당신 잘못이 아니다</button>
            <button onClick={() => scrollTo('cores')} className="text-left font-bold text-xl py-2 border-b border-gray-200">3가지 마음 (A/B/C)</button>
            <button onClick={() => scrollTo('funnel')} className="text-left font-bold text-xl py-2 border-b border-gray-200">조회수의 물리학</button>
            <button onClick={() => scrollTo('structure')} className="text-left font-bold text-xl py-2 border-b border-gray-200">구조 설계</button>
            <button onClick={() => scrollTo('templates')} className="text-left font-bold text-xl py-2">실전 템플릿</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative bg-cyan-400 border-b-4 border-black py-20 px-6 overflow-hidden">
        {/* Decorative Background Patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full border-4 border-black -z-0 opacity-50 md:opacity-100"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-pink-500 transform rotate-45 border-4 border-black -z-0 opacity-50 md:opacity-100"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <NeoBadge text="CONTENT MASTER CLASS" color="bg-black" />
          <h1 className="text-5xl md:text-8xl font-white mb-6 leading-tight drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            컨텐츠가<br />안되는 이유
          </h1>
          <p className="text-xl md:text-3xl font-bold mb-10 bg-white inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            "당신의 실패는 재능 부족이 아니다."
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <NeoButton className="bg-pink-500 text-black" onClick={() => scrollTo('intro')}>
              진짜 이유 확인하기
            </NeoButton>
          </div>
        </div>
      </header>

      {/* Prologue */}
      <NeoSection id="intro" className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">프롤로그:<br />설계의 부재</h2>
            <div className="space-y-4 text-lg">
              <p>밤새 기획하고, 편집하고, 업로드 버튼을 눌렀지만 조회수는 두 자리.</p>
              <p className="font-bold bg-yellow-200 inline-block px-1">"내가 재능이 없나? 운이 없나?"</p>
              <p>아닙니다. 진짜 이유는 단 하나입니다.</p>
              <p className="text-xl font-black border-l-8 border-pink-500 pl-4 py-2 my-4">
                아직 '사람이 반응하는 언어'가 아니라,<br />
                '내가 말하고 싶은 언어'로 만들고 있기 때문입니다.
              </p>
              <p>유튜브는 '좋은 내용'이 아니라 <strong>'사람의 행동'</strong>을 보상합니다. 이 페이지는 당신을 단순한 업로더에서 <strong>콘텐츠 아키텍트</strong>로 바꿔놓을 설계도입니다.</p>
            </div>
          </div>
          <div className="bg-gray-100 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-6 -right-6 bg-yellow-400 border-4 border-black p-2 font-black rotate-12">REALITY CHECK</div>
            <ul className="space-y-4 font-bold text-lg">
              <li className="flex items-center gap-3">
                <X className="text-red-500 w-8 h-8" strokeWidth={4} />
                <span className="line-through decoration-4 decoration-red-500 text-gray-400">유용하면 본다</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="text-red-500 w-8 h-8" strokeWidth={4} />
                <span className="line-through decoration-4 decoration-red-500 text-gray-400">열심히 하면 뜬다</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 w-8 h-8" strokeWidth={4} />
                <span>보고 싶어서 본다</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 w-8 h-8" strokeWidth={4} />
                <span>설계해야 뜬다</span>
              </li>
            </ul>
          </div>
        </div>
      </NeoSection>

      {/* Chapter 1: The 3 Cores */}
      <NeoSection id="cores" className="bg-yellow-400">
        <div className="text-center mb-12">
          <NeoBadge text="CHAPTER 1" />
          <h2 className="text-4xl md:text-5xl font-black">사람들이 영상을 보는<br />3가지 마음 (Core)</h2>
          <p className="mt-4 font-bold text-xl">이걸 모르면 당신은 계속 '작은 섬'에서만 노를 젓게 됩니다.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <NeoCard title="A-CORE: 응급실" icon={<Zap />} color="bg-red-100" className="md:mt-0">
            <div className="text-sm font-bold mb-4 text-red-600">즉시 해결 필요</div>
            <p className="mb-4">"지금 당장 해결하지 않으면 손실 발생."</p>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>재미/감동 필요 없음</li>
              <li>즉시 실행 가능한 해결책</li>
              <li>바이럴보다는 <strong>강력한 신뢰</strong> 구축</li>
            </ul>
            <div className="mt-4 bg-white border-2 border-black p-2 text-xs font-mono">
              Ex. "오늘 보고서 막힘", "광고 세팅 터짐"
            </div>
          </NeoCard>

          <NeoCard title="B-CORE: 헬스장" icon={<Hammer />} color="bg-blue-100" className="md:-mt-4 relative z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 font-bold text-sm border-2 border-white shadow-lg">
              초심자의 함정
            </div>
            <div className="text-sm font-bold mb-4 text-blue-600">더 나아지고 싶음</div>
            <p className="mb-4">"급하진 않지만 성장하고 싶음."</p>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>가성비 (최소 노력 최대 효과)</li>
              <li>꿀팁 3가지, BEST 5</li>
              <li><strong>함정:</strong> 관심 있는 사람만 검색함. 시장이 좁다.</li>
            </ul>
            <div className="mt-4 bg-white border-2 border-black p-2 text-xs font-mono">
              Ex. "살 빼고 싶다", "PPT 잘 만드는 법"
            </div>
          </NeoCard>

          <NeoCard title="C-CORE: 영화관" icon={<Heart />} color="bg-green-100" className="md:mt-0">
            <div className="text-sm font-bold mb-4 text-green-600">감정의 영역</div>
            <p className="mb-4">"관심 없던 대중까지 끌어들임."</p>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              <li>웃음, 분노, 충격, 희망</li>
              <li>정보가 아닌 <strong>감정을 공유</strong></li>
              <li>바이럴은 여기서 발생</li>
            </ul>
            <div className="mt-4 bg-white border-2 border-black p-2 text-xs font-mono">
              Ex. "허리 나가서 3개월 누웠던 썰"
            </div>
          </NeoCard>
        </div>

        <div className="mt-12 bg-black text-white p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <Lightbulb className="text-yellow-400" />
            PRO TIP: 트로이의 목마 전략
          </h3>
          <p className="text-lg">
            "정보(B코어)를 버리지 마세요. <strong>C코어(감정/호기심)로 문을 열고, 그 안에 B코어 정보를 숨기세요.</strong>
            데드리프트 자세(B)를 설명하지 말고, '부상 후 재기한 스토리(C)'로 시작해서 자세 팁을 주세요."
          </p>
        </div>
      </NeoSection>

      {/* Chapter 2: Physics of Views */}
      <NeoSection id="funnel" className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <NeoBadge text="CHAPTER 2" color="bg-cyan-500" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">조회수의 물리학<br />3단계 관문</h2>
            <p className="text-xl mb-6">유튜브는 복잡한 알고리즘이 아닙니다. 사람의 행동 패턴일 뿐입니다.</p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-black text-white p-4 font-black text-2xl border-4 border-yellow-400 w-16 h-16 flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="text-2xl font-black">클릭 (CTR)</h4>
                  <p>영상은 존재하지 않습니다. 패키징(제목/썸네일)만 존재합니다. 설명이 아닌 <strong>약속</strong>을 파세요.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-black text-white p-4 font-black text-2xl border-4 border-yellow-400 w-16 h-16 flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="text-2xl font-black">시청 (Retention)</h4>
                  <p>정보의 양으로 붙잡지 마세요. <strong>"다음 장면을 볼 이유"</strong>(미해결)가 시청자를 붙잡습니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-black text-white p-4 font-black text-2xl border-4 border-yellow-400 w-16 h-16 flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="text-2xl font-black">재방문 (Growth)</h4>
                  <p>만족해서 돌아오는 게 아닙니다. <strong>미해결</strong> 때문에 돌아옵니다. 다음 편에 대한 갈증을 남기세요.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border-4 border-black bg-pink-200 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <MousePointer2 className="w-12 h-12 mx-auto mb-2" />
              <div className="text-2xl font-black">CLICK</div>
              <div className="text-sm font-bold mt-2">입장권</div>
            </div>
            <ArrowRight className="mx-auto w-12 h-12 rotate-90 md:rotate-0" strokeWidth={4} />
            <div className="border-4 border-black bg-purple-200 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <Eye className="w-12 h-12 mx-auto mb-2" />
              <div className="text-2xl font-black">WATCH</div>
              <div className="text-sm font-bold mt-2">생존</div>
            </div>
            <ArrowRight className="mx-auto w-12 h-12 rotate-90 md:rotate-0" strokeWidth={4} />
            <div className="border-4 border-black bg-orange-200 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <Repeat className="w-12 h-12 mx-auto mb-2" />
              <div className="text-2xl font-black">RETURN</div>
              <div className="text-sm font-bold mt-2">성장</div>
            </div>
          </div>
        </div>
      </NeoSection>

      {/* Structure & Techniques */}
      <NeoSection id="structure" className="bg-pink-500 text-white">
        <div className="text-center mb-16">
          <NeoBadge text="CHAPTER 4~6" color="bg-white text-black" />
          <h2 className="text-4xl md:text-6xl font-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">콘텐츠 아키텍처</h2>
          <p className="mt-6 text-xl font-bold bg-black inline-block px-4 py-2 border-2 border-white">
            "당신의 문제는 영상 퀄리티가 아니라 구조적 병목입니다."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Opening */}
          <NeoCard title="첫 3초: 문을 여는 법" color="bg-white text-black" icon={<Anchor className="text-black" />}>
            <p className="mb-4 font-bold text-red-500">❌ "안녕하세요, 오늘 알아볼 것은..." (인사는 독이다)</p>
            <p className="font-bold mb-2">⭕ 3가지 문 여는 법</p>
            <ul className="space-y-2">
              <li className="flex gap-2 items-center"><CheckCircle2 size={16} /> <strong>결과:</strong> "이거 하나로 OO 바뀐다."</li>
              <li className="flex gap-2 items-center"><CheckCircle2 size={16} /> <strong>경고:</strong> "이거 모르면 망한다."</li>
              <li className="flex gap-2 items-center"><CheckCircle2 size={16} /> <strong>질문:</strong> "왜 너만 안 될까?"</li>
            </ul>
          </NeoCard>

          {/* Card 2: Retention */}
          <NeoCard title="리텐션: 미해결 엔진" color="bg-yellow-300 text-black" icon={<Target className="text-black" />}>
            <p className="mb-4">사람은 설명이 아니라 '오픈루프(Open Loop)'에 묶입니다.</p>
            <div className="bg-black text-white p-4 font-mono text-sm border-2 border-white mb-4">
              <span className="text-yellow-400">0~1초:</span> 훅 (경고)<br />
              <span className="text-yellow-400">1~6초:</span> 오해 깨기 (혼란)<br />
              <span className="text-yellow-400">6~12초:</span> 해결 + 더 큰 그림자<br />
              <span className="text-yellow-400">12~15초:</span> 다음 편 약속
            </div>
            <p className="font-bold text-center">"끝나지 않은 질문을 던지세요."</p>
          </NeoCard>

          {/* Card 3: Twist */}
          <NeoCard title="반전과 변수" color="bg-cyan-300 text-black" icon={<AlertTriangle className="text-black" />}>
            <p className="mb-4">너무 매끄러운 영상은 죽습니다. 변수를 심으세요.</p>
            <ul className="space-y-3 font-bold">
              <li className="bg-white border-2 border-black p-2 shadow-sm">1. 오해 깨기: "다들 A라는데 사실 B다."</li>
              <li className="bg-white border-2 border-black p-2 shadow-sm">2. 규칙 추가: "근데 조건이 있다."</li>
              <li className="bg-white border-2 border-black p-2 shadow-sm">3. 대가 반전: "효과는 큰데 부작용이 있다."</li>
            </ul>
          </NeoCard>

          {/* Card 4: Packaging */}
          <NeoCard title="패키징: 약속의 기술" color="bg-purple-300 text-black" icon={<Box className="text-black" />}>
            <p className="mb-4">제목과 썸네일은 설명이 아닙니다. <span className="bg-yellow-400 px-1 border border-black">약속</span>입니다.</p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="bg-white border-2 border-black p-2">
                <span className="block font-bold text-gray-500 text-xs">BAD (설명)</span>
                "데드리프트 자세 가이드"
              </div>
              <div className="bg-white border-2 border-black p-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 font-bold">GOOD</div>
                <span className="block font-bold text-pink-600 text-xs">GOOD (약속-미스터리)</span>
                "왜 너만 허리가 나갈까?"
              </div>
            </div>
          </NeoCard>
        </div>
      </NeoSection>

      {/* Templates Section */}
      <NeoSection id="templates" className="bg-yellow-50">
        <div className="mb-10 text-center">
          <NeoBadge text="APPENDIX" color="bg-black" />
          <h2 className="text-4xl md:text-5xl font-black">초심자용 콘텐츠 공장<br />템플릿 10개 중 BEST 5</h2>
          <p className="mt-4">"형태가 있으면 매번 0에서 시작하지 않습니다. 복사해서 쓰세요."</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Template Selector */}
          <div className="flex flex-col gap-3 md:w-1/3">
            {templates.map((t) => (
              <NeoButton
                key={t.id}
                onClick={() => setActiveTemplate(t)}
                active={activeTemplate.id === t.id}
                className="text-left flex justify-between items-center group"
              >
                <span>{t.id}. {t.title}</span>
                <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeTemplate.id === t.id ? 'opacity-100' : ''}`} />
              </NeoButton>
            ))}
            <div className="mt-4 p-4 border-2 border-dashed border-black bg-gray-100 text-sm font-bold text-gray-500 text-center">
              + 5 More Templates in the Full Guide
            </div>
          </div>

          {/* Template Content */}
          <div className="md:w-2/3">
            <NeoCard className="h-full bg-white relative">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white font-black px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
                COPY THIS
              </div>
              <h3 className="text-3xl font-black mb-2">{activeTemplate.title}</h3>
              <p className="text-gray-600 font-bold mb-8 border-b-2 border-black pb-4">{activeTemplate.desc}</p>

              <div className="space-y-4">
                {activeTemplate.content.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="bg-black text-white px-2 py-1 font-mono font-bold text-sm shrink-0 mt-1">
                      {item.time}
                    </div>
                    <div className="text-lg font-bold bg-yellow-100 px-3 py-1 border border-black w-full">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gray-100 p-4 border-2 border-black flex gap-2 items-start">
                <Lightbulb className="shrink-0 text-yellow-500 fill-yellow-500" />
                <p className="text-sm font-bold">
                  Tip: 멘트 토씨 하나보다는 <strong>구조(흐름)</strong>를 가져가세요.
                  자신의 주제에 맞춰 단어만 바꿔끼우면 됩니다.
                </p>
              </div>
            </NeoCard>
          </div>
        </div>
      </NeoSection>

      {/* Epilogue */}
      <footer className="bg-black text-white py-20 px-6 border-t-4 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <LayoutTemplate className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-4xl md:text-6xl font-black mb-6">당신은 이제<br />설계자입니다.</h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              조회수는 운이 아닙니다.<br />
              당신이 설계한 <span className="text-yellow-400 font-bold underline decoration-4 underline-offset-4">구조의 결과</span>입니다.
            </p>
          </div>

          <div className="bg-gray-800 p-8 border-2 border-white max-w-xl mx-auto transform hover:-rotate-1 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-4 text-pink-400 uppercase">One Last Action</h3>
            <p className="mb-6 font-bold">"지금 바로 당신의 지난 영상을 꺼내보세요. 어느 관문(클릭/시청/재방문)이 막혀있는지 진단하고, 딱 하나만 고쳐보세요."</p>
            <button className="bg-white text-black font-black px-8 py-4 text-xl hover:bg-yellow-400 transition-colors w-full border-4 border-transparent hover:border-black">
              내 채널 진단하러 가기
            </button>
          </div>

          <div className="mt-16 text-gray-500 font-mono text-sm">
            © 2025 유튜브 컨텐츠 실패이유?. All Rights Reserved.<br />
            Designed with Neo-Brutalism Principles.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;