// Site-wide content. Edit here and every page updates.
// Competition results live in ./competitions.json (kept up to date by scripts/update-competitions.mjs).

export const site = {
  name: 'Leah Neset & Artem Markelov',
  shortName: 'Neset & Markelov',
  url: 'https://nesetmarkelov.com',
  tagline: 'Skate with purpose. Trust the process.',
  description:
    'Official website of Leah Neset and Artem Markelov, U.S. senior ice dancers training in Colorado Springs. 2024 World Junior Champions, 2023 Junior Grand Prix Final Champions and three-time U.S. Junior Champions.',
  location: 'Colorado Springs, Colorado',
};

// Donations on /donate.
// Card payments (plus Apple Pay, Google Pay, Cash App Pay) go through Square — the same account as the
// store. Set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID on the host to turn them on (see README).
// No API keys? Put a Square donation link (where donors type their own amount) in `squareLink` instead.
export const donate = {
  // Venmo username without the @. Shows a "Venmo" button when set.
  venmo: 'artemka',
  // Optional fallback: a Square payment link set to "Donation" (donor enters the amount).
  squareLink: null,
  amounts: [25, 50, 100, 250],
  defaultAmount: 50,
  minAmount: 1,
  maxAmount: 10000,
  description: 'Donation to Leah Neset & Artem Markelov — skating expenses and coaching',
};

export const socials = {
  teamInstagram: { label: 'Instagram', handle: '@neset_markelov.team', url: 'https://www.instagram.com/neset_markelov.team/' },
  facebook: { label: 'Facebook', handle: 'Leah & Artem', url: 'https://www.facebook.com/leahartem.nesetmarkelov/' },
  youtube: { label: 'YouTube', handle: 'Leah Neset & Artem Markelov', url: 'https://www.youtube.com/@leahnesetartemmarkelov4588' },
  leahInstagram: { label: 'Instagram', handle: '@leahneset', url: 'https://www.instagram.com/leahneset/' },
  artemInstagram: { label: 'Instagram', handle: '@artem_markellov', url: 'https://www.instagram.com/artem_markellov/' },
};

// Shown as medal cards under the home page hero.
export const highlights = [
  { title: 'World Junior Champions', detail: '2024 · Taipei', medal: true },
  { title: 'Junior Grand Prix Final Champions', detail: '2023 · Beijing', medal: true },
  { title: '3× U.S. Junior Champions', detail: '2022 · 2023 · 2024', medal: true },
  { title: 'Senior Grand Prix', detail: 'Skate America · France · Canada', medal: false },
];

export const personalBests = [
  { segment: 'Total', score: '179.38', event: 'Skate America 2024' },
  { segment: 'Rhythm Dance', score: '72.48', event: 'Junior Grand Prix Final 2023' },
  { segment: 'Free Dance', score: '109.70', event: 'Skate America 2024' },
];

export const story = [
  'Leah and Artem met through an online ice dance partner search. Artem, then skating in Moscow, saw Leah’s profile and reached out to her coach, Elena Dostatni, about a tryout. In March 2020 he moved from Russia to Colorado Springs — days before borders closed for the COVID-19 pandemic — without speaking English, to begin the partnership.',
  'Three seasons later they were the best junior team in the world. In 2023–24 they went undefeated: wins at Lake Placid, Junior Grand Prix Thailand and Japan, the Junior Grand Prix Final — with a then world junior record rhythm dance of 72.48 — a third straight U.S. junior title, and the World Junior Championships in Taipei.',
  'Since moving up to the senior level in 2024 they have competed on the ISU Grand Prix at Skate America, Grand Prix de France and Skate Canada, and on the Challenger Series around the world. Their goal is to one day represent the United States at the Olympic Winter Games.',
];

export const timeline = [
  { year: '2020', title: 'A partnership begins', text: 'Artem moves from Moscow to Colorado Springs in March to skate with Leah. They finish 6th in their first U.S. Championships together.' },
  { year: '2022', title: 'First national title', text: 'International debut at Lake Placid and on the Junior Grand Prix, then gold at the U.S. Junior Championships.' },
  { year: '2023', title: 'On the world stage', text: 'Second U.S. junior title, Junior Grand Prix bronze in Italy and 5th at the World Junior Championships in Calgary.' },
  { year: '2023', title: 'Junior Grand Prix Final champions', text: 'Wins in Thailand and Japan, then gold at the Final in Beijing with a world junior record rhythm dance.' },
  { year: '2024', title: 'World Junior champions', text: 'An undefeated season ends with a record third U.S. junior title and the World Junior crown in Taipei.' },
  { year: '2024', title: 'Senior debut', text: 'Bronze at the Lombardia Trophy, then a Grand Prix debut at Skate America with a personal best of 179.38.' },
  { year: '2026', title: 'Building the senior career', text: 'A new season on the Grand Prix at Grand Prix de France and Skate America, with an eye on the Olympic dream.' },
];

