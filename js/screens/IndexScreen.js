const $template = document.getElementById('index-screen')

class IndexScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true))
    }
}
window.customElements.define('index-screen', IndexScreen)