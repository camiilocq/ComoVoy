"use strict";
const express = require("express");
const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
// require("sinon-mongoose");

const UserController = require("../../../controller/userController");
require("../../../models/user");
// const { find } = require("../../../models/user");
// const UserModel = require("../../../models/user");
// require("./index.js");

var user1;
var user2;
var users = [user1, user2];
describe("Begin controller_read_user tests: ", () => {
  before(() => {
    // Arrange
    user1 = {
      id: "1",
      nombre: "User 1",
      contrasena: "1234",
      correo: "1@mail.com",
      promedioPonderado: 4.9,
      institucion: "Icesi",
    };
    user2 = {
      id: "2",
      nombre: "User 2",
      contrasena: "5678",
      correo: "2@mail.com",
      promedioPonderado: 4.95,
      institucion: "Javeriana",
    };
  });
  describe("findAll when at least one user exists in the db", function () {
    it("Should return a list of all users", function (done) {
      // Arrange
      var User = mongoose.model("User");
      sinon.stub(User, "find").returns(users);

      var res = httpMocks.createResponse();

      // Act
      var result = UserController.findAll({}, res, {});
      done();

      // Assert
      assert.equal(result, users);
      assert.length(result, users.length);
    });
  });

  describe("findbyId", function () {
    it("should return a user with the given id", function (done) {
      // Arrange
      var User = mongoose.model("User");
      sinon.stub(User, "findById").withArgs("1").returns(user1);

      var req = httpMocks.createRequest({ params: { userid: "1" } });
      var res = httpMocks.createResponse();

      // Act
      var result = UserController.findbyId(req, res, {});
      done();

      // Assert
      assert.deepEqual(result, user1);
    });
  });

  describe("When findByEmailAndPassword with user1 args", function () {
    it("should return a user with the given email and password", function (done) {
      // Arrange
      var User = mongoose.model("User");
      sinon.stub(User, "findOne").withArgs("1@mail.com").returns(user1);

      var req = httpMocks.createRequest({ body: { user1 } });
      var res = httpMocks.createResponse();

      // Act
      var result = UserController.findByEmailAndPassword(req, res, {});
      done();
      // console.log(result.nombre);

      // Assert
      assert.deepEqual(result, user1);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
