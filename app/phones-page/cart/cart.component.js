import {BaseComponent} from '../../common/components/base/base.component.js';

export class CartComponent extends BaseComponent {

    constructor({element, phonesInCart, onAddToCart, onRemoveFromCart}) {
        super({element});
        this.phonesInCart = phonesInCart;
        this.phonesInCart = {};
        // this.onAddToCart = onAddToCart;
        this.onRemoveFromCart = onRemoveFromCart;

        this._render();
        // this._element.addEventListener('click', this.addToCart.bind(this))
        this._element.addEventListener('click', this.removeFromCart.bind(this))
    }

    // addToCart({target}) {
    //     // this.phonesInCart
    //     const addElement = target.closest('.btn-success');
    //     if (!addElement) {
    //         return;
    //     }
    //     console.log(addElement);
    //
    //     // this.phonesInCart(addElement.dataset.id);
    //     this.onAddToCart(addElement.closest('.thumbnail').dataset.id);
    //     // console.log(addElement.closest('.thumbnail').dataset.id);
    // }

    add(addedPhoneId) {

        this.phonesInCart[addedPhoneId] ? this.phonesInCart[addedPhoneId]++ : this.phonesInCart[addedPhoneId] = 1;
        this._render();
    }

    remove(addedPhoneId) {

        // this.phonesInCart[addedPhoneId] ? this.phonesInCart[addedPhoneId]-- : this.phonesInCart[addedPhoneId] = 0;
        delete this.phonesInCart[addedPhoneId];
        this._render();
    }

    removeFromCart({target}) {
        const removeElement = target.closest('.remove');
        if (!removeElement) {
            return;
        }

        this.onRemoveFromCart(removeElement.closest('li').dataset.id);
    }

    _render() {

        let phonesInCartTemplate = '';
        for ( let key in this.phonesInCart) {
            phonesInCartTemplate += '<li data-id="' + key + '">' + key + ' : ' + this.phonesInCart[key] + '<span class="remove" title="remove item form cart">✘</span></li>';
        }

        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul>
                ${phonesInCartTemplate}
            
                <!--<li>Phone 1</li>-->
                <!--<li>Phone 2</li>-->
                <!--<li>Phone 3</li>-->
            </ul>        
        `;
    }

}
