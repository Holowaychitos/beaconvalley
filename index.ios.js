import React from 'react-native'

import PlaceList from './src/views/PlaceList.js'
import SinglePlace from './src/views/SinglePlace.js'

const {Navigator} = React

var {
  AppRegistry
} = React

const beaconValley = React.createClass({
  render () {
    return <Navigator
      initialRoute={{
        name: 'Home',
        route: 'HOME'
      }}
      renderScene={(currentRoute, navigator) => {
        const RouteComponent = Routes[currentRoute.route]

        return <RouteComponent
          currentRoute={currentRoute}
          onBack={navigator.pop}
          onSelectPlace={(place) => {
            navigator.push({
              name: place.name,
              code: place.code,
              route: 'SINGLEPLACE'
            })
          }} />
      }}/>
  }
})

const Routes = {
  HOME: PlaceList,
  SINGLEPLACE: SinglePlace
}

AppRegistry.registerComponent('beaconValley', () => beaconValley)
