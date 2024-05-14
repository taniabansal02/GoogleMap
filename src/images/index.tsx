import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {markers} from './src/assets/makers';
import {USER_DATA} from './src/utils/enum';
import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder';

const App = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [locationName, setLocationName] = useState(null);
  useEffect(() => {
    // Initialize Geocoder API Key
    Geocoder.init('AIzaSyAa4rkqNS8A14-YOiipz1WYS_ksJVvrEZQ');
  }, []);


  const onLongPress = async e => {
    const {coordinate} = e.nativeEvent;
    setMarkerPosition(coordinate);
    console.log('cooordinates', coordinate);
    
    try {
      const address = await Geocoder.from(41.89, 12.49);
      const locationName = address.results[0].formatted_address;
      setLocationName(locationName);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  const onPositionChange = (e) => {
    const cords = e.nativeEvent.coordinate;
    console.log('new', cords);
    setMarkerPosition(cords);
  }
  // console.log('locationName', locationName);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          onLongPress={onLongPress}
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
          onRegionChange={x => {
            console.log(x);
          }}
          showsUserLocation
          showsMyLocationButton>
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              title="Dropped Pin"
              draggable
              onDragEnd={(e) => onPositionChange(e)
                // console.log('dropped pin', e.nativeEvent.coordinate)
              }
              onPress={() => 
                console.log('getting location', markerPosition)
                 
              }
            />
          )}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={marker.name}
              draggable
              onDragEnd={e => console.log(e.nativeEvent.coordinate)}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242F3E'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242F3E'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#D59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#D59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263C3F'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6B9A76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414E'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212A37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9CA5B3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1F2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#F3D19C'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2F3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#D59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263C'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515C6D'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263C'}],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
