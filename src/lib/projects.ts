export type ProjectCategory = 'Hospitality' | 'Residential' | 'Commercial' | 'Heritage';
export type ProjectFilter = 'All' | ProjectCategory;

export interface ProjectSection {
  title: string;
  paragraphs: string[];
}

export interface ProjectRecord {
  id: number;
  slug: string;
  title: string;
  imageName: string;
  category: ProjectCategory;
  projectType: string;
  location: string;
  area: string;
  year: number;
  description: string;
  studio: string;
  image: string;
  summary: string;
  sections: ProjectSection[];
}

const studioName = 'Wanderlust Architects';

const sharedSections: ProjectSection[] = [
  {
    title: 'Project Overview',
    paragraphs: [
      'This project, designed by Wanderlust Architects, represents a thoughtful blend of architectural planning, functional clarity, and aesthetic expression. The design process focused on understanding site conditions, user requirements, and the broader contextual environment so the built experience feels both distinctive and grounded.',
      'By carefully analysing spatial relationships and operational needs, the architectural approach balances form and function. Circulation patterns, structural layout, and interior planning work together to create a cohesive environment that supports everyday use as well as special moments within the space.',
    ],
  },
  {
    title: 'Design Brief',
    paragraphs: [
      'The brief called for a space that would be efficient, visually engaging, and adaptable to evolving needs. Wanderlust Architects responded with a strong emphasis on planning clarity, long-term usability, and a spatial language that feels refined without compromising performance.',
      'The client required an environment that reflects quality, attention to detail, and a carefully crafted user experience. To achieve that, the design integrates architectural discipline with interior strategies that prioritise comfort, harmony, and practical day-to-day function.',
    ],
  },
  {
    title: 'Architectural Concept',
    paragraphs: [
      'The architectural concept focuses on simplicity, proportion, and spatial clarity rather than excessive ornamentation. Strong forms, balanced geometry, and thoughtful material application create a language that feels timeless and adaptable.',
      'Key architectural elements guide the overall identity of the project, including structured facades, controlled spatial volumes, and circulation pathways that help users move intuitively through the environment.',
    ],
  },
  {
    title: 'Spatial Planning Strategy',
    paragraphs: [
      'Effective spatial planning plays a central role in the success of the project. The layout was developed so that every area serves a clear purpose while maintaining visual continuity across the built environment.',
      'Private, semi-public, and public zones are organised with intention where required. This zoning strategy improves usability and helps the architecture support a range of activities and operational requirements with clarity.',
    ],
  },
  {
    title: 'Material and Interior Palette',
    paragraphs: [
      'Material selection shapes the character of the project through a palette centred on durability, visual refinement, and contextual compatibility. The finishes were chosen to feel sophisticated without overwhelming the architecture itself.',
      'Neutral tones, layered textures, and carefully selected materials contribute to a calm and enduring atmosphere while also supporting ease of maintenance and long-term performance.',
    ],
  },
  {
    title: 'Lighting Strategy',
    paragraphs: [
      'Lighting is used strategically to enhance the architectural character of the project. Natural light is prioritised wherever possible to create an inviting and comfortable atmosphere through the day.',
      'Ambient, accent, and task lighting layers are introduced to support functionality and visual drama after dark. This layered approach allows the environment to adapt to different moods and operational needs.',
    ],
  },
  {
    title: 'User Experience and Circulation',
    paragraphs: [
      'User movement through the space was carefully studied throughout the design process. Circulation paths are intuitive and unobstructed so visitors can move comfortably and read the space with ease.',
      'Wide pathways, clear sightlines, and strategically placed focal points help guide movement while maintaining overall spatial balance. The result is an experience in which functionality and aesthetics support one another.',
    ],
  },
  {
    title: 'Project Outcome',
    paragraphs: [
      'The final outcome reflects Wanderlust Architects\' commitment to creating spaces that combine architectural integrity with functional excellence. The project demonstrates how thoughtful design can transform a programme into an engaging spatial experience.',
      'By balancing expression with operational practicality, the finished environment is both visually compelling and highly usable for the people it serves.',
    ],
  },
  {
    title: 'Conclusion',
    paragraphs: [
      'This project stands as an example of Wanderlust Architects\' approach to contemporary architecture and interior design. Through careful planning, material selection, and attention to spatial experience, the design achieves a measured balance between aesthetics and usability.',
      'It contributes to the studio\'s growing body of work that prioritises thoughtful design, technical clarity, and enduring visual character.',
    ],
  },
];

