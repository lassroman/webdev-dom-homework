import { getComments, postComments, token } from "./api.js";
// import { formattedDate } from "./formattedDate.js";
import { format } from "date-fns";
import { renderComments } from "./render.js";
import { sanitizeHtml } from "./sanitizeHtml.js";

const loader = document.querySelector(".loader");

// Массив комментариев
export let comments = [];

export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
    user = newUser;
};


export const loadApi = () => {

    loader.style.display = "block";

    getComments().then((resposneData) => {

        comments = resposneData.comments.map((comment) => {
            return {
                name: comment.author.name,
                // date: formattedDate(new Date(comment.date)),
                date: format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss"),
                id: comment.id,
                isLiked: comment.isLiked,
                likeCounter: comment.likes,
                text: comment.text,
            };
        });
        console.log(comments);
        renderComments({ comments });
        loader.style.display = "none";
    })
};
loadApi();


// Цитата коммента
export const quoteComments = () => {
    if (!token) {
        return
    };
    const textInputelement = document.getElementById("text_input");
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            const commentText = comments[index].text;
            const commentName = comments[index].name;
            textInputelement.value = `${commentName} :
          ${commentText}`;
        })
    }
}


// Счетчик лайков
export const initLikeListeners = () => {

    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!token) {
                alert('вы не зарегистированы')
                return
            }
            const index = likeButton.dataset.index;
            comments[index].likeCounter += comments[index].isLiked ? -1 : +1;
            comments[index].isLiked = !comments[index].isLiked;

            renderComments({ comments });

        })
    }
}


// Валидация ввода
export const addComment = () => {
    if (!token) {
        return
    };
    const buttonElement = document.getElementById("send-button");
    const nameInputElement = document.getElementById("name_input");
    const textInputelement = document.getElementById("text_input");
    const addFormElement = document.querySelector(".add-form");
    const onSendLoader = document.querySelector(".send-comment-loader");

    buttonElement.addEventListener('click', () => {


        textInputelement.classList.remove("error");
        nameInputElement.classList.remove("error");

        if (nameInputElement.value === '') {
            nameInputElement.classList.add("error");
            return;
        } else if (textInputelement.value === '') {
            textInputelement.classList.add("error");
            return;
        };

        // Метод POST для добавления комментариев
        function postApi() {
            addFormElement.style.visibility = "hidden";
            onSendLoader.style.display = "block";

            postComments({
                name: sanitizeHtml(nameInputElement.value),
                date: formattedDate(new Date()),
                isLiked: false,
                likeCounter: 0,
                text: sanitizeHtml(textInputelement.value)
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    if (response.status === 400) {
                        throw new Error("Вы ввели имя короче 3-х символов");
                    } else if (response.status === 500) {
                        throw new Error("Ошибка сервера");
                    }
                    throw new Error("Сервер упал");
                })
                .then(() => {
                    nameInputElement.value = "";
                    textInputelement.value = '';
                    addFormElement.style.visibility = "visible";
                    onSendLoader.style.display = "none";
                    loadApi();
                })
                .catch((error) => {
                    addFormElement.style.visibility = "visible";
                    onSendLoader.style.display = "none";
                    alert(error.message);
                    console.warn(error);
                });
        };
        // renderComments({ comments });
        postApi();
    });
};

// renderComments({comments});