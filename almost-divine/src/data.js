export const products = [
  {
    id: 'soot',
    name: 'Soot set',
    price: 9200,
    color: 'Soot',
    collection: 'evening',
    images: ['/img/h-black.jpg', '/img/p-black.jpg'],
    fabric: 'Cotton, mid-weight. Holds a crease, cool on skin.',
    fit: 'Straight. Falls to the knee. Wear it through the week.',
    care: 'Cold wash. Hang dry. Iron on reverse.',
  },
  {
    id: 'sand',
    name: 'Sand set',
    price: 7800,
    color: 'Sand',
    collection: 'weekday',
    images: ['/img/h-brown.jpg', '/img/h-cloth.jpg'],
    fabric: 'Cotton. Dry hand. Takes the day’s light.',
    fit: 'Straight. Room at the shoulder. Sits clean over pajama.',
    care: 'Cold wash. Hang dry. Iron on reverse.',
  },
  {
    id: 'ivory',
    name: 'Ivory set',
    price: 7400,
    color: 'Ivory',
    collection: 'weekday',
    images: ['/img/h-white.jpg', '/img/h-park.jpg'],
    fabric: 'Cotton. Light. Does not cling.',
    fit: 'Straight. Side slits. Meant for heat.',
    care: 'Cold wash. Hang dry. Iron on reverse.',
  },
  {
    id: 'butter',
    name: 'Butter set',
    price: 8100,
    color: 'Butter',
    collection: 'weekday',
    images: ['/img/p-un-yellow.jpg', '/img/h-cloth.jpg'],
    fabric: 'Cotton. Soft face. Quiet colour.',
    fit: 'Straight. Band collar. Wear it without a jacket.',
    care: 'Cold wash. Hang dry. Iron on reverse.',
  },
  {
    id: 'navy',
    name: 'Navy set',
    price: 8400,
    color: 'Navy',
    collection: 'evening',
    images: ['/img/p-indigo.jpg', '/img/p-black.jpg'],
    fabric: 'Cotton. Dense weave. Holds its line.',
    fit: 'Straight. Sits at the knee. Evening without a sherwani.',
    care: 'Cold wash. Hang dry. Iron on reverse.',
  },
  {
    id: 'khaki',
    name: 'Khaki set',
    price: 7600,
    color: 'Khaki',
    collection: 'weekday',
    images: ['/img/p-beige.jpg', '/img/h-brown.jpg'],
    fabric: 'Cotton. Matte. No shine, no fuss.',
    fit: 'Straight. Everyday length. Pair with white pajama.',
    care: 'Cold wash. Hang dry. Iron on reverse.',
  },
]

export const banners = [
  {
    id: 'weekday',
    src: '/img/h-black.jpg',
    kicker: 'Vol. 01',
    title: 'Weekday',
    cta: 'Discover',
    hint: 'Scroll to explore',
    to: '/shop',
    ink: 'light',
  },
  {
    id: 'sand',
    src: '/img/h-brown.jpg',
    kicker: 'Vol. 01',
    title: 'Sand',
    cta: 'Discover',
    to: '/shop/sand',
    ink: 'dark',
  },
  {
    id: 'cloth',
    src: '/img/h-cloth.jpg',
    kicker: 'The hand',
    title: 'Cloth',
    cta: 'Discover',
    to: '/shop',
    ink: 'light',
  },
  {
    id: 'ivory',
    src: '/img/h-white.jpg',
    kicker: 'Vol. 01',
    title: 'Ivory',
    cta: 'Discover',
    to: '/shop/ivory',
    ink: 'dark',
  },
  {
    id: 'night',
    src: '/img/p-black.jpg',
    kicker: 'Vol. 01',
    title: 'Night',
    cta: 'Discover',
    to: '/shop/soot',
    ink: 'light',
  },
]

export const collections = [
  { id: 'weekday', title: 'Weekday', src: '/img/h-brown.jpg' },
  { id: 'evening', title: 'Evening', src: '/img/h-black.jpg' },
  { id: 'cloth', title: 'Cloth', src: '/img/h-cloth.jpg' },
]

export const sizes = ['S', 'M', 'L', 'XL']

export function formatPrice(n) {
  return `Rs. ${n.toLocaleString('en-IN')}`
}
