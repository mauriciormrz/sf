const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: process.env.DB_INSTANCE_CLIENT_PATH });

const DB_CONFIG = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};


const queryData = async (query) => {
  let conn;
  try {
    conn = await oracledb.getConnection(DB_CONFIG);
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
