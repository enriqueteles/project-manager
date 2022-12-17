const knex = require('../database/connection');

require('dotenv/config');

module.exports = {
    async index(req, res) {
      const { projectId } = req.params;
      
      const logs = await knex('projectLogs')
        .where('projectId', projectId);

      return res.json(logs);
    },

    async create(req, res) {
      const { projectId } = req.params;
      
        const {
            description,
        } = req.body;

        if(!description)
           return res.send({ success: false, error: 'Missing description' });
             
        try {
            const log = {
                description,
                projectId,
                createdBy: req.user.id
            };

            const [id] = await knex('projectLogs').insert(log);

            return res.json({
                ...log,
                id
            });
        } catch (err) {
            console.log(err);
            return res.json({  success: false, error: err  });
        }
    },

    async update(req, res) {
        const { projectId, logId } = req.params;
        
        const {
            description,
        } = req.body;
            
        try {
            const log = {};
            if(description);
                log.description = description;
            
            const updated = await knex('projectLogs')
              .where('projectId', projectId)
              .where('id', logId)
              .update(log);

            if(updated == 0) {
                res.status(500).send({ success: false, error: `Project not found.` });
            }
            return res.status(201).json({
                ...log
            });
        } catch (e) {
            res.status(500).send({ success: false, error: e });
        }
    },

    async delete(req, res) {
      const { projectId, logId } = req.params;

      try {
        const deleted = await knex('projectLogs')
          .where('projectId', projectId)
          .where('id', logId)
          .delete();

        if(deleted == 0) {
            return res.status(500).send({ success: false, error: `Project not found.` });
        }

      return res.status(201).json({ success: true });
    } catch (e) {
      return res.status(500).send({ success: false, error: e });
    }
  }
}