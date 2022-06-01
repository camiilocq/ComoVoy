const User = require("../../../models/user");
const assert = require("assert");
const expect = require("chai").expect;

// const { fetchBooks, fetchBook, createBook } = require("./books");
describe("Begin model_create_user test: ", () => {
  describe("Invoke the create user method with correct parameters", () => {
    it("Should create a new user", (done) => {
      // Arrange
      const newUser = new User({
        id: "1",
        nombre: "User 1",
        contrasena: "1234",
        correo: "1@mail.com",
        promedioPonderado: 4.9,
        institucion: "Icesi",
      });

      newUser
        // Act
        .save()
        .then(() => {
          // Assert
          assert(!newUser.isNew);
          done();
        });
      done();
    });
  });

  describe("Invoke the create method on the user schema with an empty name", () => {
    it("Should throw an error", (done) => {
      // Arrange
      const newUser = new User({
        id: "1",
        contrasena: "1234",
        correo: "1@mail.com",
        promedioPonderado: 4.9,
        institucion: "Icesi",
      });

      // Assert
      expect(newUser.save()).to.throw;
      done();
    });
  });
});
