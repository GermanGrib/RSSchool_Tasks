import '../style.scss';
import Router from './router/router';
import { Pages, ID_SELECTOR } from './router/pages';
import state from './state/state';
import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import View from './view/view';
import cardInfo from '../data/cards';
import IndexView from './view/main/index/index-view';
import ProductView from './view/main/product/product-view';
import NotFoundView from './view/main/not-found/not-found-view';

export default class App {
  header: HeaderView | null;
  main: MainView | null;
  router: Router;
  constructor() {
    this.header = null;
    this.main = null;

    const routes = this.createRoutes();
    this.router = new Router(routes);

    this.createView();
    this.setGameLevel();
  }

  createView(): void {
    this.header = new HeaderView(this.router);
    this.main = new MainView();
    const footer = new FooterView();

    document.body.append(
      this.header.getHtmlElement() as HTMLElement,
      this.main.getHtmlElement() as HTMLElement,
      footer.getHtmlElement() as HTMLElement
    );
  }

  createRoutes() {
    return [
      {
        path: '',
        // callback: async () => {
        //   const { default: IndexView } = await import(
        //     './view/main/index/index-view'
        //   );
        //   this.setContent(Pages.INDEX, new IndexView());
        // },
        callback: () => {
          this.setContent(Pages.INDEX, new IndexView())
        },
      },
      {
        path: `${Pages.INDEX}`,
        // callback: async () => {
        //   const { default: IndexView } = await import(
        //     './view/main/index/index-view'
        //   );
        //   this.setContent(Pages.INDEX, new IndexView());
        // },
        callback: () => {
          this.setContent(Pages.INDEX, new IndexView()) 
        }
      },
      {
        path: `${Pages.PRODUCT}`,
        // callback: async () => {
        //   const { default: ProductView } = await import(
        //     './view/main/product/product-view'
        //   );
        //   this.setContent(Pages.PRODUCT, new ProductView(this.router));
        // },
        callback: () => {
          this.setContent(Pages.PRODUCT, new ProductView(this.router));
        }
      },
      {
        path: `${Pages.PRODUCT}/${ID_SELECTOR}`,
        // callback: async (id: string) => {
        //   const { default: ProductView } = await import(
        //     './view/main/product/product-view'
        //   );
        //   this.setContent(Pages.PRODUCT, new ProductView(this.router, id));
        // },
        callback: (id: string) => {
          this.setContent(Pages.PRODUCT, new ProductView(this.router, id));
        }
      },
      {
        path: `${Pages.NOT_FOUND}`,
        // callback: async () => {
        //   const { default: NotFoundView } = await import(
        //     './view/main/not-found/not-found-view'
        //   );
        //   this.setContent(Pages.NOT_FOUND, new NotFoundView());
        // },
        callback: () => {
          this.setContent(Pages.NOT_FOUND, new NotFoundView());
        }
      },
    ];
  }

  setContent(page: string, view: View): void {
    if (this.header && this.main) {
      this.header.setSelectedItem(page);
      this.main.setContent(view);
    }
  }

  setGameLevel() {
    if (state.getField('currentGameLevel') === '') {
      state.setField('cardsData', JSON.stringify(state.filterFields(cardInfo)));
      state.setField('currentGameLevel', '1');
    }
  }
}
