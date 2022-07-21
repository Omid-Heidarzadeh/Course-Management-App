import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import { actionTypes } from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _authors = [];
let _loaded = false;

class AuthorsStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  hasLoaded() {
    return _loaded;
  }

  getAuthors() {
    return _authors;
  }

  getAuthorById(id) {
    return _authors.filter((author) => author.id === parseInt(id, 10))[0];
  }
}

const store = new AuthorsStore();

Dispatcher.register((action) => {
  switch (action.type) {
    case actionTypes.CREATE_AUTHOR: {
      _authors.push(action.author);
      store.emitChange();
      break;
    }
    case actionTypes.DELETE_AUTHOR: {
      _authors = _authors.filter((author) => author.id !== action.id);
      store.emitChange();
      break;
    }
    case actionTypes.UPDATE_AUTHOR: {
      _authors = _authors.map((author) =>
        author.id !== action.author.id ? author : action.author
      );
      store.emitChange();
      break;
    }
    case actionTypes.LOAD_AUTHORS: {
      _authors = action.authors;
      _loaded = true;
      store.emitChange();
      break;
    }
    default:
    //do nothing
  }
});

export default store;
