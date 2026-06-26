
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles, Clock, ChevronRight, ChevronLeft, Globe, CheckCircle2, Beaker, Droplets, Wind, Zap, Flame, Crown, Activity, Check, ChevronDown, ShieldCheck, Lock, Eye } from 'lucide-react';

// --- Translation Data Type ---
type Language = 'en' | 'es' | 'pt' | 'it' | 'fr';

const enTranslation = {
  nav: { home: "Home", sweet: "Sweet Professional", s: "S Professional", edu: "Education", about: "About Us", partner: "Partner Access", all: "View All" },
  partner: {
      title: "Professional Access", subtitle: "Join the elite network of partners of MA Fashion LLC.", success: "Application Received", successMsg: "A representative will contact you shortly.",
      labels: { name: "Full Name", email: "Email Address", phone: "Phone Number", stylist: "Are you a licensed stylist?", salon: "Do you own a salon?", services: "Services Provided", yes: "Yes", no: "No", next: "Next Step", back: "Back", submit: "Submit Application", return: "Return to Home" },
      benefits: ["Wholesale pricing up to 40% off", "Access to MA Academy Masterclasses", "Marketing material & social media kit", "Dedicated account manager"],
      servicesList: ["Thermal Alignment", "Hair Botox", "Coloring", "Cuts", "Extensions", "Treatments", "Retail Sales"]
  },
  common: { 
    discover: "Discover More", collection: "Collection", maNews: "MA NEWS", featured: "Featured Collection", special: "Special Offer", learnMore: "Learn More", innovation: "Innovation & Science", luxury: "Exclusive & Luxurious", privacy: "Privacy Policy", terms: "Terms of Service", representatives: "Representatives", social: "Social", unitedStates: "United States", theInnovation: "The Innovation", theLuxury: "The Luxury", readMore: "Read More", howToUse: "Technical Application", benefits: "Key Benefits", mainAssets: "Main Technology", intensity: "Treatment Intensity", functions: "Primary Functions", 
    backTo: "Back to", buyForSalon: "Buy for Salon", resultsTitle: "Results that inspire", techManual: "Technical Manual", techManualDesc: "Fill in the details below to receive the technical manual via email.", aiAssistant: "AI Assistant", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Hydration", nutrition: "Nutrition", reconstruction: "Reconstruction", buyNow: "Buy Now", homeCare: "Home Care Maintenance"
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: May 2024",
    intro: "At MA Fashion LLC, we value your privacy and the protection of your personal data.",
    sections: [
      { title: "Information Collection", content: "We collect information you provide directly to us when you apply for our Partner Program, subscribe to our technical manuals, or interact with our AI Assistant." },
      { title: "Data Usage", content: "Your data is used strictly for professional certification, order processing, and providing technical support for our biotechnological lines." },
      { title: "Third-Party Sharing", content: "We do not sell your personal data. We only share information with certified logistics partners and authorized representatives to ensure service delivery." },
      { title: "Your Rights", content: "You have the right to access, correct, or delete your personal information at any time by contacting our support team." }
    ]
  },
  tagline: "Global Hair Biotechnology", titleStart: "The Science of", titleEnd: "Beauty.", subtitle: "MA Fashion LLC presents the future of professional hair care. Discover Sweet Professional and S Professional.", ctaDiagnosis: "24/7 Live Assistance", ctaShop: "View Collection", collectionTitle: "Exclusive Collections", collectionSub: "Professional Grade. Salon Exclusive.", viewAll: "View All", 
  promos: {
      ticker: "BREAKING: New Partner Program Available • Buy 5 Get 1 Free on The First Shampoo • Join the Revolution", comingUp: "Coming Up",
      items: [
          { title: "Salon Partner Program", desc: "Exclusive pricing and advanced education for licensed professionals.", cta: "Apply Now" },
          { title: "My Crown Launch", desc: "The revolution for curly hair is here. Define, hydrate, and memorize the curl with biotechnology.", cta: "Discover My Crown" },
          { title: "Master The Art", desc: "Join our next certification masterclass in the United States. Learn the secrets of enzymatic reconstruction.", cta: "Reserve Seat" }
      ]
  },
  footer: { about: "MA Fashion LLC leads the global market in hair biotechnology, providing high-performance solutions for beauty professionals.", links: "Quick Links", legal: "Legal", contact: "Contact", rights: "© 2024 MA Fashion LLC. All rights reserved." },
  sweet: { 
    title: "Sweet Professional", 
    desc: "The brand that revolutionized the market with the first thermal straightener in shampoo form. Innovation, speed, and safety.", 
    lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, 
    lineDescs: { thefirst: "The first straightening shampoo in the world. 5 international patents.", cronology: "Biotechnology mapping for personalized hair treatment.", sos: "Emergency rescue for chemically damaged hair." },
    details: {
      thefirst: {
        headline: "The first straightening shampoo in the world.",
        benefits: ["100% Formaldehyde free", "Ultra-fast application", "Safe for all hair types", "5 International patents"],
        assets: ["Hyaluronic Acid", "Organic Acids", "Exotic Oils"],
        intensity: { hydration: 50, nutrition: 30, reconstruction: 20 }
      },
      cronology: {
        headline: "Biotechnology mapping for personalized hair treatment.",
        benefits: ["Customized results", "Deep fiber restoration", "Long-lasting effect", "Biotechnological precision"],
        assets: ["Nano-Particles", "Amino Acids", "Vitamins"],
        intensity: { hydration: 40, nutrition: 40, reconstruction: 40 }
      },
      sos: {
        headline: "Emergency rescue for chemically damaged hair.",
        benefits: ["Stops breakage instantly", "Restores pH balance", "Rebuilds hair structure", "Intense recovery"],
        assets: ["Keratin", "Collagen", "Panthenol"],
        intensity: { hydration: 20, nutrition: 30, reconstruction: 100 }
      }
    }
  },
  sprofessional: {
    title: "S Professional", subtitle: "Advanced Hair Therapy Systems", desc: "A complete ecosystem of treatments designed for the modern stylist. From thermal alignment to deep reconstruction.", commonDesc: "Experience the ultimate hair transformation with our patented biotechnology. Designed for salon perfection.",
    lines: { nutrology: "Nutrology - Deep Nutrition", hidratherapy: "Hidratherapy - Ozone Hydration", brushing: "Brushing+ - Thermal Alignment", profusion: "Pro Fusion - Enzyme Reconstruction", mycrown: "My Crown - Curl Definition" },
    details: {
      nutrology: {
          headline: "Biotechnology & Natural Humectants",
          info: "Nutrology provides intense nutrition according to hair dryness. Using a unique blend of vegetable oils, it restores nutrients and lipids needed to maintain hair with shine, softness and silkiness.",
          benefits: ["Instant lipid replacement", "Diamond-like shine", "Anti-frizz protection", "Weightless movement"],
          assets: ["Lipidic Nano-Particles", "Amino Acid Complex", "Organic Shea Butter"],
          intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
          functions: [
            { title: "Nutrology Technology", desc: "Employs biotechnology for Intense Nutrition, ensuring greater permeation into the hair cortex for instant recovery and smoothness." },
            { title: "Key Functions", desc: "Intense nutrition for dry hair, antioxidant protection, recovery for chemically damaged hair, and hair cuticle repositioning." }
          ],
          homeCare: {
            title: "Home Care Nutrology",
            desc: "Feed your hair with essential lipids. Your hair's survival depends on the right nutrients. Experience weightless movement and a diamond-like shine that triggers pure emotional satisfaction.",
            cta: "Get it Now"
          }
      },
      hidratherapy: {
          headline: "Ozone Technology & Ultimate Hydration",
          benefits: ["Deep cellular hydration", "Ozone effect protection", "Extreme softness", "Revitalizes hair fiber"],
          assets: ["Active Ozone O3", "Hyaluronic Acid", "Blueberry Extract"],
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 },
          homeCare: {
            title: "Home Care Hidratherapy",
            desc: "Thirsty hair is vulnerable hair. Give it the hydration it needs to survive. Feel the extreme softness and revitalized fiber that only ozone technology can provide.",
            cta: "Get it Now"
          }
      },
      profusion: {
          headline: "Enzymatic High-Performance Reconstruction",
          benefits: ["Reverses chemical damage", "Strengthens disulfide bonds", "Restores elasticity", "Stops hair breakage"],
          assets: ["Proteolytic Enzymes", "Bio-Keratin", "Hydrolyzed Silk Protein"],
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 },
          homeCare: {
            title: "Home Care Pro Fusion",
            desc: "Stop the breakage and reclaim your hair's power. Rebuild disulfide bonds daily. Strong hair is a sign of health and dominance. Don't let your hair fall apart.",
            cta: "Get it Now"
          }
      },
      brushing: {
          headline: "Organic High-Speed Thermal Alignment",
          benefits: ["100% Formaldehyde free", "Ultra-fast application", "Intense mirrored shine", "Long-lasting smoothness"],
          assets: ["Taninoplasty Base", "Organic Acids", "Exotic Oils"],
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 },
          homeCare: {
            title: "Home Care Brushing",
            desc: "Protect your straight look and your peace of mind. Total thermal protection for your daily routine. Keep that mirrored shine and long-lasting smoothness every single day.",
            cta: "Get it Now"
          }
      },
      mycrown: {
          headline: "The Curvature Memory Revolution",
          benefits: ["Defines all curl types", "Locks in hydration", "Memorizes curvature", "Control extreme frizz"],
          assets: ["Curl Memory Technology", "Murumuru Butter", "Flaxseed Oil"],
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 },
          homeCare: {
            title: "Home Care My Crown",
            desc: "Your curls are your crown—protect your identity. Memorize your curvature with biotechnology. Feel the pride of perfectly defined, frizz-free curls that stay hydrated.",
            cta: "Get it Now"
          }
      }
    }
  },
  education: {
    title: "MA Academy", subtitle: "Master The Art", desc: "Immerse yourself in global events where science meets artistry. Our technical education elevates standards worldwide."
  },
  about: { 
    title: "Who We Are", 
    subtitle: "Global Leadership", 
    desc: "We are the architects of hair transformation. MA Fashion LLC unites science, nature, and artistry to empower professionals worldwide.", 
    ambassadorsTitle: "Artistic Ambassador Network", 
    ambassadorsDesc: "Our elite team of official artists in the United States. These master stylists define the trends and techniques of tomorrow.", 
    ambassadorList: [
        { name: "Katherine Avendaño", role: "Master Stylist & Educator", location: "United States" }, 
        { name: "Fernando Mendez", role: "Master Stylist", location: "United States" }, 
        { name: "Ohnayak Firpi", role: "Master Stylist", location: "United States" }, 
        { name: "Arnaldo Cruz", role: "Master Barber", location: "United States" },
        { name: "Nancy Rivera", role: "Professional Stylist & Technician", location: "United States" },
        { name: "Bruna Dourado", role: "Professional Stylist", location: "United States" },
        { name: "Karina Paranhos", role: "Professional Stylist", location: "United States" },
        { name: "Lisyet Torres", role: "Professional Stylist", location: "United States" }
    ], 
    repsTitle: "Executive Board", 
    stats: { years: "Years of Excellence", salons: "Partner Salons", countries: "Global Presence" }, 
    roles: { techAmb: "Founder, Ambassador & Intl Technician", ceo: "CEO & Founder", marketingDir: "Director of Marketing", opsDir: "Director of Operations", stylist: "Elite Stylist & Educator" } 
  }
};

