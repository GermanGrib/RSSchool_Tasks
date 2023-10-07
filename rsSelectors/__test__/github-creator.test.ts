import GitHub from '../src/spa/components/github-link/github-creator';
import { GIT_DEVELOPER_URL, GIT_SVG } from '../src/spa/components/github-link/variables-github';
jest.mock('../src/spa/components/github-link/github.scss', () => ({}));

describe('Github', () => {
  let gitHub: GitHub;

  beforeEach(() => {
    gitHub = new GitHub();
  });

  it('should create an element with the correct tag and className', () => {
    expect(gitHub.element?.tagName).toBe('A');
    expect(gitHub.element?.classList.contains('github')).toBe(true)
  })

  it('should set correct href to target', () => {
    expect(gitHub.element?.getAttribute('href')).toBe(GIT_DEVELOPER_URL)
    expect(gitHub.element?.getAttribute('target')).toBe('_blank')
  })

  it('should set the correct text content', () => {
    const newTextContent = 'Something for check';
    gitHub.setTextContent(newTextContent)
    expect(gitHub.element?.textContent).toBe(newTextContent)
  }) 
});
