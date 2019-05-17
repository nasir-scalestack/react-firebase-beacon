import { authRef, provider } from '../../config/firebase';

export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      dispatch({
        type: FETCH_USER,
        payload: user,
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: false,
      });
    }
  });
};

export const signIn = (email, password) => dispatch => {
  authRef
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
    })
    .catch(error => {
      const { message } = error;
      alert(message);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};

export default (state = false, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || null;
    default:
      return state;
  }
};
