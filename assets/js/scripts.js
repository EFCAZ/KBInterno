// Função de fallback aprimorada para iFrames e Google Sites
function fallbackCopy(textToCopy, buttonElement, originalLabel) {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    
    // Evita rolar a página até o final ao focar
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showSuccess(buttonElement, originalLabel);
        } else {
            alert('Não foi possível copiar o texto automaticamente.');
        }
    } catch (err) {
        console.error('Erro no fallback de cópia:', err);
        alert('Erro ao copiar texto.');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Função universal de cópia de texto ajustada
function executeCopy(textToCopy, buttonElement, originalLabel) {
    if (!textToCopy.trim()) {
        alert('Não há texto para copiar!');
        return;
    }

    // Tenta a Clipboard API primeiramente se estiver em contexto seguro e com foco
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showSuccess(buttonElement, originalLabel);
            })
            .catch((err) => {
                console.warn('Clipboard API falhou (comum em iFrames do Google Sites). Usando fallback...', err);
                fallbackCopy(textToCopy, buttonElement, originalLabel);
            });
    } else {
        fallbackCopy(textToCopy, buttonElement, originalLabel);
    }
}

function showSuccess(btn, originalHTML) {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
    btn.style.backgroundColor = '#10b981';
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = '';
    }, 2000);
}

// Copiar Anotações
function copyNotes() {
    const fields = [
        { label: 'CADASTRO ATIVO E/OU PRÉ CADASTRO?', id: 'noteActivePre' },
        { label: 'APROVAÇÃO DE PRÉ-CADASTRO?', id: 'noteApproval' },
        { label: 'RAMO DE ATIVIDADE OU LINHA DE FORNECIMENTO?', id: 'noteBranchLine' },
        { label: 'OUTRAS ANOTAÇÕES', id: 'noteOthers' }
    ];

    const formattedNotes = fields.map(field => {
        const el = document.getElementById(field.id);
        const value = el ? el.value.trim() : '';
        const content = value.length > 0 ? value : 'Nenhuma anotação';
        return `${field.label}\n${content}`;
    }).join('\n\n');

    const btn = document.querySelector('.btn-copy-notes');
    executeCopy(formattedNotes, btn, '<i class="fa-regular fa-copy"></i> Copiar Anotação');
}

// Copiar Template de arquivo HTML hospedado no GitHub
function copyGithubFile(rawUrl, btn) {
    const originalLabel = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Carregando...';

    // Garante que a URL esteja usando CDN do jsDelivr para evitar requisição bloqueada via CORS
    let fetchUrl = rawUrl;
    if (rawUrl.includes('raw.githubusercontent.com')) {
        fetchUrl = rawUrl
            .replace('https://raw.githubusercontent.com/', 'https://cdn.jsdelivr.net/gh/')
            .replace('/main/', '@main/');
    }

    fetch(fetchUrl)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar arquivo');
            return response.text();
        })
        .then(content => {
            executeCopy(content, btn, originalLabel);
        })
        .catch(err => {
            console.error(err);
            alert('Erro ao carregar o arquivo do GitHub.');
            btn.innerHTML = originalLabel;
        });
}

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