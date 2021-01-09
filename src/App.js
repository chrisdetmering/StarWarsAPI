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
      async function getDisplayedCharacters() { 
        const result = await fetch(`https://swapi.dev/api/people/?page=1`)
        const data = await result.json(); 
      
        if (data) {
          const starWarsCharacters = getMissingData(data.results); 

        
          setDisplayedCharacters(prevDisplayed => { 
            return [...prevDisplayed, ...starWarsCharacters];
          });
          getAllCharacters().then(rest => { 
            let newAllChars = rest.reduce((acc, current) => { 
              return [...acc, ...current]; 
            }, []); 

            setAllCharacters(newAllChars);  
          }); 
        }
        setIsLoading(false);
      }


      getDisplayedCharacters(); 
      // getAllCharacters();
  }, []); 

  useEffect(() => { 
    console.log(displayedCharacters)
  }, [displayedCharacters]); 




function getAllCharacters() { 
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    return Promise.all(pages.map(async pageNumber => { 
      const result = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`)
      const data = await result.json(); 
      const starWarsCharacters = getMissingData(data.results); 
      return starWarsCharacters
    }))
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