const esTranslation = {
  nav: { home: "Inicio", sweet: "Sweet Professional", s: "S Professional", edu: "Educación", about: "Nosotros", partner: "Acceso Socios", all: "Ver Todos" },
  partner: {
      title: "Acceso Profesional", subtitle: "Únase a la red élite de socios de MA Fashion LLC.", success: "Solicitud Recibida", successMsg: "Un representante se pondrá en contacto con usted brevemente.",
      labels: { name: "Nombre Completo", email: "Correo Electrónico", phone: "Número de Teléfono", stylist: "¿Es usted estilista licenciado?", salon: "¿Es propietario de un salón?", services: "Servicios que ofrece", yes: "Sí", no: "No", next: "Siguiente Paso", back: "Atrás", submit: "Enviar Solicitud", return: "Volver al Inicio" },
      benefits: ["Precios mayoristas, minoristas o de salón", "Acceso a Masterclasses de Academia MA", "Kit de marketing y redes sociales", "Gerente de cuenta dedicado"],
      servicesList: ["Alineación Térmica", "Botox Capilar", "Coloración", "Cortes", "Extensiones", "Tratamientos", "Ventas al por menor"]
  },
  common: { 
    discover: "Descubrir Más", collection: "Colección", maNews: "NOTICIAS MA", featured: "Colección Destacada", special: "Oferta Especial", learnMore: "Saber Más", innovation: "Innovación y Ciencia", luxury: "Exclusivo y Lujoso", privacy: "Política de Privacidad", terms: "Términos de Servicio", representatives: "Representantes", social: "Social", unitedStates: "Estados Unidos", theInnovation: "La Innovación", theLuxury: "El Lujo", readMore: "Leer Más", howToUse: "Aplicación Técnica", benefits: "Beneficios Clave", mainAssets: "Tecnología Principal", intensity: "Intensidad del Tratamiento", functions: "Funciones Principales", 
    backTo: "Volver a", buyForSalon: "Comprar para Salón", resultsTitle: "Resultados que inspiran", techManual: "Manual Técnico", techManualDesc: "Complete los detalles a continuación para recibir el manual técnico por correo electrónico.", aiAssistant: "Asistente IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA",
    hydration: "Hidratación", nutrition: "Nutrición", reconstruction: "Reconstrucción", buyNow: "Comprar Ahora", homeCare: "Mantenimiento Home Care"
  },
  privacy: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: Mayo 2024",
    intro: "En MA Fashion LLC, valoramos su privacidad y la protección de sus datos personales.",
    sections: [
      { title: "Recolección de Información", content: "Recopilamos la información que usted nos proporciona directamente al solicitar nuestro Programa de Socios, suscribirse a nuestros manuales técnicos o interactuar con nuestro Asistente de IA." },
      { title: "Uso de Datos", content: "Sus datos se utilizan estrictamente para la certificación profesional, el procesamiento de pedidos y el soporte técnico de nuestras líneas biotecnológicas." },
      { title: "Intercambio con Terceros", content: "No vendemos sus datos personales. Solo compartimos información con socios logísticos certificados y representantes autorizados para garantizar la prestación del servicio." },
      { title: "Sus Derechos", content: "Usted tiene derecho a acceder, corregir o eliminar su información personal en cualquier momento poniéndose en contacto con nuestro equipo de soporte." }
    ]
  },
  tagline: "Biotecnologia Capilar Global", titleStart: "La Ciencia de", titleEnd: "la Belleza.", subtitle: "MA Fashion LLC presenta el futuro del cuidado profesional. Descubre Sweet Professional y S Professional.", ctaDiagnosis: "Asistencia En Vivo 24/7", ctaShop: "Ver Colección", collectionTitle: "Colecciones Exclusivas", collectionSub: "Grado Profesional. Exclusivo de Salón.", viewAll: "Ver Todo",
  promos: {
      ticker: "NOTICIA: Nuevo Programa de Socios • Compra 5 y Recibe 1 Gratis en The First Shampoo • Únete a la Revolución", comingUp: "Siguiente",
      items: [
          { title: "Programa de Socios de Salón", desc: "Precios exclusivos y educación avanzada para profesionales.", cta: "Aplicar Ahora" },
          { title: "Lanzamiento My Crown", desc: "La revolución para cabellos rizados está aquí. Define, hidrata y memoriza el rizo con biotecnología.", cta: "Descubrir My Crown" },
          { title: "Domina el Arte", desc: "Únete a nuestra próxima masterclass de certificación en Estados Unidos. Aprende los secretos de la reconstrucción enzimática.", cta: "Reservar Cupo" }
      ]
  },
  homeCards: { sweet: "The First Shampoo y Cronology. Reestructuración molecular para la transformación.", s: "Hidratherapy, Nutrology y My Crown. Ecosistema avanzado para la salud capilar." },
  footer: { about: "MA Fashion LLC lidera el mercado global en biotecnologia capilar, brindando soluciones de alto rendimiento para profesionales.", links: "Enlaces Rápidos", legal: "Legal", contact: "Contacto", rights: "© 2024 MA Fashion LLC. Todos los derechos reservados." },
  sweet: { 
    title: "Sweet Professional", 
    desc: "La marca que revolucionó el mercado con el primer alisador térmico en forma de champú. Innovación, rapidez y seguridad.", 
    lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, 
    lineDescs: { thefirst: "El primer champú alisador del mundo. 5 patentes internacionales.", cronology: "Mapeo biotecnológico para tratamientos capilares personalizados.", sos: "Rescate de emergencia para cabellos dañados químicamente." },
    details: {
      thefirst: {
        headline: "El primer champú alisador del mundo.",
        benefits: ["100% Libre de formol", "Aplicación ultra rápida", "Seguro para todo tipo de cabello", "5 Patentes internacionales"],
        assets: ["Ácido hialurónico", "Ácidos orgánicos", "Aceites exóticos"],
        intensity: { hydration: 50, nutrition: 30, reconstruction: 20 }
      },
      cronology: {
        headline: "Mapeo biotecnológico para tratamientos capilares personalizados.",
        benefits: ["Resultados personalizados", "Restauración profunda de la fibra", "Efecto duradero", "Precisión biotecnológica"],
        assets: ["Nano-partículas", "Aminoácidos", "Vitaminas"],
        intensity: { hydration: 40, nutrition: 40, reconstruction: 40 }
      },
      sos: {
        headline: "Rescate de emergencia para cabellos dañados químicamente.",
        benefits: ["Detiene la rotura al instante", "Restaura el equilibrio del pH", "Reconstruye la estructura capilar", "Recuperación intensa"],
        assets: ["Queratina", "Colágeno", "Pantenol"],
        intensity: { hydration: 20, nutrition: 30, reconstruction: 100 }
      }
    }
  },
  sprofessional: {
    title: "S Professional", subtitle: "Sistemas Avanzados de Terapia Capilar", desc: "Un ecosistema completo de tratamientos diseñados para el estilista moderno. Desde alineación térmica hasta reconstrucción profunda.", commonDesc: "Experimente la máxima transformación capilar con nuestra biotecnología patentada. Diseñado para la perfección en el salón.",
    lines: { nutrology: "Nutrology - Nutrición Profunda", hidratherapy: "Hidratherapy - Hidratación con Ozono", brushing: "Brushing+ - Alineación Térmica", profusion: "Pro Fusion - Reconstrucción Enzimática", mycrown: "My Crown - Definición de Rizos" },
    details: {
      nutrology: {
          headline: "Biotecnología y Humectantes Naturales",
          info: "Nutrology proporciona nutrición intensa de acuerdo con el resecamiento del cabello. Con un exclusivo blend de aceites vegetales, promueve la reposición de nutrientes y lípidos necesarios para mantener el brillo y la sedosidad.",
          benefits: ["Reemplazo lipídico instantáneo", "Brillo tipo diamante", "Protección anti-frizz", "Movimiento sin peso"],
          assets: ["Nano-partículas lipídicas", "Complejo de aminoácidos", "Manteca de karité orgánica"],
          intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
          functions: [
            { title: "Tecnología Nutrology", desc: "Emplea biotecnología para Nutrición Intensa, permitiendo una mayor permeación en el córtex capilar para una recuperación y suavidad instantáneas." },
            { title: "Funciones Principales", desc: "Nutrición intensa para cabellos secos, antioxidante, recuperación para cabellos dañados químicamente y reposicionamiento de cutículas." }
          ],
          homeCare: {
            title: "Home Care Nutrology",
            desc: "Alimenta tu cabello con lípidos esenciales. La supervivencia de tu fibra capilar depende de los nutrientes correctos. Experimenta un movimiento sin peso y un brillo tipo diamante que disparará tu satisfacción emocional.",
            cta: "Adquirir Ahora"
          }
      },
      hidratherapy: {
          headline: "Tecnología de Ozono e Hidratación Extrema",
          benefits: ["Hidratación celular profunda", "Protección efecto ozono", "Suavidad extrema", "Revitaliza la fibra capilar"],
          assets: ["Ozono activo O3", "Ácido hialurónico", "Extracto de arándano"],
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 },
          homeCare: {
            title: "Home Care Hidratherapy",
            desc: "¿Cabello sediento? Dale el agua que necesita para sobrevivir. Siente la suavidad extrema y la fibra revitalizada que solo la tecnología de ozono puede ofrecerte. Tu bienestar comienza aquí.",
            cta: "Adquirir Ahora"
          }
      },
      profusion: {
          headline: "Reconstrucción Enzimática de Alto Rendimiento",
          benefits: ["Revierte el daño químico", "Fortalece puentes de disulfuro", "Restaura la elasticidad", "Detiene la rotura"],
          assets: ["Enzimas proteolíticas", "Bio-queratina", "Proteína de seda hidrolizada"],
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 },
          homeCare: {
            title: "Home Care Pro Fusion",
            desc: "Detén la rotura y reclama el poder de tu cabello. Reconstruye los puentes de disulfuro diariamente. Un cabello fuerte es símbolo de salud y dominio. No permitas que tu imagen se debilite.",
            cta: "Adquirir Ahora"
          }
      },
      brushing: {
          headline: "Alineación Térmica Orgánica de Alta Velocidad",
          benefits: ["100% Libre de formol", "Aplicación ultra rápida", "Brillo espejado intenso", "Liso duradero"],
          assets: ["Base de taninoplastia", "Ácidos orgánicos", "Aceites exóticos"],
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 },
          homeCare: {
            title: "Home Care Brushing",
            desc: "Protege tu liso y tu tranquilidad. Protección térmica total para tu rutina diaria. Mantén ese brillo espejado y la suavidad duradera cada día. Seguridad absoluta para tu estilo.",
            cta: "Adquirir Ahora"
          }
      },
      mycrown: {
          headline: "La Revolución de la Memoria de Curvatura",
          benefits: ["Define todo tipo de rizos", "Retiene la hidratación", "Memoriza la curvatura", "Control extremo del frizz"],
          assets: ["Tecnología Curl Memory", "Manteca de Murumuru", "Aceite de linaza"],
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 },
          homeCare: {
            title: "Home Care My Crown",
            desc: "Tus rizos son tu corona: protege tu identidad. Memoriza tu curvatura con biotecnología. Siente el orgullo de unos rizos perfectamente definidos, sin frizz y siempre hidratados.",
            cta: "Adquirir Ahora"
          }
      }
    }
  },
  education: {
    title: "Academia MA", subtitle: "Domina el Arte", desc: "Sumérgete en eventos globales donde la ciencia se encuentra con el arte. Nuestra educación técnica eleva los estándares en todo el mundo."
  },
  about: { 
    title: "Quiénes Somos", 
    subtitle: "Liderazgo Global", 
    desc: "Somos los arquitectos de la transformación capilar. MA Fashion LLC une ciencia, naturaleza y arte para empoderar a los profesionales.", 
    ambassadorsTitle: "Red de Embajadores Artísticos", 
    ambassadorsDesc: "Nuestro equipo élite de artistas oficiales en Estados Unidos. Estilistas maestras que definen las tendencias y técnicas del mañana.", 
    ambassadorList: [
        { name: "Katherine Avendaño", role: "Estilista Master y Educadora", location: "Estados Unidos" }, 
        { name: "Fernando Mendez", role: "Master Stylist", location: "Estados Unidos" }, 
        { name: "Ohnayak Firpi", role: "Estilista Master", location: "Estados Unidos" }, 
        { name: "Arnaldo Cruz", role: "Barbero Master", location: "Estados Unidos" },
        { name: "Nancy Rivera", role: "Estilista Profesional y Técnica", location: "Estados Unidos" },
        { name: "Bruna Dourado", role: "Estilista Profesional", location: "Estados Unidos" },
        { name: "Karina Paranhos", role: "Estilista Profesional", location: "Estados Unidos" },
        { name: "Lisyet Torres", role: "Estilista Profesional", location: "Estados Unidos" }
    ], 
    repsTitle: "Junta Directiva", 
    stats: { years: "Años de Excelencia", salons: "Salones Asociados", countries: "Presencia Global" }, 
    roles: { techAmb: "Fundadora, Embajadora y Técnica Intl", ceo: "CEO y Fundador", marketingDir: "Directora de Marketing", opsDir: "Director de Operaciones", stylist: "Estilista Elite y Educadora" } 
  }
};

