# Express server

Express CRUD server. It is configured to run at localhost:3000.

# Start

To run the project, run `yarn` to install all the dependencies and
`yarn dev` to start the server.

# Available routes

- GET "`base_url`/projects"  
  Get all existing projects

- POST "`base_url`/projects"  
  Add new project  
  body: {  
  "id": Number,  
  "title": String  
  }

- POST "`base_url`/projects/:id/tasks  
  Create new task for specific project  
  params: :id / project id  
  body: {"title": String }

- PUT "`base_url`projects/:id"  
  Edit project's title  
  params: :id / project id  
  body: { "title": String }

* DELETE "`base_url`/projects/:id"  
  Remove project with given id  
  params: :id / project id

# Middlewares

- projectExists  
  Check if project with given id exists, if not return error 400.

- logRequests  
  Count how many requisitions were made and log on console.
