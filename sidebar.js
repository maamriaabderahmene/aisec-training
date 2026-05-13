const pages = {
    'page1.html': 'Page 1: Introduction',
    'page2.html': 'Page 2: Advanced Topics'
};

class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #2c3e50;
                    color: white;
                    padding: 20px;
                    position: fixed;
                    height: 100vh;
                    width: 250px;
                    box-sizing: border-box;
                }

                h2 {
                    margin-bottom: 20px;
                    font-size: 1.2em;
                }

                nav ul {
                    list-style: none;
                }

                nav li {
                    margin: 10px 0;
                }

                a {
                    color: white;
                    text-decoration: none;
                    padding: 10px;
                    display: block;
                    border-radius: 4px;
                    transition: background 0.3s;
                }

                a:hover {
                    background: #34495e;
                }

                a.active {
                    background: #3498db;
                }
            </style>
            <h2>Training Modules</h2>
            <nav>
                <ul>
                    ${Object.keys(pages).map(page => `
                        <li>
                            <a href="${page}" data-page="${page}">
                                ${pages[page]}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;

        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadPage(link.getAttribute('href'));
                this.setActive(link);
            });
        });
    }

    setActive(activeLink) {
        this.shadowRoot.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    async loadPage(page) {
        const main = document.querySelector('main');
        if (!main) return;

        try {
            const response = await fetch(page);
            const html = await response.text();
            main.innerHTML = html;
        } catch (error) {
            main.innerHTML = `<p>Error loading page.</p>`;
        }
    }
}

customElements.define('sidebar', Sidebar);

if (document.querySelector('sidebar')) {
    const sidebar = document.querySelector('sidebar');
    const hash = window.location.hash.slice(1);
    if (hash && pages[hash]) {
        sidebar.loadPage(hash);
        sidebar.setActive(sidebar.shadowRoot.querySelector(`[data-page="${hash}"]`));
    }
}
