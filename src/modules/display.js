import Project from "./project";

export default class Display {
    static projectsContainer = document.querySelector('#custom-projects');
    static deleteButtons = document.querySelectorAll('.delete-icon');
    static addProjectInput = document.querySelector('#project-textbox');

    static init() {  
          Display.updateButtons();
          Display.updateInput();
    }

    static addProject(project) {
        const p = `
        <div class="project" data-name='${project.name}'>
            <span class="material-symbols-rounded project-icon">list</span>
            <p>${project.name}</p> <span class="material-symbols-rounded delete-icon">delete</span>
        </div>
        `
        Display.projectsContainer.insertAdjacentHTML("beforeend", p);
        Display.updateButtons();
    }

    static removeProject(name) {
        const p = document.querySelector(`.project[data-name="${name}"]`);
        if (p) {
            p.remove();
        }
        
    }

    static updateButtons() {
        Display.deleteButtons = document.querySelectorAll('.delete-icon');
        Display.deleteButtons.forEach(btn => {
            btn.addEventListener('click', e => Display.removeProject(e.target.parentElement.dataset.name));
        });
    }

    static updateInput() {
        Display.addProjectInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.addProject(new Project(e.target.value));
            }
        })
    }
}
