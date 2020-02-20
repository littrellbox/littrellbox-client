import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import './css/MessageText.css';
import formatText from './FormatText';

class MessageText extends React.Component {
  render() {
    return (
      <div className="Message-content"><ReactMarkdown escapeHtml={false} unwrapDisallowed={true} source={formatText(this.props.message.content)}/></div>
    );
  }
}

export default MessageText;