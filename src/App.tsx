import './App.css'
import {useEffect, useState} from "react";

function App() {
  const [, setPokemonsData] = useState<any>()

  const getPokemonsData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
    const data = response.json()
    setPokemonsData(data)
  }

  useEffect(() => {

    getPokemonsData()

  }, []);

  return (
    <>Clean Page</>
  )
}

export default App
