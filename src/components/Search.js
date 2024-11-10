import { useEffect, useState } from "react";
import styles from "./search.module.css";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  const URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        console.log(data.results);
        setFoodData(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchFood();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}
