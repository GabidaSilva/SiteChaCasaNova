document.addEventListener("DOMContentLoaded", () => {
    const sectionList = document.getElementById("section-list1");
    const API_BASE_URL = 'http://localhost:4000';

    const gifts = [
        { 
            id: "1", 
            image: "assets/bancada.png", 
            title: "Bancada Industrial", 
            description: "Bancada industrial de madeira e ferro, ideal para cozinhas pequenas e refeições diárias.", 
            price: 620 },
        { 
            id: "2", 
            image: "assets/prateleiratetocozinha.png", 
            title: "Prateleira Teto Cozinha", 
            description: "Perfeita para cozinhas pequenas, pois dá para colocar eletros pequenos sem ocupar muito espaço.", 
            price: 216 },
        { 
            id: "3", 
            image: "assets/fogao.png", 
            title: "Fogão À Gás Atlas", 
            description: "Ideal para ambientes pequenos. Possui 4 bocas.", 
            price: 548 },
        { 
            id: "4", 
            image: "assets/geladeira.png", 
            title: "Geladeira Frigobar", 
            description: "Geladeira frigobar, ideal para ambientes pequenos, do tamanho perfeito para a kitnet. Tensão 127V.", 
            price: 1354 },
        { 
            id: "5", 
            image: "assets/liquidificador.png", 
            title: "Liquidificador 1200w", 
            description: "Ótimo para refeições e vitaminas.Tensão 127V", 
            price: 139 },
        { 
            id: "6", 
            image: "assets/sanduicheira.png", 
            title: "Grill E Sanduicheira", 
            description: "Para lanches rápidos. Tensão 127V.", 
            price: 100 },
        {
            id: "7", 
            image: "assets/tapete.png", 
            title: "Tapete Para Sala Sisal 1,00x1,50", 
            description: "Para passar a sensação de acolhimento.", 
            price: 128
        },
        { 
            id: "8", 
            image: "assets/sofa.png", 
            title: "Sofá Bicama Pequeno", 
            description: "Ideal para ambientes pequenos. Possui 2 lugares, é retrátil e perfeito para uma boa noite de sono da Helena.", 
            price: 675 },
        {
            id: "9", 
            image: "assets/mesaapoio.png",   
            title: "Mesa de Apoio",
            description: "Ideal para estudos e para refeições quando os dois lugares da bancada estiverem ocupados.",
            price: 190 },
        {
            id: "10", 
            image: "assets/tv.png",   
            title: "Smart TV 32 Polegadas com suporte de parede.",
            description: "Para diminuir a sensação de solitude.",
            price: 1250 },
        {
            id: "11", 
            image: "assets/persiana.png", 
            title: "Duas Persianas Rolô 1,40m x 1,40m", 
            description: "Necessárias para a privacidade dentro de um condomínio térreo.", 
            price: 312},
        {
            id: "12", 
            image: "assets/escrivaninha.png", 
            title: "Mesa Home Office", 
            description: "Ideal para estudar e armazenar materiais de estudo.", 
            price: 200 },
        {
            id: "13", 
            image: "assets/cadeiraestudos.png", 
            title: "Cadeira Ergonômica", 
            description: "Ideal para estudar sem agredir a lombar.", 
            price: 265 },
        { 
            id: "14", 
            image: "assets/prateleiratetocozinha.png", 
            title: "Prateleira Teto para Livros", 
            description: "Perfeita para dispor os livros de estudo, uma vez que na falta de espaço utilizarei as paredes.", 
            price: 216 },
        { 
            id: "15", 
            image: "assets/guardaroupas.png", 
            title: "Guarda-Roupas Modulado", 
            description: "Ideal para ambientes pequenos. Perfeito para armazenar e deixar tudo organizado.", 
            price: 720 },
        { 
            id: "16", 
            image: "assets/mesacabeceira.png", 
            title: "Conjunto Mesa de Cabeceira", 
            description: "Compactas e atemporais, a escolha ideal para ambientes compactos.", price: 316 },
        { 
            id: "17", 
            image: "assets/camacasal.png", 
            title: "Cama Box Casal Conjugada", 
            description: "O tamanho ideal, para um conforto necessário nos dias que minha família for me visitar.", 
            price: 329 },
        { 
            id: "18", 
            image: "assets/lavadora.png", 
            title: "Máquina de Lavar", 
            description: "Máquina de Lavar de Roupas, porque ninguém merece lavar roupa na mão. Tensão 127V.", 
            price: 2795 }
    ];

    gifts.forEach((gift) => {
        const div = document.createElement("div");
        div.classList.add("gift-card");
        div.innerHTML = `
            <img src="${gift.image}" alt="${gift.title}">
            <h3>${gift.title}</h3>
            <p>${gift.description}</p>
            <p>Preço: R$${gift.price.toFixed(2)}</p>
            <p id="coletado-${gift.id}">Coletado: R$0.00</p>
            <p id="falta-${gift.id}">Falta: R$${gift.price.toFixed(2)}</p>
            <input type="number" id="contribuicao-${gift.id}" placeholder="Valor da contribuição">
            <button class="pix-btn" data-id="${gift.id}">Contribuir via Mercado Pago </button>
        `;
        sectionList.appendChild(div);

        updateContributionTotal(gift.id, gift.price);
    });

    document.querySelectorAll(".pix-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            const giftId = event.target.getAttribute("data-id");
            const inputValue = document.getElementById(`contribuicao-${giftId}`).value;
            const valorPix = parseFloat(inputValue);

            if (!valorPix || valorPix < 100) {
                alert("Por favor, insira um valor válido para contribuir (mínimo R$100,00).");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/contribute`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ giftId, amount: valorPix }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    await updateContributionTotal(giftId, gifts.find(g => g.id === giftId).price);
                    window.location.href = "https://link.mercadopago.com.br/linkunemat"; // Redireciona sem abrir popup
                } else {
                    alert(data.message || "Erro ao registrar a contribuição.");
                }
            } catch (error) {
                console.error('Erro:', error);
                alert("Ocorreu um erro ao processar a contribuição.");
            }
        });
    });
});

async function updateContributionTotal(giftId, price) {
    try {
        const response = await fetch(`http://localhost:4000/api/contributions/${giftId}`);
        const data = await response.json();

        if (response.ok) {
            const coletadoElement = document.getElementById(`coletado-${giftId}`);
            const faltaElement = document.getElementById(`falta-${giftId}`);

            coletadoElement.textContent = `Coletado: R$${data.total.toFixed(2)}`;
            faltaElement.textContent = `Falta: R$${Math.max(0, price - data.total).toFixed(2)}`;
        } else {
            console.error("Erro ao atualizar valores:", data.message);
        }
    } catch (error) {
        console.error("Erro ao buscar contribuições:", error);
    }
}
