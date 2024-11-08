import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from '@components/app/app';
import {Settings} from './const';
import { offers } from './mocks/offers';
import { fullOffers } from './mocks/fullOffers';
import { reviews } from './mocks/reviews';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCount={Settings.PlacesCount}
      offers={offers}
      fullOffers={fullOffers}
      reviews={reviews}
    />
  </React.StrictMode>
);
