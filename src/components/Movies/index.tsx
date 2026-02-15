import Count from './Count';
import FilterBar from './FilterBar';
import List from './List';

function Movies() {
  return (
    <div className="moviesList">
      <FilterBar />
      <Count />
      <List />
    </div>
  );
}

export default Movies;
