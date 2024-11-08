import { City } from './city';
import {Location} from './location';

export type FullOffer = {
  id: string;
  title: string;
  price: number;
  type: string;
  city: City;
  location: Location;
  isPremium: boolean;
  starsCount: number;
  isBookmarked: boolean;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  descriptions: string[];
  images: string[];
};

export type FullOffers = FullOffer[];
