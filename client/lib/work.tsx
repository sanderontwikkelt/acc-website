export const workBlocks = [
  {
    name: 'hero' as 'hero',
    fieldValues: {
      variant: 'background-image',
      title: 'Hoe werken wij',
      description:
        'Door te produceren in Nederland en samen te werken met mensen met een vluchtelingen achtergrond proberen wij een positief effect te hebben op klimaat, mens en economie. De mensen die werken in het atelier zijn stuk-voor-stuk getalenteerde kledingmakers.',
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
  {
    name: 'steps' as 'steps',
    style: {
      paddingTop: 0,
    },
    maxWidth: 1044,
    fieldValues: {
      items: [
        {
          title: 'Kennismaking',
          description:
            'Wij nodigen je graag uit voor een kopje koffie in ons atelier om elkaar beter te leren kennen en geheel vrijblijvend uw wensen te bespreken. Tijdens dit kennismakingsgesprek geven wij adviezen over stofkeuze, designs en bedrukkingen en bespreken we wat we voor u kunnen betekenen. Vanuit dit gesprek kunt u een opdracht plaatsen voor het maken van een sample of plant u een datum in voor een sample dag.',
        },
        {
          title: 'Sample Process',
          description:
            'Voordat u een order plaatst maken wij altijd eerst een sample die als voorbeeld dient en één op één wordt na-gemaakt tijdens de productie. Voor het maakproces van dit sample heeft u twee opties; het opsturen van een fysiek voorbeeld of tekening waaruit wij het ontwerp voor de patronen kunnen afleiden of het inplannen van een sample dag. Voor het opsturen van de door ons gemaakte sample rekenen wij zo’n twee tot vier weken. Het inplannen van een sample dag kan meestal binnen een maand, tijdens deze dag kunnen wij meerdere producten voor u samplen.',
          button: {
            href: '/sample-dag',
            title: 'Meer weten over de sampledag',
            mobile: { title: 'Meer weten' },
          },
        },
        {
          title: 'Offerte maken',
          description:
            'De offerte wordt gestuurd naar aanleiding van het goedkeuren van de samples. Wij maken een offerte op basis van de gekozen stoffen, oplage, afwerkingen en eventuele opdruk/borduring. Als u de offerte heeft geaccepteerd sturen wij een factuur voor de aanbetaling van de stoffen en gaan we door naar het inplannen van de productie.',
        },
        {
          title: 'Productie',
          description: `De productie begint! We houden u op de hoogte door middel van filmpjes en foto’s van het algehele proces. Als de producten klaar zijn wordt de factuur verstuurd en mag u de kleding ophalen of wij versturen deze naar u.

          Gemiddeld genomen rekenen wij zo’n vier tot zes weken vanaf de aanbetaling van de stoffen tot de productie kan starten. De productie wordt ingepland in overleg en de levertijd is afhankelijk van de oplage, de stoffen en afwerkingen. Om u een beetje een beeld te geven van de geschatte productie tijd; wij naaien zo’n 100 T-shirts per dag.`,
        },
      ],
    },
    id: '649f62a0-9ae7-48f1-89e1-0971df09d46b924',
  },
  {
    name: 'banner' as 'banner',
    fieldValues: {
      button: { href: '/', title: 'Meer weten' },
      title:
        'Tijdens een sampledag krijgt je de mogelijkheid om een geheel eigen pasvorm te ontwikkelen',
      image: { src: '/images/stoffen-rol.png', width: 580, height: 329 },
    },
    id: '649f62a0-9ae7-48f1-89e1-097109d46b924',
  },
]
