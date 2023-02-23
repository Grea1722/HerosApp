import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/HeroCard";
import { getHeroesByName } from "../helpers/getHeroesByName";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const onSearchSubmit = (event) => {
    event.preventDefault();

    if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText}`);
  };
  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* Primera forma de mostrar divs por condicion
          {
          (q === '') 
          ? <div className="alert alert-primary">Search a hero</div> 
          : (heroes.length === 0 ) && ( <div className="alert alert-danger">
          No hero with <b>{q}</b>
        </div>)
        } */}

          <div className="alert alert-primary col animate__animated animate__fadeIn" style={{display: showSearch ? '':'none'}}>Search a hero</div>
          <div className="alert alert-danger col animate__animated animate__fadeIn" style={{display: showError ? '':'none'}}>
            No hero with <b>{q}</b>
          </div>

          {heroes.map((heroe) => (
            <HeroCard key={heroe.id} {...heroe} />
          ))}
        </div>
      </div>
    </>
  );
};
