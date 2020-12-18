import { auth, getDataFromDoc } from '../utils.js'

const $template = document.getElementById('course-register-template')

class RegisterCourse extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$nameCourseRegister = this.shadowRoot.getElementById('name-course-register')
        this.$registerCourse = this.shadowRoot.getElementById('register-course')
        this.$cancelRegisterCourse = this.shadowRoot.getElementById('cancel-register-course')
    }
    static get observedAttributes() {
        return ['name']
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'name':
                this.$nameCourseRegister.innerHTML = newValue;
                break;
        }
    }
    connectedCallback() {
        // this.disabledButton()
        this.$registerCourse.onclick = () => {
            this.registerCourse()
        }
        this.$cancelRegisterCourse.onclick = () => {
            this.cancelRegisterCourse()
        }
    }
    async cancelRegisterCourse() {
        // console.log(auth().course)
        let userId = auth().id
        let result = await firebase
            .firestore()
            .collection('users').doc(userId)
            .get()
        let oldCourse = getDataFromDoc(result, ['password', 'name', 'email', 'isAdmin', 'id']).coures

        for (let i = 0; i < oldCourse.length; i++) {
            // console.log(auth().course[i])
            if (oldCourse[i] == this.$nameCourseRegister.innerHTML) {
                oldCourse.splice(i, 1)
            }
        }
        console.log(oldCourse)

        await firebase
            .firestore()
            .collection('users').doc(userId)
            .update({ coures: oldCourse })
        this.$cancelRegisterCourse.disabled = true;
    }
    async registerCourse() {
        // console.log(this.$nameCourseRegister.innerHTML)
        let userId = auth().id

        let result = await firebase
            .firestore()
            .collection('users').doc(userId)
            .get()
        let course = getDataFromDoc(result, ['password', 'name', 'email', 'isAdmin', 'id'])
        if (course == "") {
            course.coures.push(this.$nameCourseRegister.innerHTML)
        }
        // course.push('aa')
        for (let i = 0; i < course.coures.length; i++) {
            if (course.coures[i] == this.$nameCourseRegister.innerHTML) {
                alert('da dang ky khoa nay')
                return;
            }
        }
        course.coures.push(this.$nameCourseRegister.innerHTML)
            // console.log(course)

        await firebase
            .firestore()
            .collection('users').doc(userId)
            .update({ coures: course.coures })
        this.$registerCourse.disabled = true;
        // course.push('a')
        // console.log(course)
        // await firebase.firestore().collection('users').where('id', '==', userId).update({

        // })
    }
}

window.customElements.define('register-course', RegisterCourse)