import { checkInputWrapperValue, md5, validateStrongPassword } from "../utils.js"
import { validateEmail } from "../utils.js"
const $teamplate = document.getElementById('register-form-template')

class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true));
        this.$registerForm = this.shadowRoot.getElementById('register-form')
        this.$name = this.shadowRoot.getElementById('name')
        this.$email = this.shadowRoot.getElementById('email')
        this.$password = this.shadowRoot.getElementById('password')
        this.$passwordConfim = this.shadowRoot.getElementById('password-confim')
        console.log(this)
    }
    connectedCallback() {
        console.log(this)
        this.$registerForm.onsubmit = async(event) => {
            event.preventDefault();
            let name = this.$name.value;
            let email = this.$email.value;
            let password = this.$password.value;
            let passwordConfim = this.$passwordConfim.value;

            let isPasster = checkInputWrapperValue(this.$name, function(value) {
                return value == "";
            }, "Nhap vao ten") & checkInputWrapperValue(this.$email, function(value) {
                return value == "" || !validateEmail(value)
            }, "nhap vao email hop le") & checkInputWrapperValue(this.$password, function(value) {
                return value = "" || !validateStrongPassword(value);
            }, "Mat khau khong hop le") & checkInputWrapperValue(this.$passwordConfim, function(value) {
                return value == "" || value != password
            }, "Xac nhan mat khau khong hop le")

            if (isPasster) {

                //check email trung
                let reuslt = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .get();
                console.log(reuslt)
                if (reuslt.empty) {
                    await firebase.firestore().collection('users').add({
                        name: name,
                        email: email,
                        password: md5(password),
                        coures: [],
                    })
                    alert("dang ky thanh cong")
                    window.location.href = "index.html#/sign-in"
                } else {

                    alert("Email " + email + "Da co nguoi su dung")
                }
                //luu du lieu
            }
        }
    }
}

window.customElements.define('register-form', RegisterForm)