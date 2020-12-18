import { auth } from '../utils.js'

const $template = document.getElementById('register-course-screen')


class RegisterCourseScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$registerCourse = this.shadowRoot.getElementById('register-course')
        this.$cancelRegisterCourse = this.shadowRoot.getElementById('cancel-register-course')

    }

    connectedCallback() {
        let currentUser = auth()

        if (!currentUser) {
            alert('you need Login HEHEH')
            router.navigate('/sign-in')
        }
    }

}

window.customElements.define('register-screen-course', RegisterCourseScreen)