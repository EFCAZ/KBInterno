// Rolagem da tela para cima
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    document.body.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

document.addEventListener('DOMContentLoaded', () => {

    /* Botão de Rolagem Rápida para Tarefas
       Não utilizado */
    const btnAction = document.getElementById('btnAction');
    if (btnAction) {
        btnAction.addEventListener('click', () => {
            const section = document.getElementById('checklists');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // Manipulação de Estado do Checklist (Tarefas)
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


    // Rolagem da tela para cima
    const btnBackToTop = document.getElementById('btnBackToTop');

        if (!btnBackToTop) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            
            if (scrollTop > 250) {
                btnBackToTop.classList.add('show');
            } else {
                btnBackToTop.classList.remove('show');
            }
        });
});