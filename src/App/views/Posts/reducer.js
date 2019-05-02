import { combineReducers } from 'redux';
import { ADD_TAG, ADD_POST, ADD_CATEGORY } from './actions';

//function R_Tag(state = [], action) {
const tags = (state = false, action) => {
  switch (action.type) {
    case ADD_TAG:
      return state.concat(action.tags)
    default:
      return state
  }
}

//function R_Category(state = [], action) {
const categories = (state = false, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return state.concat(action.categories)
    default:
      return state
  }
}

const posts = (state = false, action) => {
  switch (action.type) {
    case ADD_POST:
      return action.posts
    default:
      return state
  }
}

//const Tags_store = createStore(R_Tag)

/*
const sideMenu = (state = false, action) => {
  switch (action.type) {
    case types.MENU_OPEN:
      return true;
    case types.MENU_CLOSE:
      return false;
    default:
      return state;
  }
};

const search = (state = false, action) => {
  switch (action.type) {
    case types.SEARCH_OPEN:
      return true;
    case types.SEARCH_CLOSE:
      return false;
    default:
      return state;
  }
};

export const isMenuVisible = state => state.sideMenu;
export const isSearchVisible = state => state.search;
*/

export const getCategories = state => state.posts.categories;

export default combineReducers({ categories ,tags, posts });
