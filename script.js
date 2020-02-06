'use strict';
/* public */
const commands = {};

/* function */
class chatBot {
  constructor() {
    this.working = false;
    this.commands = {
      start: { answer: },
      name: { answer: 'name' },
      number: { answer: 'number' },
      stop: { answer: 'stop' },
      weather: { answer: 'weather' }
    };
  }
  start() {
    this.working = true;
  }
  stop() {
    this.working = false;
  }

  cStart() {

  }

  renderText = text => {
    const wrongText = `"${text}" Я не понимаю, введите другую команду через / !`;

    text.toLowerCase();
    if (!text[0] === '/') {
      return wrongText;
    };

    text = text.slice(1);
    for (const command in commands) {
      if (command == text) {
        return commands[command].answer
      }
    }

    return wrongText;
  }

  answerBot = (text, form) => {
    const element = document.createElement('div');
    element.classList.add('chat__item');
    element.classList.add('chat__item--bot');
    element.innerText = text;
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

  if (inputValue === '/start') {
    // startBot();
    // stopBot();
  }

  answerBot(renderText(inputValue), form);

}
/* data */
const commands = {}

const commands = {
  start: { answer: 'Привет, меня зовут Чат-бот, а как зовут тебя? /name' },
  name: { answer: 'name' },
  number: { answer: 'number' },
  stop: { answer: 'stop' },
  weather: { answer: 'weather' }
};

/* usage */
const button = document.querySelector('.chat__btn');

button.addEventListener("click", texting, false);
