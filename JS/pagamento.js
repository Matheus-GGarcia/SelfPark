function switchTab(method) {
        document.querySelectorAll('.method-card').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

        if (method === 'credit' || method === 'debit') {
            document.querySelector(`[onclick="switchTab('${method}')"]`).classList.add('active');
            document.getElementById('card-form').classList.add('active');
        } else {
            document.querySelector(`[onclick="switchTab('pix')"]`).classList.add('active');
            document.getElementById('pix-content').classList.add('active');
        }
    }

    /* --- ELEMENTOS DO DOM --- */
    const cardNumber = document.getElementById('input-number');
    const cardHolder = document.getElementById('input-holder');
    const cardExpiry = document.getElementById('input-expiry');
    const cardCvv = document.getElementById('input-cvv');

    const displayNumber = document.getElementById('card-number-display');
    const displayHolder = document.getElementById('card-holder-display');
    const displayExpiry = document.getElementById('card-expiry-display');
    const displayCvv = document.getElementById('card-cvv-display');
    
    const visualCard = document.getElementById('visual-card');
    const iconFront = document.getElementById('card-icon-front');
    const iconBack = document.getElementById('card-icon-back');

    /* --- DETECTOR DE BANDEIRA (VISA / MASTERCARD) --- */
    function updateCardBrand(number) {
        const cleanNumber = number.replace(/\D/g, '');
        
        // Remove classes de marca anteriores, mantendo apenas classes base e estilo
        iconFront.className = ''; 
        iconBack.className = '';
        
        // Estilo base
        const baseClassFab = 'fab'; // Para marcas (font awesome brands)
        const baseClassFas = 'fas'; // Para ícone genérico (font awesome solid)
        
        // Regex para Visa (Começa com 4)
        if (cleanNumber.match(/^4/)) {
            iconFront.classList.add(baseClassFab, 'fa-cc-visa');
            iconBack.classList.add(baseClassFab, 'fa-cc-visa');
            return;
        }
        
        // Regex para Mastercard (Começa com 51-55 ou 22-27)
        if (cleanNumber.match(/^5[1-5]/) || cleanNumber.match(/^2[2-7]/)) {
            iconFront.classList.add(baseClassFab, 'fa-cc-mastercard');
            iconBack.classList.add(baseClassFab, 'fa-cc-mastercard');
            return;
        }

        // Default (Genérico) se não corresponder ou estiver vazio
        iconFront.className = 'fas fa-credit-card';
        iconBack.className = 'fas fa-credit-card';
    }

    /* --- EVENTOS DE INPUT --- */
    
    // Número do Cartão
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove não-números
        
        // 1. Atualiza Bandeira
        updateCardBrand(value);

        // 2. Formata com espaços (#### ####)
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;
        
        // 3. Atualiza Display
        displayNumber.textContent = value || '#### #### #### ####';
    });

    // Nome do Titular
    cardHolder.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[0-9]/g, ''); // Remove números
        e.target.value = value;
        displayHolder.textContent = value.toUpperCase() || 'SEU NOME AQUI';
    });

    // Validade
    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
        displayExpiry.textContent = value || 'MM/AA';
    });

    // CVV e Animação de Flip
    cardCvv.addEventListener('focus', () => { visualCard.classList.add('flipped'); });
    cardCvv.addEventListener('blur', () => { visualCard.classList.remove('flipped'); });
    
    cardCvv.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        displayCvv.textContent = value || '***';
    });

    /* --- FUNÇÃO PIX --- */
    function copyPix() {
        navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000");
        const btn = document.querySelector('.copy-btn');
        const originalHtml = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado com Sucesso!';
        btn.style.background = '#00b894'; // Verde sucesso
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.background = '#dfe6e9';
            btn.style.color = '#2d3436';
        }, 2000);
    }