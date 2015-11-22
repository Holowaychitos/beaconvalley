import React from 'react-native'
import NativeUI from 'react-native-ui'
import _ from 'lodash'

const PlacesList = require('../hardcoded/places.js')

const {Text, View, TouchableOpacity, Image, MapView} = React
const {ColoredView, Button, ProgressBar} = NativeUI

const SinglePlace = React.createClass({

  propTypes: {
    onSelectPlace: React.PropTypes.func,
    onBack: React.PropTypes.func,

    currentRoute: React.PropTypes.object
  },

  render () {
    const {currentRoute, onBack} = this.props
    const placeObject = PlacesList[currentRoute.code]

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
              Tu progreso en esta misión:
            </Text>
            <ProgressBar progress={0.25} />

            <Text style={styles.subtitle}>
              Tus objetivos:
            </Text>

            {_.map(placeObject.places, (place, index) => {
              return <Text key={index} style={index < 5 ? styles.striked : {}}>
                {place.title}
              </Text>
            })}

            <Text style={styles.subtitle}>
              Mapa de tu misión:
            </Text>

            <MapView
              annotations={placeObject.places}
              showsUserLocation
              showsPointsOfInterest
              style={{
                height: 250
              }} />

            <Button>
              <Text>Me interesa</Text>
            </Button>
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
