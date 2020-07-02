module.exports = {
  db: {
    default: {
      connectionLimit: 100,
      acquireTimeout: 20000,
      host: "localhost",
      user: "root",
      password: "1234",
      database: "task-tracker",
      debug: false,
    },
  },
};
