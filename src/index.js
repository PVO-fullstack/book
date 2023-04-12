import { getTopBooks, getBookById } from './service';
import {
  deleteBookShoping,
  getShopingList,
  postTopBooks,
} from './servisFirebase';
import { createUser, onLogOut, onLogin1, onLogin2 } from './authservice';

localStorage.setItem('uid', null);

// const changeName = document.querySelector('.set');
const root = document.querySelector('.root');
const getData = document.querySelector('.get');
const login1 = document.querySelector('.login1');
const login2 = document.querySelector('.login2');
const logout = document.querySelector('.logout');
const newUser = document.querySelector('.signup');
const add = document.querySelector('.add');

login1.addEventListener('click', onLoginUser1);
login2.addEventListener('click', onLoginUser2);
logout.addEventListener('click', onLogOutUser);
newUser.addEventListener('submit', onCreateUser);
add.addEventListener('click', addToList);
root.addEventListener('click', deleteBook);

const mo = document.querySelector('.mo');
const modalOpn = document.querySelector('.modalopn');
const modal = document.querySelector('[data-modal]');
const modalBtn = document.querySelector('.modal__button');
const boot = document.querySelector('.boot');

// modalOpn.addEventListener('click', modalOpen);
modalBtn.addEventListener('click', modalClose);

boot.addEventListener('click', onBookClick);

let book = {};

async function deleteBook(e) {
  const key = e.target.attributes.data_key.value;
  await deleteBookShoping(key);
  root.innerHTML = '';
  getBooks();
}

async function onBookClick(e) {
  mo.innerHTML = '';
  const id = e.target.attributes.data_id.value;
  book = await getBookById(id);
  modalOpen();
  mo.insertAdjacentHTML(
    'beforeend',
    `  <img width=128px src=${book.book_image} alt="">
  <p>${book.author}</p>
  <p>${book.title}</p>
  `
  );
}

function addToList() {
  postTopBooks(book);
  modalClose();
}

async function getAllTopBooks() {
  const topBooks = await getTopBooks();
  const bookslist = await topBooks.map(book => book.books[0]);
  // console.log(bookslist);
  const bookList2 = bookslist.map(bookList).join(' ');
  boot.insertAdjacentHTML('beforeend', bookList2);
}

getAllTopBooks();

function onCreateUser(e) {
  e.preventDefault();
  const {
    elements: { username, email, password },
  } = e.currentTarget;
  const displayName = username.value;
  const userPassword = password.value;
  const userEmail = email.value;
  e.currentTarget.reset();
  createUser(userEmail, userPassword, displayName);
}

function onLoginUser1() {
  onLogin1();
}

function onLoginUser2() {
  onLogin2();
}

function onLogOutUser() {
  onLogOut();
}

function modalOpen() {
  modal.classList.remove('is-hidden');
}

function modalClose() {
  modal.classList.add('is-hidden');
}

function addBookShoppingList() {
  postTopBooks(id);
}

// changeName.addEventListener('click', addBookShoppingList);

async function getBooks() {
  const allBooks = [];
  root.innerHTML = '';
  const bokks = await getShopingList();
  if (bokks === null) {
    return alert('No more book');
  }
  // console.log(bokks);
  const keys = Object.keys(bokks);
  for (const key of keys) {
    allBooks.push({ ...bokks[key], key });
  }
  const list = allBooks.map(bookList).join(' ');
  // console.log(allBooks);
  root.insertAdjacentHTML('beforeend', list);
}

getData.addEventListener('click', getBooks);

// const too = ({ title }) => {
//   return `
//   <div>
//   <img width=128px data=${_id} src=${book_image} alt="">
//   <p>${author}</p>
//   <p>${title}</p>
//   </div>
//   `;
// };

const bookList = ({ key, book_image, author, title, _id }) => {
  return `
  <li>
  <img width=128px data_key=${key} data_id=${_id} src=${book_image} alt="">
  <p>${author}</p>
  <p>${title}</p>
</li>
    `;
};
