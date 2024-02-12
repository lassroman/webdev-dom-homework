import { initLikeListeners, quoteComments } from "./main.js";
import { setToken, token, postComments, getComments, getToken  } from "./api.js" ;
import { comments, loadApi } from "./main.js";
import { renderLogin } from "./renderLogin.js";

const listElement = document.getElementById("list");

export const renderComments = ({comments}) => {

  const appHtml = document.getElementById("app");

    const commentHtml = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likeCounter}</span>
              <button class="like-button ${comment.isLiked ? 'active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
    }).join("");



  const contentHtml = () => {
    const btnLogin = `
    <p class="render-login-btn">  Чтобы добавить комментарий, 
    <a id="render-login-btn">авторизуйтесь</a> </p>`

    if (!token) return `<ul id="comments" class="comments">${commentHtml}</ul>
     ${btnLogin}`;
    return `<ul id="comments" class="comments">${commentHtml}</ul>
    <div class="add-form">
        <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name_input" />
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
          id="text_input"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="send-button">Написать</button>
        </div>
        </div>
    `
  }

  appHtml.innerHTML = contentHtml()
  const buttonElement = document.getElementById("send-button");
  
 const setLoginBtn = () => {
    const buttonLoginElement = document.getElementById("render-login-btn");
    if (!buttonLoginElement){
      return;
    }
    buttonLoginElement.addEventListener("click", (event) => {
      event.preventDefault();
      renderLogin();
    });
  };
  setLoginBtn();
};
// const buttonElement = document.getElementById("send-button");
//   const nameInputElement = document.getElementById("name_input");
//   const textInputelement = document.getElementById("text_input");
  
//     buttonElement.addEventListener('click', () => {
    

//     textInputelement.classList.remove("error");
//     nameInputElement.classList.remove("error");

//     if (nameInputElement.value === '') {
//         nameInputElement.classList.add("error");
//         return;
//     } else if (textInputelement.value === '') {
//         textInputelement.classList.add("error");
//         return;
//     };

//     // Метод POST для добавления комментариев
//     function postApi() {
//         addFormElement.style.visibility = "hidden";
//         onSendLoader.style.display = "block";
        
//         postComments({
//             name: sanitizeHtml(nameInputElement.value),
//             date: formattedDate(new Date()),
//             isLiked: false,
//             likeCounter: 0,
//             text: sanitizeHtml(textInputelement.value)
//         })
//         .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 if (response.status === 400) {
//                     throw new Error("Вы ввели имя короче 3-х символов");
//                 } else if (response.status === 500) {
//                     throw new Error("Ошибка сервера");
//                 }
//                 throw new Error("Сервер упал");
//             })
//             .then(() => {
//                 nameInputElement.value = "";
//                 textInputelement.value = '';
//                 addFormElement.style.visibility = "visible";
//                 onSendLoader.style.display = "none";
//                 loadApi();
//             })
//             .catch((error) => {
//                 addFormElement.style.visibility = "visible";
//                 onSendLoader.style.display = "none";
//                 alert(error.message);
//                 console.warn(error);
//             });
            
//             renderComments({comments, loadApi});
//     } 
    
    // });
