class Signup {
	signupTitle() {
		cy.get(".signup__title-form");
		return cy.get(".signup__title-form");
	}

	nameField() { //data-testid="mr-form-signup-name-1"
		return cy.get('[data-testid=mr-form-signup-name-1]').click()
	}

	workEmailField() {  //data-testid="mr-form-signup-email-1"
		return cy.get('[data-testid=mr-form-signup-email-1]').click()
	}
	passwordField() { //data-testid="mr-form-signup-password-1"
		return cy.get('[data-testid=mr-form-signup-password-1]').click()
	}

	agreeToTermsCB() {
		return cy.get(
			":nth-child(1) > .mr-checkbox-1 > .mr-checkbox-1__wrap > .mr-checkbox-1__check > .mr-checkbox-1__icon"
		);
	}

	agreeToUpdatesCB() {
		return cy.get(
			".signup__checkbox-list > :nth-child(2) > .mr-checkbox-1 > .mr-checkbox-1__wrap > .mr-checkbox-1__check"
		);
	}

	checkYourEmailText() {
		return cy.get(".signup__title-form");
	}

	getStartedNowButton() {  //data-testid="mr-form-signup-btn-start-1"
		return cy.get('[data-testid=mr-form-signup-btn-start-1]')  //mr-form-signup-btn-start-1
		//cy.get(".signup__submit");
	}
	emailErrorText() {
		return cy.get("#emailError");
	}

	emptyPasswordText() {
		return cy.get(".js-empty-password");
	}

	nameErrorText() {
		return cy.get("#nameError");
	}

	passwordErrorText() {
		return cy.get("#password-hint > #signup-form-password");
	}
	termsErrorsText() {
		return cy.get("#termsError");
	}
	changeLanguageButton(){
		return cy.get('[data-testid=SwitcherButton]')
	}
	pickDeAsLanguage(){
		return cy.get('[data-testid=item-de]')
	}
}

export default Signup;
