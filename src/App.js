import './App.css';
import {SearchBar} from "./SearchBar/SearchBar"; 
import {CharactersList} from "./Characters/CharactersList"; 
import {Pages} from "./Pages/Pages"; 

function App() {
  return (<>
    <h1>STAR WARS SEARCH</h1>
    <SearchBar />
    <CharactersList />
    <Pages />
  </>);
}

export default App;
