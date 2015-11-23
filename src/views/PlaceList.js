import React from 'react-native'
import NativeUI from 'react-native-ui'
import _ from 'lodash'

const {ColoredView, ImageCard} = NativeUI

const PlacesList = require('../hardcoded/places.js')

const PlaceList = React.createClass({

  propTypes: {
    onSelectPlace: React.PropTypes.func
  },

  render () {
    const {onSelectPlace} = this.props

    return (
      <ColoredView title='Know the World' color='#E66000'>

        {_.map(PlacesList, (place, index) => {
          return <ImageCard
            key={index}
            onPress={onSelectPlace.bind(null, {
              name: place.name,
              code: place.code
            })}
            title={place.name}
            subtitle={place.subtitle}
            imageUrl={place.imageUrl} />
        })}

      </ColoredView>
    )
  }
})

module.exports = PlaceList
