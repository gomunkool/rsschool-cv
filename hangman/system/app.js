import {Main} from '../pages/main.js';

export class Application {
  constructor(id) {
    this.id = id;
    this.node = document.getElementById(this.id);
  }

  init() {
    this.main = new Main(this);
    // this.main.render();
  }
}
