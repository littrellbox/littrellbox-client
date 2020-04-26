import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import './css/MessageText.css';
import formatText from './FormatText';
import SocketContext from "../contexts/socketContext";
import MessageAttachments from "./MessageAttachments";

class MessageText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachments: {}
    };

    this.updateAttachment = this.updateAttachment.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props !== nextProps) {
      return true;
    }
    if(this.state !== nextState) {
      return true;
    }
  }

  componentDidMount() {
    if(!this.props.prediction) {
      //setup attachments
      this.context.on("updateattachment", this.updateAttachment);

      this.context.emit("getattachments", this.props.message._id);
    }
  }

  updateAttachment(attachment) {
    if(attachment.messageId === this.props.message._id) {
      let updateObject = this.state.attachments;
      updateObject[attachment._id] = attachment;
      this.setState({
        attachments: updateObject
      });
    }
  }

  render() {
    let cssClass = (this.props.prediction ? "Message-content MessageText-prediction" : "Message-content");
    return (
      <div className={cssClass}>
        <ReactMarkdown escapeHtml={false} unwrapDisallowed={true} source={formatText(this.props.message.content)}/>
        {!this.props.prediction && <MessageAttachments scrollWorkaround={this.props.scrollWorkaround} attachments={Object.values(this.state.attachments)}/>}
      </div>
    );
  }
}

MessageText.contextType = SocketContext;

export default MessageText;