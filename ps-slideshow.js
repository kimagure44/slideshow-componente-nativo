(() => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :root {
        --offset-x: 0;
      }
      .slider {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 635px;
      }
    
      .slider ul {
        display: flex;
        padding: 0;
        width: 100%;
        transition: 500ms ease-in-out;
        margin-left: var(--offset-x);
      }
    
      .slider li {
        width: 100vw;
        list-style: none;
      }
    
      .slider img {
        width: 100vw;
        height: 600px;
      }

      .buttons {
        position: absolute;
        top: 420px;
        color: #ffffff;
        width: 100vw;
      }
      .prev, 
      .next {
        font-size: 2.5rem;
        cursor: pointer;
        opacity: 0.5;
        user-select: none;
        border-radius: 100px;
        padding: 0;
        margin: 0;
        height: 50px;
        width: 50px;
        text-align: center;
        transition: 300ms ease-in-out;
      }
      .next {
        position: absolute;
        right: 20px;
      }
      .prev {
        position: absolute;
        left: 5px;
      }
      .next:hover, 
      .prev:hover {
        background-color: #ffffff;
        color: #000000;
        transition: 300ms ease-in-out;
      }
      
    </style>
    <div class="slider">
      <div class='buttons'>
        <a class='prev'><</a>
        <a class='next'>></a>
      </div>
      <ul></ul>
    </div>
  `;

  class PSSlideshow extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.offsetX = 0;
      this.setTime = null;
      this.totalImg = 0;
      this.shadowRoot.querySelector('.prev').addEventListener('click', this.slide.bind(this), false);
      this.shadowRoot.querySelector('.next').addEventListener('click', this.slide.bind(this), false);
    }

    get auto() {
      return this.getAttribute('auto');
    }

    set auto(value) {
      this.setAttribute('auto', value);
    }

    get delay() {
      return this.getAttribute('delay');
    }

    set delay(value) {
      this.setAttribute('delay', value);
    }
    
    get direction() {
      return this.getAttribute('direction');
    }

    set direction(value) {
      this.setAttribute('direction', value);
    }

    get listImg() {
      return this.listImg;
    }

    set listImg(value) {
      this.setAttribute('list-img', value);
    }

    static get observedAttributes() {
      return ['auto', 'delay', 'direction', 'list-img'];
    }
    
    attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'auto') {
        if (this.parseBoolean(newValue)) {
          this.setTime = setInterval(() => {
            if (!this.parseBoolean(this.getAttribute('auto'))) {
              clearInterval(this.setTime);
            }
            if (this.direction === 'left') {
              this.shadowRoot.querySelector('.prev').click();
            } 
            if (this.direction === 'right') {
              this.shadowRoot.querySelector('.next').click();
            }
          }, this.delay);
        } else {
          clearInterval(this.setTime);
        }
      }
      if (attrName === 'delay' && this.parseBoolean(this.auto)) {
        if (oldValue !== newValue) {
          this.auto = false;
          this.delay = newValue;
          this.auto = true;
        }
      }
      if (attrName === 'list-img' && newValue.length > 0) {
        const templateImg = document.createElement('template');
        const jsonParse = JSON.parse(newValue);
        this.totalImg = jsonParse.length - 1;
        jsonParse.forEach(el => templateImg.innerHTML += `<li><img src='${el}'></li>`);
        this.shadowRoot.querySelector('.slider ul').appendChild(templateImg.content.cloneNode(true));
      }
    }

    connectedCallback() {
      if (!this.hasAttribute('auto')) {
        this.auto = false;
      }
      if (!this.hasAttribute('delay')) {
        this.delay = '3000';
      }
      if (!this.hasAttribute('direction')) {
        this.direction = 'right';
      }
      if (!this.hasAttribute('lsit-img')) {
        this.listImg = [];
      }
    }

    slide(evt) {
      const direction = evt.currentTarget.classList.contains('next');
      if (direction && ++this.offsetX > this.totalImg) this.offsetX = 0;
      if (!direction && --this.offsetX < 0) this.offsetX = this.totalImg;
      const ul = this.shadowRoot.querySelector('.slider ul');
      ul.style.setProperty('--offset-x', `${-1*(this.offsetX * 100)}vw`);
    }

    parseBoolean(value) {
      return (value === 'true');
    }
  }

  customElements.define('ps-slideshow', PSSlideshow);
})();