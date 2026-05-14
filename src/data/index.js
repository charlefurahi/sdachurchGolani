// ========================
// EVENTS
// ========================
export const events = [
  {
    id: 1,
    title: 'Week of Prayer & Fasting',
    date: '2024-11-18',
    endDate: '2024-11-24',
    time: '06:00 AM',
    location: 'Main Sanctuary',
    category: 'Spiritual',
    description: 'Join us for our annual Week of Prayer and Fasting. Each morning we gather for intercessory prayer, Scripture study, and seeking God\'s face for our church, families, and community. Themed: "Revive Us, O Lord."',
    image: '/assets/events/week-of-prayer.jpg',
    featured: true,
    capacity: 500,
    registered: 312,
    tags: ['prayer', 'fasting', 'spiritual growth'],
    organizer: 'Spiritual Growth Ministry',
    contact: 'prayer@golanisda.org'
  },
  {
    id: 2,
    title: 'Pathfinder Rally 2024',
    date: '2024-12-07',
    endDate: '2024-12-08',
    time: '08:00 AM',
    location: 'Church Grounds & Community Hall',
    category: 'Youth',
    description: 'Our annual Pathfinder Rally brings together young Adventists for honor campaigns, drills, campfire devotion, and team building. All Pathfinders ages 10-15 are welcome!',
    image: '/assets/events/pathfinder-rally.jpg',
    featured: true,
    capacity: 200,
    registered: 147,
    tags: ['pathfinders', 'youth', 'scouting', 'community'],
    organizer: 'Pathfinder Ministry',
    contact: 'pathfinders@golanisda.org'
  },
  {
    id: 3,
    title: 'Community Health Fair',
    date: '2024-12-14',
    time: '09:00 AM',
    location: 'Church Compound',
    category: 'Community Outreach',
    description: 'Free health screenings, nutrition seminars, cooking demonstrations, and health literature distribution for our community. All are welcome!',
    image: '/assets/events/health-fair.jpg',
    featured: false,
    capacity: 300,
    registered: 89,
    tags: ['health', 'community', 'outreach', 'wellness'],
    organizer: 'Health & Temperance Ministry',
    contact: 'health@golanisda.org'
  },
  {
    id: 4,
    title: 'Christmas Cantata Concert',
    date: '2024-12-21',
    time: '05:00 PM',
    location: 'Main Sanctuary',
    category: 'Worship',
    description: 'The GolaniSDA Choir presents their annual Christmas Cantata — a musical celebration of the birth of Jesus Christ. Featuring choral anthems, soloists, and orchestral accompaniment.',
    image: '/assets/events/christmas-cantata.jpg',
    featured: true,
    capacity: 450,
    registered: 276,
    tags: ['choir', 'christmas', 'worship', 'music'],
    organizer: 'Music Ministry',
    contact: 'music@golanisda.org'
  },
  {
    id: 5,
    title: 'Baptism Service — Quarter 4',
    date: '2024-12-28',
    time: '10:30 AM',
    location: 'Main Sanctuary — Baptismal Pool',
    category: 'Spiritual',
    description: 'Witness and celebrate as our new brothers and sisters in Christ take the step of baptism. A joyous occasion of commitment and new beginnings.',
    image: '/assets/events/baptism.jpg',
    featured: false,
    capacity: 500,
    registered: 450,
    tags: ['baptism', 'commitment', 'worship'],
    organizer: 'Church Board',
    contact: 'info@golanisda.org'
  },
  {
    id: 6,
    title: 'Marriage Enrichment Seminar',
    date: '2025-01-11',
    time: '09:00 AM',
    location: 'Fellowship Hall',
    category: 'Family',
    description: 'A two-day seminar for married couples on building Christ-centered, flourishing marriages. Topics: communication, intimacy, conflict resolution, and faith together.',
    image: '/assets/events/marriage-seminar.jpg',
    featured: false,
    capacity: 80,
    registered: 42,
    tags: ['marriage', 'family', 'relationships', 'seminar'],
    organizer: 'Family Ministries',
    contact: 'family@golanisda.org'
  }
]

export const eventCategories = ['All', 'Spiritual', 'Youth', 'Community Outreach', 'Worship', 'Family', 'Education']

