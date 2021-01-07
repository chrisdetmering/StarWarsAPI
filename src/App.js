import {useState, useEffect} from "react"; 
import './App.css';
import {SearchBar} from "./SearchBar/SearchBar"; 
import {CharactersList} from "./Characters/CharactersList"; 
import {Pages} from "./Pages/Pages"; 
import {MissingData} from "./Util/MissingData"; 

function App() {
  const [allCharacters, setAllCharacters] = useState([]); 
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [displayedCharacters, setDisplayedCharacters] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => { 
      getAllCharacters();
  }, []); 

  useEffect(() => { 
    console.log(displayedCharacters)
  }, [displayedCharacters]); 



  async function getAllCharacters() { 

    try { 
      for (let i = 1; i <= 9; i++) { 
        const result = await fetch(`https://swapi.dev/api/people/?page=${i}`)
        const data = await result.json(); 
        if (data.results) { 
         
          const starWarsCharacters = getMissingData(data.results); 
          // const charactersWithHomeWorlds = await getHomeWorlds(starWarsCharacters);
          // const characterWithSpecies = await  getSpecies(charactersWithHomeWorlds);
          
          setIsLoading(false);
          setAllCharacters(prevAllCharacters => { 
              return [...prevAllCharacters, ...starWarsCharacters]
          });
          setDisplayedCharacters(prevDisplayed => { 
              return [...prevDisplayed, ...starWarsCharacters];
          });
        }


      }
      
    } catch(e) { 
      console.error(e)
    }

  }

  function getMissingData(characters) { 
     return characters.map(character => { 
       character.homeworld = <MissingData homeWorldUrl={character.homeworld}/>;
       character.species = <MissingData speciesUrl={character.species}/>;
       return character;
     })
  }





  function handleSearchInput(e) { 
    setSearchCriteria(e.target.value); 
    const newCharacters = allCharacters.filter(character => { 
     return character.name.startsWith(e.target.value); 
    })
  
    setDisplayedCharacters(newCharacters); 
  }

  


  return (<>
    <h1>STAR WARS SEARCH</h1>
    <SearchBar 
      onSearchInput={handleSearchInput} 
      searchCriteria={searchCriteria}/>
    <CharactersList 
      characters={displayedCharacters} />
    {isLoading && <h1>Loading...</h1>}
    <Pages />
  </>);
}

export default App;
