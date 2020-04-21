import React from 'react';
import './css/NoComponentAttachment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class NoComponentAttachment extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }
  
  render() {
    return (<div className="NoComponentAttachment">
      <div className="NoComponentAttachment-icon">
        <FontAwesomeIcon icon={faTimesCircle}/>
      </div>
      <div className="NoComponentAttachment-text">
        <div className="NoComponentAttachment-header">This attachment has no component.</div>
        <div className="NoComponentAttachment-details">This attachment has provided a stub component<br/>and therefore cannot be rendered. ({this.props.attachment.type})</div>
      </div>
    </div>);
  }
}

export default NoComponentAttachment;