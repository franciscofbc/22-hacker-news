import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === SET_STORIES) {
    const { hits, nbPages } = action.payload;
    return { ...state, hits, nbPages, isLoading: false };
  }
  if (action.type === REMOVE_STORY) {
    let newHits = [...state.hits];
    newHits = newHits.filter((newHit) => newHit.objectID !== action.payload.id);
    return { ...state, hits: newHits };
  }
  if (action.type === HANDLE_SEARCH) {
    return { ...state, query: action.payload.query, page: 0 };
  }
  if (action.type === HANDLE_PAGE) {
    if (action.payload.value === 'inc') {
      let newPage = state.page + 1;
      if (newPage < state.nbPages) {
        return { ...state, page: newPage };
      }
      return { ...state, page: 0 };
    }
    if (action.payload.value === 'dec') {
      let newPage = state.page - 1;
      if (newPage < 0) {
        return { ...state, page: state.nbPages - 1 };
      }
      return { ...state, page: newPage };
    }
  }

  throw new Error(`no matching "${action.type}" action type`);
};
export default reducer;
