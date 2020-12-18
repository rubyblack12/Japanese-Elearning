const $teamplate = document.getElementById('menu-template')

class MenuHome extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true));

    }
}

window.customElements.define('menu-home', MenuHome)