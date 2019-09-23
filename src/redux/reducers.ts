import { LIKE, DISLIKE, LikeDislikeAction, ChoiceActionType, RESET } from './actions';

import { combineReducers } from 'redux';
import { cards } from '../App';

export interface LastChoiceState {
  type: ChoiceActionType | null,
  currentCardIndex: number,
}

const initialState: LastChoiceState = {
  type: null,
  currentCardIndex: cards.length,
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
