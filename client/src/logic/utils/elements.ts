import { KeyValue, NameValue } from '../../models';

/**
 * Generate and if has a father append an HTML Element
 * @param tag HTML element tag. F.e.: 'p' or 'img'
 * @param father Father of the element
 * @param classes Array of class names
 * @param content Element text content
 * @param att Array of attributes (keys/names and values)
 * @returns HTML Element
 */
export function genHTMLElem(
  tag: string,
  father?: HTMLElement,
  classes?: string[],
  content?: string,
  att?: KeyValue[],
): HTMLElement {
  const elem: HTMLElement = _getHTMLElem(tag, classes, content, att);

  if (father) {
    father.appendChild(elem);
  }

  return elem;
}

/**
 * Generate and if has a father append a Button HTML Element, with a click event.
 * The click event dispatch a custom event 
 * @param clickEvent Custom event to be dispached on button click (name and value) 
 * @param tag HTML element tag. F.e.: 'p' or 'img'
 * @param classes Array of class names
 * @param content Element text content
 * @param att Array of attributes (keys/names and values)
 * @returns HTML Button Element
 */
export function genHTMLBtn(
  clickEvent: NameValue,
  father?: HTMLElement,
  classes?: string[],
  content?: string,
  att?: KeyValue[],
): HTMLButtonElement {
  const btn: HTMLButtonElement = _getHTMLElem('button', classes, content, att) as HTMLButtonElement;

  btn.addEventListener('click', () => {
    document.dispatchEvent(
      new CustomEvent(clickEvent.name, { detail: clickEvent.value }),
    );
  });

  if (father) {
    father.appendChild(btn);
  }

  return btn;
}

/**
 * Get an HTML Element
 * @param tag HTML element tag. F.e.: 'p' or 'img'
 * @param classes Array of class names
 * @param content Element text content
 * @param att Array of attributes (keys/names and values)
 */
function _getHTMLElem(
  tag: string,
  classes?: string[],
  content?: string,
  att?: KeyValue[],
): HTMLElement {
  const elem = document.createElement(tag);

  if (classes && classes.length) {
    classes.forEach((c: string) => elem.classList.add(c));
  }

  if (content) {
    elem.textContent = content;
  }

  if (att && att.length) {
    att.forEach((a: KeyValue) => elem.setAttribute(a.key, a.value));
  }

  return elem;
}
