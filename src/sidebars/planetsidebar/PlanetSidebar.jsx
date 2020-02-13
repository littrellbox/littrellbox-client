import React from 'react'
import './css/PlanetSidebar.css'
import SocketContext from '../../contexts/socketContext'
import PlanetSidebarButton from './PlanetSidebarButton'
import { Avatar, Popover, Input } from 'antd'


class PlanetSidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planets: {},
      showingTextbox: false,
      textboxText: ""
    }

    this.updatePlanet = this.updatePlanet.bind(this);
    this.setTextboxValue = this.setTextboxValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.showCreatePlanet = this.showCreatePlanet.bind(this);
  }

  componentDidMount() {
    this.context.on('updateplanet', this.updatePlanet);
    this.setState({
      planets: {}
    })
    this.context.emit('getallplanets');
  }

  onClick(e) {
    e.stopPropagation()
  }

  onKeyDown(e) {
    if(e.key === "Enter") {
      this.context.emit('createplanet', this.state.textboxText);
      this.setState({
        textboxText: "",
        showingTextbox: false,
      })
    }
  }

  setTextboxValue(e) {
    this.setState({
      textboxText: e.target.value
    })
  }

  updatePlanet(planetId, planet) {
    let planetArray = this.state.planets;
    planetArray[planetId] = planet;
    this.setState({
      planets: planetArray
    })
  }

  showCreatePlanet() {
    this.setState({
      showingTextbox: !this.state.showingTextbox
    })
    //this.context.emit('createplanet', "test")
  }

  render() {
    return (
      <div className="PlanetSidebar">
        {Object.entries(this.state.planets).map((planet) => (<PlanetSidebarButton key={planet[0]} planet={planet[1]}/>))}
        <Popover placement="right" title="Create Planet" content={
          <Input value={this.state.textboxText} onClick={this.onClick} onKeyDown={this.onKeyDown} onChange={this.setTextboxValue}/>
        } trigger="click">
          <Avatar shape="square" className="PlanetSidebarButton" onClick={this.showCreatePlanet}>
          create
          </Avatar>
        </Popover>
      </div>
    )
  }
}

PlanetSidebar.contextType = SocketContext

export default PlanetSidebar