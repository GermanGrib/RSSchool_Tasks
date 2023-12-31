import './news.css';
import { NewsItem } from '../../models/types';
class News {
  public static draw(data: NewsItem[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    news.forEach((item, idx) => {
      if (newsItemTemp === null) {
        return;
      }
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
      newsMetaAuthor.textContent = item.author || item.source.name;

      const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
      newsDescriptionTitle.textContent = item.title;

      const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
      newsDescriptionSource.textContent = item.source.name;

      const newsDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
      newsDescriptionContent.textContent = item.description;

      const newsReadMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
      newsReadMoreLink.setAttribute('href', item.url);
      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
      newsContainer.innerHTML = '';
      newsContainer.appendChild(fragment);
    }
  }
}

export { News };
