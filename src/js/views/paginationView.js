import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationViews extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateButtonNext(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}g#icon-arrow-right"></use>
          </svg>
        </button>`;
  }

  _generateButtonBefore(curPage) {
    return `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButtonNext(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButtonBefore(curPage);
    }
    // Other Page
    if (curPage < numPages) {
      return (
        this._generateButtonNext(curPage) + this._generateButtonBefore(curPage)
      );
    }
    // page1, and there are NOT other pages
    return '';
  }
}

export default new PaginationViews();
