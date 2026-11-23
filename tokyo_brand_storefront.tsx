import React, { useEffect, useRef, useState } from 'react';

const RAKUTEN_STORE_URL = 'https://search.rakuten.co.jp/search/mall/?sid=269252';
const CHRONO24_STORE_URL = 'https://www.chrono24.com/search/index.htm?query=Tokyo+Brand&dosearch=true';

const RAKUTEN_WATCHES = [
  {
    id: 'hermes-white',
    brand: 'HERMÈS｜エルメス',
    title: '【中古】【3年保証】エルメス ホワイトダイヤル レザーウォッチ',
    shortTitle: 'エルメス ホワイトダイヤル レザーウォッチ',
    priceText: '308,000円',
    badgeRight: '14,000ポイント',
    condition: '中古・非常に良い',
    tier: 'tier1',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%82%A8%E3%83%AB%E3%83%A1%E3%82%B9+%E6%99%82%E8%A8%88/?sid=269252',
    svgType: 'hermes',
  },
  {
    id: 'cartier-tank',
    brand: 'CARTIER｜カルティエ',
    title: '【中古】【3年保証】カルティエ タンクフランセーズ',
    shortTitle: 'カルティエ タンクフランセーズ',
    priceText: '453,000円',
    badgeRight: '4,118ポイント',
    condition: '中古・非常に良い',
    tier: 'tier1',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%82%AB%E3%83%AB%E3%83%86%E3%82%A3%E3%82%A8+%E3%82%BF%E3%83%B3%E3%82%AF/?sid=269252',
    svgType: 'tank',
  },
  {
    id: 'cartier-roadster',
    brand: 'CARTIER｜カルティエ',
    title: '【中古】【3年保証】カルティエ ロードスター シルバー',
    shortTitle: 'カルティエ ロードスター シルバー',
    priceText: '579,000円',
    badgeRight: '5,263ポイント',
    condition: '中古・ほぼ新品',
    tier: 'tier1',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%82%AB%E3%83%AB%E3%83%86%E3%82%A3%E3%82%A8/?sid=269252',
    svgType: 'roadster',
  },
  {
    id: 'chanel-j12',
    brand: 'CHANEL｜シャネル',
    title: '【中古】【3年保証】シャネル J12 ブラックセラミック ダイヤベゼル',
    shortTitle: 'シャネル J12 ブラックセラミック ダイヤベゼル',
    priceText: '820,000円',
    badgeRight: '7,454ポイント',
    condition: '中古・未使用品',
    tier: 'tier2',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%82%B7%E3%83%A3%E3%83%8D%E3%83%AB+J12/?sid=269252',
    svgType: 'j12black',
  },
  {
    id: 'tudor-chrono',
    brand: 'TUDOR｜チューダー',
    title: '【中古】【3年保証】チューダー ブラッククロノグラフ',
    shortTitle: 'チューダー ブラッククロノグラフ',
    priceText: '1,018,000円',
    badgeRight: '9,254ポイント',
    condition: '中古・ほぼ新品',
    tier: 'tier2',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%83%81%E3%83%A5%E3%83%BC%E3%83%80%E3%83%BC/?sid=269252',
    svgType: 'tudor',
  },
  {
    id: 'bvlgari-diagono-chrono',
    brand: 'BVLGARI｜ブルガリ',
    title: '【中古】【3年保証】ブルガリ ディアゴノ スクーバ ゴールド クロノグラフ',
    shortTitle: 'ブルガリ ディアゴノ スクーバ ゴールド クロノグラフ',
    priceText: '2,250,000円',
    badgeRight: '20,454ポイント',
    condition: '中古・非常に良い',
    tier: 'tier3',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%83%96%E3%83%AB%E3%82%AC%E3%83%AA/?sid=269252',
    svgType: 'diagonoChrono',
  },
  {
    id: 'bvlgari-gold',
    brand: 'BVLGARI｜ブルガリ',
    title: '【中古】【3年保証】ブルガリ ブルガリブルガリ 18Kイエローゴールド',
    shortTitle: 'ブルガリ ブルガリブルガリ 18Kイエローゴールド',
    priceText: '2,910,000円',
    badgeRight: '26,454ポイント',
    condition: '中古・非常に良い',
    tier: 'tier3',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%83%96%E3%83%AB%E3%82%AC%E3%83%AA/?sid=269252',
    svgType: 'bvlgariGold',
  },
  {
    id: 'bvlgari-scuba-gold',
    brand: 'BVLGARI｜ブルガリ',
    title: '【中古】【3年保証】ブルガリ ディアゴノ スクーバ 18Kゴールド',
    shortTitle: 'ブルガリ ディアゴノ スクーバ 18Kゴールド',
    priceText: '3,878,000円',
    badgeRight: '35,254ポイント',
    condition: '中古・ほぼ新品',
    tier: 'tier3',
    url: 'https://search.rakuten.co.jp/search/mall/%E3%83%96%E3%83%AB%E3%82%AC%E3%83%AA/?sid=269252',
    svgType: 'scubaGold',
  },
];

