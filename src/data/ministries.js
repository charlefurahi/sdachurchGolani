// src/data/ministries.js

export const ministryCatalog = [
  {
    id: 'youth-ministries',
    name: 'Adventist Youth Ministries',
    slug: 'adventist-youth-ministries',
    description:
      'A ministry dedicated to the spiritual growth, leadership development, service, and fellowship of young people.',
    type: 'ministry',

    // Sub-ministries / youth organizations
    children: [
      {
        id: 'adventist-youth',
        name: 'Adventist Youth',
        slug: 'adventist-youth',
        description:
          'A ministry helping young people grow spiritually, develop leadership skills, and serve the church and community.',
        type: 'sub-ministry',
      },

      {
        id: 'pathfinders',
        name: 'Pathfinders',
        slug: 'pathfinders',
        description:
          'A youth organization providing practical skills, spiritual development, leadership training, and outdoor activities.',
        type: 'sub-ministry',
      },

      {
        id: 'adventurers',
        name: 'Adventurers',
        slug: 'adventurers',
        description:
          'A program designed to help young children develop physically, mentally, socially, and spiritually.',
        type: 'sub-ministry',
      },

      {
        id: 'ambassadors',
        name: 'Ambassadors',
        slug: 'ambassadors',
        description:
          'A ministry supporting the spiritual and social development of older teenagers and young adults.',
        type: 'sub-ministry',
      },

      {
        id: 'master-guide',
        name: 'Master Guide',
        slug: 'master-guide',
        description:
          'A leadership development program preparing individuals to serve and lead in youth ministries.',
        type: 'sub-ministry',
      },
    ],
  },

  {
    id: 'childrens-ministries',
    name: "Children's Ministries",
    slug: 'childrens-ministries',
    description:
      'Supporting children in their spiritual growth and helping them develop a meaningful relationship with Jesus.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'womens-ministries',
    name: "Women's Ministries",
    slug: 'womens-ministries',
    description:
      'Supporting women in spiritual growth, fellowship, leadership, service, and community outreach.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'mens-ministries',
    name: "Men's Ministries",
    slug: 'mens-ministries',
    description:
      'Encouraging men to grow spiritually, strengthen families, and serve the church and community.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'family-ministries',
    name: 'Family Ministries',
    slug: 'family-ministries',
    description:
      'Strengthening families through biblical principles, education, fellowship, and practical support.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'sabbath-school',
    name: 'Sabbath School',
    slug: 'sabbath-school',
    description:
      'Providing Bible study, fellowship, discipleship, and spiritual development for church members and visitors.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'personal-ministries',
    name: 'Personal Ministries',
    slug: 'personal-ministries',
    description:
      'Equipping church members to share the gospel and participate in personal and community evangelism.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'communication',
    name: 'Communication',
    slug: 'communication',
    description:
      'Sharing the church message and activities through effective communication and media.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'health-ministries',
    name: 'Health Ministries',
    slug: 'health-ministries',
    description:
      'Promoting healthy living and holistic wellbeing through education, outreach, and practical programs.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'education',
    name: 'Education',
    slug: 'education',
    description:
      'Supporting Christian education and lifelong learning within the church and community.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'stewardship',
    name: 'Stewardship',
    slug: 'stewardship',
    description:
      'Encouraging faithful management of time, talents, resources, and opportunities entrusted by God.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'music',
    name: 'Music',
    slug: 'music',
    description:
      'Supporting worship and evangelism through music and musical ministries.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'publishing',
    name: 'Publishing',
    slug: 'publishing',
    description:
      'Supporting the distribution and use of Christian literature for ministry and evangelism.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'religious-liberty',
    name: 'Religious Liberty',
    slug: 'religious-liberty',
    description:
      'Promoting freedom of religion and conscience while supporting the church mission.',
    type: 'ministry',
    children: [],
  },

  {
    id: 'possibility-ministries',
    name: 'Adventist Possibility Ministries',
    slug: 'adventist-possibility-ministries',
    description:
      'Creating opportunities for people of all abilities to participate fully in church life and ministry.',
    type: 'ministry',
    children: [],
  },
]


// Optional fallback leaders for development/demo mode
export const ministryFallbackLeaders = [
  'Church Leader',
  'Ministry Leader',
  'Department Leader',
]