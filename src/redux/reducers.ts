import { ChoiceActionType, DISLIKE, LIKE, LikeDislikeAction, RESET } from './actions';

import { combineReducers } from 'redux';
import { CARDS_LENGTH } from '../App';

export interface LastChoiceState {
  type: ChoiceActionType | null,
  currentCardIndex: number,
}

const initialState: LastChoiceState = {
  type: null,
  currentCardIndex: CARDS_LENGTH,
};

const lastChoice = (state = initialState, action: LikeDislikeAction): LastChoiceState => {
  switch (action.type) {
    case LIKE:
    case DISLIKE:
      return action;
    case RESET:
      return {
        type: RESET,
        currentCardIndex: initialState.currentCardIndex,
      };
    default:
      return state;
  }
};

export default combineReducers({ lastChoice });
