export const homeBlocks = [
  {
    name: 'hero' as 'hero',
    style: { paddingTop: 0 },
    fieldValues: {
      title: 'Op een verantwoorde manier gemaakt kleding, gewoon in Nederland',
      description:
        'Samen gaan we voor een betere toekomst voor de kleding-industrie, dit doen we op een verantwoorde manier. Door te produceren in Nederland en samen te werken met mensen met een vluchtelingen achtergrond proberen wij een positief effect te hebben op klimaat, mens en economie.',
      image: { src: '/images/home.jpg', width: 510, height: 852 },
      video: {
        src: 'https://storage.googleapis.com/cms_upload_bucket/Physis%20FIN_V2_GROEN_Logo.mp4',
        width: 510,
        height: 852,
      },
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b90',
  },
  {
    name: 'content' as 'content',
    fieldValues: {
      title: 'Een jong atelier met jaren aan ervaring',
      description:
        'Ons team bestaat uit getalenteerde kledingmakers die stuk-voor-stuk tientallen jaren aan ervaring hebben in de kledingindustrie. Samen met de rest van onze vakmensen werken we als één team om de mooiste kledingstukken te vervaardigen en stimuleren wij zo een transparante fashion industry.',
      image: { src: '/images/content-home.png', width: 380, height: 479 },
      button: { href: '/', title: 'Over ons' },
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b92',
  },
  {
    name: 'content' as 'content',
    className: 'max-md:hidden',
    fieldValues: {
      variant: 'heading',
      title: (
        <>
          Hoe maken wij <span style={{ color: '#64BD6E' }}>verantwoorde</span>{' '}
          kleding
        </>
      ),
      description:
        'In ons atelier kunt u uw eigen unieke pasvorm creëren of een product uit onze Physis-lijn kiezen. Deze lijn bestaat uit door ons geperfectioneerde pasvormen in verschillende producten zoals T-shirts, Hoodies, Sweaters en Sweatpants. Uw eigen pasvorm kunt u creëren samen met één van onze vakmensen tijdens een sample dag of via een sample traject.',
      button: { href: '/', title: 'Onze werkwijze' },
      headingTextAlign: 'right',
      headingMaxWidth: 320,
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b9223',
  },
  {
    name: 'banner' as 'banner',
    fieldValues: {
      offset: true,
      dashes: true,
      title:
        'Tijdens een sampledag krijgt je de mogelijkheid om een geheel eigen pasvorm te ontwikkelen',
      button: { href: '/', title: 'Meer weten' },
      image: { src: '/images/stoffen-rol.png', width: 580, height: 329 },
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b924',
  },
  {
    name: 'content' as 'content',
    fieldValues: {
      variant: 'slider',
      subtitle: 'Onze portfolio',
      title:
        'We hebben door de jaren heen al vele kledinglijnen opgezet en daar zijn we dan ook erg trots op, we laten je het graag zien.',
      button: { href: '/', title: 'Bekijk portfolio' },
      images: [
        { src: '/images/slider1.png', width: 280, height: 367 },
        { src: '/images/slider2.png', width: 310, height: 487 },
      ],
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b923',
  },
  {
    name: 'accordion' as 'accordion',
    fieldValues: {
      title: 'Welke diensten bieden wij aan',
      button: { href: '/', title: 'Onze diensten' },
      list: [
        {
          title: 'Samples maken',
          description:
            'In ons atelier kunt u uw eigen unieke pasvorm creëren of een product uit onze Physis-lijn kiezen. Deze lijn bestaat uit door ons geperfectioneerde pasvormen in verschillende producten zoals T-shirts, Hoodies, Sweaters en Sweatpants. Uw eigen pasvorm kunt u creëren samen met één van onze vakmensen tijdens een sample dag of via een sample traject.',
        },
        {
          title: 'Patronen',
          description:
            'In ons atelier kunt u uw eigen unieke pasvorm creëren of een product uit onze Physis-lijn kiezen. Deze lijn bestaat uit door ons geperfectioneerde pasvormen in verschillende producten zoals T-shirts, Hoodies, Sweaters en Sweatpants. Uw eigen pasvorm kunt u creëren samen met één van onze vakmensen tijdens een sample dag of via een sample traject.',
        },
        {
          title: 'Productie',
          description:
            'In ons atelier kunt u uw eigen unieke pasvorm creëren of een product uit onze Physis-lijn kiezen. Deze lijn bestaat uit door ons geperfectioneerde pasvormen in verschillende producten zoals T-shirts, Hoodies, Sweaters en Sweatpants. Uw eigen pasvorm kunt u creëren samen met één van onze vakmensen tijdens een sample dag of via een sample traject.',
        },
      ],
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b94',
  },
  {
    name: 'hero' as 'hero',
    fieldValues: {
      variant: 'background-image',
      subtitle: 'Het team',
      title:
        'De mensen die werken in het atelier zijn stuk-voor-stuk getalenteerde kledingmakers.',
      button: { href: '/', title: 'Maak kennis met het team' },
    },
    style: {
      paddingTop: 160,
      paddingBottom: 160,
      backgroundImage: 'url(/images/team.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b9421',
  },
]
