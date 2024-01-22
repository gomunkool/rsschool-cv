export class Main {

  constructor(app) {
    this.app = app;
  }

  init() {
  }

  render() {
    this.app.node.innerHTML = `
        <div class="main-start">
      qqq
    </div>
    `;
    this.init();
  }

  delete() {
    this.app.node.innerHTML = '';
  }
}