export const athletes = [
  {
    key: 'leah',
    name: 'Leah Neset',
    photo: '/leah.jpg',
    photoAlt: 'Leah Neset as a young skater',
    instagram: socials.leahInstagram,
    facts: [
      ['Born', 'December 7, 2005'],
      ['Hometown', 'Minot, North Dakota'],
      ['Started skating', 'Age 3'],
      ['Studies', 'Educational Studies, Western Governors University'],
      ['Off the ice', 'Piano, skiing, paddleboarding, wake surfing, baking'],
    ],
    bio: [
      'Leah grew up in Minot, North Dakota, and began skating at age three. Her mom, Cheri, was a figure skater and Leah’s first coach; her dad, Kris, played hockey. She also competed in gymnastics growing up.',
      'In 2018, at age 12, she moved to Colorado Springs with her mom and sister Kylie to train with Elena Dostatni. With her first partner she won silver at the 2019 U.S. Championships, then spent a season passing four gold and six international dance tests while she searched for a new partner.',
      'A graduate of Ignite Christian Academy, Leah now studies special and elementary education at Western Governors University.',
    ],
  },
  {
    key: 'artem',
    name: 'Artem Markelov',
    photo: '/artem.jpg',
    photoAlt: 'Artem Markelov as a young skater',
    instagram: socials.artemInstagram,
    facts: [
      ['Born', 'July 10, 2003'],
      ['Hometown', 'Volzhsky, Russia'],
      ['Started skating', 'Age 9'],
      ['Studies', 'Computer Science, Western Governors University'],
      ['Off the ice', 'Coding, building websites, hiking, biking, soccer, water sports'],
    ],
    bio: [
      'Artem was born in Volzhsky, Russia, and took up skating at nine after a friend’s birthday party at the rink. As a singles skater he learned up to a double Axel and triple loop.',
      'At 15 he moved to Moscow on his own to pursue ice dance and competed one season at the advanced novice level. Looking for a new partner, he found Leah’s profile and contacted her coach — and in March 2020 he moved to Colorado Springs, learning English while training full time.',
      'He finished high school in Russia in 2021, studied at the University of Colorado Colorado Springs, and now studies computer science at Western Governors University. He also built this website.',
    ],
  },
];

export const team = [
  { role: 'Coach', names: 'Elena Dostatni' },
  { role: 'Choreography', names: 'Massimo Scali, Nikolai Morozov, Elena Dostatni' },
  { role: 'Costumes', names: 'Mathieu Caron, Tatiana Kulikova' },
  { role: 'Club', names: 'Magic City Figure Skating Club' },
  { role: 'Training base', names: 'Colorado Springs, Colorado' },
];

export const sponsors = [
  { name: 'MK Blades', url: 'https://www.mkblades.com/', text: 'Precision figure skating blades, trusted by skaters for over a century.' },
  { name: 'SkatesUS', url: 'https://skatesus.com/', text: 'Figure skating boots, blades and expert fitting.' },
  { name: 'Save The Duck', url: 'https://www.savetheduck.com/', text: 'Animal-free outerwear, keeping us warm on and off the ice.' },
];

export const products = [
  { name: 'NM Hoodie', price: '$40', image: '/nm-merch-transparent.png', url: 'https://docs.google.com/forms/d/e/1FAIpQLSd9UzgIyPMst0uqA4h1nfFslhVnPTO2gcch5C6yk-HAnnLPPA/viewform?usp=header', note: 'Black hoodie with the gold “Skate with purpose” logo' },
  { name: 'NM Keychain', price: '$8', image: '/keychain.png', url: 'https://square.link/u/xnjfaMdA', note: 'Team logo keychain' },
  { name: 'NM Pin', price: '$6', image: '/pin.png', url: 'https://square.link/u/dvjmIwfu', note: 'Enamel team logo pin' },
];

