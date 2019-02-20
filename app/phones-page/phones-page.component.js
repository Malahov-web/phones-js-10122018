import {PhonesCatalogComponent} from './phone-catalog/phone-catalog.component.js';
import {OnePhoneViewComponent} from './one-phone-view/one-phone-view.component.js';
import {PhonesPageService} from './phones-page.service.js';
import {CartComponent} from './cart/cart.component.js';

export class PhonesPageComponent {
    constructor({element}) {
        this.element = element;
        this._render();

        this._initPhoneService();

        this._initCatalog();

        this._initOnePhoneView();

        this._initCart();

    }

    _initCatalog() {
        this._phoneCatalog = new PhonesCatalogComponent({
            element: this.element.querySelector('#catalog'),
            phones: this._phoneService.getAllPhones(),
            onPhoneSelect: (phoneId) => {
                // console.log(phoneId); // Р.: это описение, а не вызов. ..откуда оно здесь??
                const phoneDetails = this._phoneService.getPhonesById(phoneId);
                this._phoneCatalog.hide();
                this._phoneViewer.show(phoneDetails);
            },
            onAddToCart: (phoneId) => {

                // console.log('onAddToCart ' +  phoneId);
                this._cart.add(phoneId);
            }
        });
    }

    _initOnePhoneView() {
        this._phoneViewer = new OnePhoneViewComponent({
            element: this.element.querySelector('#item'),
            onBackToCatalog: () => {
                this._phoneCatalog.show();
                this._phoneViewer.hide();
            }
        });
    }

    _initPhoneService() {
        this._phoneService = new PhonesPageService();
    }

    _initCart() {
        this._cart = new CartComponent({
            element: this.element.querySelector('#cart'),
            onRemoveFromCart: (phoneId)=>{
                // console.log(phoneId);
                this._cart.remove(phoneId);
            }

            // onAddToCart: (phoneId)=>{
            //     // console.log(phoneId);
            //     this._cart.addToCart(phoneId);
            // }

        });
    }

    _render() {
        this.element.innerHTML = ` <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section>
        <p>
          Search:
          <input>
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>

      <section id="cart">
      </section>
    </div>

    <!--Main content-->
    <div class="col-md-10" >
      <div id="catalog"></div>
      <div id="item"></div>
    </div>

  </div>`;
    }
}

/*
Как работает каталог:

    import PhonesCatalogComponent
    инициализируем _initCatalog()
    создается объект new PhonesCatalogComponent,
    в св-во объекта onPhoneSelect - записывается функция (phoneId)=>{} - показывающая страницу OnePhoneView
    в классе каталога обрабатываем событие addEventListener, на _element (кот-й наследуется от Base)
    _gotoOnePhoneView - вызыв-ся addEventListener, и запускает св-во onPhoneSelect
    this.onPhoneSelect - выполянет передаваемую в него ф-ю (в _initCatalog) и
    show/hide - показывает и скрывает нужные элементы


*/
