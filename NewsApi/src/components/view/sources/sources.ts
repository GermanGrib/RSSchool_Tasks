import './sources.css';
import { NewsItem } from '../../models/types';

class Sources {
  private fragment: DocumentFragment;

  constructor() {
    this.fragment = document.createDocumentFragment();
  }

  public draw(data: Partial<NewsItem['source']>[]): void {
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (sourceItemTemp) {
      data.forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;

        const sourceItemName = sourceClone.querySelector('.source__item-name');
        if (sourceItemName instanceof HTMLElement) {
          sourceItemName.textContent = item.name || '';
        }
        const sourceItem = sourceClone.querySelector('.source__item');
        if (sourceItem instanceof HTMLElement) {
          sourceItem.setAttribute('data-source-id', String(item.id) || '');
        }
        this.fragment.append(sourceClone);
      });

      const sourcesElement = document.querySelector('.sources');
      if (sourcesElement) {
        sourcesElement.append(this.fragment);
      }
    }
  }
}

export { Sources };
