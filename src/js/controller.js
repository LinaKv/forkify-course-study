import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import ResultsBookMarks from './views/bookmarcksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarcksView from './views/bookmarcksView.js';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE } from './config.js';

// let img.src = new URL('hero.jpg', import.meta.url)

// console.log(icons);
// console.log(5);

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // mark selected
    resultsView.update(model.getSearchResultsPage());

    // load
    await model.loadRecipe(id);

    // rendering
    recipeView.render(model.state.recipe);
    bookmarcksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearcgResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultsPage());

    // render pagination
    paginationView.render(model.state.search);
    controlServings();
  } catch (err) {
    console.log(err);
  }
};

// controlRecipes();

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new button s
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add remove mark
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  // render
  bookmarcksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarcksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMes();

    // bookmarkview

    bookmarcksView.render(model.state.bookmarks);

    // chsnge id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back()

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE * 1000);
  } catch (err) {
    console.error(`////////////${err}///////// from controlAddRecipe`);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarcksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearcgResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log(34);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
