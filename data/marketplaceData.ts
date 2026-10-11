// --- MARKETPLACE DATA & CONFIGURATION ---
// MA Fashion LLC - Official Marketplace Catalog Data

export type Language = 'en' | 'es' | 'pt' | 'it' | 'fr';

export type PriceStatus = 'confirmed' | 'pending' | 'demo';

export interface ProductItem {
  id: string;
  code: string;
  name: Record<Language, string>;
  brand: 'S Professional' | 'Sweet Professional' | 'Home Care';
  category: 'professional' | 'homecare';
  lineId: string; // for connecting with existing detail views
  presentation: Record<Language, string>;
  volume: string;
  headline: Record<Language, string>;
  description: Record<Language, string>;
  benefits: Record<Language, string[]>;
  assets: string[];
  image: string;
  intensity?: {
    hydration: number;
    nutrition: number;
    reconstruction: number;
  };
  priceStatus: PriceStatus;
  price?: number; // USD
  currency: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export const MARKETPLACE_CONFIG = {
  // Official commercial WhatsApp phone number
  COMMERCIAL_WHATSAPP_NUMBER: "14072181294",
  COMMERCIAL_PHONE_DISPLAY: "+1 (407) 218-1294",
  COMMERCIAL_EMAIL: "s.professional.usa@gmail.com",
  CURRENCY_SYMBOL: "$",
  CURRENCY_CODE: "USD",
  
  // Tax rate (6.5% adicional sobre la base imponible)
  TAX_RATE: 0.065,
  TAX_PERCENT_LABEL: "6.5%",

  // Easy pricing toggle:
  // If true, shows demo prices with explicit disclaimer.
  // If false, shows "Precio pendiente de confirmación".
  USE_DEMO_PRICES: true,
};

export const MARKETPLACE_PRODUCTS: ProductItem[] = [
  // --- 1. S PROFESSIONAL: NUTROLOGY ---
  {
    id: 'sp-nutrology',
    code: 'SP-NUT-01',
    name: {
      en: 'Nutrology - Deep Nutrition Kit',
      es: 'Nutrology - Kit Nutrición Profunda',
      pt: 'Nutrology - Kit Nutrição Profunda',
      it: 'Nutrology - Kit Nutrizione Profonda',
      fr: 'Nutrology - Kit Nutrition Profonde'
    },
    brand: 'S Professional',
    category: 'professional',
    lineId: 'sp-nutrology',
    presentation: {
      en: 'Professional Salon Kit (Nutri Shampoo 1L + Renew Ultraconditioner 1L)',
      es: 'Kit Profesional de Salón (Nutri Shampoo 1L + Renew Ultraconditioner 1L)',
      pt: 'Kit Profissional de Salão (Nutri Shampoo 1L + Renew Ultraconditioner 1L)',
      it: 'Kit Professionale da Salone (Nutri Shampoo 1L + Renew Ultraconditioner 1L)',
      fr: 'Kit Professionnel Salon (Nutri Shampoo 1L + Renew Ultraconditioner 1L)'
    },
    volume: '2 x 1000ml (33.8 fl. oz.)',
    headline: {
      en: 'Biotechnology & Natural Humectants',
      es: 'Biotecnología y Humectantes Naturales',
      pt: 'Biotecnologia e Umectantes Naturais',
      it: 'Biotecnologia e Umettanti Naturali',
      fr: 'Biotechnologie & Humectants Naturels'
    },
    description: {
      en: 'Provides intense nutrition according to hair dryness. With an exclusive blend of vegetable oils, lipid nanoparticles, and HGT active, it restores vital cortex lipids.',
      es: 'Proporciona nutrición intensa de acuerdo con el resecamiento del cabello. Con un exclusivo blend de aceites vegetales, nanopartículas lipídicas y activo HGT, restaura los lípidos vitales.',
      pt: 'Fornece nutrição intensa de acordo com o ressecamento do cabelo. Restaura lipídios vitais do córtex com nanopartículas e manteiga de karité.',
      it: 'Fornisce nutrizione intensa in base alla secchezza dei capelli con nanoparticelle lipidiche e oli vegetali.',
      fr: 'Fournit une nutrition intense selon la sécheresse des cheveux avec des nanoparticules lipidiques et du beurre de karité bio.'
    },
    benefits: {
      en: ['Instant lipid replacement', 'Diamond-like shine', 'Anti-frizz protection', 'Weightless movement'],
      es: ['Reemplazo lipídico instantáneo', 'Brillo tipo diamante', 'Protección anti-frizz', 'Movimiento sin peso'],
      pt: ['Reposição lipídica instantânea', 'Brilho de diamante', 'Proteção anti-frizz', 'Movimento leve'],
      it: ['Sostituzione lipidica istantanea', 'Brillantezza diamante', 'Protezione anti-frizz', 'Movimento leggero'],
      fr: ['Remplacement lipidique instantané', 'Brillance diamant', 'Protection anti-frisottis', 'Mouvement léger']
    },
    assets: ['Nano-partículas lipídicas', 'Complejo de aminoácidos', 'Manteca de karité orgánica', 'Activo HGT (KAPS)', 'D-Pantenol'],
    image: 'https://i.ibb.co/Q7z3zz8B/Nutrology-Catalogo.jpg',
    intensity: { hydration: 20, nutrition: 100, reconstruction: 40 },
    priceStatus: 'demo',
    price: 180.00,
    currency: 'USD'
  },

  // --- 2. S PROFESSIONAL: HIDRATHERAPY ---
  {
    id: 'sp-hidratherapy',
    code: 'SP-HID-02',
    name: {
      en: 'Hidratherapy - Ozone Hydration System',
      es: 'Hidratherapy - Sistema Hidratación con Ozono',
      pt: 'Hidratherapy - Sistema Hidratação Ozônio',
      it: 'Hidratherapy - Sistema Idratazione Ozono',
      fr: 'Hidratherapy - Système Hydratation à l’Ozone'
    },
    brand: 'S Professional',
    category: 'professional',
    lineId: 'sp-hidratherapy',
    presentation: {
      en: 'Professional Ozonotherapy Kit (Purifying Shampoo 1L + Power Dose + Recovery 1L)',
      es: 'Kit Profesional Ozonoterapia (Purifying Shampoo 1L + Power Dose Ampolla + Recovery 1L)',
      pt: 'Kit Profissional Ozonoterapia (Purifying Shampoo 1L + Ampola + Recovery 1L)',
      it: 'Kit Professionale Ozonoterapia (Purifying Shampoo 1L + Fiala + Recovery 1L)',
      fr: 'Kit Professionnel Ozonothérapie (Purifying Shampoo 1L + Ampoule + Recovery 1L)'
    },
    volume: '2 x 1000ml + Power Dose',
    headline: {
      en: 'Ozone Technology & Ultimate Cellular Hydration',
      es: 'Tecnología de Ozono e Hidratación Extrema',
      pt: 'Tecnologia de Ozono e Hidratação Extrema',
      it: 'Tecnologia Ozono e Idratazione Estrema',
      fr: 'Technologie à l’Ozone & Hydratation Ultime'
    },
    description: {
      en: 'Active Ozone O3 formulation revitalizes dehydrated hair fibers, providing extreme softness and deep cellular rehydration.',
      es: 'Formulación con Ozono activo O3 que revitaliza la fibra capilar deshidratada, brindando suavidad extrema y rehidratación celular profunda.',
      pt: 'Formulação com Ozônio ativo O3 que revitaliza a fibra capilar desidratada con suavidade extrema.',
      it: 'Formulazione con Ozono attivo O3 che rivitalizza la fibra capillare disidratata.',
      fr: 'Formulation à l’Ozone actif O3 qui revitalise la fibre capillaire déshydratée.'
    },
    benefits: {
      en: ['Deep cellular hydration', 'Ozone effect protection', 'Extreme softness', 'Revitalizes hair fiber'],
      es: ['Hidratación celular profunda', 'Protección efecto ozono', 'Suavidad extrema', 'Revitaliza la fibra capilar'],
      pt: ['Hidratação celular profunda', 'Proteção de efeito ozono', 'Suavidade extrema', 'Revitaliza a fibra capilar'],
      it: ['Idratazione cellulare profonda', 'Effetto ozono protettivo', 'Estrema morbidezza', 'Rivitalizza la fibra capillare'],
      fr: ['Hydratation cellulaire profonde', 'Protection effet ozone', 'Douceur extrême', 'Revitalise la fibre capillaire']
    },
    assets: ['Ozono activo O3', 'Ácido hialurónico', 'Extracto de arándano', 'Jengibre', 'Romero'],
    image: 'https://i.ibb.co/9jYjSB5/photo-4916101335045221055-y.jpg',
    intensity: { hydration: 100, nutrition: 20, reconstruction: 10 },
    priceStatus: 'demo',
    price: 195.00,
    currency: 'USD'
  },

  // --- 3. S PROFESSIONAL: PRO FUSION ---
  {
    id: 'sp-profusion',
    code: 'SP-FUS-03',
    name: {
      en: 'Pro Fusion - Enzyme Reconstruction System',
      es: 'Pro Fusion - Sistema Reconstrucción Enzimática',
      pt: 'Pro Fusion - Sistema Reconstrução Enzimática',
      it: 'Pro Fusion - Sistema Ricostruzione Enzimatica',
      fr: 'Pro Fusion - Système Reconstruction Enzymatique'
    },
    brand: 'S Professional',
    category: 'professional',
    lineId: 'sp-profusion',
    presentation: {
      en: 'Full Reconstruction Kit (Fusion Shampoo 1L + Inner Treatment 500ml + Redress 1L)',
      es: 'Kit Reconstrucción Completa (Fusion Shampoo 1L + Inner Tratamiento 500ml + Redress 1L)',
      pt: 'Kit Reconstrução Completa (Fusion Shampoo 1L + Inner 500ml + Redress 1L)',
      it: 'Kit Ricostruzione Completa (Fusion Shampoo 1L + Inner 500ml + Redress 1L)',
      fr: 'Kit Reconstruction Complète (Fusion Shampoo 1L + Inner 500ml + Redress 1L)'
    },
    volume: '1000ml + 500ml + 1000ml',
    headline: {
      en: 'Enzymatic High-Performance Reconstruction',
      es: 'Reconstrucción Enzimática de Alto Rendimiento',
      pt: 'Reconstrução Enzimática de Alto Desempenho',
      it: 'Ricostruzione Enzimatica ad Alte Prestazioni',
      fr: 'Reconstruction Enzymatique Haute Performance'
    },
    description: {
      en: 'Formulated with papain enzymes, wheat/corn/soy proteins, and nanotechnology to stop chemical breakage and restore disulfide bonds before, during, and after chemicals.',
      es: 'Formulado con enzimas de papaína, proteínas de trigo/maíz/soja y nanotecnología para detener la rotura química y restaurar puentes de disulfuro.',
      pt: 'Formulado com enzimas de papaína e proteínas vegetais para reverter danos químicos severos.',
      it: 'Formulato con enzimi di papaina e proteine vegetali per fermare la rottura chimica.',
      fr: 'Formulé avec des enzymes de papaïne et des protéines végétales pour arrêter la casse chimique.'
    },
    benefits: {
      en: ['Reverses chemical damage', 'Strengthens disulfide bonds', 'Restores elasticity', 'Stops hair breakage'],
      es: ['Revierte el daño químico', 'Fortalece puentes de disulfuro', 'Restaura la elasticidad', 'Detiene la rotura'],
      pt: ['Reverte danos químicos', 'Fortalece pontes de dissulfeto', 'Restaura elasticidade', 'Interrompe a quebra'],
      it: ['Inverte il danno chimico', 'Rafforza i ponti di disolfuro', 'Ripristina elasticità', 'Ferma la rottura'],
      fr: ['Inverse les dommages chimiques', 'Renforce les ponts disulfures', 'Restaure l’élasticité', 'Arrête la casse']
    },
    assets: ['Papaína (Enzima Catalizadora)', 'Proteína de trigo, maíz y soja', 'Ácido hialurónico', 'pH ácido estabilizador'],
    image: 'https://i.ibb.co/1ft38jgy/photo-5037476668448550284-y.jpg',
    intensity: { hydration: 30, nutrition: 40, reconstruction: 100 },
    priceStatus: 'demo',
    price: 210.00,
    currency: 'USD'
  },

  // --- 4. S PROFESSIONAL: BRUSHING+ ---
  {
    id: 'sp-brushing',
    code: 'SP-BRU-04',
    name: {
      en: 'Brushing+ - Organic Thermal Alignment',
      es: 'Brushing+ - Alineación Térmica Orgánica',
      pt: 'Brushing+ - Alinhamento Térmico Orgânico',
      it: 'Brushing+ - Allineamento Termico Organico',
      fr: 'Brushing+ - Alignement Thermique Organique'
    },
    brand: 'S Professional',
    category: 'professional',
    lineId: 'sp-brushing',
    presentation: {
      en: 'Professional Straightening Trio (Deep Shampoo 1L + Brush Shampoo 1L + Hair Plus 1L)',
      es: 'Trío Profesional de Alisado (Deep Shampoo 1L + Brush Shampoo 1L + Hair Plus 1L)',
      pt: 'Trio Profissional de Alinhamento (Deep Shampoo 1L + Brush Shampoo 1L + Hair Plus 1L)',
      it: 'Trio Professionale Lisciante (Deep Shampoo 1L + Brush Shampoo 1L + Hair Plus 1L)',
      fr: 'Trio Professionnel Lissant (Deep Shampoo 1L + Brush Shampoo 1L + Hair Plus 1L)'
    },
    volume: '3 x 1000ml (33.8 fl. oz.)',
    headline: {
      en: 'Organic High-Speed Thermal Alignment',
      es: 'Alineación Térmica Orgánica de Alta Velocidad',
      pt: 'Alinhamento Térmico Orgânico de Alta Velocidade',
      it: 'Allineamento Termico Organico Veloce',
      fr: 'Alignement Thermique Organique Rapide'
    },
    description: {
      en: '100% Formaldehyde-free straightening technology based on taninoplasty, organic acids, and exotic oils for ultra-fast application and mirrored shine.',
      es: 'Tecnología de alisado 100% libre de formol basada en taninoplastia, ácidos orgánicos y aceites exóticos para aplicación ultra rápida y brillo espejado.',
      pt: 'Tecnologia de alisamento 100% livre de formol baseada em taninoplastia para brilho espelhado duradouro.',
      it: 'Tecnologia lisciante 100% senza formaldeide basata su taninoplastia e acidi organici.',
      fr: 'Technologie lissante 100% sans formaldéhyde basée sur la taninoplastie et les acides organiques.'
    },
    benefits: {
      en: ['100% Formaldehyde free', 'Ultra-fast application', 'Intense mirrored shine', 'Long-lasting smoothness'],
      es: ['100% Libre de formol', 'Aplicación ultra rápida', 'Brillo espejado intenso', 'Liso duradero'],
      pt: ['100% Livre de formol', 'Aplicação ultra-rápida', 'Brilho espelhado intenso', 'Liso duradouro'],
      it: ['100% Senza formaldeide', 'Applicazione ultra-veloce', 'Brillantezza a specchio', 'Liscio a lunga durata'],
      fr: ['100% Sans formaldéhyde', 'Application ultra-rapide', 'Brillance miroir intense', 'Lissage longue durée']
    },
    assets: ['Base de taninoplastia', 'Ácidos orgánicos', 'Blend de aceites exóticos', 'Aminoácidos bio-compatibles'],
    image: 'https://i.ibb.co/23H15Zwt/photo-5159078333743475458-y.jpg',
    intensity: { hydration: 40, nutrition: 50, reconstruction: 30 },
    priceStatus: 'demo',
    price: 240.00,
    currency: 'USD'
  },

  // --- 5. S PROFESSIONAL: MY CROWN ---
  {
    id: 'sp-mycrown',
    code: 'SP-CRW-05',
    name: {
      en: 'My Crown - Curl Curvature Memory System',
      es: 'My Crown - Sistema Memoria de Curvatura de Rizos',
      pt: 'My Crown - Sistema Memória de Curvatura',
      it: 'My Crown - Sistema Memoria Curvatura Ricci',
      fr: 'My Crown - Système Mémoire de Courbure Boucles'
    },
    brand: 'S Professional',
    category: 'professional',
    lineId: 'sp-mycrown',
    presentation: {
      en: 'Professional Curl System (Low Poo 500ml + Co-Wash 500ml + Mask 500g + Leave-in)',
      es: 'Sistema Profesional Rizos (Low Poo 500ml + Co-Wash 500ml + Máscara 500g + Leave-in)',
      pt: 'Sistema Profissional Cachos (Low Poo 500ml + Co-Wash 500ml + Máscara 500g + Leave-in)',
      it: 'Sistema Professionale Ricci (Low Poo 500ml + Co-Wash 500ml + Maschera 500g + Leave-in)',
      fr: 'Système Professionnel Boucles (Low Poo 500ml + Co-Wash 500ml + Masque 500g + Leave-in)'
    },
    volume: '4 x 500ml / 500g',
    headline: {
      en: 'The Curvature Memory Revolution',
      es: 'La Revolución de la Memoria de Curvatura',
      pt: 'A Revolução da Memória de Curvatura',
      it: 'La Rivoluzione della Memoria di Curvatura',
      fr: 'La Révolution de la Mémoire de Courbure'
    },
    description: {
      en: 'Biotechnological curl memory technology with murumuru butter and flaxseed oil to define, lock in hydration, and eradicate frizz for all curl types.',
      es: 'Tecnología biotecnológica de memoria de curvatura con manteca de murumuru y aceite de linaza para definir, retener hidratación y eliminar el frizz en todo tipo de rizo.',
      pt: 'Tecnologia de memória de curvatura para cachos perfeitos, definidos e hidratados.',
      it: 'Tecnologia di memoria della curvatura con burro di murumuru e olio di lino.',
      fr: 'Technologie de mémoire de courbure au beurre de murumuru et huile de lin.'
    },
    benefits: {
      en: ['Defines all curl types', 'Locks in hydration', 'Memorizes curvature', 'Control extreme frizz'],
      es: ['Define todo tipo de rizos', 'Retiene la hidratación', 'Memoriza la curvatura', 'Control extremo del frizz'],
      pt: ['Define todos os tipos de cachos', 'Retém hidratação', 'Memoriza curvatura', 'Controle extremo do frizz'],
      it: ['Definisce tutti i tipi di ricci', 'Trattiene l’idratazione', 'Memorizza curvatura', 'Controllo estremo del crespo'],
      fr: ['Définit tous les types de boucles', 'Retient l’hydratation', 'Mémorise la courbure', 'Contrôle extrême des frisottis']
    },
    assets: ['Curl Memory Technology', 'Manteca de Murumuru', 'Aceite de linaza', 'Extractos emolientes botánicos'],
    image: 'https://i.ibb.co/C3j7Zk2q/photo-5071613163006438225-w.jpg',
    intensity: { hydration: 60, nutrition: 80, reconstruction: 20 },
    priceStatus: 'demo',
    price: 165.00,
    currency: 'USD'
  },

  // --- 6. SWEET PROFESSIONAL: THE FIRST SHAMPOO ---
  {
    id: 'sw-thefirst',
    code: 'SW-FST-01',
    name: {
      en: 'The First - Straightening Shampoo',
      es: 'The First - Champú Alisador',
      pt: 'The First - Xampu Alisador',
      it: 'The First - Shampoo Lisciante',
      fr: 'The First - Shampooing Lissant'
    },
    brand: 'Sweet Professional',
    category: 'professional',
    lineId: 'sw-thefirst',
    presentation: {
      en: 'Professional Salon Bottle 980ml (5 International Patents)',
      es: 'Botella Profesional de Salón 980ml (5 Patentes Internacionales)',
      pt: 'Garrafa Profissional de Salão 980ml (5 Patentes Internacionais)',
      it: 'Flacone Professionale da Salone 980ml (5 Brevetti Internazionali)',
      fr: 'Flacon Professionnel Salon 980ml (5 Brevets Internationaux)'
    },
    volume: '980ml (33.1 fl. oz.)',
    headline: {
      en: 'The First Straightening Shampoo in the World',
      es: 'El Primer Champú Alisador del Mundo',
      pt: 'O Primeiro Xampu Alisador do Mundo',
      it: 'Il Primo Shampoo Lisciante al Mondo',
      fr: 'Le Premier Shampooing Lissant au Monde'
    },
    description: {
      en: 'The revolutionary patented formula that introduced thermal alignment in shampoo format. 100% formaldehyde-free, ultra-fast, and compatible with all chemical processes.',
      es: 'La revolucionaria fórmula patentada que introdujo el alisado térmico en formato champú. 100% libre de formol, ultra rápida y compatible con todos los procesos químicos.',
      pt: 'A fórmula revolucionária que criou o alisamento em forma de xampu. 100% livre de formol.',
      it: 'La formula brevettata che ha rivoluzionato il settore con il primo lisciante in formato shampoo.',
      fr: 'La formule brevetée révolutionnaire qui a introduit le lissage sous forme de shampooing.'
    },
    benefits: {
      en: ['100% Formaldehyde free', 'Ultra-fast application', 'Safe for all hair types', '5 International patents'],
      es: ['100% Libre de formol', 'Aplicación ultra rápida', 'Seguro para todo tipo de cabello', '5 Patentes internacionales'],
      pt: ['100% Livre de formol', 'Aplicação ultra rápida', 'Seguro para todos os tipos', '5 Patentes internacionais'],
      it: ['100% Senza formaldeide', 'Applicazione ultra rapida', 'Sicuro per tutti i tipi', '5 Brevetti internazionali'],
      fr: ['100% Sans formaldéhyde', 'Application ultra-rapide', 'Sûr pour tous types', '5 Brevets internationaux']
    },
    assets: ['Ácido hialurónico', 'Blend de ácidos orgánicos patentados', 'Aceites exóticos nobles'],
    image: 'https://i.ibb.co/5Wm1sfhY/thefirst.webp',
    intensity: { hydration: 50, nutrition: 30, reconstruction: 20 },
    priceStatus: 'demo',
    price: 260.00,
    currency: 'USD'
  },

  // --- 7. SWEET PROFESSIONAL: CRONOLOGY ---
  {
    id: 'sw-cronology',
    code: 'SW-CRO-02',
    name: {
      en: 'Cronology - Biotechnology Hair Mapping Kit',
      es: 'Cronology - Kit Mapeo Biotecnológico Capilar',
      pt: 'Cronology - Kit Mapeamento Biotecnológico',
      it: 'Cronology - Kit Mappatura Biotecnologica',
      fr: 'Cronology - Kit Cartographie Biotechnologique'
    },
    brand: 'Sweet Professional',
    category: 'professional',
    lineId: 'sw-cronology',
    presentation: {
      en: 'Complete Chronogram Kit (Chlorophyll Shampoo + Mapping Elixir + Treatment Mask)',
      es: 'Kit Completo Cronograma (Shampoo Clorofila + Elixir Mapeo + Máscara Tratamiento)',
      pt: 'Kit Completo Cronograma (Shampoo Clorofila + Elixir + Máscara)',
      it: 'Kit Completo Cronoprogramma (Shampoo Clorofilla + Elisir + Maschera)',
      fr: 'Kit Complet Chronogramme (Shampooing Chlorophylle + Élixir + Masque)'
    },
    volume: 'Kit Profesional 3 Pasos',
    headline: {
      en: 'Biotechnology Mapping for Personalized Treatment',
      es: 'Mapeo Biotecnológico para Tratamientos Personalizados',
      pt: 'Mapeamento Biotecnológico para Tratamentos Personalizados',
      it: 'Mappatura Biotecnologica per Trattamenti Personalizzati',
      fr: 'Cartographie Biotechnologique pour Traitement Personnalisé'
    },
    description: {
      en: 'Intelligent capillary chronogram system that maps fiber porosity and deposits nutrients, moisture, or proteins exactly where the hair demands.',
      es: 'Sistema de cronograma capilar inteligente que mapea la porosidad de la fibra y deposita nutrientes, hidratación o proteínas exactamente donde el cabello lo requiere.',
      pt: 'Sistema inteligente de cronograma capilar com mapeamento de porosidade.',
      it: 'Sistema intelligente di cronoprogramma capillare che mappa la porosità.',
      fr: 'Système intelligent de chronogramme capillaire qui cartographie la porosité.'
    },
    benefits: {
      en: ['Customized results', 'Deep fiber restoration', 'Long-lasting effect', 'Biotechnological precision'],
      es: ['Resultados personalizados', 'Restauración profunda de la fibra', 'Efecto duradero', 'Precisión biotecnológica'],
      pt: ['Resultados personalizados', 'Restauração profunda da fibra', 'Efeito duradouro', 'Precisão biotecnológica'],
      it: ['Risultati personalizzati', 'Restauro profondo della fibra', 'Effetto duraturo', 'Precisione biotecnologica'],
      fr: ['Résultats personnalisés', 'Restauration profonde de la fibre', 'Effet longue durée', 'Précision biotechnologique']
    },
    assets: ['Clorofila vegetal', 'Nano-partículas transportadoras', 'Aminoácidos bio-idénticos', 'Complejo multivitamínico'],
    image: 'https://i.ibb.co/cc71zLK9/cronology.webp',
    intensity: { hydration: 40, nutrition: 40, reconstruction: 40 },
    priceStatus: 'demo',
    price: 175.00,
    currency: 'USD'
  },

  // --- 8. SWEET PROFESSIONAL: S.O.S ---
  {
    id: 'sw-sos',
    code: 'SW-SOS-03',
    name: {
      en: 'S.O.S - Chemical Emergency Rescue Kit',
      es: 'S.O.S - Kit Rescate de Emergencia Química',
      pt: 'S.O.S - Kit Resgate de Emergência Química',
      it: 'S.O.S - Kit Soccorso Emergenza Chimica',
      fr: 'S.O.S - Kit Secours d’Urgence Chimique'
    },
    brand: 'Sweet Professional',
    category: 'professional',
    lineId: 'sw-sos',
    presentation: {
      en: 'Emergency Rescue Duo (Step 1 Impact Rebuilder + Step 2 pH Balancer)',
      es: 'Dúo de Rescate de Emergencia (Paso 1 Reconstructor Impacto + Paso 2 Equilibrador pH)',
      pt: 'Duo de Resgate de Emergência (Passo 1 Impacto + Passo 2 Equilibrador)',
      it: 'Duo di Soccorso di Emergenza (Passo 1 Impatto + Passo 2 Equilibratore)',
      fr: 'Duo de Secours d’Urgence (Étape 1 Impact + Étape 2 Équilibreur pH)'
    },
    volume: '2 x 500ml',
    headline: {
      en: 'Emergency Rescue for Chemically Damaged Hair',
      es: 'Rescate de Emergencia para Cabellos Dañados Químicamente',
      pt: 'Resgate de Emergência para Cabelos Quimicamente Danificados',
      it: 'Soccorso d’Emergenza per Capelli Danneggiati Chimicamente',
      fr: 'Secours d’Urgence pour Cheveux Chimiquement Endommagés'
    },
    description: {
      en: 'Instant shock treatment designed to stop rubbery hair breakage within minutes, reconstruct cortex structure, and normalize pH balance.',
      es: 'Tratamiento de choque inmediato diseñado para detener el efecto chicloso y la rotura en minutos, reconstruyendo la corteza y normalizando el pH.',
      pt: 'Tratamento de choque para interromper a quebra e o efeito elástico em minutos.',
      it: 'Trattamento d’urto studiato per fermare istantaneamente la rottura chimica.',
      fr: 'Traitement de choc conçu pour arrêter la casse élastique en quelques minutes.'
    },
    benefits: {
      en: ['Stops breakage instantly', 'Restores pH balance', 'Rebuilds hair structure', 'Intense recovery'],
      es: ['Detiene la rotura al instante', 'Restaura el equilibrio del pH', 'Reconstruye la estructura capilar', 'Recuperación intensa'],
      pt: ['Interrompe a quebra instantaneamente', 'Restaura o equilíbrio do pH', 'Reconstrói a estrutura capilar', 'Recuperação intensa'],
      it: ['Ferma la rottura istantaneamente', 'Ripristina l’equilibrio del pH', 'Ricostruisce la struttura', 'Recupero intenso'],
      fr: ['Arrête la casse instantanément', 'Restaure l’équilibre du pH', 'Reconstruit la structure', 'Récupération intense']
    },
    assets: ['Queratina hidrolizada', 'Colágeno bio-marino', 'D-Pantenol', 'Aminoácidos catiónicos'],
    image: 'https://i.ibb.co/tTVkF43k/sos.webp',
    intensity: { hydration: 20, nutrition: 30, reconstruction: 100 },
    priceStatus: 'demo',
    price: 155.00,
    currency: 'USD'
  },

  // --- 9. HOME CARE: NUTROLOGY ---
  {
    id: 'hc-nutrology',
    code: 'HC-NUT-01',
    name: {
      en: 'Home Care Nutrology - Daily Maintenance Trio',
      es: 'Home Care Nutrology - Trío Mantenimiento Diario',
      pt: 'Home Care Nutrology - Trio Manutenção Diária',
      it: 'Home Care Nutrology - Trio Mantenimento Quotidiano',
      fr: 'Home Care Nutrology - Trio Entretien Quotidien'
    },
    brand: 'Home Care',
    category: 'homecare',
    lineId: 'sp-nutrology',
    presentation: {
      en: 'Home Care Maintenance Set (Nutri Shampoo 300ml + Renew Conditioner 300ml + Mask 250g)',
      es: 'Set Mantenimiento Home Care (Nutri Shampoo 300ml + Renew Conditioner 300ml + Máscara 250g)',
      pt: 'Set Manutenção Home Care (Nutri Shampoo 300ml + Renew Conditioner 300ml + Máscara 250g)',
      it: 'Set Mantenimento Home Care (Nutri Shampoo 300ml + Renew Conditioner 300ml + Maschera 250g)',
      fr: 'Coffret Entretien Home Care (Nutri Shampoo 300ml + Renew Conditioner 300ml + Masque 250g)'
    },
    volume: '300ml + 300ml + 250g',
    headline: {
      en: 'Feed Your Hair with Essential Lipids Every Day',
      es: 'Alimenta tu Cabello con Lípidos Esenciales a Diario',
      pt: 'Alimente seu Cabelo com Lipídios Essenciais Diariamente',
      it: 'Nutri i Tuoi Capelli con Lipidi Essenziali Ogni Giorno',
      fr: 'Nourrissez Vos Cheveux avec des Lipides Essentiels'
    },
    description: {
      en: 'Maintains lipid replenishment at home, preserving diamond-like shine, anti-frizz control, and softness between salon appointments.',
      es: 'Mantiene la reposición de lípidos en casa, preservando el brillo de diamante, control de frizz y suavidad entre citas de salón.',
      pt: 'Mantém a reposição lipídica em casa com brilho e sedosidade prolongados.',
      it: 'Mantiene il reintegro lipidico a casa con brillantezza e controllo del crespo.',
      fr: 'Maintient le réapprovisionnement en lipides à domicile entre les visites au salon.'
    },
    benefits: {
      en: ['Continuous lipid nourishment', 'Daily anti-frizz defense', 'Weightless movement', 'Prolongs salon treatment'],
      es: ['Nutrición lipídica continua', 'Defensa diaria anti-frizz', 'Movimiento sin peso', 'Prolonga el tratamiento de salón'],
      pt: ['Nutrição lipídica contínua', 'Defesa diária anti-frizz', 'Movimento leve', 'Prolonga o tratamento'],
      it: ['Nutrizione lipidica continua', 'Difesa quotidiana dal crespo', 'Movimento leggero', 'Prolunga il trattamento'],
      fr: ['Nutrition lipidique continue', 'Défense quotidienne anti-frisottis', 'Mouvement léger', 'Prolonge le traitement']
    },
    assets: ['Manteca de karité bio', 'Aceite de aguacate', 'Aminoácidos esenciales', 'Vitamina E'],
    image: 'https://i.ibb.co/0jqVsrKr/Home-Care-Nutrology.jpg',
    intensity: { hydration: 30, nutrition: 80, reconstruction: 30 },
    priceStatus: 'demo',
    price: 65.00,
    currency: 'USD'
  },

  // --- 10. HOME CARE: HIDRATHERAPY ---
  {
    id: 'hc-hidratherapy',
    code: 'HC-HID-02',
    name: {
      en: 'Home Care Hidratherapy - Ozone Moisture Set',
      es: 'Home Care Hidratherapy - Set Hidratación con Ozono',
      pt: 'Home Care Hidratherapy - Set Hidratação Ozônio',
      it: 'Home Care Hidratherapy - Set Idratazione Ozono',
      fr: 'Home Care Hidratherapy - Coffret Hydratation Ozone'
    },
    brand: 'Home Care',
    category: 'homecare',
    lineId: 'sp-hidratherapy',
    presentation: {
      en: 'Daily Moisture Set (Hydrating Shampoo 300ml + Recovery Conditioner 300ml)',
      es: 'Set Hidratación Diaria (Shampoo Hidratante 300ml + Recovery Conditioner 300ml)',
      pt: 'Set Hidratação Diária (Shampoo 300ml + Condicionador Recovery 300ml)',
      it: 'Set Idratazione Quotidiana (Shampoo 300ml + Balsamo Recovery 300ml)',
      fr: 'Coffret Hydratation Quotidienne (Shampooing 300ml + Après-shampooing 300ml)'
    },
    volume: '2 x 300ml (10.1 fl. oz.)',
    headline: {
      en: 'Revitalize Thirsty Hair with Ozone Hydration',
      es: 'Revitaliza el Cabello Sediento con Hidratación de Ozono',
      pt: 'Revitalize Cabelos Sedentos com Hidratação Ozônio',
      it: 'Rivitalizza i Capelli Assetati con Idratazione Ozono',
      fr: 'Revitalisez les Cheveux Assoiffés à l’Ozone'
    },
    description: {
      en: 'Daily moisture locking system that keeps hair fibers deeply hydrated, extremely silky, and protected against environmental dryness.',
      es: 'Sistema diario de retención de humedad que mantiene la fibra profundamente hidratada, extremadamente sedosa y protegida de la resequedad.',
      pt: 'Sistema diário que mantém a hidratação celular e a maciez extrema dos fios.',
      it: 'Sistema quotidiano di ritenzione dell’idratazione per capelli morbidi e protetti.',
      fr: 'Système quotidien qui retient l’hydratation et protège contre le dessèchement.'
    },
    benefits: {
      en: ['Daily cellular hydration', 'Extreme touchable softness', 'Environmental shield', 'Zero dryness'],
      es: ['Hidratación celular diaria', 'Suavidad extrema al tacto', 'Escudo contra el ambiente', 'Cero resequedad'],
      pt: ['Hidratação celular diária', 'Suavidade extrema ao toque', 'Escudo ambiental', 'Zero ressecamento'],
      it: ['Idratazione quotidiana', 'Estrema morbidezza al tatto', 'Scudo protettivo', 'Zero secchezza'],
      fr: ['Hydratation quotidienne', 'Douceur extrême au toucher', 'Bouclier protecteur', 'Zéro sécheresse']
    },
    assets: ['Ácido hialurónico molecular', 'Activo O3 ozonizado', 'Extracto de arándano silvestre', 'Pantenol'],
    image: 'https://i.ibb.co/ymjXzc4r/Home-Care-Hidratherapy.jpg',
    intensity: { hydration: 90, nutrition: 20, reconstruction: 10 },
    priceStatus: 'demo',
    price: 60.00,
    currency: 'USD'
  },

  // --- 11. HOME CARE: PRO FUSION ---
  {
    id: 'hc-profusion',
    code: 'HC-FUS-03',
    name: {
      en: 'Home Care Pro Fusion - Disulfide Repair Kit',
      es: 'Home Care Pro Fusion - Kit Reparación de Disulfuro',
      pt: 'Home Care Pro Fusion - Kit Reparação de Dissulfeto',
      it: 'Home Care Pro Fusion - Kit Riparazione Disolfuro',
      fr: 'Home Care Pro Fusion - Kit Réparation Disulfure'
    },
    brand: 'Home Care',
    category: 'homecare',
    lineId: 'sp-profusion',
    presentation: {
      en: 'Home Care Repair Kit (Fusion Shampoo 300ml + Redress 300ml + Save Home Leave-in + Serum)',
      es: 'Kit Mantenimiento Reparador (Fusion Shampoo 300ml + Redress 300ml + Save Home Leave-in + Serum)',
      pt: 'Kit Manutenção Reparador (Shampoo 300ml + Redress 300ml + Save Home + Serum)',
      it: 'Kit Mantenimento Riparatore (Shampoo 300ml + Redress 300ml + Save Home + Serum)',
      fr: 'Kit Entretien Réparateur (Shampooing 300ml + Redress 300ml + Save Home + Sérum)'
    },
    volume: '300ml + 300ml + 200ml + 60ml',
    headline: {
      en: 'Stop Breakage and Rebuild Hair Strength Daily',
      es: 'Detén la Rotura y Reconstruye la Fuerza Capilar Cada Día',
      pt: 'Interrompa a Quebra e Reconstrua a Força Diariamente',
      it: 'Ferma la Rottura e Ricostruisci la Forza Quotidiana',
      fr: 'Arrêtez la Casse et Reconstruisez la Force Quotidienne'
    },
    description: {
      en: 'Daily maintenance that continuously reinforces disulfide bonds, seals cuticles with Save Home, and repairs split ends with Pro Fusion Serum.',
      es: 'Mantenimiento diario que refuerza continuamente los puentes de disulfuro, sella cutículas con Save Home y repara puntas con Pro Fusion Serum.',
      pt: 'Manutenção diária com enzimas e proteínas para manter a fibra capilar fortalecida e sem frizz.',
      it: 'Mantenimento quotidiano per rinforzare i legami di disolfuro e sigillare le cuticole.',
      fr: 'Entretien quotidien qui renforce les ponts disulfures et répare les pointes fourchues.'
    },
    benefits: {
      en: ['Daily disulfide bond defense', 'Thermal & UV protection with Serum', 'Split-end sealing', 'Eliminates rubbery weakness'],
      es: ['Defensa diaria de puentes de disulfuro', 'Protección térmica y solar con Serum', 'Sellado de puntas abiertas', 'Elimina la debilidad elástica'],
      pt: ['Defesa diária de pontes de dissulfeto', 'Proteção térmica e solar', 'Selagem de pontas duplas', 'Elimina fragilidade'],
      it: ['Difesa quotidiana dei legami', 'Protezione termica e solare', 'Sigillatura doppie punte', 'Elimina la fragilità'],
      fr: ['Défense quotidienne des ponts disulfures', 'Protection thermique et UV', 'Scellage des pointes', 'Élimine la fragilité']
    },
    assets: ['Enzima papaína', 'Proteínas de trigo y soja', 'Aceite de almendras dulces', 'Filtro UV capilar'],
    image: 'https://i.ibb.co/1YCqxw1g/Home-Care-Pro-Fusion.jpg',
    intensity: { hydration: 30, nutrition: 30, reconstruction: 90 },
    priceStatus: 'demo',
    price: 85.00,
    currency: 'USD'
  },

  // --- 12. HOME CARE: BRUSHING ---
  {
    id: 'hc-brushing',
    code: 'HC-BRU-04',
    name: {
      en: 'Home Care Brushing - Thermal Straight Maintenance',
      es: 'Home Care Brushing - Mantenimiento Liso Térmico',
      pt: 'Home Care Brushing - Manutenção Liso Térmico',
      it: 'Home Care Brushing - Mantenimento Liscio Termico',
      fr: 'Home Care Brushing - Entretien Lissage Thermique'
    },
    brand: 'Home Care',
    category: 'homecare',
    lineId: 'sp-brushing',
    presentation: {
      en: 'After-Care Straight Duo (Sulfate-Free Shampoo 300ml + Thermal Shield Conditioner 300ml)',
      es: 'Dúo After-Care Liso (Shampoo Sin Sulfatos 300ml + Conditioner Termoprotector 300ml)',
      pt: 'Duo After-Care Liso (Shampoo Sem Sulfatos 300ml + Condicionador 300ml)',
      it: 'Duo After-Care Liscio (Shampoo Senza Solfati 300ml + Balsamo Termoprotettivo 300ml)',
      fr: 'Duo After-Care Lissant (Shampooing Sans Sulfate 300ml + Après-shampooing 300ml)'
    },
    volume: '2 x 300ml (10.1 fl. oz.)',
    headline: {
      en: 'Protect Your Straight Look and Mirrored Shine Every Day',
      es: 'Protege tu Liso y el Brillo Espejado Todos los Días',
      pt: 'Proteja seu Liso e Brilho Espelhado Diariamente',
      it: 'Proteggi il Tuo Liscio e la Brillantezza a Specchio',
      fr: 'Protégez Votre Lissage et Votre Brillance Miroir'
    },
    description: {
      en: 'Formulated with organic acids and exotic oils to prolong thermal alignment results, providing complete humidity defense and high heat protection.',
      es: 'Formulado con ácidos orgánicos y aceites exóticos para prolongar el efecto de alisado térmico, brindando defensa contra la humedad y protección térmica.',
      pt: 'Formulado para prolongar o alinhamento com brilho espelhado e proteção contra umidade.',
      it: 'Prolunga la durata del liscio con protezione termica e barriera anti-umidità.',
      fr: 'Formulé pour prolonger les résultats du lissage avec protection anti-humidité.'
    },
    benefits: {
      en: ['Prolongs straightening results up to 4x', 'Anti-humidity barrier', 'Mirror shine effect', 'Complete heat protection'],
      es: ['Prolonga el alisado hasta 4 veces más', 'Barrera anti-humedad', 'Efecto brillo espejado', 'Protección térmica completa'],
      pt: ['Prolonga o alisamento por até 4x mais', 'Barreira anti-umidade', 'Efeito brilho espelhado', 'Proteção térmica'],
      it: ['Prolunga la durata del liscio', 'Barriera anti-umidità', 'Brillantezza effetto specchio', 'Protezione dal calore'],
      fr: ['Prolonge le lissage', 'Barrière anti-humidité', 'Effet brillance miroir', 'Protection thermique complète']
    },
    assets: ['Ácidos orgánicos alineadores', 'Aceite de argán y macadamia', 'Filtro anti-humedad', 'Keratina vegetal'],
    image: 'https://i.ibb.co/xKJ5GrN9/Home-Care-Brushing.jpg',
    intensity: { hydration: 40, nutrition: 40, reconstruction: 30 },
    priceStatus: 'demo',
    price: 60.00,
    currency: 'USD'
  },

  // --- 13. HOME CARE: MY CROWN ---
  {
    id: 'hc-mycrown',
    code: 'HC-CRW-05',
    name: {
      en: 'Home Care My Crown - Curl Definition Routine',
      es: 'Home Care My Crown - Rutina Definición de Rizos',
      pt: 'Home Care My Crown - Rotina Definição de Cachos',
      it: 'Home Care My Crown - Routine Definizione Ricci',
      fr: 'Home Care My Crown - Routine Définition Boucles'
    },
    brand: 'Home Care',
    category: 'homecare',
    lineId: 'sp-mycrown',
    presentation: {
      en: 'Curl Routine Set (Gentle Cleanser 300ml + Hydrating Mask 250g + Curl Memory Gel Cream 250ml)',
      es: 'Set Rutina de Rizos (Limpiador Suave 300ml + Máscara 250g + Gel Crema Memoria de Rizos 250ml)',
      pt: 'Set Rotina de Cachos (Low Poo 300ml + Máscara 250g + Gel Creme 250ml)',
      it: 'Set Routine Ricci (Detergente Delicato 300ml + Maschera 250g + Crema Gel 250ml)',
      fr: 'Coffret Routine Boucles (Nettoyant Doux 300ml + Masque 250g + Gel Crème 250ml)'
    },
    volume: '300ml + 250g + 250ml',
    headline: {
      en: 'Your Curls Are Your Crown: Keep Them Memorized',
      es: 'Tus Rizos Son Tu Corona: Mantenlos Definidos y Memorizados',
      pt: 'Seus Cachos São Sua Coroa: Mantenha-os Definidos',
      it: 'I Tuoi Ricci Sono la Tua Corona: Tienili Definiti',
      fr: 'Vos Boucles Sont Votre Couronne: Gardez-les Définies'
    },
    description: {
      en: 'Biotechnological curl memory formula that locks in hydration, prevents shrinkage and frizz, giving weightless bounce and definition for days.',
      es: 'Fórmula biotecnológica de memoria de curvatura que retiene la hidratación, previene el encogimiento y el frizz, dando rebote y definición por días.',
      pt: 'Fórmula com manteiga de murumuru que mantém a definição dos cachos sem frizz.',
      it: 'Formula biotecnologica per ricci elastici, definiti e idratati senza crespo.',
      fr: 'Formule biotechnologique pour des boucles rebondies, définies et sans frisottis.'
    },
    benefits: {
      en: ['Long-lasting curl definition', 'Anti-shrinkage & zero frizz', 'Deep moisture retention', 'Soft touchable bounce'],
      es: ['Definición duradera de rizos', 'Anti-encogimiento y cero frizz', 'Retención profunda de hidratación', 'Rebote elástico y suave'],
      pt: ['Definição duradoura dos cachos', 'Sem frizz e sem encolhimento', 'Retenção de hidratação', 'Toque macio'],
      it: ['Definizione a lunga durata', 'Anti-restringimento e zero crespo', 'Profonda ritenzione idrica', 'Elasticità morbida'],
      fr: ['Définition durable des boucles', 'Anti-rétrécissement et zéro frisottis', 'Rétention d’hydratation', 'Rebond doux']
    },
    assets: ['Manteca de Murumuru amazónica', 'Aceite de linaza dorado', 'Curl Memory Biopolymer', 'Glicerina vegetal'],
    image: 'https://i.ibb.co/jZxDbCvv/Home-Care-My-Crown.jpg',
    intensity: { hydration: 70, nutrition: 70, reconstruction: 20 },
    priceStatus: 'demo',
    price: 70.00,
    currency: 'USD'
  }
];

// --- LOCAL STORAGE CART PERSISTENCE ---
const CART_STORAGE_KEY = 'ma_fashion_cart_v1';

export const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      // Validate that each product still exists in catalog
      return parsed.filter(item => item && item.product && item.quantity > 0);
    }
  } catch (e) {
    console.error('Error loading cart from localStorage', e);
  }
  return [];
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
};

