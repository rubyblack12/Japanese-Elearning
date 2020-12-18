const $teamplate = document.getElementById('input-wrapper-template')
class InputWraper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true))

        this.$input = this.shadowRoot.getElementById('input-main')
        this.$error = this.shadowRoot.getElementById('input-error')
    }
    static get observedAttributes() {
        return ['label', 'type', 'error', 'value']
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'label':
                this.$input.placeholder = newValue;
                break;
            case 'type':
                this.$input.type = newValue;
                break;
            case 'error':
                this.$error.innerHTML = newValue;
                break;
            case 'value':
                this.$input.value = newValue;
                break;
        }
    }
    get value() {
        return this.$input.value;
    }
    set error(messge) {
        this.setAttribute('error', messge)
    }
}

window.customElements.define('input-wrapper', InputWraper)