const ptTranslation = {
  nav: { home: "Início", sweet: "Sweet Professional", s: "S Professional", edu: "Educação", about: "Sobre Nós", partner: "Acesso Parceiros", all: "Ver Todos" },
  partner: {
      title: "Acesso Profissional", subtitle: "Junte-se à rede de elite da MA Fashion LLC.", success: "Candidatura Recebida", successMsg: "Um representante entrará em contato em breve.",
      labels: { name: "Nome Completo", email: "E-mail", phone: "Telefone", stylist: "Você é um estilista licenciado?", salon: "Você possui um salão?", services: "Servizi prestados", yes: "Sim", no: "Não", next: "Próximo Passo", back: "Voltar", submit: "Enviar Candidatura", return: "Voltar ao Início" },
      benefits: ["Preços de atacado de até 40% de desconto", "Acesso a Masterclasses MA", "Kit de marketing e mídia social", "Gerente de conta dedicado"],
      servicesList: ["Alinhamento Térmico", "Hair Botox", "Coloração", "Cortes", "Extensões", "Tratamentos", "Vendas a Varejo"]
  },
  common: { 
    discover: "Descubra Mais", collection: "Coleção", maNews: "NOTÍCIAS MA", featured: "Coleção em Destaque", special: "Oferta Especial", learnMore: "Saiba Mais", innovation: "Innovation e Ciência", luxury: "Exclusivo e Luxuoso", privacy: "Política de Privacidade", terms: "Termos de Serviço", representatives: "Representantes", social: "Social", unitedStates: "Estados Unidos", theInnovation: "A Inovação", theLuxury: "O Luxo", readMore: "Ler Mais", howToUse: "Aplicação Técnica", benefits: "Principais Benefícios", mainAssets: "Tecnologia Principal", intensity: "Intensidade do Tratamiento", functions: "Principais Funções", 
    backTo: "Voltar para", buyForSalon: "Comprar para Salão", resultsTitle: "Resultados que inspiran", techManual: "Manual Técnico", techManualDesc: "Preencha os detalhes abaixo para receber o manual técnico por e-mail.", aiAssistant: "Assistente IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Hidratação", nutrition: "Nutrition", reconstruction: "Reconstrução", buyNow: "Comprar Agora", homeCare: "Manutenção Home Care"
  },
  privacy: {
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: Maio 2024",
    intro: "Na MA Fashion LLC, valorizamos sua privacidade e a proteção de seus dados pessoais.",
    sections: [
      { title: "Coleta de Informações", content: "Coletamos informações que você nos fornece diretamente ao se candidatar ao nosso Programa de Parceiros, assinar nossos manuais técnicos ou interagir com nosso Assistente de IA." },
      { title: "Uso de Dados", content: "Seus data são usados estritamente para certificação profissional, processamento de pedidos e suporte técnico para nossas linhas biotecnológicas." },
      { title: "Compartilhamento com Terceiros", content: "Não vendemos seus dados pessoais. Apenas compartilhamos informações com parceiros logísticos certificados e representantes autorizados." },
      { title: "Seus Direitos", content: "Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento, entrando em contato com nossa equipe de suporte." }
    ]
  },
  tagline: "Biotecnologia Capilar Global", titleStart: "A Ciência da", titleEnd: "Beleza.", subtitle: "A MA Fashion LLC apresenta o futuro do cuidado capilar profesional. Descubra Sweet e S Professional.", ctaDiagnosis: "Assistência ao Vivo 24/7", ctaShop: "Ver Coleção", collectionTitle: "Coleções Exclusivas", collectionSub: "Grau Profissional. Exclusivo para Salões.", viewAll: "Ver Tudo",
  promos: {
      ticker: "NOTÍCIA: Novo Programa de Parceiros • Compre 5 Leve 1 Grátis no The First Shampoo • Junte-se à Revolução", comingUp: "Próximo",
      items: [
          { title: "Programa de Parceiros", desc: "Preços exclusivos e educação avançada para profissionais licenciados.", cta: "Candidate-se Agora" },
          { title: "Lançamento My Crown", desc: "A revolução para cabelos cacheados. Defina, hidrate e memorize a curvatura.", cta: "Descubra My Crown" },
          { title: "Domine a Arte", desc: "Participe da nossa próxima certificação nos EUA. Aprenda os segredos da reconstrução enzimática.", cta: "Reserve seu Lugar" }
      ]
  },
  footer: { about: "A MA Fashion LLC lidera o mercado global em biotecnologia capilar, fornecendo soluções de alto desempenho.", links: "Links Rápidos", legal: "Jurídico", contact: "Contato", rights: "© 2024 MA Fashion LLC. Todos os direitos reservados." },
  sweet: { 
    title: "Sweet Professional", 
    desc: "A marca que revolucionou o mercado con o primeiro alisador térmico em champô. Inovação e segurança.", 
    lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, 
    lineDescs: { thefirst: "O primeiro champô alisador do mundo. 5 patentes.", cronology: "Mapeamento biotecnológico para tratamentos personalizados.", sos: "Resgate de segurança para cabelos danificados." },
    details: {
      thefirst: {
        headline: "O primeiro xampu alisador do mundo.",
        benefits: ["100% Livre de formol", "Aplicação ultra rápida", "Seguro para todos os tipos de cabelo", "5 Patentes internacionais"],
        assets: ["Ácido hialurônico", "Ácidos orgânicos", "Óleos exóticos"],
        intensity: { hydration: 50, nutrition: 30, reconstruction: 20 }
      },
      cronology: {
        headline: "Mapeamento biotecnológico para tratamentos capilares personalizados.",
        benefits: ["Resultados personalizados", "Restauração profunda da fibra", "Efeito duradouro", "Precisão biotecnológica"],
        assets: ["Nano-partículas", "Aminoácidos", "Vitaminas"],
        intensity: { hydration: 40, nutrition: 40, reconstruction: 40 }
      },
      sos: {
        headline: "Resgate de emergência para cabelos quimicamente danificados.",
        benefits: ["Interrompe a quebra instantaneamente", "Restaura o equilíbrio do pH", "Reconstrói a estrutura capilar", "Recuperação intensa"],
        assets: ["Queratina", "Colágeno", "Pantenol"],
        intensity: { hydration: 20, nutrition: 30, reconstruction: 100 }
      }
    }
  },
  sprofessional: {
    title: "S Professional", subtitle: "Sistemas de Terapia Capilar", desc: "Um ecossistema completo de tratamentos para o estilista moderno.", commonDesc: "Experimente a transformação capilar suprema com nossa biotecnologia patenteada.",
    lines: { nutrology: "Nutrology - Nutrição Profunda", hidratherapy: "Hidratherapy - Hidratação Ozono", brushing: "Brushing+ - Alinhamento Térmico", profusion: "Pro Fusion - Reconstrução Enzimática", mycrown: "My Crown - Definição de Cachos" },
    details: {
      nutrology: {
          headline: "Biotecnologia e Umectantes Naturais",
          info: "Nutrology fornece nutrição intensa de acordo com o ressecamento do cabelo. Usando um blend único de óleos vegetais.",
          benefits: ["Reposição lipídica instantânea", "Brilho de diamante", "Proteção anti-frizz", "Movimento leve"],
          assets: ["Nano-partículas lipídicas", "Complexo de Aminoácidos", "Manteiga de Karité Orgânica"],
          intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
          functions: [{ title: "Tecnologia Nutrology", desc: "Nutrição Intensa com alta permeação no córtex." }, { title: "Funções Principais", desc: "Nutrição para cabelos secos e proteção antioxidante." }],
          homeCare: {
            title: "Home Care Nutrology",
            desc: "Alimente seu cabelo com lipídios essenciais. A sobrevivência da sua fibra capilar depende dos nutrientes corretos. Experimente um brilho de diamante.",
            cta: "Adquirir Agora"
          }
      },
      hidratherapy: { 
          headline: "Tecnologia de Ozono e Hidratação Extrema", 
          benefits: ["Hidratação celular profunda", "Proteção de efeito ozono"], 
          assets: ["Ozônio Ativo O3", "Ácido hialurônico"], 
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 },
          homeCare: {
            title: "Home Care Hidratherapy",
            desc: "Cabelo sedento? Dê a ele a água que precisa para sobreviver. Sinta a suavidade extrema e a fibra revitalizada.",
            cta: "Adquirir Agora"
          }
      },
      profusion: { 
          headline: "Reconstrução Enzimática de Alto Desempenho", 
          benefits: ["Reverte danos químicos", "Restaura elasticidade"], 
          assets: ["Enzimas Proteolíticas", "Bio-Keratina"], 
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 },
          homeCare: {
            title: "Home Care Pro Fusion",
            desc: "Interrompa a quebra e recupere o poder do seu cabelo. Reconstrua as pontes de dissulfeto diariamente.",
            cta: "Adquirir Agora"
          }
      },
      brushing: { 
          headline: "Alinhamento Térmico Orgânico de Alta Velocidade", 
          benefits: ["100% Livre de Formol", "Aplicação ultra-rapida"], 
          assets: ["Base Taninoplastia", "Ácidos Orgânicos"], 
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 },
          homeCare: {
            title: "Home Care Brushing",
            desc: "Proteja seu liso e sua tranquilidade. Proteção térmica total para sua rotina diária. Mantenha o brilho espelhado.",
            cta: "Adquirir Agora"
          }
      },
      mycrown: { 
          headline: "A Revolução da Memória de Curvatura", 
          benefits: ["Define todos os tipos de cachos", "Memoriza curvatura"], 
          assets: ["Tecnologia Curl Memory", "Burro di Murumuru", "Olio di Lino"], 
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 },
          homeCare: {
            title: "Home Care My Crown",
            desc: "Seus cachos são sua coroa: proteja sua identidade. Memorize sua curvatura com biotecnologia.",
            cta: "Adquirir Agora"
          }
      }
    }
  },
  education: { title: "Academia MA", subtitle: "Domine a Arte", desc: "Mergulhe em eventos globais onde a ciência encontra a arte. Nossa educação técnica eleva os padrões." },
  about: { 
    title: "Quem Somos", 
    subtitle: "Liderança Global", 
    desc: "Somos os arquitectos da transformação capilar. MA Fashion LLC une ciência e arte.", 
    ambassadorsTitle: "Red de Embaixadores Artísticos", 
    ambassadorsDesc: "Nossa equipe de elite de artistas oficiais nos EUA.", 
    ambassadorList: [
        { name: "Katherine Avendaño", role: "Estilista Master e Educadora", location: "EUA" }, 
        { name: "Fernando Mendez", role: "Master Stylist", location: "EUA" }, 
        { name: "Ohnayak Firpi", role: "Master Stylist", location: "EUA" }, 
        { name: "Arnaldo Cruz", role: "Master Barber", location: "EUA" },
        { name: "Nancy Rivera", role: "Estilista Profissional e Técnica", location: "EUA" },
        { name: "Bruna Dourado", role: "Estilista Profissional", location: "EUA" },
        { name: "Karina Paranhos", role: "Estilista Profesional", location: "EUA" },
        { name: "Lisyet Torres", role: "Estilista Profissional", location: "EUA" }
    ], 
    repsTitle: "Conselho Executivo", 
    stats: { years: "Anos de Excelencia", salons: "Salões Parceiros", countries: "Presenza Globale" }, 
    roles: { techAmb: "Fundadora, Embaixadora & Técnica Intl", ceo: "CEO & Fundador", marketingDir: "Directora de Marketing", opsDir: "Director de Operações", stylist: "Estilista Elite e Educadora" } 
  }
};

