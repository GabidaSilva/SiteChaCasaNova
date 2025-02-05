document.addEventListener("DOMContentLoaded", () => {
    const sectionList = document.getElementById("section-list1");

    const gifts = [
        { 
            image: "assets/bancada.png", 
            title: "Bancada Industrial", 
            description: "Bancada industrial de madeira e ferro, ideal para cozinhas pequenas e refeições diárias.",
            price: 620, 
            collected: 0 
        },
        { 
            image: "assets/prateleiratetocozinha.png", 
            title: "Prateleira Teto Cozinha", 
            description: "Perfeita para cozinhas pequenas, pois dá para colocar eletros pequenos sem ocupar muito espaço.",
            price: 216, 
            collected: 0 
        },
        { 
            image: "assets/fogao.png", 
            title: "Fogão À Gás Atlas", 
            description: "Ideal para ambientes pequenos. Possui 4 bocas.",
            price: 548, 
            collected: 0 
        },
        { 
            image: "assets/geladeira.png", 
            title: "Geladeira Frigobar", 
            description: "Geladeira frigobar, ideal para ambientes pequenos, do tamanho perfeito para a kitnet. Tensão 127V.",
            price: 1354, 
            collected: 0 
        },
        { 
            image: "assets/liquidificador.png", 
            title: "Liquidificador 550w", 
            description: "Ótimo para refeições e vitaminas.",
            price: 95, 
            collected: 0 
        },
        { 
            image: "assets/sanduicheira.png", 
            title: "Grill E Sanduicheira", 
            description: "Para lanches rápidos. Tensão 127V.",
            price: 70, 
            collected: 0 
        },
        { 
            image: "assets/sofa.png", 
            title: "Sofá Bicama Pequeno", 
            description: "Ideal para ambientes pequenos. Possui 2 lugares, é  retrátil e perfeito para uma boa noite de sono da Helena.",
            price: 675, 
            collected: 0 
        },
        { 
            image: "assets/escrivaninha.png", 
            title: "Mesa Home Office", 
            description: "Ideal para estudar e armazenar materiais de estudo.",
            price: 200, 
            collected: 0 
        },
        { 
            image: "assets/prateleiratetocozinha.png", 
            title: "Prateleira Teto para Livros", 
            description: "Perfeita para cdispor os livros de estudo, uma vez que na falta de espaço utilizarei as paredes.",
            price: 216, 
            collected: 0 
        },
        { 
            image: "assets/guardaroupas.png", 
            title: "Guarda-Roupas Modulado", 
            description: "Ideal para ambientes pequenos. Perfeito para armazenar e deixar as coisas organizadas.",
            price: 720, 
            collected: 0 
        },
        { 
            image: "assets/mesacabeceira.png", 
            title: "Conjunto Mesa de Cabeceira", 
            description: "Compactas e atemporais, a escolha ideal para ambientes compactos.",
            price: 316, 
            collected: 0 
        },
        { 
            image: "assets/camacasal.png", 
            title: "Cama Box Casal Conjugada", 
            description: "O tamanho ideal, para um conforto necessário nos dias que minha família for me visitar.",
            price: 329, 
            collected: 0 
        },
        { 
            image: "assets/lavadora.png", 
            title: "Máquina de Lavar", 
            description: "Máquina de Lavar de Roupas, porque ninguém merece lavar roupa na mão.Tensão 127V.",
            price: 2795, 
            collected: 0
        }
        
    ];

    gifts.forEach((gift, index) => {
        const div = document.createElement("div");
        div.classList.add("gift-card");

        let remainder = gift.price - gift.collected;

        div.innerHTML = `
            <img src="${gift.image}" alt="${gift.title}">
            <h3>${gift.title}</h3>
            <p>${gift.description}</p>
            <p>Preço: R$${gift.price},00</p>
            <p>Coletado: R$${gift.collected},00</p>
            <p id="falta-${index}">Falta: R$${remainder},00</p>
            <input type="number" id="contribuicao-${index}" placeholder="Valor a contribuir" class="valor-contribuicao" min="1" step="0.01">
            
            <div class="button-container">
                <button class="pix-btn" data-index="${index}">Contribuir</button>
            </div>
        `;

        sectionList.appendChild(div);

        // Atualizar "Falta" dinamicamente ao inserir um valor
        const inputField = div.querySelector(`#contribuicao-${index}`);
        const faltaText = div.querySelector(`#falta-${index}`);

        inputField.addEventListener("input", () => {
            let valorInput = parseFloat(inputField.value) || 0;
            let novoFalta = remainder - valorInput;
            faltaText.textContent = `Falta: R$${novoFalta >= 0 ? novoFalta.toFixed(2) : "0,00"}`;
        });
    });

    // Evento de pagamento via PIX
    document.querySelectorAll(".pix-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            const inputValue = document.getElementById(`contribuicao-${index}`).value;
            const valorPix = parseFloat(inputValue);
            
            if (!valorPix || valorPix <= 0) {
                alert("Por favor, insira um valor válido para contribuir.");
                return;
            }

            // Redireciona para o link de pagamento do Mercado Pago
            window.open("https://link.mercadopago.com.br/linkunemat", "_blank");
        });
    });
});
