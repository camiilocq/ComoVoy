import { provider } from '../config/init-pact';
import { Matchers } from "@pact-foundation/pact";
import axios from "../../../src/config/axios";

describe('User Service', () => {

    beforeAll(async () => {
        await provider.setup();
        // here we will add the contract
    });

    afterAll(() => provider.finalize());

    describe('When a request to list all users is made', () => {
        beforeEach(async () => {
            await provider.addInteraction({
                uponReceiving: "a request to list all users",
                state: "has users",
                withRequest: {
                    method: "GET",
                    path: "/users/"
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        id: Matchers.like("id"),
                        nombre: Matchers.like("nombre"),
                        contrasena: Matchers.like("contrasena"),
                        correo: Matchers.like("correo@correo.com"),
                        promedioPonderado: Matchers.decimal(),
                        institucion: Matchers.like("institucion")
                    }),
                },
            });
        });

        test('should return the users list', async () => {
            const response = await axios.get("/users/");
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

    });

    describe('When a request to list an user is made', () => {
        beforeEach(async () => {
            await provider.addInteraction({
                uponReceiving: "a request to list an user",
                state: "has users",
                withRequest: {
                    method: "GET",
                    path: "/users/id"
                },
                willRespondWith: {
                    status: 200,
                    body: {
                        id: Matchers.like("id"),
                        nombre: Matchers.like("nombre"),
                        contrasena: Matchers.like("contrasena"),
                        correo: Matchers.like("correo@correo.com"),
                        promedioPonderado: Matchers.decimal(),
                        institucion: Matchers.like("institucion")
                    },
                },
            });
        });

        test('should return the asked user', async () => {
            const response = await axios.get("/users/id");
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

    });

    describe('When a request to login is made', () => {
        beforeEach(async () => {
            await provider.addInteraction({
                uponReceiving: "a request to login",
                state: "has users",
                withRequest: {
                    method: "POST",
                    path: "/users/login",
                    body: {
                        correo: Matchers.like("correo@correo.com"),
                        contrasena: Matchers.like("contrasena")
                    }
                },
                willRespondWith: {
                    status: 200,
                    body: {
                        id: Matchers.like("id"),
                        nombre: Matchers.like("nombre"),
                        contrasena: Matchers.like("contrasena"),
                        correo: Matchers.like("correo@correo.com"),
                        promedioPonderado: Matchers.decimal(),
                        institucion: Matchers.like("institucion")
                    },
                },
            });
        });

        test('should return an user', async () => {
            const response = await axios.post("/users/login", {
                correo: "correo",
                contrasena: "contrasena"
            });
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

    });

    describe('When a request to add an user is made', () => {
        beforeEach(async () => {
            await provider.addInteraction({
                uponReceiving: "a request to add an user",
                state: "has users",
                withRequest: {
                    method: "POST",
                    path: "/users/",
                    body: {
                        nombre: Matchers.like("nombre"),
                        contrasena: Matchers.like("contrasena"),
                        correo: Matchers.like("correo@correo.com"),
                        promedioPonderado: Matchers.decimal(),
                        institucion: Matchers.like("institucion")
                    }
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.like("Created String")
                },
            });
        });

        test('should notify an user is added', async () => {
            const response = await axios.post("/users/", {
                nombre: "nombre",
                contrasena: "contrasena",
                correo: "correo",
                promedioPonderado: 3.1,
                institucion: "institucion"
            });
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

    });

    describe('When a request to update an user is made', () => {
        beforeEach(async () => {
            await provider.addInteraction({
                uponReceiving: "a request to update an user",
                state: "has users",
                withRequest: {
                    method: "PUT",
                    path: "/users/id",
                    body: {
                        id: Matchers.like("id"),
                        nombre: Matchers.like("nombre"),
                        contrasena: Matchers.like("contrasena"),
                        correo: Matchers.like("correo@correo.com"),
                        promedioPonderado: Matchers.decimal(),
                        institucion: Matchers.like("institucion")
                    }
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.like("Updated String")
                },
            });
        });

        test('should notify an user is updated', async () => {
            const response = await axios.put("/users/id", {
                id: "id",
                nombre: "nombre",
                contrasena: "contrasena",
                correo: "correo",
                promedioPonderado: 3.1,
                institucion: "institucion"
            });
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

    });
    describe('When a request to delete an user is made', () => {
        beforeEach(async () => {
            await provider.addInteraction({
                uponReceiving: "a request to delete an user",
                state: "has users",
                withRequest: {
                    method: "DELETE",
                    path: "/users/id",
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.like("Deleted String")
                },
            });
        });

        test('should notify the user deletion', async () => {
            const response = await axios.delete("/users/id", {
                id: "id",
                nombre: "nombre",
                contrasena: "contrasena",
                correo: "correo",
                promedioPonderado: 3.1,
                institucion: "institucion"
            });
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

    });
});
