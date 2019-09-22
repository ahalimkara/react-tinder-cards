import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

import './App.css';

interface Props {
  icon: IconDefinition,
  color: string,
}

const Button: FunctionComponent<Props> = ({ icon, color }) => (
  <div className="button">
    <FontAwesomeIcon icon={icon} size="4x" color={color} />
  </div>
);

export default Button;