// --- WHATSAPP QUOTE GENERATOR ---
export type DeliveryPreference = 'pickup' | 'shipping';

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  notes?: string;
}

export interface QuoteCustomerInfo {
  name: string;
  salon: string;
  phone?: string;
  city: string;
  email: string;
  notes: string;
  deliveryPreference: DeliveryPreference;
  shippingAddress?: ShippingAddress;
}

export const generateWhatsAppQuoteUrl = (
  cart: CartItem[],
  customerInfo: QuoteCustomerInfo,
  lang: Language = 'es'
): string => {
  const isEs = lang === 'es';
  const isPt = lang === 'pt';

  const totalItemsCount = cart.reduce((a, b) => a + b.quantity, 0);

  // Header
  const title = isEs
    ? '📋 *SOLICITUD DE PRESUPUESTO — MA FASHION LLC*\n_Distribuidor Oficial · Biotecnología Capilar Profesional_'
    : isPt
    ? '📋 *SOLICITAÇÃO DE ORÇAMENTO — MA FASHION LLC*\n_Distribuidor Oficial · Biotecnologia Capilar Profissional_'
    : '📋 *COMMERCIAL QUOTE REQUEST — MA FASHION LLC*\n_Official Distributor · Professional Hair Biotechnology_';

  const divider = '━━━━━━━━━━━━━━━━━━━━━';

  // Customer Block
  let customerBlock = '';
  if (customerInfo.name || customerInfo.salon || customerInfo.city || customerInfo.email || customerInfo.phone) {
    const custTitle = isEs ? '👤 *DATOS DEL SOLICITANTE / SALÓN*' : isPt ? '👤 *DADOS DO CLIENTE / SALÃO*' : '👤 *CLIENT / SALON DETAILS*';
    customerBlock = `\n\n${divider}\n${custTitle}\n`;
    if (customerInfo.name) customerBlock += `• *${isEs ? 'Nombre' : isPt ? 'Nome' : 'Name'}:* ${customerInfo.name}\n`;
    if (customerInfo.salon) customerBlock += `• *${isEs ? 'Salón / Negocio' : isPt ? 'Salão / Empresa' : 'Salon / Business'}:* ${customerInfo.salon}\n`;
    if (customerInfo.phone) customerBlock += `• *${isEs ? 'Teléfono' : isPt ? 'Telefone' : 'Phone'}:* ${customerInfo.phone}\n`;
    if (customerInfo.email) customerBlock += `• *Email:* ${customerInfo.email}\n`;
    if (customerInfo.city && !customerInfo.shippingAddress?.city) {
      customerBlock += `• *${isEs ? 'Ciudad / Estado' : isPt ? 'Cidade / Estado' : 'City / State'}:* ${customerInfo.city}\n`;
    }
  }

  // Items calculation and listing
  let subtotalSum = 0;
  let hasPendingPrices = false;
  let hasDemoPrices = false;

  const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

  const itemsList = cart.map((item, idx) => {
    const p = item.product;
    const name = p.name[lang] || p.name.es || p.name.en;
    const pres = p.presentation[lang] || p.presentation.es || p.presentation.en;
    const numIcon = idx < 10 ? numberEmojis[idx] : `▪️ [${idx + 1}]`;

    let unitPriceText = '';
    let itemSubtotalText = '';

    if (p.priceStatus === 'confirmed' && p.price) {
      const lineSubtotal = p.price * item.quantity;
      subtotalSum += lineSubtotal;
      unitPriceText = `$${p.price.toFixed(2)} USD`;
      itemSubtotalText = `$${lineSubtotal.toFixed(2)} USD`;
    } else if (p.priceStatus === 'demo' && p.price && MARKETPLACE_CONFIG.USE_DEMO_PRICES) {
      hasDemoPrices = true;
      const lineSubtotal = p.price * item.quantity;
      subtotalSum += lineSubtotal;
      unitPriceText = `$${p.price.toFixed(2)} USD* _(${isEs ? 'Demo' : 'Ref'})_`;
      itemSubtotalText = `$${lineSubtotal.toFixed(2)} USD*`;
    } else {
      hasPendingPrices = true;
      unitPriceText = isEs ? '_Precio a confirmar_' : '_Price to confirm_';
      itemSubtotalText = isEs ? '_Pendiente_' : '_Pending_';
    }

    return `${numIcon} *[${p.code}] ${name}*\n   ▫ *${isEs ? 'Presentación' : isPt ? 'Apresentação' : 'Size'}:* ${pres}\n   ▫ *${isEs ? 'Cantidad' : isPt ? 'Quantidade' : 'Qty'}:* ${item.quantity} ${item.quantity === 1 ? (isEs ? 'unidad' : isPt ? 'unidade' : 'unit') : (isEs ? 'unidades' : isPt ? 'unidades' : 'units')}\n   ▫ *${isEs ? 'Precio unit.' : isPt ? 'Preço unit.' : 'Unit Price'}:* ${unitPriceText}\n   ▫ *${isEs ? 'Subtotal ítem' : isPt ? 'Subtotal item' : 'Item Subtotal'}:* ${itemSubtotalText}`;
  }).join('\n\n');

  const itemsHeader = `\n\n${divider}\n📦 *${isEs ? 'DETALLE DE PRODUCTOS' : isPt ? 'DETALHE DOS PRODUTOS' : 'SELECTED PRODUCTS'}* (${totalItemsCount} ${isEs ? 'unidades' : isPt ? 'unidades' : 'units'})\n\n`;

  // Financial breakdown with 6.5% Tax
  const taxRate = MARKETPLACE_CONFIG.TAX_RATE; // 0.065
  const taxAmount = subtotalSum * taxRate;
  const totalWithTax = subtotalSum + taxAmount;

  let financialBlock = `\n\n${divider}\n💰 *${isEs ? 'DESGLOSE DEL PRESUPUESTO' : isPt ? 'DESDOBRAMENTO DO ORÇAMENTO' : 'FINANCIAL BREAKDOWN'}*\n`;
  if (subtotalSum > 0) {
    financialBlock += `• *${isEs ? 'Base Imponible (Subtotal)' : isPt ? 'Base Tributável (Subtotal)' : 'Taxable Subtotal'}:* $${subtotalSum.toFixed(2)} USD${hasDemoPrices ? '*' : ''}\n`;
    financialBlock += `• *${isEs ? 'Tax adicional (6.5%)' : isPt ? 'Tax adicional (6.5%)' : 'Sales Tax (6.5%)'}:* $${taxAmount.toFixed(2)} USD\n`;
    financialBlock += `• *${isEs ? 'TOTAL ESTIMADO' : isPt ? 'TOTAL ESTIMADO' : 'ESTIMATED TOTAL'}:* $${totalWithTax.toFixed(2)} USD${hasDemoPrices ? '*' : ''}\n`;
  } else {
    financialBlock += `• *${isEs ? 'Total estimado' : isPt ? 'Total estimado' : 'Estimated Total'}:* _${isEs ? 'Pendiente de confirmación comercial' : 'Pending official confirmation'}_\n`;
  }

  // Delivery Block with EXACT Address or Pickup specification
  let deliveryBlock = `\n${divider}\n🚚 *${isEs ? 'MODALIDAD DE ENTREGA' : isPt ? 'MODALIDADE DE ENTREGA' : 'DELIVERY OPTIONS'}*\n`;

  if (customerInfo.deliveryPreference === 'shipping') {
    const addr = customerInfo.shippingAddress;
    deliveryBlock += `• *${isEs ? 'Opción elegida' : isPt ? 'Opção escolhida' : 'Selected option'}:* ${isEs ? 'Envío a salón / domicilio' : isPt ? 'Envio para salão/endereço' : 'Shipping to salon/address'}\n`;
    if (addr && addr.street) {
      deliveryBlock += `\n📍 *${isEs ? 'DIRECCIÓN EXACTA DE ENVÍO' : isPt ? 'ENDEREÇO EXATO DE ENVIO' : 'EXACT SHIPPING ADDRESS'}:*\n`;
      deliveryBlock += `• *${isEs ? 'Calle y número' : isPt ? 'Rua e número' : 'Street Address'}:* ${addr.street}\n`;
      deliveryBlock += `• *${isEs ? 'Ciudad' : isPt ? 'Cidade' : 'City'}:* ${addr.city}\n`;
      deliveryBlock += `• *${isEs ? 'Estado' : isPt ? 'Estado' : 'State'}:* ${addr.state}\n`;
      deliveryBlock += `• *${isEs ? 'Código Postal (ZIP)' : isPt ? 'CEP (ZIP)' : 'ZIP Code'}:* ${addr.zipCode}\n`;
      if (addr.notes && addr.notes.trim()) {
        deliveryBlock += `• *${isEs ? 'Referencia / Indicaciones' : isPt ? 'Referência' : 'Delivery Notes'}:* ${addr.notes.trim()}\n`;
      }
    }
    deliveryBlock += `\nℹ️ *${isEs ? 'Condición de flete' : isPt ? 'Condição de frete' : 'Shipping notice'}:*\n`;
    deliveryBlock += isEs
      ? `▫ El envío se cobra aparte. El costo exacto se cotiza en función de la distancia, el volumen y el peso del pedido.\n`
      : isPt
      ? `▫ O frete é cobrado à parte, cotado conforme a distância, o volume e o peso da encomenda.\n`
      : `▫ Shipping is billed separately, calculated based on distance, volume, and weight.\n`;
  } else {
    // Pickup
    deliveryBlock += `• *${isEs ? 'Opción elegida' : isPt ? 'Opção escolhida' : 'Selected option'}:* ${isEs ? 'Retiro en persona (Pickup) 🏬' : isPt ? 'Retirada pessoalmente (Pickup) 🏬' : 'Store Pickup 🏬'}\n`;
    deliveryBlock += `• *${isEs ? 'Costo de envío' : isPt ? 'Custo de frete' : 'Shipping fee'}:* ${isEs ? '$0.00 (Sin cargo adicional)' : '$0.00 (Free of charge)'}\n`;
    deliveryBlock += `• *${isEs ? 'Punto de retiro' : isPt ? 'Local de retirada' : 'Pickup location'}:* MA Fashion LLC (Orlando, FL)\n`;
    deliveryBlock += `\nℹ️ *${isEs ? 'Condición de retiro' : isPt ? 'Condição de retirada' : 'Pickup notice'}:*\n`;
    deliveryBlock += isEs
      ? `▫ Puede pasar a retirar directamente sus productos una vez confirmada la preparación del pedido.\n`
      : isPt
      ? `▫ Pode retirar seus produtos diretamente assim que a separação for confirmada.\n`
      : `▫ You can pick up products directly once order readiness is confirmed.\n`;
  }

  // Notes if any
  let notesBlock = '';
  if (customerInfo.notes && customerInfo.notes.trim()) {
    notesBlock = `\n${divider}\n📝 *${isEs ? 'NOTAS / CONSULTAS' : isPt ? 'NOTAS / DÚVIDAS' : 'CUSTOMER NOTES'}:*\n"${customerInfo.notes.trim()}"\n`;
  }

  // Disclaimers and closing
  let noticeBlock = '';
  if (hasPendingPrices || hasDemoPrices) {
    noticeBlock = `\n${divider}\n⚠️ _*${isEs ? 'Nota' : isPt ? 'Nota' : 'Notice'}:* ${
      isEs
        ? 'Los precios marcados con asterisco (*) son referenciales de demostración. MA Fashion LLC confirmará los precios finales oficiales, descuentos por volumen para salones asociados y cotización del flete._\n'
        : isPt
        ? 'Preços com asterisco (*) são demonstrativos. A MA Fashion LLC confirmará os preços finais e descontos de salão._\n'
        : 'Prices with (*) are reference estimates. MA Fashion LLC will confirm final wholesale prices and shipping rates._\n'
    }`;
  }

  const closing = `\n${divider}\n${
    isEs
      ? '🤝 _Agradezco la atención de MA Fashion LLC y quedo a la espera de su respuesta para confirmar el pedido._'
      : isPt
      ? '🤝 _Agradeço a atenção da MA Fashion LLC e aguardo seu retorno para confirmar o pedido._'
      : '🤝 _Thank you for your assistance. Looking forward to your response to finalize the order._'
  }`;

  const fullMessage = `${title}${customerBlock}${itemsHeader}${itemsList}${financialBlock}${deliveryBlock}${notesBlock}${noticeBlock}${closing}`;

  return `https://wa.me/${MARKETPLACE_CONFIG.COMMERCIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
};
