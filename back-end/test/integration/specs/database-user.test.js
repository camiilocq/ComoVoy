//Import Mongoose
const mongoose = require ('mongoose')
const url = "mongodb+srv://user:user@cluster0.jdobjlm.mongodb.net/?retryWrites=true&w=majority";

//Import the UserController
const UserController = require("../../../controller/userController");

//Import the User schema
const User = require("../../../models/user");

describe('Database Integration Test', () => {

    beforeAll(async () => {
        //Connect to DB
        await mongoose.connect(url);
        //await mongoose.createConnection(url).asPromise();
        await User.collection.drop();
    });


    describe("When the database is empty", () => {
        test("should add a new user to database", async () => {
            const addedUser = await User.create({
                id: "id1",
                nombre: "user",
                contrasena: "password",
                correo: "user@user.com",
                promedioPonderado: 0.0,
                institucion: "institution"
            });
            const foundUser = await User.findOne({id: "id1"})
            expect(addedUser.nombre).toEqual(foundUser.contrasena)
        });
    });
});