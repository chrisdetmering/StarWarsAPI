import {useEffect, useState} from "react"; 


export function MissingData(props) { 
  const [missingData, setMissingData] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const {homeWorldUrl, speciesUrl} = props; 

  

  function setUrl() { 
    if (homeWorldUrl) { 
      return homeWorldUrl
    }
     if (speciesUrl) { 
      if(speciesUrl[0]) { 
        return speciesUrl[0]
      } 
     }
  }

  useEffect(() => { 
    const url = setUrl(); 

    if (url) { 
      fetch(url)
      .then(res => res.json())
      .then(data => {
        setMissingData(data.name)
        setLoading(false); 
      })
      .catch(err => console.error(err))
    } else { 
      setMissingData("Human"); 
      setLoading(false); 
    }
  }, [])


  return (<>
  {loading && <p>Loading...</p>}
  <p>{missingData}</p>
  </>)

}