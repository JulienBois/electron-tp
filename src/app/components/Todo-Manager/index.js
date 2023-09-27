const Store = require("electron-store");

class TodoManager extends HTMLElement{

    // On creer les éléments
    $ui    = document.createElement("link")
    $list  = document.createElement("todo-list")
    $input = document.createElement("todo-input")

    constructor(){
        super()
        // on initialise le shadowDOM
        this.attachShadow({mode: "open"})
        // on défini les property de la balise style
        this.$ui.setAttribute("rel","stylesheet")
        this.$ui.setAttribute("type","text/css")
        this.$ui.setAttribute("href", "../app/ui/todo/manager.css")
    }

    // Quand l'élement est initialiser et fonctionnel on lui charge ces enfants
    connectedCallback(){
        this.shadowRoot.appendChild(this.$ui);
        this.shadowRoot.appendChild(this.$list)
        this.shadowRoot.appendChild(this.$input)
    }

}

customElements.define("todo-manager", TodoManager)