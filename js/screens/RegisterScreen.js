import { auth } from '../utils.js';
const $template = document.getElementById('register-screen')

class RegisterScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true))
    }

    // connectedCallback() {}{}
    
}

window.customElements.define('register-screen', RegisterScreen)