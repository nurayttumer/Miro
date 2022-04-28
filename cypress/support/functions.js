import signup from "../pageObjects/signup";
const pageObject = new signup();

Cypress.Commands.add("navigatingToMiroSignUp", () => {
	cy.visit("https://miro.com/signup/");
    pageObject.signupTitle().should("have.text", "Get started free today");
});

Cypress.Commands.add("enteringName", (Name) => {
    pageObject.nameField().clear();
    pageObject.nameField().type(Name);
});

Cypress.Commands.add("enteringWorkEmail", (workEmail) => {
	pageObject.workEmailField().clear();
	pageObject.workEmailField().type(workEmail);
});

Cypress.Commands.add("enteringPassword", (password) => {
	pageObject.passwordField().clear();
	pageObject.passwordField().type(password);
});

Cypress.Commands.add("checkLanguage", () => {
	pageObject.signupTitle().should("have.text", "Starte noch heute kostenlos");

});
