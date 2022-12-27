(()=>{"use strict";class t extends HTMLElement{constructor(){super(),this.shadowDOM=this.attachShadow({mode:"open"})}connectedCallback(){this.mapComponentAttributes(),this.render(),this.initComponent()}mapComponentAttributes(){["title","message"].map((t=>{this.attributes[t]||(this.attributes[t]={value:""})}))}render(){this.shadowDOM.innerHTML=`\n\t\t\t\t\t\t${this.templateCss()}\n\t\t\t\t\t\t${this.template()}\n\t\t\t\t`}template(){return`\n\t\t\t\t<div class="permission-modal">\n\t\t\t\t\t\t<div class="permission-modal-content">\n\t\t\t\t\t\t\t<div class="permission-modal-header">\n\t\t\t\t\t\t\t\t\t<h2 class="permission-modal-title">${""!=this.attributes.title.value?this.attributes.title.value:"Allow Microphone"}</h2>\n\t\t\t\t\t\t\t\t\t<p class="permission-modal-message">${""!=this.attributes.message.value?this.attributes.message.value:"To use voice input, press Allow to give access to your microphone."}</p>\n\t\t\t\t\t\t </div>\n\t\t\t\t\t\t\t <div class="permission-modal-body">\n\t\t\t\t\t\t\t\t\t<button class="permission-modal-button" id="permission-allow">Allow</button>\n\t\t\t\t\t\t </div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t`}templateCss(){return"\n\t\t\t<style>\n\t\t\t.permission-modal{\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tbox-shadow: 0 0 1rem 0 rgb(0 0 0 / 20%);\n\t\t\t\tbackground-color: rgba(0, 0, 0, .50);\n\t\t\t\tbackdrop-filter: blur(3px);\n\t\t\t\tz-index: 9999;\n\t\t\t\tdisplay:none;\n\t\t\t}\n\t\t\t@media(max-width: 1024px){\n\t\t\t\t.permission-modal-content{\n\t\t\t\t\tmin-width:80%;\n\t\t\t\t\tmax-width:80%;\n\t\t\t\t}\n\t\t\t}\n\t\t\t.permission-modal-content{\n\t\t\t\tmax-width: 400px;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 44%;\n\t\t\t\tleft: 50%;\n\t\t\t\ttransform: translate(-44%, -50%);\n\t\t\t}\n\t\t\t.permission-modal-header{\n\t\t\t\tcolor: #fff;\n\t\t\t\tfont-family: 'Poppins', sans-serif;\n\t\t\t}\n\t\t\t.permission-modal-header>h2{\n\t\t\t\tfont-size: 1.5rem;\n\t\t\t\tfont-weight: 600;\n\t\t\t\tmargin-bottom: 1rem;\n\t\t\t}\n\t\t\t.permission-modal-header>p{\n\t\t\t\tfont-size: 13px;\n\t\t\t\tmargin-bottom: 2rem;\n\t\t\t}\n\t\t\tbutton.permission-modal-button{\n\t\t\t\tbackground-color: transparent;\n\t\t\t\tborder: 1px solid #fff;\n\t\t\t\tborder-radius: 30px;\n\t\t\t\tfont-weight: 600;\n\t\t\t\tcolor: #fff;\n\t\t\t\tfont-family: 'Poppins', sans-serif;\n\t\t\t\tpadding: 0.5rem 2.5rem;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\tbutton.permission-modal-button:hover{\n\t\t\t\tbackground-color: #fff;\n\t\t\t\tcolor: #000;\n\t\t\t\ttransition: 0.3s ease-in-out;\n\t\t\t}\n\t\t</style>\n\t\t\t\t"}validateBrowser(){return!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)||(this.$root.style.display="inherit",this.$modalDOMTitle.innerHTML="Unsupported browser",this.$modalDOMMessage.innerHTML="This browser does not support voice input. Please use a Chromium based browser like Chrome or Edge. or use firefox",!1)}async validateMicrophone(){let t;try{t=navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then((t=>!0)).catch((t=>(this.$root.style.display="block",!1)))}catch(t){this.$root.style.display="block",this.$modalDOMTitle.innerHTML="Insecure website",this.$modalDOMMessage.innerHTML="Make sure to use secure SSL websites to allow access to the microphone."}return t}async initComponent(){this.$root=this.shadowDOM.querySelector(".permission-modal"),this.$modalDOMMessage=this.shadowDOM.querySelector(".permission-modal-message"),this.$modalDOMTitle=this.shadowDOM.querySelector(".permission-modal-title");let t=this.shadowDOM.getElementById("permission-allow");const e=this.validateBrowser(),s=await this.validateMicrophone();e&&s&&(this.$root.style.display="none"),t.onclick=()=>{setTimeout((()=>{window.location.reload()}),500)}}disconnectedCallback(){this.remove()}}const e=t;customElements.get("modal-popup")||customElements.define("modal-popup",e)})();