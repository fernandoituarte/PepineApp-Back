export interface SeedProduct {
  name: string;
  scientific_name: string;
  maturity_height: string;
  maturity_width: string;
  family: string;
  origin: string;
  flower_color: string;
  leaf_color: string;
  description1: string;
  description2: string;
  size: string;
  pot: string;
  stock: number;
  price: number;
  vat: number;
  status: boolean;
  user_id: string; //se necesita el id del unico usuario admin
  yield: string;
  hardiness_zone: string;
  water_requirement: string;
  exposure: string;
  ground_cover_power: string;
  strate: string;
  foliage: string;
  media: string[];
  categories: CategoryProduct[]; //se necesita que las categorias esten creadas
}

export interface CategoryProduct {
  id: number;
}
export interface SeedCategory {
  value: string;
  description: string;
  media: string;
}
export interface SeedUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

export interface SeedOrder {
  total_price: number;
  status: string;
  user_id: string; //se necesita el id del usuario admin
}
export interface SeedOrderHasProduct {
  product_id: string; //se necesita el id de un usuario aleatorio creado previamente con el role 'user'
  order_id: string; //se necesita el id de una order aleatoria creada previamente
  quantity: number;
  price_time_order: number;
  vat: number;
}

export const seedProducts: SeedProduct[] = [
  {
    name: 'Ficus elastica',
    scientific_name: 'Ficus elastica',
    maturity_height: '2-3 mètres',
    maturity_width: '1-2 mètres',
    family: 'Moraceae',
    origin: 'Asie du Sud-Est',
    flower_color: 'Vert',
    leaf_color: 'Vert foncé',
    description1:
      "Le Ficus elastica, ou caoutchouc, est une plante d'intérieur populaire pour ses grandes feuilles épaisses et brillantes.",
    description2:
      "Cette plante nécessite peu de soins et s'adapte bien aux conditions intérieures.",
    size: 'Moyenne',
    pot: '1 L',
    stock: 15,
    price: 29.99,
    vat: 5,
    status: true,
    user_id: '',
    yield: 'Excellent',
    hardiness_zone: 'Zone 5a : -28,9 à -26,1°C',
    water_requirement: 'Modérée',
    exposure: 'Lumière indirecte',
    ground_cover_power: 'Correct (désherbage printemps/été)',
    strate: 'Arbuste',
    foliage: 'Persistant',
    media: ['f0ce3883-675d-4239-bd54-fca524a09d16.jpg'],
    categories: [{ id: 1 }],
  },
  {
    name: 'Monstera deliciosa',
    scientific_name: 'Monstera deliciosa',
    maturity_height: '3-4 mètres',
    maturity_width: '2-3 mètres',
    family: 'Araceae',
    origin: 'Amérique centrale',
    flower_color: 'Blanc crème',
    leaf_color: 'Vert',
    description1:
      'La Monstera deliciosa, aussi appelée plante gruyère, est appréciée pour ses grandes feuilles perforées.',
    description2:
      'Idéale pour les grands espaces intérieurs, elle apporte une touche tropicale.',
    size: 'Grande',
    pot: '1 L',
    stock: 8,
    price: 39.99,
    vat: 5,
    status: true,
    user_id: '',
    yield: 'Très bon',
    hardiness_zone: 'Zone 7a : -17,8 à -15°C',
    water_requirement: 'Modérée',
    exposure: 'Lumière indirecte',
    ground_cover_power: 'Mauvais',
    strate: 'Arbuste',
    foliage: 'Persistant',
    media: [
      '492c945a-7ada-48fc-a36f-e4e2503a0062.jpg',
      '5a5926d4-d10d-4dd7-8605-63485389bbb2.jpg',
    ],
    categories: [{ id: 1 }],
  },
  {
    name: 'Lavandula angustifolia',
    scientific_name: 'Lavandula angustifolia',
    maturity_height: '0.5-1 mètre',
    maturity_width: '0.5-1 mètre',
    family: 'Lamiaceae',
    origin: 'Méditerranée',
    flower_color: 'Violet',
    leaf_color: 'Vert argenté',
    description1:
      'La lavande est une plante aromatique connue pour son parfum apaisant et ses fleurs violettes.',
    description2:
      'Elle est souvent utilisée dans les jardins pour attirer les pollinisateurs.',
    size: 'Petite',
    pot: '1 L',
    stock: 25,
    price: 14.99,
    vat: 5,
    status: true,
    user_id: '',
    yield: 'Très bon',
    hardiness_zone: 'Zone 7a : -17,8 à -15°C',
    water_requirement: 'Faible',
    exposure: 'Plein soleil',
    ground_cover_power: 'Modéré',
    strate: 'Arbuste',
    foliage: 'Persistant',
    media: [
      '40cb86a7-1fe2-4a05-b0f8-4d3f3863c71e.jpg',
      '192dbf85-978c-4cc3-90c6-bfd5c0f8638d.jpg',
    ],
    categories: [{ id: 2 }],
  },
  {
    name: 'Aloe vera',
    scientific_name: 'Aloe vera',
    maturity_height: '0.3-0.5 mètre',
    maturity_width: '0.3-0.5 mètre',
    family: 'Asphodelaceae',
    origin: 'Péninsule Arabique',
    flower_color: 'Jaune',
    leaf_color: 'Vert',
    description1:
      "L'Aloe vera est une plante succulente aux multiples vertus médicinales, notamment pour apaiser les brûlures.",
    description2:
      'Facile à entretenir, elle est idéale pour les jardiniers débutants.',
    size: 'Petite',
    pot: '1 L',
    stock: 20,
    price: 19.99,
    vat: 5,
    status: true,
    user_id: '',
    yield: 'Très bon',
    hardiness_zone: 'Zone 7a : -17,8 à -15°C',
    water_requirement: 'Faible',
    exposure: 'Lumière indirecte',
    ground_cover_power: 'Mauvais',
    strate: 'Succulente',
    foliage: 'Persistant',
    media: [
      '6b2a7b02-5c9c-4226-9654-a64e92448d2a.jpg',
      'c3d65687-5141-4006-b7b7-3e80ae8a4cad.jpg',
    ],
    categories: [{ id: 2 }],
  },
  {
    name: 'Rosa chinensis',
    scientific_name: 'Rosa chinensis',
    maturity_height: '1-2 mètres',
    maturity_width: '1-2 mètres',
    family: 'Rosaceae',
    origin: 'Chine',
    flower_color: 'Rouge',
    leaf_color: 'Vert',
    description1:
      'La Rose de Chine est une plante à fleurs connue pour ses roses rouges vibrantes et son parfum envoûtant.',
    description2:
      'Elle est souvent cultivée dans les jardins et utilisée comme fleur coupée.',
    size: 'Moyenne',
    pot: '1 L',
    stock: 12,
    price: 24.99,
    vat: 5,
    status: true,
    user_id: '',
    yield: 'Correct',
    hardiness_zone: 'Zone 7a : -17,8 à -15°C',
    water_requirement: 'Modérée',
    exposure: 'Plein soleil',
    ground_cover_power: 'Très bon',
    strate: 'Arbuste',
    foliage: 'Caduc',
    media: [
      '4cbb137d-4181-4eca-ad56-77a5c5772310.jpg',
      '2d5f6da2-b3f8-477d-8a7e-bd7ebb420cfe.jpg',
    ],
    categories: [{ id: 5 }],
  },
  {
    name: 'Mentha spicata',
    scientific_name: 'Mentha spicata',
    maturity_height: '0.3-0.6 mètre',
    maturity_width: '0.3-0.6 mètre',
    family: 'Lamiaceae',
    origin: 'Europe',
    flower_color: 'Blanc ou violet pâle',
    leaf_color: 'Vert',
    description1:
      'La menthe verte est une plante aromatique très utilisée en cuisine pour ses feuilles au goût frais.',
    description2:
      'Elle se développe rapidement et peut être cultivée en pot ou en pleine terre.',
    size: 'Petite',
    pot: '1 L',
    stock: 30,
    price: 9.99,
    vat: 5,
    status: true,
    user_id: '',
    yield: 'Correct',
    hardiness_zone: 'Zone 7a : -17,8 à -15°C',
    water_requirement: 'Modérée',
    exposure: 'Plein soleil ou mi-ombre',
    ground_cover_power: 'Très bon',
    strate: 'Herbacée',
    foliage: 'Caduc',
    media: [
      'b14661e1-76b4-4433-8046-80f9344333cb.jpg',
      'e4a3349c-909a-48b1-bb33-b56e7580bea1.jpg',
    ],
    categories: [{ id: 3 }],
  },
];

