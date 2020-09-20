import {
  getRandomInteger
} from "../utils/common.js";

const generateText = () => {
  const text = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
  ];

  return text[getRandomInteger(0, text.length - 1)];
};

const generateEmotion = () => {
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  return emotions[getRandomInteger(0, emotions.length - 1)];
};

const generateAuthor = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`
  ];

  return authors[getRandomInteger(0, authors.length - 1)];
};

const generateDate = () => {
  const currentTime = new Date();

  return currentTime;
};

export const generateComment = () => {
  return {
    text: generateText(),
    emotion: generateEmotion(),
    author: generateAuthor(),
    date: generateDate()
  };
};
