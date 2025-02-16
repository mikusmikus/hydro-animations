export const artists = [
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 1900,
    title: 'SABINE MARCELIS',
    description: 'Design through material and light',
    slug: 'sabine-marcelis',
  },
  {
    src: '/images/_42A3062.jpg',
    width: 1400,
    height: 1900,
    title: 'KEIJI TAKEUCHI',
    description: 'Minimal design with maximum impact',
    slug: 'keiji-takeuchi',
  },
  {
    src: '/images/_AAA0150.jpg',
    width: 1600,
    height: 1900,
    title: 'CECILIE MANZ',
    description: 'Scandinavian simplicity meets modern function',
    slug: 'cecilie-manz',
  },
  {
    src: '/images/_AAA9965.jpg',
    width: 1200,
    height: 1900,
    title: 'DANIEL RYBAKKEN',
    description: 'Light and shadow in harmony',
    slug: 'daniel-rybakken',
  },
  {
    src: '/images/_AAA9967.jpg',
    width: 1200,
    height: 1900,
    title: 'STEFAN DIEZ',
    description: 'Industrial elegance with sustainable approach',
    slug: 'stefan-diez',
  },
  {
    src: '/images/HYDRO_100R_DIE.jpg',
    width: 1100,
    height: 1900,
    title: 'HYDRO',
    description: 'Innovative aluminum design and engineering',
    slug: 'hydro',
  },
] as const;

export type Artist = (typeof artists)[number];
