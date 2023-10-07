import './index.scss';
import HtmlViewerFieldCreator from '../../../components/html-viewer/html-viewer-creator';
import View from '../../view';
import GameBoardCreator from '../../../components/game-board/game-board-creator';
import cssEditorCreator from '../../../components/css-editor/css-editor-creator';
import { ViewParams } from '../../../../models/types';

const CssClasses = {
  GAME_BOARD: 'game-board',
};

export default class IndexView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'section',
      classNames: [CssClasses.GAME_BOARD],
    };
    super(params);
    this.configureView();
  }

  configureView(): void {
    const GameBoard = new GameBoardCreator().getElement() as HTMLElement;
    const CssEditor = new cssEditorCreator().getElement() as HTMLElement;
    const HmlViewer = new HtmlViewerFieldCreator().getElement() as HTMLElement;

    this.viewElementCreator.addInnerElement(GameBoard);
    this.viewElementCreator.addInnerElement(CssEditor);
    this.viewElementCreator.addInnerElement(HmlViewer);
  }
}
