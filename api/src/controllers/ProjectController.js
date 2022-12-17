const knex = require('../database/connection');

require('dotenv/config');

module.exports = {
    async index(req, res) {
        const projects = await knex('projects');

        return res.json(projects);
    },

    async create(req, res) {
        const {
            name,
            description,
        } = req.body;
        
        if(!name)
            return res.send({ success: false, error: 'Missing name' });
             
        try {
            const project = {
                name,
                description,
                createdBy: req.user.id
            };

            const [id] = await knex('projects').insert(project);

            return res.json({
                ...project,
                id
            });

        } catch (err) {
            console.log(err);
            return res.json({  success: false, error: err  });
        }
        
    },

    async update(req, res) {
        const { id } = req.params;
        
        const {
            name,
            description,
            createdBy,
        } = req.body;
            
        try {
            const project = {};
            if(name);
                project.name = name;
            if(description);
                project.description = description;
            if(createdBy);
                project.createdBy = createdBy;
            
            const updated = await knex('projects')
                .where('id', id)
                .update(project);

            if(updated == 0) {
                res.status(500).send({ success: false, error: `Project not found.` });
            }
            return res.status(201).json({
                ...project
            });
        } catch (e) {
            res.status(500).send({ success: false, error: e });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
			const deleted = await knex('projects')
				.where('id', id)
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