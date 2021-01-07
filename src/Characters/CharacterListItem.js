

export function CharacterListItem(props) { 
  const {name, birth_year, height, mass, homeworld, species}
  = props.character; 
  
  return(<>
    <tr>
      <td>{name}</td>
      <td>{birth_year}</td>
      <td>{height}in.</td>
      <td>{mass}kg.</td>
      <td>{homeworld}</td>
      <td>{species}</td> 
    </tr>
  </>)
}