Please change configuration in file /config/default.js

  module.exports =  {
   
    db: {

       default: {

          connectionLimit: 100,
 
          acquireTimeout: 20000,
 
          host: "localhost", <--- CHANGE
 
          user: "root", <--- CHANGE
 
          password: "1234", <--- CHANGE
 
          database: "task-tracker",
 
          debug: false,

          },
      }
    };

   After that, use sql script "task-tracker.sql"

   Swagger - "localhost:3001/api-docs"
