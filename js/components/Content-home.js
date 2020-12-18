const $teamplate = document.getElementById('content-home')
class ContentHome extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true))
        this.$img = this.shadowRoot.getElementById('img-content-home')
        this.$title = this.shadowRoot.getElementById('title-content-home')
    }
    static get observedAttributes() {
        return ['img', 'title']
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'imge':
                this.$img.src = newValue;
                break;
            case 'title':
                this.$title.innerHTML = newValue;
                break;
        }
    }

}

window.customElements.define('content-home', ContentHome)