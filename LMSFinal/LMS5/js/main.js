import AppController from './controllers/app_controller.js';
import appViewModel from './models/app_view_model.js';
$(document).ready(function () {
  (async () => {
    let app = new AppController(appViewModel);
    await app.render();
  })();
});
