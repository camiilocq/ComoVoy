//Import the UserController
const UserController = require("../controller/userController");

//Import the User schema
const User = require("../models/user");

describe('Database Integration Test', () => {

    beforeAll(async () => {
        await User.collection.drop();
    });


    describe("When the database is empty", () => {
        test("should add a new user to database", async () => {
            const user = await User.create({
                id: "id1",
                nombre: "user",
                contrasena: "password",
                correo: "user@user.com",
                promedioPonderado: 0.0,
                institucion: "institution"
            })
        });
    });
});