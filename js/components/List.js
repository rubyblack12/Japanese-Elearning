
const $template = document.getElementById('list-template')

class List extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({mode:'open'})
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true))
    }


}

window.customElements.define('list-temp', List)