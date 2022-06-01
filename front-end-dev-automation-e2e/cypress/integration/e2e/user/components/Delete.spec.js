const uri = "localhost:3001/";
import user from "../../../../fixtures/user.json";

describe("Given I want to update", () => {
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

  it("Render test the update view", () => {
    //Act
    cy.get("#btn-user").click();

    //assert
    cy.get("#newName").should("exist");
    cy.get("#update").should("be.disabled");
    cy.get("#delete").should("be.enabled");
  });
  after(() => {
    cy.get("#delete").click();
  });
});
