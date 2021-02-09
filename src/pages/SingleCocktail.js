import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../component/Loading";
import NetworkError from "../component/NetworkError";
export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCocktail = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data) {
          const {
            strDrink: name,
            strCategory: category,
            strGlass: glass,
            strDrinkThumb: image,
            strAlcoholic: info,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
          ];

          const newCocktail = {
            name,
            image,
            category,
            glass,
            info,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (err) {
        if (err.toString() === "TypeError: Failed to fetch") {
          setNetworkError(true);
        }
        console.log(err);
      }
      setLoading(false);
    };
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail && !networkError) {
    return <h2 className="section-title">no cocktails to display</h2>;
  }

  return (
    <>
      {networkError ? (
        <NetworkError />
      ) : (
        <section className="section cocktail-section">
          <Link to="/" className="btn btn-primary">
            back home
          </Link>
          <h2 className="section-title">{cocktail.name}</h2>
          <div className="drink">
            <img alt={cocktail.name} src={cocktail.image} />
            <div className="drink-info">
              <p>
                <span className="drink-data">name:&nbsp;</span>
                {cocktail.name}
              </p>
              <p>
                <span className="drink-data">info:&nbsp;</span>
                {cocktail.info}
              </p>
              <p>
                <span className="drink-data">glass:&nbsp;</span>
                {cocktail.glass}
              </p>
              <p>
                <span className="drink-data">instructions:&nbsp;</span>
                {cocktail.instructions}
              </p>
              <p>
                <span className="drink-data">ingredients:&nbsp;</span>
                {cocktail.ingredients.map((item, index) => {
                  return item ? (
                    <span key={index}>{item}&nbsp;&nbsp;</span>
                  ) : null;
                })}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
