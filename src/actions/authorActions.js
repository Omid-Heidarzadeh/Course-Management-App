import * as authorApi from '../api/authorApi';
import Dispatcher from './../appDispatcher';
import { actionTypes } from './actionTypes';

export function saveAuthor(author) {
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    Dispatcher.dispatch({
      type: author.id ? actionTypes.UPDATE_AUTHOR : actionTypes.CREATE_AUTHOR,
      author: savedAuthor,
    });
  });
}

export function deleteAuthor(id) {
  return authorApi.deleteAuthor(id).then(() => {
    Dispatcher.dispatch({ type: actionTypes.DELETE_AUTHOR, id });
  });
}

export function loadAuthors() {
  return authorApi.getAuthors().then((authors) => {
    Dispatcher.dispatch({ type: actionTypes.LOAD_AUTHORS, authors });
  });
}
