import { News } from './news/news';
import { Sources } from './sources/sources';
import { NewsItem } from '../models/types';

class AppView {
  public readonly news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews = (data: { articles?: NewsItem[] }): void => {
    const values = data?.articles ? data.articles : [];
    News.draw(values);
  };

  public drawSources(data: { sources?: NewsItem['source'][] }): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
