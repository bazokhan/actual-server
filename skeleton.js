"use strict";

//---------//
// Imports //
//---------//

const Koa = require("koa");
const cors = require("@koa/cors");
const sqliteToRest = require("sqlite-to-rest");

//------//
// Init //
//------//

const dbPath = "./db.sqlite";
const getSqliteRouter = sqliteToRest.getSqliteRouter;
const PORT = 8085;

//------//
// Main //
//------//

const app = new Koa();

getSqliteRouter({ dbPath }).then(router => {
  app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(PORT);

  console.log(`Listening on port: ${PORT}`);
});