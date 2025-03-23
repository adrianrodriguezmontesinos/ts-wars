import { EventType } from '../../../models';
import { genHTMLBtn, genHTMLElem } from '../../utils';

export class Menu {
  private _container: HTMLElement;
  private _options: Map<EventType, HTMLButtonElement>;

  /**
   * Initial game menu
   */
  constructor() {
    this._initMenu();
  }

  /**
   *
   * @param show True show menu (by default). False hide the menu.
   */
  public showMenu(show: boolean = true) {
    show ? document.body.appendChild(this._container) : document.querySelector('#menu')?.remove();
  }

  /**
   * Init menu elements
   */
  private _initMenu() {
    this._container = genHTMLElem('div', undefined, undefined, undefined, [
      { key: 'id', value: 'menu' },
    ]);

    genHTMLElem('h2', this._container, undefined, 'Menu', undefined);

    this._initOptions();

    const legendContent = 'v0.0.1. By Adrián Rodríguez Montesinos';
    genHTMLElem('p', this._container, undefined, legendContent, undefined);
  }

  /**
   * Init Menu options
   */
  private _initOptions() {
    this._options = new Map();
    const playBtn = genHTMLBtn(
      { name: EventType.PLAY, value: undefined },
      this._container,
      ['btn'],
      'Play',
      undefined,
    );
    this._options.set(EventType.PLAY, playBtn as HTMLButtonElement);
  }
}
