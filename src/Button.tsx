import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

import { ChoiceActionType, dislike, DISLIKE, like, LIKE, RESET, resetChoice } from './redux/actions';
import { LastChoiceState } from './redux/reducers';

interface Props {
  icon: IconDefinition,
  type: ChoiceActionType,
  lastChoice: LastChoiceState,
  like: Function,
  dislike: Function,
  resetChoice: Function,
}

const buttonTypeToColor = {
  [LIKE]: '#8ed97c',
  [DISLIKE]: '#e95c56',
  [RESET]: '#8d8d8d',
};

const Button: FunctionComponent<Props> = ({ icon, type, lastChoice: { currentCardIndex }, ...actions }) => {
  const onClick = () => {
    if (type === LIKE) {
      actions.like(currentCardIndex);
    } else if (type === DISLIKE) {
      actions.dislike(currentCardIndex);
    } else {
      actions.resetChoice();
    }
  };

  let className;

  if (currentCardIndex > 0) {
    if (type === RESET) {
      className = 'hide';
    }
  } else {
    if (type !== RESET) {
      className = 'hide';
    }
  }

  return (
    <div className={`button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="4x" color={buttonTypeToColor[type]} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  lastChoice: state.lastChoice,
});

export default connect(
  mapStateToProps,
  { like, dislike, resetChoice },
)(Button);
