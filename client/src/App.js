import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TestComponent from './componets/TestComponent/TestComponet';
import ProductCard from './componets/ProductCard/ProductCard';
import SearchBar from './componets/SearchBar/SearchBar';
import Catalog from './componets/Catalog/Catalog';



function App() {
  return (
    <>
      <Router>
        <Route path='/' component={SearchBar} />
        <Route path='/' component={Catalog} />
      </Router>
    </>
  );
}

export default App;
