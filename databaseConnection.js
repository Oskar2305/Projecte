import { createClient } from './node_modules/@supabase/supabase-js/dist/index.mjs';

const supabaseUrl = 'https://eqnojuxynuokpiwzcuwd.supabase.co';
const supabaseKey = 'sb_publishable_L_-xNh4JAAFyzq8j2hCASA_V1eaYLbA';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'hopeQuest' }
});

export async function readUsers() {
    const { data: accounts, error } = await supabase
        .from('Compte')
        .select('fotoPerfil, nomCompte, punts')

    if (error) {
        console.error('Error, no data found.')
        return
    }

    let users = [
        { picture: "public/assets/pfp.jpeg", pname: "WDG", points: 666 },
    ];

    accounts.forEach(account => {
        let newUser = { picture: account.fotoPerfil, pname: account.nomCompte, points: account.punts };
        users.push(newUser);
    });

    return users;
}

export async function saveUser(user, pass) {
    const { data, error } = await supabase
        .from('Compte')
        .insert([
            {
                nomCompte: user,
                password: pass,
                punts: 0,
                fotoPerfil: "public/assets/pfp.jpeg"
            }
        ]);

    if (error) {
        console.error('Error, unavailable username.');
        return;
    }

    return;
}
