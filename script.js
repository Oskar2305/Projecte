const users = [
    { picture: "public/assets/pfp.jpeg", pname: "Clara_Pixel", points: 361 },
    { picture: "public/assets/pfp.jpeg", pname: "Elena_99", points: 398 },
    { picture: "public/assets/pfp.jpeg", pname: "David_K", points: 342 },
    { picture: "public/assets/pfp.jpeg", pname: "Tom_Web", points: 195 },
    { picture: "public/assets/pfp.jpeg", pname: "Sofia_Dev", points: 315 },
    { picture: "public/assets/pfp.jpeg", pname: "WDG", points: 666 },
    { picture: "public/assets/pfp.jpeg", pname: "Marcus_V", points: 385 },
    { picture: "public/assets/pfp.jpeg", pname: "Emma_Sky", points: 220 },
    { picture: "public/assets/pfp.jpeg", pname: "Nadia_R", points: 274 },
    { picture: "public/assets/pfp.jpeg", pname: "Lucas_Gamer", points: 298 },
    { picture: "public/assets/pfp.jpeg", pname: "Nurundur", points: 999 },
    { picture: "public/assets/pfp.jpeg", pname: "Stanley", points: 427 },
    { picture: "public/assets/pfp.jpeg", pname: "Alex_Blade", points: 251 }
];

const RANKING = document.getElementById("ranking");

function buildRanking(users) {
    users.sort((a, b) => {
        if (a.points < b.points) {
            return 1;
        }

        if (a.position > b.position) {
            return -1;
        }

        return 0;
    });

    i = 1;

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

accounts = [
    { username: "Corvex", password: "1234" },
];

const errorMessages = {
    already_exists: "Aquest compte ja existeix",
    incorrect_password: "La contrasenya no es correcta",
    unexistent_user: "Aquest usuari no existeix",
    empty_inputs: "Els camps están buits"
};

function createAccount(user, pass) {
    const MESSAGE = document.getElementById("message");

    if (accounts.some(account => account.username === user)) {
        MESSAGE.textContent = errorMessages.already_exists;
        MESSAGE.style.display = "block";
    } else {
        accounts.push({ username: user, password: pass })
        MESSAGE.style.display = "none";
    }
}

function callCreateAccount() {
    const MESSAGE = document.getElementById("message");
    const USER_INPUT = document.getElementById("inp_user");
    const PASS_INPUT = document.getElementById("inp_passwd");

    user = USER_INPUT.value;
    pass = PASS_INPUT.value;

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