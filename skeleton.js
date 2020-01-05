"use strict";

//---------//
// Imports //
//---------//

const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const cors = require("@koa/cors");
const sqliteToRest = require("sqlite-to-rest");

fs.copyFileSync(
  path.resolve(process.env.DB_PATH, "./db.sqlite"),
  "./db.sqlite"
);

//------//
// Init //
//------//

const dbPath = process.env.NODE_DB_PATH;
// const dbPath = path.resolve("./db.sqlite");
// console.log(dbPath);
const getSqliteRouter = sqliteToRest.getSqliteRouter;
const PORT = 8085;

//------//
// Main //
//------//

const app = new Koa();

getSqliteRouter({ dbPath }).then(router => {
  // console.log(
  //   router.stack
  //     .filter(layer => layer.path === "/transactions")
  //     .find(layer => layer.methods.includes("GET"))
  //     .stack.toString()
  // );
  app
    .use(
      cors({
        exposeHeaders: "content-range"
      })
    )
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(PORT);

  console.log(`Listening on port: ${PORT}`);
});
