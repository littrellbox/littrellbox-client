import escapeHtml from 'escape-html';
import twemoji from 'twemoji';
import EmojiConvertor from 'emoji-js';

let emoji = new EmojiConvertor();
emoji.init_env();
emoji.replace_mode = 'unified';
emoji.allow_native = true;

let formatText = (message) => {
  // we can't use DOM parsing, it bugs out too much
  let workingMessage = message;
  workingMessage = escapeHtml(workingMessage);
  workingMessage = workingMessage.split("\n").join("  \n\n");
  //we aren't using pings right now
  /*workingMessage = workingMessage.replace(/( @[A-Za-z0-9_])\w+/g, formatPing);
  workingMessage = workingMessage.replace(/(^@[A-Za-z0-9_])\w+/g, formatNewLinePing);
  workingMessage = workingMessage.replace(/(\n\n@[A-Za-z0-9_])\w+/g, formatUnformattedNewLinePing); //workaround for how we handle new lines*/ 
  workingMessage = workingMessage.split(":flag-uk:").join("uk"); //handle UK flag edge-case
  workingMessage = emoji.replace_colons(workingMessage);
  workingMessage = twemoji.parse(workingMessage);
  return workingMessage;
};

/*
function formatPing(match) {
  return match.substring(0, 1) + "<span class='message-mention'>" + match.substring(1, match.length) + "</span>"
}

function formatNewLinePing(match) {
  return "<span class='message-mention'>" + match + "</span>"
}

function formatUnformattedNewLinePing(match) {
  return "\n\n<span class='message-mention'>" + match.substring(2, match.length) + "</span>"
}*/

export default formatText;