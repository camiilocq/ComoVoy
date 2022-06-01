"use strict";
require("../../../models/user");
const UserController = require("../../../controller/userController");
const mongoose = require("mongoose");
const expect = require("chai").expect;
const assert = require("chai").assert;
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");

var user1;
var user2;
describe("Begin controller_update_user tests: ", () => {
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
  describe("update an user with correct parameters", function () {
    it("should add send key", function () {
      // Act
      UserController.update({}, {}, () => {
        //Assert
        expect(res).to.have.property("send");
      });
    });
    it("Should update user 1 with values from user2", function (done) {
      // Arrange
      user2.id = "1";
      var User = mongoose.model("User");
      sinon.stub(User, "findOneAndUpdate").withArgs().returns(user2);
      var req = httpMocks.createRequest({ body: { user2 } });
      var res = httpMocks.createResponse();

      // Act
      var updatedUser = UserController.update(req, res, {});
      done();
      // Assert
      assert.deepEqual(result, user1);
    });
  });

  describe("update an user with missing parameters", function () {
    it("Should throw an error", function (done) {
      var User = mongoose.model("User");
      sinon.stub(User, "findOne").withArgs(wrongReq).returns(true);
      // var req = httpMocks.createRequest({ body: { user1 } });
      var res = httpMocks.createResponse();
      var wrongReq = { body: { id: "1" } };

      expect(UserController.create(wrongReq, res, {})).to.throw;
      done();
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
