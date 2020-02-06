import React from 'react'
import './css/PlanetSidebarButton.css'

class PlanetSidebarButton extends React.Component {
  render() {
    return (
      <div className="PlanetSidebarButton">
        {this.props.planet.name}
      </div>
    )
  }
}

export default PlanetSidebarButton