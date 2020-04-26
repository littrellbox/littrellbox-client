import React from "react";
import AuthContext from "../contexts/authContext";
import MessageText from "./MessageText";
import './css/PredictedMessage.css';

class PredictedMessage extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    //the user isn't going to change while this is showing, so we can rerender based on props
    if(this.props !== nextProps) {
      return true;
    }
  }

  render() {
    let cssClass = (this.props.prevMessageIsUser ? "PredictedMessage" : "Message");
    return (
      <AuthContext.Consumer>
        {(user) => (
          <div className={cssClass}>
            {!this.props.prevMessageIsUser && <div className="Message-pfp"/>}
            {!this.props.prevMessageIsUser && <div className="Message-online"/>}
            {this.props.prevMessageIsUser && <div className="PredictedMessage-spacer"/>}
            <div className="Message-container">
              <div className="Message-info-container">
                {!this.props.prevMessageIsUser && <div className="Message-username">{user.username}</div>}
              </div>
              {Object.values(this.props.predictions).map((message) => (<MessageText scrollWorkaround={this.props.scrollWorkaround} prediction={true} key={message._id} message={message}/>))}
            </div>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default PredictedMessage;