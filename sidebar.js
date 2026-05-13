const pages = {
    'page1.html': 'Page 1',
    'page2.html': 'Page 2',
    'page3.html': 'Page 3'
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
        const currentPage = window.location.pathname.split('/').pop();

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #2c3e50;
                    color: white;
                    padding: 20px;
                    position: fixed;
                    top: 60px;
                    height: calc(100vh - 60px);
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

                button {
                    background: #34495e;
                    color: white;
                    border: none;
                    padding: 10px 16px;
                    width: 100%;
                    text-align: left;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.3s;
                    font-size: 14px;
                }

                button:hover {
                    background: #3d566e;
                }

                button.active {
                    background: #3498db;
                }
            </style>
            <h2>Training Modules</h2>
            <nav>
                <ul>
                    ${Object.keys(pages).map(page => `
                        <li>
                            <button data-page="${page}">
                                ${pages[page]}
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;

        this.shadowRoot.querySelectorAll('button').forEach(btn => {
            if (btn.getAttribute('data-page') === currentPage) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                window.location.href = btn.getAttribute('data-page');
            });
        });
    }
}

if (!customElements.get('training-sidebar')) {
    customElements.define('training-sidebar', Sidebar);
}
