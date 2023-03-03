const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: process.env.DB_INSTANCE_CLIENT_PATH });

const LEGACY_DB_CONFIG = {
  user: process.env.LEGACY_DB_USER,
  password: process.env.LEGACY_DB_PASSWORD,
  connectString: process.env.LEGACY_DB_CONNECTION_STRING,
};

const PAYMENTS_DB_CONFIG = {
  user: process.env.PAYMENTS_DB_USER,
  password: process.env.PAYMENTS_DB_PASSWORD,
  connectString: process.env.PAYMENTS_DB_CONNECTION_STRING,
};


const queryData = async (query, db) => {
  let conn;
  try {
    switch (db) {
      case "payments":
        conn = await oracledb.getConnection(PAYMENTS_DB_CONFIG);
        break;
      default:
        conn = await oracledb.getConnection(LEGACY_DB_CONFIG);
        break;
    }
    result = await conn.execute(query);
    conn.commit();
    return result;
  } catch (err) {
    console.log("Error==>" + err)
    return err
  } finally {
    if (conn) {
      try {
        conn.close();
      } catch (err) {
        console("Error==>" + err);
      }
    }
  }
}

module.exports = {
  queryData,
};
