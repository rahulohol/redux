import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getMusicRecord } from "../Redux/App/Action";

function MusicAlbum() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const musicRecords = useSelector((store) => store.AppReducer.musicRecords);
  const location = useLocation();

  //? whenever  the filters

  useEffect(() => {
    if (location || musicRecords.length === 0) {
      const genre = searchParams.getAll("genre");
      const queryParams = {
        params: {
          genre: genre,
          _sort: searchParams.get("sortBy") && "year",
          _order: searchParams.get("sortBy"),
        },
      };
      dispatch(getMusicRecord(queryParams));
    }
  }, [location.search]);

  return (
    <>
      {musicRecords.length > 0 &&
        musicRecords.map((el) => {
          return (
            <div key={el.id} style={{ border: "1px solid black" }}>
              <div>
                <div>{el.name}</div>
              </div>
              <div>
                <img src={el.img} alt={el.name} />
              </div>
              <div>{el.genre}</div>
              <div>{el.year}</div>
              <Link to={`/music/${el.id}/edit`}>
                <button>Edit</button>
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default MusicAlbum;
