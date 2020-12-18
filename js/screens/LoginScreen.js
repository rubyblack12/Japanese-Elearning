const $template = document.getElementById('login-screen')

class LoginScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true))
    }
}

window.customElements.define('login-screen', LoginScreen)