// YouTube videos, newest first. Add new ones at the top of the right season.
// `source` is the channel that uploaded it. `geo: true` = official ISU upload, which is blocked in the U.S.
export const videos = [
  {
    season: '2026-2027',
    items: [
      { id: 'OeUyKDYxHwM', title: 'Skate America', segment: 'Rhythm Dance', source: 'Marta Hammond' },
      { id: 'J4tH0RSH_IA', title: 'Nebelhorn Trophy', segment: 'Rhythm Dance', source: 'Figure Skating 22' },
      { id: 'l6gzvjFCKSM', title: 'Nebelhorn Trophy', segment: 'Free Dance', source: 'Figure Skating 22' },
      { id: 'osX3XFxYvR0', title: 'Lake Placid Ice Dance International', segment: 'Free Dance', source: 'Ice dance lover' },
    ],
  },
  {
    season: '2025-2026',
    items: [
      { id: 'ayvOiNIBrRw', title: 'U.S. Championships', segment: 'Free Dance', source: 'U.S. Figure Skating' },
      { id: '3IKyQEBzU8A', title: 'U.S. Championships', segment: 'Rhythm Dance', source: 'U.S. Figure Skating' },
      { id: 'BBlsn30dSmE', title: 'Golden Spin of Zagreb', segment: 'Free Dance', source: 'Figure Skating 22' },
      { id: 'tjHFQkpIy9c', title: 'Golden Spin of Zagreb', segment: 'Rhythm Dance', source: 'Figure Skating 22' },
      { id: 'cSObgp-vDK8', title: 'Denis Ten Memorial Challenge', segment: 'Free Dance', source: 'skating archive' },
      { id: 'Li9PtfI3sU8', title: 'Denis Ten Memorial Challenge', segment: 'Rhythm Dance', source: 'skating archive' },
    ],
  },
  {
    season: '2024-2025',
    items: [
      { id: 'zkReYg7XIWA', title: 'Golden Spin of Zagreb', segment: 'Free Dance', source: 'yeah yo' },
      { id: '3Q7s3VcONOs', title: 'Grand Prix de France', segment: 'Free Dance', source: 'Skating ISU', geo: true },
      { id: 'aWjc3KngZ1I', title: 'Lombardia Trophy', segment: 'Free Dance', source: 'Figure Skating 22' },
      { id: 'Ri1fC-Hr9XU', title: 'Lombardia Trophy', segment: 'Rhythm Dance', source: 'Figure Skating 22' },
    ],
  },
  {
    season: '2023-2024',
    items: [
      { id: 'eVHnn1c5yCU', title: 'World Junior Championships — gold', segment: 'Free Dance', source: 'Skating ISU', geo: true },
      { id: '1fiWKBvX7zI', title: 'World Junior Championships', segment: 'Rhythm Dance', source: 'Skating ISU', geo: true },
      { id: 'Y4eR6hayU1A', title: 'World Junior gold medal moment', segment: 'Highlight', source: 'U.S. Figure Skating' },
      { id: 'QKvrKQIwaKA', title: 'Junior Grand Prix Final — gold', segment: 'Free Dance', source: 'Skating ISU', geo: true },
      { id: 's1J6OeCI7Qg', title: 'Junior Grand Prix Final', segment: 'Rhythm Dance', source: 'Skating ISU', geo: true },
      { id: 'Wi6DTxzMbNw', title: 'Junior Grand Prix Japan', segment: 'Free Dance' },
      { id: 't6mNLvpmwO8', title: 'Junior Grand Prix Japan', segment: 'Rhythm Dance' },
      { id: '4Klnd214Q3c', title: 'Junior Grand Prix Thailand', segment: 'Free Dance' },
      { id: 'CXUPefEITmo', title: 'Junior Grand Prix Thailand', segment: 'Rhythm Dance' },
      { id: 'pV2GkU_RXsE', title: 'Lake Placid Ice Dance International', segment: 'Free Dance' },
      { id: 'YwfNn3J8PDc', title: 'Lake Placid Ice Dance International', segment: 'Rhythm Dance' },
    ],
  },
  {
    season: '2022-2023',
    items: [
      { id: '11qJREsCWtk', title: 'World Junior Championships', segment: 'Free Dance' },
      { id: 'UB7IUqaiO0s', title: 'Bavarian Open', segment: 'Free Dance' },
      { id: 'RDU6RErZdhg', title: 'Bavarian Open', segment: 'Rhythm Dance' },
      { id: 'Ns35LdNJFMI', title: 'Junior Grand Prix Italy', segment: 'Free Dance' },
      { id: '1SSJ9f3PqRA', title: 'Junior Grand Prix Italy', segment: 'Rhythm Dance' },
    ],
  },
  {
    season: '2021-2022',
    items: [
      { id: 'RwTmRjl6OI4', title: 'Junior Grand Prix Poland', segment: 'Free Dance' },
      { id: 'VyWRTNyvEJU', title: 'Junior Grand Prix Poland', segment: 'Rhythm Dance' },
      { id: 'P4p9Z343Dsk', title: 'Junior Grand Prix Russia', segment: 'Free Dance' },
      { id: 'Ud98AGSB1Gg', title: 'Junior Grand Prix Russia', segment: 'Rhythm Dance' },
      { id: '2KaMXuO9GGw', title: 'Lake Placid Ice Dance International', segment: 'Free Dance' },
      { id: 'zDDiSayLG3U', title: 'Lake Placid Ice Dance International', segment: 'Rhythm Dance' },
      { id: 'p4Zb6KzwH-w', title: 'On-ice perspective', segment: 'Free Dance' },
    ],
  },
  {
    season: '2020-2021',
    items: [
      { id: 'GXqUht4h2ig', title: 'U.S. Championships', segment: 'Free Dance' },
      { id: 'vzWKGm_izTo', title: 'U.S. Championships', segment: 'Rhythm Dance' },
    ],
  },
];

// Interviews and features about the team.
export const interviews = [
  { id: 'L1BsuolfOvg', title: 'Chasing the Olympic Dream', segment: 'Podcast', source: 'Church Pew Sports Podcast' },
  { id: 'ZJairtSHET4', title: 'Interview after World Juniors', segment: 'Interview', source: 'Ice Skating International Online' },
];

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/competitions', label: 'Competitions' },
  { href: '/videos', label: 'Videos' },
  { href: '/social', label: 'Social' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/donate', label: 'Support' },
  { href: '/store', label: 'Store' },
];
