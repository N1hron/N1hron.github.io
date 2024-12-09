export default class Project {
    constructor({ id, name, link, description = null }, lang = 'en') {
        this.id = id;
        this.name = name;
        this.link = link;
        this.description = description;
        this.lang = lang;
        this.isExpanded = false;

        this.#createElements();
    }

    changeLanguage(lang) {
        this.lang = lang;

        this.#updateText();
    }

    expand() {
        this.element.classList.add('project_expanded');
        this.descriptionElement.style.height = `${this.descriptionElement.scrollHeight}px`;
        this.toggleElement.ariaExpanded = 'true';

        this.isExpanded = true;
    }

    close() {
        this.element.classList.remove('project_expanded');
        this.descriptionElement.style.height = '';
        this.toggleElement.ariaExpanded = 'false';

        this.isExpanded = false;
    }

    toggle() {
        if (this.isExpanded) {
            this.close();
        } else {
            this.expand();
        }
    }

    #updateText() {
        if (this.lang === 'ru') {
            this.linkElement.lang = 'ru';
            this.descriptionElement.lang = 'ru';

            this.linkElement.textContent = 'Ссылка';
            this.descriptionTextElement.textContent = this.description?.[this.lang] || 'Описание отсутствует';
        } else {
            this.linkElement.removeAttribute('lang');
            this.descriptionElement.removeAttribute('lang');

            this.linkElement.textContent = 'Link';
            this.descriptionTextElement.textContent = this.description?.[this.lang] || 'Description is empty';
        }
    }

    #createElements() {
        const descriptionId = `description-${this.id}`;

        this.element = document.createElement('article');
        this.element.classList.add('project');

        const headerElement = document.createElement('header');
        headerElement.classList.add('project__header');

        this.nameElement = document.createElement('h2');
        this.nameElement.classList.add('project__name');

        this.toggleElement = document.createElement('button');
        this.toggleElement.id = `toggle-${this.id}`;
        this.toggleElement.classList.add('project__toggle')
        this.toggleElement.textContent = this.name;
        this.toggleElement.ariaExpanded = 'false';
        this.toggleElement.setAttribute('aria-cintrols', descriptionId);

        const chevronElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        chevronElement.classList.add('project__toggle-chevron');
        chevronElement.setAttribute('stroke-width', 'var(--border-width, 2)');
        chevronElement.setAttribute('viewBox', '0 0 24 24');
        chevronElement.setAttribute('fill', 'none');
        chevronElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        chevronElement.setAttribute('color', 'var(--color-icon, #000000)');
        chevronElement.ariaHidden = 'true';
        chevronElement.innerHTML = `
        <path 
            d="M6 9L12 15L18 9" 
            stroke="var(--color-icon, #000000)" 
            stroke-width="0.15rem" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        ></path>`

        this.linkElement = document.createElement('a');
        this.linkElement.classList.add('project__link');
        this.linkElement.href = this.link;

        this.descriptionElement = document.createElement('div');
        this.descriptionElement.classList.add('project__description');
        this.descriptionElement.id = descriptionId;
        this.descriptionElement.role = 'region';

        this.descriptionTextElement = document.createElement('p');
        this.descriptionTextElement.classList.add('project__description-text')

        this.descriptionElement.append(this.descriptionTextElement);
        this.toggleElement.append(chevronElement);
        this.nameElement.append(this.toggleElement);
        headerElement.append(this.nameElement, this.linkElement);

        this.element.append(headerElement, this.descriptionElement);

        this.#updateText();
    }
}