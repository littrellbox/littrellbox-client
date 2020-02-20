import React from 'react';
import Message from './Message';
import autoscroll from 'autoscroll-react';

class MessageListContainer extends React.Component {
  render() {
    return (<div>
      {Object.entries(this.props.messages).map((message) => (<Message key={message[0]} message={message[1]}/>))}
    </div>);
  }
}

export default autoscroll(MessageListContainer);