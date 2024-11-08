export type Review = {
  id: string;
  date: string;
  user: {
      name: string;
      isPro: boolean;
      avatarUrl: string;
      };
  text: string;
  starsCount: number;
};

export type Reviews = Review[];
