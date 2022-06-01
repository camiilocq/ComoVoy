const uri = "localhost:3001/";
import user from "../../../../fixtures/user.json";

describe("Given I want to create a new user", () => {
  before(() => {
    //arrange
    cy.visit(uri);
  });

  it("User form renders ok", () => {
    //Act
    cy.get("#btn-register").click();

    //assert
    cy.get("#name").should("exist");
    cy.get("#mail").should("exist");
    cy.get("#password").should("exist");
    cy.get("#confirmPSW").should("exist");
    cy.get("#institution").should("exist");
    cy.get("#conditions").should("not.to.be.checked");
    cy.get("#register").should("be.disabled");
  });
});
