class Modal extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.mapComponentAttributes();
    this.render();
    this.initComponent();
  }

  mapComponentAttributes() {
    const attributesMapping = ["title", "message"];

    // si alguno de los dos atributos de attributesMapping está empty entonces dejar un mensaje por default
    attributesMapping.map((key) => {
      if (!this.attributes[key]) {
        this.attributes[key] = { value: "" };
      }
    });
  }

  render() {
    this.shadowDOM.innerHTML = `
            ${this.templateCss()}
            ${this.template()}
        `;
  }

  template() {
    return `
        <div class="permission-modal">
            <div class="permission-modal-content">
              <div class="permission-modal-header">
                  <h2 class="permission-modal-title">${
                    this.attributes.title.value != ""
                      ? this.attributes.title.value
                      : "Allow Microphone"
                  }</h2>
                  <p class="permission-modal-message">${
                    this.attributes.message.value != ""
                      ? this.attributes.message.value
                      : "To use voice input, press Allow to give access to your microphone."
                  }</p>
             </div>
               <div class="permission-modal-body">
                  <button class="permission-modal-button" id="permission-allow">Allow</button>
             </div>
          </div>
        </div>
        `;
  }

  templateCss() {
    return `
            <style>
			.permission-modal{
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				box-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);
				background-color: rgba(0, 0, 0, .50);
				backdrop-filter: blur(3px);
				z-index: 9999;
			}
			.permission-modal-content{
				max-width: 400px;
				position: absolute;
				top: 44%;
				left: 50%;
				transform: translate(-44%, -50%);
			}
			.permission-modal-header{
				color: #fff;
				font-family: 'Poppins', sans-serif;
			}
			.permission-modal-header>h2{
				font-size: 1.5rem;
				font-weight: 600;
				margin-bottom: 1rem;
			}
			.permission-modal-header>p{
				font-size: 13px;
				margin-bottom: 2rem;
			}
			button.permission-modal-button{
				background-color: transparent;
				border: 1px solid #fff;
				border-radius: 30px;
				font-weight: 600;
				color: #fff;
				font-family: 'Poppins', sans-serif;
				padding: 0.5rem 2.5rem;
				cursor: pointer;
			}
			button.permission-modal-button:hover{
				background-color: #fff;
				color: #000;
				transition: 0.3s ease-in-out;
			}
		</style>
        `;
  }

  validateBrowser() {
    // validate speechreo
    const browserspeech =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    try {
      const browserspeech_ = new browserspeech();
      return true;
    } catch (err) {
      this.$modalDOMTitle.innerHTML = "Unsupported browser";
      this.$modalDOMMessage.innerHTML =
        "To enable the SpeechRecognition in Firefox Nightly > 72, go to about:config and switch the flags media.webspeech.recognition.enable and media.webspeech.recognition.force_enable to true.";
      return false;
    }
  }

  async validateMicrophone() {
    let permission;
    try{
      permission = navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    }catch(err){
      this.$modalDOMTitle.innerHTML = "Insecure website"
      this.$modalDOMMessage.innerHTML = "Make sure to use secure SSL websites to allow access to the microphone.";
    }
    return permission;
  }

  async initComponent() {
    this.$root = this.shadowDOM.querySelector(".permission-modal");
    this.$modalDOMMessage = this.shadowDOM.querySelector(
      ".permission-modal-message"
    );
    this.$modalDOMTitle = this.shadowDOM.querySelector(
      ".permission-modal-title"
    );
    let allowButton = this.shadowDOM.getElementById("permission-allow");

    // revisar si browser y microfono pueden ser utilizados
    const browserSupport = this.validateBrowser();
    const micAllowed = await this.validateMicrophone();

    if (browserSupport && micAllowed) this.$root.style.display = "none";

    // when allow button is pressed then reload page
    allowButton.onclick = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
  }

  disconnectedCallback() {
    this.remove();
  }
}

export default Modal;
