
import DefaultProps from '../../constants/DefaultProps';

export const FETCH_BEACONS = 'FETCH_BEACONS';

export const fetchBeaconData = () => dispatch => {
fetch('http://3.18.28.164/api/getAllBeacons', DefaultProps.getHeader)
    .then((response) => response.json())
    .then((responseJson) => {
        dispatch({
            type: FETCH_BEACONS,
            payload: responseJson.beacons,
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
export default (state = {
    beacons: []
}, action) => {
    console.log(action);
    switch (action.type) {
      case FETCH_BEACONS:
        return action.payload || null;
      default:
        return state;
    }
  };
  