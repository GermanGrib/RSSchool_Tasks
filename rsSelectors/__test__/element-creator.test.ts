import ElementCreator from "../src/spa/components/element-creator";

describe('Element Creator', () => {
  let elementCreator: ElementCreator;
  const defaultParams = {
    tag: 'div',
    classNames: [],
    textContent: '',
  };

  beforeEach(() => {
    elementCreator = new ElementCreator(defaultParams);
  });

  test('should create an instance of ElementCreator with a valid element', () => {
    const params = {
      ...defaultParams,
      classNames: ['check'],
      textContent: 'check',
      callback: null,
    };
    elementCreator = new ElementCreator(params);

    expect(elementCreator.element).not.toBeNull();
    if (elementCreator.element !== null) {
      expect(elementCreator.element.tagName.toLowerCase()).toBe(params.tag);
    }
    expect(elementCreator.element).toBeInstanceOf(HTMLElement);
    expect(elementCreator.element?.classList.contains(params.classNames[0])).toBeTruthy();
    expect(elementCreator.element?.textContent).toBe(params.textContent);
  });

  test('should add inner element correctly', () => {
    const innerElement = document.createElement('span');
    elementCreator.createElement(defaultParams);

    elementCreator.addInnerElement(innerElement);

    expect(elementCreator.element?.contains(innerElement)).toBeTruthy();
  });

  test('should set CSS classes correctly', () => {
    const cssClasses = ['class1', 'class2'];
    elementCreator.createElement(defaultParams);

    elementCreator.setCssClasses(cssClasses);

    cssClasses.forEach((cssClass) => {
      expect(elementCreator.element?.classList.contains(cssClass)).toBeTruthy();
    });
  });

  test('should set callback correctly', () => {
    const callback = jest.fn();
    elementCreator.createElement(defaultParams);

    elementCreator.setCallback(callback);
    elementCreator.element?.click();

    expect(callback).toHaveBeenCalled();
  });
});