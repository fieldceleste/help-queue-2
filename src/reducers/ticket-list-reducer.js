import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  //switch is simplified syntax for conditional statement

  //ES6 object destructuring syntax to get other properties from the action object
  const {id, formattedWaitTime} = action;

  //switch is dependent on action type
  switch (action.type) {
    case c.DELETE_TICKET:
      const newState = { ...state };
      //this is not entirely pure functionality here
      //we are directly altering the state being called on with delete. Keeping it simple for these lessons
      delete newState[id];
      return newState;

      case c.UPDATE_TIME:
        const updatedTicket = Object.assign({}, state[id], {formattedWaitTime});
        const updatedState = Object.assign({}, state, {
          [id]: updatedTicket
        });
        return updatedState;
    default:
      return state;
  }
};