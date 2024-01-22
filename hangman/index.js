import { Application } from './system/app.js';

window.onload = () => {
  const app = new Application('body');
  app.init();
};