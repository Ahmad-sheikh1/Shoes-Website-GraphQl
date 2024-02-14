const express = require("express");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");
const RegistrationModel = require("./Mongodb");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const ShoesData = require("./ShoesDataDB");
const Pend_Order = require("./OrderDB");
const resolvers = require("./resolvers")
const typeDefs = require("./Typedefs");
let pendo;
let newproduct;
let newuser;

const path = require("path")

async function Start() {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
    app.use(express.static("./dist"))

    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start()
    // Apply middleware to express app
    server.applyMiddleware({ app, path: '/graphql' });



    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"dist","index.html"));
    });

    app.listen(4000, () => {
        console.log("Server is listening on port 4000");
    });
}

Start();