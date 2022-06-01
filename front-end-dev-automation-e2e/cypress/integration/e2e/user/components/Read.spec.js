const uri = "localhost:3001/";
import user from "../../../../fixtures/user.json";

describe("Given I want to log", () => {
  before(() => {
    //arrange y act
    cy.visit(uri);
  });

  it("Render test for /login to know if it reads", () => {
    //assert
    cy.get("#mail").should("exist");
    cy.get("#password").should("exist");
    cy.get("#btn-logIn").should("exist");
    cy.get("#image").should("exist");
  });
});

describe("Given I logged in", () => {
  before(() => {
    //arrange
    cy.visit(uri);
    cy.get("#btn-register").click();

    cy.get("#name").click().type(`${user.name}`);
    cy.get("#mail").click().type(`${user.mail}`);
    cy.get("#password").click().type(`${user.password}`);
    cy.get("#confirmPSW").click().type(`${user.password}`);
    cy.get("#institution").click().type(`${user.institution}`);
    cy.get("#conditions").click();

    cy.get("#register").click();
  });

  it("Render test for /home to know if it read", () => {
    //Act
    cy.get("#mail").click().type(`${user.mail}`);
    cy.get("#password").click().type(`${user.password}`);
    cy.get("#btn-logIn").click();

    //assert
    cy.get("#btn-user").should("exist");
  });
  after(() => {
    cy.get("#btn-user").click();
    cy.get("#delete").click();
  });
});
