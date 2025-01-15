


const chatHistory = document.querySelector('.chat-history');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addBotMessage(message) {
  const botMessage = document.createElement('div');
  botMessage.classList.add('bot-message');
  botMessage.innerHTML = `<p>${message}</p>`;
  chatHistory.appendChild(botMessage);
}

function addChatMessage(message) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');
  chatMessage.innerHTML = `<p>${message}</p>`;
  chatHistory.appendChild(chatMessage);
}
function processUserInput() {
  const message = userInput.value;
  addChatMessage(message);
  getBotResponse(message);
  userInput.value = '';
}

function getBotResponse(message) {
  // Here's where you can write the logic for your chatbot
  // In this example, the bot simply echoes the user's message
  addBotMessage(message);
}

sendButton.addEventListener('click', processUserInput);
userInput.addEventListener('keydown', function(event) {
  if (event.code === 'Enter') {
    processUserInput();
  }
});


const dialogflowMessenger = window['dfMessenger'];
dialogflowMessenger.init({
  dfConfig: {
    integrationID: 'YOUR_INTEGRATION_ID',
    chatbotID: 'YOUR_AGENT_ID',
    region: 'YOUR_REGION'
  }
});
dialogflowMessenger.addEventListener('DF_RESPONSE_RECEIVED', handleResponse);

function handleResponse(event) {
  const response = event.detail;
  addBotMessage(response.queryResult.fulfillmentText);
}
async function getBotResponse(message) {
  const response = await fetch(`https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/YOUR_SESSION_ID:detectIntent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_AUTH_TOKEN'
    },
    body: JSON.stringify({
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US'
        }
      }
    })
  });
  const result = await response.json();
  addBotMessage(result.queryResult.fulfillmentText);
}


////////
const inputField = document.getElementById('input-field');
const response = document.getElementById('response');

inputField.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    const query = inputField.value;
    inputField.value = "";
    generateResponse(query);
  }
});

function generateResponse(query) {
  // Use an API like Dialogflow or Wit.ai to generate a response based on the user's query
  // For this example, we'll use a hard-coded response
  const responseText = "I'm sorry, I don't know the answer to that.";
  
  // Display the response in the speech bubble and play the text-to-speech audio
  response.innerText = responseText;
  const speech = new SpeechSynthesisUtterance(responseText);
  speechSynthesis.speak(speech);
}