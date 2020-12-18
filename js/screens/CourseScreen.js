import { auth } from '../utils.js';
const $template = document.getElementById('course_screens')

class CourseScreens extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true))

    }
    connectedCallback() {
        let currentUser = auth()

        if (!currentUser) {
            alert('you need Login HEHEH')
            router.navigate('/sign-in')
        }
    }
}

window.customElements.define('course-screen', CourseScreens)