import "./ExploreContainer.css";
import dataService from "../components/DataService";
import GetCountries from "../components/CountriesService";
import React, { useState, useEffect } from 'react';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonCol,
  IonSearchbar,
  IonList,
  IonItem,
  IonFooter,
} from "@ionic/react";

const ExploreContainer: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([
    {
      name: ""
    }]);
  const { data, refetch } = dataService("https://test.api.amadeus.com/v1/airport/direct-destinations?departureAirportCode=BCN");
  const { cities } = GetCountries('https://countriesnow.space/api/v0.1/countries'); //https://restcountries.com/v3.1/all
  useEffect(() => {
    if (cities) {
      setFilteredSearch(cities);
    }
  }, [cities])
    useEffect(() => {
      // filter here
      if (cities) {
        let tempSearchResult = cities.filter((city: any) => city.includes(searchText))
        setFilteredSearch([...tempSearchResult])
      }
    }, [searchText])


  if (!data || !cities) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Search Origin</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {filteredSearch.map((city: any, index: any) =>
              <IonItem key={index}>{city}</IonItem>
            )};
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            Search Text: {searchText ?? '(none)'}
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }
};

export default ExploreContainer;