import {useEffect, useState} from "react"; 


export function MissingData(props) { 
  const [missingData, setMissingData] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const {homeWorldUrl, speciesUrl} = props; 

  function setUrl() { 
    if (homeWorldUrl) { 
      return homeWorldUrl; 
    }
    if (speciesUrl[0]) { 
      return speciesUrl[0]; 
    }
  }

  

  useEffect(() => { 
    const url = setUrl(); 
    const cached = localStorage.getItem(url); 

    if (cached) { 
      setMissingData(cached); 
      setLoading(false); 
    } else { 
      getMissingData(url);
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getMissingData(url) { 
    if (url) { 
      try { 
        const response = await fetch(url); 
        const data = await response.json(); 
        localStorage.setItem(url, data.name); 
        setMissingData(data.name);
        setLoading(false); 

      } catch(e) { 
        console.error(e);
      } 
    } else { 
      setMissingData("Human"); 
      setLoading(false); 
    }
  }
  


  return (<>
  {loading ? <p>Loading...</p> : <p>{missingData}</p> }
  </>)

}