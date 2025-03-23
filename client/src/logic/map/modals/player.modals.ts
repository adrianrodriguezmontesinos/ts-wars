// import { EventType } from "../../../models";

// export class ModalPlayer {

// }


//   private _setPlayerModal() {
//     const modal = document.createElement('div');
//     modal.classList.add('modal', 'modal--player');

//     // Title
//     const title = document.createElement('p');
//     title.innerText = this._player.name;
//     title.classList.add('modal__title');
//     modal.appendChild(title);

//     // List
//     const list = this._getModalResourcesList(this._player.resources);
//     modal.appendChild(list);

//     // Update resources listener
//     document.addEventListener(EventType.UPDATE_RESOURCES, (e: Event) => {
//       const customEvent = e as CustomEvent;
//       const resourceList = modal.querySelector('.modal__list');

//       if (resourceList) {
//         resourceList.innerHTML = '';

//         // Update the list values from the updateResources' event ones
//         Object.entries(customEvent.detail).forEach(([key, value]) => {
//           const li = document.createElement('li');
//           li.innerText = `${key}: ${value}`;
//           resourceList.appendChild(li);
//         });
//       }
//     });

//     // TODO MINIMIZE BUTTON

//     document.body.appendChild(modal);
//   }