/* view_model.js -Review this file and the notes I've added to understand how these are used.
As you integrate this pattern into your LMS1 code base, you may make some changes or add your own meta data.  This is just an example showing how I did it
*/

var teamViewModel = {
  entity: 'teams', //key used for LocalStorage
  entitySingle: 'team', //singular in case you need for alert message
  wrapperContainerId: 'app_container',
  wrapperTemplateUrl: 'js/views/partials/list_page_wrapper.ejs',
  wrapperFormUrl: 'js/views/partials/form_view.ejs',
  listContainerId: 'tableContainer',
  listTemplateUrl: 'js/views/partials/list_view.ejs',
  deleteModalContainerId: 'delete-modal',
  formModalContainerId: 'form-modal',
  alertContainerId: 'alertContainer', //container to store dismissible alert
  endPoint: 'localhost:8080',
  list: {
    options: {
      sortCol: 'name',
      sortDir: 'asc',
      limit: '',
      offset: '',
      filterCol: '',
      filterStr: '',
    },
    listTitle: 'Pokemon Teams',

    id: 'my-list',
    tableClasses:
      'table table-striped table-hover table-bordered shadow rounded-2', //classes for table tag

    nameCol: 'name',
    columns: [
      {
        label: 'Team Name',
        name: 'name',
      },
      {
        label: 'Coach Name',
        name: 'coach_name',
      },
      {
        label: 'Coach Phone',
        name: 'phone',
      },
    ],
  },
};
export default teamViewModel;
