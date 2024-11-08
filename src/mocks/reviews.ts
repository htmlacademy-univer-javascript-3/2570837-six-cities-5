import { Reviews } from '../types/review';

export const reviews: Reviews = [
  {
    id: 1,
    date: '2024-09-09T18:00:07.0Z',
    user: {
      name: 'Max',
      isPro: false,
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/3.jpg',
    },
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    starsCount: 4,
  },
  {
    id: 2,
    date: '2024-10-02T09:30:15.0Z',
    user: {
      name: 'Max',
      isPro: false,
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/3.jpg',
    },
    text: 'A charming place surrounded by cobblestone streets and historic architecture. The atmosphere feels warm and inviting, and the view over the old city rooftops is breathtaking.',
    starsCount: 3,
  }
];
