import React, { FunctionComponent } from 'react';

import Card from './Card';

import './App.css';

const cards = [
  require('./cards/Humphrey-Bogart.jpg'),
  require('./cards/Laraine-Day.jpg'),
  require('./cards/Joe-E.-Brown.jpg'),
  require('./cards/Patricia-Ellis.jpg'),
  require('./cards/Marlon-Brando.jpg'),
];

const App: FunctionComponent = () => (
  <>
    { cards.map((image, index) => <Card key={index} index={index} image={image} />) }
  </>
);

export default App;
