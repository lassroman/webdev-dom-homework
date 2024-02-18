let urlApi = "https://wedev-api.sky.pro/api/v2/lassovskiy-roman/comments";
let urlLogin = "https://wedev-api.sky.pro/api/user/login";


export let token;
export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
    return token;
};

export function getComments() {
    return fetch(urlApi,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        .then((response) => {
            return response.json()
        })
}

export function postComments ( {name, text}) {
    return fetch(urlApi,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    text: text,
            })
        });
}

export function login({ login, password}) {
    return fetch(urlLogin,
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            }),
        }).then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Некорректные логин или пароль");
            }
            if (response.status === 500) {
                return Promise.reject("Oшибка сервера");
            }
            return Promise.reject("Отсутствует соединение");
        }).catch((error) => {
            alert(error);
            console.warn(error);
        }) 

};