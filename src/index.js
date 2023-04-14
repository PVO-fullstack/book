import { getTopBooks, getBookById } from './service';
import {
  deleteBookShoping,
  getShoppingList,
  postShoppingList,
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

localStorage.removeItem('token');

async function deleteBook(e) {
  const id = e.target.attributes.data_id.value;
  const books = JSON.parse(localStorage.getItem('list'));
  console.log(books);
  filteredBooks = books.filter(book => book._id !== id);
  console.log(filteredBooks);
  localStorage.setItem('list', JSON.stringify(filteredBooks));
  getLocalList();
  // await deleteBookShoping(key);
  // getBooks();
}

let book = {};
let id = null;

async function onBookClick(e) {
  mo.innerHTML = '';
  id = e.target.attributes.data_id.value;
  book = await getBookById(id);
  // console.log(book);
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
  const bookList = JSON.parse(localStorage.getItem('list'));
  // console.log(bookList);
  let modernList = [];
  // console.log(book);
  // if (!bookList) {
  //   modernList.push(book);
  //   console.log(modernList);
  // }

  if (bookList) {
    // console.log(book._id);
    // console.log(id);
    const uniqBook = bookList.some(book => book._id === id);
    console.log(uniqBook);
    if (uniqBook) {
      modalClose();
      return;
    }
    modernList = [...bookList, book];
  } else if (modernList.length === 0) {
    console.log(book);
    modernList.push(book);
  }
  console.log(modernList);
  localStorage.setItem('list', JSON.stringify(modernList));
  modalClose();
}

async function getAllTopBooks() {
  const topBooks = await getTopBooks();
  const bookslist = await topBooks.map(book => book.books[0]);
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

async function onLogOutUser() {
  await deleteBookShoping();
  const localList = JSON.parse(localStorage.getItem('list'));
  console.log(localList);
  // const list = localList.join(',');
  // console.log(keys);
  // const list = [];
  // for (const key of keys) {
  //   list = [...localList[key]];
  // list.push(localList[key]);
  // console.log(list);
  // }
  postShoppingList(localList);

  onLogOut();
  // const keys = Object.value(localList);
  // const list = [];
  // for (const key of keys) {
  //   list.push(localList[key]);
  //   console.log(keys);
  // }
  // const listJson = JSON.stringify(list);
  // localStorage.setItem('list', listJson);
}

function modalOpen() {
  modal.classList.remove('is-hidden');
}

function modalClose() {
  modal.classList.add('is-hidden');
}

function addBookShoppingList() {
  postShoppingList(id);
}

// changeName.addEventListener('click', addBookShoppingList);

async function getBooks() {
  const allBooks = [];
  root.innerHTML = '';
  const bokks = await getShoppingList();
  if (bokks === null) {
    return alert('No more book');
  }
  // console.log(bokks);
  const keys = Object.keys(bokks);
  for (const key of keys) {
    allBooks.push({ ...bokks[key], key });
  }
  // const list = allBooks.map(bookList).join(' ');
  // // console.log(allBooks);
  // root.insertAdjacentHTML('beforeend', list);
}

getData.addEventListener('click', getLocalList);

function getLocalList() {
  const localList = JSON.parse(localStorage.getItem('list'));
  if (!localList) {
    return alert('No more book');
  }
  // let bbookk = [];
  const list = localList.map(bookList).join(' ');
  root.innerHTML = '';
  root.insertAdjacentHTML('beforeend', list);
}

const bookList = ({ key, book_image, author, title, _id }) => {
  return `
  <li>
  <img width=128px data_key=${key} data_id=${_id} src=${book_image} alt="">
  <p>${author}</p>
  <p>${title}</p>
</li>
    `;
};
