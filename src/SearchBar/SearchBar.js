

export function SearchBar(props) { 
  const {onSearchInput, searchCriteria} = props; 


  return (<>
    <input 
      type="text" 
      style={{width: "350px"}}
      placeholder="Are these the droids you are looking for?"
      
      onChange={onSearchInput}
      value={searchCriteria}/>
  </>)
}