const CHRONO24_WATCHES = [
  {
    id: 'c24-chanel-j12-white',
    brand: 'CHANEL • REF. H0968',
    title: 'Chanel J12 33mm White High-Tech Ceramic Quartz',
    shortTitle: 'Chanel J12 H0968 White Ceramic ($2,768)',
    priceText: '$2,768',
    badgeRight: 'Free shipping',
    condition: 'Very Good',
    tier: 'tier1',
    url: 'https://www.chrono24.com/search/index.htm?query=Chanel+H0968+Tokyo+Brand&dosearch=true',
    svgType: 'j12white',
  },
  {
    id: 'c24-hermes-silver',
    brand: 'HERMÈS • PARIS',
    title: 'Hermès Silver Dial Guilloché White Leather Strap',
    shortTitle: 'Hermès Silver Dial White Leather ($2,150)',
    priceText: '$2,150',
    badgeRight: 'Free shipping',
    condition: 'Very Good',
    tier: 'tier1',
    url: 'https://www.chrono24.com/search/index.htm?query=Hermes+Tokyo+Brand&dosearch=true',
    svgType: 'hermes',
  },
  {
    id: 'c24-cartier-tank',
    brand: 'CARTIER • TANK',
    title: 'Cartier Tank Française Stainless Steel Roman Dial',
    shortTitle: 'Cartier Tank Française Steel ($3,180)',
    priceText: '$3,180',
    badgeRight: 'Free shipping',
    condition: 'Very Good',
    tier: 'tier1',
    url: 'https://www.chrono24.com/search/index.htm?query=Cartier+Tank+Tokyo+Brand&dosearch=true',
    svgType: 'tank',
  },
  {
    id: 'c24-cartier-roadster',
    brand: 'CARTIER • ROADSTER',
    title: 'Cartier Roadster Automatic Silver Roman Dial',
    shortTitle: 'Cartier Roadster Automatic ($4,050)',
    priceText: '$4,050',
    badgeRight: 'Free shipping',
    condition: 'Like New',
    tier: 'tier2',
    url: 'https://www.chrono24.com/search/index.htm?query=Cartier+Roadster+Tokyo+Brand&dosearch=true',
    svgType: 'roadster',
  },
  {
    id: 'c24-chanel-j12-black',
    brand: 'CHANEL • J12 DIAMOND',
    title: 'Chanel J12 Black Ceramic Factory Diamond Bezel',
    shortTitle: 'Chanel J12 Black Diamond Bezel ($5,750)',
    priceText: '$5,750',
    badgeRight: 'Free shipping',
    condition: 'Unworn',
    tier: 'tier2',
    url: 'https://www.chrono24.com/search/index.htm?query=Chanel+J12+Diamond+Tokyo+Brand&dosearch=true',
    svgType: 'j12black',
  },
  {
    id: 'c24-tudor-chrono',
    brand: 'TUDOR • CHRONOGRAPH',
    title: 'Tudor Fastrider Black Shield Ceramic Chronograph',
    shortTitle: 'Tudor Black Shield Chronograph ($6,980)',
    priceText: '$6,980',
    badgeRight: 'Free shipping',
    condition: 'Mint',
    tier: 'tier2',
    url: 'https://www.chrono24.com/search/index.htm?query=Tudor+Tokyo+Brand&dosearch=true',
    svgType: 'tudor',
  },
  {
    id: 'c24-chanel-boyfriend',
    brand: 'CHANEL • REF. H4315',
    title: 'Chanel Boyfriend 18K Beige Gold Diamond Bezel',
    shortTitle: 'Chanel Boyfriend H4315 18K Diamond ($16,247)',
    priceText: '$16,247',
    badgeRight: 'Free shipping',
    condition: 'Very Good',
    tier: 'tier3',
    url: 'https://www.chrono24.com/search/index.htm?query=Chanel+H4315+Tokyo+Brand&dosearch=true',
    svgType: 'boyfriend',
  },
  {
    id: 'c24-bvlgari-gold',
    brand: 'BVLGARI • 18K GOLD',
    title: 'Bvlgari Bvlgari 18K Yellow Gold Black Dial Bracelet',
    shortTitle: 'Bvlgari Bvlgari 18K Yellow Gold ($19,800)',
    priceText: '$19,800',
    badgeRight: 'Free shipping',
    condition: 'Very Good',
    tier: 'tier3',
    url: 'https://www.chrono24.com/search/index.htm?query=Bvlgari+18K+Tokyo+Brand&dosearch=true',
    svgType: 'bvlgariGold',
  },
];