const rawProjects = [
  {
    title: 'Plush Banquet Venue Ranthambore',
    imageName: 'Plush Banquet Venue by Wanderlust Architects',
    projectType: 'Hospitality / Banquet Venue',
    location: 'Ranthambore, Rajasthan',
    area: '18,500 sq.ft',
    year: 2024,
    description: 'A banquet venue composed around procession, layered hospitality, and a calm material palette that elevates celebration.',
  },
  {
    title: 'The Baagh Luxury Resort',
    imageName: 'The Luxury Resort Rajasthan By Wanderlust Architects',
    projectType: 'Luxury Resort Architecture',
    location: 'Rajasthan',
    area: '24,000 sq.ft',
    year: 2023,
    description: 'A luxury resort shaped through courtyard planning, landscape softness, and understated Rajasthani warmth.',
  },
  {
    title: 'Luxury Corporate Office',
    imageName: 'The Luxury Office by Wanderlust Architects',
    projectType: 'Corporate Office Interior',
    location: 'Jaipur, Rajasthan',
    area: '6,200 sq.ft',
    year: 2024,
    description: 'A corporate workplace that balances executive polish, spatial clarity, and a restrained hospitality-led interior mood.',
  },
  {
    title: 'Rani Sati Temple Renovation',
    imageName: 'Rani Sati Temple Renovation by Wanderlust Architects',
    projectType: 'Heritage Architecture / Temple Documentation',
    location: 'Rajasthan',
    area: '12,400 sq.ft',
    year: 2022,
    description: 'A careful heritage renewal that respects sacred character while bringing renewed spatial clarity and documentation.',
  },
  {
    title: 'Lohia Residence',
    imageName: 'Lohia Residence by Wanderlust Architects',
    projectType: 'Luxury Residence',
    location: 'Jaipur, Rajasthan',
    area: '4,500 sq.ft',
    year: 2024,
    description: 'A contemporary residence organised around comfort, privacy, and a refined domestic rhythm.',
  },
  {
    title: 'Neo Classical Salon',
    imageName: 'Neo Classiscal Salon by Wanderlust Architects',
    projectType: 'Salon Interior Design',
    location: 'Jaipur, Rajasthan',
    area: '2,400 sq.ft',
    year: 2023,
    description: 'A salon interior with classical cues, softened light, and a composed guest journey.',
  },
  {
    title: 'Luxury Penthouse',
    imageName: 'The Luxury Penthouse by Wanderlust Architects',
    projectType: 'Penthouse Interior Design',
    location: 'Jaipur',
    area: '5,800 sq.ft',
    year: 2024,
    description: 'An elevated penthouse interior crafted for panoramic living, quiet luxury, and fluid entertaining.',
  },
  {
    title: 'Pharmaceutical Corporate Office',
    imageName: 'Luxury Office for Pharmaceutical Company by Wanderlust Architects',
    projectType: 'Corporate Office Interior',
    location: 'India',
    area: '7,200 sq.ft',
    year: 2023,
    description: 'A pharmaceutical office interior designed for precision, professionalism, and calm everyday usability.',
  },
  {
    title: 'Ambrosia Restaurant',
    imageName: 'Ambrosia by Wanderlust Architects',
    projectType: 'Restaurant Interior Design',
    location: 'India',
    area: '3,200 sq.ft',
    year: 2022,
    description: 'A restaurant setting that blends atmospheric dining with a warm, tactile spatial character.',
  },
  {
    title: 'Anjuna Villa',
    imageName: 'Anjuna Villa by Wanderlust Architects',
    projectType: 'Luxury Villa Architecture',
    location: 'Goa',
    area: '6,800 sq.ft',
    year: 2024,
    description: 'A Goa villa that pairs open leisure living with coastal light, privacy, and understated resort sensibility.',
  },
  {
    title: 'Maharaja Garden',
    imageName: 'Maharaja Garden by Wanderlust Architects',
    projectType: 'Wedding Garden / Hospitality',
    location: 'India',
    area: '15,000 sq.ft',
    year: 2023,
    description: 'A wedding garden planned for ceremonial flow, layered hospitality, and memorable arrival experiences.',
  },
  {
    title: 'Manpura Farmhouse',
    imageName: 'Manpura Farmhouse by Wanderlust Architects',
    projectType: 'Farmhouse Architecture',
    location: 'Rajasthan',
    area: '7,600 sq.ft',
    year: 2024,
    description: 'A farmhouse retreat grounded in openness, landscape connection, and relaxed luxury.',
  },
  {
    title: 'Spacious Outhouse Jaipur',
    imageName: 'Spacious Outhouse in Jaipur by Wanderlust Architects',
    projectType: 'Residential Outhouse Design',
    location: 'Jaipur',
    area: '3,900 sq.ft',
    year: 2023,
    description: 'An outhouse concept with airy living zones, seamless indoor-outdoor movement, and intimate hospitality.',
  },
  {
    title: 'Propex Office',
    imageName: 'A Tiny Luxury Office Propex by Wanderlust Architects',
    projectType: 'Small Office Interior Design',
    location: 'India',
    area: '1,450 sq.ft',
    year: 2022,
    description: 'A compact office fitted with luxury detailing, efficient planning, and a calm executive tone.',
  },
  {
    title: 'Pratima Showroom',
    imageName: 'Pratima Showroom by Wanderlust Architects',
    projectType: 'Retail Showroom Interior',
    location: 'India',
    area: '2,900 sq.ft',
    year: 2023,
    description: 'A retail showroom designed to frame product display through clarity, material restraint, and visual rhythm.',
  },
  {
    title: 'Hoztel Jollygrant',
    imageName: 'Hozetel Jollygrant by Wanderlust Architects',
    projectType: 'Hostel Architecture',
    location: 'Uttarakhand',
    area: '11,600 sq.ft',
    year: 2024,
    description: 'A hostel architecture project that balances social energy, efficient circulation, and a strong sense of place.',
  },
  {
    title: 'Hoztel Jaipur',
    imageName: 'A Backpacker Jaipur Hoztel by Wanderlust Architects',
    projectType: 'Hostel Interior & Architecture',
    location: 'Jaipur',
    area: '8,400 sq.ft',
    year: 2023,
    description: 'A backpacker hostel in Jaipur with community-led interiors, layered experience, and practical comfort.',
  },
  {
    title: 'Outstay in Woods',
    imageName: 'A Outstay in Woods by Wanderlust Architects',
    projectType: 'Eco Retreat Architecture',
    location: 'India',
    area: '5,200 sq.ft',
    year: 2024,
    description: 'An eco retreat composed to feel quiet, immersive, and closely tied to its woodland context.',
  },
  {
    title: 'Serene Cottages',
    imageName: 'Serene Cottages by Wanderlust Architects',
    projectType: 'Resort Cottage Architecture',
    location: 'India',
    area: '9,800 sq.ft',
    year: 2023,
    description: 'A cottage cluster envisioned as a serene hospitality escape with tactile materials and restful scale.',
  },
];

