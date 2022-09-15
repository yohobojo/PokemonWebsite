import teamsPageViewModel from './team_view_model.js';
import homePageViewModel from './home_view_model.js';

let routes = [
  {
    name: '#home',
    title: 'Home',
    defaultOptions: null,
    isDefaultView: true,
    viewType: 'generic',
    viewModel: homePageViewModel,
  },
  {
    name: '#teams',
    title: 'Teams',
    defaultOptions: { sortCol: 'name', sortDir: 'asc' },
    viewType: 'list',
    viewModel: teamsPageViewModel,
    isDefaultView: false,
  },
];
let appViewModel = {
  containerId: 'app_container',
  endPoint: 'localhost:8080',
  routes: routes,
  navContainerId: 'navContainer',
  navTemplateUrl: 'js/views/partials/nav.ejs',
};
export default appViewModel;
