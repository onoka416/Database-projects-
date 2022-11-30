import { createConnection } from "mysql2";
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../utils/config.js";
import { SCHEMA } from "./schema.js";
import { DATA } from "./data.js";
import { FLIGHT_DATE_DATA } from "./flight_date_data.js";
import { STORED_OBJECTS } from "./stored_objects.js";
import { separateSqlCommands } from "./parser.js";

class Database {
  constructor() {
    this.db = createConnection({
      host: "localhost",
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });
  }

  connect = () => {
    var that = this;
    return new Promise((resolve, reject) => {
      that.db
        .promise()
        .connect()
        .then((res) => {
          resolve();
        })
        .catch((err) => reject());
    });
  };

  executeQuery = (sqlQuery, params) => {
    var that = this;
    return new Promise((resolve, reject) => {
      that.db
        .promise()
        .query(sqlQuery, params)
        .then((res) => {
          resolve({ data: res[0] });
        })
        .catch((error) => {
          reject({ error: error.message });
        });
    });
  };

  importSchema = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlSchema = separateSqlCommands(SCHEMA);
        for (let i = 0; i < sqlSchema.length; i++)
          await db.executeQuery(sqlSchema[i]);

        resolve();
      } catch (err) {
        reject();
      }
    });
  };

  importData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlData = separateSqlCommands(DATA);
        for (let i = 0; i < sqlData.length; i++)
          await db.executeQuery(sqlData[i]);

        resolve();
      } catch (err) {
        reject();
      }
    });
  };

  importStoredObjects = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlStoredObjects = separateSqlCommands(STORED_OBJECTS);
        for (let i = 0; i < sqlStoredObjects.length; i++)
          await db.executeQuery(sqlStoredObjects[i]);

        resolve();
      } catch (err) {
        reject();
      }
    });
  };

  importFlightDateData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sqlFlightDateData = separateSqlCommands(FLIGHT_DATE_DATA);
        for (let i = 0; i < sqlFlightDateData.length; i++)
          await db.executeQuery(sqlFlightDateData[i]);

        resolve();
      } catch (err) {
        reject();
      }
    });
  };

  init = async () => {
    console.log("Connecting to DB...");
    await this.connect();
    console.log("Connected to DB! Importing Data...");
    // await this.importSchema();
    // await this.importData();
    // await this.importStoredObjects();
    // await this.importFlightDateData();
    console.log("Data Imported!");
  };
}

const db = new Database();
export default db;
