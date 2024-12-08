import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action.ts';
import { memo, useCallback } from 'react';

type CitiesListProps = {
  cities: string[];
};

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);
  const handleCityChange = useCallback(
    (city: string) => {
      dispatch(changeCity(city));
    },
    [dispatch]
  );


  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city}
          className="locations__item"
          onClick={() => handleCityChange(city)}
        >
          <a className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;

