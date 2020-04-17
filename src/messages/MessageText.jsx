import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import './css/MessageText.css';
import formatText from './FormatText';

class MessageText extends React.Component {
  render() {
    let cssClass = (this.props.prediction ? "Message-content MessageText-prediction" : "Message-content");
    return (
      <div className={cssClass}>
        <ReactMarkdown escapeHtml={false} unwrapDisallowed={true} source={formatText(this.props.message.content)}/>
      </div>
    );
  }
}

export default MessageText;