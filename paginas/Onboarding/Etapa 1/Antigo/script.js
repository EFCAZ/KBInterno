document.addEventListener('DOMContentLoaded', () => {

    // 1. Copiar Roteiro de Fala para Clipboard
    const btnCopyScript = document.getElementById('btnCopyScript');
    if (btnCopyScript) {
        btnCopyScript.addEventListener('click', () => {
            const scriptText = document.getElementById('script1').innerText;
            navigator.clipboard.writeText(scriptText).then(() => {
                showToast("Roteiro copiado para a área de transferência!");
            }).catch(err => {
                console.error('Erro ao copiar texto: ', err);
            });
        });
    }

    // 2. Notificação Toast
    function showToast(message) {
        const toast = document.getElementById("toast");
        const toastMsg = document.getElementById("toastMsg");
        
        if (toast && toastMsg) {
            toastMsg.innerText = message;
            toast.classList.remove("hidden");

            setTimeout(() => {
                toast.classList.add("hidden");
            }, 3000);
        }
    }

    // 3. Botão de Rolagem Rápida para Tarefas
    const btnTasks = document.getElementById('btnTasks');
    if (btnTasks) {
        btnTasks.addEventListener('click', () => {
            const section = document.getElementById('checklists');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 4. Filtro de Módulos (Busca em Tempo Real)
    const moduleFilter = document.getElementById('moduleFilter');
    if (moduleFilter) {
        moduleFilter.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.getElementsByClassName('module-card');

            Array.from(cards).forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 5. Busca Global do Conteúdo
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('.main-content section');

            sections.forEach(sec => {
                if (!term || sec.innerText.toLowerCase().includes(term)) {
                    sec.style.opacity = '1';
                } else {
                    sec.style.opacity = '0.3';
                }
            });
        });
    }

    // 6. Manipulação de Estado do Checklist (Tarefas)
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.closest('.task-item');
            if (e.target.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
        });
    });

    // 7. Atualização Ativa do Link da Sidebar no Scroll
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.main-content section[id]');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

});