import React from 'react';

export const ChatContext = React.createContext({
  planet: {},
  channel: {},
  attachmentManager: {},
  logout: () => {console.log("STUBF: ChatContext.logout");}
});

export default ChatContext;