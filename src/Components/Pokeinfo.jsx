import React from "react";
//mainnnnnnnnnnnnnnnnnnnnnnnn props pass krte wqt {} usethis
const Pokeinfo = ({ data }) => {
  console.log(data);
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemonother/official-artwork/${data.id}.png``}
            alt=""
          />
          <div className="abilities">
            {data.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
           
          </div>
          <div className="base-stat">
          {
            data.stats.map((poke)=>{
              return(
                <>
                <h3>{poke.stat.name}:{poke.base_stat}</h3>
                </>
              )
            })
          }
          </div>
        </>
      )}
    </>
  );
};

export default Pokeinfo;
