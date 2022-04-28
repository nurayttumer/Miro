import signup from "../../pageObjects/signup";
import * as faker from "faker";

const signupPageObject = new signup();
Cypress.on("uncaught:exception", (err, runnable) => {
	return false; //in any case of exceptions
});

describe("Signup UI", function () {
	beforeEach(() => {
		cy.navigatingToMiroSignUp();   // it saves nearly 15+ seconds
	});
	//clearing cookies in support file for all cases
	describe("Signup Happy Path Cases", function () {
		it("signup successfully with valid data", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.internet.email());
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.checkYourEmailText().should("have.text", "Check your email");
		});

		it("signup successfully without subscription to updates", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.internet.email());
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.checkYourEmailText().should("have.text", "Check your email");
		});
	});
	describe("Signup Non Happy Path Cases", function () {
		it("without username", function () {
			cy.enteringWorkEmail(faker.internet.email());
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.nameErrorText().should("have.text", "Please enter your name.");
		});

		it("without email", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.emailErrorText().should("have.text", "Enter your email address.");
		});
		it("without password", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.internet.email());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.emptyPasswordText().should("have.text", "Enter your password.\n\t\t\t");
		});

		it("with weak password", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.internet.email());
			cy.enteringPassword(faker.random.alphaNumeric(2));
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.passwordErrorText().should("have.text", "Please use 8+ characters for secure password.");
		});

		it("with invalid workEmail", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.random.alphaNumeric(10));
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.emailErrorText().should("have.text", "Enter a valid email address.");
		});

		it("without miro terms and cond", function () {
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.internet.email());
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.termsErrorsText().should("have.text", "Please agree with the Terms to sign up.");
		});
	});
	describe("Change Language and Signup Cases", function () {
		it("set language as DE and check all localizations", function () {
			signupPageObject.changeLanguageButton().click();
			signupPageObject.pickDeAsLanguage().click();
			cy.checkLanguage();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.nameErrorText().should("have.text", "Bitte geben Sie Ihren Namen ein.");
			signupPageObject.getStartedNowButton().click();
			signupPageObject.emptyPasswordText().should("have.text", "Bitte geben Sie Ihr Passwort ein.\n\t\t\t");
			signupPageObject.getStartedNowButton().click();
			signupPageObject.emailErrorText().should("have.text", "Bitte geben Sie Ihre E-Mail-Adresse ein.");
			signupPageObject.getStartedNowButton().click();
			signupPageObject.termsErrorsText().should("have.text", "Bitte stimmen Sie den AGB's zu, um sich zu registrieren.");
			signupPageObject.getStartedNowButton().click();

		});

		it("signup successfully with valid data in DE", function () {
			signupPageObject.changeLanguageButton().click();
			signupPageObject.pickDeAsLanguage().click();
			cy.checkLanguage();
			cy.enteringName(faker.name.findName());
			cy.enteringWorkEmail(faker.internet.email());
			cy.enteringPassword(faker.internet.password());
			signupPageObject.agreeToTermsCB().click();
			signupPageObject.agreeToUpdatesCB().click();
			signupPageObject.getStartedNowButton().click();
			signupPageObject.checkYourEmailText().should("have.text", "Überprüfen Sie Ihre E-Mail");
		});

	});
});
