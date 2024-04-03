"use strict";

import fp from "fastify-plugin";

// Fake Seed Data for our FakeDB
export const posts = [
  {
    id: "a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0",
    title: "Why I love GraphQL",
    content: "End to End Typesafety is great.",
    tag: { id: "1", name: "graphql"}
  },
  {
    id: "b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1",
    title: "How to write a song",
    content: "Study music theory or have a natural ear for it.",
    tag: { id: "3", name: "music"}
  },
  {
    id: "c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2",
    title: "How to travel the world",
    content: "Start planning early and make sure you save up enough money",
    tag: { id: "4", name: "travel" }
  },
  {
    id: "d3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3",
    title: "How to travel to Asia",
    content:
      "Do research on which area in Asia you want to visit (ex - India, China, etc), and learn a bit of the local language, perhaps with Duolingo",
    tag: { id: "4", name: "travel" }
  },
  {
    id: "e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4",
    title: "How to travel to Iceland",
    content:
      "Traveling to Iceland is really cool, be sure to bring a good jacket or rent one while visiting.",
    tag: { id: "4", name: "travel" }
  },
];

export const tags = [
  { id: "1", name: "graphql" },
  { id: "2", name: "programming" },
  { id: "3", name: "music" },
  { id: "4", name: "travel" }
];

const db = {
  posts,
  tags
};
const DbPlugin = fp(function DbPlugin(fastify, opts, next) {
  fastify.log.info("Database loading...");
  fastify.decorate("db", db);
  fastify.log.info("Database loaded!");
  next();
});

export default DbPlugin;