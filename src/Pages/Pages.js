import './Pages.css';
import {Page} from "./Page"; 

export function Pages(props) { 
  const pages = props.NUM_PAGES.map(pageNum => { 
    return <Page key={pageNum} pageNum={pageNum} onPageClick={props.onPageClick}/>; 
  })

  return (<>
    <div className="CenteredList">
      <ul>
        {pages}
      </ul>
    </div>
  </>)
}