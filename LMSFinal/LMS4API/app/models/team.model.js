const sql = require('./db.js');

const Team = function (team) {
  this.id = team.id;
  this.name = team.name;
  this.coach_id = team.coach_id;
  this.league_id = team.league_id;
  this.notes = team.notes;
  this.motto = team.motto;
};

Team.create = (addVar, table, res) => {
  return sql.query('INSERT INTO ' + table + ' SET ?', addVar).then((value) => {
    res(null, value);
  });
};

Team.findById = (id, table, query, res) => {
  let queryVar = 'SELECT * FROM ' + table + ' WHERE id = ' + id;
  if (query.filterCol && query.filterStr) {
    queryVar += ' AND ' + query.filterCol + " LIKE '%" + query.filterStr + "%'";
  }
  if (query.sortCol) {
    queryVar += ' ORDER BY ' + query.sortCol;
  }
  if (query.sortDir) {
    queryVar += ' ' + query.sortDir;
  }
  if (query.limit) {
    queryVar += ' LIMIT ' + query.limit;
  }
  if (query.offset) {
    queryVar += ' OFFSET ' + query.offset;
  }

  return sql.query(queryVar).then((value) => {
    res(null, value);
  });
};

Team.getAll = (table, query, res) => {
  let queryVar = 'SELECT * FROM ' + table;

  if (query.filterCol && query.filterStr) {
    queryVar +=
      ' WHERE ' + query.filterCol + " LIKE '%" + query.filterStr + "%'";
  }
  if (query.sortCol) {
    queryVar += ' ORDER BY ' + query.sortCol;
  }
  if (query.sortDir) {
    queryVar += ' ' + query.sortDir.split('/')[0];
  }
  if (query.limit) {
    queryVar += ' LIMIT ' + query.limit;
  }
  if (query.offset) {
    queryVar += ' OFFSET ' + query.offset;
  }
  return sql.query(queryVar).then((value) => {
    res(null, value);
  });
};

Team.updateById = (id, table, changeVar, res) => {
  if (table == 'teams') {
    return sql
      .query(
        'UPDATE ' +
          table +
          " SET name = '" +
          changeVar.name +
          "', coach_id = " +
          changeVar.coach_id +
          ', league_id = ' +
          changeVar.league_id +
          ", notes = '" +
          changeVar.notes +
          "', motto = '" +
          changeVar.motto +
          "' WHERE id = " +
          id
      )
      .then((value) => {
        res(null, value);
      });
  } else if (table == 'leagues') {
    return sql
      .query(
        'UPDATE ' +
          table +
          " SET name = '" +
          changeVar.name +
          "', description = '" +
          changeVar.description +
          "' WHERE id = " +
          id
      )
      .then((value) => {
        res(null, value);
      });
  } else if (table == 'license_levels') {
    return sql
      .query(
        'UPDATE ' +
          table +
          " SET value = '" +
          changeVar.value +
          "', description = '" +
          changeVar.description +
          "' WHERE id = " +
          id
      )
      .then((value) => {
        res(null, value);
      });
  } else if (table == 'people') {
    return sql
      .query(
        'UPDATE ' +
          table +
          " SET first_name = '" +
          changeVar.first_name +
          "', last_name = '" +
          changeVar.last_name +
          "', address1 = '" +
          changeVar.address1 +
          "', address2 = '" +
          changeVar.address2 +
          "', notes = '" +
          changeVar.notes +
          "', city = '" +
          changeVar.city +
          "', state = '" +
          changeVar.state +
          "', zip = '" +
          changeVar.zip +
          "', team_id = " +
          changeVar.team_id +
          ", email = '" +
          changeVar.email +
          "', phone = '" +
          changeVar.phone +
          "', password = '" +
          changeVar.password +
          "', user_name = '" +
          changeVar.user_name +
          "', license_level_id = " +
          changeVar.license_level_id +
          ", person_type = '" +
          changeVar.person_type +
          "' WHERE id = " +
          id
      )
      .then((value) => {
        res(null, value);
      });
  }
};

Team.removeAll = (table, res) => {
  return sql.query('DELETE FROM ' + table).then((value) => {
    res(null, value);
  });
};

Team.remove = (id, table, res) => {
  return sql
    .query('DELETE FROM ' + table + ' WHERE id = ' + id)
    .then((value) => {
      res(null, value);
    });
};

module.exports = Team;
