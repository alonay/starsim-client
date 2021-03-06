import initialState from '../store/initialState'

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_GAMER':
      const { profile, id, name } = action.gamer;
      return { ...state, currentGamer: { profile, id, name } };
    case 'LOGOUT_GAMER':
      return { ...state, currentGamer: {} };
    case 'CHANGE_GAMER_SCORE':
      const updatedCurrentGamer = Object.assign({}, state.currentGamer)
      updatedCurrentGamer.profile.high_score = action.payload.high_score
      return {...state, currentGamer: updatedCurrentGamer }
    default:
      return state;
  }
};
