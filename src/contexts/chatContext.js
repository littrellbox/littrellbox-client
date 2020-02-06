import React from 'react'

export const ChatContext = React.createContext({
  planet: {},
  channel: {},
  switchPlanet: (planetToSet) => {return planetToSet},
  switchChannel: (channelToSet) => {return channelToSet}
});

export default ChatContext