export default class ProjectList {
    constructor(projects) {
        this.projects = projects;

        this.#createElement();
    }

    #createElement() {
        this.element = document.createElement('ul');
        this.element.classList.add('project-list');
    }

    render(container) {
        this.projects.forEach((project) => {
            project.toggleElement.addEventListener('click', () => {
                this.projects.forEach(p => {
                    if (p === project) {
                        p.toggle();
                    } else if (p.isExpanded) {
                        p.close();
                    }
                })

            });

            const listItem = document.createElement('li');
            listItem.append(project.element);

            this.element.append(listItem);
        });

        container.append(this.element);
    }
}