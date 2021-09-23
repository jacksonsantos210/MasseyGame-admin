export const TOKEN_KEY = "@mad:token";
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
console.log(isAuthenticated());
