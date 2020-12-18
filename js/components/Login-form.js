const $template = document.getElementById('login-form-template')
import { checkInputWrapperValue, md5, validateEmail, makeAuth } from "../utils.js"
class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true))
        this.$loginForm = this.shadowRoot.getElementById('login-form')
        this.$email = this.shadowRoot.getElementById('email')
        this.$password = this.shadowRoot.getElementById('password')
    }
    connectedCallback() {
        this.$loginForm.onsubmit = async(event) => {
            event.preventDefault();
            //lay du liei
            let email = this.$email.value;
            let password = this.$password.value
            let isPasster = checkInputWrapperValue(this.$email, function(value) {
                return value == ""
            }, "Nhập vào email") & checkInputWrapperValue(this.$email, function(value) {
                return !validateEmail(value);
            }, "email Không hợp lệ") & checkInputWrapperValue(this.$password, function(value) {
                return value == ""
            }, "Nhập vào mật khẩu")
            if (isPasster) {
                let reuslt = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .where('password', '==', md5(password))
                    .get()
                console.log(reuslt)
                if (reuslt.empty) {
                    alert("Email hoac mật khẩu không chính xác")
                } else {
                    // alert("dang nhap thanh cong"j)
                    // window.location.href = "index.html"
                    makeAuth({
                        name: reuslt.docs[0].data().name,
                        id: reuslt.docs[0].id,
                        email: reuslt.docs[0].data().email,
                        isAdmin: reuslt.docs[0].data().isAdmin
                    })

                    router.navigate("/index")

                }
            }
        }

    }
}

window.customElements.define('login-form', LoginForm)