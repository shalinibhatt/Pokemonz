import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useEffect, useState } from "react";

const Main = () => {
  const [pokedata, setPokedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokedex] = useState();

  const pokefun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getpokemon(res.data.results);
    setLoading(false);
  };

  const getpokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokedata((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokefun();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokedata}
            loading={loading}
            infoPokemon={(poke) => setPokedex(poke)}
          />
          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokedata([]);
                  if (prevUrl) {
                    setUrl(prevUrl);
                  }
                }}
              >
                Prev
              </button>
            )}

            <button
              onClick={() => {
                setPokedata([]);

                if (nextUrl) {
                  setUrl(nextUrl);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};
export default Main;
