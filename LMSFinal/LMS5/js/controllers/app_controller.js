import LocalStorageService from '../models/local_storage_service.js';
import RestStorageService from '../models/rest_storage_service_template.js';
import ListPageView from '../views/list_page_view.js';
import GenericPageView from '../views/generic_page_view.js';
import Router from '../routes/router_template.js';

export default class AppController {
  constructor(appViewModel) {
    this.appViewModel = appViewModel;
    this.storageService = new RestStorageService(
      this.entity,
      this.entitySingle,
      this.list.options,
      this.endPoint
    );
    this._view = new ListPageView(this.storageService, this.listViewModel);
    this.genericView = new GenericPageView(null, this.genericViewModel);

    this.router = new Router(
      window,
      appViewModel.routes,
      appViewModel.navContainerId,
      appViewModel.navTemplateUrl
    );
    addEventListener('hashchange', (event) => {
      this.render();
    });
  }
  get $containerId() {
    console.log($(`#${this.appViewModel.containerId}`));
    return $(`#${this.appViewModel.containerId}`);
  }

  get data() {
    return this.appViewModel.viewModel.data;
  }
  get entity() {
    return this.appViewModel.routes[1].viewModel.entity;
    return this.appViewModel.viewModel.entity;
  }
  get entitySingle() {
    return this.appViewModel.routes[1].viewModel.entitySingle;
    return this.appViewModel.viewModel.entitySingle;
  }
  get list() {
    return this.appViewModel.routes[1].viewModel.list;
    return this.appViewModel.viewModel.list;
  }
  get listViewModel() {
    return this.appViewModel.routes[1].viewModel;
    return this.appViewModel.viewModel;
  }
  get genericViewModel() {
    return this.appViewModel.routes[0].viewModel;
  }
  get view() {
    return this.loadView();
  }
  get endPoint() {
    return this.appViewModel.endPoint;
  }
  reset() {
    this.view.reset();
  }
  async render() {
    this.view.render();
  }

  loadView() {
    console.log(this.router.curRoute);
    this.$containerId.empty(); //empty app container
    console.log(this.router.curRoute.viewType);

    switch (this.router.curRoute.viewType) {
      case 'generic':
        console.log(this.genericView);
        return this.genericView;
      case 'list':
        console.log(this._view);
        return this._view;
    }
  }
}
