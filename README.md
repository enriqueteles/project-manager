
<br />
<p align="center">
  <h2 align="center">Project Manager</h2>

  <p align="center">
    Allows a product manager or engineer to post projects/products updates for the team to see. This helps the team to keep track of the timelines of each one of them and show the stakeholders the progress made.
  </p>
</p>

<br />

## Features
User
- Register new user
- Login (generate token)

Project (protected access)
- List projects
- Create project
- Update project
- Delete project

Project Log (protected access)
- List project logs
- Create project log
- Update project log
- Delete project log

<br />

### Install and execute
In order to run the API use the following commands:
```bash
cd api
yarn
yarn knex migrate:latest
yarn start
```
