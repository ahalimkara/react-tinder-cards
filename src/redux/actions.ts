export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';
export const RESET = 'RESET';

export type ChoiceActionType = typeof LIKE | typeof DISLIKE | typeof RESET;

export interface LikeDislikeAction {
  type: ChoiceActionType,
  currentCardIndex: number,
}

export const like = (index: number): LikeDislikeAction => ({
  type: LIKE,
  currentCardIndex: index - 1,
});

export const dislike = (index: number): LikeDislikeAction => ({
  type: DISLIKE,
  currentCardIndex: index - 1,
});

export const resetChoice = (): LikeDislikeAction => ({
  type: RESET,
  currentCardIndex: -1,
});
