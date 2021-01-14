import {CharacterListItem} from "./CharacterListItem"; 
import "./CharactersList.css"; 

export function CharactersList(props) { 


  const characters = props.characters.map((character, idx) => (
    <CharacterListItem  key={idx * Math.random()} character={character}/>
  ))

  return (<>
    <table className="CharactersTable">
      <thead>
        <tr>
          <th>NAME</th>
          <th>BIRTH DATE</th>
          <th>HEIGHT</th>
          <th>MASS</th>
          <th>HOME WORLD</th>
          <th>SPECIES</th>
        </tr>
      </thead>
      <tbody>
        {characters}
      </tbody>
    </table>
  </>)
}