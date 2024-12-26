export type Review = {
  id: string;
  date: string;
  user: {
      name: string;
      isPro: boolean;
      avatarUrl: string;
      };
  comment: string;
  rating: number;
};

export type Reviews = Review[];
