class idomost extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.render();
  }

  render() {
      const helper = document.createElement("template");
      helper.innerHTML = `
          <style>
              .ido {
                  font-size: 80px;
                  font-family: Georgia;
                  color: gray;
                  text-align: center;
                  margin: 0 auto;
              }
          </style>
          <div class="ido">
              ${this.getIdo()}
          </div>
      `;
      this.shadowRoot.appendChild(helper.content.cloneNode(true));
  }

  connectedCallback() {
      this.intervalID = setInterval(() => {
          this.shadowRoot.querySelector(".ido").textContent = this.getIdo();
      }, 1000);
  }

  disconnectedCallback() {
      clearInterval(this.intervalID);
  }

  getIdo() {
      const day = new Date();
      const hour = String(day.getHours()).padStart(2, "0");
      const minute = String(day.getMinutes()).padStart(2, "0");
      const second = String(day.getSeconds()).padStart(2, "0");
      return `${hour}:${minute}:${second}`;
  }
}

customElements.define("az-ido-most", idomost);