// ========================
// ANNOUNCEMENTS
// ========================
export const announcements = [
  {
    id: 1,
    title: 'Church Budget Review — Members\' Meeting',
    date: '2024-11-10',
    category: 'Administrative',
    summary: 'All church members are invited to the quarterly budget review meeting scheduled for Sabbath, November 16, after the afternoon service.',
    body: 'The Church Board invites all members to the Quarterly Financial Review Meeting. Agenda items include: 2024 budget performance, 2025 budget proposal, capital projects update, and Q&A session. Light refreshments will be served. Your participation as a church member is vital to our collective stewardship.',
    image: '/assets/banners/announcement-1.jpg',
    isPinned: true,
    isUrgent: false,
    attachments: [{ name: 'Budget Summary Q3 2024.pdf', url: '#' }]
  },
  {
    id: 2,
    title: 'Tithe & Offerings — Mobile Money Details',
    date: '2024-11-08',
    category: 'Finance',
    summary: 'For your convenience, tithe and offerings can now be sent via M-Pesa Paybill. See details below.',
    body: 'We are pleased to announce that members can now contribute their tithe and offerings digitally via M-Pesa. Paybill Number: 400200. Account: Your Full Name. For local church projects: use Account "Golani Local". For questions, contact our church treasurer at treasurer@golanisda.org.',
    image: null,
    isPinned: true,
    isUrgent: false,
    attachments: []
  },
  {
    id: 3,
    title: 'Urgent: Compassion Fund — Family in Need',
    date: '2024-11-07',
    category: 'Compassion',
    summary: 'The Dorcas Society is raising funds to support a church family who lost their home in a fire. Please give generously.',
    body: 'Our church family, the Kiprono family, recently experienced a devastating house fire. By God\'s grace, no lives were lost but they have lost all their belongings. The Dorcas Society is coordinating relief efforts. Monetary donations, household items, and clothing (sizes for 2 adults and 3 children) are being collected. Please see Sister Grace Wambui for coordination.',
    image: '/assets/banners/announcement-compassion.jpg',
    isPinned: false,
    isUrgent: true,
    attachments: []
  },
  {
    id: 4,
    title: 'Adventist Youth Investiture — Nominations Open',
    date: '2024-11-05',
    category: 'Youth',
    summary: 'AY leadership nominations are open for the 2025 term. Nominate godly young people for servant leadership.',
    body: 'The Nominating Committee is accepting nominations for the Adventist Youth Society leadership for the 2025 term. Positions include President, Vice President, Secretary, Treasurer, and Activity Leader. Nominees must be baptized members aged 18-35 in regular standing. Submission deadline: November 30, 2024.',
    image: null,
    isPinned: false,
    isUrgent: false,
    attachments: [{ name: 'Nomination Form.pdf', url: '#' }]
  }
]

export const announcementCategories = ['All', 'Administrative', 'Finance', 'Compassion', 'Youth', 'Events', 'Community']

// ========================
// GALLERY ALBUMS
// ========================
export const galleryAlbums = [
  {
    id: 1,
    title: 'Baptism Service — September 2024',
    date: '2024-09-28',
    coverImage: '/assets/gallery/baptism-cover.jpg',
    photoCount: 48,
    description: 'Celebrating 12 new members who joined the family of God through baptism.',
    photos: [
      { id: 1, url: '/assets/gallery/baptism-1.jpg', caption: 'Baptism candidates in white' },
      { id: 2, url: '/assets/gallery/baptism-2.jpg', caption: 'Baptism ceremony' },
      { id: 3, url: '/assets/gallery/baptism-3.jpg', caption: 'Congregation in celebration' }
    ]
  },
  {
    id: 2,
    title: 'Pathfinder Day 2024',
    date: '2024-10-15',
    coverImage: '/assets/gallery/pathfinder-cover.jpg',
    photoCount: 72,
    description: 'Our Pathfinders presented their honors and participated in the annual club parade.',
    photos: [
      { id: 1, url: '/assets/gallery/pathfinder-1.jpg', caption: 'Pathfinder drill team' },
      { id: 2, url: '/assets/gallery/pathfinder-2.jpg', caption: 'Honor presentations' }
    ]
  },
  {
    id: 3,
    title: 'Community Outreach — October 2024',
    date: '2024-10-20',
    coverImage: '/assets/gallery/outreach-cover.jpg',
    photoCount: 35,
    description: 'Feeding the hungry, sharing the Word, and serving our neighbors in love.',
    photos: [
      { id: 1, url: '/assets/gallery/outreach-1.jpg', caption: 'Food distribution' },
      { id: 2, url: '/assets/gallery/outreach-2.jpg', caption: 'Health screening' }
    ]
  },
  {
    id: 4,
    title: 'Choir & Music Ministry',
    date: '2024-11-01',
    coverImage: '/assets/gallery/choir-cover.jpg',
    photoCount: 28,
    description: 'Our dedicated choir ministering through song and praise.',
    photos: [
      { id: 1, url: '/assets/gallery/choir-1.jpg', caption: 'Choir in worship' }
    ]
  }
]

