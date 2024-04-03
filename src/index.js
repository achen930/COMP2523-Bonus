"use strict";

import fastify from "fastify";
import cors from "@fastify/cors";

import { buildServer } from "./server.js";

function main() {
  const app = fastify({
    logger: "pretty",
  });
  app.register(buildServer);
  app.register(cors, {});
  app.listen(
    {
      port: 3000,
    },
    (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
}

main();
