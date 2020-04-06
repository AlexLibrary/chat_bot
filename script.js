'use strict';
/* public */
const commands = {};

/* function */
class ChatBot {
  constructor() {
    this.isWorking = false;
    this.speech = 'Привет я Чат-Бот, я знаю команды \n /start \n /name \n /number \n /stop \n /weather';
    this.yourName = '';
    this.start = this.cStart;
    this.name = this.cName;
    this.number = this.cNumber;
    this.stop = this.cStop;
    this.weather = this.cWeather;
    this.commands = ['start', 'name', 'number', 'stop', 'weather'];
    this.userCommand = [];
    this.runCommand = '';
    this.numbers = [];
    this.isRunCommandNumber = false;
  }

  toSpeech() {
    this.createDOMElement();
  }

  createDOMElement() {
    const content = document.querySelector('.chat__content')
    const element = document.createElement('div');
    element.classList.add('chat__item');
    element.classList.add('chat__item--bot');
    element.innerText = this.speech;
    content.prepend(element);
    var img = document.createElement("img");
    img.setAttribute('src', './images/bot.svg');
    img.setAttribute('alt', 'bot');
    // img.setAttribute('height', '1px');
    // img.setAttribute('width', '1px');
    element.appendChild(img);
  }

  command(text) {
    if (this.isOperand(text)) {
      this.calc(text);
    } else {
      text.toLowerCase();
      this.userCommand = text.split(' ');
      if (this.userCommand.length > 1) {
        text = this.userCommand[0];
      }
      this.runCommand = 0;
      for (const item of this.commands) {
        if (text.startsWith('/') && text.endsWith(item)) {
          this.runCommand = this[item];
          this.runCommand();
          this.runCommand = 1;
        }
      }
      if (this.runCommand === 0) {
        if (this.isWorking) {
          this.speech = `Я не понимаю, введите другую команду!`;
          this.toSpeech();
        } else {
          this.speech = `Введите команду /start, для начала общения`
          this.toSpeech();
        }
      }
    }
  }

  cStart() {
    if (!this.isWorking) {
      this.isWorking = true;
      this.speech = `Привет, меня зовут Чат-бот, а как зовут тебя?`;
      this.toSpeech();
    } else {
      this.speech = `Вводи команды /name, /number, /stop, /weather`
      this.toSpeech();
    }
  }
  cStop() {
    if (this.isWorking) {
      this.isWorking = false;
      this.speech = `Всего доброго, если хочешь поговорить пиши /start`
      this.toSpeech();
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }
  cName() {
    if (this.isWorking) {
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
    if (this.isWorking) {
      if (this.userCommand.length <= 1) {
        this.speech = `Введи /number 5,5 без пробела`;
        this.toSpeech();
      } else if (this.userCommand.length > 2) {
        this.speech = `Введи /number 5,5 без пробела`;
        this.toSpeech();
      } else {
        this.numbers = this.userCommand[1].split(',');
        this.isRunCommandNumber = true;
        this.speech = `введи одно из действий -, +, *, /`
        this.toSpeech();
      }
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }
  calc(operand) {
    if (this.isWorking) {
      if (this.isRunCommandNumber) {
        if (operand === '+') this.speech = this.numbers
          .map(Number)
          .reduce((acc, cur) => acc + cur);
        if (operand === '-') this.speech = this.numbers
          .map(Number)
          .reduce((acc, cur) => acc - cur);
        if (operand === '*') this.speech = this.numbers
          .map(Number)
          .reduce((acc, cur) => acc * cur);
        if (operand === '/') this.speech = this.numbers
          .map(Number)
          .reduce((acc, cur) => acc / cur);

        this.isRunCommandNumber = false;
        this.toSpeech();
      } else {
        this.speech = `Введите команду /number`
        this.toSpeech();
      }
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
  }

  isOperand(text) {
    if (text === '+' || text === '-' ||
      text === '*' || text === '/') {
      return true;
    }
    return false
  }

  cWeather() {
    if (this.isWorking) {
      this.speech = ``
      this.toSpeech();
    } else {
      this.speech = `Введите команду /start, для начала общения`
      this.toSpeech();
    }
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

const createChat = (text) => {
  const content = document.querySelector('.chat__content');
  const element = document.createElement('div');
  element.classList.add('chat__item');
  element.classList.add('chat__item--you');
  element.innerText = text;
  content.prepend(element);
  var img = document.createElement("img");
  img.setAttribute('src', './images/bot.svg');
  img.setAttribute('alt', 'bot');
  // img.setAttribute('height', '1px');
  // img.setAttribute('width', '1px');
  element.appendChild(img);
}

const texting = (event) => {
  event.preventDefault();
  const inputValue = document.querySelector('.chat__input').value;
  document.querySelector('.chat__input').value = '';

  if (inputValue !== '') {
    createChat(inputValue);
  } else {
    return false;
  };
  chatBot.command(inputValue);
}

/* usage */
const chatBot = new ChatBot;
chatBot.toSpeech();
const button = document.querySelector('.chat__btn');
button.addEventListener("click", texting, false);

const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
window.addEventListener('resize', appHeight)
appHeight()
