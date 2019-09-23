import React, { FunctionComponent } from 'react';
import { faCheckCircle, faTimesCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';

import './App.css';
import Card from './Card';
import logo from './logo.png';

import Button from './Button';
import { DISLIKE, LIKE, RESET } from './redux/actions';

const cards = [
  require('./cards/Humphrey-Bogart.jpg'),
  require('./cards/Laraine-Day.jpg'),
  require('./cards/Joe-E.-Brown.jpg'),
  require('./cards/Patricia-Ellis.jpg'),
  require('./cards/Marlon-Brando.jpg'),
];
export const CARDS_LENGTH = cards.length;

const App: FunctionComponent = () => (
  <div>
    <img className="logo" src={logo} alt="logo" />
    <div className="cards">
      {cards.map((image, index) => <Card key={index} index={index} image={image} />)}
    </div>
    <div className="buttons">
      <Button icon={faTimesCircle} type={DISLIKE} />
      <Button icon={faPlayCircle} type={RESET} />
      <Button icon={faCheckCircle} type={LIKE} />
    </div>
  </div>
);

export default App;
