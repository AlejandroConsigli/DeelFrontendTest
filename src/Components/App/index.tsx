import { useState, useEffect } from "react";
import "./styles.css";
import Autocomplete from "../Autocomplete";

const mockedFruits = ["Banana", "Orange", "Apple"];

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  // creating a filtering async function
  const filterFruits = async (fruits: string[]): Promise<string[]> => {
    return new Promise((resolve) => {
      const filteredFruits = fruits.filter((fruit: string) =>
        fruit.toLowerCase().includes(search.toLowerCase())
      );
      resolve(filteredFruits);
    });
  };

  //fetching data from mocked data
  const fetchData = async () => {
    try {
      const fruits = await filterFruits(mockedFruits);
      setOptions(fruits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="app">
      <h1 className="title">User Database</h1>
      <h2 className="subtitle">Please search for a user in our Database</h2>
      <Autocomplete search={search} options={options} setSearch={setSearch} />
    </div>
  );
};

export default App;
