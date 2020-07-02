const db = require("../db");

exports.getConnectionAsync = (poolConfig = {}) => getConnection(poolConfig);

exports.queryAsync = (connection, query, data = []) =>
  new Promise((resolve, reject) => {
    connection.query(query, data, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });

function getConnection(poolConfig) {
  return new Promise((resolve, reject) => {
    db.getConnection(
      (fail, connection, pool) =>
        fail ? reject(fail) : resolve({ connection, pool }),
      null,
      poolConfig
    );
  });
}
