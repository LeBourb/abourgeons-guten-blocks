import { combineReducers } from 'redux';
import { ADD_TAG, ADD_POST, ADD_CATEGORY } from './actions';

//function R_Tag(state = [], action) {
const tags = (state = [], action) => {
  switch (action.type) {
    case ADD_TAG:
      if(Array.isArray(state))
        return state.concat(action.tags)
      else
        return action.tags
    default:
      return state
  }
}

//function R_Category(state = [], action) {
const categories = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      if(Array.isArray(state))
        return state.concat(action.categories)
      else
        return action.categories
    default:
      return state
  }
}

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      if(Array.isArray(state)) {
        state = state.concat(action.posts);
        var reduced = [];
        state.forEach(function(el){
            if( reduced.findIndex(function(element) {
              return el.link == element.link;
            }) < 0) reduced.push(el);
        });
        return reduced;
      }
      else
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
