const $template = document.getElementById('lessons-container-template')

class LessonsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$lesson = this.shadowRoot.getElementById('course-chapter')
        // this.$videoLesson = this.shadowRoot.getElementById('video-lessons')
        // this.$sourceVideo = this.shadowRoot.getElementById('source-video')
        // this.$category = this.shadowRoot.getElementById('category')
        // this.$description = this.shadowRoot.getElementById('description')
        // this.$owner = this.shadowRoot.getElementById('owner')
    }
    static get observedAttributes() {
        return ['name', 'category', 'description', 'owner', 'video']
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'name':
                this.$lesson.innerHTML = newValue;
                break;
        }
    }

    connectedCallback() {
        this.$lesson.onclick = () => {
            let changeVideoEvent = new CustomEvent('change-video-event', {
                bubbles: true,
                detail: {
                    video: this.getAttribute('video'),
                    category: this.getAttribute('category'),
                    description: this.getAttribute('description'),
                    owner: this.getAttribute('owner'),
                }
            });

            this.dispatchEvent(changeVideoEvent);
        }

    }
}

window.customElements.define('lesson-container', LessonsContainer)