import { useState, useEffect } from "react";
import "./styles.css";
import Autocomplete from "../Autocomplete";

interface user {
  name: string;
}

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  // filtering names asynchronously
  const filterName = async (names: string[]): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredNames = names.filter((name: string) =>
          name.toLowerCase().includes(search.toLowerCase())
        );
        resolve(filteredNames);
      }, 100);
    });
  };

  // fetching data from mocked data
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      // maping only users name
      const names: string[] = users.map((user: user) => user.name);
      // filtering users name
      const filteredNames: string[] = await filterName(names);

      setOptions(search ? filteredNames : []);
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
