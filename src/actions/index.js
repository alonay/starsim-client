import { adapter, } from '../services';

export const fetchGamer = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getCurrentGamer().then(gamer => {
    dispatch({ type: 'SET_CURRENT_GAMER', gamer });
  });
};

export const loginGamer = (name, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.login({ name, password }).then(gamer => {
    localStorage.setItem('token', gamer.token);
    dispatch({ type: 'SET_CURRENT_GAMER', gamer });
    history.push('/profile');
  });
};

export const logoutGamer = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_GAMER' };
};


export function changeHighScore(state) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/profiles/1`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        high_score: state.highScore
      })
    })
    .then(data => data.json())
    .then(data=> {
      dispatch({type: "CHANGE_GAMER_SCORE", payload: data})
    })
  }
}
