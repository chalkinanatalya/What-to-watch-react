import { useAppSelector } from '../../hooks';
import FilmList from '../film-list/film-list';
import { store } from '../../store';
import { fetchSimilarAction } from '../../store/api-actions';
import { useEffect } from 'react';

type SimilarFilmsProps = {
  filmId: string | undefined,
}

function SimilarFilms({ filmId }: SimilarFilmsProps): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchSimilarAction(filmId));
  }, [filmId]);
  const { similarFilms } = useAppSelector((state) => state);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        <FilmList films={similarFilms} />
      </div>
    </section>
  );
}

export default SimilarFilms;