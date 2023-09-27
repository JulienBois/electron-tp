class TodoTask extends HTMLElement{

    // On creer les éléments
    $ui       = document.createElement("link")
    $delete   = document.createElement("span")
    $edit     = document.createElement("span")
    $validate = document.createElement("span")
    $value    = document.createElement("div")

    constructor(){
        super()
        // on défini les property de la balise style
        this.$ui.id = "style-task";
        this.$ui.setAttribute("rel","stylesheet")
        this.$ui.setAttribute("type","text/css")
        this.$ui.setAttribute("href", "../app/ui/todo/task.css")

        this.$delete.textContent = "✕"
        this.$delete.classList.add("delete")
        this.$edit.textContent   = "✎"
        this.$edit.classList.add("edit")
        this.$validate.textContent   = "✓"
        this.$validate.classList.add("validate")
    }
    
    connectedCallback(){
        let $host = this.getRootNode();
        if ($host && !$host.querySelector("#style-task")){
            $host.prepend(this.$ui)
        }

        this.appendChild(this.$value)
        this.appendChild(this.$edit)
        this.appendChild(this.$validate)
        this.appendChild(this.$delete)
    }

}

customElements.define("todo-task", TodoTask)