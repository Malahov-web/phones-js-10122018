import {BaseComponent} from '../../common/components/base/base.component.js';

export class PhonesCatalogComponent extends BaseComponent {
    constructor({element, phones, onPhoneSelect, onAddToCart}) {
        super({element});
        this.phones = phones;
        this.onPhoneSelect = onPhoneSelect;
        this.onAddToCart = onAddToCart;
        this._render();
        this._element.addEventListener('click', this._gotoOnePhoneView.bind(this))
        this._element.addEventListener('click', this.addToCart.bind(this))
    }

    _gotoOnePhoneView({target}) {
        // const liElement = target.closest('.thumbnail');
        // if (!liElement) {
        //   return;
        // }
        const link_thumb = target.closest('.thumb');
        // const link_title =  target.closest('.title');

        if (!link_thumb) {
            return;
        }
        // this.onPhoneSelect(liElement.dataset.id);
        this.onPhoneSelect(link_thumb.closest('.thumbnail').dataset.id);
        // console.log(this.onPhoneSelect);
    }

    addToCart({target}) {
        const addElement = target.closest('.btn-success');
        if (!addElement) {
            return;
        }
        console.log(addElement);

        this.onAddToCart(addElement.closest('.thumbnail').dataset.id);
        console.log(addElement.closest('.thumbnail').dataset.id);
    }

    _render() {
        this._element.innerHTML = `
          <ul class="phones">
          ${this.phones.reduce((html, phone) => {
            return `${html}     <li class="thumbnail" data-id=${phone.id}>
          <a href="#!/phones/${phone.id}" class="thumb">
            <img alt=${phone.id} src=${`assets/${phone.imageUrl}`}>
          </a>
          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success">
              Add
            </a>
          </div>
          <a href="#!/phones/${phone.id}" class="title">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>`
        }, '')}
   
      </ul>
    `
    }
}
