import RsLogo from '../src/spa/components/rs-logo/rs-logo-creator';
jest.mock('../src/spa/components/rs-logo/rs_logo.scss', () => ({}));

describe('RS Logo', () => {
  let rsLogo: RsLogo;

  beforeEach(() => {
    rsLogo = new RsLogo();
  });

  test('should create an instance of RsLogo', () => {
    expect(rsLogo).toBeInstanceOf(RsLogo);
  });

  test('should have a link element', () => {
    expect(rsLogo.element).toBeInstanceOf(HTMLAnchorElement);
  });

  test('should set the correct href attribute', () => {
    expect(rsLogo.element).toBeInstanceOf(HTMLAnchorElement);

    if(rsLogo.element !== null && rsLogo.element instanceof HTMLAnchorElement) {
      expect(rsLogo.element.href).toBe('https://rs.school/');
    }
  });

  test('should set the correct target attribute', () => {
    expect(rsLogo.element).toBeInstanceOf(HTMLAnchorElement);

    if(rsLogo.element !== null && rsLogo.element instanceof HTMLAnchorElement) {
      expect(rsLogo.element.target).toBe('_blank');
    }
  });
});
