import React from 'react';
import FileTypes from "../misc/FileTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio, faFile } from '@fortawesome/free-solid-svg-icons';
import './css/FileAttachment.css';

class FileAttachment extends React.Component {
  componentDidMount() {
    if(!FileTypes.imageTypes.includes(this.props.attachment.data.type)) {
      this.props.onLoad();
    }
  }

  render() {
    const reconstructedPath = this.props.attachment.userId + "/" + this.props.attachment._id + "/" + this.props.attachment.name;

    if(FileTypes.audioTypes.includes(this.props.attachment.data.type)) {
      return (
        <div className="FileAttachment-audio">
          <div className="FileAttachment-audio-icon">
            <FontAwesomeIcon icon={faFileAudio}/>
          </div>
          <div className="FileAttachment-audio-info">
            <div className="FileAttachment-audio-name">{this.props.attachment.name}</div>
            <audio controls src={window.serverURL + "/files/get/" + reconstructedPath}/>
          </div>
        </div>
      );
    }

    if(FileTypes.imageTypes.includes(this.props.attachment.data.type)) {
      return (
        <div className="FileAttachment-image">
          <img onLoad={this.props.onLoad(true)} alt="Attachment" className="FileAttachment-image-img" src={window.serverURL + "/files/get/" + reconstructedPath}/>
        </div>
      );
    }

    return (
      <div className={"FileAttachment-file"}>
        <div className={"FileAttachment-file-icon"}>
          <FontAwesomeIcon icon={faFile}/>
        </div>
        <div className={"FileAttachment-file-details"}>
          <div className="FileAttachment-file-name">{this.props.attachment.name}</div>
          <a className="FileAttachment-file-download" href={window.serverURL + "/files/get/" + reconstructedPath} rel="noopener noreferrer" target="_blank">Download</a>
        </div>
      </div>
    );
  }
}

export default FileAttachment;