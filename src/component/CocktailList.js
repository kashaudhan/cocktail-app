import React from "react";
import Loading from "./Loading";
import Cocktail from "../component/Cocktail";
import { useGlobalContext } from "../context";

export default function CocktailList() {
  const { cocktail, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  if (!cocktail)
    return <h2 className="section-title">no Cocktails to display</h2>;

  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktail-center">
        {cocktail.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
