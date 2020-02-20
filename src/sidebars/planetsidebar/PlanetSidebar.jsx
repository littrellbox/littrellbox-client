import React from 'react';
import './css/PlanetSidebar.css';
import SocketContext from '../../contexts/socketContext';
import PlanetSidebarButton from './PlanetSidebarButton';

class PlanetSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: {},
      showingTextbox: false,
      textboxText: ""
    };

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
    });
    if(this.props.allowPlanets) {
      this.context.emit('getallplanets');
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.allowPlanets && !prevProps.allowPlanets) {
      this.context.emit('getallplanets');
    }
  }

  onClick(e) {
    e.stopPropagation();
  }

  onKeyDown(e) {
    if(e.key === "Enter") {
      this.context.emit('createplanet', this.state.textboxText);
      this.setState({
        textboxText: "",
        showingTextbox: false,
      });
    }
  }

  setTextboxValue(e) {
    this.setState({
      textboxText: e.target.value
    });
  }

  updatePlanet(planetId, planet) {
    let planetArray = this.state.planets;
    planetArray[planetId] = planet;
    this.setState({
      planets: planetArray
    });
  }

  showCreatePlanet() {
    this.setState({
      showingTextbox: !this.state.showingTextbox
    });
    //this.context.emit('createplanet', "test")
  }

  render() {
    return (
      <div className="PlanetSidebar">
        {Object.entries(this.state.planets).map((planet) => (<PlanetSidebarButton key={planet[0]} planet={planet[1]}/>))}
        <div className="PlanetSidebarButton" onClick={this.showCreatePlanet}>
          create
          {this.state.showingTextbox && <div className="fullscreen-close" onClick={this.showCreatePlanet}/>}
          <input type="text" value={this.state.textboxText} onClick={this.onClick} onKeyDown={this.onKeyDown} onChange={this.setTextboxValue} className={this.state.showingTextbox ? "PlanetSidebarButton-textbox PlanetSidebarButton-textbox-post" : "PlanetSidebarButton-textbox"}/>
        </div>  
      </div>
    );
  }
}

PlanetSidebar.contextType = SocketContext;

export default PlanetSidebar;