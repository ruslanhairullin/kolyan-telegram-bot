'use strict';

module.exports = function () {

    const TelegramBot = require('node-telegram-bot-api');
    const phrases = require('./phrases');
    const token = '1174523942:AAHMFtS_NbbWAFknQOwbML1KZZQkKK0lCzA';

    const bot = new TelegramBot(token, {polling: true});
    let globalChatId;
    let isEnabled = false;
    let timeInterval = 1*60*1000;
    let interval;


    bot.getMe().then(function(me){

      let botName = '@' + me.username;

      bot.on("polling_error", (err) => console.log(err));

      bot.on('text', (msg) => {
  
        const chatId = msg.chat.id;
        

        var command = msg.text.replace(botName, '');
        console.log(command);

        switch(command){
          case '/start':
            isEnabled = true;
            sendMessage('ооооооооохххххххххххх', chatId);
            break;
          case '/stop':
            sendMessage('Миш, накину с зарплаты. Антох, подбросишь до Щёлково?', chatId);
            isEnabled = false;
            break;
          case '/help':
            sendMessage('Бот периодически пишет различные бессмысленные фразы.\nКоманды:\n\/start: начать кипеть с братишками.\n\/stop: перестать кипеть с братишками.\n\/delay {минуты}- изменить интервал. Например /delay 5', chatId, true);
            break;
        }
        if(msg.text.indexOf('/delay') != -1) {
          let newIntervalParam = parseInt(msg.text.replace('/delay', ''));
          if(typeof newIntervalParam == 'number'){
            clearInterval(interval);
            interval = setInterval(sayPhrase, newIntervalParam * 60 *1000);
            sendMessage('вот бабка каловая. поменял интервал', chatId, true);
          }
        }

      });

      bot.on('message', (msg) => {
        globalChatId = msg.chat.id;
      });

      interval = setInterval(sayPhrase, timeInterval);

      function sayPhrase(){
        if(globalChatId){
          let randomPhraseNumber = getRandomNumber(phrases.length - 1)
          bot.sendMessage(globalChatId, phrases[randomPhraseNumber]);
        }
      }

      function getRandomNumber(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      function sendMessage(msg, chatId, ingoreEnableStatus = false){
        if(isEnabled || ingoreEnableStatus){
          bot.sendMessage(chatId, msg);
        }
      }

      });

    
    
}