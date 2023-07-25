const password_box = document.getElementById("password");
const gen_btn = document.querySelector(".generate-btn");

const pass_len = document.querySelector(".password-len");

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);
const uppercases = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const numbers = Array.from({ length: 10 }, (_, i) =>
  String.fromCharCode(48 + i)
);

const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "&",
  "*",
  "(",
  ")",
  "-",
  "+",
  "=",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  ",",
  ".",
  "/",
  "?",
  "<",
  ">",
  '"',
  "'",
  "^",
  "`",
  "~",
  "_",
];

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generatePassword = () => {
  let configuration = {
    letters: document.getElementById("letters").checked,
    uppercases: document.getElementById("uppercases").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
    length: document.getElementById("password-length").value,
  };

  let chars = [];
  let password = "";

  const {
    length,
    letters: withLetters,
    uppercases: withUppercases,
    numbers: withNumbers,
    symbols: withSymbols,
  } = configuration;

  if (withLetters || withUppercases || withNumbers || withSymbols) {
    while (chars.length < length) {
      withLetters && chars.length < length && chars.push(randomChoice(letters));
      withUppercases &&
        chars.length < length &&
        chars.push(randomChoice(uppercases));
      withNumbers && chars.length < length && chars.push(randomChoice(numbers));
      withSymbols && chars.length < length && chars.push(randomChoice(symbols));
    }

    while (password.length < length) {
      current_index = Math.floor(Math.random() * chars.length);
      password += chars[current_index];
      chars.splice(current_index, 1);
    }

    return password;
  }

  return "🤔";
};

password_box.value = generatePassword();

gen_btn.addEventListener(
  "click",
  () => (password_box.value = generatePassword())
);

password_box.addEventListener("click", () =>
  navigator.clipboard
    .writeText(password_box.value)
    .then(alert("Password copied to the clipboard"))
);

document
  .getElementById("password-length")
  .addEventListener(
    "input",
    () =>
      (pass_len.textContent = document.getElementById("password-length").value)
  );