function WatchArtwork({ type, className = 'w-32 h-32 sm:w-36 sm:h-36 mx-auto' }) {
  switch (type) {
    case 'boyfriend':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="28" rx="3" fill="#E6C25A" stroke="#9A7B2C" />
          <rect x="60" y="126" width="40" height="28" rx="3" fill="#E6C25A" stroke="#9A7B2C" />
          <polygon
            points="62,34 98,34 110,46 110,114 98,126 62,126 50,114 50,46"
            fill="#E6C25A"
            stroke="#F3E5AB"
            strokeWidth="1.5"
          />
          <polygon
            points="68,43 92,43 101,52 101,108 92,117 68,117 59,108 59,52"
            fill="#FAFAFA"
          />
          <line x1="80" y1="80" x2="80" y2="62" stroke="#9A7B2C" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="94" y2="73" stroke="#9A7B2C" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'j12white':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="32" rx="3" fill="#F3F4F6" stroke="#D1D5DB" />
          <rect x="60" y="122" width="40" height="32" rx="3" fill="#F3F4F6" stroke="#D1D5DB" />
          <circle cx="80" cy="80" r="44" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2.5" />
          <circle cx="80" cy="80" r="34" fill="#FAFAFA" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="80" y1="80" x2="80" y2="58" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="98" y2="80" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'hermes':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="62" y="6" width="36" height="32" rx="4" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="62" y="122" width="36" height="32" rx="4" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          <path
            d="M54 44 C54 34, 106 34, 106 44 L106 116 C106 126, 54 126, 54 116 Z"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <circle cx="80" cy="80" r="38" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
          <line x1="80" y1="80" x2="80" y2="57" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="98" y2="80" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'tudor':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="30" rx="3" fill="#1F2937" />
          <rect x="60" y="124" width="40" height="30" rx="3" fill="#1F2937" />
          <circle cx="80" cy="80" r="44" fill="#111827" stroke="#374151" strokeWidth="3" />
          <circle cx="80" cy="80" r="35" fill="#18181B" stroke="#FACC15" strokeWidth="1" />
          <circle cx="67" cy="80" r="8" stroke="#FACC15" strokeWidth="1.2" />
          <circle cx="93" cy="80" r="8" stroke="#FACC15" strokeWidth="1.2" />
          <line x1="80" y1="80" x2="80" y2="55" stroke="#FACC15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="100" y2="72" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'roadster':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="30" rx="3" fill="#D1D5DB" stroke="#9CA3AF" />
          <rect x="60" y="124" width="40" height="30" rx="3" fill="#D1D5DB" stroke="#9CA3AF" />
          <path
            d="M48 44 Q80 30 112 44 L115 80 L112 116 Q80 130 48 116 L45 80 Z"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <path
            d="M55 50 Q80 40 105 50 L107 80 L105 110 Q80 120 55 110 L53 80 Z"
            fill="#FFFFFF"
            stroke="#D1D5DB"
          />
          <line x1="80" y1="80" x2="66" y2="66" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="96" y2="70" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'tank':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="32" rx="2" fill="#E5E7EB" stroke="#9CA3AF" />
          <rect x="60" y="122" width="40" height="32" rx="2" fill="#E5E7EB" stroke="#9CA3AF" />
          <rect x="52" y="38" width="56" height="84" rx="4" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
          <rect x="60" y="48" width="40" height="64" fill="#FFFFFF" stroke="#9CA3AF" />
          <circle cx="111" cy="80" r="3.5" fill="#1D4ED8" />
          <line x1="80" y1="80" x2="70" y2="62" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="93" y2="68" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'j12black':
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="32" rx="3" fill="#18181B" stroke="#3F3F46" />
          <rect x="60" y="122" width="40" height="32" rx="3" fill="#18181B" stroke="#3F3F46" />
          <circle
            cx="80"
            cy="80"
            r="44"
            fill="#18181B"
            stroke="#E5E7EB"
            strokeWidth="3"
            strokeDasharray="3 2"
          />
          <circle cx="80" cy="80" r="34" fill="#09090B" stroke="#A1A1AA" strokeWidth="1" />
          <line x1="80" y1="80" x2="80" y2="56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="99" y2="80" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default: {
      const strapColor = type === 'diagonoChrono' ? '#18181B' : '#D4AF37';
      return (
        <svg className={className} viewBox="0 0 160 160" fill="none">
          <rect x="60" y="6" width="40" height="32" rx="3" fill={strapColor} stroke="#9A7B2C" />
          <rect x="60" y="122" width="40" height="32" rx="3" fill={strapColor} stroke="#9A7B2C" />
          <circle cx="80" cy="80" r="45" fill="#E6C25A" stroke="#9A7B2C" strokeWidth="2" />
          <circle cx="80" cy="80" r="36" fill="#121316" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="80" y="55" textAnchor="middle" fill="#F3E5AB" fontSize="9" fontFamily="serif" fontWeight="bold">
            12
          </text>
          <text x="80" y="112" textAnchor="middle" fill="#F3E5AB" fontSize="9" fontFamily="serif" fontWeight="bold">
            6
          </text>
          <line x1="80" y1="80" x2="80" y2="58" stroke="#F3E5AB" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="98" y2="72" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }
  }
}

function FestiveParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animId;
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const count = width < 640 ? 26 : 50;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.7,
        vx: (Math.random() - 0.5) * 0.35,
        vy: Math.random() * 0.45 + 0.15,
        alpha: Math.random() * 0.65 + 0.25,
        isGold: Math.random() > 0.3,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(212, 175, 55, ${p.alpha})`
          : `rgba(255, 250, 235, ${p.alpha * 0.85})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />;
}

export default function App() {
  const [storefront, setStorefront] = useState('rakuten');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const trackRef = useRef(null);
  const isChrono = storefront === 'chrono24';
  const catalog = isChrono ? CHRONO24_WATCHES : RAKUTEN_WATCHES;
  const activeStoreUrl = isChrono ? CHRONO24_STORE_URL : RAKUTEN_STORE_URL;

  useEffect(() => {
    setActiveSlide(0);
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [storefront]);

  const goToSlide = (index) => {
    const nextIdx = (index + catalog.length) % catalog.length;
    setActiveSlide(nextIdx);
    const firstCard = trackRef.current?.querySelector('article');
    const step = firstCard ? firstCard.offsetWidth + 20 : 320;
    trackRef.current?.scrollTo({ left: nextIdx * step, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const nextIdx = (prev + 1) % catalog.length;
        const firstCard = trackRef.current?.querySelector('article');
        const step = firstCard ? firstCard.offsetWidth + 20 : 320;
        trackRef.current?.scrollTo({ left: nextIdx * step, behavior: 'smooth' });
        return nextIdx;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [autoplay, catalog.length]);

  const segments = isChrono
    ? [
        { id: 'tier1', title: 'Under $4,000', desc: 'Signature Hermès, Chanel J12, and Cartier Tank classics.' },
        { id: 'tier2', title: '$4,000 – $10,000', desc: 'Diamond J12, Cartier Roadster, and Tudor chronographs.' },
        { id: 'tier3', title: 'Over $10,000', desc: '18K solid gold & diamond editions from Chanel and Bvlgari.' },
      ]
    : [
        { id: 'tier1', title: '60万円未満の厳選モデル', desc: 'エルメス・カルティエの定番ラグジュアリーウォッチ。' },
        { id: 'tier2', title: '60万円〜150万円の厳選モデル', desc: 'シャネル J12 ダイヤベゼルやチューダー クロノグラフ。' },
        { id: 'tier3', title: '150万円以上の最高峰コレクション', desc: '18Kイエローゴールドを贅沢に使用したブルガリ至高のモデル。' },
      ];

  const visibleSegments =
    activeSegment === 'all' ? segments : segments.filter((s) => s.id === activeSegment);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-stone-100 pb-20 md:pb-0 font-sans">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, #D4AF37 0%, #FFF3B8 45%, #D4AF37 70%, #B8860B 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 5s linear infinite;
        }
      `}</style>

      {/* Top Bar + Storefront Switcher */}
      <div className="bg-[#14161D] border-b border-white/10 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            {isChrono ? (
              <>
                <span className="font-bold text-amber-300">★ 4.8 (403 Reviews)</span>
                <span>•</span>
                <span>Trusted Seller</span>
                <span>•</span>
                <span>713+ Sold</span>
                <span>•</span>
                <span>95% Recommend</span>
              </>
            ) : (
              <>
                <span className="font-bold text-amber-300">★ 5.0</span>
                <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#F3E5AB] font-bold">3年保証</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 font-semibold">送料無料</span>
                <span className="px-1.5 py-0.5 rounded bg-[#BF0000] text-white font-bold">39ショップ</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 font-semibold">返品可</span>
              </>
            )}
          </div>

          <div className="flex items-center rounded-xl bg-[#0B0C10] p-0.5 border border-white/15">
            <button
              type="button"
              onClick={() => setStorefront('rakuten')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                !isChrono ? 'bg-[#BF0000] text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              楽天市場 (JPY)
            </button>
            <button
              type="button"
              onClick={() => setStorefront('chrono24')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                isChrono ? 'bg-[#1B365D] text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              Chrono24 (USD)
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0B0C10]/92 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 min-w-0">
            <div className="px-2.5 py-1.5 rounded-lg bg-black border border-[#D4AF37]/50 leading-none shrink-0">
              <span className="text-xs font-black text-[#E60033] block">東京ぶらんど</span>
              <span className="text-[7px] font-extrabold tracking-[0.22em] text-white block mt-0.5">
                TOKYO BRAND
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-serif font-bold text-base sm:text-xl text-white truncate">
                {isChrono ? 'Tokyo Brand (Global Trade Co.,Ltd.)' : '東京ぶらんど時計館'}
              </p>
              <p className="text-[11px] text-[#D4AF37] truncate">
                {isChrono
                  ? 'Est. 1991 Tokyo • 8 Stores • 10:30 AM–7:00 PM JST'
                  : '正規鑑定済・高級ブランド腕時計専門店'}
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            <a href="#carousel-section" className="hover:text-[#F3E5AB] transition">
              {isChrono ? 'Current Top Offers' : '厳選コレクション'}
            </a>
            <a href="#price-segments" className="hover:text-[#F3E5AB] transition">
              {isChrono ? 'Shop by Price' : '価格帯から探す'}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={activeStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-bold transition ${
                isChrono ? 'bg-[#1B365D] hover:bg-[#2B548E]' : 'bg-[#BF0000] hover:bg-[#990000]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white text-[#0B0C10] font-black text-xs flex items-center justify-center">
                {isChrono ? 'C' : 'R'}
              </span>
              <span>{isChrono ? 'Buy on Chrono24' : '楽天市場で購入する'}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden w-11 h-11 rounded-xl bg-[#14161D] border border-white/15 flex items-center justify-center text-stone-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#14161D] border-b border-[#D4AF37]/30 px-4 py-4 space-y-2">
            <a
              href="#carousel-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl bg-[#0B0C10]/70 text-sm font-semibold"
            >
              {isChrono ? 'Current Top Offers' : '厳選コレクション'}
            </a>
            <a
              href="#price-segments"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl bg-[#0B0C10]/70 text-sm font-semibold"
            >
              {isChrono ? '3 Price Segments (USD)' : '3つの価格帯から探す'}
            </a>
          </div>
        )}
      </header>

      {/* Hero Section: Christmas & New Year Specials */}
      <section id="top" className="relative overflow-hidden bg-[#0B0C10] border-b border-[#D4AF37]/25">
        <FestiveParticlesCanvas />
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/45 text-xs sm:text-sm font-bold text-[#F3E5AB]">
              <span>🎄</span>
              <span>
                {isChrono
                  ? 'CHRISTMAS & NEW YEAR SPECIALS • TOKYO, JAPAN'
                  : 'クリスマス＆年末年始 特別セール開催中'}
              </span>
              <span>🎍</span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight text-white">
              {isChrono ? (
                <>
                  Holiday Luxury Timepieces from <span className="gold-shimmer">Tokyo</span>.
                </>
              ) : (
                <>
                  特別な一年の締めくくりに、
                  <span className="gold-shimmer block">一生ものの輝きを。</span>
                </>
              )}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isChrono
                ? 'Founded in 1991 in Minato-ku, Tokyo with 8 boutiques across Ginza, Shinjuku, Ikebukuro & Ueno. Celebrate Christmas & New Year with special USD pricing and insured global shipping.'
                : 'エルメス・カルティエ・シャネル・チューダー・ブルガリなど厳選された高級腕時計を年末年始限定プライスでご用意。安心の3年保証・送料無料・39ショップでお届けします。'}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href={activeStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[52px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base shadow-xl transition ${
                  isChrono
                    ? 'bg-gradient-to-r from-[#1B365D] to-[#2B548E] border border-sky-300/30'
                    : 'bg-[#BF0000] hover:bg-[#990000]'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-white text-[#0B0C10] font-black text-sm flex items-center justify-center">
                  {isChrono ? 'C' : 'R'}
                </span>
                <span>{isChrono ? 'Buy on Chrono24' : '楽天市場でセール商品を見る'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-[#14161D] to-[#0B0C10] border border-[#D4AF37]/45 p-6 shadow-2xl">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#F3E5AB] font-bold">
                  {isChrono ? 'Holiday Spotlight' : '年末年始 目玉モデル'}
                </span>
                <span className="text-stone-400">
                  {isChrono ? 'Ships from Tokyo' : '3年保証・送料無料'}
                </span>
              </div>

              <div className="py-4 rounded-2xl bg-black/30 border border-white/10">
                <WatchArtwork type={isChrono ? 'boyfriend' : 'bvlgariGold'} className="w-40 h-40 mx-auto" />
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold text-[#D4AF37]">
                  {isChrono ? 'CHANEL • REF. H4315' : 'BVLGARI｜ブルガリ'}
                </p>
                <h2 className="font-serif text-xl font-bold text-white mt-0.5">
                  {isChrono
                    ? 'Chanel Boyfriend 18K Gold Diamond Bezel'
                    : 'ブルガリ ブルガリブルガリ 18Kイエローゴールド'}
                </h2>
                <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/10">
                  <span className="text-2xl font-extrabold text-white">
                    {isChrono ? '$16,247' : '2,910,000円'}
                  </span>
                  <span className="text-xs font-bold text-[#F3E5AB]">
                    {isChrono ? 'Free shipping' : '26,454ポイント'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section id="carousel-section" className="py-14 sm:py-20 bg-[#14161D]/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                {isChrono ? 'CURRENT TOP OFFERS' : 'HOLIDAY CURATED COLLECTION'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
                {isChrono ? 'Chrono24 Watch Carousel' : '年末年始 厳選コレクション'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoplay((a) => !a)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#191C24] border border-white/15 text-xs font-semibold"
              >
                {autoplay ? (isChrono ? 'Autoplay: ON' : '自動再生: ON') : (isChrono ? 'Autoplay: OFF' : '自動再生: OFF')}
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeSlide - 1)}
                className="w-11 h-11 rounded-xl bg-[#191C24] border border-white/15 hover:border-[#D4AF37] flex items-center justify-center"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeSlide + 1)}
                className="w-11 h-11 rounded-xl bg-[#191C24] border border-white/15 hover:border-[#D4AF37] flex items-center justify-center"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3"
          >
            {catalog.map((item) => (
              <article
                key={item.id}
                className="snap-start shrink-0 w-[82vw] max-w-[315px] rounded-2xl bg-[#191C24] border border-white/15 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-white/10 text-stone-200 font-semibold">
                      {item.condition}
                    </span>
                    <span className="text-[#F3E5AB] font-bold">
                      {isChrono ? 'Tokyo JP' : '3年保証'}
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#0B0C10] border border-white/10 py-4 mb-4">
                    <WatchArtwork type={item.svgType} />
                  </div>

                  <p className="text-xs font-bold text-[#D4AF37]">{item.brand}</p>
                  <h3 className="font-serif font-bold text-base text-white mt-1 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xl font-extrabold text-white">{item.priceText}</span>
                    <span className="text-xs font-bold text-amber-300">{item.badgeRight}</span>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold transition ${
                        isChrono ? 'bg-[#1B365D] hover:bg-[#2B548E]' : 'bg-[#BF0000] hover:bg-[#990000]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white text-[#0B0C10] font-black text-[10px] flex items-center justify-center">
                        {isChrono ? 'C' : 'R'}
                      </span>
                      <span>{isChrono ? 'Buy on Chrono24' : '楽天市場で購入する'}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {catalog.map((w, idx) => (
              <button
                key={w.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === idx ? 'w-6 bg-[#D4AF37]' : 'w-2.5 bg-white/25'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3 Price Segments */}
      <section id="price-segments" className="py-14 sm:py-20 bg-[#0B0C10] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              {isChrono ? '3 PRICE SEGMENTS (USD)' : '3つの価格帯セグメント'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1.5">
              {isChrono ? 'Shop by Price Tier' : '価格帯から探す'}
            </h2>

            <div className="mt-6 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                type="button"
                onClick={() => setActiveSegment('all')}
                className={`shrink-0 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeSegment === 'all'
                    ? 'bg-[#D4AF37] text-[#0B0C10]'
                    : 'bg-[#191C24] border border-white/15 text-stone-200'
                }`}
              >
                {isChrono ? 'All (8)' : 'すべて (8)'}
              </button>
              {segments.map((seg) => (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setActiveSegment(seg.id)}
                  className={`shrink-0 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeSegment === seg.id
                      ? 'bg-[#D4AF37] text-[#0B0C10] font-bold'
                      : 'bg-[#191C24] border border-white/15 text-stone-200'
                  }`}
                >
                  {seg.title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {visibleSegments.map((seg) => {
              const items = catalog.filter((w) => w.tier === seg.id);
              return (
                <div
                  key={seg.id}
                  className="rounded-3xl bg-[#191C24]/80 border border-[#D4AF37]/25 p-5 sm:p-8"
                >
                  <div className="mb-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{seg.title}</h3>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1">{seg.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((w) => (
                      <div
                        key={w.id}
                        className="rounded-2xl bg-[#0B0C10] border border-white/15 p-4 sm:p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="rounded-xl bg-[#14161D] border border-white/10 py-3.5 mb-3.5">
                            <WatchArtwork type={w.svgType} />
                          </div>
                          <p className="text-xs font-bold text-[#D4AF37]">{w.brand}</p>
                          <h4 className="font-serif font-bold text-base text-white mt-1">{w.title}</h4>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-xl font-extrabold text-white">{w.priceText}</span>
                            <span className="text-xs font-bold text-amber-300">{w.badgeRight}</span>
                          </div>
                          <div>
                            <a
                              href={w.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-bold ${
                                isChrono ? 'bg-[#1B365D] hover:bg-[#2B548E]' : 'bg-[#BF0000] hover:bg-[#990000]'
                              }`}
                            >
                              <span>{isChrono ? 'Buy on Chrono24' : '楽天市場で購入'}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0B0C10]/95 backdrop-blur-md border-t border-[#D4AF37]/35 px-3 py-2.5">
        <div className="max-w-md mx-auto">
          <a
            href={activeStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full min-h-[46px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-extrabold ${
              isChrono ? 'bg-[#1B365D]' : 'bg-[#BF0000]'
            }`}
          >
            <span>{isChrono ? 'Buy on Chrono24' : '楽天ストアを見る'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}