export const seedCategories: SeedCategory[] = [
  {
    value: "Plantes d'intérieur",
    description:
      "Les plantes d'intérieur sont parfaites pour décorer les espaces de vie à l'intérieur de la maison. Elles nécessitent souvent peu de lumière et d'entretien, ce qui les rend idéales pour les appartements ou les bureaux.",
    media: 'a82a2715-ff3f-4bbe-a66d-cdda543aa9ac.jpg',
  },
  {
    value: 'Plantes succulentes',
    description:
      "Les plantes succulentes sont connues pour leur capacité à stocker de l'eau dans leurs feuilles épaisses. Elles sont très résistantes à la sécheresse et nécessitent peu d'arrosage, ce qui les rend faciles à entretenir.",
    media: '617a6305-7c4d-4792-8f6c-605af68fc5ba.jpg',
  },
  {
    value: 'Plantes aromatiques',
    description:
      'Les plantes aromatiques sont cultivées pour leurs feuilles parfumées et leurs propriétés culinaires. Elles peuvent être utilisées fraîches ou séchées pour assaisonner une variété de plats.',
    media: '4fc13a4a-0430-451c-8163-821e086c16c1.jpg',
  },
  {
    value: 'Plantes grimpantes',
    description:
      "Les plantes grimpantes sont idéales pour couvrir des treillis, des murs ou des clôtures. Elles ont tendance à s'étendre rapidement et peuvent ajouter une touche de verdure verticale à n'importe quel jardin.",
    media: '283fc842-626e-45e1-b201-36879e936f78.jpg',
  },
  {
    value: 'Plantes à fleurs',
    description:
      'Les plantes à fleurs sont appréciées pour leurs belles floraisons qui ajoutent de la couleur et de la beauté à un jardin ou à un espace intérieur. Elles nécessitent souvent des soins particuliers pour encourager la floraison.',
    media: 'f1f7078a-4557-4e91-a723-477d04966b0d.jpg',
  },
  {
    value: 'Plantes médicinales',
    description:
      'Les plantes médicinales sont utilisées depuis des siècles pour leurs propriétés thérapeutiques. Elles peuvent être cultivées pour préparer des remèdes naturels et sont souvent utilisées en phytothérapie.',
    media: 'f445d64c-e089-4814-8688-4263e0175073.jpg',
  },
];

