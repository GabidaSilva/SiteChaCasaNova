const API_BASE_URL = "https://backend-cha-casa-nova.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    const sectionList = document.getElementById("section-list1");

    const gifts = [
        { id: "1", image: "assets/bancada.png", title: "Bancada Industrial", description: "Bancada industrial de madeira e ferro, ideal para cozinhas pequenas e refeições diárias.", price: 620 },
        { id: "2", image: "assets/prateleiratetocozinha.png", title: "Prateleira Teto Cozinha", description: "Perfeita para cozinhas pequenas, pois dá para colocar eletros pequenos sem ocupar muito espaço.", price: 216 },
        { id: "3", image: "assets/fogao.png", title: "Fogão À Gás Atlas", description: "Ideal para ambientes pequenos. Possui 4 bocas.", price: 548 }
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
            <button class="pix-btn" data-id="${gift.id}">Contribuir via Mercado Pago</button>
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
                const response = await fetch(`${API_BASE_URL}/api/contribute`, { // Corrigida URL
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ giftId, amount: valorPix }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    await updateContributionTotal(giftId, gifts.find(g => g.id === giftId).price);
                    window.location.href = "https://link.mercadopago.com.br/linkunemat";
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
        const response = await fetch(`${API_BASE_URL}/api/contributions/${giftId}`);
        const data = await response.json();

        if (response.ok) {
            document.getElementById(`coletado-${giftId}`).textContent = `Coletado: R$${data.total.toFixed(2)}`;
            document.getElementById(`falta-${giftId}`).textContent = `Falta: R$${Math.max(0, price - data.total).toFixed(2)}`;
        } else {
            console.error("Erro ao atualizar valores:", data.message);
        }
    } catch (error) {
        console.error("Erro ao buscar contribuições:", error);
    }
}
