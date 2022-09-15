const League = require('../models/league.model.js');
const License_level = require('../models/license_level.model.js');
const Person = require('../models/person.model.js');
const Team = require('../models/team.model.js');
const { body, validationResult } = require('express-validator');

exports.validate = (method) => {
  let rules = [
    body('name', 'name cannot be empty').not().isEmpty().trim().escape(),
    body('notes').trim().escape(),
    body('coach_id').trim().escape(),
    body('league_id').trim().escape(),
    body('motto').trim().escape(),
  ];
  if (method == 'updateTeam') {
    return rules;
  } else if (method == 'createTeam') {
    //extra check
    return rules;
  }
};

exports.create = (req, res) => {
  let addVar;
  //handle team create
  if (req.params.table == 'teams') {
    addVar = new Team({
      id: req.body.id,
      name: req.body.name,
      coach_id: req.body.coach_id,
      league_id: req.body.league_id,
      notes: req.body.notes,
      motto: req.body.motto,
    });
    Team.create(addVar, req.params.table, (err, data) => {
      res.send(data);
    });
  }
  //handle league create
  else if (req.params.table == 'leagues') {
    addVar = new League({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    });
    Team.create(addVar, req.params.table, (err, data) => {
      res.send(data);
    });
  }
  //handle person create
  else if (req.params.table == 'people') {
    addVar = new Person({
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address1: req.body.address1,
      address2: req.body.address2,
      notes: req.body.notes,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      team_id: req.body.team_id,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      user_name: req.body.user_name,
      license_level_id: req.body.license_level_id,
      person_type: req.body.person_type,
    });
    Team.create(addVar, req.params.table, (err, data) => {
      res.send(data);
    });
  }
  //handle license_level create
  else if (req.params.table == 'license_levels') {
    addVar = new License_level({
      id: req.body.id,
      value: req.body.value,
      description: req.body.description,
    });
    Team.create(addVar, req.params.table, (err, data) => {
      res.send(data);
    });
  }
};

exports.findAll = (req, res) => {
  Team.getAll(req.params.table, req.query, (err, data) => {
    res.send(data);
  });
};

exports.findOne = (req, res) => {
  let id = req.params.id;
  Team.findById(id, req.params.table, req.query, (err, data) => {
    res.send(data);
  });
};

exports.update = (req, res) => {
  let id = req.params.id;
  let table = req.params.table;
  let addVar;
  if (table == 'teams') {
    addVar = new Team({
      name: req.body.name,
      coach_id: req.body.coach_id,
      league_id: req.body.league_id,
      notes: req.body.notes,
      motto: req.body.motto,
    });
    if (addVar.name == '' || addVar.name == null) {
      res.send(422);
      return;
    }
    Team.updateById(id, table, addVar, (err, data) => {
      res.send(data);
    });
  } else if (table == 'leagues') {
    addVar = new League({
      name: req.body.name,
      description: req.body.description,
    });
    if (addVar.name == '' || addVar.name == null) {
      res.send(422);
      return;
    }
    Team.updateById(id, table, addVar, (err, data) => {
      res.send(data);
    });
  } else if (table == 'people') {
    addVar = new Person({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address1: req.body.address1,
      address2: req.body.address2,
      notes: req.body.notes,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      team_id: req.body.team_id,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      user_name: req.body.user_name,
      license_level_id: req.body.license_level_id,
      person_type: req.body.person_type,
    });
    if (addVar.last_name == '' || addVar.last_name == null) {
      res.send(422);
      return;
    }
    Team.updateById(id, table, addVar, (err, data) => {
      res.send(data);
    });
  } else if (table == 'license_levels') {
    addVar = new License_level({
      value: req.body.value,
      description: req.body.description,
    });
    if (addVar.value == '' || addVar.value == null) {
      res.send(422);
      return;
    }
    Team.updateById(id, table, addVar, (err, data) => {
      res.send(data);
    });
  }
};

exports.deleteAll = (req, res) => {
  Team.removeAll(req.params.table, (err, data) => {
    res.send(data);
  });
};

exports.delete = (req, res) => {
  let id = req.params.id;
  Team.remove(id, req.params.table, (err, data) => {
    res.send(data);
  });
};
