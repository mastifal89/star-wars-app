export const CheckLogin = (user, password, characters) => {
    console.log(characters);
    if(user) {
        if(characters.some(e => e.name === user)) {
            return characters.find(e => e.name === user)
        } else {
            return;
        }
    }
}
