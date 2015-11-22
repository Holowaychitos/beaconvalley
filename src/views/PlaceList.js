import React from 'react-native'
import NativeUI from 'react-native-ui'

const {ColoredView, ImageCard} = NativeUI

const PlaceList = React.createClass({

  propTypes: {
    onSelectPlace: React.PropTypes.func
  },

  render () {
    const {onSelectPlace} = this.props

    return (
      <ColoredView title='Know the World' color='#E66000'>
        <ImageCard
          onPress={onSelectPlace.bind(null, {
            name: 'Guadalajara de noche',
            code: 'NIGHT'
          })}
          title='Guadalajara de noche'
          subtitle='La lupita, la chiquirruquis...'
          imageUrl='https://d7cc6r9c9cz1k.cloudfront.net/original/original_56516996e5e3f7a662aa72d2.jpg' />

        <ImageCard
          onPress={onSelectPlace.bind(null, {
            name: 'Centro histórico',
            code: 'HISTORY'
          })}
          title='Centro histórico'
          subtitle='Conoce la historia que formó a esta ciudad'
          imageUrl='https://d7cc6r9c9cz1k.cloudfront.net/original/original_56516946e5e3f7a662aa72d0.jpg' />

        <ImageCard
          onPress={onSelectPlace.bind(null, {
            name: 'Shopping',
            code: 'SHOPPING'
          })}
          title='Shopping'
          subtitle='Aprende algo dinero'
          imageUrl='https://d7cc6r9c9cz1k.cloudfront.net/original/original_5651697be5e3f7a662aa72d1.jpg' />

        <ImageCard
          onPress={onSelectPlace.bind(null, {
            name: 'Tequila Mágico',
            code: 'TEQUILA'
          })}
          title='Tequila Mágico'
          subtitle='Tequila tour'
          imageUrl='https://d7cc6r9c9cz1k.cloudfront.net/original/original_56517528e5e3f7a662aa72da.jpg' />

      </ColoredView>
    )
  }
})

module.exports = PlaceList