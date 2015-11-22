import React from 'react-native'
import NativeUI from 'react-native-ui'

const PlacesList = require('../hardcoded/places.js')

const {Text, View, TouchableOpacity, Image} = React
const {ColoredView, Button} = NativeUI

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
            height: 300
          }} />

          <View style={styles.container}>
            <Text>{placeObject.subtitle}</Text>
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
    padding: 15
  }
}

module.exports = SinglePlace
