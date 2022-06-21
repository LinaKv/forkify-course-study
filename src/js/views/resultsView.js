import View from './view';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class ResultsViews extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found :( Pls try again!)`;
  _mesMessage = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsViews();
