const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv/config');

module.exports = {
    async index(req, res) {
        const users = await knex('users');

        return res.json(users);
    },

    async register(req, res) {
        const { 
            email,
            password,
            name,
		} = req.body;

        if(!email)
		 	return res.send({ success: false, error: 'Missing email' });
		if(!password)
		 	return res.send({ success: false, error: 'Missing password' });
		if(!name)
		 	return res.send({ success: false, error: 'Missing name' });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = {
                email,
                password: hashedPassword,
                name
            }

            const [id] = await knex('users').insert(user);

            return res.json({
                ...user,
                id
            });


        } catch (err) {
            console.log(err);
            return res.json({  success: false, error: err  });
        }

    },

    async login(req, res) {
        const user = await knex('users').where('email', req.body.email).first();

        if(!user)
			return res.status(400).send({ success: false, error: 'User not found' })

        const userHashed = {
            id: user.id,
        }

        try {
			if(await bcrypt.compare(req.body.password, user.password)) {
				// authorizate user
				const token = jwt.sign(userHashed, process.env.ACCESS_TOKEN_SECRET);
				
				delete user.password;
				res.json({ ...user, token: token });
			} else {
				res.send({ success: false, error: 'Wrong password' });
			}
            
		} catch (e) {
			return res.status(500).send({ success: false, error: `${e}` })
		}
    },

    async auth(req, res, next) {
        if(!req.header('Authorization')) return res.status(401).send({ success: false, error: 'User not autenticated, please login' });

        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) return res.status(401).send({ success: false, error: 'Please login' });
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).send({ success: false, error: 'Invalid token' });   

            req.user = user;
            return next();
        })
    }

}