import View from '../src/spa/view/view';
import ElementCreator from '../src/spa/components/element-creator';

describe('View', () => {
  let view: View;

  beforeEach(() => {
    view = new View();
  })

  test('should create an instance of View with a valid view element creator', () => {
    expect(view.viewElementCreator).toBeInstanceOf(ElementCreator)
    expect(view.getHtmlElement()).toBeInstanceOf(HTMLElement)
  })

  test('should create an instance of View with a default section element', () => {
    const defaultParams = {tag: 'section', classNames: []};

    expect(view.viewElementCreator.element?.tagName.toLowerCase()).toBe(defaultParams.tag)
    expect(view.viewElementCreator.element).toBeInstanceOf(HTMLElement);
    expect(view.viewElementCreator.element?.classList.contains(defaultParams.classNames[0])).toBeFalsy();
  })

  test('should create a view with custom element parameters', () => {
    const customParams = {tag: 'div', classNames: ['custom'], textContent: 'Custom View'}
    view = new View(customParams)

    expect(view.viewElementCreator.element?.tagName.toLowerCase()).toBe(customParams.tag);
    expect(view.viewElementCreator.element).toBeInstanceOf(HTMLElement)
    expect(view.viewElementCreator.element?.classList.contains(customParams.classNames[0])).toBeTruthy();
  })
})