// ========================
// MINISTRIES
// ========================
export const ministries = [
  {
    id: 1,
    name: 'Adventist Youth (AY)',
    icon: '🌟',
    description: 'Empowering young adults aged 15-35 to grow in faith, leadership, and service.',
    leader: 'Bro. Kevin Mutuku',
    meetingTime: 'Saturdays, 4:30 PM',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    name: 'Pathfinder Club',
    icon: '⛺',
    description: 'Building Christian character in children ages 10-15 through honor learning and outdoor activities.',
    leader: 'Sis. Florence Achieng',
    meetingTime: 'Sundays, 2:00 PM',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 3,
    name: 'Dorcas Society',
    icon: '🤝',
    description: 'Serving the community through compassionate ministry — food, clothing, and care for the vulnerable.',
    leader: 'Sis. Grace Wambui',
    meetingTime: 'Thursdays, 3:00 PM',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 4,
    name: 'Music Ministry',
    icon: '🎵',
    description: 'Lifting hearts to God through choir, instruments, and worship leading every Sabbath.',
    leader: 'Bro. Charles Njoroge',
    meetingTime: 'Thursdays, 6:00 PM',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 5,
    name: 'Health & Temperance',
    icon: '💚',
    description: 'Teaching the 8 laws of health and NEWSTART principles for whole-person wellness.',
    leader: 'Dr. Ruth Kimani',
    meetingTime: 'Sabbath Health Talks',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 6,
    name: 'Family Ministries',
    icon: '👨‍👩‍👧‍👦',
    description: 'Strengthening marriages, parenting, and family relationships on the foundation of Christ.',
    leader: 'Elder & Mrs. Maina',
    meetingTime: 'Monthly Retreats',
    color: 'from-orange-400 to-orange-600'
  }
]

// ========================
// LEADERSHIP TEAM
// ========================
export const leadership = [
  {
    id: 1,
    name: 'Pastor Emmanuel Golani',
    title: 'Senior Pastor',
    bio: 'Pastor Emmanuel has served the Golani SDA Church for 12 years. He holds an M.Div from Adventist University of Africa and is passionate about evangelism, expository preaching, and community transformation.',
    image: '/assets/pastors/pastor-main.jpg',
    email: 'pastor@golanisda.org',
    phone: '+254 700 000 001',
    social: { facebook: '#', twitter: '#' }
  },
  {
    id: 2,
    name: 'Elder David Mwaura',
    title: 'Head Elder',
    bio: 'Elder David leads the church elder board with wisdom and godly character. He coordinates pastoral oversight and church governance.',
    image: '/assets/pastors/elder-1.jpg',
    email: 'elders@golanisda.org',
    phone: '+254 700 000 002',
    social: {}
  },
  {
    id: 3,
    name: 'Elder James Omondi',
    title: 'Second Elder',
    bio: 'Elder James oversees Sabbath School, Bible studies, and new member integration.',
    image: '/assets/pastors/elder-2.jpg',
    email: 'elders@golanisda.org',
    phone: '+254 700 000 003',
    social: {}
  },
  {
    id: 4,
    name: 'Deaconess Sarah Nkirote',
    title: 'Head Deaconess',
    bio: 'Deaconess Sarah leads the deaconesses board, coordinates hospitality, and delivers powerful messages in health ministry.',
    image: '/assets/pastors/deaconess-1.jpg',
    email: 'deaconess@golanisda.org',
    phone: '+254 700 000 004',
    social: {}
  }
]

