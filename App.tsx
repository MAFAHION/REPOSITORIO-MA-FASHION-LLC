import React, { useState, useRef, useEffect } from 'react';
import { useLiveAPI } from './hooks/use-live-api';
import Visualizer from './components/Visualizer';
import ControlTray from './components/ControlTray';
import { LiveStatus } from './types';
import { Menu, X, ArrowRight, Sparkles, Clock, ChevronRight, ChevronLeft, Mic, Globe, CheckCircle2, Beaker, Droplets, Wind, Zap, Flame, Crown, Activity, Check, ChevronDown } from 'lucide-react';

// --- Safe API Key Check ---
const hasApiKey = () => {
    try {
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) return true;
        return false;
    } catch (e) {
        return false;
    }
}

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
    hydration: "Hydration", nutrition: "Nutrition", reconstruction: "Reconstruction", buyNow: "Buy Now"
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
  sweet: { title: "Sweet Professional", desc: "The brand that revolutionized the market with the first thermal straightener in shampoo form. Innovation, speed, and safety.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, lineDescs: { thefirst: "The first straightening shampoo in the world. 5 international patents.", cronology: "Biotechnology mapping for personalized hair treatment.", sos: "Emergency rescue for chemically damaged hair." } },
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
          ]
      },
      hidratherapy: {
          headline: "Ozone Technology & Ultimate Hydration",
          benefits: ["Deep cellular hydration", "Ozone effect protection", "Extreme softness", "Revitalizes hair fiber"],
          assets: ["Active Ozone O3", "Hyaluronic Acid", "Blueberry Extract"],
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 }
      },
      profusion: {
          headline: "Enzymatic High-Performance Reconstruction",
          benefits: ["Reverses chemical damage", "Strengthens disulfide bonds", "Restores elasticity", "Stops hair breakage"],
          assets: ["Proteolytic Enzymes", "Bio-Keratin", "Hydrolyzed Silk Protein"],
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 }
      },
      brushing: {
          headline: "Organic High-Speed Thermal Alignment",
          benefits: ["100% Formaldehyde free", "Ultra-fast application", "Intense mirrored shine", "Long-lasting smoothness"],
          assets: ["Taninoplasty Base", "Organic Acids", "Exotic Oils"],
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 }
      },
      mycrown: {
          headline: "The Curvature Memory Revolution",
          benefits: ["Defines all curl types", "Locks in hydration", "Memorizes curvature", "Control extreme frizz"],
          assets: ["Curl Memory Technology", "Murumuru Butter", "Flaxseed Oil"],
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 }
      }
    }
  },
  education: {
    title: "MA Academy", subtitle: "Master The Art", desc: "Immerse yourself in global events where science meets artistry. Our technical education elevates standards worldwide."
  },
  about: { title: "Who We Are", subtitle: "Global Leadership", desc: "We are the architects of hair transformation. MA Fashion LLC unites science, nature, and artistry to empower professionals worldwide.", ambassadorsTitle: "Artistic Ambassador Network", ambassadorsDesc: "Our elite team of official artists in the United States. These master stylists define the trends and techniques of tomorrow.", ambassadorList: [{ name: "Katherine Avendaño", role: "Master Stylist & Educator", location: "United States" }, { name: "Fernando Mendez", role: "Master Stylist", location: "United States" }, { name: "Ohnayak Firpi", role: "Master Stylist", location: "United States" }, { name: "Arnaldo Cruz", role: "Master Barber", location: "United States" }], repsTitle: "Executive Board", stats: { years: "Years of Excellence", salons: "Partner Salons", countries: "Global Presence" }, roles: { techAmb: "Founder, Ambassador & Intl Technician", ceo: "CEO & Founder", marketingDir: "Director of Marketing", opsDir: "Director of Operations", stylist: "Elite Stylist & Educator" } }
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
    hydration: "Hidratación", nutrition: "Nutrición", reconstruction: "Reconstrucción", buyNow: "Comprar Ahora"
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
  sweet: { title: "Sweet Professional", desc: "La marca que revolucionó el mercado con el primer alisador térmico en forma de champú. Innovación, rapidez y seguridad.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, lineDescs: { thefirst: "El primer champú alisador del mundo. 5 patentes internacionales.", cronology: "Mapeo biotecnológico para tratamientos capilares personalizados.", sos: "Rescate de emergencia para cabellos dañados químicamente." } },
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
          ]
      },
      hidratherapy: {
          headline: "Tecnología de Ozono e Hidratación Extrema",
          benefits: ["Hidratación celular profunda", "Protección efecto ozono", "Suavidad extrema", "Revitaliza la fibra capilar"],
          assets: ["Ozono activo O3", "Ácido hialurónico", "Extracto de arándano"],
          intensity: { hydration: 100, nutrition: 20, reconstruction: 10 }
      },
      profusion: {
          headline: "Reconstrucción Enzimática de Alto Rendimiento",
          benefits: ["Revierte el daño químico", "Fortalece puentes de disulfuro", "Restaura la elasticidad", "Detiene la rotura"],
          assets: ["Enzimas proteolíticas", "Bio-queratina", "Proteína de seda hidrolizada"],
          intensity: { hydration: 30, nutrition: 40, reconstruction: 100 }
      },
      brushing: {
          headline: "Alineación Térmica Orgánica de Alta Velocidad",
          benefits: ["100% Libre de formol", "Aplicación ultra rápida", "Brillo espejado intenso", "Liso duradero"],
          assets: ["Base de taninoplastia", "Ácidos orgánicos", "Aceites exóticos"],
          intensity: { hydration: 40, nutrition: 50, reconstruction: 30 }
      },
      mycrown: {
          headline: "La Revolución de la Memoria de Curvatura",
          benefits: ["Define todo tipo de rizos", "Retiene la hidratación", "Memoriza la curvatura", "Control extremo del frizz"],
          assets: ["Tecnología Curl Memory", "Manteca de Murumuru", "Aceite de linaza"],
          intensity: { hydration: 60, nutrition: 80, reconstruction: 20 }
      }
    }
  },
  education: {
    title: "Academia MA", subtitle: "Domina el Arte", desc: "Sumérgete en eventos globales donde la ciencia se encuentra con el arte. Nuestra educación técnica eleva los estándares en todo el mundo."
  },
  about: { title: "Quiénes Somos", subtitle: "Liderazgo Global", desc: "Somos los arquitectos de la transformación capilar. MA Fashion LLC une ciencia, naturaleza y arte para empoderar a los profesionales.", ambassadorsTitle: "Red de Embajadores Artísticos", ambassadorsDesc: "Nuestro equipo élite de artistas oficiales en Estados Unidos. Estilistas maestras que definen las tendencias y técnicas del mañana.", ambassadorList: [{ name: "Katherine Avendaño", role: "Estilista Master y Educadora", location: "Estados Unidos" }, { name: "Fernando Mendez", role: "Master Stylist", location: "Estados Unidos" }, { name: "Ohnayak Firpi", role: "Estilista Master", location: "Estados Unidos" }, { name: "Arnaldo Cruz", role: "Barbero Master", location: "Estados Unidos" }], repsTitle: "Junta Directiva", stats: { years: "Años de Excelencia", salons: "Salones Asociados", countries: "Presencia Global" }, roles: { techAmb: "Fundadora, Embajadora y Técnica Intl", ceo: "CEO y Fundador", marketingDir: "Directora de Marketing", opsDir: "Director de Operaciones", stylist: "Estilista Elite y Educadora" } }
};

