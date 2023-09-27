class TodoInput extends HTMLElement{
    // On creer les éléments
    $ui     = document.createElement("link")
    $button = document.createElement("button")
    $input  = document.createElement("input")

    constructor(){
        super()
        // on défini les property de la balise style
        this.$ui.id = "style-input"
        this.$ui.setAttribute("rel","stylesheet")
        this.$ui.setAttribute("type","text/css")
        this.$ui.setAttribute("href", "../app/ui/todo/input.css")

        this.$button.textContent = "Ajouter une tache"
    }
    
    connectedCallback(){
        const store = new Store();
        let $host = this.getRootNode();
        if ($host && !$host.querySelector("#style-input")){
            $host.prepend(this.$ui)
        }

        this.$button.addEventListener("click",() => {
            const tasks = JSON.parse(store.get("tasks"));
            if (this.$input.value === ""){
                return
            }

            let $task = document.createElement("todo-task")
                $task.$value.innerHTML = this.$input.value
                this.getRootNode().querySelector("todo-list").prepend($task)
            tasks.push(this.$input.value);
            store.set("tasks", JSON.stringify(tasks));
            console.log(tasks);
            this.$input.value = ""
        })

        this.appendChild(this.$input)
        this.appendChild(this.$button)
    }
}

customElements.define("todo-input", TodoInput)