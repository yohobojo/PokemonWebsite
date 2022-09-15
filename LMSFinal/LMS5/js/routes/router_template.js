import Utilities from '../util/utils.js';
/* Class Router-handles hash routing and nav link state for application */
export default class Router {
  constructor(window, routes, containerId, templateUrl) {
    this.window = window;
    this._routes = routes;
    this.templateUrl = templateUrl;
    this.containerId = containerId;
    this.utils = new Utilities();
    (async () => {
      console.log('here');
      await this.init();
    })();
  }
  get routes() {
    return this._routes;
  }
  get defaultRoute() {
    return this._routes.find((r) => r.isDefaultView);
  }
  get curRoute() {
    return this.routes.find((element) => element.name == window.location.hash);
  }
  get $container() {
    return $(`#${this.containerId}`);
  }
  async init() {
    await this.render();
    $('.nav-link').click(function (e) {
      $('.nav-link.active').removeClass('active');
      $(e.currentTarget).addClass('active');
    });
    this.setDefaultHash();
  }
  setDefaultHash() {
    let curRoute = this.defaultRoute;
    window.location.hash = curRoute.name;
  }
  async render() {
    this.listTemplateHtml = await this.utils.getFileContents(this.templateUrl);
    this.$container.html(ejs.render(this.listTemplateHtml));
  }
}
