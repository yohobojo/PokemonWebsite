/* RestStorageService Class template*/
/* Use this template as a starter and complete the items that say 'TODO' */
import StorageService from './storage_service.js';
import Utilities from '../util/utils.js';

export default class RestStorageService extends StorageService {
  constructor(entity, entitySingle, options = {}, host) {
    super(null, null, entity, entitySingle, options);
    this.host = host; //e.g, localhost:8080, from 'endPoint' in appViewModel
  }

  get apiName() {
    return this.entity;
  }
  get hostPrefix() {
    return `http://${this.host}`;
  }
  get apiUrl() {
    return `${this.hostPrefix}/${this.apiName}`;
  }
  get utils() {
    return new Utilities();
  }

  /* List function*/
  async list(options = this.options) {
    this.options = options;
    console.log(options);
    let url = `${this.apiUrl}/${this.utils.getQueryString(options)}`;

    try {
      const response = await fetch(url);
      this.data = [];
      this.data = await response.json();

      if (this.apiName == 'teams') {
        const peopleTableResponse = await fetch(`${this.hostPrefix}/people/`);
        let peopleTable = await peopleTableResponse.json();
        for (let i = 0; i < peopleTable.length; i++) {
          if (peopleTable[i].person_type == 'coach') {
            for (let j = 0; j < this.data.length; j++) {
              if (this.data[j].coach_id == peopleTable[i].id) {
                this.data[j].coach_name =
                  peopleTable[i].first_name + ' ' + peopleTable[i].last_name;
                this.data[j].phone = peopleTable[i].phone;
              }
            }
          }
        }
      }
      return this.data;
    } catch (msg) {
      console.log(msg);
      throw msg;
    }
  }

  async read(id) {
    try {
      let url = `${this.apiUrl}/${id}`;
      const response = await fetch(url);
      let singleTeamData = response.json();
      return singleTeamData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id, postData) {
    let response;
    let url;
    let posterData;
    let coachData;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == id) {
        posterData = this.data[i];
      }
    }

    posterData.name = postData.name;
    console.log(postData);
    console.log(posterData);
    url = `${this.apiUrl}/${id}`;
    response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(posterData),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async create(postData) {
    const peopleTableResponse = await fetch(`${this.hostPrefix}/people`);
    let peopleTable = await peopleTableResponse.json();
    for (let i = 0; i < peopleTable.length; i++) {
      if (
        peopleTable[i].first_name + ' ' + peopleTable[i].last_name ==
        postData.coachName
      ) {
        console.log('match');
        postData.coach_id = peopleTable[i].id;
      }
    }
    postData.id = this.data[this.data.length - 1].id + 1;
    postData.league_id = 1;

    let posterData = {
      id: postData.id,
      name: postData.name,
      coach_id: postData.coach_id,
      league_id: postData.league_id,
      notes: '',
      motto: '',
    };

    let postBody = JSON.stringify(posterData);

    let url = `${this.apiUrl}`;
    const response = await fetch(url, {
      method: 'POST',
      body: postBody,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async delete(id) {
    //TODO
    let url = `${this.apiUrl}/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });
  }

  async getLookup(lookupName) {
    let url = `${this.hostPrefix}/lookups/${lookupName}`;
    const response = await fetch(url);
    let peopleData = response.json();
    return peopleData;
  }
}
