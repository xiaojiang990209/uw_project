export const menu_options = [
  {
    name: 'Course',
    nested: [
      {
        route: '/course',
        name: 'Find courses'
      },
      {
        private: true,
        route: '/course/favourite',
        name: 'Favourite courses'
      }
    ]
  },
  {
    name: 'Matchable',
    private: true,
    nested: [
      {
        private: true,
        route: '/matchable/join',
        name: 'Join a group'
      },
      {
        private: true,
        route: '/matchable/create',
        name: 'Create a group'
      }
    ]
  },
  {
    route: '/carpool',
    name: 'Carpool'
  },
  {
    route: '/housing',
    name: 'Housing'
  },
  {
    name: 'Other',
    nested: [
      {
        route: '/news',
        name: 'News'
      },
      {
        route: '/infosession',
        name: 'Info Session'
      }
    ]
  }
];
