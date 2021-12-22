const https = require("https");

// Constants
GROUPME_API = "api.groupme.com"
GROUPME_BOTS_PATH = "/v3/bots/post"
CONCH_RESPONSES = [
  "Maybe someday.", "Nothing.", "Neither.", "I don't think so.",
  "Yes.", "No.", "Try asking again."
]

// Function to be exported
const processMessage = (req, res) => {
  if (req.body.name === process.env.GROUPME_BOT_NAME) {
    res.send("Bot message received");
    return;
  }

  const msg = req.body.text;
  const baseMsgId = req.body.id;
  if (msg.startsWith("/magicconch")) {
    conchResponse = generateRandomResponse();
    const groupmeResponse = sendGroupMeBotMessageReply(
      process.env.GROUPME_BOT_ID, conchResponse, baseMsgId);
    res.send(groupmeResponse);
  }
  else {
    res.send("No /magicconch prefix");
  }
}

// Traditional function declarations (hoisted to the top of the scope)
// so the const processMessage function can use the following definitions
// made after the const function
function generateRandomResponse() {
  const numResponses = CONCH_RESPONSES.length;
  return CONCH_RESPONSES[Math.floor(Math.random() * numResponses)];
}

function sendGroupMeBotMessage(botId, message, attachments) {
  const data = {
    bot_id:           botId,
    text:             message,
    attachments:      attachments
  };
  
  const options = {
    hostname:         GROUPME_API,
    path:             GROUPME_BOTS_PATH,
    method:           "POST",
    headers:          {
      "Content-Type": "application/json"
    }
  }
  const req = https.request(options, res => {
    console.log(`${res.statusCode} ${res.statusMessage}`);
  })
  req.write(JSON.stringify(data));
  req.end();
  return "Reply message sent"
}

function sendGroupMeBotMessageReply(botId, message, baseMsgId) {
  const attachments = [
    {
      type:           "reply",
      base_reply_id:  baseMsgId
    }
  ]
  return sendGroupMeBotMessage(botId, message, attachments);
}

// Exports
exports.processMessage = processMessage;
