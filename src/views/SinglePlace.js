import React from 'react-native'
import NativeUI from 'react-native-ui'

const {Text, View, TouchableOpacity} = React
const {ColoredView} = NativeUI

const SinglePlace = React.createClass({

  propTypes: {
    onSelectPlace: React.PropTypes.func,
    onBack: React.PropTypes.func,

    currentRoute: React.PropTypes.object
  },

  render () {
    const {currentRoute, onBack} = this.props

    return (
      <ColoredView
        title={currentRoute.name}
        leftComponent={
          <TouchableOpacity onPress={onBack}>
            <Text style={{color: '#fff'}}>
              Go back
            </Text>
          </TouchableOpacity>
        }
        color='#E66000'>
        <View style={styles.container}>
          <Text>{currentRoute.code}</Text>
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
