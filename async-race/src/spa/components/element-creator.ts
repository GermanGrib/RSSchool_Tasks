import { CallbackMouseFunction } from '../../models/interfaces';
import { ElementParams, ElementOrCreator } from '../../models/types';

export default class ElementCreator {
  public element: HTMLElement | null;

  constructor(params: ElementParams) {
    this.element = null;
    if (params) {
      this.createElement(params);
    }
  }

  getElement(): HTMLElement | null {
    return this.element;
  }

  static getElementParams(
    tag: string,
    classNames: string[],
    textContent: string,
    callback?: ((event?: Event | undefined) => void) | null
  ): ElementParams {
    const defaultParams: ElementParams = {
      tag: 'div',
      classNames: [],
      textContent: '',
      callback: null,
    };

    return {
      tag,
      classNames: [...defaultParams.classNames, ...classNames],
      textContent,
      callback,
    };
  }

  addInnerElement(element: ElementOrCreator): void {
    if (this.element instanceof HTMLElement) {
      if (element instanceof ElementCreator) {
        const innerElement = element.getElement();
        if (innerElement instanceof HTMLElement) {
          this.element.append(innerElement);
        }
      } else if (typeof element === 'string' || element instanceof Node) {
        this.element.append(element);
      }
    }
  }

  createElement(params: ElementParams | null): void {
    if (params) {
      const tag = params.tag || 'div';
      this.element = document.createElement(tag);
      this.setCssClasses(params.classNames);
      this.setTextContent(params.textContent);
      if (params.callback) {
        this.setCallback(params.callback);
      }
    }
  }

  setCssClasses(cssClasses: string[] = []): void {
    cssClasses.forEach((cssClass) => this.element?.classList.add(cssClass));
  }

  setTextContent(text = ''): void {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  setCallback(callback: CallbackMouseFunction): void {
    if (typeof callback === 'function') {
      this.element?.addEventListener('click', (event) => callback(event));
    }
  }
}
