class TodoList extends HTMLElement{

    // On creer les éléments
    $ui     = document.createElement("link")
    tasks   = []
    
    constructor(){
        super()

        const store = new Store()
        // on défini les property de la balise style
        this.$ui.id = "style-list"
        this.$ui.setAttribute("rel","stylesheet")
        this.$ui.setAttribute("type","text/css")
        this.$ui.setAttribute("href", "../app/ui/todo/list.css")
    }
    
    connectedCallback(){
        const store = new Store();
        let $host = this.getRootNode();
        if ($host && !$host.querySelector("#style-list")){
            $host.prepend(this.$ui)
        }

        this.addEventListener("click", e => {
            if (e.target.classList.contains("edit") ){
                let $input = document.createElement("input")
                let $task  = e.target.closest("todo-task");

                $input.value             = $task.$value.textContent
                $input.dataset.backup    = $input.value
                $task.$value.textContent = ""
                $task.prepend($input);
                return
            }

            if (e.target.classList.contains("validate") ){
                let $task  = e.target.closest("todo-task");
                let $input = $task.querySelector("input");

                $task.$value.textContent = $input.value
                $input.remove()
                const tasks = JSON.parse(store.get("tasks"));
                tasks[tasks.indexOf($input.value)] = $input.value;
                store.set("tasks", JSON.stringify(tasks));
                console.log("Tâches présentes : " + tasks);
                return
            }

            if (e.target.classList.contains("delete")){
                let $task  = e.target.closest("todo-task");
                let $input = $task.querySelector("input");

                if ($input){
                    $task.$value.textContent = $input.dataset.backup;
                    $input.remove()
                    const tasks = JSON.parse(store.get("tasks"));
                    const newTasks = tasks.filter((f) => f != $input.value)
                    store.set("tasks", JSON.stringify(newTasks));
                    console.log("Tâches présentes : " + newTasks);
                } else {
                    $task.remove()
                }
                
                return
            }


            e.target.nodeName === "DIV" 
                ? e.target.closest("todo-task").classList.toggle("check")
                : e.target.classList.toggle("check")
        })

        let tasks = store.get("tasks");
        if (tasks === undefined){
            tasks = "[]";
            store.set("tasks", tasks);
        }
        const parsedTasks = JSON.parse(tasks);

        parsedTasks.forEach((t) => {
            const $singleTask = document.createElement("todo-task");
            $singleTask.$value.innerHTML = t;
            this.appendChild($singleTask);
        })
        console.log("Tâches présentes au lancement:" + parsedTasks);
    }

}

customElements.define("todo-list", TodoList)