function inferCategory(projectType: string): ProjectCategory {
  const type = projectType.toLowerCase();

  if (type.includes('heritage') || type.includes('temple')) {
    return 'Heritage';
  }

  if (
    type.includes('resort') ||
    type.includes('banquet') ||
    type.includes('wedding') ||
    type.includes('hostel') ||
    type.includes('retreat') ||
    type.includes('restaurant') ||
    type.includes('cottage')
  ) {
    return 'Hospitality';
  }

  if (
    type.includes('residence') ||
    type.includes('villa') ||
    type.includes('farmhouse') ||
    type.includes('penthouse') ||
    type.includes('outhouse')
  ) {
    return 'Residential';
  }

  return 'Commercial';
}

function buildImagePath(imageName: string) {
  const folder = encodeURIComponent(imageName);
  const file = encodeURIComponent(`${imageName}.jpg`);
  return `/project-media/${folder}/${file}`;
}

function buildSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const projectCategories: ProjectFilter[] = [
  'All',
  'Hospitality',
  'Residential',
  'Commercial',
  'Heritage',
];

export const projects: ProjectRecord[] = rawProjects.map((project, index) => ({
  id: index + 1,
  slug: buildSlug(project.title),
  title: project.title,
  imageName: project.imageName,
  category: inferCategory(project.projectType),
  projectType: project.projectType,
  location: project.location,
  area: project.area,
  year: project.year,
  description: project.description,
  studio: studioName,
  image: buildImagePath(project.imageName),
  summary: project.description,
  sections: sharedSections,
}));

export function getProjectById(id: number) {
  return projects.find((project) => project.id === id);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
