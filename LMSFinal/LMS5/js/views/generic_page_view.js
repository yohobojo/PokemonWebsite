export default class GenericPageView {
  constructor(storageService, viewModel) {
    this.storage = storageService;
    this.viewModel = viewModel;
    this.listTemplateHtml = '';
  }

  get $container() {
    return $('#' + this.viewModel.containerId);
  }

  async render() {
    console.log('here');

    await this.renderContent();
  }

  async renderContent() {
    this.listTemplateHtml = await this.getFileContents(
      this.viewModel.listTemplateUrl
    );
    console.log(this.viewModel);
    this.$container.html(ejs.render(this.listTemplateHtml));
  }
  async getFileContents(url) {
    return await $.get(url);
  }
}
