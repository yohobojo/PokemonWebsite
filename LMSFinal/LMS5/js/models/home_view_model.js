/* view_model.js -Review this file and the notes I've added to understand how these are used.
As you integrate this pattern into your LMS1 code base, you may make some changes or add your own meta data.  This is just an example showing how I did it
*/
var homeViewModel = {
  entity: 'home', //key used for LocalStorage
  listTemplateUrl: 'js/views/partials/generic_view.ejs',
  endPoint: 'localhost:8080',
  containerId: 'app_container',
};
export default homeViewModel;