const itTranslation = {
  nav: { home: "Home", sweet: "Sweet Professional", s: "S Professional", edu: "Formazione", about: "Chi Siamo", partner: "Accesso Partner", all: "Vedi Tutto" },
  partner: {
      title: "Accesso Professionale", subtitle: "Unisciti alla rete d'élite di MA Fashion LLC.", success: "Candidatura Ricevuta", successMsg: "Un rappresentante ti contatterà presto.",
      labels: { name: "Nome Completo", email: "E-mail", phone: "Telefono", stylist: "Sei uno stilista certificato?", salon: "Possiedi un salone?", services: "Servizi offerti", yes: "Sì", no: "No", next: "Avanti", back: "Indietro", submit: "Invia Candidatura", return: "Torna alla Home" },
      benefits: ["Prezzi all'ingrosso fino al 40% di sconto", "Accesso alle Masterclass MA", "Kit marketing & social media", "Account manager dedicato"],
      servicesList: ["Allineamento Termico", "Hair Botox", "Colorazione", "Tagli", "Extension", "Trattamenti", "Vendite al Dettaglio"]
  },
  common: { 
    discover: "Scopri di Più", collection: "Colezione", maNews: "MA NEWS", featured: "Collezione in Primo Piano", special: "Offerta Especial", learnMore: "Ulteriori Informazioni", innovation: "Innovazione e Scienza", luxury: "Esclusivo e Lussuoso", privacy: "Privacy Policy", terms: "Termini di Servizio", representatives: "Rappresentanti", social: "Social", unitedStates: "Stati Uniti", theInnovation: "L'Innovazione", theLuxury: "Il Lusso", readMore: "Leggi di Più", howToUse: "Applicazione Tecnica", benefits: "Vantaggi Chiave", mainAssets: "Tecnologia Principale", intensity: "Intensità del Trattamento", functions: "Funzioni Primarie", 
    backTo: "Torna a", buyForSalon: "Acquista per il Salone", resultsTitle: "Risultati che ispirano", techManual: "Manuale Tecnico", techManualDesc: "Compila i dettagli per ricevere il manuale tecnico via email.", aiAssistant: "Assistente IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Idratazione", nutrition: "Nutrizione", reconstruction: "Ricostruzione", buyNow: "Acquista Ora", homeCare: "Mantenimento Home Care"
  },
  privacy: {
    title: "Informativa sulla Privacy",
    lastUpdated: "Ultimo aggiornamento: Maggio 2024",
    intro: "Presso MA Fashion LLC, diamo valore alla tua privacy e alla protezione dei tuoi dati personali.",
    sections: [
      { title: "Raccolta di Informazioni", content: "Raccogliamo informazioni fornite direttamente da te quando richiedi il nostro Programma Partner, ti iscrivi ai nostri manuali tecnici o interagisci con il nostro Assistente AI." },
      { title: "Uso dei Dati", content: "I tuoi dati vengono utilizzati esclusivamente per la certificazione professionale, l'elaborazione degli ordini e la fornitura di supporto tecnico per le nostre linee biotecnologiche." },
      { title: "Condivisione con Terze Parti", content: "Non vendiamo i tuoi dati personali. Condividiamo le informazioni solo con partner logistici certificati e rappresentanti autorizzati." },
      { title: "I Tuoi Diritti", content: "Hai il diritto di accedere, correggere o eliminare le tue informazioni personali a qualsiasi momento contattando il nostro team di supporto." }
    ]
  },
  tagline: "Biotecnologia Capillare Globale", titleStart: "La Scienza della", titleEnd: "Bellezza.", subtitle: "MA Fashion LLC presenta il futuro della cura capillare professionale. Scopri Sweet e S Professional.", ctaDiagnosis: "Assistenza Live 24/7", ctaShop: "Vedi Collezione", collectionTitle: "Collezioni Esclusive", collectionSub: "Grado Professionale. Esclusiva per Saloni.", viewAll: "Vedi Tutto",
  promos: {
      ticker: "NOVITÀ: Nuovo Programma Partner • Prendi 5 e ricevi 1 gratis su The First Shampoo • Unisciti alla Rivoluzione", comingUp: "In Arrivo",
      items: [
          { title: "Programma Partner Salone", desc: "Prezzi esclusivi e formazione avanzata per professionisti.", cta: "Candidati Ora" },
          { title: "Lancio My Crown", desc: "La rivoluzione per i capelli ricci. Definisci, idrata e memorizza la curvatura.", cta: "Scopri My Crown" },
          { title: "Domina l'Arte", desc: "Partecipa alla nostra prossima certificazione negli USA. Scopri i segreti della ricostruzione enzimatica.", cta: "Prenota Posto" }
      ]
  },
  footer: { about: "MA Fashion LLC è leader nel mercato globale della biotecnologia capillare, offrendo soluzioni ad alte prestazioni.", links: "Link Rapidi", legal: "Legale", contact: "Contatti", rights: "© 2024 MA Fashion LLC. Tutti i diritti riservati." },
  sweet: { 
    title: "Sweet Professional", 
    desc: "Il marchio che ha rivoluzionato il mercato con il primo lisciante termico in shampoo. Innovazione e sicurezza.", 
    lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, 
    lineDescs: { thefirst: "Il primo shampoo lisciante al mondo. 5 brevetti.", cronology: "Mappatura biotecnologica per trattamenti personalizzati.", sos: "Soccorso d'emergenza per capelli danneggiati chimicamente." },
    details: {
      thefirst: {
        headline: "Il primo shampoo lisciante al mondo.",
        benefits: ["100% Senza formaldeide", "Applicazione ultra rapida", "Sicuro per tutti i tipi di capelli", "5 Brevetti internazionali"],
        assets: ["Acido ialuronico", "Acidi organici", "Oli esotici"],
        intensity: { hydration: 50, nutrition: 30, reconstruction: 20 }
      },
      cronology: {
        headline: "Mappatura biotecnologica per trattamenti capelli personalizzati.",
        benefits: ["Risultati personalizzati", "Restauro profondo della fibra", "Effetto a lunga durata", "Precisione biotecnologica"],
        assets: ["Nano-particelle", "Aminoacidi", "Vitamine"],
        intensity: { hydration: 40, nutrition: 40, reconstruction: 40 }
      },
      sos: {
        headline: "Soccorso di emergenza per capelli danneggiati chimicamente.",
        benefits: ["Ferma la rottura istantaneamente", "Ripristina l'equilibrio del pH", "Ricostruisce la struttura del capello", "Recupero intenso"],
        assets: ["Cheratina", "Collagene", "Pantenolo"],
        intensity: { hydration: 20, nutrition: 30, reconstruction: 100 }
      }
    }
  },
  sprofessional: {
    title: "S Professional", subtitle: "Sistemi di Terapia Capillare", desc: "Un ecosistema completo di trattamenti per lo stilista moderno.", commonDesc: "Sperimenta la trasformazione capillare definitiva con la nostra biotecnologia.",
    lines: { nutrology: "Nutrology - Nutrizione Profonda", hidratherapy: "Hidratherapy - Idratazione Ozono", brushing: "Brushing+ - Allineamento Termico", profusion: "Pro Fusion - Ricostruzione Enzimatica", mycrown: "My Crown - Definizione Ricci" },
    details: {
      nutrology: {
          headline: "Biotecnologia e Umettanti Naturali",
          info: "Nutrology fornisce una nutrizione intensa in base alla secchezza dei capelli. Utilizza una miscela unica di oli vegetali.",
          benefits: ["Sostituzione lipidica istantanea", "Brillantezza diamante", "Protezione anti-frizz", "Movimento leggero"],
          assets: ["Nano-Particelle Lipidiche", "Complesso di Aminoacidi", "Burro di Karitè Bio"],
          intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
          functions: [{ title: "Tecnologia Nutrology", desc: "Nutrizione Intensa con alta penetrazione nel cortex." }, { title: "Funzioni Chiave", desc: "Nutrizione per capelli secchi e protezione antiossidante." }],
          homeCare: {
            title: "Home Care Nutrology",
            desc: "Nutri i tuoi capelli con lipidi essenziali. La sopravvivenza della tua fibra capillare dipende dai nutrienti corretti.",
            cta: "Acquista Ora"
          }
      },
      hidratherapy: { 
          headline: "Tecnologia Ozono e Idratazione Estrema", 
          benefits: ["Idratazione cellulare profonda", "Effetto ozono protettivo"], 
          assets: ["Ozono Attivo O3", "Acido Ialuronico"], 
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 },
          homeCare: {
            title: "Home Care Hidratherapy",
            desc: "Capelli assetati? Dai loro l'acqua di cui hanno bisogno per sopravvivere. Senti l'estrema morbidezza.",
            cta: "Acquista Ora"
          }
      },
      profusion: { 
          headline: "Ricostruzione Enzimatica ad Alte Prestazioni", 
          benefits: ["Inverte il danno chimico", "Ripristina elasticità"], 
          assets: ["Enzimi Proteolitici", "Bio-Cheratina"], 
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 },
          homeCare: {
            title: "Home Care Pro Fusion",
            desc: "Ferma la rottura e reclama il potere dei tuoi capelli. Ricostruisci i ponti di disolfuro ogni giorno.",
            cta: "Acquista Ora"
          }
      },
      brushing: { 
          headline: "Allineamento Termico Organico Veloce", 
          benefits: ["100% Senza Formaldeide", "Applicazione ultra-veloce"], 
          assets: ["Base Taninoplastia", "Acidi Organici"], 
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 },
          homeCare: {
            title: "Home Care Brushing",
            desc: "Proteggi il tuo liscio e la tua tranquillità. Protezione termica totale per la tua routine quotidiana.",
            cta: "Acquista Ora"
          }
      },
      mycrown: { 
          headline: "La Rivoluzione della Memoria de Curvatura", 
          benefits: ["Definisce tutti i tipi di ricci", "Memoriza curvatura"], 
          assets: ["Tecnologia Curl Memory", "Murumuru Butter", "Olio di Lino"], 
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 },
          homeCare: {
            title: "Home Care My Crown",
            desc: "I tuoi ricci sono la tua corona: proteggi la tua identità. Memorizza la tua curvatura con la biotecnologia.",
            cta: "Acquista Ora"
          }
      }
    }
  },
  education: { title: "MA Academy", subtitle: "Domina l'Arte", desc: "Immergiti negli eventi globali dove la scienza incontra l'arte. La nostra formazione eleva gli standard." },
  about: { 
    title: "Chi Siamo", 
    subtitle: "Leadership Globale", 
    desc: "Siamo gli architetti della trasformazione capillare. MA Fashion LLC unisce scienza e arte.", 
    ambassadorsTitle: "Rete di Ambasciatori Artistici", 
    ambassadorsDesc: "Il nostro team d'élite di artisti ufficiali negli USA.", 
    ambassadorList: [
        { name: "Katherine Avendaño", role: "Master Stylist & Educatrice", location: "Stati Uniti" }, 
        { name: "Fernando Mendez", role: "Master Stylist", location: "Stati Uniti" }, 
        { name: "Ohnayak Firpi", role: "Master Stylist", location: "Stati Uniti" }, 
        { name: "Arnaldo Cruz", role: "Master Barber", location: "Stati Uniti" },
        { name: "Nancy Rivera", role: "Stylist Professionista e Tecnica", location: "Stati Uniti" },
        { name: "Bruna Dourado", role: "Stylist Professionista", location: "Stati Uniti" },
        { name: "Karina Paranhos", role: "Stylist Professionista", location: "Stati Uniti" },
        { name: "Lisyet Torres", role: "Stylist Professionista", location: "Stati Uniti" }
    ], 
    repsTitle: "Consiglio Direttivo", 
    stats: { years: "Anni di Eccellenza", salons: "Saloni Partner", countries: "Presenza Globale" }, 
    roles: { techAmb: "Fondatrice, Ambasciatrice & Tecnico Intl", ceo: "CEO & Fondatore", marketingDir: "Direttore Marketing", opsDir: "Direttore Operativo", stylist: "Elite Stylist & Educatrice" } 
  }
};

