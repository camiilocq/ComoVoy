const expect = require("chai").expect;
const axios = require("axios");
const User = require("../../models/user");
const mongoose = require("mongoose");
const baseUrl = " http://localhost:3000";

let response;

const UserController = require("../../controller/userController");
const { deleteOne } = require("../../models/user");

mongoose.Promise = global.Promise;
const MONGODB_URI =
    "mongodb+srv://zorn01:NXtVbSiW67OfOdKQ@icesiadvancedweb.cfp8a.mongodb.net/comoVoy?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI);

mongoose.connection
    .once("open", () => console.log("Connected!"))
    .on("error", (error) => {
        console.warn("Error : ", error);
    });

describe("Given I want to obtain the list of users", function() {

    it("Then it should have an OK status code", function(done) {
        // Assert
        response = axios.get(`${baseUrl}/`);
        done()
        expect(response.status).eql(200);
    });

    it("Then it should return users with their name ", function(done) {

        User.create({
                nombre: 'User 1',
                contrasena: "1234",
                correo: "1@mail.com",
                promedioPonderado: 4.9,
                institucion: "Icesi"
            })
            .save
        var u = User.findById(1)
        console.log("USER IN DB: " + u.nombre)
        response = axios.get(`${baseUrl}/users/`);
        done()
        const users = response;
        // const users = response.data[0];
        // console.log("RES: " + response[0])
        console.log("USER 0: " + users)
            // Assert
        expect(users).to.have.property("nombre");
    });
});


describe("Given I want to obtain a user by id", function() {
    it("Then it should return a single user", function(done) {
        var u = User.findById(1)
        var findByIdResponse = axios.get(`${baseUrl}/1`);
        done();
        expect(findByIdResponse).eql(200);
        assert.equal(findByIdResponse, u);
    });
});

describe("Given I want to obtain a user by email and password", function() {
    it("Then it should return a single user", function(done) {
        var u = User.findById(1)
        var findByIdAndEmailResponse = axios.post(`${baseUrl}/login`);
        done();
        expect(findByIdAndEmailResponse).eql(200);
        assert.equal(findByIdAndEmailResponse, u);
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
        done();
        expect(saveResponse).eql(200);
        assert.equal(saveResponse, "User created succesfully");
    });
});

describe("Given I want to edit a user", function() {
    it("Then it should edit a single user", function(done) {
        var u = User.findById(1)
        var editResponse = axios.put(`${baseUrl}/1`);
        done();
        assert.equal(editResponse, u.nombre + " was succesfully modified");
    });
});

describe("Given I want to delete a user", function() {
    it("Then it should delete a single user", function(done) {
        var u = User.findById(1)
        var deleteUserResponse = axios.delete(`${baseUrl}/1`);
        done();
        expect(deleteUserResponse).eql(200);
        assert.equal(deleteUserResponse, u.nombre + " was eliminated succesfully");
    });
});

let createdUser;