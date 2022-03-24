import { useEffect, useState } from "react";

function GetCountries(url: any) {
  const [countries, setCountries] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState<any>(null);
  useEffect(() => {
    setLoading(true); // set loading to true
    fetch(url)
      .then((response) => {
        console.log("Response");
        console.log(response);
        return response.json()
      })
      .then((dades)=>{
        console.log("Data:");
        console.log(dades.data);
        setCountries(dades.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    let cityAux: Array<any> = [];
    if (countries) {
      countries.forEach((element: any) => {
        element.cities.forEach((c: any) => {
          cityAux.push(c);
        })
      });
      setCities(cityAux); //sort mirar com fer-ho
    }
  }, [countries])
  return { cities, loading, error };
}

export default GetCountries;