const frTranslation = {
  nav: { home: "Accueil", sweet: "Sweet Professional", s: "S Professional", edu: "Éducation", about: "À Propos", partner: "Accès Partenaire", all: "Voir Tout" },
  partner: {
      title: "Accès Professionnel", subtitle: "Rejoignez le réseau d'élite des partenaires de MA Fashion LLC.", success: "Demande Reçue", successMsg: "Un représentant vous contactera sous peu.",
      labels: { name: "Nom Complet", email: "Adresse E-mail", phone: "Numéro de Téléphone", stylist: "Êtes-vous un styliste diplômé ?", salon: "Possédez-vous un salon ?", services: "Services Proposés", yes: "Oui", no: "Non", next: "Étape Suivante", back: "Retour", submit: "Envoyer la Demande", return: "Retour à l'Accueil" },
      benefits: ["Prix de gros jusqu'à 40% de réduction", "Accès aux Masterclasses MA Academy", "Matériel marketing et kit réseaux sociaux", "Gestionnaire de compte dédié"],
      servicesList: ["Alignement Thermique", "Botox Capillaire", "Coloration", "Coupes", "Extensions", "Traitements", "Vente au Détail"]
  },
  common: { 
    discover: "Découvrir Plus", collection: "Collection", maNews: "MA NEWS", featured: "Collection Vedette", special: "Offre Spéciale", learnMore: "En Savoir Plus", innovation: "Innovation & Science", luxury: "Exclusif & Luxueux", privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation", representatives: "Représentants", social: "Social", unitedStates: "États-Unis", theInnovation: "L'Innovation", theLuxury: "Le Luxe", readMore: "Lire la Suite", howToUse: "Application Technique", benefits: "Avantages Clés", mainAssets: "Technologie Principale", intensity: "Intensité du Traitement", functions: "Fonctions Principales", 
    backTo: "Retour à", buyForSalon: "Acheter pour le Salon", resultsTitle: "Des résultats qui inspirent", techManual: "Manuel Technique", techManualDesc: "Remplissez les détails ci-dessous pour recevoir le manuel technique par e-mail.", aiAssistant: "Assistant IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Hydratation", nutrition: "Nutrition", reconstruction: "Reconstruction", buyNow: "Acheter Maintenant", homeCare: "Entretien Home Care"
  },
  privacy: {
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : Mai 2024",
    intro: "Chez MA Fashion LLC, nous accordons une grande importance à votre vie privée et à la protection de vos données personnelles.",
    sections: [
      { title: "Collecte d'Informations", content: "Nous collectons les informations que vous nous fournissez directement lorsque vous postulez à notre programme de partenariat, vous inscrivez à nos manuels techniques ou interagissez avec notre assistant IA." },
      { title: "Utilisation des Données", content: "Vos données sont utilisées strictement pour la certification professionnelle, le traitement des commandes et le support technique de nos lignes biotechnologiques." },
      { title: "Partage avec des Tiers", content: "Nous ne vendons pas vos données personnelles. Nous partageons uniquement les informations avec des partenaires logistiques certifiés et des représentants autorisés." },
      { title: "Vos Droits", content: "Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles à tout moment en contactant notre équipe d'assistance." }
    ]
  },
  tagline: "Biotechnologie Capillaire Mondiale", titleStart: "La Science de", titleEnd: "la Beauté.", subtitle: "MA Fashion LLC présente le futur des soins capillaires professionnels. Découvrez Sweet Professional et S Professional.", ctaDiagnosis: "Assistance en Direct 24/7", ctaShop: "Voir la Collection", collectionTitle: "Collections Exclusives", collectionSub: "Qualité Professionnelle. Exclusivité Salon.", viewAll: "Voir Tout", 
  promos: {
      ticker: "FLASH : Nouveau Programme de Partenariat Disponible • Achetez 5 recevez 1 gratuit sur The First Shampoo • Rejoignez la Révolution", comingUp: "À Suivre",
      items: [
          { title: "Programme Partenaire Salon", desc: "Prix exclusifs et formation avancée pour les professionnels diplômés.", cta: "Postuler Maintenant" },
          { title: "Lancement My Crown", desc: "La révolution pour les cheveux bouclés est là. Définissez, hydratez et mémorisez la boucle.", cta: "Découvrir My Crown" },
          { title: "Maîtriser l'Art", desc: "Rejoignez notre prochaine masterclass de certification aux États-Unis. Apprenez les secrets de la reconstruction enzymatique.", cta: "Réserver une Place" }
      ]
  },
  footer: { about: "MA Fashion LLC est leader sur le marché mondial de la biotechnologie capillaire, fournissant des solutions de haute performance.", links: "Liens Rapides", legal: "Légal", contact: "Contact", rights: "© 2024 MA Fashion LLC. Tous droits réservés." },
  sweet: { 
    title: "Sweet Professional", 
    desc: "La marque qui a révolutionné le marché avec le premier lisseur thermique sous forme de shampooing. Innovation et sécurité.", 
    lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, 
    lineDescs: { thefirst: "Le premier shampooing lissant au monde. 5 brevets internationaux.", cronology: "Cartographie biotechnologique pour un traitement capillaire personnalisé.", sos: "Secours d'urgence pour cheveux chimiquement endommagés." },
    details: {
      thefirst: {
        headline: "Le premier shampooing lissant au monde.",
        benefits: ["100% Sans formaldéhyde", "Application ultra-rapide", "Sûr pour tous les types de cheveux", "5 Brevets internationaux"],
        assets: ["Acide hyaluronique", "Acides organiques", "Huiles exotiques"],
        intensity: { hydration: 50, nutrition: 30, reconstruction: 20 }
      },
      cronology: {
        headline: "Cartographie biotechnologique pour un traitement capillaire personnalisé.",
        benefits: ["Résultats personnalisés", "Restauration profonde de la fibre", "Effet longue durée", "Précision biotechnologique"],
        assets: ["Nano-particules", "Acides aminés", "Vitamines"],
        intensity: { hydration: 40, nutrition: 40, reconstruction: 40 }
      },
      sos: {
        headline: "Secours d'urgence pour les cheveux chimiquement endommagés.",
        benefits: ["Arrête la casse instantanément", "Restaure l'équilibre du pH", "Reconstruit la structure du cheveu", "Récupération intense"],
        assets: ["Kératine", "Collagène", "Panthénol"],
        intensity: { hydration: 20, nutrition: 30, reconstruction: 100 }
      }
    }
  },
  sprofessional: {
    title: "S Professional", subtitle: "Systèmes de Thérapie Capillaire Avancés", desc: "Un écosystème complet de traitements pour le styliste moderne.", commonDesc: "Découvrez la transformation capillaire ultime avec notre biotechnologie brevetée.",
    lines: { nutrology: "Nutrology - Nutrition Profonde", hidratherapy: "Hidratherapy - Hydratation à l'Ozone", brushing: "Brushing+ - Alignement Thermique", profusion: "Pro Fusion - Reconstruction Enzymatique", mycrown: "My Crown - Définition des Boucles" },
    details: {
      nutrology: {
          headline: "Biotechnologie & Humectants Naturels",
          info: "Nutrology offre une nutrition intense selon la sécheresse des cheveux. Utilise un mélange unique d'huiles végétales.",
          benefits: ["Remplacement lipidique instantané", "Brillance diamant", "Protection anti-frisottis", "Mouvement léger"],
          assets: ["Nano-Particules Lipidiques", "Complexe d'Acides Aminés", "Beurre de Karité Bio"],
          intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
          functions: [{ title: "Technologie Nutrology", desc: "Nutrition Intense avec haute pénétration dans le cortex." }, { title: "Fonctions Clés", desc: "Nutrition pour cheveux secs et protection antioxydante." }],
          homeCare: {
            title: "Home Care Nutrology",
            desc: "Nourrissez vos cheveux avec des lipides essentiels. La survie de votre fibre capillaire dépend des bons nutriments.",
            cta: "Acheter Maintenant"
          }
      },
      hidratherapy: { 
          headline: "Technologie à l'Ozone & Hydratation Ultime", 
          benefits: ["Hydratation cellulaire profonde", "Protection effet ozone"], 
          assets: ["Ozone Actif O3", "Acide Hyaluronique"], 
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 },
          homeCare: {
            title: "Home Care Hidratherapy",
            desc: "Cheveux assoiffés ? Donnez-leur l'eau dont ils ont besoin pour survivre. Sentez la douceur extrême.",
            cta: "Acheter Maintenant"
          }
      },
      profusion: { 
          headline: "Reconstruction Enzymatique Haute Performance", 
          benefits: ["Inverse les dommages chimiques", "Restaure l'élasticité"], 
          assets: ["Enzymes Protéolytiques", "Bio-Kératine"], 
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 },
          homeCare: {
            title: "Home Care Pro Fusion",
            desc: "Arrêtez la casse et réclamez le pouvoir de vos cheveux. Reconstruisez les ponts disulfures quotidiennement.",
            cta: "Acheter Maintenant"
          }
      },
      brushing: { 
          headline: "Alignement Thermique Organique Rapide", 
          benefits: ["100% sans formol", "Application ultra-rapide"], 
          assets: ["Base de Taninoplastia", "Acides Organiques"], 
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 },
          homeCare: {
            title: "Home Care Brushing",
            desc: "Protégez votre lissage et votre tranquillité. Protection thermique totale pour votre routine quotidienne.",
            cta: "Acheter Maintenant"
          }
      },
      mycrown: { 
          headline: "La Révolution de la Mémoire de Courbure", 
          benefits: ["Définit tous les types de boucles", "Mémorise la courbure"], 
          assets: ["Technologie Curl Memory", "Beurre de Murumuru", "Huile de Lin"], 
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 },
          homeCare: {
            title: "Home Care My Crown",
            desc: "Vos boucles sont votre couronne : protégez votre identité. Mémorisez votre courbure avec la biotechnologie.",
            cta: "Acheter Maintenant"
          }
      }
    }
  },
  education: { title: "MA Academy", subtitle: "Maîtriser l'Art", desc: "Plongez dans des événements mondiaux où la science rencontre l'art. Notre éducation technique élève les standards." },
  about: { 
    title: "Qui Sommes-Nous", 
    subtitle: "Leadership Mondial", 
    desc: "Nous sommes les architectes de la transformation capillaire. MA Fashion LLC unit science et art.", 
    ambassadorsTitle: "Réseau d'Ambassadeurs Artistiques", 
    ambassadorsDesc: "Notre équipe d'élite d'artistes officiels aux États-Unis.", 
    ambassadorList: [
        { name: "Katherine Avendaño", role: "Master Stylist & Éducatrice", location: "États-Unis" }, 
        { name: "Fernando Mendez", role: "Master Stylist", location: "États-Unis" }, 
        { name: "Ohnayak Firpi", role: "Master Stylist", location: "États-Unis" }, 
        { name: "Arnaldo Cruz", role: "Master Barber", location: "États-Unis" },
        { name: "Nancy Rivera", role: "Styliste Professionnelle & Technicienne", location: "États-Unis" },
        { name: "Bruna Dourado", role: "Styliste Professionnelle", location: "États-Unis" },
        { name: "Karina Paranhos", role: "Styliste Professionnelle", location: "États-Unis" },
        { name: "Lisyet Torres", role: "Styliste Professionnelle", location: "États-Unis" }
    ], 
    repsTitle: "Conseil d'Administration", 
    stats: { years: "Années d'Excellence", salons: "Salons Partenaires", countries: "Présence Mondiale" }, 
    roles: { techAmb: "Fondatrice, Ambassadrice & Technicienne Intl", ceo: "CEO & Fondateur", marketingDir: "Directrice Marketing", opsDir: "Directeur des Opérations", stylist: "Styliste d'Élite & Éducatrice" } 
  }
};

const translations: Record<Language, any> = {
  en: enTranslation,
  es: esTranslation,
  pt: ptTranslation,
  it: itTranslation,
  fr: frTranslation
};

// --- Intensity Bar Component ---
const IntensityBar: React.FC<{ label: string, value: number }> = ({ label, value }) => {
    const [width, setWidth] = useState(0);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setWidth(value);
            } else {
                setWidth(0); 
            }
        }, { threshold: 0.1 });

        if (barRef.current) observer.observe(barRef.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={barRef} className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-400 font-bold">
                <span>{label}</span>
                <span className="text-amber-500">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5">
                <div 
                    className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-200 transition-all duration-1000 ease-out" 
                    style={{ width: `${width}%` }} 
                />
            </div>
        </div>
    );
};

