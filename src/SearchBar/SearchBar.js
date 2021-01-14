import "./SearchBar.css"; 

export function SearchBar(props) { 
  const {onSearchInput, searchCriteria} = props; 


  return (<>
    <input 
      type="text" 
      className="SearchBar"
      placeholder="Are these the droids you are looking for?"
      
      onChange={onSearchInput}
      value={searchCriteria}/>
  </>)
}