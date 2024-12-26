import { City } from './city';
import {Location} from './location';

export type FullOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  images: string[];
  maxAdults: number;
};

export type FullOffers = FullOffer[];
