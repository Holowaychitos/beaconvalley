import React from 'react-native'
import NativeUI from 'react-native-ui'
import _ from 'lodash'

const PlacesList = require('../hardcoded/places.js')

const {Text, View, TouchableOpacity, Image, MapView, DeviceEventEmitter, AlertIOS, VibrationIOS} = React
const {ColoredView, Button, ProgressBar} = NativeUI

// BEACON START
var Beacons = require('react-native-ibeacon')
var region = {
  identifier: 'kontatk',
  uuid: '05E9919B-70F4-4592-94BB-9150DA7B9033',
  major: 21737
}

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization()
Beacons.startMonitoringForRegion(region)
Beacons.startRangingBeaconsInRegion(region)
Beacons.startUpdatingLocation()

const SinglePlace = React.createClass({

  propTypes: {
    onSelectPlace: React.PropTypes.func,
    onBack: React.PropTypes.func,

    currentRoute: React.PropTypes.object
  },

  getInitialState () {
    return {
      foundPlaces: []
    }
  },

  componentDidMount () {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        const immediate = _(data.beacons).filter({proximity: 'immediate'}).map('minor').value()
        const foundPlaces = _.union(immediate, this.state.foundPlaces)

        if (foundPlaces.length > this.state.foundPlaces.length) {
          VibrationIOS.vibrate()
          AlertIOS.alert('¡Felicidades!', '¡Haz capturado un nuevo lugar!')
        }

        this.setState({
          foundPlaces
        })
      }
    )
  },

  handleNewBeacon () {
    const {currentRoute} = this.props
    const placeObject = PlacesList[currentRoute.code]

    if (this.state.foundPlaces.length >= placeObject.places.length) return

    this.setState({
      foundPlaces: [...this.state.foundPlaces, 'new']
    })
  },

  render () {
    const {currentRoute, onBack} = this.props
    const {foundPlaces} = this.state
    const placeObject = PlacesList[currentRoute.code]

    const placesList = _.get(placeObject, 'places', [])

    return (
      <ColoredView
        title={placeObject.name}
        leftComponent={
          <TouchableOpacity onPress={onBack}>
            <Text style={{color: '#fff'}}>
              Go back
            </Text>
          </TouchableOpacity>
        }
        color='#E66000'>
        <View>
          <Image source={{
            uri: placeObject.imageUrl
          }} style={{
            height: 200
          }} />

          <View style={styles.container}>
            <Text style={styles.subtitle}>
              Tu progreso en esta misión: [{foundPlaces.length} de {placesList.length}]
            </Text>

            {placesList && <ProgressBar progress={foundPlaces.length / placesList.length} />}

            <Text style={styles.subtitle}>
              Tus objetivos:
            </Text>

            {_.map(placesList, (place, index) => {
              return <Text key={index} style={index < foundPlaces.length ? styles.striked : {}}>
                {place.title}
              </Text>
            })}

            <Text style={styles.subtitle}>
              Mapa de tu misión:
            </Text>

            <MapView
              annotations={placesList}
              showsUserLocation
              showsPointsOfInterest
              style={{
                height: 250
              }} />

            <View style={{marginTop: 15}}>
              <Button onPress={this.handleNewBeacon}>
                <Text>¡Iniciar aventura!</Text>
              </Button>
            </View>
          </View>
        </View>
      </ColoredView>
    )
  }
})

const styles = {
  container: {
    padding: 15,
    paddingTop: 0
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 16,
    paddingBottom: 8
  },
  striked: {
    color: '#0a0',
    textDecorationLine: 'line-through'
  }
}

module.exports = SinglePlace
