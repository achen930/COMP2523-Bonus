"use strict";

import { randomUUID } from "crypto";

export const schema = `
  type Post {
    id: ID!
    title: String!
    content: String!
    tag: Tag!
  }

  input PostCreate {
    title: String!
    content: String!
    tagId: ID!
  }

  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
    getTags: [Tag!]!
    getPostsByTag(tagId: ID!): [Post!]!
  }

  type Mutation {
    createPost(newPost: PostCreate!): Post!
    deletePost(id: ID!): Post
    updatePost(id: ID!, title: String, content: String): Post
    createTag(name: String!): Tag!
  }

  type Tag {
    id: ID!
    name: String!
  }
`;

export const resolvers = {
  Query: {
    getPosts: (_parent, args, { app }) => {
      return app.db.posts;
    },
    getPost: (_parent, args, { app }) => {
      const { id } = args;
      return app.db.posts.find((post) => post.id === id);
    },
    getTags: (_parent, args, { app }) => {
      return app.db.tags;
    },
    getPostsByTag: (_parent, args, { app }) => {
      const { tagId } = args;
      const tag = app.db.tags.find(tag => tag.id === tagId);

      if (!tag) {
        return [];
      }

      return app.db.posts.filter(post => post.tagId === tagId);
    }
  },
  Mutation: {
    createPost: (_parent, { newPost }, { app }) => {
      const { title, content, tagId } = newPost;

      const tag = app.db.tags.find(tag => tag.id === tagId);
      if (!tag) {
        throw new Error("Tag not found");
      }

      const post = {
        id: randomUUID(),
        title,
        content,
        tag
      };
      app.db.posts.push(post);
      return post;
    },
    deletePost: (_parent, { id }, { app }) => {
      const post = app.db.posts.find((post) => post.id === id);
      if (post) {
        app.db.posts = app.db.posts.filter((post => post.id !== id));
      }
      return post;
    },
    updatePost: (_parent, args, { app }) => {
      const post = app.db.posts.find((post) => post.id === args.id);
      if (post) {
        if (args.title) {
          post.title = args.title;
        }
        if (args.content) {
          post.content = args.content;
        }
      }
      return post;
    },
    createTag: (_parent, { name }, { app }) => {
      const tag = {
        id: randomUUID(),
        name
      };
      app.db.tags.push(tag);
      return tag;
    }
  },
};

export const loaders = {};
