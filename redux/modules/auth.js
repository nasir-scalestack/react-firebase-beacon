import { auth, fb } from '../../firebase';

export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
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

export const signInWithGoogleAsync = () => async (dispatch) => {

  try {
      const { type, token } = await Expo.Google.logInAsync({
          behavior: 'web',
          // androidClientId: '417487320626-tb7hg90m7efeinim4miaht7bn3tns7j8.apps.googleusercontent.com',
          iosClientId: '482727745030-h01a41a74b9odireiagt9dt5qo28dubs.apps.googleusercontent.com', //enter ios client id
          scopes: ['profile', 'email']
      });
      if (type === 'success') {
          // Build Firebase credential with the Facebook access token.
          const credential = fb.auth.GoogleAuthProvider.credential(token);

          // Sign in with credential from the Facebook user.
          auth.signInWithCredential(credential).catch((error) => {
              // Handle Errors here.
            
          });

          let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
        
          dispatch({
            type: FETCH_USER,
            payload: userInfoResponse.json()
          })
          return Promise.resolve({type: 'success'});

      }else{
        dispatch({
          type: FETCH_USER,
          payload: false
        })
        return Promise.reject({type: 'cancel'});
      }
  } catch (e) {
      return { error: true };
  }
};

export const signInWithFacebookAsync = () => async (dispatch) => {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('2733859643296042', {
      permissions: ['public_profile', 'email'],
    });
    switch (type) {
      case 'success': {
        await auth.setPersistence(fb.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = fb.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await auth.signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
  
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data
        dispatch({
          type: FETCH_USER,
          payload: response.json()
        })
        return Promise.resolve({type: 'success'});
      }
      case 'cancel': {
        dispatch({
          type: FETCH_USER,
          payload: false
        })
        return Promise.reject({type: 'cancel'});
      }
    }
  } catch ({ message }) {
    console.log(`Facebook Login Error: ${message}`);
  }
}
export const signInEmailAndPassword = (email, password) => dispatch => {
   auth
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {},
        error => {
          alert(error.message);
        }
      );
};

export const signOut = () => dispatch => {
  auth
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
