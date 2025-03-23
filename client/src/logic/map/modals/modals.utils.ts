import { Cost, SingleSprite, Sprite } from '../../../models';
import { genHTMLElem, getHTMLElem } from '../../utils';

/**
 * Get an HTML list of the resources
 * @param resources Resources to be displayed at a list
 * @returns HTML list element
 */
export function getModalResourcesList(resources: Cost): HTMLUListElement {
  const list = getHTMLElem('ul', ['modal__list']) as HTMLUListElement;

  // For each resource we create a list item
  Object.entries(resources).forEach((e: [string, number]) =>
    genHTMLElem('li', list, undefined, `${e[0]}: ${e[1]}`),
  );

  return list;
}

// TODO
/**
 *
 * @param name
 * @param sprite
 * @returns
 */
export function getSpriteImgContainer(name: string, sprite: Sprite | SingleSprite): HTMLDivElement {
  const container = document.createElement('div');
  container.classList.add('modal__containerImg');
  container.style.width = `${sprite.w}px`;
  container.style.height = `${sprite.h}px`;

  const img = document.createElement('img');
  img.classList.add('modal__containerImg__img');
  img.setAttribute('src', sprite.image.currentSrc);
  img.setAttribute('alt', name);

  if (sprite instanceof Sprite) {
    img.style.left = `-${sprite.x}px`;
    img.style.top = `-${sprite.y}px`;
  }

  container.appendChild(img);
  return container;
}

  /**
   * Remove the HTML modal div from the HTML document
   */
  export function closeCellModal() {
    document.querySelector('#modal-cell')?.remove();
  }