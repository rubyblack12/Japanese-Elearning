import { auth, removeAuth, getDataFromDoc } from '../utils.js'
const $teamplate = document.getElementById('navbar-template')

class Navbar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true));
        this.$menu = this.shadowRoot.getElementById('menu')
        this.$currentUserInfo = this.shadowRoot.getElementById('current-user-info')
        this.$currentUserName = this.shadowRoot.getElementById('current-user-name')
        this.$logout = this.shadowRoot.getElementById('logout')
        this.$createCourse = this.shadowRoot.getElementById('createCourse')
    }
    async connectedCallback() {
        let currentUser = auth()
            // if(currentUser.id)
            // console.log(currentUser)
            // console.log(getUserFromFirebase(currentUser.id).)

        // var data = getUserFromFirebase(currentUser.id)
        if (currentUser) {
            let result = await firebase
                .firestore()
                .collection('users').doc(currentUser.id)
                .get()
            let data = getDataFromDoc(result, [])

            if (!data.isAdmin) {
                this.$createCourse.style.display = 'none'
            } else {
                this.$createCourse.style.display = 'flex'
            }
        }


        // return result

        // console.log(data2)

        if (currentUser) {
            this.$currentUserInfo.style.display = 'flex'
            this.$currentUserName.innerHTML = "Thông tin " + currentUser.name
        } else {
            this.$menu.style.display = 'flex'
        }
        this.$logout.onclick = () => {
            removeAuth()
            router.navigate('/')
        }

    }
}

window.customElements.define('nav-bar', Navbar)