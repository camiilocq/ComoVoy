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
describe("Begin controller_create_user tests: ", () => {
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
  describe("create an user with correct parameters", function () {
    it("should add send key", function () {
      // Act
      UserController.create({}, {}, () => {
        //Assert
        expect(res).to.have.property("send");
      });
    });
    it("Should create the new user", function (done) {
      // Arrange
      var req = httpMocks.createRequest({ body: { user1 } });
      var res = httpMocks.createResponse();
      var nextSpy = sinon.spy();
      var createdUser;

      // Act
      UserController.create(req, res, nextSpy);
      done();

      // Assert
      expect().not.to.throw;
      assert.equal(createdUser, user1);
      assert.isFalse(nextSpy.calledOnce);
    });
  });
  describe("create an user with missing parameters", function () {
    it("Should throw an error", function (done) {
      // Arrange
      var User = mongoose.model("User");
      var wrongReq = { body: { id: "1" } };
      sinon.stub(User, "findOne").withArgs(wrongReq).returns(true);
      var req = httpMocks.createRequest({ body: { user1 } });
      var res = httpMocks.createResponse();
      var nextSpy = sinon.spy();

      // Act
      expect(UserController.create(req, res, nextSpy)).to.throw;
      done();

      // Assert
      expect(nextSpy.calledOnce).to.be.true;
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
