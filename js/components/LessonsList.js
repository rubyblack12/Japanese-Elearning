import { getDataFromDocs, auth } from "../utils.js"

const $template = document.getElementById('lessons-list-template')

class LessonsList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true))
        this.$sourceVideo = this.shadowRoot.getElementById('source-video')
        this.$category = this.shadowRoot.getElementById('category')
        this.$description = this.shadowRoot.getElementById('description')
        this.$owner = this.shadowRoot.getElementById('owner')
        this.$lessonList = this.shadowRoot.getElementById('lessons-list')
        this.$video = this.shadowRoot.getElementById('video')

    }

    static get observedAttributes() {
        return ['course']
    }

    connectedCallback() {

        let currentUser = auth()

        if (!currentUser) {
            alert('you need Login HEHEH')
            router.navigate('/sign-in')
        }

        this.render(this.getAttribute('course'))

        this.$lessonList.addEventListener('change-video-event', (event) => {
            let detail = event.detail;
            console.log(detail)
            this.$sourceVideo.src = detail.video;
            this.$video.load()
            this.$category.innerHTML = "category: " + detail.category;
            this.$description.innerHTML = detail.description;
            this.$owner.innerHTML = detail.owner;

        })
    }

    async render(course) {

        let courses = await firebase.firestore().collection('courses').where('category', '==', course).get();

        let lesson = getDataFromDocs(courses.docs)

        // console.log(lesson)

        lesson.forEach((less) => {
            // // $story.setAttribute('id', story.id)
            let $lesson = document.createElement('lesson-container')
            $lesson.setAttribute('id', less.id)
            $lesson.setAttribute('name', less.name)
            $lesson.setAttribute('category', less.category)
            $lesson.setAttribute('description', less.description)
            $lesson.setAttribute('owner', less.owner)
            $lesson.setAttribute('video', less.video)
            // $lesson.setAttribute('href','#)
            this.$lessonList.appendChild($lesson)

        })


    }
}

window.customElements.define('lesson-list', LessonsList)