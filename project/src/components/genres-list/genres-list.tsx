import { useAppDispatch, useAppSelector } from '../../hooks';
import FilmList from '../film-list/film-list';
import { selectGenre, getSortedFilmsList } from '../../store/action';
import { MouseEvent, useState } from 'react';
import ShowButton from '../show-button/show-button';
import { FILMS_AMOUNT } from '../../const';

function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();

  const [filmsToShow, setFilmsToShow] = useState(FILMS_AMOUNT);

  const { films, genre, sortedFilms } = useAppSelector((state) => state);

  const changeGenre = (evt: MouseEvent<HTMLAnchorElement>) => {
    setFilmsToShow(FILMS_AMOUNT);
    dispatch(selectGenre({ genre: evt.currentTarget.id }));
    dispatch(getSortedFilmsList());
  };

  const showMoreHandler = () => {
    setFilmsToShow(sortedFilms.length - filmsToShow >= FILMS_AMOUNT ? filmsToShow + FILMS_AMOUNT : sortedFilms.length);
  };


  const genres = ['All genres', ...new Set(films.map((film) => film.genre))];

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {genres.map((tabGenre) => (<li key={tabGenre} className={`catalog__genres-item  ${genre === tabGenre ? 'catalog__genres-item--active' : ''}`}> <a href="#" className="catalog__genres-link" id={tabGenre} onClick={changeGenre}>{tabGenre}</a> </li>))}
      </ul>
      <FilmList films={sortedFilms.slice(0, filmsToShow)} />
      {sortedFilms.length > filmsToShow ? <div className="catalog__more"> <ShowButton onShowMore={showMoreHandler} /> </div> : ''}
    </section>
  );
}

export default GenresList;
