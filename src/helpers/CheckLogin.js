export const CheckLogin = (user, password, characters) => {
    console.log(characters);
    if(user) {
        if(characters.some(e => e.name === user)) {
            const character = characters.find(e => e.name === user);
            if(character.hair_color === password) {
                return character;
            }
        } else {
            return;
        }
    }
}
