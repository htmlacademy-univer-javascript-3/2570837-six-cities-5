import { useAppDispatch, useAppSelector } from '../../hooks';
import { memo, useCallback } from 'react';
import { AppRoute, CITIES } from '@const';
import { changeCity } from '@store/app-data/app-data';
import { getCity } from '@store/app-data/selector';
import { Link } from 'react-router-dom';


function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getCity);

  const handleCityChange = useCallback((evt: React.MouseEvent, city: string) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  }, [dispatch]);


  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li
          key={city}
          className="locations__item"
        >
          <Link className={`locations__item-link tabs__item ${selectedCity === city ? 'tabs__item--active' : ''}`} to={AppRoute.Root} onClick={(evt) => handleCityChange(evt, city)}>
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;