const ptTranslation = {
  nav: { home: "Início", sweet: "Sweet Professional", s: "S Professional", edu: "Educação", about: "Sobre Nós", partner: "Acesso Parceiros", all: "Ver Todos" },
  partner: {
      title: "Acesso Profissional", subtitle: "Junte-se à rede de elite da MA Fashion LLC.", success: "Candidatura Recebida", successMsg: "Um representante entrará em contato em breve.",
      labels: { name: "Nome Completo", email: "E-mail", phone: "Telefone", stylist: "Você é um estilista licenciado?", salon: "Você possui um salão?", services: "Serviços prestados", yes: "Sim", no: "Não", next: "Próximo Passo", back: "Voltar", submit: "Enviar Candidatura", return: "Voltar ao Início" },
      benefits: ["Preços de atacado de até 40% de desconto", "Acesso a Masterclasses MA", "Kit de marketing e mídia social", "Gerente de conta dedicado"],
      servicesList: ["Alinhamento Térmico", "Hair Botox", "Coloração", "Cortes", "Extensões", "Tratamentos", "Vendas a Varejo"]
  },
  common: { 
    discover: "Descubra Mais", collection: "Coleção", maNews: "NOTÍCIAS MA", featured: "Coleção em Destaque", special: "Oferta Especial", learnMore: "Saiba Mais", innovation: "Inovação e Ciência", luxury: "Exclusivo e Luxuoso", privacy: "Política de Privacidade", terms: "Termos de Serviço", representatives: "Representantes", social: "Social", unitedStates: "Estados Unidos", theInnovation: "A Inovação", theLuxury: "O Luxo", readMore: "Ler Mais", howToUse: "Aplicação Técnica", benefits: "Principais Benefícios", mainAssets: "Tecnologia Principal", intensity: "Intensidade do Tratamento", functions: "Principais Funções", 
    backTo: "Voltar para", buyForSalon: "Comprar para Salão", resultsTitle: "Resultados que inspiram", techManual: "Manual Técnico", techManualDesc: "Preencha os detalhes abaixo para receber o manual técnico por e-mail.", aiAssistant: "Assistente IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Hidratação", nutrition: "Nutrição", reconstruction: "Reconstrução", buyNow: "Comprar Agora"
  },
  tagline: "Biotecnologia Capilar Global", titleStart: "A Ciência da", titleEnd: "Beleza.", subtitle: "A MA Fashion LLC apresenta o futuro do cuidado capilar profissional. Descubra Sweet e S Professional.", ctaDiagnosis: "Assistência ao Vivo 24/7", ctaShop: "Ver Coleção", collectionTitle: "Coleções Exclusivas", collectionSub: "Grau Profissional. Exclusivo para Salões.", viewAll: "Ver Tudo",
  promos: {
      ticker: "NOTÍCIA: Novo Programa de Parceiros • Compre 5 Leve 1 Grátis no The First Shampoo • Junte-se à Revolução", comingUp: "Próximo",
      items: [
          { title: "Programa de Parceiros", desc: "Preços exclusivos e educação avançada para profissionais licenciados.", cta: "Candidate-se Agora" },
          { title: "Lançamento My Crown", desc: "A revolução para cabelos cacheados. Defina, hidrate e memorize a curvatura.", cta: "Descubra My Crown" },
          { title: "Domine a Arte", desc: "Participe da nossa próxima certificação nos EUA. Aprenda os segredos da reconstrução enzimática.", cta: "Reserve seu Lugar" }
      ]
  },
  footer: { about: "A MA Fashion LLC lidera o mercado global em biotecnologia capilar, fornecendo soluções de alto desempenho.", links: "Links Rápidos", legal: "Jurídico", contact: "Contato", rights: "© 2024 MA Fashion LLC. Todos os direitos reservados." },
  sweet: { title: "Sweet Professional", desc: "A marca que revolucionou o mercado com o primeiro alisador térmico em champô. Inovação e segurança.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, lineDescs: { thefirst: "O primeiro champô alisador do mundo. 5 patentes.", cronology: "Mapeamento biotecnológico para tratamentos personalizados.", sos: "Resgate de emergência para cabelos danificados." } },
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
          functions: [{ title: "Tecnologia Nutrology", desc: "Nutrição Intensa com alta permeação no córtex." }, { title: "Funções Principais", desc: "Nutrição para cabelos secos e proteção antioxidante." }]
      },
      hidratherapy: { headline: "Tecnologia de Ozono e Hidratação Extrema", benefits: ["Hidratação celular profunda", "Proteção de efeito ozono"], assets: ["Ozônio Ativo O3", "Ácido Hialurônico"], intensity: { hydration: 100, nutrition: 20, reconstruction: 10 } },
      profusion: { headline: "Reconstrução Enzimática de Alto Desempenho", benefits: ["Reverte danos químicos", "Restaura elasticidade"], assets: ["Enzimas Proteolíticas", "Bio-Keratina"], intensity: { hydration: 30, nutrition: 40, reconstruction: 100 } },
      brushing: { headline: "Alinhamento Térmico Orgânico de Alta Velocidade", benefits: ["100% Livre de Formol", "Aplicação ultra-rápida"], assets: ["Base Taninoplastia", "Ácidos Orgânicos"], intensity: { hydration: 40, nutrition: 50, reconstruction: 30 } },
      mycrown: { headline: "A Revolução da Memória de Curvatura", benefits: ["Define todos os tipos de cachos", "Memoriza curvatura"], assets: ["Tecnologia Curl Memory", "Óleo de Linhaça"], intensity: { hydration: 60, nutrition: 80, reconstruction: 20 } }
    }
  },
  education: { title: "Academia MA", subtitle: "Domine a Arte", desc: "Mergulhe em eventos globais onde a ciência encontra a arte. Nossa educação técnica eleva os padrões." },
  about: { title: "Quem Somos", subtitle: "Liderança Global", desc: "Somos os arquitetos da transformação capilar. MA Fashion LLC une ciência e arte.", ambassadorsTitle: "Rede de Embaixadores Artísticos", ambassadorsDesc: "Nossa equipe de elite de artistas oficiais nos EUA.", ambassadorList: [{ name: "Katherine Avendaño", role: "Master Stylist & Educadora", location: "EUA" }, { name: "Fernando Mendez", role: "Master Stylist", location: "EUA" }, { name: "Ohnayak Firpi", role: "Master Stylist", location: "EUA" }, { name: "Arnaldo Cruz", role: "Master Barber", location: "EUA" }], repsTitle: "Conselho Executivo", stats: { years: "Anos de Excelência", salons: "Salões Parceiros", countries: "Presença Global" }, roles: { techAmb: "Fundadora, Embaixadora & Técnica Intl", ceo: "CEO & Fundador", marketingDir: "Diretora de Marketing", opsDir: "Diretor de Operações", stylist: "Elite Stylist & Educadora" } }
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
    discover: "Scopri di Più", collection: "Collezione", maNews: "MA NEWS", featured: "Collezione in Primo Piano", special: "Offerta Speciale", learnMore: "Ulteriori Informazioni", innovation: "Innovazione e Scienza", luxury: "Esclusivo e Lussuoso", privacy: "Privacy Policy", terms: "Termini di Servizio", representatives: "Rappresentanti", social: "Social", unitedStates: "Stati Uniti", theInnovation: "L'Innovazione", theLuxury: "Il Lusso", readMore: "Leggi di Più", howToUse: "Applicazione Tecnica", benefits: "Vantaggi Chiave", mainAssets: "Tecnologia Principale", intensity: "Intensità del Trattamento", functions: "Funzioni Primarie", 
    backTo: "Torna a", buyForSalon: "Acquista per il Salone", resultsTitle: "Risultati che ispirano", techManual: "Manuale Tecnico", techManualDesc: "Compila i dettagli per ricevere il manuale tecnico via email.", aiAssistant: "Assistente IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Idratazione", nutrition: "Nutrizione", reconstruction: "Ricostruzione", buyNow: "Acquista Ora"
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
  sweet: { title: "Sweet Professional", desc: "Il brand che ha rivoluzionato il mercato con il primo lisciante termico in shampoo. Innovazione e sicurezza.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, lineDescs: { thefirst: "Il primo shampoo lisciante al mondo. 5 brevetti.", cronology: "Mappatura biotecnologica per trattamenti personalizzati.", sos: "Soccorso d'emergenza per capelli danneggiati chimicamente." } },
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
          functions: [{ title: "Tecnologia Nutrology", desc: "Nutrizione Intensa con alta penetrazione nel cortex." }, { title: "Funzioni Chiave", desc: "Nutrizione per capelli secchi e protezione antiossidante." }]
      },
      hidratherapy: { headline: "Tecnologia Ozono e Idratazione Estrema", benefits: ["Idratazione cellulare profonda", "Effetto ozono protettivo"], assets: ["Ozono Attivo O3", "Acido Ialuronico"], intensity: { hydration: 100, nutrition: 20, reconstruction: 10 } },
      profusion: { headline: "Ricostruzione Enzimatica ad Alte Prestazioni", benefits: ["Inverte il danno chimico", "Ripristina elasticità"], assets: ["Enzimi Proteolitici", "Bio-Cheratina"], intensity: { hydration: 30, nutrition: 40, reconstruction: 100 } },
      brushing: { headline: "Allineamento Termico Organico Veloce", benefits: ["100% Senza Formaldeide", "Applicazione ultra-veloce"], assets: ["Base Taninoplastia", "Acidi Organici"], intensity: { hydration: 40, nutrition: 50, reconstruction: 30 } },
      mycrown: { headline: "La Rivoluzione della Memoria di Curvatura", benefits: ["Definisce tutti i tipi di ricci", "Memorizza curvatura"], assets: ["Tecnologia Curl Memory", "Olio di Lino"], intensity: { hydration: 60, nutrition: 80, reconstruction: 20 } }
    }
  },
  education: { title: "MA Academy", subtitle: "Domina l'Arte", desc: "Immergiti negli eventi globali dove la scienza incontra l'arte. La nostra formazione eleva gli standard." },
  about: { title: "Chi Siamo", subtitle: "Leadership Globale", desc: "Siamo gli architetti della trasformazione capillare. MA Fashion LLC unisce scienza e arte.", ambassadorsTitle: "Rete di Ambasciatori Artistici", ambassadorsDesc: "Il nostro team d'élite di artisti ufficiali negli USA.", ambassadorList: [{ name: "Katherine Avendaño", role: "Master Stylist & Educatrice", location: "Stati Uniti" }, { name: "Fernando Mendez", role: "Master Stylist", location: "Stati Uniti" }, { name: "Ohnayak Firpi", role: "Master Stylist", location: "Stati Uniti" }, { name: "Arnaldo Cruz", role: "Master Barber", location: "Stati Uniti" }], repsTitle: "Consiglio Direttivo", stats: { years: "Anni di Eccellenza", salons: "Saloni Partner", countries: "Presenza Globale" }, roles: { techAmb: "Fondatrice, Ambasciatrice & Tecnico Intl", ceo: "CEO & Fondatore", marketingDir: "Direttore Marketing", opsDir: "Direttore Operativo", stylist: "Elite Stylist & Educatrice" } }
};

