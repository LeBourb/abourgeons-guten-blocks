
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_TAG = 'ADD_TAG';
export const ADD_POST = 'ADD_POST';

export const addCategory = categories => ({
    type: ADD_CATEGORY,
    categories
})


//const Categories_store = createStore(R_Category)
export const addTags = tags => ({
    type: ADD_TAG,
    tags
});

export const addPosts = posts => ({
  type: ADD_POST,
  posts
});
