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
        await saveUser(username, pass);
        users = await readUsers();
        buildRanking(users);
        MESSAGE.style.display = "none";
        // Conseguir que se actualice el ranking cuando se añade un usuario.
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

const LOGIN_BUTTON = document.getElementById('btn_login');
const SINGIN_BUTTON = document.getElementById('btn_signin');

SINGIN_BUTTON.addEventListener("click", callCreateAccount);

buildRanking(users);

const menuPanels = {
    btn_inici: 'content',
    btn_perfil: 'profile',
    btn_ranking: 'ranking_page',
    btn_informacio: 'informacio',
    btn_credits: 'credits'
};

function showPanel(buttonId) {
    for (const [btnId, panelId] of Object.entries(menuPanels)) {
        document.getElementById(btnId).classList.remove('active');
        document.getElementById(panelId).classList.remove('active');
    }

    document.getElementById(buttonId).classList.add('active');
    document.getElementById(menuPanels[buttonId]).classList.add('active');
}
for (const buttonId of Object.keys(menuPanels)) {
    document.getElementById(buttonId).addEventListener('click', () => {
        showPanel(buttonId);
    });
}
