import { auth } from "../utils.js";

const $teamplate = document.getElementById('create-courses-template')

class CreateCoureses extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($teamplate.content.cloneNode(true));
        this.$category = this.shadowRoot.getElementById('category-courses')
        this.$createDescriptionCoursesFrom = this.shadowRoot.getElementById('create_description_course')
        this.$nameCourses = this.shadowRoot.getElementById('create-name-course')
        this.$ownerCourse = this.shadowRoot.getElementById('create-owner-course')
        this.$descriptionContentCourses = this.shadowRoot.getElementById('create-description-content-course')
        this.$fileCourses = this.shadowRoot.getElementById('create-file-course')
        this.$process = this.shadowRoot.getElementById('process')
    }

    connectedCallback() {
        console.log(this.$process)
        this.$createDescriptionCoursesFrom.onsubmit = async (event) => {
            event.preventDefault();
            var video = this.$fileCourses.files[0]
            var videName = video.name;
            var storageRef = await firebase.storage().ref('video/' + videName);
            var upLoadTask = storageRef.put(video)

            upLoadTask.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // alert('Upload is ' + progress + '% done');
                // console.log(this.$process)
                this.$process.innerHTML = "Upload " + Math.ceil(progress) + " % done";
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                // Handle unsuccessful uploads
            }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                upLoadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    console.log('File available at', downloadURL);

                    let currentUser = auth();
                    if (!currentUser) return;
                    await firebase.firestore().collection('courses')
                        .add({
                            category: this.$category.value,
                            description: this.$descriptionContentCourses.value,
                            name: this.$nameCourses.value,
                            owner: this.$ownerCourse.value,
                            video: downloadURL,
                        })
                    this.$category.value = '';
                    this.$descriptionContentCourses.value = ''
                    this.$nameCourses.value = ''
                    this.$ownerCourse.value = ''
                    this.$fileCourses.value = ''
                });
            });



        }

    }

}

window.customElements.define('create-courses', CreateCoureses)