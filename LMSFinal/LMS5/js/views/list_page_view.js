export default class ListPageView {
  constructor(storageService, viewModel) {
    this.storage = storageService;
    this.viewModel = viewModel;
    this.listTemplateHtml = '';
    this.wrapperTemplateHtml = '';
    this.searchWaiter = null;
    this.deletedTeams = [];

    this.arrowCol;
    this.arrowDir;
  }

  get $wrapperContainer() {
    console.log(this.viewModel);
    return $('#' + this.viewModel.wrapperContainerId);
  }

  get $listContainer() {
    return $('#' + this.viewModel.listContainerId);
  }

  async render() {
    console.log('here');
    await this.renderWrapper();
    await this.renderList();
  }

  async renderWrapper() {
    this.data = await this.storage.getLookup('people');
    this.$wrapperContainer.html(
      ejs.render(
        await this.getFileContents(this.viewModel.wrapperTemplateUrl),
        { view: this.viewModel, data: this.data }
      )
    );
    await this.bindWrapperEvents();
  }
  async renderList() {
    this.data = await this.storage.list();
    if (!this.listTemplateHtml.length > 0) {
      this.listTemplateHtml = await this.getFileContents(
        this.viewModel.listTemplateUrl
      );
    }
    this.$listContainer.html(
      ejs.render(this.listTemplateHtml, {
        view: this.viewModel,
        data: this.data,
      })
    );
    this.bindListEvents(this);
  }

  async getFileContents(url) {
    return await $.get(url);
  }

  bindListEvents(data) {
    let that = this;
    $(`#${this.arrowCol}-${this.arrowDir}`).show();
    $(`th[data-name='${this.viewModel.list.columns[0].name}']`)
      .off('click')
      .on('click', (e) => {
        const dataName = $(e.currentTarget).attr('data-name');
        this.arrowCol = dataName;
        let curDirection = this.storage.options.sortDir;
        this.arrowDir = curDirection;
        if (that.storage.options.sortCol === dataName) {
          that.storage.options.sortDir = curDirection == 'asc' ? 'desc' : 'asc';
          that.storage.list();
        } else {
          that.storage.options.sortCol = dataName;
          that.storage.options.sortDir = curDirection == 'asc' ? 'desc' : 'asc';
          that.storage.list();
        }

        $(`#${dataName}-${this.curDirection}`).show();
        that.storage.options.sortCol = dataName;
        that.render();
      });

    for (let col of this.data) {
      $(`td[data-name='${col.name}']`).hover(function (e) {});
    }
  }

  createAlert(teamName) {
    let alert = `<div class="alert alert-info alert-dismissible shadow-lg rounded-3 fade show" role="alert">
                Team: ${teamName} deleted!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
    let $alert = $('#' + this.viewModel.alertContainerId);
    $alert.html(alert);
  }

  async bindWrapperEvents() {
    let that = this;
    let $deleteModal = $('#' + this.viewModel.deleteModalContainerId);

    let $itemDetail;
    let teamName;
    let coachName;
    let phoneNumber;
    let numPlayers;
    let teamId;
    $deleteModal.on('show.bs.modal', function (e) {
      // modal and yes button
      $itemDetail = $(e.relatedTarget.parentElement.nextSibling.parentElement);
      teamName = $itemDetail.attr('data-name');
      teamId = $itemDetail.attr('data-id');

      $('#deleteTxt').html(
        'Are you sure you want to delete team ' + teamName + '?'
      );

      let $yesBtn = $(
        e.currentTarget.childNodes[3].children[0].children[2].children[0]
      );

      $yesBtn.click(async function (d) {
        if (!that.deletedTeams.includes(teamId)) {
          await that.storage.delete(teamId);
        }
        that.createAlert(teamName);
        that.renderList();
      });
    });

    let $formModal = $('#' + this.viewModel.formModalContainerId);
    let updateModalId;
    let keysPressed = false;

    $formModal.on('show.bs.modal', function (e) {
      $itemDetail = $(e.relatedTarget.parentElement.nextSibling.parentElement);
      teamName = $itemDetail.attr('data-name');
      teamId = $itemDetail.attr('data-id');
      coachName = $itemDetail.attr('data-coach');
      phoneNumber = $itemDetail.attr('data-phone');
      numPlayers = $itemDetail.attr('data-numPlayers');

      console.log(teamId);

      updateModalId = teamId;
      // code to capture the form data
      let $teamBox = $(document.getElementById('teamName'));
      $teamBox.attr('value', teamName);

      let $coachBox = $(document.getElementById('coachName'));
      $coachBox.attr('value', coachName);

      let $phoneBox = $(document.getElementById('phoneNumber'));
      $phoneBox.attr('value', phoneNumber);

      let $playerBox = $(document.getElementById('numPlayers'));
      $playerBox.attr('value', numPlayers);

      $teamBox.change(function (e) {
        $('#teamName').attr('class', 'form-control is-valid');
      });
      $coachBox.change(function (e) {
        $('#coachName').attr('class', 'form-control is-valid');
      });
      $phoneBox.change(function (e) {
        $('#phoneNumber').attr('class', 'form-control is-valid');
      });
      $playerBox.change(function (e) {
        if (!isNaN($('#numPlayers').val())) {
          $('#numPlayers').attr('class', 'form-control is-valid');
        } else {
          $('#numPlayers').attr('class', 'form-control is-invalid');
        }
      });

      $teamBox.keyup(function (e) {
        keysPressed = true;
      });
      $coachBox.keyup(function (e) {
        keysPressed = true;
      });
      $phoneBox.keyup(function (e) {
        keysPressed = true;
      });
      $playerBox.keyup(function (e) {
        keysPressed = true;
      });
    });
    let $cancelSubmitBtn = $(document.getElementById('cancelSubmitBtn'));
    $cancelSubmitBtn.click(function (e) {
      let surePressed = false;
      if (keysPressed) {
        $('#sure-modal').modal('show'); //code to handle the "are you sure" stuff and after something has been typed
        $('#sureBtn').click(function (d) {
          surePressed = true;
          console.log(surePressed);
          if (surePressed) {
            $formModal.modal('hide');
          }
        });
      } else {
        $formModal.modal('hide');
      }
    });

    $('form').submit(function (e) {
      e.preventDefault();

      let idToAdd;
      //code to add a new team to the storage
      let formTeam = document.getElementById('teamName');
      let formCoach = document.getElementById('coachName');
      let formNumber = document.getElementById('phoneNumber');
      let formCount = document.getElementById('numPlayers');

      console.log(formCoach);

      if (isNaN(updateModalId)) {
        updateModalId = -1;
      }

      let updateTeam = {
        id: parseInt(updateModalId),
        name: formTeam.value,
        coach_id: formCoach.value,
        coachPhone: formNumber.value,
      };

      if (updateModalId != -1) {
        console.log('read');
        that.storage.update(updateModalId, updateTeam);
        that.render();
      } else if (updateModalId == -1) {
        console.log('create');
        that.storage.create(updateTeam);
        that.render();
      }
    });
    // reset button
    let $resetBtn = $(document.getElementById('resetView'));
    $resetBtn.click(function (f) {
      that.storage.list();
      that.deletedTeams = [];
      that.render();
    });

    // search stuff
    let $searchBox = $(document.getElementById('searchInput'));
    let eVar;
    $searchBox.on('input', async (e) => {
      eVar = e;
      let inText = e.target.value;
      if (inText.length > 1 || inText == '') {
        setTimeout(async () => {
          let options = {
            sortCol: 'name',
            sortDir: 'asc',
            filterCol: 'name',
            filterStr: inText,
            limit: 20,
            offset: 0,
          };
          await that.storage.list(options);
          that.renderList();
        }, 200);
      }
    });
    let $clearBtn = $(document.getElementById('clearSearch'));
    $clearBtn.on('click', (g) => {
      if (eVar != undefined) {
        eVar.target.value = '';
        let inText = eVar.target.value;
        if (inText.length > 1 || inText == '') {
          setTimeout(() => {
            that.storage.list();
            that.renderList();
          }, 200);
        }
      }
    });
  }
}
