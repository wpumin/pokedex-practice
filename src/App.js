import React, { useState, useEffect } from "react";
import "./App.css";
import searchIcon from "./search.png";

const App = () => {
  // declaration
  const [pokedex, setPokedex] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState("");
  const [pokemonsSearchResult, setPokemonsSearchResult] = useState([]);
  const pokedexLocalStorage = localStorage.getItem("pokedex");
  const pokemonsLocalStorage = localStorage.getItem("pokemons");
  const [showModal, setShowModal] = useState(false);

  // fetch api
  async function getPokemons() {
    const endpoint = "http://localhost:3030/api/cards";
    const params = {
      method: "GET",
    };

    const result = await fetch(endpoint, params).catch((err) => {
      console.error(err.response.data + " " + endpoint);
    });

    if (result) {
      var response = await result.json();
      setPokemons(response.cards);
    }
  }

  // add pokemon into pokedex
  const addPokedex = (id) => {
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    const newPokemons = pokemons.filter((pokemon) => pokemon.id != id);
    const newPokedex = pokemons.filter((pokemon) => {
      // set add icon status to hide
      if (pokemon.id == id) {
        pokemons[index] = {
          ...pokemons[index],
          addIconStatus: false,
        };
        setPokedex([...pokedex, pokemons[index]]);
      }
    });
    return setPokemons(newPokemons);
  };

  // remove pokemon from pokedex
  const removePokedex = (id) => {
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    const newPokedex = pokedex.filter((pokemon) => pokemon.id != id);
    // set add icon status to hide
    pokemons[index] = {
      ...pokemons[index],
      addIconStatus: false,
    };
    setPokemons([...pokemons, pokedex[index]]);
    return setPokedex(newPokedex);
  };

  // active cross icon when mouse over
  const handleActiveCrossIcon = (id) => {
    const tempPokedex = [...pokedex];
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    tempPokedex[index] = {
      ...tempPokedex[index],
      crossIconStatus: true,
    };
    return setPokedex(tempPokedex);
  };

  // inactive cross icon when mouse out
  const handleInactiveCrossIcon = (id) => {
    const tempPokedex = [...pokedex];
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    tempPokedex[index] = {
      ...tempPokedex[index],
      crossIconStatus: false,
    };
    return setPokedex(tempPokedex);
  };

  // active add icon when mouse over - pokemons
  const handleActiveAddIcon = (id) => {
    const tempPokemons = [...pokemons];
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    tempPokemons[index] = {
      ...tempPokemons[index],
      addIconStatus: true,
    };
    return setPokemons(tempPokemons);
  };

  // inactive add icon when mouse out - pokemons
  const handleInactiveAddIcon = (id) => {
    const tempPokemons = [...pokemons];
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    tempPokemons[index] = {
      ...tempPokemons[index],
      addIconStatus: false,
    };
    return setPokemons(tempPokemons);
  };

  // active add icon2 when mouse over - pokemonsSearchResult
  const handleActiveAddIcon2 = (id) => {
    const tempPokemons = [...pokemonsSearchResult];
    const index = pokemonsSearchResult.findIndex((pokemon) => pokemon.id == id);
    tempPokemons[index] = {
      ...tempPokemons[index],
      addIconStatus: true,
    };
    return setPokemonsSearchResult(tempPokemons);
  };

  // inactive add icon2 when mouse out - pokemonsSearchResult
  const handleInactiveAddIcon2 = (id) => {
    const tempPokemons = [...pokemonsSearchResult];
    const index = pokemonsSearchResult.findIndex((pokemon) => pokemon.id == id);
    tempPokemons[index] = {
      ...tempPokemons[index],
      addIconStatus: false,
    };
    return setPokemonsSearchResult(tempPokemons);
  };

  // search from pokemons
  const handleSearch = (text) => {
    setSearchPokemons(text.toLowerCase());
  };

  // HP calculate - pokedex
  const HPCalculate = (id) => {
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    var hp = pokedex[index].hp !== "None" ? pokedex[index].hp : 0;
    if (hp >= 100) {
      hp = 100;
    } else if (hp < 0) {
      hp = 0;
    } else {
      hp = pokedex[index].hp;
    }
    return hp;
  };

  // Attacks calculate - pokedex
  const AttackCalculate = (id) => {
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    var attack =
      pokedex[index].attacks != undefined
        ? pokedex[index].attacks.length * 50
        : 0;
    if (attack >= 100) {
      attack = 100;
    } else if (attack < 0) {
      attack = 0;
    }
    return attack;
  };

  // Weaknesses calculate - pokedex
  const WeaknessCalculate = (id) => {
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    var weaknesses =
      pokedex[index].weaknesses != undefined
        ? pokedex[index].weaknesses.length * 100
        : 0;
    if (weaknesses >= 100) {
      weaknesses = 100;
    } else if (weaknesses < 0) {
      weaknesses = 0;
    }
    return weaknesses;
  };

  // Damage calculate - pokedex
  const DamageCalculate = (id) => {
    const index = pokedex.findIndex((pokemon) => pokemon.id == id);
    var damage = 0;
    pokedex[index].attacks != undefined &&
      pokedex[index].attacks.map(
        (item) =>
          // calculate sum from value without symbol
          (damage += parseInt(
            item.damage
              .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
              .replace(/[^a-zA-Z0-9]/g, "")
          ))
      );
    return damage ? damage : 0;
  };

  // HP calculate - pokemons
  const HPCalculate2 = (id) => {
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    var hp = pokemons[index].hp !== "None" ? pokemons[index].hp : 0;
    if (hp >= 100) {
      hp = 100;
    } else if (hp < 0) {
      hp = 0;
    } else {
      hp = pokemons[index].hp;
    }
    return hp;
  };

  // Attacks calculate - pokemons
  const AttackCalculate2 = (id) => {
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    var attack =
      pokemons[index].attacks != undefined
        ? pokemons[index].attacks.length * 50
        : 0;
    if (attack >= 100) {
      attack = 100;
    } else if (attack < 0) {
      attack = 0;
    }
    return attack;
  };

  // Weaknesses calculate - pokemons
  const WeaknessCalculate2 = (id) => {
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    var weaknesses =
      pokemons[index].weaknesses != undefined
        ? pokemons[index].weaknesses.length * 100
        : 0;
    if (weaknesses >= 100) {
      weaknesses = 100;
    } else if (weaknesses < 0) {
      weaknesses = 0;
    }
    return weaknesses;
  };

  // Damage calculate - pokemons
  const DamageCalculate2 = (id) => {
    const index = pokemons.findIndex((pokemon) => pokemon.id == id);
    var damage = 0;
    pokemons[index].attacks != undefined &&
      pokemons[index].attacks.map(
        (item) =>
          // calculate sum from value without symbol
          (damage += parseInt(
            item.damage
              .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
              .replace(/[^a-zA-Z0-9]/g, "")
          ))
      );
    return damage ? damage : 0;
  };

  // HP calculate - pokemonsSearchResult
  const HPCalculate3 = (id) => {
    const index = pokemonsSearchResult.findIndex((pokemon) => pokemon.id == id);
    var hp =
      pokemonsSearchResult[index].hp !== "None"
        ? pokemonsSearchResult[index].hp
        : 0;
    if (hp >= 100) {
      hp = 100;
    } else if (hp < 0) {
      hp = 0;
    } else {
      hp = pokemonsSearchResult[index].hp;
    }
    return hp;
  };

  // Attacks calculate - pokemonsSearchResult
  const AttackCalculate3 = (id) => {
    const index = pokemonsSearchResult.findIndex((pokemon) => pokemon.id == id);
    var attack =
      pokemonsSearchResult[index].attacks != undefined
        ? pokemonsSearchResult[index].attacks.length * 50
        : 0;
    if (attack >= 100) {
      attack = 100;
    } else if (attack < 0) {
      attack = 0;
    }
    return attack;
  };

  // Weaknesses calculate - pokemonsSearchResult
  const WeaknessCalculate3 = (id) => {
    const index = pokemonsSearchResult.findIndex((pokemon) => pokemon.id == id);
    var weaknesses =
      pokemonsSearchResult[index].weaknesses != undefined
        ? pokemonsSearchResult[index].weaknesses.length * 100
        : 0;
    if (weaknesses >= 100) {
      weaknesses = 100;
    } else if (weaknesses < 0) {
      weaknesses = 0;
    }
    return weaknesses;
  };

  // Damage calculate - pokemonsSearchResult
  const DamageCalculate3 = (id) => {
    const index = pokemonsSearchResult.findIndex((pokemon) => pokemon.id == id);
    var damage = 0;
    pokemonsSearchResult[index].attacks != undefined &&
      pokemonsSearchResult[index].attacks.map(
        (item) =>
          // calculate sum from value without symbol
          (damage += parseInt(
            item.damage
              .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
              .replace(/[^a-zA-Z0-9]/g, "")
          ))
      );
    return damage ? damage : 0;
  };

  // Happiness calculate for all state (I have a issue to calculate this method)
  const HappinessCalculate = (hp, damage, weakness) => {
    var happiness = 0;
    happiness = Math.ceil((hp / 10 + damage / 10 + 10 - weakness / 10) / 5);
    return happiness;
  };

  // local storage and get all pokemons (extra!)
  useEffect(() => {
    if (JSON.parse(pokemonsLocalStorage)) {
      setPokemons(JSON.parse(pokemonsLocalStorage));
    } else {
      getPokemons();
    }
    if (JSON.parse(pokedexLocalStorage)) {
      setPokedex(JSON.parse(pokedexLocalStorage));
    }
  }, []);

  // set the new local storage when pokedex value changes
  useEffect(() => {
    localStorage.setItem("pokedex", JSON.stringify(pokedex));
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }, [pokedex]);

  // useEffect for search pokemons
  useEffect(() => {
    const results = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchPokemons) ||
        pokemon.type.toLowerCase().includes(searchPokemons)
    );
    setPokemonsSearchResult(results);
  }, [searchPokemons, pokedex]);

  return (
    <div className="App">
      <div className="container">
        {/* header start */}
        <div className="header">
          <h1 className="my-pokedex">My Pokedex</h1>
        </div>
        {/* header end */}
        {/* content start */}
        <div className="content">
          <div className="card-row">
            {pokedex != [] && (
              <>
                {pokedex.map((pokemon, index) => (
                  <div
                    className="card-item"
                    key={index}
                    onMouseOver={() => handleActiveCrossIcon(pokemon.id)}
                    onMouseOut={() => {
                      handleInactiveCrossIcon(pokemon.id);
                    }}
                  >
                    <div className="card-left">
                      <img src={pokemon.imageUrl} alt="temp pokemon" />
                    </div>
                    <div className="card-right">
                      <div className="name">
                        <h2 className="name-pokemon">
                          {pokemon.name.toUpperCase()}
                        </h2>
                        <h6
                          className={`cross ${
                            pokemon.crossIconStatus && "cross-hover"
                          }`}
                          onClick={() => {
                            removePokedex(pokemon.id);
                          }}
                        >
                          X
                        </h6>
                      </div>
                      <div className="detail">
                        <div className="detail-left">
                          <h4 className="detail-label">HP</h4>
                          <h4 className="detail-label">STR</h4>
                          <h4 className="detail-label">WEAK</h4>
                        </div>
                        <div className="detail-right">
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokedex.hp != "None" && HPCalculate(pokemon.id)
                              }`}
                            ></div>
                          </div>
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokemon != undefined &&
                                AttackCalculate(pokemon.id)
                              }`}
                            />
                          </div>
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokemon != undefined &&
                                WeaknessCalculate(pokemon.id)
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="happiness">
                        {[
                          ...Array(
                            HappinessCalculate(
                              pokemon.hp != "None"
                                ? HPCalculate(pokemon.id)
                                : 0,
                              pokemon != undefined &&
                                DamageCalculate(pokemon.id),
                              pokemon != undefined &&
                                WeaknessCalculate(pokemon.id)
                            )
                          ),
                        ].map((i) => {
                          return (
                            <img
                              key={i}
                              className="cute-icon"
                              src={require("./cute.png")}
                              alt="cute"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
         {/* content end */}
        {/* footer start */}
        <div className="bottom-bar">
          <div className="circle-button">
            <h1
              className="add-pokemon"
              onClick={() => {
                setShowModal(true);
              }}
            >
              +
            </h1>
          </div>
        </div>
        {/* footer end */}
        {/* modal start */}
        <div
          className={`outside-modal ${showModal ? "show" : "hide"}`}
          onClick={() => {
            setShowModal(false);
          }}
        />
        <div className={`search-bar ${showModal ? "show" : "hide"}`}>
          <div className="search-bar-border">
            <input
              type="text"
              name="search"
              placeholder="Find Pokemon"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <img src={searchIcon} alt="search icon" />
          </div>
        </div>
        <div className={`modal ${showModal ? "show" : "hide"}`}>
          <div className="card-row">
            {/* condition to display pokemons from search or API start */}
            {pokemonsSearchResult.length == 0 ? (
              <>
                {pokemons.map((pokemon, index) => (
                  <div
                    className={`card-item-search ${index == 0 && "mt-95"}`}
                    key={index}
                    onMouseOver={() => handleActiveAddIcon(pokemon.id)}
                    onMouseOut={() => {
                      handleInactiveAddIcon(pokemon.id);
                    }}
                  >
                    <div className="card-left">
                      <img src={pokemon.imageUrl} alt="temp pokemon" />
                    </div>
                    <div className="card-right">
                      <div className="name">
                        <h2 className="name-pokemon">
                          {pokemon.name.toUpperCase()}
                        </h2>
                        <h6
                          className={`add ${
                            pokemon.addIconStatus && "add-hover"
                          }`}
                          onClick={() => {
                            addPokedex(pokemon.id);
                          }}
                        >
                          Add
                        </h6>
                      </div>
                      <div className="detail">
                        <div className="detail-left">
                          <h4 className="detail-label">HP</h4>
                          <h4 className="detail-label">STR</h4>
                          <h4 className="detail-label">WEAK</h4>
                        </div>
                        <div className="detail-right">
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokedex.hp != "None" && HPCalculate2(pokemon.id)
                              }`}
                            ></div>
                          </div>
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokemon != undefined &&
                                AttackCalculate2(pokemon.id)
                              }`}
                            />
                          </div>
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokemon != undefined &&
                                WeaknessCalculate2(pokemon.id)
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="happiness">
                        {[
                          ...Array(
                            HappinessCalculate(
                              pokemon.hp != "None"
                                ? HPCalculate2(pokemon.id)
                                : 0,
                              pokemon != undefined &&
                                DamageCalculate2(pokemon.id),
                              pokemon != undefined &&
                                WeaknessCalculate2(pokemon.id)
                            )
                          ),
                        ].map((i) => {
                          return (
                            <img
                              key={i}
                              className="cute-icon"
                              src={require("./cute.png")}
                              alt="cute"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {pokemonsSearchResult.map((pokemon, index) => (
                  <div
                    className={`card-item-search ${index == 0 && "mt-95"}`}
                    key={index}
                    onMouseOver={() => handleActiveAddIcon2(pokemon.id)}
                    onMouseOut={() => {
                      handleInactiveAddIcon2(pokemon.id);
                    }}
                  >
                    <div className="card-left">
                      <img src={pokemon.imageUrl} alt="temp pokemon" />
                    </div>
                    <div className="card-right">
                      <div className="name">
                        <h2 className="name-pokemon">
                          {pokemon.name.toUpperCase()}
                        </h2>
                        <h6
                          className={`add ${
                            pokemon.addIconStatus && "add-hover"
                          }`}
                          onClick={() => {
                            addPokedex(pokemon.id);
                          }}
                        >
                          Add
                        </h6>
                      </div>
                      <div className="detail">
                        <div className="detail-left">
                          <h4 className="detail-label">HP</h4>
                          <h4 className="detail-label">STR</h4>
                          <h4 className="detail-label">WEAK</h4>
                        </div>
                        <div className="detail-right">
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokedex.hp != "None" && HPCalculate3(pokemon.id)
                              }`}
                            ></div>
                          </div>
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokemon != undefined &&
                                AttackCalculate3(pokemon.id)
                              }`}
                            />
                          </div>
                          <div className="level-tube">
                            <div
                              className={`level-value-${
                                pokemon != undefined &&
                                WeaknessCalculate3(pokemon.id)
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="happiness">
                        {[
                          ...Array(
                            HappinessCalculate(
                              pokemon.hp != "None"
                                ? HPCalculate3(pokemon.id)
                                : 0,
                              pokemon != undefined &&
                                DamageCalculate3(pokemon.id),
                              pokemon != undefined &&
                                WeaknessCalculate3(pokemon.id)
                            )
                          ),
                        ].map((i) => {
                          return (
                            <img
                              key={i}
                              className="cute-icon"
                              src={require("./cute.png")}
                              alt="cute"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {/* condition to display pokemons from search or API start */}
          </div>
        </div>
        {/* modal end */}
      </div>
    </div>
  );
};

export default App;
