import { auth, getDataFromDoc } from '../utils.js';
const $template = document.getElementById('course_list_template')

class CourseList extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({mode:'open'})
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true))
        this.$Lista = this.shadowRoot.getElementById('list-a')
    }

    async connectedCallback() {

        const course_list_template = document.createElement('list-temp')

        // const course_list_fireBase = this.getCourseList();

        let userId = auth().id
        let result = await firebase
            .firestore()
            .collection('users').doc(userId)
            .get()
        let course = getDataFromDoc(result, ['password', 'name', 'email', 'isAdmin', 'id']).coures
        console.log(course)
        const courseOld = Object.values(course)
        // this.Lista.innerHTML = "aaaaaaaaaaa"

        courseOld.forEach(element => {
            const $a = document.createElement('a')
            // <div><a href="#/${element}">${element}</a></div>
            $a.href = "#/" + element
            $a.innerHTML = element
            console.log($a)
            this.$Lista.appendChild($a)
        });

    }

}

window.customElements.define('course-list', CourseList)