const baseUrl = "mongodb+srv://zorn01:NXtVbSiW67OfOdKQ@icesiadvancedweb.cfp8a.mongodb.net/comoVoy?retryWrites=true&w=majority";

const axios = require("axios");

"use strict";
const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
// require("sinon-mongoose");

const UserController = require("../../controller/userController");
const { find } = require("../../models/user");
require("../../models/user");
var express = require("express");
var router = express.Router();

var user1 = {
    id: "1",
    nombre: "User 1",
    contrasena: "1234",
    correo: "1@mail.com",
    promedioPonderado: 4.9,
    institucion: "Icesi",
};
var user2 = {
    id: "2",
    nombre: "User 2",
    contrasena: "5678",
    correo: "2@mail.com",
    promedioPonderado: 4.95,
    institucion: "Javeriana",
};
var users = [user1, user2];

describe("findAll when at least one user exists in the db", function() {
    it("Should return a list of all users", function(done) {
        var User = mongoose.model("User");
        var UserStub = sinon.stub(User, "find");
        UserStub.returns(users);
        var findAllResponse = axios.get(`${baseUrl}/`);
        // var findAllResponse = router.get("/", UserController.findAll);
        done();
        assert.equal(findAllResponse, users);
        assert.length(findAllResponse, users.length);
    });
});

describe("find a user by id when at least one user exists in the db", function() {
    it("Should return a single user", function(done) {
        var User = mongoose.model("User");
        var UserStub = sinon.stub(User, "findOne");
        UserStub.restore();
        UserStub.returns(user1);
        var findByIdResponse = axios.get(`${baseUrl}/1`);
        // var findAllResponse = router.get("/", UserController.findAll);
        done();
        assert.equal(findByIdResponse, user1);
    });
});

describe("find a user by email and password when at least one user exists in the db", function() {
    it("Should return a single user", function(done) {
        User = mongoose.model("User");
        var UserStub = sinon.stub(User, "findOne");
        UserStub.returns(user1);
        var findByIdResponse = axios.post(`${baseUrl}/login`);
        // var findAllResponse = router.get("/", UserController.findAll);
        done();
        assert.equal(findByIdResponse, user1);
    });
});

describe("adds a user to the db", function() {
    it("Should add a user", function(done) {
        var user3 = ({
            id: 3,
            nombre: "Sofia",
            contrasena: 12345,
            correo: "sofia@correo.com",
            institucion: "Icesi",
            promedioPonderado: 4.8,
        });
        user3.save
        var saveResponse = axios.post(`${baseUrl}/`);
        // var findAllResponse = router.get("/", UserController.findAll);
        done();
        assert.equal(saveResponse, "User created succesfully");
    });
});

describe("edits a user", function() {
    it("Should edit a single user", function(done) {
        var User = mongoose.model("User");
        var UserStub = sinon.stub(User, "findOneAndUpdate");
        UserStub.returns(user1);
        var editResponse = axios.put(`${baseUrl}/1`);
        // var findAllResponse = router.get("/", UserController.findAll);
        done();
        assert.equal(editResponse, user1.nombre + " was succesfully modified");
    });
});

describe("deletes a user", function() {
    it("Should delete a single user", function(done) {
        var User = mongoose.model("User");
        var UserStub = sinon.stub(User, "findOneAndDelete");
        UserStub.returns(user2);
        var deleteUser = axios.delete(`${baseUrl}/1`);
        // var findAllResponse = router.get("/", UserController.findAll);
        done();
        assert.equal(deleteUser, user.nombre + " was eliminated succesfully");
    });
});