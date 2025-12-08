
import React, { useState, useRef, useEffect } from 'react';
import { useLiveAPI } from './hooks/use-live-api';
import Visualizer from './components/Visualizer';
import ControlTray from './components/ControlTray';
import { LiveStatus } from './types';
import { ShoppingBag, Menu, X, ArrowRight, Sparkles, Database, Facebook, Instagram, Linkedin, MapPin, Users, Ticket, Star, Clock } from 'lucide-react';

// --- Safe API Key Check ---
const hasApiKey = () => {
    try {
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) return true;
        // if using Vite: if (import.meta.env.VITE_API_KEY) return true;
        return false;
    } catch (e) {
        return false;
    }
}

// --- Translation Data ---
type Language = 'en' | 'es' | 'pt' | 'jp' | 'it' | 'ar' | 'cn';

const translations: Record<Language, any> = {
  en: {
    nav: {
      home: "Home",
      sweet: "Sweet Professional",
      s: "S Professional",
      edu: "Education",
      about: "About Us"
    },
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
    waHelp: "Need assistance?",
    promos: {
        ticker: "BREAKING: New Partner Program Available • Buy 5 Get 1 Free on The First Shampoo • Join the Revolution",
        title: "Salon Partner Program",
        desc: "Exclusive pricing and education for licensed professionals.",
        cta: "Apply Now"
    },
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
    sweet: {
        title: "Sweet Professional",
        desc: "The brand that revolutionized the market with the first thermal straightener in shampoo form. Innovation, speed, and safety.",
        lines: {
            thefirst: "The First",
            cronology: "Cronology",
            sos: "S.O.S"
        }
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
    },
    about: {
        title: "Who We Are",
        subtitle: "Global Leadership",
        desc: "We are the architects of hair transformation. MA Fashion LLC unites science, nature, and artistry to empower professionals worldwide.",
        ambassadorsTitle: "Brand Ambassadors",
        repsTitle: "United States Leadership",
        repsDesc: "The visionaries leading our expansion across North America."
    }
  },
  es: {
    nav: {
      home: "Inicio",
      sweet: "Sweet Professional",
      s: "S Professional",
      edu: "Educación",
      about: "Nosotros"
    },
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
    waHelp: "¿Necesita asistencia?",
    promos: {
        ticker: "NOTICIA: Nuevo Programa de Socios • Compra 5 y Recibe 1 Gratis en The First Shampoo • Únete a la Revolución",
        title: "Programa de Socios de Salón",
        desc: "Precios exclusivos y educación para profesionales con licencia.",
        cta: "Aplicar Ahora"
    },
    products: {
      p1: { title: "The First Shampoo", desc: "Alisado térmico de primera generación.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Mapa de biotecnología capilar molecular.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "Rescate de emergencia S Professional.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC lidera el mercado global en biotecnología capilar, brindando soluciones de alto rendimiento para profesionales.",
      links: "Enlaces Rápidos",
      legal: "Legal",
      contact: "Contacto",
      rights: "© 2024 MA Fashion LLC. Todos los derechos reservados."
    },
    sweet: {
        title: "Sweet Professional",
        desc: "La marca que revolucionó el mercado con el primer alisador térmico en forma de champú. Innovación, rapidez y seguridad.",
        lines: {
            thefirst: "The First",
            cronology: "Cronology",
            sos: "S.O.S"
        }
    },
    sprofessional: {
      title: "S Professional",
      subtitle: "Sistemas Avanzados de Terapia Capilar",
      desc: "Un ecosistema completo de tratamientos diseñados para el estilista moderno. Desde alineación térmica hasta reconstrucción profunda.",
      lines: {
        nutrology: "Nutrology - Nutrición Profunda",
        hidratherapy: "Hidratherapy - Hidratación con Ozono",
        brushing: "Brushing+ - Alineación Térmica",
        profusion: "Pro Fusion - Reconstrucción Enzimática",
        mycrown: "My Crown - Definición de Rizos"
      }
    },
    education: {
      title: "Academia MA",
      subtitle: "Domina el Arte",
      desc: "Sumérgete en eventos globales donde la ciencia se encuentra con el arte. Nuestra educación técnica eleva los estándares en todo el mundo.",
      events: [
        {
          city: "Dubái",
          date: "Oct 2023",
          title: "Cumbre de Reconstrucción Molecular",
          desc: "Una inmersión exclusiva en las vías enzimáticas de Pro Fusion. Los estilistas aprendieron a revertir el daño químico extremo."
        },
        {
          city: "São Paulo",
          date: "Ene 2024",
          title: "La Revolución de los Rizos",
          desc: "Evento de lanzamiento de My Crown. Taller práctico centrado en la memoria de curvatura y el reemplazo de lípidos."
        },
        {
          city: "Milán",
          date: "Mar 2024",
          title: "Clase Magistral de Alineación Térmica",
          desc: "Técnicas avanzadas en alisado ácido. Dominando The First Shampoo y Brushing+ para resultados de cabello de vidrio."
        },
        {
          city: "Nueva York",
          date: "Próximo - Nov 2024",
          title: "Foro Global de Ciencia Capilar",
          desc: "Únase a nosotros para la presentación de nuestras colecciones 2025. Enfoque en biotecnología sostenible."
        }
      ]
    },
    about: {
        title: "Quiénes Somos",
        subtitle: "Liderazgo Global",
        desc: "Somos los arquitectos de la transformación capilar. MA Fashion LLC une ciencia, naturaleza y arte para empoderar a los profesionales.",
        ambassadorsTitle: "Embajadoras de Marca",
        repsTitle: "Liderazgo Estados Unidos",
        repsDesc: "Los visionarios que lideran nuestra expansión en Norteamérica."
    }
  },
  pt: {
    nav: { home: "Início", sweet: "Sweet Professional", s: "S Professional", edu: "Educação", about: "Sobre Nós" },
    tagline: "Biotecnologia Capilar Global",
    titleStart: "A Ciência da",
    titleEnd: "Beleza.",
    subtitle: "MA Fashion LLC apresenta o futuro do cuidado capilar profissional.",
    ctaDiagnosis: "Assistente IA",
    ctaShop: "Ver Coleção",
    collectionTitle: "Coleções Exclusivas",
    collectionSub: "Grau Profissional. Exclusivo para Salão.",
    consultantActive: "Consultor Ativo",
    connecting: "Conectando...",
    listening: "Estou ouvindo. Como podemos transformar seu cabelo hoje?",
    viewAll: "Ver Tudo",
    kbActive: "Base de Dados: Conectada",
    waHelp: "Precisa de ajuda?",
    promos: { ticker: "NOVIDADE: Programa de Parceiros • Compre 5 Leve 1 Grátis no The First • Junte-se à Revolução", title: "Programa de Parceiros", desc: "Preços exclusivos.", cta: "Inscreva-se" },
    products: {
      p1: { title: "The First Shampoo", desc: "Alisamento térmico de primeira geração.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Mapa de biotecnologia capilar molecular.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "Rescate de emergência S Professional.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC lidera o mercado global em biotecnologia capilar.",
      links: "Links Rápidos",
      legal: "Legal",
      contact: "Contato",
      rights: "© 2024 MA Fashion LLC. Todos os direitos reservados."
    },
    sweet: { title: "Sweet Professional", desc: "Inovação, rapidez e segurança.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" } },
    sprofessional: {
      title: "S Professional",
      subtitle: "Sistemas Avançados de Terapia Capilar",
      desc: "Um ecossistema completo de tratamentos desenhados para o estilista moderno.",
      lines: {
        nutrology: "Nutrology - Nutrição Profunda",
        hidratherapy: "Hidratherapy - Hidratação com Ozônio",
        brushing: "Brushing+ - Alinhamento Térmico",
        profusion: "Pro Fusion - Reconstrução Enzimática",
        mycrown: "My Crown - Definição de Cachos"
      }
    },
    education: {
      title: "Academia MA",
      subtitle: "Domine a Arte",
      desc: "Mergulhe em eventos globais onde a ciência encontra a arte.",
      events: [
        { city: "Dubai", date: "Out 2023", title: "Cúpula de Reconstrução Molecular", desc: "Mergulho profundo nas vias enzimáticas do Pro Fusion." },
        { city: "São Paulo", date: "Jan 2024", title: "A Revolução dos Cachos", desc: "Lançamento do My Crown. Workshop prático sobre memória de curvatura." },
        { city: "Milão", date: "Mar 2024", title: "Masterclass de Alinhamento Térmico", desc: "Técnicas avançadas em alisamento ácido sem formol." },
        { city: "Nova York", date: "Próximo - Nov 2024", title: "Fórum Global de Ciência Capilar", desc: "Lançamento das coleções 2025 e foco em sustentabilidade." }
      ]
    },
    about: {
        title: "Quem Somos",
        subtitle: "Liderança Global",
        desc: "Somos os arquitetos da transformação capilar. MA Fashion LLC une ciência, natureza e arte.",
        ambassadorsTitle: "Embaixadoras da Marca",
        repsTitle: "Liderança Estados Unidos",
        repsDesc: "Os visionarios liderando nossa expansão na América do Norte."
    }
  },
  jp: {
    nav: { home: "ホーム", sweet: "Sweet Professional", s: "S Professional", edu: "教育", about: "私たちについて" },
    tagline: "グローバルヘアバイオテクノロジー",
    titleStart: "美の",
    titleEnd: "科学。",
    subtitle: "MA Fashion LLCはプロフェッショナルヘアケアの未来を提示します。",
    ctaDiagnosis: "AI アシスタント",
    ctaShop: "コレクションを見る",
    collectionTitle: "限定コレクション",
    collectionSub: "プロフェッショナルグレード。サロン専売。",
    consultantActive: "コンサルタント稼働中",
    connecting: "接続中...",
    listening: "聞いています。今日はどのように髪を変身させましょうか？",
    viewAll: "すべて見る",
    kbActive: "データベース: 接続済み",
    waHelp: "助けが必要ですか？",
    promos: { ticker: "ニュース: 新しいパートナープログラム • The First Shampoo 5つ購入で1つ無料", title: "サロンパートナープログラム", desc: "プロフェッショナル専用価格。", cta: "今すぐ申し込む" },
    products: {
      p1: { title: "The First Shampoo", desc: "第一世代の熱矯正ストレート。", price: "$89.00" },
      p2: { title: "Cronology", desc: "分子毛髪バイオテクノロジーマップ。", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "S Professional 緊急レスキュー。", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLCは、美容専門家に高性能ソリューションを提供し、ヘアバイオテクノロジーのグローバル市場をリードしています。",
      links: "クイックリンク",
      legal: "法務",
      contact: "お問い合わせ",
      rights: "© 2024 MA Fashion LLC. 全著作権所有。"
    },
    sweet: { title: "Sweet Professional", desc: "革新、スピード、安全性。", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" } },
    sprofessional: {
      title: "S Professional",
      subtitle: "高度なヘアセラピーシステム",
      desc: "現代のスタイリストのために設計された完全なトリートメントエコシステム。",
      lines: {
        nutrology: "Nutrology - 深層栄養",
        hidratherapy: "Hidratherapy - オゾン保湿",
        brushing: "Brushing+ - 熱整列",
        profusion: "Pro Fusion - 酵素再構築",
        mycrown: "My Crown - カール定義"
      }
    },
    education: {
      title: "MA アカデミー",
      subtitle: "芸術を極める",
      desc: "科学と芸術が出会うグローバルイベントに没頭してください。",
      events: [
        { city: "ドバイ", date: "2023年10月", title: "分子再構築サミット", desc: "Pro Fusionの酵素経路への独占的な深掘り。" },
        { city: "サンパウロ", date: "2024年1月", title: "カール革命", desc: "My Crownのローンチイベント。曲率記憶に関するワークショップ。" },
        { city: "ミラノ", date: "2024年3月", title: "熱整列マスタークラス", desc: "酸性ストレートの高度な技術。" },
        { city: "ニューヨーク", date: "次回 - 2024年11月", title: "グローバルヘアサイエンスフォーラム", desc: "2025年コレクションの発表と持続可能性への焦点。" }
      ]
    },
    about: {
        title: "私たちについて",
        subtitle: "グローバルリーダーシップ",
        desc: "私たちは髪の変革の建築家です。MA Fashion LLCは科学、自然、芸術を融合させます。",
        ambassadorsTitle: "ブランドアンバサダー",
        repsTitle: "米国リーダーシップ",
        repsDesc: "北米での拡大を主導するビジョナリーたち。"
    }
  },
  it: {
    nav: { home: "Home", sweet: "Sweet Professional", s: "S Professional", edu: "Formazione", about: "Chi Siamo" },
    tagline: "Biotecnologia Capillare Globale",
    titleStart: "La Scienza della",
    titleEnd: "Belleza.",
    subtitle: "MA Fashion LLC presenta il futuro della cura professionale dei capelli.",
    ctaDiagnosis: "Assistente IA",
    ctaShop: "Vedi Collezione",
    collectionTitle: "Collezioni Esclusive",
    collectionSub: "Grado Professionale. Esclusiva Salone.",
    consultantActive: "Consulente Attivo",
    connecting: "Connessione...",
    listening: "Ti ascolto. Come possiamo trasformare i tuoi capelli oggi?",
    viewAll: "Vedi Tutto",
    kbActive: "Database: Collegato",
    waHelp: "Bisogno di assistenza?",
    promos: { ticker: "NOTIZIA: Nuovo Programma Partner • Acquista 5 ricevi 1 gratis", title: "Programma Partner", desc: "Prezzi esclusivi.", cta: "Candidati Ora" },
    products: {
      p1: { title: "The First Shampoo", desc: "Lisciatura termica di prima generazione.", price: "$89.00" },
      p2: { title: "Cronology", desc: "Mappa biotecnologica capillare molecolare.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "Soccorso d'emergenza S Professional.", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC guida il mercato globale nella biotecnologia capillare.",
      links: "Link Rapidi",
      legal: "Legale",
      contact: "Contatto",
      rights: "© 2024 MA Fashion LLC. Tutti i diritti riservati."
    },
    sweet: { title: "Sweet Professional", desc: "Innovazione, velocità e sicurezza.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" } },
    sprofessional: {
      title: "S Professional",
      subtitle: "Sistemi Avanzati di Terapia Capillare",
      desc: "Un ecosistema completo di trattamenti progettati per lo stilista moderno.",
      lines: {
        nutrology: "Nutrology - Nutrizione Profunda",
        hidratherapy: "Hidratherapy - Idratazione all'Ozono",
        brushing: "Brushing+ - Allineamento Termico",
        profusion: "Pro Fusion - Ricostruzione Enzimatica",
        mycrown: "My Crown - Definizione Ricci"
      }
    },
    education: {
      title: "Accademia MA",
      subtitle: "Padroneggia l'Arte",
      desc: "Immergiti in eventi globali dove la scienza incontra l'arte.",
      events: [
        { city: "Dubai", date: "Ott 2023", title: "Vertice sulla Ricostruzione Molecolare", desc: "Approfondimento esclusivo sui percorsi enzimatici di Pro Fusion." },
        { city: "San Paolo", date: "Gen 2024", title: "La Rivoluzione dei Ricci", desc: "Evento di lancio per My Crown. Workshop pratico sulla memoria della curvatura." },
        { city: "Milano", date: "Mar 2024", title: "Masterclass di Allineamento Termico", desc: "Tecniche avanzate di stiratura acida senza formaldeide." },
        { city: "New York", date: "In arrivo - Nov 2024", title: "Forum Globale sulla Scienza dei Capelli", desc: "Presentazione delle collezioni 2025 e focus sulla sostenibilità." }
      ]
    },
    about: {
        title: "Chi Siamo",
        subtitle: "Leadership Globale",
        desc: "Siamo gli architetti della trasformazione dei capelli. MA Fashion LLC unisce scienza, natura e arte.",
        ambassadorsTitle: "Ambasciatori del Brand",
        repsTitle: "Leadership Stati Uniti",
        repsDesc: "I visionari che guidano la nostra espansione in Nord America."
    }
  },
  ar: {
    nav: { home: "الصفحة الرئيسية", sweet: "Sweet Professional", s: "S Professional", edu: "التعليم", about: "من نحن" },
    tagline: "التكنولوجيا الحيوية العالمية للشعر",
    titleStart: "علم",
    titleEnd: "الجمال.",
    subtitle: "تقدم MA Fashion LLC مستقبل العناية بالشعر الاحترافية.",
    ctaDiagnosis: "مساعد الذكاء الاصطناعي",
    ctaShop: "عرض المجموعة",
    collectionTitle: "مجموعات حصرية",
    collectionSub: "درجة احترافية. حصري للصالونات.",
    consultantActive: "مستشار نشط",
    connecting: "جار الاتصال...",
    listening: "أنا أستمع. كيف يمكننا تحويل شعرك اليوم؟",
    viewAll: "عرض الكل",
    kbActive: "قاعدة البيانات: متصلة",
    waHelp: "تحتاج مساعدة؟",
    promos: { ticker: "خبر عاجل: برنامج شركاء جديد • اشتر 5 واحصل على 1 مجانًا", title: "برنامج شركاء الصالون", desc: "أسعار حصرية.", cta: "قدم الآن" },
    products: {
      p1: { title: "The First Shampoo", desc: "الجيل الأول من التمليس الحراري.", price: "$89.00" },
      p2: { title: "Cronology", desc: "خريطة التكنولوجيا الحيوية الجزيئية للشعر.", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "الإنقاذ الطارئ من S Professional.", price: "$65.00" }
    },
    footer: {
      about: "تقود MA Fashion LLC السوق العالمية في التكنولوجيا الحيوية للشعر.",
      links: "روابط سريعة",
      legal: "قانوني",
      contact: "اتصل",
      rights: "© 2024 MA Fashion LLC. جميع الحقوق محفوظة."
    },
    sweet: { title: "Sweet Professional", desc: "ابتكار وسرعة وأمان.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" } },
    sprofessional: {
      title: "S Professional",
      subtitle: "أنظمة علاج الشعر المتقدمة",
      desc: "نظام بيئي كامل للعلاجات مصمم للمصفف الحديث.",
      lines: {
        nutrology: "Nutrology - تغذية عميقة",
        hidratherapy: "Hidratherapy - ترطيب بالأوزون",
        brushing: "Brushing+ - محاذاة حرارية",
        profusion: "Pro Fusion - إعادة بناء إنزيمية",
        mycrown: "My Crown - تحديد تجعيد الشعر"
      }
    },
    education: {
      title: "أكاديمية MA",
      subtitle: "إتقان الفن",
      desc: "انغمس في الأحداث العالمية حيث يلتقي العلم بالفن.",
      events: [
        { city: "دبي", date: "أكتوبر 2023", title: "قمة إعادة البناء الجزيئي", desc: "غوص عميق حصري في المسارات الإنزيمية لـ Pro Fusion." },
        { city: "ساو باولو", date: "يناير 2024", title: "ثورة الشعر المجعد", desc: "حدث إطلاق My Crown. ورشة عمل عملية." },
        { city: "ميلانو", date: "مارس 2024", title: "دورة المحاذاة الحرارية", desc: "تقنيات متقدمة في التمليس الحمضي بدون فورمالدهايد." },
        { city: "نيويورك", date: "قادم - نوفمبر 2024", title: "المنتدى العالمي لعلوم الشعر", desc: "الكشف عن مجموعات 2025 والتركيز على الاستدامة." }
      ]
    },
    about: {
        title: "من نحن",
        subtitle: "القيادة العالمية",
        desc: "نحن مهندسو تحول الشعر. MA Fashion LLC توحد العلم والطبيعة والفن.",
        ambassadorsTitle: "سفراء العلامة التجارية",
        repsTitle: "قيادة الولايات المتحدة",
        repsDesc: "الرؤى التي تقود توسعنا في أمريكا الشمالية."
    }
  },
  cn: {
    nav: { home: "首页", sweet: "Sweet Professional", s: "S Professional", edu: "教育", about: "关于我们" },
    tagline: "全球美发生物技术",
    titleStart: "美的",
    titleEnd: "科学。",
    subtitle: "MA Fashion LLC 展示专业护发的未来。",
    ctaDiagnosis: "人工智能助手",
    ctaShop: "查看系列",
    collectionTitle: "独家系列",
    collectionSub: "专业级。沙龙独家。",
    consultantActive: "顾问在线",
    connecting: "连接中...",
    listening: "我在听。今天我们要如何改变您的发型？",
    viewAll: "查看全部",
    kbActive: "数据库: 已连接",
    waHelp: "需要帮助？",
    promos: { ticker: "最新消息：新合作伙伴计划 • 购买 5 送 1 免费 • 加入革命", title: "沙龙合作伙伴计划", desc: "独家价格。", cta: "立即申请" },
    products: {
      p1: { title: "The First Shampoo", desc: "第一代热能直发。", price: "$89.00" },
      p2: { title: "Cronology", desc: "分子头发生物技术图谱。", price: "$120.00" },
      p3: { title: "S.O.S Repair", desc: "S Professional 紧急救援。", price: "$65.00" }
    },
    footer: {
      about: "MA Fashion LLC 引领全球美发生物技术市场。",
      links: "快速链接",
      legal: "法律",
      contact: "联系方式",
      rights: "© 2024 MA Fashion LLC. 保留所有权利。"
    },
    sweet: { title: "Sweet Professional", desc: "创新，速度与安全。", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" } },
    sprofessional: {
      title: "S Professional",
      subtitle: "先进头发治疗系统",
      desc: "为现代发型师设计的完整治疗生态系统。",
      lines: {
        nutrology: "Nutrology - 深层滋养",
        hidratherapy: "Hidratherapy - 臭氧保湿",
        brushing: "Brushing+ - 热能顺直",
        profusion: "Pro Fusion - 酶重建",
        mycrown: "My Crown - 卷发定义"
      }
    },
    education: {
      title: "MA 学院",
      subtitle: "掌握艺术",
      desc: "沉浸在科学与艺术相遇的全球活动中。",
      events: [
        { city: "迪拜", date: "2023年10月", title: "分子重建峰会", desc: "独家深入了解 Pro Fusion 的酶途径。" },
        { city: "圣保罗", date: "2024年1月", title: "卷发革命", desc: "My Crown 发布活动。关于卷曲记忆的实践研讨会。" },
        { city: "米兰", date: "2024年3月", title: "热能顺直大师班", desc: "酸性直发的高级技术。掌握无甲醛的玻璃发效果。" },
        { city: "纽约", date: "即将到来 - 2024年11月", title: "全球头发科学论坛", desc: "2025年系列发布及可持续发展焦点。" }
      ]
    },
    about: {
        title: "关于我们",
        subtitle: "全球领导力",
        desc: "我们是头发变革的建筑师。MA Fashion LLC 融合科学、自然和艺术。",
        ambassadorsTitle: "品牌大使",
        repsTitle: "美国领导层",
        repsDesc: "引领我们在北美扩张的远见者。"
    }
  }
};

const PromotionsSection: React.FC<{ t: any }> = ({ t }) => {
    return (
        <div className="w-full bg-black relative border-y border-white/10 overflow-hidden group">
            {/* Glass Container */}
            <div className="relative flex items-center h-12 bg-white/5 backdrop-blur-md">
                {/* Fixed Label */}
                <div className="absolute left-0 top-0 bottom-0 z-20 bg-gradient-to-r from-[#bf953f] to-[#aa771c] px-6 flex items-center gap-3 shadow-2xl">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-black font-bold text-xs tracking-widest uppercase">MA NEWS</span>
                </div>

                {/* Scrolling Text */}
                <div className="flex whitespace-nowrap animate-marquee pl-32">
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="mx-8 text-xs font-light tracking-[0.2em] text-zinc-300 uppercase flex items-center gap-8">
                            {t.promos.ticker}
                            <span className="text-[#bf953f] text-[8px]">◆</span>
                        </span>
                    ))}
                </div>
                 {/* Duplicate for seamless loop */}
                <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="mx-8 text-xs font-light tracking-[0.2em] text-zinc-300 uppercase flex items-center gap-8">
                            {t.promos.ticker}
                            <span className="text-[#bf953f] text-[8px]">◆</span>
                        </span>
                    ))}
                </div>
            </div>
            
            {/* Promo Hero */}
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 reveal-on-scroll">
                <div className="w-full md:w-1/2">
                    <span className="text-[#bf953f] text-xs font-bold uppercase tracking-widest mb-4 block">Limited Time Offer</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">{t.promos.title}</h2>
                    <p className="text-zinc-400 mb-8 font-light">{t.promos.desc}</p>
                    <div className="flex gap-4 mb-8">
                        <div className="p-4 bg-black/50 border border-white/10 rounded-sm text-center min-w-[80px]">
                            <span className="block text-2xl text-white font-serif">02</span>
                            <span className="text-[10px] text-zinc-500 uppercase">Days</span>
                        </div>
                        <div className="p-4 bg-black/50 border border-white/10 rounded-sm text-center min-w-[80px]">
                            <span className="block text-2xl text-white font-serif">14</span>
                            <span className="text-[10px] text-zinc-500 uppercase">Hours</span>
                        </div>
                         <div className="p-4 bg-black/50 border border-white/10 rounded-sm text-center min-w-[80px]">
                            <span className="block text-2xl text-white font-serif">58</span>
                            <span className="text-[10px] text-zinc-500 uppercase">Mins</span>
                        </div>
                    </div>
                    <button className="bg-white text-black px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-[#bf953f] transition-colors">
                        {t.promos.cta}
                    </button>
                </div>
                <div className="w-full md:w-1/2 relative h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#bf953f]/20 to-transparent rounded-lg"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop" 
                        className="w-full h-full object-cover rounded-lg shadow-2xl filter brightness-75 hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-black p-6 border border-white/10 max-w-xs shadow-xl hidden md:block">
                        <div className="flex items-center gap-2 mb-2">
                             <Star size={14} className="text-[#bf953f] fill-current"/>
                             <Star size={14} className="text-[#bf953f] fill-current"/>
                             <Star size={14} className="text-[#bf953f] fill-current"/>
                             <Star size={14} className="text-[#bf953f] fill-current"/>
                             <Star size={14} className="text-[#bf953f] fill-current"/>
                        </div>
                        <p className="text-white text-sm italic">"Best investment for my salon this year. The products fly off the shelves."</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AboutPage: React.FC<{ language: Language, t: any }> = ({ language, t }) => {
  const ambassadors = [
    { name: "Alejandra Mendez", role: "Global Technical Director", image: "https://images.unsplash.com/photo-1595959183082-7bce70897967?q=80&w=1887&auto=format&fit=crop" },
    { name: "Sarah Jenkins", role: "Creative Stylist", image: "https://images.unsplash.com/photo-1583335513577-22f3066e166c?q=80&w=1887&auto=format&fit=crop" },
    { name: "Elena Rossi", role: "Color Specialist", image: "https://images.unsplash.com/photo-1616776918519-25f05a069502?q=80&w=1887&auto=format&fit=crop" },
    { name: "Yuki Tanaka", role: "Texture Expert", image: "https://images.unsplash.com/photo-1596288591873-138374d9e033?q=80&w=1887&auto=format&fit=crop" },
  ];

  const usReps = [
    { name: "Michael Vance", region: "East Coast Director", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
    { name: "Jessica Cole", region: "West Coast Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" },
    { name: "David Chen", region: "Midwest Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Amanda Lewis", region: "Southern Region", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" }
  ];

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pt-20">
       {/* Hero */}
       <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1521590832169-d75932599c2d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
         </div>
         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
             <span className="block text-gold text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">{t.about.subtitle}</span>
             <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-in-up">{t.about.title}</h1>
             <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {t.about.desc}
             </p>
         </div>
       </div>

       {/* US Leadership VIP Section */}
       <div className="py-24 bg-zinc-900/30 relative reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{t.about.repsTitle}</h2>
                 <p className="text-zinc-400 font-light">{t.about.repsDesc}</p>
             </div>
             
             {/* Art Deco Frame Container */}
             <div className="relative p-8 border border-white/5 bg-zinc-950/50 backdrop-blur-sm">
                {/* Gold Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#bf953f]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#bf953f]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#bf953f]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#bf953f]" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {usReps.map((rep, idx) => (
                        <div key={idx} className="group relative text-center">
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-[#bf953f] to-zinc-900 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-950">
                                    <img src={rep.image} alt={rep.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-1 group-hover:text-[#bf953f] transition-colors">{rep.name}</h3>
                            <span className="text-sm text-zinc-500 uppercase tracking-widest">{rep.region}</span>
                        </div>
                    ))}
                </div>
             </div>
          </div>
       </div>

       {/* Ambassadors Grid */}
       <div className="py-24 max-w-7xl mx-auto px-6 reveal-on-scroll">
           <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">{t.about.ambassadorsTitle}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ambassadors.map((amb, idx) => (
                  <div key={idx} className="relative aspect-[3/4] group overflow-hidden cursor-pointer">
                      <img src={amb.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-2xl font-serif text-white mb-2">{amb.name}</h3>
                          <p className="text-[#bf953f] text-sm uppercase tracking-wider">{amb.role}</p>
                      </div>
                  </div>
              ))}
           </div>
       </div>
    </div>
  );
};

