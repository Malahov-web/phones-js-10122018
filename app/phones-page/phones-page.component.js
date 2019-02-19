import { PhonesCatalogComponent } from './phone-catalog/phone-catalog.component.js';
import { OnePhoneViewComponent } from './one-phone-view/one-phone-view.component.js';
import { PhonesPageService } from './phones-page.service.js';

export class PhonesPageComponent {
  constructor({ element }) {
    this.element = element;
    this._render();

    this._initPhoneService();

    this._initCatalog();

    this._initOnePhoneView();

  }

  _initCatalog() {
    this._phoneCatalog = new PhonesCatalogComponent({
      element: this.element.querySelector('#catalog'),
      phones: this._phoneService.getAllPhones(),
      onPhoneSelect: (phoneId)=>{
        const phoneDetails = this._phoneService.getPhonesById(phoneId);
        this._phoneCatalog.hide();
        this._phoneViewer.show(phoneDetails);
      }
    });
  }

  _initOnePhoneView() {
    this._phoneViewer = new OnePhoneViewComponent({
      element: this.element.querySelector('#item'),
      onBackToCatalog: ()=>{
        this._phoneCatalog.show();
        this._phoneViewer.hide();
      }
    });
  }

  _initPhoneService() {
    this._phoneService = new PhonesPageService();
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

      <section>
        <p>Shopping Cart</p>
        <ul>
          <li>Phone 1</li>
          <li>Phone 2</li>
          <li>Phone 3</li>
        </ul>
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
