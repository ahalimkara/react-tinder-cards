import React, { FunctionComponent } from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import Card from './Card';
import logo from './logo.png';

import './App.css';
import Button from './Button';

const cards = [
  require('./cards/Humphrey-Bogart.jpg'),
  require('./cards/Laraine-Day.jpg'),
  require('./cards/Joe-E.-Brown.jpg'),
  require('./cards/Patricia-Ellis.jpg'),
  require('./cards/Marlon-Brando.jpg'),
];

const App: FunctionComponent = () => (
  <div>
    <img className="logo" src={logo} alt="logo" />
    <div className="cards">
      {cards.map((image, index) => <Card key={index} index={index} image={image} />)}
    </div>
    <div className="buttons">
      <Button icon={faTimesCircle} color="#e95c56" />
      <Button icon={faCheckCircle} color="#8ed97c" />
    </div>
  </div>
);

export default App;
