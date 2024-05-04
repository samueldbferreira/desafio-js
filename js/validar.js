//criando os objetos dos elementos de texto do form
const nome = document.querySelector("#inputName");
const ano = document.querySelector("#inputYear");
const email = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");

function showInputError(helpSelector, errorMessage) {
	const inputHelp = document.querySelector(helpSelector);

	inputHelp.textContent = errorMessage;
	inputHelp.style.color = "red";
}

function hideInputError(helpSelector) {
	const inputHelp = document.querySelector(helpSelector);

	inputHelp.textContent = "";
}

function validateName() {
	const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

	const enteredName = nome.value.trim();
	if (enteredName.match(regexNome) === null) {
		showInputError("#inputNameHelp", "Formato de nome inválido");
		return false;
	}

	const nameWithoutSpace = enteredName.replace(" ", "");
	if (nameWithoutSpace.length <= 6) {
		showInputError(
			"#inputNameHelp",
			"O nome deve possuir mais de 6 caracteres."
		);
		return false;
	}

	hideInputError("#inputNameHelp");
	return true;
}

function validateBirthYear() {
	const enteredYear = ano.value.trim();

	const regexAno = /^[0-9]{4}$/;
	if (enteredYear.match(regexAno) === null) {
		showInputError("#inputYearHelp", "Formato de ano inválido");
		return false;
	}

	const intBirthYear = parseInt(enteredYear);
	if (intBirthYear < 1900) {
		showInputError(
			"#inputYearHelp",
			"Ano inválido. O ano não pode ser menor que 1900."
		);
		return false;
	}
	if (intBirthYear > 2022) {
		showInputError(
			"#inputYearHelp",
			"Ano inválido. O ano não pode ser maior que 2022."
		);
		return false;
	}

	hideInputError("#inputYearHelp");
	return true;
}

function validateEmail() {
	const enteredEmail = email.value.trim();

	const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
	if (enteredEmail.match(emailRegex) === null) {
		showInputError("#inputEmailHelp", "Email inválido.");
		return false;
	}

	hideInputError("#inputEmailHelp");
	return true;
}

function showPasswordSecurityLevel(password) {
	const passwordLength = password.length;
	const upperCharsCount = password.match(/[A-Z]/g)?.length || 0;
	const specialCharsCount = password.match(/\W/g)?.length || 0;
	const digitsCount = password.match(/\d/g)?.length || 0;

	let securityLevel = "Fraca";
	let securityValue = "10";

	if (passwordLength > 8 && upperCharsCount >= 1) {
		securityLevel = "Moderada";
		securityValue = "20";
	}

	if (
		passwordLength > 12 &&
		specialCharsCount > 1 &&
		digitsCount > 1 &&
		upperCharsCount > 1
	) {
		securityLevel = "Forte";
		securityValue = "30";
	}

	const passwordLevelMeter = document.querySelector("#passStrengthMeter");
	passwordLevelMeter.setAttribute("value", securityValue);

	const passwordHelp = document.querySelector("#inputPasswordHelp");
	passwordHelp.textContent = `Senha ${securityLevel}`;
	passwordHelp.style.color = "#6c757d";
}

function validatePassword() {
	const enteredPassword = password.value.trim();

	if (enteredPassword.length < 6 || enteredPassword.length > 20) {
		showInputError(
			"#inputPasswordHelp",
			"Senha inválida. Deve conter de 6 a 20 caracteres."
		);
		return false;
	}

	const passwordRegex = /(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/;
	if (enteredPassword.match(passwordRegex) === null) {
		showInputError(
			"#inputPasswordHelp",
			"Senha inválida. Deve conter pelo menos um número e um caractere especial."
		);
		return false;
	}

	const [firstName, lastName] = nome.value
		.split(" ")
		.map((n) => n.toLowerCase());
	const lowerCasePassword = enteredPassword.toLowerCase();
	if (
		(firstName && lowerCasePassword.includes(firstName)) ||
		(lastName && lowerCasePassword.includes(lastName))
	) {
		showInputError(
			"#inputPasswordHelp",
			"Senha inválida. Não deve conter seu nome ou sobrenome."
		);
		return false;
	}

	if (ano.value && lowerCasePassword.includes(ano.value)) {
		showInputError(
			"#inputPasswordHelp",
			"Senha inválida. Não deve conter o seu ano de nascimento."
		);
		return false;
	}

	hideInputError("#inputPasswordHelp");
	showPasswordSecurityLevel(enteredPassword);

	return true;
}

nome.addEventListener("focusout", validateName);
ano.addEventListener("focusout", validateBirthYear);
password.addEventListener("focusout", validatePassword);
email.addEventListener("focusout", validateEmail);

const form = document.querySelector("#singleForm");
const inputResult = document.querySelector("#inputResult");

form.addEventListener("submit", () => {
	if (
		validateName() &&
		validateBirthYear() &&
		validateEmail() &&
		validatePassword()
	) {
		inputResult.style.color = "#6c757d";
		inputResult.textContent = "Parabéns! Seus dados foram registrados.";
		return;
	}

	inputResult.textContent = "Preencha todos os dados corretamente.";
	inputResult.style.color = "red";
});
