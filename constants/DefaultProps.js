const getHeader = {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'apikey': '2000c86fa6fd19f62e3741a3eaa2fe9c', 
      'deviceType' : 'android'
    }}
    const postHeader = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'apikey': '2000c86fa6fd19f62e3741a3eaa2fe9c', 
          'deviceType' : 'android'
        }}

        const dummyRegion = { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }

export default {
    getHeader,postHeader, dummyRegion,
    
}