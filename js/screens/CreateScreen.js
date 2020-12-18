import { auth, getDataFromDoc } from '../utils.js';
const $teamplate = document.getElementById('create-course-screen')

class CreateScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true));

    }
    async connectedCallback() {
        console.log('trang dang ky')
        let currentUser = auth()

        if (currentUser) {
            let result = await firebase
                .firestore()
                .collection('users').doc(currentUser.id)
                .get()

            let data = getDataFromDoc(result, [])

            if (!data.isAdmin) {
                alert('you not admin')
                router.navigate('/')
            } else {
            }
        } else {
            alert('you need Login HEHEH')
            router.navigate('/sign-in')
        }
    }
}

window.customElements.define('create-course-screen', CreateScreen)