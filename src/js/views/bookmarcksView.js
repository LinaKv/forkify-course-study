import View from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class ResultsBookMarks extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks :( `;
  _mesMessage = 'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsBookMarks();
