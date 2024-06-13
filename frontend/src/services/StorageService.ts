const ACCESS = "access_key";

export const saveToken = (token: string) => {
    localStorage.setItem(ACCESS, token);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS);
};

export const removeToken = () => {
    if (!localStorage.getItem(ACCESS)) {
        return false;
    }
    localStorage.removeItem(ACCESS);
    return true;
}