const frTranslation = {
  nav: { home: "Accueil", sweet: "Sweet Professional", s: "S Professional", edu: "Éducation", about: "À Propos", partner: "Accès Partenaire", all: "Voir Tout" },
  partner: {
      title: "Accès Professionnel", subtitle: "Rejoignez le réseau d'élite de MA Fashion LLC.", success: "Candidature Reçue", successMsg: "Un représentant vous contactera sous peu.",
      labels: { name: "Nom Complet", email: "E-mail", phone: "Téléphone", stylist: "Êtes-vous un styliste agréé ?", salon: "Possédez-vous un salon ?", services: "Services fournis", yes: "Oui", no: "Non", next: "Suivant", back: "Retour", submit: "Envoyer la Candidature", return: "Retour à l'Accueil" },
      benefits: ["Prix de gros jusqu'à 40% de réduction", "Accès aux Masterclasses MA", "Kit marketing & réseaux sociaux", "Gestionnaire de compte dédié"],
      servicesList: ["Alignement Thermique", "Hair Botox", "Coloration", "Coupes", "Extensions", "Traitements", "Ventes au Détail"]
  },
  common: { 
    discover: "Découvrir Plus", collection: "Collection", maNews: "MA NEWS", featured: "Collection Vedette", special: "Offre Spéciale", learnMore: "En Savoir Plus", innovation: "Innovation & Science", luxury: "Exclusif & Luxueux", privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation", representatives: "Représentants", social: "Social", unitedStates: "États-Unis", theInnovation: "L'Innovation", theLuxury: "Le Luxe", readMore: "Lire Plus", howToUse: "Application Technique", benefits: "Avantages Clés", mainAssets: "Technologie Principale", intensity: "Intensité du Traitement", functions: "Fonctions Primaires", 
    backTo: "Retour à", buyForSalon: "Acheter pour le Salon", resultsTitle: "Des résultats qui inspirent", techManual: "Manuel Technique", techManualDesc: "Remplissez les détails pour recevoir le manuel technique par e-mail.", aiAssistant: "Assistant IA", phoneNum: "+1 (407) 218-1294", address: "Orlando, FL, USA", 
    hydration: "Hydratation", nutrition: "Nutrition", reconstruction: "Reconstruction", buyNow: "Acheter Maintenant"
  },
  tagline: "Biotechnologie Capillaire Globale", titleStart: "La Science de la", titleEnd: "Beauté.", subtitle: "MA Fashion LLC présente l'avenir des soins capillaires professionnels. Découvrez Sweet et S Professional.", ctaDiagnosis: "Assistance en Direct 24/7", ctaShop: "Voir Collection", collectionTitle: "Collections Exclusives", collectionSub: "Grade Professionnel. Exclusif aux Salons.", viewAll: "Voir Tout",
  promos: {
      ticker: "ACTUALITÉ : Nouveau Programme Partenaire • Achetez 5 recevez 1 gratuit sur The First Shampoo • Rejoignez la Révolution", comingUp: "À Suivre",
      items: [
          { title: "Programme Partenaire Salon", desc: "Prix exclusifs et éducation avancée pour les professionnels.", cta: "Postuler Maintenant" },
          { title: "Lancement My Crown", desc: "La révolution pour les cheveux bouclés. Définissez, hydratez et mémorisez la courbure.", cta: "Découvrir My Crown" },
          { title: "Maîtriser l'Art", desc: "Rejoignez notre prochaine certification aux USA. Apprenez les secrets de la reconstruction enzymatique.", cta: "Réserver Place" }
      ]
  },
  footer: { about: "MA Fashion LLC mène le marché mondial de la biotechnologie capillaire, offrant des solutions haute performance.", links: "Liens Rapides", legal: "Juridique", contact: "Contact", rights: "© 2024 MA Fashion LLC. Tous droits réservés." },
  sweet: { title: "Sweet Professional", desc: "La marque qui a révolutionné le marché avec le premier lisseur thermique en shampooing. Innovation et sécurité.", lines: { thefirst: "The First", cronology: "Cronology", sos: "S.O.S" }, lineDescs: { thefirst: "Le premier shampooing lissant au monde. 5 brevets.", cronology: "Cartographie biotechnologique pour des traitements personnalisés.", sos: "Sauvetage d'urgence pour cheveux chimiquement endommagés." } },
  sprofessional: {
    title: "S Professional", subtitle: "Systèmes de Thérapie Capillaire", desc: "Un écosystème complet de traitements pour le styliste moderne.", commonDesc: "Découvrez la transformation capillaire ultime avec notre biotechnologie brevetée.",
    lines: { nutrology: "Nutrology - Nutrition Profonde", hidratherapy: "Hidratherapy - Hydratation Ozone", brushing: "Brushing+ - Alignement Thermique", profusion: "Pro Fusion - Reconstruction Enzymatique", mycrown: "My Crown - Définition des Boucles" },
    details: {
      nutrology: {
          headline: "Biotechnologie et Humectants Naturels",
          info: "Nutrology offre une nutrition intense selon la sécheresse des cheveux. Utilise un mélange unique d'huiles végétales.",
          benefits: ["Remplacement lipidique instantané", "Brillance diamant", "Protection anti-frizz", "Mouvement léger"],
          assets: ["Nano-Particules Lipidiques", "Complexe d'Acides Aminés", "Beurre de Karité Bio"],
          intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
          functions: [{ title: "Technologie Nutrology", desc: "Nutrition Intense avec haute perméation dans le cortex." }, { title: "Fonctions Clés", desc: "Nutrition pour cheveux secs et protection antioxydante." }]
      },
      hidratherapy: { headline: "Technologie Ozone et Hydratation Extrême", benefits: ["Hydratation cellulaire profonde", "Protection effet ozone"], assets: ["Ozone Actif O3", "Acide Hyaluronique"], intensity: { hydration: 100, nutrition: 20, reconstruction: 10 } },
      profusion: { headline: "Reconstruction Enzymatique Haute Performance", benefits: ["Inverse les dommages chimiques", "Restaure l'élasticité"], assets: ["Enzymes Protéolytiques", "Bio-Kératine"], intensity: { hydration: 30, nutrition: 40, reconstruction: 100 } },
      brushing: { headline: "Alignement Thermique Organique Rapide", benefits: ["100% Sans Formaldéhyde", "Application ultra-rapide"], assets: ["Base Taninoplastie", "Acides Organiques"], intensity: { hydration: 40, nutrition: 50, reconstruction: 30 } },
      mycrown: { headline: "La Révolution de la Mémoire de Courbure", benefits: ["Définit tous types de boucles", "Mémorise la courbure"], assets: ["Technologie Curl Memory", "Huile de Lin"], intensity: { hydration: 60, nutrition: 80, reconstruction: 20 } }
    }
  },
  education: { title: "Académie MA", subtitle: "Maîtriser l'Art", desc: "Plongez dans des événements mondiaux où la science rencontre l'art. Notre éducation technique élève les standards." },
  about: { title: "Qui Sommes-Nous", subtitle: "Leadership Mondial", desc: "Nous sommes les architectes de la transformation capillaire. MA Fashion LLC unit science et art.", ambassadorsTitle: "Réseau d'Ambassadeurs Artistiques", ambassadorsDesc: "Notre équipe d'élite d'artistes officiels aux États-Unis.", ambassadorList: [{ name: "Katherine Avendaño", role: "Master Stylist & Éducatrice", location: "États-Unis" }, { name: "Fernando Mendez", role: "Master Stylist", location: "États-Unis" }, { name: "Ohnayak Firpi", role: "Master Stylist", location: "États-Unis" }, { name: "Arnaldo Cruz", role: "Master Barber", location: "États-Unis" }], repsTitle: "Conseil d'Administration", stats: { years: "Années d'Excellence", salons: "Salons Partenaires", countries: "Présence Mondiale" }, roles: { techAmb: "Fondatrice, Ambassadrice & Tech Intl", ceo: "PDG & Fondateur", marketingDir: "Directrice Marketing", opsDir: "Directeur des Opérations", stylist: "Styliste Élite & Éducatrice" } }
};

