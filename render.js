import { addComment, initLikeListeners, quoteComments } from "./main.js";
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
    <div class="send-comment-loader">
        <span>Комментарий добавляется, подождите...</span>
      </div>
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

  appHtml.innerHTML = contentHtml();
  initLikeListeners();
  addComment ();
  quoteComments();
  
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


