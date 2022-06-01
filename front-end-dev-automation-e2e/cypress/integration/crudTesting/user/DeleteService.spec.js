const uri = "localhost:3001/";
import user from "../../../fixtures/user.json";

describe("Given I want to create a new user", () => {
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

    cy.get("#mail").click().type(`${user.mail}`);
    cy.get("#password").click().type(`${user.password}`);
    cy.get("#btn-logIn").click();
  });

  it("Delete happy path", () => {
    //Act
    cy.get("#btn-user").click();
    cy.get("#delete").click();

    //assert
    cy.get("#image").should("exist");
  });
});
