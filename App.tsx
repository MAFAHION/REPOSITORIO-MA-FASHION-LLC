import React, { useState, useRef, useEffect } from 'react';
import { useLiveAPI } from './hooks/use-live-api';
import Visualizer from './components/Visualizer';
import ControlTray from './components/ControlTray';
import { LiveStatus } from './types';
import { ShoppingBag, Menu, X, ArrowRight, Sparkles, Mic, Globe, Database, ChevronRight, Facebook, Instagram, Twitter, Linkedin, Calendar, MapPin } from 'lucide-react';

// --- Translation Data ---
type Language = 'en' | 'es' | 'pt' | 'jp' | 'it' | 'ar' | 'cn';

const translations: Record<Language, any> = {
  en: {
    tagline: "Global Hair Biotechnology",
    titleStart: "The Science of",
    titleEnd: "Beauty.",
    subtitle: "MA Fashion LLC presents the future of professional hair care. Discover Sweet Professional and S Professional.",
    ctaDiagnosis: "AI Assistant",
    ctaShop: "View Collection",
    collectionTitle: "Exclusive Collections",
    collectionSub: "Professional Grade. Salon Exclusive.",
    consultantActive: "Consultant Active",
    connecting: "Connecting...",
    listening: "I'm listening. How can we transform your hair today?",
    viewAll: "View All",
    kbActive: "Knowledge Base: Linked",
    products: {
      p1: { title: "The First Shampoo", desc: "First generation thermal straightener.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Molecular hair biotechnology map.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "S Professional emergency rescue.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC leads the global market in hair biotechnology, providing high-performance solutions for beauty professionals.",
      links: "Quick Links",
      legal: "Legal",
      contact: "Contact",
      rights: "© 2024 MA Fashion LLC. All rights reserved."
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "Advanced Hair Therapy Systems",
      desc: "A complete ecosystem of treatments designed for the modern stylist. From thermal alignment to deep reconstruction.",
      lines: {
        nutrology: "Nutrology - Deep Nutrition",
        hidratherapy: "Hidratherapy - Ozone Hydration",
        brushing: "Brushing+ - Thermal Alignment",
        profusion: "Pro Fusion - Enzyme Reconstruction",
        mycrown: "My Crown - Curl Definition"
      }
    },
    education: {
      title: "MA Academy",
      subtitle: "Master The Art",
      desc: "Immerse yourself in global events where science meets artistry. Our technical education elevates standards worldwide.",
      events: [
        {
          city: "Dubai",
          date: "Oct 2023",
          title: "Molecular Reconstruction Summit",
          desc: "An exclusive deep-dive into the enzymatic pathways of Pro Fusion. Stylists learned to reverse extreme chemical damage using our proprietary biotechnology."
        },
        {
          city: "São Paulo",
          date: "Jan 2024",
          title: "The Curly Revolution",
          desc: "Launch event for My Crown. Hands-on workshop focusing on curvature memory and lipid replacement for textured hair."
        },
        {
          city: "Milan",
          date: "Mar 2024",
          title: "Thermal Alignment Masterclass",
          desc: "Advanced techniques in acid-based straightening. Mastering The First Shampoo and Brushing+ for glass-hair results without formaldehyde."
        },
        {
          city: "New York",
          date: "Upcoming - Nov 2024",
          title: "Global Hair Science Forum",
          desc: "Join us for the unveiling of our 2025 collections. Focus on sustainable biotechnology and salon business growth."
        }
      ]
    }
  },
  es: {
    tagline: "Biotecnología Capilar Global",
    titleStart: "La Ciencia de",
    titleEnd: "la Belleza.",
    subtitle: "MA Fashion LLC presenta el futuro del cuidado profesional. Descubre Sweet Professional y S Professional.",
    ctaDiagnosis: "Asistente IA",
    ctaShop: "Ver Colección",
    collectionTitle: "Colecciones Exclusivas",
    collectionSub: "Grado Profesional. Exclusivo de Salón.",
    consultantActive: "Consultor Activo",
    connecting: "Conectando...",
    listening: "Te escucho. ¿Cómo podemos transformar tu cabello hoy?",
    viewAll: "Ver Todo",
    kbActive: "Base de Datos: Conectada",
    products: {
      p1: { title: "The First Shampoo", desc: "Primer alisado térmico del mundo.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Mapa de biotecnología molecular.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "Rescate de emergencia S Professional.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC lidera el mercado global en biotecnología capilar, proporcionando soluciones de alto rendimiento para profesionales.",
      links: "Enlaces Rápidos",
      legal: "Legal",
      contact: "Contacto",
      rights: "© 2024 MA Fashion LLC. Todos los derechos reservados."
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "Sistemas de Terapia Capilar Avanzada",
      desc: "Un ecosistema completo de tratamientos diseñados para el estilista moderno. Desde la alineación térmica hasta la reconstrucción profunda.",
      lines: {
        nutrology: "Nutrology - Nutrición Intensa",
        hidratherapy: "Hidratherapy - Hidratación con Ozono",
        brushing: "Brushing+ - Alineación Térmica",
        profusion: "Pro Fusion - Reconstrucción Enzimática",
        mycrown: "My Crown - Definición de Rizos"
      }
    },
    education: {
      title: "MA Academia",
      subtitle: "Domina el Arte",
      desc: "Sumérgete en eventos globales donde la ciencia se encuentra con el arte. Nuestra educación técnica eleva los estándares en todo el mundo.",
      events: [
        {
          city: "Dubai",
          date: "Oct 2023",
          title: "Cumbre de Reconstrucción Molecular",
          desc: "Una inmersión exclusiva en las vías enzimáticas de Pro Fusion. Los estilistas aprendieron a revertir el daño químico extremo."
        },
        {
          city: "São Paulo",
          date: "Ene 2024",
          title: "La Revolución de los Rizos",
          desc: "Evento de lanzamiento de My Crown. Taller práctico centrado en la memoria de curvatura y reposición de lípidos."
        },
        {
          city: "Milán",
          date: "Mar 2024",
          title: "Masterclass de Alineación Térmica",
          desc: "Técnicas avanzadas en alisado ácido. Dominando The First Shampoo y Brushing+ para resultados efecto espejo sin formol."
        },
        {
          city: "Nueva York",
          date: "Próximo - Nov 2024",
          title: "Foro Global de Ciencia Capilar",
          desc: "Únete a nosotros para la revelación de nuestras colecciones 2025. Enfoque en biotecnología sostenible y negocios de salón."
        }
      ]
    }
  },
  // Defaulting other languages to English structure for brevity, 
  // in production these would be fully translated.
  pt: {
    tagline: "Biotecnologia Capilar Global",
    titleStart: "A Ciência da",
    titleEnd: "Beleza.",
    subtitle: "MA Fashion LLC apresenta o futuro do cuidado profissional. Descubra Sweet Professional e S Professional.",
    ctaDiagnosis: "Assistente IA",
    ctaShop: "Ver Coleção",
    collectionTitle: "Coleções Exclusivas",
    collectionSub: "Grau Profissional. Exclusivo de Salão.",
    consultantActive: "Consultor Ativo",
    connecting: "Conectando...",
    listening: "Estou ouvindo. Como podemos transformar seu cabelo hoje?",
    viewAll: "Ver Tudo",
    kbActive: "Banco de Dados: Conectado",
    products: {
      p1: { title: "The First Shampoo", desc: "Primeiro alisamento térmico do mundo.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Mapa de biotecnologia molecular.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "Resgate de emergência S Professional.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC lidera o mercado global em biotecnologia capilar, fornecendo soluções de alto desempenho para profissionais.",
      links: "Links Rápidos",
      legal: "Legal",
      contact: "Contato",
      rights: "© 2024 MA Fashion LLC. Todos os direitos reservados."
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "Sistemas de Terapia Capilar Avançada",
      desc: "Um ecossistema completo de tratamentos projetados para o estilista moderno. Do alinhamento térmico à reconstrução profunda.",
      lines: {
        nutrology: "Nutrology - Nutrição Intensa",
        hidratherapy: "Hidratherapy - Hidratação com Ozônio",
        brushing: "Brushing+ - Alinhamento Térmico",
        profusion: "Pro Fusion - Reconstrução Enzimática",
        mycrown: "My Crown - Definição de Cachos"
      }
    },
    education: {
      title: "MA Academy",
      subtitle: "Master The Art",
      desc: "Immerse yourself in global events where science meets artistry.",
      events: [] // Filled in runtime with fallback or proper translation
    }
  },
  jp: {
    tagline: "グローバル・ヘア・バイオテクノロジー",
    titleStart: "美の",
    titleEnd: "科学。",
    subtitle: "MA Fashion LLCが提案するプロフェッショナルケアの未来。Sweet ProfessionalとS Professionalをご覧ください。",
    ctaDiagnosis: "AI アシスタント",
    ctaShop: "コレクションを見る",
    collectionTitle: "エクスクルーシブ・コレクション",
    collectionSub: "プロフェッショナルグレード。サロン専売。",
    consultantActive: "コンサルタント待機中",
    connecting: "接続中...",
    listening: "聞いています。今日はどのような髪のお悩みですか？",
    viewAll: "すべて見る",
    kbActive: "データベース: 接続完了",
    products: {
      p1: { title: "The First Shampoo", desc: "世界初の熱矯正シャンプー。", price: "$89.00" },
      p2: { title: "Cronology", desc: "分子毛髪バイオテクノロジー。", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "S Professional 緊急補修。", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLCは、美容の専門家に高性能なソリューションを提供する、ヘアバイオテクノロジーのグローバルリーダーです。",
      links: "クイックリンク",
      legal: "法的事項",
      contact: "お問い合わせ",
      rights: "© 2024 MA Fashion LLC. All rights reserved."
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "先進的なヘアセラピーシステム",
      desc: "現代のスタイリストのために設計された完全なトリートメントエコシステム。熱調整から深部再構築まで。",
      lines: {
        nutrology: "Nutrology - 集中栄養",
        hidratherapy: "Hidratherapy - オゾン保湿",
        brushing: "Brushing+ - 熱アライメント",
        profusion: "Pro Fusion - 酵素再構築",
        mycrown: "My Crown - カール定義"
      }
    },
    education: {
      title: "MA Academy",
      subtitle: "Master The Art",
      desc: "Immerse yourself in global events where science meets artistry.",
      events: []
    }
  },
  it: {
    tagline: "Biotecnologia Capillare Globale",
    titleStart: "La Scienza della",
    titleEnd: "Bellezza.",
    subtitle: "MA Fashion LLC presenta il futuro della cura professionale. Scopri Sweet Professional e S Professional.",
    ctaDiagnosis: "Assistente AI",
    ctaShop: "Vedi Collezione",
    collectionTitle: "Collezioni Esclusive",
    collectionSub: "Grado Professionale. Esclusiva Salone.",
    consultantActive: "Consulente Attivo",
    connecting: "Connessione in corso...",
    listening: "Ti ascolto. Come possiamo trasformare i tuoi capelli oggi?",
    viewAll: "Vedi Tutto",
    kbActive: "Database: Collegato",
    products: {
      p1: { title: "The First Shampoo", desc: "Prima lisciatura termica al mondo.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Biotecnologia molecolare per capelli.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "S Professional salvataggio d'emergenza.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC guida il mercato globale nella biotecnologia capillare, fornendo soluzioni ad alte prestazioni per i professionisti.",
      links: "Link Rapidi",
      legal: "Legale",
      contact: "Contatto",
      rights: "© 2024 MA Fashion LLC. Tutti i diritti riservati."
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "Sistemi di Terapia Capillare Avanzata",
      desc: "Un ecosistema completo di trattamenti progettati per lo stilista moderno. Dall'allineamento termico alla ricostruzione profonda.",
      lines: {
        nutrology: "Nutrology - Nutrizione Intensa",
        hidratherapy: "Hidratherapy - Idratazione all'Ozono",
        brushing: "Brushing+ - Allineamento Termico",
        profusion: "Pro Fusion - Ricostruzione Enzimatica",
        mycrown: "My Crown - Definizione Ricci"
      }
    },
    education: {
      title: "MA Academy",
      subtitle: "Master The Art",
      desc: "Immerse yourself in global events where science meets artistry.",
      events: []
    }
  },
  ar: {
    tagline: "التكنولوجيا الحيوية العالمية للشعر",
    titleStart: "علم",
    titleEnd: "الجمال.",
    subtitle: "تقدم MA Fashion LLC مستقبل العناية المهنية. اكتشف Sweet Professional و S Professional.",
    ctaDiagnosis: "مساعد الذكاء الاصطناعي",
    ctaShop: "عرض المجموعة",
    collectionTitle: "مجموعات حصرية",
    collectionSub: "درجة احترافية. حصري للصالونات.",
    consultantActive: "الاستشاري نشط",
    connecting: "جار الاتصال...",
    listening: "أنا أستمع. كيف يمكننا تحويل شعرك اليوم؟",
    viewAll: "عرض الكل",
    kbActive: "قاعدة البيانات: متصلة",
    products: {
      p1: { title: "The First Shampoo", desc: "أول شامبو تمليس حراري في العالم.", price: "$89.00" },
      p2: { title: "Cronology", desc: "التكنولوجيا الحيوية الجزيئية للشعر.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "إصلاح الطوارئ S Professional.", price: "$65.00" }
    },
    footer: {
      about: "تقود MA Fashion LLC السوق العالمية في التكنولوجيا الحيوية للشعر ، وتوفر حلولاً عالية الأداء للمحترفين.",
      links: "روابط سريعة",
      legal: "قانوني",
      contact: "اتصل",
      rights: "© 2024 MA Fashion LLC. جميع الحقوق محفوظة."
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "أنظمة علاج الشعر المتقدمة",
      desc: "نظام بيئي كامل للعلاجات مصمم للمصمم الحديث. من المحاذاة الحرارية إلى إعادة البناء العميق.",
      lines: {
        nutrology: "Nutrology - تغذية مكثفة",
        hidratherapy: "Hidratherapy - ترطيب بالأوزون",
        brushing: "Brushing+ - محاذاة حرارية",
        profusion: "Pro Fusion - إعادة بناء إنزيمية",
        mycrown: "My Crown - تحديد تجعيد الشعر"
      }
    },
    education: {
      title: "MA Academy",
      subtitle: "Master The Art",
      desc: "Immerse yourself in global events where science meets artistry.",
      events: []
    }
  },
  cn: {
    tagline: "全球美发生物科技",
    titleStart: "美的",
    titleEnd: "科学。",
    subtitle: "MA Fashion LLC 呈现专业护理的未来。探索 Sweet Professional 和 S Professional。",
    ctaDiagnosis: "AI 助手",
    ctaShop: "查看系列",
    collectionTitle: "独家系列",
    collectionSub: "专业级。沙龙专供。",
    consultantActive: "顾问在线",
    connecting: "连接中...",
    listening: "我在听。今天我们要如何改变您的发质？",
    viewAll: "查看全部",
    kbActive: "知识库：已连接",
    products: {
      p1: { title: "The First Shampoo", desc: "世界上第一款热矫正洗发水。", price: "$89.00" },
      p2: { title: "Cronology", desc: "分子毛发生物技术。", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "S Professional 紧急修复。", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC 凭借高性能解决方案引领全球美发生物科技市场。",
      links: "快速链接",
      legal: "法律",
      contact: "联系方式",
      rights: "© 2024 MA Fashion LLC. 保留所有权利。"
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "高级毛发治疗系统",
      desc: "专为现代造型师设计的完整治疗生态系统。从热矫正到深层重组。",
      lines: {
        nutrology: "Nutrology - 深层营养",
        hidratherapy: "Hidratherapy - 臭氧保湿",
        brushing: "Brushing+ - 热对齐",
        profusion: "Pro Fusion - 酶重组",
        mycrown: "My Crown - 卷发定义"
      }
    },
    education: {
      title: "MA Academy",
      subtitle: "Master The Art",
      desc: "Immerse yourself in global events where science meets artistry.",
      events: []
    }
  }
};

const ProductCard = ({ title, price, desc, color }: { title: string, price: string, desc: string, color: string }) => (
  <div className="group relative bg-zinc-900/50 border border-zinc-800 p-6 transition-all duration-500 hover:border-amber-500/50 hover:bg-zinc-900 hover:shadow-[0_0_40px_rgba(180,83,9,0.1)] cursor-pointer overflow-hidden">
    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} opacity-5 blur-[60px] group-hover:opacity-15 transition-opacity duration-700`}></div>
    <div className="h-56 bg-[#0a0a0a] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
       {/* Placeholder for Product Image - Styled as Luxury Bottle */}
       <div className="w-20 h-40 bg-gradient-to-b from-zinc-800 to-black rounded-sm border-t border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
          <div className="w-12 h-24 border border-amber-500/30 opacity-50"></div>
       </div>
    </div>
    <h3 className="text-xl font-serif italic text-white mb-2">{title}</h3>
    <p className="text-zinc-500 text-sm mb-4 leading-relaxed font-light">{desc}</p>
    <div className="flex items-center justify-between border-t border-white/5 pt-4">
      <span className="text-amber-500/80 font-mono tracking-wider">{price}</span>
      <button className="w-8 h-8 flex items-center justify-center text-zinc-500 group-hover:text-amber-400 transition-colors">
        <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

// --- High-End Footer Component ---
const Footer = ({ t }: { t: any }) => (
  <footer className="bg-[#050505] border-t border-zinc-900 pt-16 pb-8 text-zinc-400 font-light text-sm z-10 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
              <span className="font-serif text-2xl text-white italic tracking-wider block mb-6">MA FASHION</span>
              <p className="leading-relaxed text-zinc-500 mb-6 text-xs uppercase tracking-wide">
                  {t.footer.about}
              </p>
              <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
                  <a href="#" className="hover:text-white transition-colors"><Facebook size={18} /></a>
                  <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
                  <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
              </div>
          </div>

          {/* Links Column */}
          <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-6">{t.footer.links}</h4>
              <ul className="space-y-4">
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Sweet Professional</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">S Professional</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Academy</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Distributors</a></li>
              </ul>
          </div>

          {/* Legal Column */}
          <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-6">{t.footer.legal}</h4>
              <ul className="space-y-4">
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Cookie Policy</a></li>
              </ul>
          </div>

          {/* Contact Column */}
          <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-6">{t.footer.contact}</h4>
              <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Miami, FL, USA
                  </li>
                  <li>support@mafashion.com</li>
                  <li>+1 (800) 123-4567</li>
              </ul>
          </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-600 tracking-widest uppercase">
          {t.footer.rights}
      </div>
  </footer>
);

// --- S Professional Page Component ---
const SProfessionalPage = ({ t }: { t: any }) => (
  <div className="pt-32 pb-16 animate-fade-in">
    {/* Header */}
    <div className="text-center px-6 mb-20">
       <span className="text-amber-500 tracking-[0.4em] uppercase text-xs font-bold mb-4 block">MA Fashion LLC</span>
       <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-6">{t.sprofessional.title}</h1>
       <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">{t.sprofessional.desc}</p>
    </div>

    {/* Lines Grid */}
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-12">
        {/* Nutrology */}
        <div className="group relative h-[400px] border border-zinc-800 bg-zinc-900/30 overflow-hidden flex items-center p-12 hover:border-green-800/50 transition-all duration-500">
           <div className="absolute inset-0 bg-gradient-to-r from-green-950/20 to-transparent z-0"></div>
           <div className="relative z-10 max-w-lg">
              <span className="text-green-500 tracking-widest text-xs uppercase font-bold mb-2 block">01. Nutrition</span>
              <h2 className="text-4xl font-serif italic text-white mb-4">{t.sprofessional.lines.nutrology}</h2>
              <p className="text-zinc-400 mb-8">Biotecnología verde para la reposición de carbono y aceites esenciales.</p>
              <button className="text-white border-b border-green-500 pb-1 text-xs tracking-widest uppercase hover:text-green-400">Discover</button>
           </div>
           <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
        </div>

        {/* Hidratherapy */}
        <div className="group relative h-[400px] border border-zinc-800 bg-zinc-900/30 overflow-hidden flex items-center justify-end p-12 hover:border-cyan-800/50 transition-all duration-500 text-right">
           <div className="absolute inset-0 bg-gradient-to-l from-cyan-950/20 to-transparent z-0"></div>
           <div className="relative z-10 max-w-lg">
              <span className="text-cyan-500 tracking-widest text-xs uppercase font-bold mb-2 block">02. Hydration</span>
              <h2 className="text-4xl font-serif italic text-white mb-4">{t.sprofessional.lines.hidratherapy}</h2>
              <p className="text-zinc-400 mb-8">El poder del ozono y extractos botánicos para una hidratación profunda.</p>
              <button className="text-white border-b border-cyan-500 pb-1 text-xs tracking-widest uppercase hover:text-cyan-400">Discover</button>
           </div>
           <div className="absolute left-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Brushing+ */}
            <div className="group relative h-[400px] border border-zinc-800 bg-zinc-900/30 overflow-hidden p-8 hover:border-zinc-600 transition-all duration-500 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80"></div>
                <div className="relative z-10">
                    <span className="text-zinc-400 tracking-widest text-xs uppercase font-bold mb-2 block">03. Alignment</span>
                    <h2 className="text-3xl font-serif italic text-white mb-4">{t.sprofessional.lines.brushing}</h2>
                    <p className="text-zinc-500 text-sm">Tecnología ácida para un alisado perfecto sin formol.</p>
                </div>
            </div>

             {/* Pro Fusion */}
            <div className="group relative h-[400px] border border-zinc-800 bg-zinc-900/30 overflow-hidden p-8 hover:border-purple-800/50 transition-all duration-500 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 to-transparent opacity-80"></div>
                <div className="relative z-10">
                    <span className="text-purple-400 tracking-widest text-xs uppercase font-bold mb-2 block">04. Reconstruction</span>
                    <h2 className="text-3xl font-serif italic text-white mb-4">{t.sprofessional.lines.profusion}</h2>
                    <p className="text-zinc-500 text-sm">Reconstrucción enzimática para cabellos extremadamente dañados.</p>
                </div>
            </div>
        </div>

        {/* My Crown - NEW */}
        <div className="group relative h-[500px] border border-amber-900/30 bg-gradient-to-br from-amber-950/10 to-black overflow-hidden flex items-center justify-center text-center p-12 hover:border-amber-600/50 transition-all duration-500">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526662092594-e98c1e35652b?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
           <div className="relative z-10 max-w-2xl">
              <span className="bg-amber-500 text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">New Release</span>
              <h2 className="text-6xl font-serif italic text-white mb-4">{t.sprofessional.lines.mycrown}</h2>
              <p className="text-lg text-amber-100/80 mb-8 font-light italic">"Liberate your curls. Define your power."</p>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                  La nueva revolución para cabellos rizados. Enriquecido con <strong>Curvelini</strong> y <strong>Plantcol</strong> para una memoria de rizo infinita y una hidratación que desafía la gravedad.
              </p>
              <button className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold tracking-widest uppercase transition-colors">
                  Explore My Crown
              </button>
           </div>
        </div>
    </div>
  </div>
);

// --- Education Page Component ---
const EducationPage = ({ t }: { t: any }) => {
    // Images for education events (placeholders)
    const eventImages = [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=2576&auto=format&fit=crop"
    ];

    const educationData = t.education?.events?.length > 0 ? t.education.events : translations.en.education.events;

    return (
        <div className="pt-32 pb-16 animate-fade-in relative">
            {/* Background Ambience Specific to Education */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
            
            {/* Hero */}
            <div className="text-center px-6 mb-24 relative z-10">
                <span className="text-zinc-500 tracking-[0.4em] uppercase text-xs font-bold mb-6 block animate-fade-in-up" style={{animationDelay: '0.1s'}}>MA Academy</span>
                <h1 className="text-6xl md:text-8xl font-serif italic text-white mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>{t.education?.title || "MA Academy"}</h1>
                <h2 className="text-2xl text-amber-500/80 font-light uppercase tracking-widest mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>{t.education?.subtitle || "Master The Art"}</h2>
                <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    {t.education?.desc || "Immerse yourself in global events where science meets artistry."}
                </p>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
                {educationData.map((event: any, index: number) => (
                    <div 
                        key={index} 
                        className="group relative h-[500px] border border-zinc-800 bg-[#080808] overflow-hidden cursor-pointer hover:border-zinc-600 transition-all duration-700 animate-fade-in-up"
                        style={{animationDelay: `${0.2 + (index * 0.1)}s`}}
                    >
                        {/* Image Layer - Starts Grayscale, Colors on Hover */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out transform group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            style={{backgroundImage: `url('${eventImages[index % eventImages.length]}')`}}
                        ></div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                <div className="flex items-center gap-4 mb-4 text-amber-500 text-xs font-bold tracking-widest uppercase">
                                    <span className="flex items-center gap-1"><Calendar size={12}/> {event.date}</span>
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                    <span className="flex items-center gap-1"><MapPin size={12}/> {event.city}</span>
                                </div>
                                
                                <h3 className="text-3xl font-serif italic text-white mb-4 group-hover:text-amber-100 transition-colors">{event.title}</h3>
                                
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 mb-6">
                                    {event.desc}
                                </p>

                                <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-amber-500/50 transition-colors duration-700 mb-6"></div>
                                
                                <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                                    View Gallery <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-24 text-center">
                <button className="px-12 py-5 border border-amber-500/30 bg-amber-900/10 text-amber-500 hover:bg-amber-500 hover:text-black transition-all font-medium tracking-wider uppercase text-sm">
                    Book a Masterclass
                </button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const {
    connect,
    disconnect,
    status,
    isMuted,
    isVideoActive,
    toggleMute,
    toggleVideo,
    volumeLevel,
    videoRef,
    canvasRef
  } = useLiveAPI();

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 's-professional' | 'education'>('home');
  
  // RTL Detection
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Auto-connect handling when overlay opens
  useEffect(() => {
    if (!isConsultationOpen && status === LiveStatus.CONNECTED) {
      disconnect();
    }
  }, [isConsultationOpen, disconnect, status]);

  const handleStartConsultation = () => {
    setIsConsultationOpen(true);
    connect();
  };

  const handleEndConsultation = () => {
    disconnect();
    setIsConsultationOpen(false);
  };

  const t = translations[lang];

  return (
    <div className={`relative min-h-screen w-full bg-[#020202] text-zinc-200 font-sans selection:bg-amber-500/30 overflow-x-hidden ${lang === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* --- Background Ambience --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] bg-amber-900/10 rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setCurrentView('home')}>
             <span className="font-serif text-2xl tracking-widest text-white italic">MA FASHION</span>
             <span className="text-[0.6rem] tracking-[0.3em] text-amber-600/80 uppercase text-center">LLC Group</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-xs tracking-widest font-medium text-zinc-500 uppercase">
            <button onClick={() => setCurrentView('home')} className={`hover:text-amber-500 transition-colors ${currentView === 'home' ? 'text-white' : ''}`}>Sweet Professional</button>
            <button onClick={() => setCurrentView('s-professional')} className={`hover:text-amber-500 transition-colors ${currentView === 's-professional' ? 'text-white' : ''}`}>S Professional</button>
            <button onClick={() => setCurrentView('education')} className={`hover:text-amber-500 transition-colors ${currentView === 'education' ? 'text-white' : ''}`}>Education</button>
          </div>

          <div className="flex items-center gap-6">
             {/* Language Switcher */}
             <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Globe size={18} />
                  <span className="uppercase text-xs font-bold">{lang}</span>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-32 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col z-50">
                    {(['en', 'es', 'pt', 'jp', 'it', 'ar', 'cn'] as Language[]).map((l) => (
                      <button 
                        key={l} 
                        onClick={() => { setLang(l); setIsLangMenuOpen(false); }}
                        className="px-4 py-3 text-left text-xs uppercase hover:bg-white/5 text-zinc-400 hover:text-amber-400 transition-colors"
                      >
                        {l === 'en' ? 'English' : 
                         l === 'es' ? 'Español' : 
                         l === 'pt' ? 'Português' : 
                         l === 'jp' ? '日本語' :
                         l === 'it' ? 'Italiano' :
                         l === 'ar' ? 'العربية' : '中文'}
                      </button>
                    ))}
                  </div>
                )}
             </div>

             <div className="h-4 w-[1px] bg-zinc-800"></div>

             <button className="text-zinc-400 hover:text-white transition-colors">
                <ShoppingBag size={20} />
             </button>
          </div>
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      {currentView === 'home' ? (
        <>
            {/* --- Hero Section --- */}
            <section className="relative pt-48 pb-32 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 mb-10 animate-fade-in-up border-b border-amber-500/20">
                    <Sparkles size={14} className="text-amber-400" />
                    <span className="text-xs uppercase tracking-[0.3em] text-amber-500/80">{t.tagline}</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-serif italic tracking-tight text-white mb-8 max-w-6xl leading-[1.1] animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                {t.titleStart} <br />
                <span className="text-gold not-italic font-sans font-light">{t.titleEnd}</span>
                </h1>
                
                <p className="text-zinc-400 text-lg max-w-xl mb-16 leading-relaxed animate-fade-in-up font-light" style={{animationDelay: '0.2s'}}>
                {t.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <button 
                        onClick={handleStartConsultation}
                        className="group relative px-10 py-5 bg-white text-black font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                    >
                        <div className="absolute inset-0 bg-amber-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <span className="relative z-10 tracking-wider uppercase text-sm">{t.ctaDiagnosis}</span>
                        <Mic size={18} className="relative z-10 text-amber-600" />
                    </button>
                    <button onClick={() => setCurrentView('s-professional')} className="px-10 py-5 border border-zinc-700 text-white hover:bg-white/5 transition-all font-medium tracking-wider uppercase text-sm">
                        {t.ctaShop}
                    </button>
                </div>
            </section>

            {/* --- Product Showcase --- */}
            <section className="relative py-32 px-6 z-10 bg-[#080808] border-t border-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl text-white font-serif italic mb-3">{t.collectionTitle}</h2>
                            <p className="text-zinc-500 uppercase tracking-widest text-xs">{t.collectionSub}</p>
                        </div>
                        <a href="#" className="hidden md:block text-zinc-400 hover:text-amber-400 text-xs tracking-widest border-b border-zinc-800 pb-1 uppercase transition-colors">{t.viewAll}</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ProductCard 
                            title={t.products.p1.title} 
                            price={t.products.p1.price} 
                            desc={t.products.p1.desc} 
                            color="from-amber-200 to-amber-600"
                        />
                        <ProductCard 
                            title={t.products.p2.title} 
                            price={t.products.p2.price} 
                            desc={t.products.p2.desc} 
                            color="from-zinc-200 to-zinc-400"
                        />
                        <ProductCard 
                            title={t.products.p3.title} 
                            price={t.products.p3.price} 
                            desc={t.products.p3.desc} 
                            color="from-red-500 to-orange-600"
                        />
                    </div>
                </div>
            </section>
        </>
      ) : currentView === 's-professional' ? (
        <SProfessionalPage t={t} />
      ) : (
        <EducationPage t={t} />
      )}

      {/* --- Footer --- */}
      <Footer t={t} />

      {/* --- CONSULTATION OVERLAY (The "Call" Interface) --- */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-500 animate-fade-in">
            {/* Close Button */}
            <button 
                onClick={handleEndConsultation}
                className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-50"
            >
                <X size={24} />
            </button>

            <div className="flex flex-col items-center w-full max-w-2xl px-4 relative">
                
                {/* Status Badge */}
                <div className={`mb-8 px-6 py-2 border flex items-center gap-3 transition-all ${
                    status === LiveStatus.CONNECTED 
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status === LiveStatus.CONNECTED ? 'bg-amber-500 animate-pulse' : 'bg-zinc-600'}`}></div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                        {status === LiveStatus.CONNECTED ? t.consultantActive : status}
                    </span>
                </div>

                {/* Database Indicator */}
                {status === LiveStatus.CONNECTED && (
                    <div className="mb-8 flex items-center gap-2 text-zinc-500 animate-fade-in">
                        <Database size={12} className="text-cyan-500" />
                        <span className="text-[9px] uppercase tracking-[0.2em]">{t.kbActive}</span>
                    </div>
                )}

                {/* Main Visualizer */}
                <div className="mb-20 scale-150">
                    <Visualizer volume={volumeLevel} isActive={status === LiveStatus.CONNECTED} />
                </div>

                {/* Subtitles / Prompt */}
                <p className="text-amber-100/80 text-center text-xl font-serif italic mb-12 h-8">
                    {status === LiveStatus.CONNECTED 
                        ? t.listening
                        : t.connecting}
                </p>

                {/* Controls */}
                <ControlTray 
                    status={status}
                    isMuted={isMuted}
                    isVideoActive={isVideoActive}
                    onConnect={connect}
                    onDisconnect={handleEndConsultation} 
                    onToggleMute={toggleMute}
                    onToggleVideo={toggleVideo}
                />
            </div>

            {/* Hidden Video Elements for Vision capabilities */}
            <div className={`absolute top-8 left-8 w-48 aspect-video bg-black rounded-sm overflow-hidden border border-zinc-800 transition-opacity duration-300 ${isVideoActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <video ref={videoRef} className="w-full h-full object-cover transform scale-x-[-1]" muted playsInline />
                 <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
      )}

      {/* API Key Error Toast */}
      {!process.env.API_KEY && (
          <div className="fixed bottom-4 right-4 bg-red-900/90 text-white p-4 rounded-sm border border-red-700 z-[100] font-mono text-xs">
             API Key Missing.
          </div>
      )}
    </div>
  );
};

export default App;