const Navigation = ({ activeTab, setActiveTab, lang, setLang, t }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSProfessionalOpen, setIsSProfessionalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  const flags: Record<string, string> = { en: "🇺🇸", es: "🇪🇸", pt: "🇧🇷", it: "🇮🇹", fr: "🇫🇷" };
  const handleNav = (tab: string) => { setActiveTab(tab); setIsMobileMenuOpen(false); setIsSProfessionalOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const sProfessionalTreatments = [
      { id: 'sp-nutrology', label: t.sprofessional.lines.nutrology.split(' - ')[0] },
      { id: 'sp-hidratherapy', label: t.sprofessional.lines.hidratherapy.split(' - ')[0] },
      { id: 'sp-profusion', label: t.sprofessional.lines.profusion.split(' - ')[0] },
      { id: 'sp-brushing', label: t.sprofessional.lines.brushing.split(' - ')[0] },
      { id: 'sp-mycrown', label: t.sprofessional.lines.mycrown.split(' - ')[0] }
  ];
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div onClick={() => handleNav('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-transform group-hover:scale-110"><span className="text-black font-serif font-bold text-xl">MA</span></div>
          <div className="flex flex-col"><span className="text-white font-serif font-bold text-lg tracking-widest leading-none">MA FASHION</span><span className="text-amber-400 text-[10px] tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">Global Biotech</span></div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => handleNav('home')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.home}</button>
          <div 
            className="relative"
            onMouseEnter={() => setIsSProfessionalOpen(true)}
            onMouseLeave={() => setIsSProfessionalOpen(false)}
          >
              <div className="flex items-center gap-1 cursor-pointer py-2">
                  <button onClick={() => handleNav('sprofessional')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab.startsWith('sp') ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.s}</button>
                  <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isSProfessionalOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </div>
              <AnimatePresence>
                {isSProfessionalOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64"
                  >
                    <div className="bg-zinc-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden py-2">
                        {sProfessionalTreatments.map((item) => (
                            <button key={item.id} onClick={() => handleNav(item.id)} className="w-full text-left px-6 py-4 text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-400 hover:bg-white/5 transition-all flex items-center justify-between group/sub">
                                {item.label} <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                            </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
          <button onClick={() => handleNav('sweet')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'sweet' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.sweet}</button>
          <button onClick={() => handleNav('education')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'education' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.edu}</button>
          <button onClick={() => handleNav('about')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'about' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.about}</button>
          <button onClick={() => handleNav('partner')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'partner' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.partner}</button>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div 
             className="relative"
             onMouseEnter={() => setIsLangOpen(true)}
             onMouseLeave={() => setIsLangOpen(false)}
           >
              <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-wider py-2">
                  <Globe size={14} /> <span>{flags[lang]}</span>
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2 min-w-[120px]"
                  >
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden">
                      {Object.keys(flags).map((code) => (
                          <button 
                            key={code} 
                            onClick={() => {
                              setLang(code as Language);
                              setIsLangOpen(false);
                            }} 
                            className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-3 ${lang === code ? 'text-amber-400 bg-zinc-800/50' : 'text-zinc-400'}`}
                          >
                              <span className="text-lg">{flags[code]}</span> <span>{code.toUpperCase()}</span>
                          </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex flex-col gap-4 animate-fade-in-up">
           <button onClick={() => handleNav('home')} className="text-left text-lg uppercase tracking-widest text-white">{t.nav.home}</button>
           <div className="space-y-4">
               <button onClick={() => setIsSProfessionalOpen(!isSProfessionalOpen)} className="flex items-center justify-between w-full text-lg uppercase tracking-widest text-white">
                   {t.nav.s} <ChevronDown className={isSProfessionalOpen ? 'rotate-180' : ''} />
               </button>
               {isSProfessionalOpen && (
                   <div className="pl-6 flex flex-col gap-4 border-l border-amber-500/20">
                       <button onClick={() => handleNav('sprofessional')} className="text-left text-sm uppercase tracking-widest text-zinc-400">{t.nav.all}</button>
                       {sProfessionalTreatments.map(item => (
                           <button key={item.id} onClick={() => handleNav(item.id)} className="text-left text-sm uppercase tracking-widest text-zinc-400">{item.label}</button>
                       ))}
                   </div>
               )}
           </div>
           <button onClick={() => handleNav('sweet')} className="text-left text-lg uppercase tracking-widest text-white">{t.nav.sweet}</button>
           <button onClick={() => handleNav('education')} className="text-left text-lg uppercase tracking-widest text-white">{t.nav.edu}</button>
           <button onClick={() => handleNav('about')} className="text-left text-lg uppercase tracking-widest text-white">{t.nav.about}</button>
           <button onClick={() => handleNav('partner')} className="text-left text-lg uppercase tracking-widest text-white">{t.nav.partner}</button>
        </div>
      )}
    </nav>
  );
};

const TreatmentDetail = ({ id, t, handleNav, lang }: any) => {
    const prefix = id.split('-')[0];
    const key = id.split('-')[1];
    const data = prefix === 'sp' ? t.sprofessional.details[key] : t.sweet.details[key];
    const labels = prefix === 'sp' ? t.sprofessional.lines : t.sweet.lines;
    const commonLabels = t.common;
    const [manualEmail, setManualEmail] = useState('');
    const [manualName, setManualName] = useState('');
    const [manualPhone, setManualPhone] = useState('');
    const [isManualSubmitting, setIsManualSubmitting] = useState(false);
    const [manualSuccess, setManualSuccess] = useState(false);
    const [manualError, setManualError] = useState<string | null>(null);

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualEmail) return;
        setIsManualSubmitting(true);
        setManualError(null);
        try {
            const payload = {
                name: manualName,
                phone: manualPhone,
                email: manualEmail,
                treatment: labels[key].split(' - ')[0],
                timestamp: new Date().toISOString(),
                source: 'Technical Manual Request'
            };
            const response = await fetch('https://n8n.mafashionllc.com/webhook/8512653b-bc17-4494-bd1c-b89c20fd8777', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setManualSuccess(true);
                setManualEmail('');
                setManualName('');
                setManualPhone('');
            } else {
                throw new Error('Failed to send');
            }
        } catch (err) {
            setManualError(lang === 'es' ? 'Error al enviar la solicitud' : 'Error sending request');
        } finally {
            setIsManualSubmitting(false);
        }
    };

    const icons: any = { 
        nutrology: <Droplets className="text-amber-500" />, 
        hidratherapy: <Wind className="text-blue-400" />, 
        profusion: <Zap className="text-yellow-400" />, 
        brushing: <Flame className="text-orange-500" />, 
        mycrown: <Crown className="text-amber-300" />,
        thefirst: <Flame className="text-amber-500" />,
        cronology: <Activity className="text-blue-400" />,
        sos: <ShieldCheck className="text-red-500" />
    };
    const treatmentImages: any = { 
        nutrology: "https://i.ibb.co/Q7z3zz8B/Nutrology-Catalogo.jpg", 
        hidratherapy: "https://i.ibb.co/9jYjSB5/photo-4916101335045221055-y.jpg", 
        profusion: "https://i.ibb.co/1ft38jgy/photo-5037476668448550284-y.jpg", 
        brushing: "https://i.ibb.co/23H15Zwt/photo-5159078333743475458-y.jpg", 
        mycrown: "https://i.ibb.co/C3j7Zk2q/photo-5071613163006438225-w.jpg",
        thefirst: "https://i.ibb.co/5Wm1sfhY/thefirst.webp",
        cronology: "https://i.ibb.co/cc71zLK9/cronology.webp",
        sos: "https://i.ibb.co/tTVkF43k/sos.webp"
    };
    const homeCareImages: any = {
        nutrology: "https://i.ibb.co/0jqVsrKr/Home-Care-Nutrology.jpg",
        hidratherapy: "https://i.ibb.co/ymjXzc4r/Home-Care-Hidratherapy.jpg",
        profusion: "https://i.ibb.co/1YCqxw1g/Home-Care-Pro-Fusion.jpg",
        brushing: "https://i.ibb.co/xKJ5GrN9/Home-Care-Brushing.jpg",
        mycrown: "https://i.ibb.co/jZxDbCvv/Home-Care-My-Crown.jpg"
    };
    const type = key as keyof typeof treatmentImages;

    return (
        <div className="bg-black min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <button onClick={() => handleNav(prefix === 'sp' ? 'sprofessional' : 'sweet')} className="mb-12 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs uppercase tracking-widest"><ChevronLeft size={16} /> {commonLabels.backTo} {prefix === 'sp' ? 'S Professional' : 'Sweet Professional'}</button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-3">
                            <div className="p-3 bg-white/5 rounded-xl">{icons[type]}</div>
                            <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase">{prefix === 'sp' ? t.nav.s : t.nav.sweet}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter italic">{labels[type].split(' - ')[0]}</h1>
                        <p className="text-2xl text-zinc-400 font-light border-l-2 border-amber-500 pl-6">{data.headline}</p>
                        {data.info && <p className="text-lg text-zinc-500 font-light leading-relaxed">{data.info}</p>}
                        <div className="pt-6"><button onClick={() => handleNav('partner')} className="px-12 py-5 bg-amber-500 text-black font-bold uppercase tracking-widest text-sm hover:bg-amber-400 transition-all rounded-sm shadow-xl">{commonLabels.buyForSalon}</button></div>
                    </div>
                    <div className="relative group animate-fade-in"><div className="absolute -inset-4 bg-amber-500/10 rounded-2xl blur-3xl opacity-50"></div><div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10"><img src={treatmentImages[type]} className="w-full h-full object-cover" /></div></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                    <div className="space-y-12">
                         <div className="space-y-6">
                            <h3 className="text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Activity size={16} /> {commonLabels.intensity}</h3>
                            <div className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                                {Object.entries(data.intensity).map(([k, v]: any) => (
                                    <IntensityBar 
                                        key={k} 
                                        label={k === 'hydration' ? commonLabels.hydration : k === 'nutrition' ? commonLabels.nutrition : commonLabels.reconstruction} 
                                        value={v} 
                                    />
                                ))}
                            </div>
                         </div>
                         {data.functions && (
                            <div className="space-y-6">
                                <h3 className="text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Sparkles size={16} /> {commonLabels.functions}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.functions.map((f: any, i: number) => (
                                        <div key={i} className="p-6 bg-zinc-900 border border-white/5 rounded-xl hover:border-amber-500/30 transition-all">
                                            <h4 className="text-white font-serif italic text-lg mb-3">{f.title}</h4>
                                            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><CheckCircle2 size={16} /> {commonLabels.benefits}</h3>
                            <ul className="space-y-4">{data.benefits.map((b: string, i: number) => (<li key={i} className="text-zinc-400 text-lg font-light flex items-start gap-3"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2.5 shrink-0" />{b}</li>))}</ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Beaker size={16} /> {commonLabels.mainAssets}</h3>
                            <div className="flex flex-wrap gap-2">{data.assets.map((a: string, i: number) => (<span key={i} className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-full text-zinc-300 text-sm italic">{a}</span>))}</div>
                        </div>
                    </div>
                </div>

                {data.homeCare && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-32 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-amber-500/20"
                    >
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
                            <div className="space-y-8 relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                                    <Sparkles size={14} className="text-amber-500 animate-pulse" />
                                    <span className="text-amber-500 text-[10px] font-bold tracking-[0.3em] uppercase">{commonLabels.homeCare}</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-serif text-white italic leading-tight">{data.homeCare.title}</h2>
                                <p className="text-xl text-zinc-400 font-light leading-relaxed">{data.homeCare.desc}</p>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNav('partner')}
                                    className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-amber-500 transition-all rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                >
                                    {data.homeCare.cta}
                                </motion.button>
                            </div>
                            <div className="relative group">
                                <motion.div 
                                    animate={{ 
                                        y: [0, -15, 0],
                                        rotate: [0, 2, 0]
                                    }}
                                    transition={{ 
                                        duration: 6, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    className="relative z-10"
                                >
                                    <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                                    <img 
                                        src={homeCareImages[type]} 
                                        alt={data.homeCare.title}
                                        className="w-full h-auto rounded-2xl shadow-2xl border border-white/10 relative z-10 transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Special Effects: Floating particles or glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 animate-pulse delay-700"></div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="bg-zinc-900/30 rounded-3xl p-12 border border-white/5">
                    <div className="text-center max-w-2xl mx-auto space-y-6">
                         <h3 className="text-3xl font-serif text-white">{commonLabels.techManual}</h3>
                         {manualSuccess ? (
                             <div className="py-8 animate-fade-in">
                                 <CheckCircle2 className="text-amber-500 mx-auto mb-4" size={48} />
                                 <p className="text-white text-xl font-serif italic">{t.partner.successMsg}</p>
                                 <button onClick={() => setManualSuccess(false)} className="mt-6 text-amber-500 text-xs uppercase tracking-widest border-b border-amber-500/30 pb-1">{t.partner.labels.back}</button>
                             </div>
                         ) : (
                             <>
                                 <p className="text-zinc-400 font-light">{commonLabels.techManualDesc}</p>
                                 <form onSubmit={handleManualSubmit} className="space-y-4 mt-8">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <input 
                                            type="text" 
                                            required
                                            value={manualName}
                                            onChange={(e) => setManualName(e.target.value)}
                                            placeholder={t.partner.labels.name} 
                                            className="bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-white outline-none focus:border-amber-500" 
                                         />
                                         <input 
                                            type="tel" 
                                            required
                                            value={manualPhone}
                                            onChange={(e) => setManualPhone(e.target.value)}
                                            placeholder={t.partner.labels.phone} 
                                            className="bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-white outline-none focus:border-amber-500" 
                                         />
                                     </div>
                                     <div className="flex flex-col md:flex-row gap-4">
                                         <input 
                                            type="email" 
                                            required
                                            value={manualEmail}
                                            onChange={(e) => setManualEmail(e.target.value)}
                                            placeholder={t.partner.labels.email} 
                                            className="flex-grow bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-white outline-none focus:border-amber-500" 
                                         />
                                         <button 
                                            type="submit"
                                            disabled={isManualSubmitting}
                                            className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                         >
                                             {isManualSubmitting ? (
                                                 <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                             ) : t.partner.labels.submit}
                                         </button>
                                     </div>
                                 </form>
                                 {manualError && <p className="text-red-500 text-xs mt-2">{manualError}</p>}
                             </>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSection = ({ t, handleNav }: any) => {
  const tickerContent = t.promos.items.map((item: any) => `${item.title}: ${item.desc}`).join("  ✦  ").toUpperCase();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1620331313174-d73105a3f333?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 scale-105 animate-spin-reverse-slow duration-[100s]" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" /><div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay"></div></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center"><div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-2 rounded-full mb-8 animate-fade-in-up backdrop-blur-md"><Sparkles size={14} className="text-amber-400 animate-pulse" /><span className="text-amber-300 text-xs font-bold tracking-[0.2em] uppercase">{t.tagline}</span></div><h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium text-white mb-8 leading-tight animate-fade-in-up delay-100 tracking-tighter"><span className="block opacity-90">{t.titleStart}</span><span className="text-gold italic relative inline-block">{t.titleEnd}<span className="absolute -bottom-4 left-0 w-full h-1 bg-amber-500/50 rounded-full blur-sm"></span></span></h1><p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up delay-200">{t.subtitle}</p><div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
          <button onClick={() => handleNav('partner')} className="group relative px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold tracking-widest uppercase text-sm transition-all rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">{t.ctaShop} <ArrowRight size={16} /></span>
          </button>
        </div></div>
      <div className="absolute bottom-10 left-0 w-full overflow-hidden py-4 border-t border-white/5 bg-black/50 backdrop-blur-sm"><div className="flex animate-marquee whitespace-nowrap gap-12 text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase"><span>{tickerContent}</span><span>✦</span><span>{tickerContent}</span></div></div>
    </section>
  );
};

const PromotionsSection = ({ t, handleNav }: any) => {
    const slides = [ { id: 1, title: t.promos.items[0].title, desc: t.promos.items[0].desc, cta: t.promos.items[0].cta, image: "https://i.ibb.co/d0MmCQ2q/Gemini-Generated-Image-116iz116iz116iz1.png", position: "object-[center_25%]", action: () => handleNav('partner') }, { id: 2, title: t.promos.items[1].title, desc: t.promos.items[1].desc, cta: t.promos.items[1].cta, image: "https://i.ibb.co/mV6ttdbp/photo-5127480036008507208-y.jpg", position: "object-[center_20%]", action: () => handleNav('sp-mycrown') }, { id: 3, title: t.promos.items[2].title, desc: t.promos.items[2].desc, cta: t.promos.items[2].cta, image: "https://i.ibb.co/zh2n4KB5/IMG-20251209-123203-654.jpg", position: "object-[center_20%]", action: () => handleNav('education') } ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const DURATION = 8000;
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    useEffect(() => { const interval = setInterval(nextSlide, DURATION); return () => clearInterval(interval); }, []);
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    return (
        <section className="bg-black pt-28 md:pt-32 pb-0 border-b border-zinc-900 relative">
            <style>{`@keyframes countdown { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 125.6; } } @keyframes slideProgress { from { width: 0%; } to { width: 100%; } }`}</style>
            <div className="w-full h-[600px] relative overflow-hidden group">{slides.map((slide, index) => (<div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}><div className="absolute inset-0 overflow-hidden"><img src={slide.image} className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${slide.position} ${index === currentSlide ? 'scale-110' : 'scale-100'}`} /><div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" /></div><div className="absolute inset-0 flex items-center"><div className="max-w-7xl mx-auto px-6 w-full"><div className="max-w-xl space-y-6"><div className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold tracking-widest uppercase mb-2 animate-fade-in">{t.common.maNews}</div><h2 className="text-5xl md:text-6xl font-serif text-white leading-tight animate-fade-in-up tracking-tighter">{slide.title}</h2><p className="text-zinc-300 text-lg leading-relaxed animate-fade-in-up delay-100">{slide.desc}</p><button onClick={slide.action} className="mt-8 px-8 py-3 border-b border-amber-500 text-amber-500 hover:text-amber-400 font-bold tracking-widest uppercase text-sm transition-all flex items-center gap-2 animate-fade-in-up delay-200">{slide.cta} <ArrowRight size={16} /></button></div></div></div></div>))}<div className="absolute bottom-0 left-0 w-full z-20"><div className="max-w-7xl mx-auto px-6 mb-8 flex justify-end items-end gap-8"><div className="flex items-center gap-4 bg-black/60 backdrop-blur-md p-2 pr-6 rounded-full border border-white/10"><div className="relative w-10 h-10 flex items-center justify-center"><svg className="w-full h-full -rotate-90 transform"><circle cx="20" cy="20" r="16" className="stroke-white/10 fill-none" strokeWidth="2" /><circle key={currentSlide} cx="20" cy="20" r="16" className="stroke-amber-500 fill-none" strokeWidth="2" strokeDasharray="100.5" strokeDashoffset="0" style={{ animation: `countdown ${DURATION}ms linear forwards` }} /></svg><div className="absolute text-white animate-pulse"><Clock size={12} /></div></div><div className="flex flex-col"><span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">{t.promos.comingUp}</span><span className="text-xs text-white font-serif italic truncate max-w-[120px] md:max-w-[200px]">{slides[nextSlideIndex].title}</span></div></div><div className="flex gap-2"><button onClick={prevSlide} className="p-3 bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full text-white transition-all"><ChevronLeft size={20} /></button><button onClick={nextSlide} className="p-3 bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full text-white transition-all"><ChevronRight size={20} /></button></div></div><div className="flex w-full h-1 bg-black">{slides.map((_, idx) => (<div key={idx} className="flex-1 bg-zinc-900/50 relative overflow-hidden border-r border-black/50">{idx === currentSlide && (<div className="absolute inset-0 bg-amber-500 shadow-[0_0_15px_#f59e0b]" style={{ animation: `slideProgress ${DURATION}ms linear forwards` }} />)}{idx < currentSlide && <div className="absolute inset-0 bg-amber-500/30" />}</div>))}</div></div></div>
        </section>
    );
};

const HomeSection = ({ t, handleNav }: any) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget; const box = card.getBoundingClientRect();
        const x = e.clientX - box.left; const y = e.clientY - box.top;
        const centerX = box.width / 2; const centerY = box.height / 2;
        setRotate({ x: ((y - centerY) / centerY) * -10, y: ((x - centerX) / centerX) * 10 });
    };
    return (
        <>
            <PromotionsSection t={t} handleNav={handleNav} />
            <HeroSection t={t} handleNav={handleNav} />
            <section className="py-32 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div>
                            <span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase block mb-4">{t.common.collection}</span>
                            <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tighter">{t.collectionTitle}</h2>
                        </div>
                        <div className="text-right mt-6 md:mt-0">
                            <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">{t.collectionSub}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                        {/* S Professional Card - Floating Editorial Style */}
                        <div className="relative group cursor-pointer overflow-hidden rounded-sm border border-white/5 shadow-2xl" onClick={() => handleNav('sprofessional')}>
                            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden">
                                <img 
                                    src="https://i.ibb.co/4w5HQC66/Gemini-Generated-Image-lv0f50lv0f50lv0f.png" 
                                    className="w-full h-full object-cover object-[center_15%] scale-105 transition-transform duration-1000 group-hover:scale-115" 
                                    referrerPolicy="no-referrer"
                                />
                                {/* Sophisticated Gradient Overlay - Focused on bottom for legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                            </div>

                            {/* Strategic Typography Placement - Bottom Left Corner */}
                            <div className="absolute bottom-0 left-0 w-full p-10 z-30">
                                <div className="overflow-hidden mb-2">
                                    <p className="text-amber-500 text-[10px] tracking-[0.6em] uppercase font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        {t.common.collection} 01
                                    </p>
                                </div>
                                <h3 className="text-5xl md:text-6xl font-serif text-white leading-none italic mb-6 tracking-tighter">
                                    {t.nav.s}
                                </h3>
                                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-light">
                                        {t.common.theLuxury}
                                    </span>
                                    <div className="h-px flex-1 bg-white/20"></div>
                                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500 transition-all duration-500">
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge - Top Right */}
                            <div className="absolute top-8 right-8 z-30">
                                <div className="backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                    <span className="text-[9px] text-white tracking-[0.2em] uppercase font-medium">Exclusive</span>
                                </div>
                            </div>
                        </div>

                        {/* Sweet Professional Card - Floating Editorial Style */}
                        <div className="relative group cursor-pointer overflow-hidden rounded-sm border border-white/5 shadow-2xl" onClick={() => handleNav('sweet')}>
                            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden">
                                <img 
                                    src="https://i.ibb.co/dJ1wrB5C/Gemini-Generated-Image-5womcu5womcu5wom.png" 
                                    className="w-full h-full object-cover object-[center_15%] scale-105 transition-transform duration-1000 group-hover:scale-115" 
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                            </div>

                            {/* Strategic Typography Placement - Bottom Left Corner */}
                            <div className="absolute bottom-0 left-0 w-full p-10 z-30">
                                <div className="overflow-hidden mb-2">
                                    <p className="text-zinc-400 text-[10px] tracking-[0.6em] uppercase font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        {t.common.collection} 02
                                    </p>
                                </div>
                                <h3 className="text-5xl md:text-6xl font-serif text-white leading-none italic mb-6 tracking-tighter">
                                    {t.nav.sweet}
                                </h3>
                                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-light">
                                        {t.common.theInnovation}
                                    </span>
                                    <div className="h-px flex-1 bg-white/20"></div>
                                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-500">
                                        <ArrowRight className="w-4 h-4 text-black" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge - Top Right */}
                            <div className="absolute top-8 right-8 z-30">
                                <div className="backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                    <span className="text-[9px] text-white tracking-[0.2em] uppercase font-medium">New Arrival</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const SProfessionalSection = ({ t, handleNav }: any) => {
    const treatments = [
        { id: 'sp-nutrology', title: t.sprofessional.lines.nutrology, img: "https://i.ibb.co/Q7z3zz8B/Nutrology-Catalogo.jpg", desc: t.sprofessional.details.nutrology.headline },
        { id: 'sp-hidratherapy', title: t.sprofessional.lines.hidratherapy, img: "https://i.ibb.co/9jYjSB5/photo-4916101335045221055-y.jpg", desc: t.sprofessional.details.hidratherapy.headline },
        { id: 'sp-profusion', title: t.sprofessional.lines.profusion, img: "https://i.ibb.co/1ft38jgy/photo-5037476668448550284-y.jpg", desc: t.sprofessional.details.profusion.headline },
        { id: 'sp-brushing', title: t.sprofessional.lines.brushing, img: "https://i.ibb.co/23H15Zwt/photo-5159078333743475458-y.jpg", desc: t.sprofessional.details.brushing.headline },
        { id: 'sp-mycrown', title: t.sprofessional.lines.mycrown, img: "https://i.ibb.co/C3j7Zk2q/photo-5071613163006438225-w.jpg", desc: t.sprofessional.details.mycrown.headline }
    ];
    return (
        <section className="min-h-screen bg-black relative pt-32">
            <div className="h-[50vh] flex items-center justify-center bg-radial-gradient from-zinc-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white opacity-10 animate-scan"></div>
                <div className="text-center z-10 px-6 max-w-4xl mx-auto animate-fade-in">
                    <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-6">{t.common.luxury}</span>
                    <h2 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tighter">{t.sprofessional.title}</h2>
                    <p className="text-xl text-zinc-300 font-light">{t.sprofessional.commonDesc}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                {treatments.map((item, i) => (
                    <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 reveal-on-scroll is-visible`}>
                        <div className="w-full md:w-1/2 relative group cursor-pointer" onClick={() => handleNav(item.id)}>
                            <div className="relative overflow-hidden rounded-sm shadow-2xl aspect-[4/3] border border-white/5">
                                <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-6 border border-white/10 group-hover:border-amber-500/30 transition-colors duration-500"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight italic">{item.title.split(' - ')[0]}</h3>
                            <p className="text-amber-500 text-sm tracking-[0.2em] uppercase">{item.title.split(' - ')[1]}</p>
                            <p className="text-zinc-400 text-lg font-light leading-relaxed">{item.desc}</p>
                            <button onClick={() => handleNav(item.id)} className="text-white border-b border-white/20 pb-1 hover:text-amber-400 hover:border-amber-400 transition-all uppercase text-xs tracking-widest mt-4">{t.common.discover}</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SweetSection = ({ t, handleNav }: any) => (<section className="min-h-screen bg-zinc-950 pt-32 pb-20 relative"><div className="max-w-7xl mx-auto px-6"><div className="mb-20 text-center"><span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.common.innovation}</span><h2 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tighter">{t.sweet.title}</h2><p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">{t.sweet.desc}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[{ id: 'thefirst', title: t.sweet.lines.thefirst, desc: t.sweet.lineDescs.thefirst, img: "https://i.ibb.co/5Wm1sfhY/thefirst.webp" }, { id: 'cronology', title: t.sweet.lines.cronology, desc: t.sweet.lineDescs.cronology, img: "https://i.ibb.co/cc71zLK9/cronology.webp" }, { id: 'sos', title: t.sweet.lines.sos, desc: t.sweet.lineDescs.sos, img: "https://i.ibb.co/tTVkF43k/sos.webp" }].map((item) => (<div key={item.id} onClick={() => handleNav('sw-' + item.id)} className="group relative aspect-[9/16] bg-zinc-900 border border-white/5 overflow-hidden transition-all hover:border-amber-500/30 cursor-pointer"><img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 duration-700" /><div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" /><div className="absolute bottom-0 left-0 w-full p-8"><h3 className="text-3xl font-serif text-white mb-2 italic">{item.title}</h3><p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p></div></div>))}</div></div></section>);

const EducationSection = ({ t }: any) => (<section className="min-h-screen bg-zinc-950 pt-32 pb-20"><div className="max-w-7xl mx-auto px-6"><div className="text-center mb-24"><span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.education.title}</span><h2 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tighter">{t.education.subtitle}</h2></div><p className="text-center text-zinc-400 max-w-2xl mx-auto text-lg font-light mb-20">{t.education.desc}</p><div className="flex items-center justify-center h-40 bg-zinc-900/50 rounded-3xl border border-white/5"><span className="text-zinc-500 font-serif italic text-2xl tracking-widest">{t.common.resultsTitle}</span></div></div></section>);

const PrivacySection = ({ t }: any) => (
  <section className="min-h-screen bg-black pt-40 pb-20">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-20 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6 border border-amber-500/20">
          <ShieldCheck className="text-amber-500" size={32} />
        </div>
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-4 tracking-tighter">{t.privacy.title}</h2>
        <p className="text-amber-500 text-xs tracking-widest uppercase font-bold">{t.privacy.lastUpdated}</p>
      </div>
      
      <div className="space-y-16">
        <div className="p-8 bg-zinc-900/30 rounded-2xl border border-white/5 backdrop-blur-sm animate-fade-in-up delay-100">
           <p className="text-xl text-zinc-300 font-light leading-relaxed italic border-l-4 border-amber-500 pl-6">
             "{t.privacy.intro}"
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.privacy.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-4 p-6 bg-zinc-900/20 rounded-xl border border-white/5 hover:border-amber-500/20 transition-all group animate-fade-in-up" style={{ animationDelay: `${(idx + 2) * 100}ms` }}>
              <div className="flex items-center gap-3">
                {idx === 0 && <Eye size={20} className="text-amber-500" />}
                {idx === 1 && <Activity size={20} className="text-amber-500" />}
                {idx === 2 && <Lock size={20} className="text-amber-500" />}
                {idx === 3 && <ShieldCheck size={20} className="text-amber-500" />}
                <h3 className="text-xl font-serif text-white italic">{section.title}</h3>
              </div>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">
                {section.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-12 animate-fade-in-up delay-500">
          <p className="text-zinc-500 text-sm italic mb-8">
            {t.footer.about}
          </p>
          <div className="w-12 h-0.5 bg-amber-500/30 mx-auto" />
        </div>
      </div>
    </div>
  </section>
);

const CountUp = ({ end }: { end: number }) => { const [count, setCount] = useState(0); useEffect(() => { let start = 0; const duration = 2000; const timer = setInterval(() => { start += end/100; if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(Math.floor(start)); } }, duration/100); return () => clearInterval(timer); }, [end]); return <span>{count}</span>; };

const AboutSection = ({ t }: any) => {
    const ambassadorImages = [
        "https://i.ibb.co/M5h85W16/Whats-App-Image-2025-12-10-at-9-44-21-PM.jpg", 
        "https://i.ibb.co/Lz3J4KHR/Whats-App-Image-2025-12-11-at-6-51-05-PM.jpg", 
        "https://i.ibb.co/N6pWP5M5/Whats-App-Image-2025-12-13-at-11-01-10-PM.jpg", 
        "https://i.ibb.co/sv4mqWvw/JPG-NALDO-HEADSHOT-06.jpg",
        "https://i.ibb.co/CpX5dnT2/photo-5109357614780320837-y.jpg",
        "https://i.ibb.co/3YmqyTnX/Whats-App-Image-2026-02-08-at-1-39-41-PM.jpg",
        "https://i.ibb.co/vCSM6PYG/photo-4920631262825876325-w.jpg",
        "https://i.ibb.co/N6kK6g6g/Whats-App-Image-2026-02-08-at-3-13-38-PM.jpg"
    ];
    const leadership = [
        { name: "Ernesto Aramburu", role: t.about.roles.ceo, image: "https://i.ibb.co/tPJq9rPS/Ernesto.jpg" }, 
        { name: "Alejandra Mendez", role: t.about.roles.techAmb, image: "https://i.ibb.co/7NRw8gzw/ALejnadra.jpg" }, 
        { name: "Luisana Muñoz", role: t.about.roles.marketingDir, image: "https://i.ibb.co/4w4n2R65/Luisana.jpg" }, 
    ];
    return (
        <section className="bg-black text-white pt-32">
            <div className="px-8 max-w-7xl mx-auto mb-20 text-center">
                <h2 className="text-5xl lg:text-7xl font-serif mb-8">{t.about.title}</h2>
                <p className="text-xl text-zinc-400 font-light max-w-4xl mx-auto">{t.about.desc}</p>
                <div className="grid grid-cols-3 gap-8 mt-12 border-t border-amber-500/20 pt-12">
                    <div className="text-center"><span className="block text-4xl font-serif"><CountUp end={15} />+</span><span className="text-xs text-amber-500 uppercase">{t.about.stats.years}</span></div>
                    <div className="text-center"><span className="block text-4xl font-serif"><CountUp end={5000} />+</span><span className="text-xs text-amber-500 uppercase">{t.about.stats.salons}</span></div>
                    <div className="text-center"><span className="block text-4xl font-serif"><CountUp end={20} />+</span><span className="text-xs text-amber-500 uppercase">{t.about.stats.countries}</span></div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h3 className="text-center text-amber-500 text-xs tracking-widest uppercase mb-12">{t.about.repsTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {leadership.map((person, i) => (
                        <div key={i} className="text-center">
                            <div className="aspect-[3/4] mb-4 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all">
                                <img src={person.image} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-serif text-white">{person.name}</h4>
                            <p className="text-amber-500 text-[10px] uppercase">{person.role}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-zinc-950 py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-4xl md:text-6xl font-serif text-white mb-4 text-center">{t.about.ambassadorsTitle}</h3>
                    <p className="text-center text-zinc-500 mb-16 max-w-xl mx-auto">{t.about.ambassadorsDesc}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {t.about.ambassadorList.map((amb: any, i: number) => (
                            <div key={i} className="group relative cursor-pointer">
                                <div className="aspect-[3/4] overflow-hidden rounded-sm border border-white/10 group-hover:border-amber-500 transition-all shadow-2xl">
                                    <img src={ambassadorImages[i]} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                        <h4 className="text-2xl font-serif text-white italic mb-1">{amb.name}</h4>
                                        <p className="text-amber-500 text-[11px] uppercase tracking-widest">{amb.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const PartnerAccessSection = ({ t, lang }: any) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            source: 'Partner Access Form',
            userAgent: navigator.userAgent,
            browserLanguage: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            referrer: document.referrer,
            currentUrl: window.location.href,
            timestamp: new Date().toISOString(),
        };

        try {
            console.log('Sending payload to webhook:', payload);
            const response = await fetch('https://n8n.mafashionllc.com/webhook/Pagina_Oficial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            if (response.ok) {
                setStep(3);
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (err: any) {
            console.error('Error submitting form:', err);
            if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
                setError(lang === 'es' 
                    ? 'Error de CORS. En n8n, cambie el valor de "Access-Control-Allow-Origin" a "*" (un asterisco) para permitir peticiones desde cualquier dominio.' 
                    : 'CORS Error. In n8n, change the "Access-Control-Allow-Origin" value to "*" (an asterisk) to allow requests from any domain.');
            } else {
                setError(lang === 'es' ? 'Hubo un error al enviar la solicitud. Por favor, intente de nuevo.' : 'There was an error sending your request. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 animate-fade-in-up">
                    <h2 className="text-5xl lg:text-7xl font-serif text-white leading-tight">{t.partner.title}</h2>
                    <p className="text-xl text-zinc-400 font-light border-l-2 border-amber-500 pl-6">{t.partner.subtitle}</p>
                </div>
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 relative overflow-hidden">
                    {step === 3 ? (
                        <div className="text-center py-12 animate-fade-in-up">
                            <Check size={40} className="text-green-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-serif text-white mb-4">{t.partner.success}</h3>
                            <p className="text-zinc-400">{t.partner.successMsg}</p>
                            <button 
                                onClick={() => setStep(1)} 
                                className="mt-8 text-amber-500 text-sm uppercase tracking-widest hover:text-amber-400 transition-all"
                            >
                                {t.partner.labels.return}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm animate-fade-in">
                                    {error}
                                </div>
                            )}
                            <input 
                                type="text" 
                                name="name"
                                placeholder={t.partner.labels.name} 
                                required 
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500" 
                            />
                            <input 
                                type="email" 
                                name="email"
                                placeholder={t.partner.labels.email} 
                                required 
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500" 
                            />
                            <input 
                                type="tel" 
                                name="phone"
                                placeholder={t.partner.labels.phone} 
                                required 
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500" 
                            />
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        <span>{lang === 'es' ? 'Enviando...' : 'Sending...'}</span>
                                    </>
                                ) : t.partner.labels.submit}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

const Footer = ({ t, handleNav }: any) => (<footer className="bg-black border-t border-white/10 pt-20 pb-10"><div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"><div className="space-y-6"><h3 className="text-2xl font-serif text-white font-bold">MA FASHION LLC</h3><p className="text-zinc-500 text-sm">{t.footer.about}</p></div><div><h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">{t.footer.links}</h4><ul className="space-y-4 text-zinc-500 text-sm"><li><button className="hover:text-amber-500 transition-colors" onClick={() => handleNav('home')}>{t.nav.home}</button></li><li><button className="hover:text-amber-500 transition-colors" onClick={() => handleNav('sprofessional')}>{t.nav.s}</button></li><li><button className="hover:text-amber-500 transition-colors" onClick={() => handleNav('sweet')}>{t.nav.sweet}</button></li><li><button className="hover:text-amber-500 transition-colors" onClick={() => handleNav('about')}>{t.nav.about}</button></li></ul></div><div><h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">{t.footer.legal}</h4><ul className="space-y-4 text-zinc-500 text-sm"><li><button className="hover:text-amber-500 transition-colors" onClick={() => handleNav('privacy')}>{t.common.privacy}</button></li><li><a href="#" className="hover:text-amber-500 transition-colors">{t.common.terms}</a></li></ul></div><div><h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">{t.footer.contact}</h4><ul className="space-y-4 text-zinc-500 text-sm"><li>{t.common.address}</li><li>{t.common.phoneNum}</li></ul></div></div><div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex justify-between text-zinc-600 text-xs"><p>{t.footer.rights}</p><p>{t.common.unitedStates}</p></div></footer>);

const App = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [lang, setLang] = useState<Language>('en'); 
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const t = translations[lang];
    
    const handleNavigation = (tab: string) => { 
        setActiveTab(tab); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    useEffect(() => { 
        const handleScroll = () => setShowWhatsApp(window.scrollY > 300); 
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll); 
    }, []);

    const renderContent = () => {
        if (activeTab.startsWith('sp-') || activeTab.startsWith('sw-')) return <TreatmentDetail id={activeTab} t={t} handleNav={handleNavigation} lang={lang} />;
        switch (activeTab) {
            case 'home': return <HomeSection t={t} handleNav={handleNavigation} />;
            case 'sweet': return <SweetSection t={t} handleNav={handleNavigation} />;
            case 'sprofessional': return <SProfessionalSection t={t} handleNav={handleNavigation} />;
            case 'education': return <EducationSection t={t} />;
            case 'about': return <AboutSection t={t} />;
            case 'partner': return <PartnerAccessSection t={t} lang={lang} />;
            case 'privacy': return <PrivacySection t={t} />;
            default: return <HomeSection t={t} handleNav={handleNavigation} />;
        }
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 selection:bg-amber-500/30 font-sans flex flex-col w-full">
            <Navigation activeTab={activeTab} setActiveTab={handleNavigation} lang={lang} setLang={setLang} t={t} />
            <main className="flex-grow w-full">{renderContent()}</main>
            <Footer t={t} handleNav={handleNavigation} />
             <div className={`fixed bottom-32 right-6 z-40 transition-all duration-500 transform ${showWhatsApp ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}><a href={`https://wa.me/${t.common.phoneNum.replace(/\D/g,'')}`} target="_blank" className="block transition-transform hover:scale-110"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-14 h-14 drop-shadow-2xl" /></a></div>
        </div>
    );
};
export default App;
