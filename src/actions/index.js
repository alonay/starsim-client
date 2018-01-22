import { adapter, } from '../services';

export const fetchGamer = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getCurrentGamer().then(gamer => {
    debugger;
    dispatch({ type: 'SET_CURRENT_GAMER', gamer });
  });
};

export const loginGamer = (name, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.login({ name, password }).then(gamer => {
    localStorage.setItem('token', gamer.token);
    debugger;
    dispatch({ type: 'SET_CURRENT_GAMER', gamer });
    history.push('/profile');
  });
};

export const logoutGamer = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_GAMER' };
};
