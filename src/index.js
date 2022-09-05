// See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html ↵
// #reflecting-content-attributes-in-idl-attributes.
const installStringReflection = (obj, attrName, propName = attrName) => {
  Object.defineProperty(obj, propName, {
    enumerable: true,
    get() {
      const value = this.getAttribute(attrName);
      return value === null ? '' : value;
    },
    set(v) {
      this.setAttribute(attrName, v);
    },
  });
};

const template = document.createElement('template');

template.innerHTML = `
<style>
  :host {
    display: block;
  }
</style>
<slot><button type="button"></slot>`;

class OwnWindow extends HTMLElement {
  #runsInIframe;
  #button;

  constructor() {
    super();

    installStringReflection(this, 'href');
    installStringReflection(this, 'buttontext');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));

    this.#runsInIframe = false;

    this.#button = this.shadowRoot.querySelector('button');
    this.addEventListener('click', () => {
      if (this.#runsInIframe) {
        window.open(this.href);
      }
    });
  }

  connectedCallback() {
    this.href = location.href;
    this.buttontext = 'Click to open in its own window.';

    try {
      this.#runsInIframe = window.self !== window.top;
    } catch (e) {
      this.#runsInIframe = true;
    }
    if (!this.#runsInIframe) {
      this.style.display = 'none';
    }
  }

  static get observedAttributes() {
    return ['href', 'buttontext'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'buttontext') {
      if (this.#button) {
        this.#button.textContent = newValue;
      }
    }
  }
}

customElements.define('own-window', OwnWindow);
