const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

const getWithToken = url => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: { Authorization: token }
  }).then(res => res.json());
};

const getCurrentGamer = () => {
  return getWithToken(`${API_ROOT}/current_gamer`);
};

const login = data => {
  return fetch(`${API_ROOT}/auth/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signUp= data => {
  return fetch(`${API_ROOT}/signUp/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};


export const adapter = {
  auth: {
    login, signUp,
    getCurrentGamer
  }
};
