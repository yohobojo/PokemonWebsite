module.exports = (app) => {
  const team = require('../controllers/team.controller.js');

  //put this code here from lookup.routes.js
  //no controller here, just made the sql call here to simplify.
  //Implemented Teams as well for later when we have a player form
  //Example call:   /lookups/coaches

  const sql = require('../models/db.js');

  app.get('/lookups/:lookupTable', async (req, res) => {
    try {
      let query = '';
      switch (req.params.lookupTable) {
        case 'people':
          query =
            "SELECT CONCAT(first_name, ' ', last_name) as label, id as value FROM people WHERE person_type='coach'";
          break;
        case 'teams':
          query = 'SELECT name as label, id as value FROM teams';
          break;
      }
      let result = await sql.query(query);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });

  app.post('/:table', team.validate('createTeam'), team.create);

  app.get('/:table', team.findAll);

  app.get('/:table/:id', team.findOne);

  app.put('/:table/:id', team.validate('updateTeam'), team.update);

  app.delete('/:table/:id', team.delete);

  app.delete('/:table', team.deleteAll);
};