const EducationPage: React.FC<{ language: Language, t: any }> = ({ language, t }) => {
  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pt-20">
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="relative z-10 text-center px-4">
             <span className="block text-zinc-500 text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">MA Academy</span>
             <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-fade-in-up">{t.education.title}</h1>
             <p className="text-lg text-zinc-400 max-w-xl mx-auto font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {t.education.desc}
             </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
         <div className="grid grid-cols-1 gap-12">
            {t.education.events.map((evt: any, idx: number) => (
              <div key={idx} className="group relative flex flex-col md:flex-row gap-8 items-center border-b border-white/5 pb-12 reveal-on-scroll">
                 <div className="w-full md:w-1/3 aspect-video overflow-hidden rounded-sm relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${idx === 0 ? '1522337660859-02fbefca4702' : idx === 1 ? '1605497788044-5a32c7078486' : idx === 2 ? '1562322140-8baeececf3df' : '1560066984-138dadb4c035'}?q=80&w=1000&auto=format&fit=crop`} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest text-white border border-white/10">
                      {evt.city}
                    </div>
                 </div>
                 <div className="w-full md:w-2/3">
                    <span className="text-[#bf953f] text-sm font-medium mb-2 block">{evt.date}</span>
                    <h3 className="text-3xl font-serif text-white mb-4 group-hover:text-zinc-300 transition-colors">{evt.title}</h3>
                    <p className="text-zinc-400 font-light leading-relaxed max-w-2xl">{evt.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const SweetProfessionalPage: React.FC<{ language: Language, t: any }> = ({ language, t }) => {
    const lines = [
        { id: 'thefirst', title: t.sweet.lines.thefirst, img: 'https://images.unsplash.com/photo-1556228552-523de502919c?q=80&w=2000&auto=format&fit=crop', desc: "The first straightening shampoo in the world. 5 international patents.", color: "from-cyan-900/40" },
        { id: 'cronology', title: t.sweet.lines.cronology, img: 'https://images.unsplash.com/photo-1576426863848-c21f5fc67255?q=80&w=2000&auto=format&fit=crop', desc: "Biotechnology mapping for personalized hair treatment.", color: "from-blue-900/40" },
        { id: 'sos', title: t.sweet.lines.sos, img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2000&auto=format&fit=crop', desc: "Emergency rescue for chemically damaged hair.", color: "from-teal-900/40" }
    ];

    return (
        <div className="w-full bg-zinc-950 text-white min-h-screen pt-20">
            {/* Hero */}
            <div className="relative h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1519699047748-40ba5266f2bd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 filter contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-cyan-950/20 to-transparent" />
                </div>
                <div className="relative z-10 animate-fade-in-up">
                    <span className="block text-cyan-400 text-sm tracking-[0.4em] uppercase mb-6 font-medium drop-shadow-lg">Innovation & Science</span>
                    <h1 className="text-6xl md:text-9xl font-serif text-white mb-8 tracking-tighter drop-shadow-2xl">Sweet Professional</h1>
                    <p className="text-xl md:text-2xl text-zinc-200 font-light max-w-2xl mx-auto drop-shadow-md">{t.sweet.desc}</p>
                </div>
            </div>

            {/* Product Lines */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 gap-32">
                    {lines.map((line, idx) => (
                        <div key={line.id} className={`flex flex-col md:flex-row gap-16 items-center reveal-on-scroll ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                                <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10">
                                    <img src={line.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${line.color} to-transparent opacity-60`} />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-8">
                                <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">0{idx + 1} / Collection</span>
                                <h2 className="text-5xl font-serif text-white leading-tight">{line.title}</h2>
                                <p className="text-zinc-400 text-lg font-light leading-relaxed border-l-2 border-cyan-900 pl-6">
                                    {line.desc}
                                </p>
                                <button className="group flex items-center gap-3 text-white text-sm uppercase tracking-widest hover:text-cyan-400 transition-colors">
                                    Discover More <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SProfessionalPage: React.FC<{ language: Language, t: any }> = ({ language, t }) => {
  const lines = [
    { id: 'nutrology', title: t.sprofessional.lines.nutrology, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop', color: 'from-green-900/40' },
    { id: 'hidratherapy', title: t.sprofessional.lines.hidratherapy, img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop', color: 'from-blue-900/40' },
    { id: 'brushing', title: t.sprofessional.lines.brushing, img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1888&auto=format&fit=crop', color: 'from-zinc-800/60' },
    { id: 'profusion', title: t.sprofessional.lines.profusion, img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1887&auto=format&fit=crop', color: 'from-purple-900/40' },
    { id: 'mycrown', title: t.sprofessional.lines.mycrown, img: 'https://images.unsplash.com/photo-1606210123565-38b438258df7?q=80&w=1964&auto=format&fit=crop', color: 'from-amber-700/40' }
  ];

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pt-20">
      {/* Brand Hero */}
      <div className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
         <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
         </div>
         <div className="relative z-10 animate-fade-in-up">
           <h1 className="text-6xl md:text-9xl font-serif text-white mb-6 tracking-tighter">S Professional</h1>
           <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto">{t.sprofessional.desc}</p>
         </div>
      </div>

      {/* Lines Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-24">
           {lines.map((line, idx) => (
             <div key={line.id} className={`flex flex-col md:flex-row gap-12 items-center reveal-on-scroll ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 aspect-[4/5] relative group overflow-hidden rounded-sm">
                  <img src={line.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${line.color} to-transparent opacity-60`} />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                   <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">{line.title}</h2>
                   <div className="h-1 w-20 bg-[#bf953f]" />
                   <p className="text-zinc-400 text-lg font-light leading-relaxed">
                     {language === 'en' ? "Advanced biotechnology formulated for professional salon use. Delivers immediate structural recovery and long-lasting results." : 
                      language === 'es' ? "Biotecnología avanzada formulada para uso profesional en salón. Ofrece recuperación estructural inmediata y resultados duraderos." :
                      "Biotecnologia avançada formulada para uso profissional em salão."}
                   </p>
                   <button className="text-[#bf953f] border border-[#bf953f] px-8 py-3 uppercase tracking-widest text-xs hover:bg-[#bf953f] hover:text-black transition-all">
                      {language === 'en' ? "Discover Line" : "Descubrir Línea"}
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC<{ t: any, handleNavClick: (view: any) => void }> = ({ t, handleNavClick }) => (
    <footer className="bg-black text-zinc-400 py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
           <h3 className="text-2xl font-serif text-white">MA Fashion LLC</h3>
           <p className="text-sm font-light leading-relaxed">{t.footer.about}</p>
        </div>
        <div>
           <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-xs">{t.footer.links}</h4>
           <ul className="space-y-4 text-sm font-light">
             <li><button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors text-left">{t.nav.home}</button></li>
             <li><button onClick={() => handleNavClick('sweet')} className="hover:text-white transition-colors text-left">{t.nav.sweet}</button></li>
             <li><button onClick={() => handleNavClick('sprofessional')} className="hover:text-white transition-colors text-left">{t.nav.s}</button></li>
             <li><button onClick={() => handleNavClick('education')} className="hover:text-white transition-colors text-left">{t.nav.edu}</button></li>
             <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors text-left">{t.nav.about}</button></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-xs">{t.footer.legal}</h4>
           <ul className="space-y-4 text-sm font-light">
             <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Distributor Login</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-xs">{t.footer.contact}</h4>
           <ul className="space-y-4 text-sm font-light">
             <li className="flex items-start gap-3">
               <MapPin size={16} className="mt-1 text-[#bf953f]" />
               <span>United States<br/>Florida, USA</span>
             </li>
             <li className="flex items-center gap-3">
               <div className="text-[#bf953f] mt-1">
                 <Users size={16} />
               </div>
               <div className="flex flex-col">
                 <span className="text-white font-medium">Ernesto Aramburu</span>
                 <span className="text-white font-medium">Alejandra Mendez</span>
               </div>
             </li>
              <li className="flex items-center gap-3">
                 <div className="text-[#bf953f]">📞</div>
                 <a href="tel:+14072181294" className="hover:text-white transition-colors">+1 (407) 218-1294</a>
             </li>
              <li className="flex items-center gap-3">
                 <div className="text-[#bf953f]">✉️</div>
                 <a href="mailto:s.professional.usa@gmail.com" className="hover:text-white transition-colors">s.professional.usa@gmail.com</a>
             </li>
             <li className="flex gap-4 pt-4">
               <a href="https://www.facebook.com/share/17RRNbbb3u/" target="_blank" rel="noopener noreferrer" className="hover:text-[#bf953f] transition-colors"><Facebook size={20} /></a>
               <a href="https://www.instagram.com/shairprof_usa/" target="_blank" rel="noopener noreferrer" className="hover:text-[#bf953f] transition-colors"><Instagram size={20} /></a>
               <a href="#" className="hover:text-[#bf953f] transition-colors"><Linkedin size={20} /></a>
             </li>
           </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-900 text-center text-xs font-light tracking-widest uppercase">
         {t.footer.rights}
      </div>
    </footer>
);

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'sprofessional' | 'sweet' | 'education' | 'about'>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const { connect, disconnect, status, isMuted, isVideoActive, toggleMute, toggleVideo, volumeLevel, videoRef, canvasRef } = useLiveAPI();
  const videoRefLocal = useRef<HTMLVideoElement>(null);
  const canvasRefLocal = useRef<HTMLCanvasElement>(null);
  
  const t = translations[language];

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Global Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]); // Re-run when view changes to capture new elements

  // Show/Hide WhatsApp button on scroll
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowWhatsApp(true);
        } else {
            setShowWhatsApp(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = () => {
    setIsOverlayOpen(true);
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
    setIsOverlayOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: 'home' | 'sprofessional' | 'sweet' | 'education' | 'about') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#bf953f] selection:text-black">
      
      {/* Floating WhatsApp Button */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-700 ease-out flex items-center gap-4 ${showWhatsApp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-serif italic text-white/90 shadow-lg">
              {t.waHelp}
          </div>
          <a 
            href="https://wa.me/14072181294" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-500 hover:scale-110 overflow-hidden"
          >
             {/* Ping Effect */}
             <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-75"></div>
             <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-50 delay-75"></div>
             
             {/* Glass Shine */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
             
             {/* WhatsApp SVG Icon */}
             <svg viewBox="0 0 24 24" className="w-6 h-6 text-white relative z-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
             </svg>
          </a>
      </div>

      {/* Warning if API Key Missing */}
      {!hasApiKey() && (
          <div className="fixed bottom-4 left-4 bg-red-900/80 text-white px-4 py-2 rounded-md text-xs border border-red-500 z-50 backdrop-blur-md">
              API Key Missing. AI features disabled.
          </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={() => handleNavClick('home')} className="text-2xl font-serif text-white tracking-tighter hover:opacity-80 transition-opacity">
              MA FASHION<span className="text-[#bf953f]">.</span>
            </button>
            <div className="hidden md:flex gap-8 text-sm font-light tracking-wide">
               <button onClick={() => handleNavClick('home')} className={`hover:text-[#bf953f] transition-colors ${currentView === 'home' ? 'text-[#bf953f]' : 'text-zinc-400'}`}>{t.nav.home}</button>
               <button onClick={() => handleNavClick('sprofessional')} className={`hover:text-[#bf953f] transition-colors ${currentView === 'sprofessional' ? 'text-[#bf953f]' : 'text-zinc-400'}`}>{t.nav.s}</button>
               <button onClick={() => handleNavClick('sweet')} className={`hover:text-[#bf953f] transition-colors ${currentView === 'sweet' ? 'text-[#bf953f]' : 'text-zinc-400'}`}>{t.nav.sweet}</button>
               <button onClick={() => handleNavClick('education')} className={`hover:text-[#bf953f] transition-colors ${currentView === 'education' ? 'text-[#bf953f]' : 'text-zinc-400'}`}>{t.nav.edu}</button>
               <button onClick={() => handleNavClick('about')} className={`hover:text-[#bf953f] transition-colors ${currentView === 'about' ? 'text-[#bf953f]' : 'text-zinc-400'}`}>{t.nav.about}</button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6">
               <button onClick={() => setLanguage('en')} className={`text-xs font-medium ${language === 'en' ? 'text-white' : 'text-zinc-600'}`}>EN</button>
               <button onClick={() => setLanguage('es')} className={`text-xs font-medium ${language === 'es' ? 'text-white' : 'text-zinc-600'}`}>ES</button>
               <button onClick={() => setLanguage('pt')} className={`text-xs font-medium ${language === 'pt' ? 'text-white' : 'text-zinc-600'}`}>PT</button>
               <button onClick={() => setLanguage('jp')} className={`text-xs font-medium ${language === 'jp' ? 'text-white' : 'text-zinc-600'}`}>JP</button>
               <button onClick={() => setLanguage('it')} className={`text-xs font-medium ${language === 'it' ? 'text-white' : 'text-zinc-600'}`}>IT</button>
               <button onClick={() => setLanguage('ar')} className={`text-xs font-medium ${language === 'ar' ? 'text-white' : 'text-zinc-600'}`}>AR</button>
               <button onClick={() => setLanguage('cn')} className={`text-xs font-medium ${language === 'cn' ? 'text-white' : 'text-zinc-600'}`}>CN</button>
            </div>
            
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#bf953f] rounded-full"></span>
            </button>
            
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-8 transition-all duration-500">
             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                 <X size={32} />
             </button>
             
             <div className="space-y-8">
                <button onClick={() => handleNavClick('home')} className="block text-4xl font-serif text-white animate-fade-in-up" style={{animationDelay: '0.1s'}}>{t.nav.home}</button>
                <button onClick={() => handleNavClick('sprofessional')} className="block text-4xl font-serif text-zinc-400 hover:text-[#bf953f] animate-fade-in-up transition-colors text-left" style={{animationDelay: '0.2s'}}>{t.nav.s}</button>
                <button onClick={() => handleNavClick('sweet')} className="block text-4xl font-serif text-zinc-400 hover:text-[#bf953f] animate-fade-in-up transition-colors text-left" style={{animationDelay: '0.3s'}}>{t.nav.sweet}</button>
                <button onClick={() => handleNavClick('education')} className="block text-4xl font-serif text-zinc-400 hover:text-[#bf953f] animate-fade-in-up transition-colors text-left" style={{animationDelay: '0.4s'}}>{t.nav.edu}</button>
                <button onClick={() => handleNavClick('about')} className="block text-4xl font-serif text-zinc-400 hover:text-[#bf953f] animate-fade-in-up transition-colors text-left" style={{animationDelay: '0.5s'}}>{t.nav.about}</button>
             </div>

             <div className="mt-12 pt-12 border-t border-white/10 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                 <div className="flex gap-6 mb-8 overflow-x-auto pb-4">
                   {(['en', 'es', 'pt', 'jp', 'it', 'ar', 'cn'] as Language[]).map(lang => (
                       <button key={lang} onClick={() => setLanguage(lang)} className={`text-lg font-medium ${language === lang ? 'text-[#bf953f]' : 'text-zinc-600'}`}>
                           {lang.toUpperCase()}
                       </button>
                   ))}
                 </div>
                 <div className="flex gap-6 text-zinc-500">
                     <a href="https://www.facebook.com/share/17RRNbbb3u/" target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                     <a href="https://www.instagram.com/shairprof_usa/" target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                     <Linkedin size={24} />
                 </div>
             </div>
          </div>
      )}

      {/* Main Content Router */}
      {currentView === 'home' ? (
        <>
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest uppercase mb-8 animate-fade-in backdrop-blur-md text-[#bf953f]">
                    {t.tagline}
                    </span>
                    <h1 className="text-6xl md:text-9xl font-serif text-white mb-8 tracking-tighter leading-none animate-fade-in-up">
                    {t.titleStart} <span className="italic text-zinc-500">{t.titleEnd}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    {t.subtitle}
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <button 
                        onClick={handleConnect}
                        className="group relative px-8 py-4 bg-white text-black font-medium text-sm uppercase tracking-widest hover:bg-[#bf953f] hover:text-white transition-all duration-500"
                    >
                        {/* Radar Ping Effect - External Ring */}
                        <span className="absolute -inset-1 rounded-sm bg-[#bf953f] opacity-70 animate-ping group-hover:opacity-100 duration-1000"></span>
                        
                        {/* Radar Pulse Effect - Internal/Border */}
                        <span className="absolute -inset-1 rounded-sm border border-[#bf953f] opacity-50 animate-pulse"></span>

                        <span className="relative z-10 flex items-center gap-2">
                        <Sparkles size={16} className="animate-pulse" /> {t.ctaDiagnosis}
                        </span>
                    </button>
                    <button className="px-8 py-4 border border-white/20 text-white font-medium text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
                        {t.ctaShop}
                    </button>
                    </div>
                </div>
            </div>

            {/* Promotions Section */}
            <PromotionsSection t={t} />

            {/* Products Preview */}
            <div className="py-32 bg-zinc-950 relative reveal-on-scroll">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{t.collectionTitle}</h2>
                        <p className="text-zinc-500 font-light">{t.collectionSub}</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-[#bf953f] hover:text-white transition-colors">
                        {t.viewAll} <ArrowRight size={16} />
                    </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                          img: "https://images.unsplash.com/photo-1631729371254-42c2a89ddf17?q=80&w=2080&auto=format&fit=crop",
                          data: t.products.p1
                        },
                        { 
                          img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop",
                          data: t.products.p2
                        },
                        { 
                          img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2080&auto=format&fit=crop",
                          data: t.products.p3
                        }
                    ].map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] bg-zinc-900 mb-6 overflow-hidden">
                            <img 
                            src={item.img} 
                            alt="Product" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-1 group-hover:text-[#bf953f] transition-colors">{item.data.title}</h3>
                        <p className="text-sm text-zinc-500 mb-2">{item.data.desc}</p>
                        <span className="text-sm font-medium text-white">{item.data.price}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
      ) : currentView === 'sprofessional' ? (
        <SProfessionalPage language={language} t={t} />
      ) : currentView === 'sweet' ? (
        <SweetProfessionalPage language={language} t={t} />
      ) : currentView === 'education' ? (
        <EducationPage language={language} t={t} />
      ) : (
        <AboutPage language={language} t={t} />
      )}
      
      {/* Footer */}
      <Footer t={t} handleNavClick={handleNavClick} />

      {/* AI Overlay */}
      {isOverlayOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center animate-fade-in">
          <div className="absolute top-8 right-8 z-10">
             <button 
                onClick={handleDisconnect}
                className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
             >
               <X size={24} />
             </button>
          </div>
          
          <div className="w-full max-w-4xl px-6 flex flex-col items-center gap-12">
             <div className="flex flex-col items-center gap-4 animate-fade-in-up">
               <div className="px-4 py-1.5 rounded-full border border-[#bf953f]/30 bg-[#bf953f]/10 text-[#bf953f] text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#bf953f] animate-pulse" />
                 {status === LiveStatus.CONNECTED ? t.consultantActive : t.connecting}
               </div>
               
               {status === LiveStatus.CONNECTED && (
                 <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <Database size={12} />
                    <span>{t.kbActive}</span>
                 </div>
               )}
             </div>

             <div className="relative">
                <Visualizer volume={volumeLevel} isActive={status === LiveStatus.CONNECTED} />
             </div>

             <div className="text-center max-w-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <p className="text-2xl font-serif text-white leading-relaxed">
                  {status === LiveStatus.CONNECTED 
                    ? t.listening
                    : "Initializing secure connection to MA Fashion Neural Network..."}
                </p>
             </div>

             <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <ControlTray 
                    status={status}
                    isMuted={isMuted}
                    isVideoActive={isVideoActive}
                    onConnect={connect}
                    onDisconnect={handleDisconnect}
                    onToggleMute={toggleMute}
                    onToggleVideo={toggleVideo}
                />
             </div>
          </div>
          
          {/* Hidden Video Elements for Vision capabilities */}
          <video ref={videoRefLocal} className="hidden" autoPlay playsInline muted />
          <canvas ref={canvasRefLocal} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default App;
