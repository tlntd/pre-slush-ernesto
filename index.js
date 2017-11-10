var Botkit = require('botkit');
var controller = Botkit.slackbot({debug: false});

controller.spawn({token: process.env.SLACK_TOKEN}).startRTM();

function isCorrectMessage (text) {
  return text.toLowerCase() === "Why can't I have Ernesto back in my life?".toLowerCase();
}

function getHappyErnesto (text) {
  return {
    text: text,
    username: 'ernesto',
    icon_emoji: ':simple_smile:'
  };
}

function sendCorrectAnswerMessage (bot, message) {
  const firstMessage = 'Finally someone who understands me!';
  const secondMessage = "Congratulations my friend. You have passed the challenge. Send your contact details at https://talented.typeform.com/to/KznG2Y and Talented crew will contact you for the prize";
  bot.reply(message, getHappyErnesto(firstMessage));
  setTimeout(function () {
    bot.reply(message, getHappyErnesto(secondMessage));
  }, 1000);
}

function isHelloMessage (text) {
  const regex = '^(hi|hello|yo|moi|hei).*';
  return !!(text.toLowerCase().match(regex));
}

function getRandomValueFromArray (arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

function getRandomHelloMessage () {
  const greetings = [
    "Hello to you too!",
    "How can I help?",
    "Hello, I'm Ernesto"
  ];
  return getRandomValueFromArray(greetings);
}

function getRandomWhineMessage () {
  const whines = [
    "I really think I am a lovely, sweet and smart person.",
    "I don't get why people always have hate on me.",
    "It's not my problem that I'm successful person",
    "You know my ex? The one that still seeks my attention.",
    "You can count yourself very lucky to have me around",
    "I really could whine all day long about my life",
    "Today, my ex tried to convince me to propose by telling me that the sooner we get married, the sooner she'll get pregnant."
  ];
  return getRandomValueFromArray(whines);
}

function sendWrongAnswerMessage (bot, message) {
  if (isHelloMessage(message.text)) {
    bot.reply(message, getRandomHelloMessage());
  } else {
    bot.reply(message, getRandomWhineMessage());
  }
}

controller.on('direct_message', function(bot, message) {
  if (isCorrectMessage(message.text)) {
    sendCorrectAnswerMessage(bot, message);
  } else {
    sendWrongAnswerMessage(bot, message);
  }
});
