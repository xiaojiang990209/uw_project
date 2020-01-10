export const menu_options = [
  {
    name: 'Course',
    nested: [
      {
        route: '/course',
        name: 'Find courses',
      },
      {
        private: true,
        route: '/course/favourite',
        name: 'Favourite courses',
      },
    ],
  },
  {
    name: 'Matchable',
    private: true,
    nested: [
      {
        private: true,
        route: '/matchable/join',
        name: 'Join a group',
      },
      {
        private: true,
        route: '/matchable/create',
        name: 'Create a group',
      },
    ],
  },
  {
    name: 'Carpool',
    nested: [
      {
        route: '/posts/carpool/Waterloo',
        name: 'Waterloo'
      },
    ]
  },
  {
    name: 'Housing',
    nested: [
      {
        route: '/posts/housing/Waterloo',
        name: 'Waterloo'
      },
      {
        route: '/posts/housing/Toronto',
        name: 'Toronto'
      },
    ]
  },
  {
    name: 'Other',
    nested: [
      {
        route: '/news',
        name: 'News',
      },
      {
        route: '/infosession',
        name: 'Info Session',
      },
    ],
  },
];
