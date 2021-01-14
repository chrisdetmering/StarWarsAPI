

export function CharacterListItem(props) { 
  const {name, birth_year, height, mass, homeworld, species}
  = props.character; 
  
  const Height = height === "unknown" ? height : height + "in";
  const Mass = mass === "unknown" ? mass : mass + "kg";

  return(<>
    <tr>
      <td>{name}</td>
      <td>{birth_year}</td>
      <td>{Height}</td>
      <td>{Mass}</td>
      <td>{homeworld}</td>
      <td>{species}</td> 
    </tr>
  </>)
}