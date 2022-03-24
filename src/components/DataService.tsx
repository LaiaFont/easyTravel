import { useEffect, useState } from "react";

function DataService(url: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true); // set loading to true
    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=41qdspGxoBmoP5DsMyRaRV4DW9c0PZo0&client_secret=uAQGfOENFexOdyhq',
      'redirect': 'follow'
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data.access_token);
        
        fetch(url, {
          'method': 'GET',
          'headers': {
            'Authorization': 'Bearer ' + data.access_token
          }
        })
          .then((response) => {
            console.log("Response");
            console.log(response);
            return response.json()
          })
          .then((dades) => {
            console.log("Data:");
            console.log(dades.data);
            setData(dades.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, [url]);

  // Function to call when button is clicked
  const refetch = () => {
    setLoading(true); // set loading to true
    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=41qdspGxoBmoP5DsMyRaRV4DW9c0PZo0&client_secret=uAQGfOENFexOdyhq',
      'redirect': 'follow'
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data.access_token);
        
        fetch(url, {
          'method': 'GET',
          'headers': {
            'Authorization': 'Bearer ' + data.access_token
          }
        })
          .then((response) => {
            console.log("Response");
            console.log(response);
            return response.json()
          })
          .then((dades) => {
            console.log("Data:");
            console.log(dades.data);
            setData(dades.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })
  };

  return { data, loading, error, refetch };
}

export default DataService;