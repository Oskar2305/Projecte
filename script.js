import { readUsers, saveUser } from "./databaseConnection.js";

const RANKING = document.getElementById("ranking");

let users = await readUsers();

function buildRanking(users) {
    const ARTICLES = document.querySelectorAll("article");

    ARTICLES.forEach(article => {
        article.remove();
    });

    users.sort((a, b) => {
        if (a.points < b.points) {
            return 1;
        }

        if (a.points > b.points) {
            return -1;
        }

        return 0;
    });

    let i = 1;

    users.forEach(user => {
        const ARTICLE = document.createElement('article');

        ARTICLE.classList.add('ranking_user');
        ARTICLE.innerHTML = `<div class="position"><p>${i}</p></div><div class="picture"><img src="${user.picture}"></div><div class="pname"><p>${user.pname}</p></div><div class="points"><p>${user.points}</p></div>`

        if (i == 1) {
            ARTICLE.classList.add('first');
        } else if (i == 2) {
            ARTICLE.classList.add('second');
        } else if (i == 3) {
            ARTICLE.classList.add('third');
        }

        RANKING.append(ARTICLE);
        i++;
    });
}

const errorMessages = {
    already_exists: "Aquest compte ja existeix",
    incorrect_password: "La contrasenya no es correcta",
    unexistent_user: "Aquest usuari no existeix",
    empty_inputs: "Els camps están buits"
};

async function createAccount(username, pass) {
    const MESSAGE = document.getElementById("message");

    if (users.some(user => user.pname === username)) {
        MESSAGE.textContent = errorMessages.already_exists;
        MESSAGE.style.display = "block";
    } else {
        let passHash = await hashPassword(pass);
        await saveUser(username, passHash);
        users = await readUsers();
        buildRanking(users);
        MESSAGE.style.display = "none";
    }
}

function callCreateAccount() {
    const MESSAGE = document.getElementById("message");
    const USER_INPUT = document.getElementById("inp_user");
    const PASS_INPUT = document.getElementById("inp_passwd");

    let user = USER_INPUT.value;
    let pass = PASS_INPUT.value;

    if (user.trim() === "" || pass.trim() === "") {
        MESSAGE.textContent = errorMessages.empty_inputs;
        MESSAGE.style.display = "block";
        return;
    }

    createAccount(user, pass);
}

async function hashPassword(password) {
    // Convierte el texto a bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Genera el hash SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convierte los bytes a texto hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}


const LOGIN_BUTTON = document.getElementById('btn_login');
const SINGIN_BUTTON = document.getElementById('btn_signin');

SINGIN_BUTTON.addEventListener("click", callCreateAccount);

buildRanking(users);
