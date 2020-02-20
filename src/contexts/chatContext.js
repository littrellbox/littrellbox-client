import React from 'react';

export const ChatContext = React.createContext({
  planet: {},
  channel: {},
  logout: () => {console.log("STUBF: ChatContext.logout");}
});

export default ChatContext;