export const CART_KEY = "cart";



export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, data: any) => {
    console.log('setLocalStorage', data)
    localStorage.setItem(
        key,
        typeof data === "string" ? data : JSON.stringify(data)
    );
};
