import React from 'react'

import './css/PlanetSidebar.css'
import SocketContext from '../../contexts/socketContext'
import PlanetSidebarButton from './PlanetSidebarButton'

class PlanetSidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planets: {}
    }

    this.updatePlanet = this.updatePlanet.bind(this);
    this.createPlanet = this.createPlanet.bind(this);
  }

  componentDidMount() {
    this.context.on('updateplanet', this.updatePlanet);
    this.context.emit('getallplanets');
  }

  updatePlanet(planetId, planet) {
    let planetArray = this.state.planets;
    planetArray[planetId] = planet;
    this.setState({
      planets: planetArray
    })
  }

  createPlanet() {
    this.context.emit('createplanet', "test")
  }

  render() {
    return (
      <div className="PlanetSidebar">
        {Object.entries(this.state.planets).map((planet) => (<PlanetSidebarButton key={planet[0]} planet={planet[1]}/>))}
        <div className="PlanetSidebarButton" onClick={this.createPlanet}>
          create
        </div>
      </div>
    )
  }
}

PlanetSidebar.contextType = SocketContext

export default PlanetSidebar