// ========================
// TESTIMONIALS
// ========================
export const testimonials = [
  {
    id: 1,
    name: 'Margaret Wanjiku',
    role: 'Church Member, 8 years',
    text: 'GolaniSDA gave me a family when I had none. The warmth of the congregation, the powerful preaching, and the Sabbath worship have transformed my walk with God completely.',
    image: '/assets/gallery/testimonial-1.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Samuel Kipchoge',
    role: 'New Convert, Baptized 2023',
    text: 'I came to a Revelation seminar out of curiosity and left with a relationship with Jesus Christ. The Bible studies changed my life. I am forever grateful.',
    image: '/assets/gallery/testimonial-2.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Pastor Miriam Akinyi',
    role: 'Visiting Minister',
    text: 'The GolaniSDA congregation is a shining example of what a Spirit-filled, mission-driven Adventist church looks like. Their love is real and their faith is active.',
    image: '/assets/gallery/testimonial-3.jpg',
    rating: 5
  },
  {
    id: 4,
    name: 'Thomas & Anne Mwangi',
    role: 'Church Family',
    text: 'Family Ministries here transformed our marriage. We attended the enrichment seminar and came out with tools and renewed commitment we didn\'t know we needed.',
    image: '/assets/gallery/testimonial-4.jpg',
    rating: 5
  }
]

// ========================
// DONATION CAMPAIGNS
// ========================
export const donationCampaigns = [
  {
    id: 1,
    title: 'New Sanctuary Building Fund',
    description: 'Help us build a larger, modern sanctuary to accommodate our growing congregation and serve the community better.',
    image: '/assets/banners/donate-sanctuary.jpg',
    goal: 5000000,
    raised: 2847000,
    currency: 'KES',
    deadline: '2025-06-30',
    featured: true,
    category: 'Infrastructure'
  },
  {
    id: 2,
    title: 'Youth Education Scholarship Fund',
    description: 'Support talented young members from our congregation with Adventist education scholarships.',
    image: '/assets/banners/donate-education.jpg',
    goal: 500000,
    raised: 312000,
    currency: 'KES',
    deadline: '2024-12-31',
    featured: true,
    category: 'Education'
  },
  {
    id: 3,
    title: 'Community Food Pantry',
    description: 'Our Dorcas Society feeds over 200 families monthly. Your gift keeps this vital ministry going.',
    image: '/assets/banners/donate-food.jpg',
    goal: 150000,
    raised: 98000,
    currency: 'KES',
    deadline: null,
    featured: false,
    category: 'Compassion'
  }
]

// ========================
// FAQS
// ========================
export const faqs = [
  {
    id: 1,
    question: 'What time are your Sabbath services?',
    answer: 'Our Sabbath School begins at 9:00 AM, followed by Divine Worship Service at 11:00 AM. The Adventist Youth program runs from 4:30 PM.'
  },
  {
    id: 2,
    question: 'Is GolaniSDA affiliated with the official SDA Church?',
    answer: 'Yes, GolaniSDA is a fully affiliated local church under the East Africa Division of the Seventh-day Adventist Church organization.'
  },
  {
    id: 3,
    question: 'How do I become a member?',
    answer: 'We welcome all who wish to join our church family. We offer regular baptismal classes. Please contact our pastor or fill out the contact form to begin your journey.'
  },
  {
    id: 4,
    question: 'Do you have programs for children?',
    answer: 'Yes! We have Cradle Roll (0-4), Kindergarten (5-7), Primary (8-9), Junior (10-11), and Early Teen (12-14) Sabbath School divisions, plus an active Pathfinder Club.'
  },
  {
    id: 5,
    question: 'How can I donate or pay tithe?',
    answer: 'Offerings can be given during church service, via M-Pesa (Paybill: 400200), or by bank transfer. Contact our treasurer for details.'
  },
  {
    id: 6,
    question: 'Are sermons available online?',
    answer: 'Yes! All sermons are available on our website under the Sermons section. We also stream live on our YouTube channel and Facebook page.'
  }
]

// ========================
// CHURCH STATISTICS
// ========================
export const churchStats = [
  { label: 'Church Members', value: 847, suffix: '+', icon: '👥' },
  { label: 'Years Established', value: 34, suffix: '', icon: '🏛️' },
  { label: 'Weekly Worshippers', value: 650, suffix: '+', icon: '🙏' },
  { label: 'Active Ministries', value: 12, suffix: '', icon: '✨' },
  { label: 'Baptisms This Year', value: 47, suffix: '', icon: '💧' },
  { label: 'Community Served Monthly', value: 500, suffix: '+', icon: '🤝' }
]

