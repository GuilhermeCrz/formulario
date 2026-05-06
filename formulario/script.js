document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meuFormulario');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const feedbackSucesso = document.getElementById('feedbackSucesso');

    // Função de validação
    const validarCampo = (input, erroElemento, condicao) => {
        if (condicao) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            erroElemento.style.display = 'none';
            return true;
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            erroElemento.style.display = 'block';
            return false;
        }
    };

    // Eventos em tempo real para UX (Feedback Visual)
    nomeInput.addEventListener('input', () => {
        validarCampo(nomeInput, document.getElementById('nomeErro'), nomeInput.value.trim().length > 3);
    });

    emailInput.addEventListener('input', () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validarCampo(emailInput, document.getElementById('emailErro'), regexEmail.test(emailInput.value));
    });

    // Evento de envio
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const isNomeValido = nomeInput.value.trim().length > 3;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValido = regexEmail.test(emailInput.value);

        if (isNomeValido && isEmailValido) {
            feedbackSucesso.classList.remove('hidden');
            form.reset();
            // Remove as classes de validação após sucesso
            nomeInput.classList.remove('valid');
            emailInput.classList.remove('valid');
        } else {
            // Força a exibição de erros se tentar enviar vazio
            validarCampo(nomeInput, document.getElementById('nomeErro'), isNomeValido);
            validarCampo(emailInput, document.getElementById('emailErro'), isEmailValido);
        }
    });
});