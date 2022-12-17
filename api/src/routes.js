const express = require('express');

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const ProjectLogController = require('./controllers/ProjectLogController');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

routes.get('/project', UserController.auth, ProjectController.index);
routes.post('/project', UserController.auth, ProjectController.create);
routes.patch('/project/:id', UserController.auth, ProjectController.update);
routes.delete('/project/:id', UserController.auth, ProjectController.delete);

routes.get('/project/:projectId/log', UserController.auth, ProjectLogController.index);
routes.post('/project/:projectId/log', UserController.auth, ProjectLogController.create);
routes.patch('/project/:projectId/log/:logId', UserController.auth, ProjectLogController.update);
routes.delete('/project/:projectId/log/:logId', UserController.auth, ProjectLogController.delete);

module.exports =  routes;