import { Product } from '../types';
import HERO_IMAGE from '../assets/images/hero_fashion_editorial_1794387299849.jpg';
import CAMPAIGN_IMAGE from '../assets/images/campaign_season_lookbook_1794387302873.jpg';
import BLAZER_IMAGE from '../assets/images/product_tailored_blazer_1794387302774.jpg';
import CASHMERE_IMAGE from '../assets/images/product_cashmere_knit_1794387303122.jpg';
import LEATHER_IMAGE from '../assets/images/category_accessories_leather_1794387302858.jpg';

export { HERO_IMAGE, CAMPAIGN_IMAGE, BLAZER_IMAGE, CASHMERE_IMAGE, LEATHER_IMAGE };

export const PRODUCTS: Product[] = [
  {
    id: 'mv-001',
    name: 'The Sovereign Double-Breasted Wool Blazer',
    subtitle: 'Milled Virgin Wool · Structured Peak Lapels',
    price: 680,
    originalPrice: 780,
    category: 'Outerwear',
    gender: 'women',
    occasion: 'Workwear',
    images: [BLAZER_IMAGE, CAMPAIGN_IMAGE, HERO_IMAGE],
    colors: [
      { name: 'Midnight Charcoal', hex: '#1C1D21' },
      { name: 'Warm Camel', hex: '#B8976C' },
      { name: 'Ecru Chalk', hex: '#F3EFEA' }
    ],
    sizes: ['36 FR', '38 FR', '40 FR', '42 FR', '44 FR'],
    tag: 'Best Seller',
    description: 'Precision-tailored from 100% Biella virgin wool with sculpted canvas chest construction and structured padded shoulders. Cut with an elongated silhouette that transitions effortlessly from morning appointments to evening dinners.',
    fabric: '100% Super 130s Virgin Wool; Lining: 100% Cupro Bemberg',
    craftsmanship: 'Hand-basted interior canvas, horn button fastenings, felted undercollar, double rear vents crafted in Civitanova Marche, Italy.',
    care: 'Specialist dry clean only. Steam gently. Store on wide cedar coat hanger.',
    inStock: true,
    stockCount: 5,
    rating: 4.9,
    reviewCount: 34,
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        rating: 5,
        date: '2 weeks ago',
        title: 'Architectural perfection in every stitch',
        comment: 'The drape and structure of this blazer rival Savile Row bespoke. The virgin wool feels substantial yet moves with fluidity. Worth every single cent.',
        verifiedPurchase: true,
        sizePurchased: '38 FR',
        colorPurchased: 'Midnight Charcoal'
      },
      {
        id: 'rev-2',
        author: 'Julian Moreau',
        rating: 5,
        date: '1 month ago',
        title: 'Flawless proportions',
        comment: 'The waist suppression and peak lapels create such a commanding yet understated silhouette. Received compliments all evening.',
        verifiedPurchase: true,
        sizePurchased: '40 FR',
        colorPurchased: 'Midnight Charcoal'
      }
    ]
  },
  {
    id: 'mv-002',
    name: 'The Heavy Ribbed Cashmere Sweater',
    subtitle: '7-Gauge Pure Mongolian Cashmere · Relaxed Fit',
    price: 490,
    category: 'Knitwear',
    gender: 'unisex',
    occasion: 'Everyday',
    images: [CASHMERE_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Ecru Ivory', hex: '#EBE6DC' },
      { name: 'Heather Grey', hex: '#8C8C8C' },
      { name: 'Espresso Black', hex: '#1E1E1E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tag: 'New Arrival',
    description: 'Knitted from Grade-A Mongolian cashmere fibers harvested sustainably through traditional spring combing. Features an oversized architectural ribbed knit, dropped shoulder line, and seamless tubular collar for uncompromising warmth.',
    fabric: '100% Pure Mongolian Cashmere (7-Gauge 4-Ply)',
    craftsmanship: 'Spun in Scotland by Todd & Duncan, fully fashioned knit loops linked by hand to prevent seam chafing.',
    care: 'Hand wash in cold water with cashmere shampoo or green dry clean. Dry flat on absorbent towel.',
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 22,
    reviews: [
      {
        id: 'rev-3',
        author: 'Sophie Lemaire',
        rating: 5,
        date: '3 weeks ago',
        title: 'Heaviest, softest cashmere I have ever owned',
        comment: 'The 4-ply weight is so luxurious. It is warm without being stifling, and the ecru color is luminous in natural daylight.',
        verifiedPurchase: true,
        sizePurchased: 'S',
        colorPurchased: 'Ecru Ivory'
      }
    ]
  },
  {
    id: 'mv-003',
    name: 'The Atelier Oversized Wool Trench Coat',
    subtitle: 'Double-Faced Wool & Cashmere Blend · Raglan Sleeve',
    price: 890,
    originalPrice: 980,
    category: 'Outerwear',
    gender: 'women',
    occasion: 'Workwear',
    images: [CAMPAIGN_IMAGE, HERO_IMAGE, BLAZER_IMAGE],
    colors: [
      { name: 'Toffee Camel', hex: '#9C7A54' },
      { name: 'Charcoal Black', hex: '#212121' }
    ],
    sizes: ['36 FR', '38 FR', '40 FR', '42 FR'],
    tag: 'Limited Edition',
    description: 'The defining outerwear piece of our seasonal campaign. Designed with generous lapels, a sweeping ankle length, storm flap detailing, and an adjustable waist sash. Hand-finished double-face construction eliminates bulk while maintaining warmth.',
    fabric: '90% Virgin Wool, 10% Cashmere',
    craftsmanship: 'Edge-split and hand-stitched along all external perimeters. Buffalo horn buckles on cuffs and waist.',
    care: 'Specialist dry clean only. Brush with natural bristle brush after wear.',
    inStock: true,
    stockCount: 3,
    rating: 4.9,
    reviewCount: 41,
    reviews: [
      {
        id: 'rev-4',
        author: 'Camille Dupuis',
        rating: 5,
        date: '2 weeks ago',
        title: 'The hero of my winter wardrobe',
        comment: 'The drape as you walk is cinematic. Perfectly weighted, roomy enough for heavy knits underneath, yet tailored through the back.',
        verifiedPurchase: true,
        sizePurchased: '38 FR',
        colorPurchased: 'Toffee Camel'
      }
    ]
  },
  {
    id: 'mv-004',
    name: 'The Florentine Box Calfskin Shoulder Bag',
    subtitle: 'Full-Grain Tuscan Calfskin · Solid Brass Clasp',
    price: 640,
    category: 'Accessories',
    gender: 'unisex',
    occasion: 'Everyday',
    images: [LEATHER_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Noir Black', hex: '#111111' },
      { name: 'Sienna Tan', hex: '#A0522D' }
    ],
    sizes: ['One Size (24 × 18 × 8 cm)'],
    tag: 'Artisanal',
    description: 'Vegetable-tanned box calfskin crafted in a boutique workshop outside Florence. Features hand-painted raw edges, an internal suede compartment, and an understated brushed gold lock clasp engraved with the Maison monogram.',
    fabric: '100% Vegetable-Tanned Italian Calfskin; Lining: Lambskin Suede',
    craftsmanship: 'Hand saddle-stitched with waxed linen thread. Edges burnished and painted through seven gradual coats.',
    care: 'Wipe with soft microfiber cloth. Condition annually with natural beeswax cream.',
    inStock: true,
    stockCount: 6,
    rating: 4.8,
    reviewCount: 19,
    reviews: [
      {
        id: 'rev-5',
        author: 'Marcus Lindqvist',
        rating: 5,
        date: '1 week ago',
        title: 'Leather aroma and hand-feel are sensational',
        comment: 'Minimalist, no loud branding, just exquisite proportions and peerless leathercraft. The lock has a satisfying mechanical click.',
        verifiedPurchase: true,
        sizePurchased: 'One Size',
        colorPurchased: 'Espresso Brown'
      }
    ]
  },
  {
    id: 'mv-005',
    name: 'The Biella Pleated Wide-Leg Trousers',
    subtitle: 'High-Rise · Double Forward Pleats · Fluid Wool Crepe',
    price: 380,
    category: 'Women',
    gender: 'women',
    occasion: 'Workwear',
    images: [CAMPAIGN_IMAGE, BLAZER_IMAGE],
    colors: [
      { name: 'Warm Ivory', hex: '#F2EFE8' },
      { name: 'Onyx Black', hex: '#161616' },
      { name: 'Slate Taupe', hex: '#7D766D' }
    ],
    sizes: ['34 FR', '36 FR', '38 FR', '40 FR', '42 FR'],
    tag: 'Best Seller',
    description: 'Tailored with a high rise that elongates the leg and double forward deep pleats that billow gently into a full, fluid hem. Features hidden side slit pockets, an extended waistband tab, and pressed center creases.',
    fabric: '100% High-Twist Wool Crepe (Crease-resistant)',
    craftsmanship: 'Curved curtain waistband prevents gaping; interior taped seams with French fly closure.',
    care: 'Dry clean or gentle steam. Line dry on clamp hanger.',
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      {
        id: 'rev-6',
        author: 'Valerie K.',
        rating: 5,
        date: '4 days ago',
        title: 'The holy grail of trousers',
        comment: 'Finally, high-waisted trousers that fit both waist and hips without pulling. The wool crepe does not wrinkle even after a 6-hour flight.',
        verifiedPurchase: true,
        sizePurchased: '36 FR',
        colorPurchased: 'Warm Ivory'
      }
    ]
  },
  {
    id: 'mv-006',
    name: 'The Como Silk Crepe Wrap Gown',
    subtitle: '100% Mulberry Silk Crepe de Chine · Bias Cut',
    price: 720,
    category: 'Women',
    gender: 'women',
    occasion: 'Occasion',
    images: [HERO_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Chantilly Ivory', hex: '#F9F7F2' },
      { name: 'Midnight Navy', hex: '#131B2A' }
    ],
    sizes: ['36 FR', '38 FR', '40 FR', '42 FR'],
    tag: 'Limited Edition',
    description: 'Woven in Lake Como, this floor-sweeping gown features a dynamic asymmetric wrap front, draped mock-neck sash, and soft fluid movement. Cut on the bias to hug the torso naturally without constriction.',
    fabric: '100% Pure Mulberry Silk (32mm heavy weight)',
    craftsmanship: 'Hand-rolled hem finishes, concealed side invisible zipper, fully lined in silk georgette.',
    care: 'Dry clean only. Store in breathable cotton garment bag.',
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewCount: 15,
    reviews: [
      {
        id: 'rev-7',
        author: 'Isabella Rossi',
        rating: 5,
        date: '3 weeks ago',
        title: 'Wore this for an opera gala in Milan',
        comment: 'Pure poetry in motion. The silk has substantial weight that keeps it from clinging awkwardly. Felt like royalty.',
        verifiedPurchase: true,
        sizePurchased: '38 FR',
        colorPurchased: 'Chantilly Ivory'
      }
    ]
  },
  {
    id: 'mv-007',
    name: 'The Sartorial Poplin Officer Shirt',
    subtitle: '120/2 Egyptian Giza Cotton · Hidden Placket',
    price: 260,
    category: 'Men',
    gender: 'men',
    occasion: 'Workwear',
    images: [BLAZER_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Stripe', hex: '#D2E2F0' },
      { name: 'Sand Beige', hex: '#E2DCD1' }
    ],
    sizes: ['38 IT', '39 IT', '40 IT', '41 IT', '42 IT', '43 IT'],
    tag: 'Best Seller',
    description: 'An essential foundation for modern tailoring. Spun from extra-long staple Giza cotton with a smooth, paper-like crisp hand. Cut with a relaxed collarless officer neck and concealed mother-of-pearl button placket.',
    fabric: '100% Giza 87 Egyptian Cotton (120/2 ply)',
    craftsmanship: 'Single-needle stitching at 22 stitches per inch. Split back yoke for shoulder mobility.',
    care: 'Machine wash 30°C gentle cycle. Hot iron with light spray starch.',
    inStock: true,
    stockCount: 14,
    rating: 4.8,
    reviewCount: 31,
    reviews: [
      {
        id: 'rev-8',
        author: 'Henri Delacroix',
        rating: 5,
        date: '2 weeks ago',
        title: 'Impeccable collar line and fabric quality',
        comment: 'Holds its crispness throughout a 14-hour workday. The mother-of-pearl buttons are thick and securely shanked.',
        verifiedPurchase: true,
        sizePurchased: '40 IT',
        colorPurchased: 'Crisp White'
      }
    ]
  },
  {
    id: 'mv-008',
    name: 'The Tuscan Calfskin Chelsea Boots',
    subtitle: 'Blake-Stitched · Vibram Half-Sole · Tonal Elastic',
    price: 520,
    category: 'Footwear',
    gender: 'unisex',
    occasion: 'Everyday',
    images: [LEATHER_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Castagna Brown', hex: '#523A28' },
      { name: 'Noir Black', hex: '#141414' }
    ],
    sizes: ['39 EU', '40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    tag: 'Artisanal',
    description: 'Sculpted on a sleek almond-toe last with an elegant low ankle pitch. Blake-stitched sole with protective rubber inset allows recrafting for decades of wear while offering immediate comfort from day one.',
    fabric: 'Upper: 100% Full-Grain French Boxcalf; Sole: Vegetable-Tanned Sole Leather with Vibram Inset',
    craftsmanship: 'Constructed by master cordwainers in Montegranaro, Italy. Channel-stitched Goodyear/Blake hybrid.',
    care: 'Insert cedar shoe trees immediately after wear. Buff with beeswax shoe cream.',
    inStock: true,
    stockCount: 7,
    rating: 4.9,
    reviewCount: 26,
    reviews: [
      {
        id: 'rev-9',
        author: 'David Sterling',
        rating: 5,
        date: '3 weeks ago',
        title: 'Zero break-in required',
        comment: 'Leather molds to the foot within three wears. The silhouette is neither too bulky nor too pointy—pure refinement.',
        verifiedPurchase: true,
        sizePurchased: '43 EU',
        colorPurchased: 'Espresso Brown'
      }
    ]
  },
  {
    id: 'mv-009',
    name: 'The Structured Double-Face Wool Peacoat',
    subtitle: 'Melton Virgin Wool · Broad Convertible Collar',
    price: 840,
    category: 'Outerwear',
    gender: 'men',
    occasion: 'Everyday',
    images: [BLAZER_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Deep Navy', hex: '#141926' },
      { name: 'Heather Charcoal', hex: '#333333' }
    ],
    sizes: ['46 IT', '48 IT', '50 IT', '52 IT', '54 IT'],
    tag: 'New Arrival',
    description: 'An elevated reinterpretation of the naval classic. Made with heavy 800gsm double-face Melton wool that blocks winter winds completely. Features slanted handwarmer chest pockets lined in brushed cashmere flannel.',
    fabric: '100% Virgin Wool Melton (800 gsm)',
    craftsmanship: 'Internal storm tab, anchored horn buttons with backing stays, satin-lined sleeves.',
    care: 'Specialist dry clean only. Air out after rain exposure.',
    inStock: true,
    stockCount: 4,
    rating: 4.9,
    reviewCount: 18,
    reviews: [
      {
        id: 'rev-10',
        author: 'Alexander Wright',
        rating: 5,
        date: '1 week ago',
        title: 'Heft and construction are old-world luxury',
        comment: 'Substantial weight, broad collar stands up perfectly when windy. Feels like a coat you pass down to your children.',
        verifiedPurchase: true,
        sizePurchased: '50 IT',
        colorPurchased: 'Deep Navy'
      }
    ]
  },
  {
    id: 'mv-010',
    name: 'The Architectural Sculpted Midi Dress',
    subtitle: 'Heavy Wool Crepe · Contoured Darting',
    price: 560,
    category: 'Women',
    gender: 'women',
    occasion: 'Occasion',
    images: [HERO_IMAGE, BLAZER_IMAGE],
    colors: [
      { name: 'Onyx Noir', hex: '#111111' },
      { name: 'Tuscan Red', hex: '#58181A' }
    ],
    sizes: ['36 FR', '38 FR', '40 FR', '42 FR'],
    tag: 'New Arrival',
    description: 'Defined by clean geometric seams and an asymmetric neckline that exposes the collarbone. Cut to skim the hips before falling to an elegant mid-calf length with a high back walking slit.',
    fabric: '96% Virgin Wool, 4% Elastane for structural flexibility',
    craftsmanship: 'Hand-sewn internal stays at the shoulder, boned bodice support, concealed back zipper.',
    care: 'Dry clean only. Steam with protective cloth.',
    inStock: true,
    stockCount: 6,
    rating: 4.8,
    reviewCount: 14,
    reviews: [
      {
        id: 'rev-11',
        author: 'Clara Oswald',
        rating: 5,
        date: '2 weeks ago',
        title: 'Modern and dramatic yet totally comfortable',
        comment: 'The architectural darts hold their crisp shape even when sitting. Stunning with statement earrings.',
        verifiedPurchase: true,
        sizePurchased: '38 FR',
        colorPurchased: 'Onyx Noir'
      }
    ]
  },
  {
    id: 'mv-011',
    name: 'The Extra-Fine Merino Rollneck',
    subtitle: '19.5-Micron Australian Merino · 18-Gauge Knit',
    price: 310,
    category: 'Knitwear',
    gender: 'men',
    occasion: 'Workwear',
    images: [CASHMERE_IMAGE, BLAZER_IMAGE],
    colors: [
      { name: 'Slate Taupe', hex: '#5E574D' },
      { name: 'Midnight Charcoal', hex: '#1E1E1E' },
      { name: 'Pure Ecru', hex: '#ECE8DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tag: 'Best Seller',
    description: 'Finely spun for layering beneath blazers and trench coats without bunching. Breathable, thermo-regulating merino wool yarn spun in northern Italy with ribbed cuffs and hem that retain elasticity.',
    fabric: '100% Extra-Fine Australian Merino Wool (19.5 Micron, 18-Gauge)',
    craftsmanship: 'Fully fashioned knitted collar with zero raw cut seams. Hand-finished collar join.',
    care: 'Hand wash cold or wool cycle with low spin. Reshape while damp.',
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewCount: 29,
    reviews: [
      {
        id: 'rev-12',
        author: 'Liam Vance',
        rating: 5,
        date: '1 month ago',
        title: 'The ultimate blazer companion',
        comment: 'Sits perfectly under my suit jackets. The collar stays upright all day without rolling down or getting slouchy.',
        verifiedPurchase: true,
        sizePurchased: 'L',
        colorPurchased: 'Slate Taupe'
      }
    ]
  },
  {
    id: 'mv-012',
    name: 'The Venetian Saddle Leather Belt',
    subtitle: 'Bridle Leather · Solid Brushed Brass Monogram Buckle',
    price: 180,
    category: 'Accessories',
    gender: 'unisex',
    occasion: 'Everyday',
    images: [LEATHER_IMAGE, CAMPAIGN_IMAGE],
    colors: [
      { name: 'Espresso Dark Brown', hex: '#34261B' },
      { name: 'Noir Black', hex: '#111111' }
    ],
    sizes: ['80 cm', '85 cm', '90 cm', '95 cm', '100 cm'],
    tag: 'Artisanal',
    description: 'Cut from 3.5mm thick vegetable-tanned bridle leather with beveled and stained edges. Fastened with an understated custom cast buckle in sand-cast solid brass.',
    fabric: '100% Italian Bridle Leather, Solid Brass Hardware',
    craftsmanship: 'Hand-burnished edges using beeswax and wooden slicker. Hand-punched teardrop holes.',
    care: 'Condition with saddle oil once a year.',
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 21,
    reviews: [
      {
        id: 'rev-13',
        author: 'Patrick O.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Thick leather that will last decades',
        comment: 'No cheap bonded layers here. A solid piece of leather that develops an incredible patina with every wear.',
        verifiedPurchase: true,
        sizePurchased: '90 cm',
        colorPurchased: 'Espresso Dark Brown'
      }
    ]
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'women',
    title: "Women's Collection",
    tagline: 'Architectural silhouettes & fluid silk drapery',
    image: CAMPAIGN_IMAGE,
    itemCount: 8,
    filterCategory: 'Women'
  },
  {
    id: 'men',
    title: "Men's Sartorial",
    tagline: 'Deconstructed tailoring & fine natural fibers',
    image: BLAZER_IMAGE,
    itemCount: 6,
    filterCategory: 'Men'
  },
  {
    id: 'outerwear',
    title: 'Tailored Outerwear',
    tagline: 'Double-face wool, cashmere coats & trench lines',
    image: CAMPAIGN_IMAGE,
    itemCount: 5,
    filterCategory: 'Outerwear'
  },
  {
    id: 'knitwear',
    title: 'Pure Cashmere & Knits',
    tagline: '7-gauge Mongolian cashmere & fine merino',
    image: CASHMERE_IMAGE,
    itemCount: 4,
    filterCategory: 'Knitwear'
  },
  {
    id: 'accessories',
    title: 'Artisanal Leather & Shoes',
    tagline: 'Florentine vegetable-tanned calfskin & Chelsea boots',
    image: LEATHER_IMAGE,
    itemCount: 4,
    filterCategory: 'Accessories'
  }
];

export const LOOKBOOK_SPOTS = [
  {
    id: 'spot-1',
    productId: 'mv-003',
    name: 'Atelier Wool Trench Coat',
    price: 890,
    top: '32%',
    left: '46%'
  },
  {
    id: 'spot-2',
    productId: 'mv-002',
    name: 'Heavy Ribbed Cashmere Sweater',
    price: 490,
    top: '42%',
    left: '52%'
  },
  {
    id: 'spot-3',
    productId: 'mv-005',
    name: 'Biella Pleated Wide-Leg Trousers',
    price: 380,
    top: '68%',
    left: '48%'
  },
  {
    id: 'spot-4',
    productId: 'mv-004',
    name: 'Florentine Leather Bag',
    price: 640,
    top: '48%',
    left: '38%'
  }
];

export const JOURNAL_STORIES = [
  {
    id: 'j-1',
    title: 'The Architecture of the Perfect Lapel',
    category: 'Sartorial Craft',
    readTime: '4 min read',
    date: 'Autumn / Winter Issue',
    snippet: 'Exploring how subtle angle changes in peak lapels shift shoulder proportions and create commanding elegance.',
    image: BLAZER_IMAGE
  },
  {
    id: 'j-2',
    title: 'In Search of Pure Cashmere: From the Mongolian Steppes to Biella',
    category: 'Raw Materials',
    readTime: '6 min read',
    date: 'Material Archives',
    snippet: 'How sustainable combing practices during spring molting yield the world’s longest, most durable fibers.',
    image: CASHMERE_IMAGE
  },
  {
    id: 'j-3',
    title: 'The Art of Slow Vegetable Tanning in Tuscany',
    category: 'Artisanship',
    readTime: '5 min read',
    date: 'Atelier Visit',
    snippet: 'Inside the family-owned tannery outside Florence that has perfected natural bark extracts for four generations.',
    image: LEATHER_IMAGE
  }
];
