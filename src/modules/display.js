import Project from "./project";
import Events from './events';

export default class Display {
    static projectsContainer = document.querySelector('#custom-projects');
    static deleteButtons = document.querySelectorAll('.delete-icon');
    static addProjectInput = document.querySelector('#project-textbox');

    static init() {  
          Display.updateButtons();
          Display.updateInput();
          Display.updateEvents();
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
        console.log(`Project ${project.name} is created.`);
    }

    static addEntry(entry) {
        
    }

    static removeProject(name) {
        const p = document.querySelector(`.project[data-name="${name}"]`);
        if (p) {
            p.remove();
            console.log(`Project ${name} was removed.`);
        }    
    }

    static updateButtons() {
        Display.deleteButtons = document.querySelectorAll('.delete-icon');
        Display.deleteButtons.forEach(btn => {
            btn.addEventListener('click', e => Events.emit('tryRemoveProject', e.target.parentElement.dataset.name));
        });
    }

    static updateInput() {
        Display.addProjectInput.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                Events.emit('inputNewProject', e.target.value);
            }
        })
    }

    static updateEvents() {
        Events.on('projectCreated', (project) => {Display.addProject(project)});
        Events.on('projectRemoved', (name) => Display.removeProject(name));
    }
}
