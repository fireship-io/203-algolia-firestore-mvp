import React from 'react';
import './App.css';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectHighlight } from 'react-instantsearch-dom';

const searchClient = algoliasearch('YOUR-APP-ID', 'YOUR-SEARCH-KEY');


function App() {
  
  return (
    <InstantSearch searchClient={searchClient} indexName="customers">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit
  });

  return (
    <div>
      <h3>{hit.username}</h3>
      <img src={hit.avatar} alt={hit.username} />
      {parsedHit.map(
        part => part.isHighlighted ? <mark>{part.value}</mark> : part.value
      )}
    </div>
  );
});

const Hit = ({ hit }) => (
  <p>
    <CustomHighlight attribute="bio" hit={hit} />
  </p>
);


export default App;
