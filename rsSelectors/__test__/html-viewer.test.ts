import HtmlViewer from '../src/spa/components/html-viewer/html-viewer-creator';
jest.mock('../src/spa/components/html-viewer/html-viewer.scss', () => ({}));
jest.mock('prismjs/themes/prism.css', () => ({}));

describe('HTML Viewer', () => {
  let htmlViewerCreator: HtmlViewer;

  beforeEach(() => {
    htmlViewerCreator = new HtmlViewer();
  });

  test('Title and body properties are instances of HTMLElement', () => {
    expect(htmlViewerCreator.title).toBeInstanceOf(HTMLElement)
    expect(htmlViewerCreator.body).toBeInstanceOf(HTMLElement)
  })

})