// ========================
// SERMONS
// ========================
export const sermons = [
  {
    id: 1,
    title: 'The Power of Surrendered Prayer',
    speaker: 'Pastor Emmanuel Golani',
    date: '2024-11-09',
    topic: 'Prayer & Faith',
    scripture: 'Matthew 6:9-13',
    description: 'Discover what it truly means to pray "Thy will be done" — a message on total surrender and trust in God\'s perfect plan for our lives.',
    duration: '48:22',
    audioUrl: '/assets/sermons/audio/surrendered-prayer.mp3',
    videoUrl: 'https://youtube.com/watch?v=example1',
    views: 1240,
    downloads: 387,
    featured: true,
    tags: ['prayer', 'faith', 'surrender']
  },
  {
    id: 2,
    title: 'Walking in the Light of the Sabbath',
    speaker: 'Pastor Emmanuel Golani',
    date: '2024-11-02',
    topic: 'Sabbath',
    scripture: 'Isaiah 58:13-14',
    description: 'An exploration of the Sabbath not as a rule to follow, but as a delight to embrace — a sacred gift from a loving Creator.',
    duration: '52:10',
    audioUrl: '/assets/sermons/audio/sabbath-light.mp3',
    videoUrl: 'https://youtube.com/watch?v=example2',
    views: 980,
    downloads: 214,
    featured: false,
    tags: ['sabbath', 'worship', 'rest']
  },
  {
    id: 3,
    title: 'Unshakeable Faith in Uncertain Times',
    speaker: 'Elder David Mwaura',
    date: '2024-10-26',
    topic: 'Faith & Courage',
    scripture: 'Hebrews 11:1-6',
    description: 'A powerful call to anchor our faith in the unchanging character of God, even when the storms of life rage around us.',
    duration: '41:55',
    audioUrl: '/assets/sermons/audio/unshakeable-faith.mp3',
    videoUrl: 'https://youtube.com/watch?v=example3',
    views: 756,
    downloads: 198,
    featured: false,
    tags: ['faith', 'courage', 'trust']
  },
  {
    id: 4,
    title: 'Revive Us, O Lord — Week of Prayer Message',
    speaker: 'Pastor Emmanuel Golani',
    date: '2024-10-19',
    topic: 'Revival & Reformation',
    scripture: 'Psalm 85:6',
    description: 'Opening message for our annual Week of Prayer, calling the congregation to genuine spiritual renewal and reformation of heart.',
    duration: '55:30',
    audioUrl: '/assets/sermons/audio/revive-us.mp3',
    videoUrl: 'https://youtube.com/watch?v=example4',
    views: 1502,
    downloads: 445,
    featured: false,
    tags: ['revival', 'prayer', 'reformation']
  },
  {
    id: 5,
    title: 'The Family God Builds',
    speaker: 'Elder & Mrs. Maina',
    date: '2024-10-12',
    topic: 'Family & Marriage',
    scripture: 'Psalm 127:1',
    description: 'A heartfelt message on building a Christ-centered home — covering love, discipline, grace, and the legacy we leave our children.',
    duration: '44:17',
    audioUrl: '/assets/sermons/audio/family-god-builds.mp3',
    videoUrl: 'https://youtube.com/watch?v=example5',
    views: 634,
    downloads: 172,
    featured: false,
    tags: ['family', 'marriage', 'parenting']
  },
  {
    id: 6,
    title: 'Health: The Temple of the Holy Spirit',
    speaker: 'Dr. Ruth Kimani',
    date: '2024-10-05',
    topic: 'Health & Wholeness',
    scripture: '1 Corinthians 6:19-20',
    description: 'A Sabbath health talk unpacking the biblical basis for whole-person wellness and the NEWSTART principles for vibrant living.',
    duration: '38:44',
    audioUrl: '/assets/sermons/audio/temple-health.mp3',
    videoUrl: 'https://youtube.com/watch?v=example6',
    views: 512,
    downloads: 143,
    featured: false,
    tags: ['health', 'wellness', 'newstart']
  }
]

export const sermonTopics = ['All Topics', 'Prayer & Faith', 'Sabbath', 'Faith & Courage', 'Revival & Reformation', 'Family & Marriage', 'Health & Wholeness', 'Prophecy', 'Evangelism']

export const sermonSpeakers = ['All Speakers', 'Pastor Emmanuel Golani', 'Elder David Mwaura', 'Elder & Mrs. Maina', 'Dr. Ruth Kimani', 'Visiting Speaker']