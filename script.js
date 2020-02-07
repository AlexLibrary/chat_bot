'use strict';
/* public */
const commands = {};

/* function */
class ChatBot {
  constructor() {
    this.working = false;
    this.speech = 'Привет я Бот';
    this.yourName = '';
    this.start = this.cStart;
    this.name = this.cName;
    this.number = this.cNumber;
    this.stop = this.cStop;
    this.weather = this.cWeather;
    this.commands = ['start', 'name', 'number', 'stop', 'weather'];
    this.userCommand = [];
    this.runCommand = '';
  }

  toSpeech() {
    this.createDOMElement();
  }

  command(text) {
    text.toLowerCase();
    this.userCommand = text.split(' ');
    if (this.userCommand.length > 1) {
      text = this.userCommand[0];
    }
    for (const item of this.commands) {
      if (text.startsWith('/') && text.endsWith(item)) {
        this.runCommand = this[item];
        this.runCommand();
      } else if (!text.startsWith('/')) {
        this.speech = `Я не понимаю, введите другую команду!`;
        this.toSpeech();
        break;
      }
    }
  }

  cStart() {
    if (!this.working) {
      this.working = true;
      this.speech = `Привет, меня зовут Чат-бот, а как зовут тебя?`;
      this.toSpeech();
    } else {
      this.speech = `Вводи команды /name, /number, /stop, /weather`
      this.toSpeech();
    }
  }
  cStop() {
    if (this.working) {
      this.working = false;
      this.speech = `Всего доброго, если хочешь поговорить пиши /start`
      this.toSpeech();
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }
  cName() {
    if (this.working) {
      if (this.userCommand.length <= 1) {
        this.speech = `Введи /name YourName`;
        this.toSpeech();
      } else {
        this.yourName = this.userCommand[1];
        this.speech = `Привет ${this.userCommand[1]}, приятно познакомится. Я умею считать, введи числа которые надо посчитать`
        this.toSpeech();
      }
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }
  cNumber() {
    if (this.working) {
      this.speech = ``
      this.toSpeech();
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }
  cWeather() {
    if (this.working) {
      this.speech = ``
      this.toSpeech();
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }

  createDOMElement() {
    const form = document.querySelector('.chat__form')
    const element = document.createElement('div');
    element.classList.add('chat__item');
    element.classList.add('chat__item--bot');
    element.innerText = this.speech;
    form.after(element);
  }
}

const searchParent = (element, parentClass = '') => {
  if (element.classList[0] === parentClass) return element;
  for (let i = 0; i < 3; i++) {
    element = element.parentNode;
    if (element.classList[0] === parentClass) return element;
  }
  return false;
}

const createChat = (text, form) => {
  const element = document.createElement('div');
  element.classList.add('chat__item');
  element.classList.add('chat__item--you');
  element.innerText = text;
  form.after(element);
}

const texting = (event) => {
  event.preventDefault();
  const form = searchParent(event.target, 'chat__form');
  const inputValue = form.querySelector('.chat__input').value;
  form.querySelector('.chat__input').value = '';

  if (inputValue !== '') {
    createChat(inputValue, form)
  } else {
    return false;
  };
  // const chatBot = new ChatBot();
  chatBot.command(inputValue);
}

/* usage */
const chatBot = new ChatBot;
const button = document.querySelector('.chat__btn');
button.addEventListener("click", texting, false);
