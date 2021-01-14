import "./Page.css"; 

export function Page(props) { 
  const {pageNum, onPageClick} = props; 
  return(<>
    <li>
      <button 
      className="PageNumberButton"
        onClick={() => onPageClick(pageNum)}>
          {pageNum + 1}
      </button>
    </li>
  </>)
}