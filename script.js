import { readUsers, saveUser, checkLogin } from "./databaseConnection.js";

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
        ARTICLE.innerHTML = `<div class="position"><p>${i}</p></div><div class="picture"><img src="public/assets/profile_pictures/${user.picture}"></div><div class="pname"><p>${user.pname}</p></div><div class="points"><p>${user.points}</p></div>`

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

const SINGIN_BUTTON = document.getElementById('btn_signin');
const LOGIN_BUTTON = document.getElementById('btn_login');

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

function showLoginScreen(screenId) {
    document.querySelectorAll('#menu_login .screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
};

document.getElementById("btn_logout").addEventListener("click", () => {
    currentUser = null;
    showLoginScreen("login_screen");
});

let currentUser = null;

function fillUserData(user) {
    const RANK = users.findIndex(u => u.pname === user.pname) + 1;

    document.getElementById("session_picture").src = user.picture;
    document.getElementById("session_name").textContent = user.pname;
    document.getElementById("session_points").textContent = `${user.points} pts`;

    document.getElementById("profile_picture").src = user.picture;
    document.getElementById("profile_name").textContent = user.pname;
    document.getElementById("profile_points").textContent = `${user.points} pts`;

    const PROFILE_RANK = document.getElementById("profile_rank");
    PROFILE_RANK.textContent = `(Rank #${RANK})`;

    PROFILE_RANK.classList.remove("first", "second", "third");
    if (RANK === 1) {
        PROFILE_RANK.classList.add("first");
    } else if (RANK === 2) {
        PROFILE_RANK.classList.add("second");
    } else if (RANK === 3) {
        PROFILE_RANK.classList.add("third");
    }
}

async function callLogin() {
    const MESSAGE = document.getElementById("message");
    const USER_INPUT = document.getElementById("inp_user");
    const PASS_INPUT = document.getElementById("inp_passwd");

    const username = USER_INPUT.value;
    const pass = PASS_INPUT.value;

    // 1. Comprueba campos vacíos
    if (username.trim() === "" || pass.trim() === "") {
        MESSAGE.textContent = errorMessages.empty_inputs;
        MESSAGE.style.display = "block";
        return;
    }

    // 2. Comprueba que el usuario exista
    const user = users.find(u => u.pname === username);
    if (!user) {
        MESSAGE.textContent = errorMessages.unexistent_user;
        MESSAGE.style.display = "block";
        return;
    }

    // 3. Comprueba la contraseña (en supabase)
    let passHash = await hashPassword(pass);
    const valid = await checkLogin(username, passHash);
    if (!valid) {
        MESSAGE.textContent = errorMessages.incorrect_password;
        MESSAGE.style.display = "block";
        return;
    }

    // 4. Actualiza toda la info a la del usuario que está iniciando sesión y muestra el miniperfil
    currentUser = user;
    fillUserData(user);
    MESSAGE.style.display = "none";
    USER_INPUT.value = "";
    PASS_INPUT.value = "";
    showLoginScreen("session_screen");
}

LOGIN_BUTTON.addEventListener("click", callLogin);