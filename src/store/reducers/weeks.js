import { TYPES } from '../actions';

const initialState = [];

export default function weeks(state = initialState, action) {
  switch (action.type) {
    case TYPES.WEEK_ADD:
      return [
        ...state,
        action.week,
      ];
    default:
      return state;
  }
}