export const seedUsers: SeedUser[] = [
  {
    first_name: 'Fernando',
    last_name: 'Ituarte',
    email: 'fernandoituarte@example.com',
    password: 'Fer123*',
    role: 'admin',
    phone: '0674539221',
  },
  {
    first_name: 'Lucie',
    last_name: 'Desceul',
    email: 'luciedesceul@example.com',
    password: 'Lucie123*',
    role: 'user',
    phone: '0674539201',
  },
  {
    first_name: 'Charles',
    last_name: 'Ramires',
    email: 'charlesramires92@example.com',
    password: 'Charles123*',
    role: 'user',
    phone: '0612345678',
  },
  {
    first_name: 'Marianne',
    last_name: 'Dumont',
    email: 'mariannedumont09@example.com',
    password: 'Marianne123*',
    role: 'user',
    phone: '0628495736',
  },
  {
    first_name: 'Antoine',
    last_name: 'Durand',
    email: 'antoinedurand11@example.com',
    password: 'Antoine123*',
    role: 'user',
    phone: '0684751234',
  },
  {
    first_name: 'Élise',
    last_name: 'Moreau',
    email: 'elisemoreau23@example.com',
    password: 'Elise123*',
    role: 'user',
    phone: '0621348765',
  },
  {
    first_name: 'Julien',
    last_name: 'Lefevre',
    email: 'julienlefevre45@example.com',
    password: 'Julien123*',
    role: 'user',
    phone: '0634982176',
  },
  {
    first_name: 'Camille',
    last_name: 'Roux',
    email: 'camilleroux67@example.com',
    password: 'Camille123*',
    role: 'user',
    phone: '0645789123',
  },
  {
    first_name: 'Maxime',
    last_name: 'Bernard',
    email: 'maximebernard89@example.com',
    password: 'Maxime123*',
    role: 'user',
    phone: '0678912345',
  },
  {
    first_name: 'Sophie',
    last_name: 'Richard',
    email: 'sophierichard12@example.com',
    password: 'Sophie123*',
    role: 'user',
    phone: '0654891237',
  },
  {
    first_name: 'Thomas',
    last_name: 'Martinez',
    email: 'thomasmartinez34@example.com',
    password: 'Thomas123*',
    role: 'user',
    phone: '0662345897',
  },
];

export const seedOrders: SeedOrder[] = [
  {
    total_price: 36,
    status: 'en cours',
    user_id: '',
  },
  {
    total_price: 36,
    status: 'en cours',
    user_id: '',
  },
  {
    total_price: 36,
    status: 'en cours',
    user_id: '',
  },
  {
    total_price: 36,
    status: 'en cours',
    user_id: '',
  },
  {
    total_price: 36,
    status: 'en cours',
    user_id: '',
  },
  {
    total_price: 36,
    status: 'en cours',
    user_id: '',
  },
];

export const seedOrdersHasProduct: SeedOrderHasProduct[] = [
  {
    product_id: '',
    order_id: '',
    quantity: 3,
    price_time_order: 12,
    vat: 10,
  },
  {
    product_id: '',
    order_id: '',
    quantity: 3,
    price_time_order: 12,
    vat: 10,
  },
  {
    product_id: '',
    order_id: '',
    quantity: 3,
    price_time_order: 12,
    vat: 10,
  },
  {
    product_id: '',
    order_id: '',
    quantity: 3,
    price_time_order: 12,
    vat: 10,
  },
  {
    product_id: '',
    order_id: '',
    quantity: 3,
    price_time_order: 12,
    vat: 10,
  },
  {
    product_id: '',
    order_id: '',
    quantity: 3,
    price_time_order: 12,
    vat: 10,
  },
];
