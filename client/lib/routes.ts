import { aboutBlocks } from '@/lib/about'
import { contactBlocks } from '@/lib/contact'
import { portfolioBlocks } from '@/lib/portfolio'
import { sampleBlocks } from '@/lib/sample'
import { serviceBlocks } from '@/lib/services'
import { workBlocks } from '@/lib/work'
import { WEB_URL } from './constants'
import { homeBlocks } from './home'

export const routes = {
  home: {
    blocks: homeBlocks,
    updatedAt: new Date(),
    priority: 1,
    images: [{ url: WEB_URL + '/images/home.jpg', width: 510, height: 852 }],
    title:
      'Physis: Verantwoorde Nederlandse Kledingproductie | Ervaren Atelier & Vakmanschap',
    description:
      'Geproduceerd in Nederland met vakmensen met een vluchtelingenachtergrond. Ontdek onze transparante aanpak in de fashion industry, unieke kledinglijnen en diensten zoals het maken van samples en productie. Samen voor een positieve impact op klimaat, mens en economie.',
  },
  portfolio: {
    blocks: portfolioBlocks,
    updatedAt: new Date(),
    priority: 1,
    images: [{ url: WEB_URL + '/images/home.jpg', width: 510, height: 852 }],
    title:
      'Physis Portfolio | Geproduceerd in Nederland met Zorg en Vakmanschap',
    description:
      'Ontdek het portfolio van Physis en bekijk de kleding die we met trots hebben gemaakt. Als een toonaangevend Nederlands merk, produceren we in nauwe samenwerking met getalenteerde kledingmakers met een vluchtelingenachtergrond. Onze passie ligt in het bijdragen aan een betere toekomst voor zowel de mode-industrie als de gemeenschap.',
  },
  'sample-dag': {
    blocks: sampleBlocks,
    updatedAt: new Date(),
    priority: 1,
    title:
      'Physis Sampledag | Ervaar het Maakproces van Uw Unieke Kledingstuk',
    description:
      'Sluit u aan bij de sampledag van Physis en creëer uw eigen pasvorm voor het door u gekozen product. Volg het gehele proces, van patroontekening tot het doorpassen, en ga naar huis met gepersonaliseerde samples. Ontdek de vakmanschap en passie waarmee elk stuk wordt gemaakt en ervaar het plezier van het zien ontstaan van uw eigen kledingontwerp.',
  },
  'hoe-wij-werken': {
    blocks: workBlocks,
    updatedAt: new Date(),
    priority: 1,
    title: `Physis's Aanpak | Ons Maakproces & Samenwerking met Getalenteerde Vluchtelingen`,
    description:
      'Bij Physis geloven we in duurzame productie met een positief effect op mens, klimaat en economie. Ontdek hoe we in Nederland produceren, samenwerken met getalenteerde kledingmakers met een vluchtelingenachtergrond en hoe u deel kunt uitmaken van dit unieke proces van kennismaking tot productie.',
  },
  'over-ons': {
    blocks: aboutBlocks,
    updatedAt: new Date(),
    priority: 1,
    title:
      'Over Physis | Verantwoorde Kledingmakerij in Nederland & Ons Team',
    description: `Ontdek het verhaal achter Physis: een kledingmakerij die zich inzet voor een duurzamere mode-industrie. Trots geproduceerd in Nederland en ondersteund door een team van getalenteerde vakmensen met een vluchtelingenachtergrond. Leer meer over onze toegewijde 'familie' en hoe wij bijdragen aan klimaat, mens en economie.`,
  },
  diensten: {
    blocks: serviceBlocks,
    updatedAt: new Date(),
    priority: 1,
    title: 'Physis Diensten | Volledig Kledingproductie Proces in Nederland',
    description:
      'Bij Physis bieden we een scala aan diensten, van design tot productie, waarbij we trots samenwerken met getalenteerde kledingmakers met een vluchtelingenachtergrond. Ontdek hoe wij in Nederland produceren en hoe wij streven naar een positieve impact op klimaat, mens en economie.',
  },
  contact: {
    blocks: contactBlocks,
    updatedAt: new Date(),
    priority: 0.8,
    title: 'Neem Contact Op met Physis | We Horen Graag van U!',
    description:
      'Heeft u vragen, opmerkingen of wilt u meer weten over onze productieprocessen bij Physis? Neem vandaag nog contact met ons op en ons toegewijde team staat klaar om u te helpen.',
  },
}