const translations: Record<Language, any> = {
  en: enTranslation,
  es: esTranslation,
  pt: ptTranslation,
  it: itTranslation,
  fr: frTranslation
};

// --- Intensity Bar Component with Animation on Scroll ---
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
          <div className="relative group/nav">
              <div className="flex items-center gap-1 cursor-pointer">
                  <button onClick={() => handleNav('sprofessional')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab.startsWith('sp') ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.s}</button>
                  <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isSProfessionalOpen ? 'rotate-180 text-amber-500' : ''}`} onClick={(e) => { e.stopPropagation(); setIsSProfessionalOpen(!isSProfessionalOpen); }} />
              </div>
              {isSProfessionalOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden py-2 animate-fade-in">
                    {sProfessionalTreatments.map((item) => (
                        <button key={item.id} onClick={() => handleNav(item.id)} className="w-full text-left px-6 py-4 text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-400 hover:bg-white/5 transition-all flex items-center justify-between group/sub">
                            {item.label} <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                        </button>
                    ))}
                </div>
              )}
          </div>
          <button onClick={() => handleNav('sweet')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'sweet' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.sweet}</button>
          <button onClick={() => handleNav('education')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'education' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.edu}</button>
          <button onClick={() => handleNav('about')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'about' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.about}</button>
          <button onClick={() => handleNav('partner')} className={`text-sm uppercase tracking-widest hover:text-amber-400 transition-all ${activeTab === 'partner' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{t.nav.partner}</button>
        </div>
        <div className="hidden md:flex items-center gap-6">
           <div className="relative group">
              <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
                  <Globe size={14} /> <span>{flags[lang]}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden hidden group-hover:block min-w-[120px]">
                  {Object.keys(flags).map((code) => (
                      <button key={code} onClick={() => setLang(code as Language)} className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-3 ${lang === code ? 'text-amber-400 bg-zinc-800/50' : 'text-zinc-400'}`}>
                          <span className="text-lg">{flags[code]}</span> <span>{code.toUpperCase()}</span>
                      </button>
                  ))}
              </div>
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

const TreatmentDetail = ({ id, t, handleNav }: any) => {
    const key = id.split('-')[1];
    const data = t.sprofessional.details[key];
    const labels = t.sprofessional.lines;
    const commonLabels = t.common;
    const icons: any = { nutrology: <Droplets className="text-amber-500" />, hidratherapy: <Wind className="text-blue-400" />, profusion: <Zap className="text-yellow-400" />, brushing: <Flame className="text-orange-500" />, mycrown: <Crown className="text-amber-300" /> };
    const treatmentImages: any = { nutrology: "https://sprofessional.com.br/wp-content/uploads/2023/02/Modelo-Nutrology.jpg", hidratherapy: "https://i.ibb.co/b5K9vjdt/Hidratherapy-Catalogo.jpg", profusion: "https://i.ibb.co/G4ygrnym/Profusion-catalogo.jpg", brushing: "https://i.ibb.co/ycD8KZgr/Brushing-catalolgo-1.jpg", mycrown: "https://i.ibb.co/7xw4wc49/My-Crown-Catalogo.jpg" };
    const type = key as keyof typeof treatmentImages;

    return (
        <div className="bg-black min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <button onClick={() => handleNav('sprofessional')} className="mb-12 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs uppercase tracking-widest"><ChevronLeft size={16} /> {commonLabels.backTo} S Professional</button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-3">
                            <div className="p-3 bg-white/5 rounded-xl">{icons[type]}</div>
                            <span className="text-amber-500 text-xs font-bold tracking-[0.4em] uppercase">{t.nav.s}</span>
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

                <div className="bg-zinc-900/30 rounded-3xl p-12 border border-white/5">
                    <div className="text-center max-w-2xl mx-auto space-y-6">
                         <h3 className="text-3xl font-serif text-white">{commonLabels.techManual}</h3>
                         <p className="text-zinc-400 font-light">{commonLabels.techManualDesc}</p>
                         <div className="flex flex-col md:flex-row gap-4 mt-8">
                             <input type="email" placeholder={t.partner.labels.email} className="flex-grow bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-white outline-none focus:border-amber-500" />
                             <button className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-amber-400 transition-all">{t.partner.labels.submit}</button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSection = ({ t }: any) => {
  const tickerContent = t.promos.items.map((item: any) => `${item.title}: ${item.desc}`).join("  ✦  ").toUpperCase();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1620331313174-d73105a3f333?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 scale-105 animate-spin-reverse-slow duration-[100s]" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" /><div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay"></div></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center"><div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-2 rounded-full mb-8 animate-fade-in-up backdrop-blur-md"><Sparkles size={14} className="text-amber-400 animate-pulse" /><span className="text-amber-300 text-xs font-bold tracking-[0.2em] uppercase">{t.tagline}</span></div><h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium text-white mb-8 leading-tight animate-fade-in-up delay-100 tracking-tighter"><span className="block opacity-90">{t.titleStart}</span><span className="text-gold italic relative inline-block">{t.titleEnd}<span className="absolute -bottom-4 left-0 w-full h-1 bg-amber-500/50 rounded-full blur-sm"></span></span></h1><p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up delay-200">{t.subtitle}</p><div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300"><button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="group relative px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold tracking-widest uppercase text-sm transition-all rounded-sm overflow-hidden"><div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" /><span className="relative flex items-center gap-2">{t.ctaDiagnosis} <Mic size={16} /></span></button></div></div>
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
            <section className="py-32 bg-zinc-950 relative overflow-hidden"><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div><div className="max-w-7xl mx-auto px-6 relative z-10"><div className="flex flex-col md:flex-row justify-between items-end mb-20"><div><span className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase block mb-4">{t.common.collection}</span><h2 className="font-serif text-5xl md:text-6xl text-white tracking-tighter">{t.collectionTitle}</h2></div><div className="text-right mt-6 md:mt-0"><p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">{t.collectionSub}</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-12"><div className="relative group cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={() => setRotate({ x: 0, y: 0 })} onClick={() => handleNav('sprofessional')}><div className="relative aspect-[3/4] rounded-sm bg-black border border-white/10 transition-transform duration-100 ease-linear shadow-2xl" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}><div className="absolute inset-0 overflow-hidden rounded-sm"><img src="https://i.ibb.co/WNNyvZBc/grok-image-Genera-una-fotograf-a-editorial-de-alta-costura-basada-en-la-imagen-adjunta-para-una-re.jpg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /></div><div className="absolute bottom-8 left-8 z-30"><h3 className="text-5xl font-serif text-white mb-2 italic">{t.nav.s}</h3><span className="text-amber-400 text-xs tracking-[0.3em] uppercase mt-2 block">{t.common.theLuxury}</span></div></div></div><div className="relative group cursor-pointer" onClick={() => handleNav('sweet')}><div className="relative z-10 aspect-[3/4] bg-black overflow-hidden rounded-sm border border-white/10"><img src="https://i.ibb.co/k27CNTnc/portada-sweet.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute bottom-0 right-0 w-full p-8 text-right"><h3 className="text-5xl font-serif text-white mb-2 italic">{t.nav.sweet}</h3><span className="text-xs text-white/50 tracking-[0.2em] uppercase">{t.common.theInnovation}</span></div></div></div></div></div></section>
        </>
    );
};

const SProfessionalSection = ({ t, handleNav }: any) => {
    const treatments = [
        { id: 'sp-nutrology', title: t.sprofessional.lines.nutrology, img: "https://i.ibb.co/3mCLQfnG/Nutrology-Catalogo.jpg", desc: t.sprofessional.details.nutrology.headline },
        { id: 'sp-hidratherapy', title: t.sprofessional.lines.hidratherapy, img: "https://i.ibb.co/b5K9vjdt/Hidratherapy-Catalogo.jpg", desc: t.sprofessional.details.hidratherapy.headline },
        { id: 'sp-profusion', title: t.sprofessional.lines.profusion, img: "https://i.ibb.co/G4ygrnym/Profusion-catalogo.jpg", desc: t.sprofessional.details.profusion.headline },
        { id: 'sp-brushing', title: t.sprofessional.lines.brushing, img: "https://i.ibb.co/ycD8KZgr/Brushing-catalolgo-1.jpg", desc: t.sprofessional.details.brushing.headline },
        { id: 'sp-mycrown', title: t.sprofessional.lines.mycrown, img: "https://i.ibb.co/7xw4wc49/My-Crown-Catalogo.jpg", desc: t.sprofessional.details.mycrown.headline }
    ];
    return (
        <section className="min-h-screen bg-black relative"><div className="h-[50vh] flex items-center justify-center bg-radial-gradient from-zinc-900 to-black relative overflow-hidden"><div className="absolute inset-0 bg-grid-white opacity-10 animate-scan"></div><div className="text-center z-10 px-6 max-w-4xl mx-auto animate-fade-in"><span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-6">{t.common.luxury}</span><h2 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tighter">{t.sprofessional.title}</h2><p className="text-xl text-zinc-300 font-light">{t.sprofessional.commonDesc}</p></div></div><div className="max-w-7xl mx-auto px-6 py-20 space-y-32">{treatments.map((item, i) => (<div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 reveal-on-scroll is-visible`}><div className="w-full md:w-1/2 relative group cursor-pointer" onClick={() => handleNav(item.id)}><div className="relative overflow-hidden rounded-sm shadow-2xl aspect-[4/3] border border-white/5"><img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" /><div className="absolute inset-6 border border-white/10 group-hover:border-amber-500/30 transition-colors duration-500"></div></div></div><div className="w-full md:w-1/2 space-y-6 text-center md:text-left"><h3 className="text-4xl md:text-5xl font-serif text-white leading-tight italic">{item.title.split(' - ')[0]}</h3><p className="text-amber-500 text-sm tracking-[0.2em] uppercase">{item.title.split(' - ')[1]}</p><p className="text-zinc-400 text-lg font-light leading-relaxed">{item.desc}</p><button onClick={() => handleNav(item.id)} className="text-white border-b border-white/20 pb-1 hover:text-amber-400 hover:border-amber-400 transition-all uppercase text-xs tracking-widest mt-4">{t.common.discover}</button></div></div>))}</div></section>
    );
};

const SweetSection = ({ t }: any) => (<section className="min-h-screen bg-zinc-950 pt-32 pb-20 relative"><div className="max-w-7xl mx-auto px-6"><div className="mb-20 text-center"><span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.common.innovation}</span><h2 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tighter">{t.sweet.title}</h2><p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">{t.sweet.desc}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[{ id: 'thefirst', title: t.sweet.lines.thefirst, desc: t.sweet.lineDescs.thefirst, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1972&auto=format&fit=crop" }, { id: 'cronology', title: t.sweet.lines.cronology, desc: t.sweet.lineDescs.cronology, img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1974&auto=format&fit=crop" }, { id: 'sos', title: t.sweet.lines.sos, desc: t.sweet.lineDescs.sos, img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1978&auto=format&fit=crop" }].map((item) => (<div key={item.id} className="group relative aspect-[9/16] bg-zinc-900 border border-white/5 overflow-hidden transition-all hover:border-amber-500/30"><img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 duration-700" /><div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" /><div className="absolute bottom-0 left-0 w-full p-8"><h3 className="text-3xl font-serif text-white mb-2 italic">{item.title}</h3><p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p></div></div>))}</div></div></section>);

const EducationSection = ({ t }: any) => (<section className="min-h-screen bg-zinc-950 pt-32 pb-20"><div className="max-w-7xl mx-auto px-6"><div className="text-center mb-24"><span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block mb-4">{t.education.title}</span><h2 className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tighter">{t.education.subtitle}</h2></div><p className="text-center text-zinc-400 max-w-2xl mx-auto text-lg font-light mb-20">{t.education.desc}</p><div className="flex items-center justify-center h-40 bg-zinc-900/50 rounded-3xl border border-white/5"><span className="text-zinc-500 font-serif italic text-2xl tracking-widest">{t.common.resultsTitle}</span></div></div></section>);

const CountUp = ({ end }: { end: number }) => { const [count, setCount] = useState(0); useEffect(() => { let start = 0; const duration = 2000; const timer = setInterval(() => { start += end/100; if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(Math.floor(start)); } }, duration/100); return () => clearInterval(timer); }, [end]); return <span>{count}</span>; };

const AboutSection = ({ t }: any) => {
    const ambassadorImages = ["https://i.ibb.co/M5h85W16/Whats-App-Image-2025-12-10-at-9-44-21-PM.jpg", "https://i.ibb.co/Lz3J4KHR/Whats-App-Image-2025-12-11-at-6-51-05-PM.jpg", "https://i.ibb.co/N6pWP5M5/Whats-App-Image-2025-12-13-at-11-01-10-PM.jpg", "https://i.ibb.co/sv4mqWvw/JPG-NALDO-HEADSHOT-06.jpg"];
    const leadership = [{ name: "Ernesto Aramburu", role: t.about.roles.ceo, image: "https://i.ibb.co/tPJq9rPS/Ernesto.jpg" }, { name: "Alejandra Mendez", role: t.about.roles.techAmb, image: "https://i.ibb.co/7NRw8gzw/ALejnadra.jpg" }, { name: "Luisana Muñoz", role: t.about.roles.marketingDir, image: "https://i.ibb.co/4w4n2R65/Luisana.jpg" }, { name: "Ernesto Aramburu Jr.", role: t.about.roles.opsDir, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" }];
    return (<section className="bg-black text-white pt-20"><div className="px-8 max-w-7xl mx-auto mb-20 text-center"><h2 className="text-5xl lg:text-7xl font-serif mb-8">{t.about.title}</h2><p className="text-xl text-zinc-400 font-light max-w-4xl mx-auto">{t.about.desc}</p><div className="grid grid-cols-3 gap-8 mt-12 border-t border-amber-500/20 pt-12"><div className="text-center"><span className="block text-4xl font-serif"><CountUp end={15} />+</span><span className="text-xs text-amber-500 uppercase">{t.about.stats.years}</span></div><div className="text-center"><span className="block text-4xl font-serif"><CountUp end={5000} />+</span><span className="text-xs text-amber-500 uppercase">{t.about.stats.salons}</span></div><div className="text-center"><span className="block text-4xl font-serif"><CountUp end={20} />+</span><span className="text-xs text-amber-500 uppercase">{t.about.stats.countries}</span></div></div></div><div className="max-w-7xl mx-auto px-6 py-20"><h3 className="text-center text-amber-500 text-xs tracking-widest uppercase mb-12">{t.about.repsTitle}</h3><div className="grid grid-cols-1 md:grid-cols-4 gap-8">{leadership.map((person, i) => (<div key={i} className="text-center"><div className="aspect-[3/4] mb-4 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all"><img src={person.image} className="w-full h-full object-cover" /></div><h4 className="text-xl font-serif text-white">{person.name}</h4><p className="text-amber-500 text-[10px] uppercase">{person.role}</p></div>))}</div></div><div className="bg-zinc-950 py-32 border-t border-white/5"><div className="max-w-7xl mx-auto px-6"><h3 className="text-4xl md:text-6xl font-serif text-white mb-4 text-center">{t.about.ambassadorsTitle}</h3><p className="text-center text-zinc-500 mb-16 max-w-xl mx-auto">{t.about.ambassadorsDesc}</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{t.about.ambassadorList.map((amb: any, i: number) => (<div key={i} className="group relative cursor-pointer"><div className="aspect-[3/4] overflow-hidden rounded-sm border border-white/10 group-hover:border-amber-500 transition-all"><img src={ambassadorImages[i]} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0" /><div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent"><h4 className="text-2xl font-serif text-white italic">{amb.name}</h4><p className="text-zinc-300 text-[10px] uppercase">{amb.role}</p></div></div></div>))}</div></div></div></section>);
};

const PartnerAccessSection = ({ t }: any) => { const [step, setStep] = useState(1); const handleSubmit = (e: any) => { e.preventDefault(); setStep(3); }; return (<section className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center"><div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div className="space-y-8 animate-fade-in-up"><h2 className="text-5xl lg:text-7xl font-serif text-white leading-tight">{t.partner.title}</h2><p className="text-xl text-zinc-400 font-light border-l-2 border-amber-500 pl-6">{t.partner.subtitle}</p></div><div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 relative overflow-hidden">{step === 3 ? (<div className="text-center py-12 animate-fade-in-up"><Check size={40} className="text-green-500 mx-auto mb-6" /><h3 className="text-3xl font-serif text-white mb-4">{t.partner.success}</h3><p className="text-zinc-400">{t.partner.successMsg}</p></div>) : (<form onSubmit={handleSubmit} className="space-y-6"><input type="text" placeholder={t.partner.labels.name} required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500" /><input type="email" placeholder={t.partner.labels.email} required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-amber-500" /><button type="submit" className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-amber-400 transition-all">{t.partner.labels.submit}</button></form>)}</div></div></section>); };

const Footer = ({ t, handleNav }: any) => (<footer className="bg-black border-t border-white/10 pt-20 pb-10"><div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"><div className="space-y-6"><h3 className="text-2xl font-serif text-white font-bold">MA FASHION LLC</h3><p className="text-zinc-500 text-sm">{t.footer.about}</p></div><div><h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">{t.footer.links}</h4><ul className="space-y-4 text-zinc-500 text-sm"><li><button onClick={() => handleNav('home')}>{t.nav.home}</button></li><li><button onClick={() => handleNav('sprofessional')}>{t.nav.s}</button></li><li><button onClick={() => handleNav('sweet')}>{t.nav.sweet}</button></li><li><button onClick={() => handleNav('about')}>{t.nav.about}</button></li></ul></div><div><h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">{t.footer.legal}</h4><ul className="space-y-4 text-zinc-500 text-sm"><li><a href="#">{t.common.privacy}</a></li><li><a href="#">{t.common.terms}</a></li></ul></div><div><h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">{t.footer.contact}</h4><ul className="space-y-4 text-zinc-500 text-sm"><li>{t.common.address}</li><li>{t.common.phoneNum}</li></ul></div></div><div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex justify-between text-zinc-600 text-xs"><p>{t.footer.rights}</p><p>{t.common.unitedStates}</p></div></footer>);

const App = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [lang, setLang] = useState<Language>('en'); 
    const [showWhatsApp, setShowWhatsApp] = useState(false);
    const t = translations[lang];
    const { connect, disconnect, status, isMuted, isVideoActive, toggleMute, toggleVideo, volumeLevel, videoRef, canvasRef } = useLiveAPI();
    
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
        if (activeTab.startsWith('sp-')) return <TreatmentDetail id={activeTab} t={t} handleNav={handleNavigation} />;
        switch (activeTab) {
            case 'home': return <HomeSection t={t} handleNav={handleNavigation} />;
            case 'sweet': return <SweetSection t={t} />;
            case 'sprofessional': return <SProfessionalSection t={t} handleNav={handleNavigation} />;
            case 'education': return <EducationSection t={t} />;
            case 'about': return <AboutSection t={t} />;
            case 'partner': return <PartnerAccessSection t={t} />;
            default: return <HomeSection t={t} handleNav={handleNavigation} />;
        }
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 selection:bg-amber-500/30 font-sans flex flex-col w-full">
            <Navigation activeTab={activeTab} setActiveTab={handleNavigation} lang={lang} setLang={setLang} t={t} />
            <main className="flex-grow w-full">{renderContent()}</main>
            <Footer t={t} handleNav={handleNavigation} />
             <div className={`fixed bottom-32 right-6 z-40 transition-all duration-500 transform ${showWhatsApp ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}><a href={`https://wa.me/${t.common.phoneNum.replace(/\D/g,'')}`} target="_blank" className="block transition-transform hover:scale-110"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-14 h-14 drop-shadow-2xl" /></a></div>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
                {status === LiveStatus.CONNECTED && <div className="mb-4 animate-fade-in-up"><Visualizer volume={volumeLevel} isActive={true} /></div>}
                {status === LiveStatus.DISCONNECTED ? (
                  <button onClick={connect} disabled={!hasApiKey()} className="group relative flex items-center gap-3 pl-6 pr-2 py-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 rounded-full shadow-lg hover:scale-105 transition-all">
                    <span className="text-black font-bold text-sm tracking-widest uppercase">{t.common.aiAssistant}</span>
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <Mic size={20} className="text-amber-400" />
                    </div>
                  </button>
                ) : (
                  <ControlTray status={status} isMuted={isMuted} isVideoActive={isVideoActive} onConnect={connect} onDisconnect={disconnect} onToggleMute={toggleMute} onToggleVideo={toggleVideo} />
                )}
                <video ref={videoRef} className="hidden" autoPlay playsInline muted /><canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    );
};
export default App;