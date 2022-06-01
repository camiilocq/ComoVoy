//Import Mongoose
const mongoose = require('mongoose')
const url = "mongodb+srv://user:user@cluster0.jdobjlm.mongodb.net/?retryWrites=true&w=majority";

//Import the UserController
const UserController = require("../../../controller/userController");

//Import the User schema
const User = require("../../../models/user");

//Valid User data
const userData = {
    id: "id1",
    nombre: "user",
    contrasena: "password",
    correo: "user@user.com",
    promedioPonderado: 0.0,
    institucion: "institution"
}

describe('Database Integration Test', () => {

    beforeAll(async () => {
        //Connect to DB
        await mongoose.connect(url);
    });

    beforeEach(async () => {
        //Drop collection
        await User.collection.drop();
    });

    afterAll(() => {
        //Disconnect from database
        mongoose.disconnect()
    });


    describe("When the database is empty", () => {
        test("should add a new user to database", async () => {
            const addedUser = await User.create(userData);
            const foundDocs = await User.collection.estimatedDocumentCount();
            expect(foundDocs).toEqual(1);
        });
    });

    describe("When there is an user in the db", () => {
        test("should retrieve the correct user", async () => {
            await User.create(userData);
            const foundUser = await User.findOne({ id: userData.id })
            expect(foundUser.id).toEqual(userData.id);
            expect(foundUser.nombre).toEqual(userData.nombre);
            expect(foundUser.contrasena).toEqual(userData.contrasena);
            expect(foundUser.correo).toEqual(userData.correo);
            expect(foundUser.promedioPonderado).toEqual(userData.promedioPonderado);
            expect(foundUser.institucion).toEqual(userData.institucion);
        });

        test("should update an user", async () => {
            await User.create(userData)
            const updatedData = {
                nombre: "usuario",
                contrasena: "contrasena",
                correo: "usuario@usuario.net",
                promedioPonderado: 5.0,
                institucion: "colegio"
            }
            User.up
            const updatedUser = await User.findOneAndUpdate({id : userData.id}, updatedData, {new: true});
            expect(userData.id).toEqual(updatedUser.id);
            expect(updatedUser.nombre).toEqual(updatedData.nombre);
            expect(updatedUser.contrasena).toEqual(updatedData.contrasena);
            expect(updatedUser.correo).toEqual(updatedData.correo);
            expect(updatedUser.promedioPonderado).toEqual(updatedData.promedioPonderado);
            expect(updatedUser.institucion).toEqual(updatedData.institucion);
        });

        test("should delete an user", async() => {
            await User.create(userData);
            await User.findOneAndDelete({id: userData.id});
            const foundDocs = await User.collection.estimatedDocumentCount();
            expect(foundDocs).toEqual(0);
        });
    });

});