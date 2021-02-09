import React, { useState, useContext, useCallback, useEffect } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ childern }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("d");
  const [cocktail, setCocktail] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      const { drinks } = data;
      if (drinks) {
        const newCocktail = drinks.map((drink) => {
          return {
            id: drink.idDrink,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
            info: drink.strAlcoholic,
            glass: drink.strGlass,
          };
        });
        setCocktail(newCocktail);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);

  return (
    <AppContext.Provider
      value={{ loading, cocktail, searchTerm, setSearchTerm }}
    >
      {childern}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
