var mysql = require("mysql");
var config = require("config");

exports.getConnection = function (callback1, callback2, poolConfig) {
  const connectionString = config.get("db.default");
  const pool = mysql.createPool({ ...connectionString, ...poolConfig });

  pool.getConnection(function (err, connection) {
    runCallback(callback1, callback2, err, connection, pool);
  });
};

function runCallback(callback1, callback2, err, connection, pool) {
  if (callback1 instanceof Function) {
    callback1(err, connection, pool);
  } else if (callback2 !== null) {
    callback2(err, connection, pool);
  }
}
