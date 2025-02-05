document.addEventListener("DOMContentLoaded", function() {
    const listSection = document.getElementById("section-list1");

    const gifts = [
        { 
            img: "assets/geladeira.png", 
            title: "Geladeira Frigobar Midea" },
        { 
            img: "assets/bancada.png", 
            title: "Bancada Industrial" },
        { 
            img: "assets/fogao.png", 
            title: "Fogão à Gás Atlas" },
        { 
            img: "assets/guardaroupas.png", 
            title: "Guarda Roupa" },
        { 
            img: "assets/sofa.png", 
            title: "Sofá Bicama Pequeno" },
        { 
            img: "assets/liquidificador.png", 
            title: "Liquidificador" },
        { 
            img: "assets/escrivaninha.png", 
            title: "Mesa Home Office" }
    ];

    gifts.forEach(gift => {
        const div = document.createElement("div");
        div.classList.add("gift-circle");

        div.innerHTML = `
            <img src="${gift.img}" alt="${gift.title}">
        `;

        listSection.appendChild(div);
    });
});
