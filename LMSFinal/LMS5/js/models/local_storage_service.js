/* Class LocalStorageService- a class for persistant CRUD in LocalStorage
Some tips on order of implementation:
1.  Implement Utility Functions (cloneObject(done), getItemIndex)
2.  Implement 'size' and 'list' getters
3.  Implement localStorage functions 'reset', 'clear', 'store', 'retrieve'
4.  Implement 'read', 'create', 'update', 'delete'
5.  Implement 'sort', 'filter'
*/
export default class LocalStorageService {
  'use strict';
  constructor(data, key, options) {
    this.origModel = data;
    this.key = key;

    //if data is NOT in local storage, init and sort using sortCol and sortDir from the model
    if (!this.retrieve()) {
      this.model = this.cloneObject(this.origModel); //get copy of data
      //   console.log(this.model);
      //this.sort(this.sortCol, this.sortDir, true); //apply default sort
      //   console.log(this.model);
      this.sort(options.sortCol, options.sortDir, true);
      //   console.log(this);
    }
  }
  //Getters
  get sortCol() {
    return this.model.sortCol;
  }
  set sortCol(col) {
    // console.log(col);
    this.model.sortCol = col;
  }
  get sortDir() {
    return this.model.sortDir;
  }
  set sortDir(dir) {
    this.model.sortDir = dir;
  }
  get size() {
    // console.log(this.model.list.size);
    return this.list.length;
    //double check this
    //TODO: should return the number of items in model.data
  }
  get list() {
    // console.log(this.data.data);
    //console.log(this.model);
    return this.model;
    //TODO: return the model.data array
  }
  // get data() {
  //     return this.model.origModel;
  // }
  // given in class maybe use it!!!

  //CRUD FUNCTIONS
  create(obj) {
    //this.store
    //push stuff
    //TODO
    //append new object to data store
    // persist in local storage by calling store()
    let newObj = this.cloneObject(obj);
    this.list.push(newObj);
    this.store();
  }
  read(getId) {
    //TODO: returns the item in the array with id=getId, null if it is not found
    return this.list[this.getItemIndex(getId)];
  }
  update(obj) {
    //TODO
    let index = this.getItemIndex(obj.id);
    this.list[index] = obj;
    this.store(obj);
    //find index of object in array
    //update object with new contents
    // persist in local storage by calling store()
  }

  delete(removeId) {
    //TODO
    //this.store
    //find index of object in array
    //remove object with specified id from model.data (splice?)
    // persist in local storage by calling store()
    let index = this.getItemIndex(removeId);
    // console.log(this.list[index]);
    this.list.splice(index, 1);
    this.store(this.model);
    // console.log(localStorage);
  }

  //LocalStorage Functions
  reset() {
    //TODO:
    //should clear local storage
    //should restore model from origModel
    //(use utility function 'cloneObject' at bottom of file)
    localStorage.clear();
    this.model = this.cloneObject(this.origModel);
    this.store(this.model);
  }
  clear() {
    localStorage.clear();
    //TODO: should clear local storage
  }
  //do store and retrieve first-ish
  store(data) {
    // console.log(JSON.stringify(this.model));
    localStorage.setItem('teamData', JSON.stringify(data));
    // console.log(localStorage);
    //TODO: should store your model in localStorage
  }
  retrieve() {
    //TODO
    //should retrieve your model from localStorage using this.key
    //If data retrieved from LocalStorage, updates this.model
    //hint:  remember to 'parse' the LocalStorage string value back into an object!
    //return true if model retrieved from localStorage, false if key wasn't found in localStorage
    return false; //returning false for now
  }

  //Sorting and Filtering Functions
  sort(col, direction, perm = false) {
    //console.log('sorting list...');
    // console.log(this.list);
    let copyVar = this.cloneObject(this.list);
    //console.log(copyVar);
    // console.log(copyVar);
    //if perm is true, setcol and setdir to col and direction
    //perm = false makes it so we do a copy and return the copy
    //TODO
    //returns a copy of the model.data (util func 'cloneArray'), sorted using the 'col' and 'direction' specifications (see index.html for example)
    // storageSvc.sort('name','asc')
    // if 'perm' param is set to true, you should update the internal model.data
    //with the sorted list, and call 'store' to store in local storage
    //also, store the sort col and direction in the 'app' portion of the model
    if (perm) {
      this.sortCol = col;
      this.sortDir = direction;
      //   console.log(this.sortCol, this.sortDir);
      this.list.sort((a, b) => {
        var nameA = direction == 'asc' ? a : b;
        var nameB = direction == 'asc' ? b : a;
        if (nameA[col] < nameB[col]) {
          return -1;
        }
        if (nameA[col] > nameB[col]) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
    copyVar.sort((a, b) => {
      var nameA = direction == 'asc' ? a : b;
      var nameB = direction == 'asc' ? b : a;
      // console.log(nameA, nameB);
      if (nameA[col] < nameB[col]) {
        return -1;
      }
      if (nameA[col] > nameB[col]) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    // console.log(copyVar);
    //console.log('List sorted!');
    //console.log(copyVar);
    return copyVar;
  }

  filter(filterObj) {
    let toDelete = [];
    //console.log(this.list);
    for (var i = 0; i < this.list.length; i++) {
      let teamKey = this.list[i]['name'].toLowerCase();
      //console.log(teamKey);
      var lowerFilterObj = filterObj.toLowerCase();
      if (filterObj == '') {
        this.reset();
        //console.log('empty string');
      } else {
        //console.log(teamKey);
        if (!teamKey.includes(lowerFilterObj)) {
          toDelete.push(this.list[i]);
          //console.log('deleting' + i);
        }
      }
    }
    for (var j = 0; j < toDelete.length; j++) {
      this.delete(toDelete[j]['id']);
    }
    //returns a copy of the filtered array
    //filterObj contains an object with all the key/value pairs you
    //will filter model.data with.
    //See MDN array 'filter' function documentation
    //Example call: storageSvc.filter({coachLicenseLevel:1,coachLast:"Jenson"});
  }

  //Utility functions-IMPLEMENT THESE FIRST
  getItemIndex(id) {
    // console.log(this.model.data);
    //this.model.data.findIndex((person)=>{return id==person.id});
    for (let i = 0; i < this.size; i++) {
      //   console.log(this.list);
      if (this.list[i].id == id) {
        // console.log(this.list[i]);
        return i;
      }
    }
    return -1;
    //TODO
    //return index of team with given id
    //see MDN array 'find(index?)' documentation
    //created separate function for this since multiple methods need to get the index of an item
  }
  cloneObject(obj) {
    // console.log(this);
    //util function for returning a copy of an object

    let textJSON = JSON.stringify(obj);
    // console.log(textJSON);
    let textJSONTest = JSON.parse(textJSON);
    // console.log(this);

    return JSON.parse(JSON.stringify(obj)); //giving you this one as of class on Feb 4
  }
}
