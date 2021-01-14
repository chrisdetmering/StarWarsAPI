import {useState, useEffect} from "react"; 
import './App.css';
import {SearchBar} from "./SearchBar/SearchBar"; 
import {CharactersList} from "./Characters/CharactersList"; 
import {Pages} from "./Pages/Pages"; 
import {MissingData} from "./Util/MissingData"; 


function App() {
  const NUM_PAGES = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 

  const [allCharacters, setAllCharacters] = useState([]); 
  const [searchCriteria, setSearchCriteria] = useState(""); 
  const [displayedCharacters, setDisplayedCharacters] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [page, setPage] = useState(0); 

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


  useEffect(() => { 
    if (searchCriteria === '') { 
      setDisplayedCharacters(allCharacters.slice(0, 10))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria]); 



  useEffect(() => { 
    const startIndex = page * 10; 
    const endIndex = startIndex + 10; 
    setDisplayedCharacters(allCharacters.slice(startIndex, endIndex)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])


  function getAllCharacters() { 
 
    return Promise.all(NUM_PAGES.map(async pageNumber => { 
      const result = await fetch(`https://swapi.dev/api/people/?page=${pageNumber + 1}`)
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
     return character.name.toLowerCase().startsWith(e.target.value.toLowerCase()); 
    })
  
    setDisplayedCharacters(newCharacters); 
  }

  


  return (<>
    <h1 className="StarWarsHeader">STAR WARS SEARCH</h1>
    <SearchBar 
      onSearchInput={handleSearchInput} 
      searchCriteria={searchCriteria}/>
    <CharactersList 
      characters={displayedCharacters} />
    {isLoading && <h1 className="LoadingHeader">Loading...</h1>}
    <Pages 
      NUM_PAGES={NUM_PAGES}
      onPageClick={setPage}/>
  </>);
}

export default App;
