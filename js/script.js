async function buscarJogador() {
    const jogador = document.getElementById("jogador").value.trim();
    const resultadoDiv = document.getElementById("resultado");

    if (!jogador) {
        resultadoDiv.innerHTML = "<p>Digite um nome válido.</p>";
        return;
    }

    resultadoDiv.innerHTML = "<p>Carregando...</p>";

    try {
        // 1️⃣ FAZ A PESQUISA DO JOGADOR PARA ACHAR O NOME CORRETO
        const searchUrl = `https://pt.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(jogador)}&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (!searchData.query.search.length) {
            resultadoDiv.innerHTML = "<p>Jogador não encontrado.</p>";
            return;
        }

        // Pega o nome do primeiro resultado da pesquisa
        const nomeCorreto = searchData.query.search[0].title;

        // 2️⃣ BUSCA OS DADOS COM O NOME CORRETO
        const url = `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&titles=${encodeURIComponent(nomeCorreto)}&exintro=true&explaintext=true&pithumbsize=500&origin=*`;
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const page = Object.values(pages)[0];

        if (!page.extract) {
            resultadoDiv.innerHTML = "<p>Jogador não encontrado.</p>";
            return;
        }

        const biografia = page.extract;
        const imagem = page.thumbnail 
        ? `<img src="${page.thumbnail.source}" alt="${nomeCorreto}">` 
        : "<p>Imagem não disponível.</p>";


        resultadoDiv.innerHTML = `
            <h2>${nomeCorreto}</h2>
            ${imagem}
            <p>${biografia}</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = "<p>Erro ao buscar os dados.</p>";
    }
}

const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion-header1");
const menuLinks = document.querySelectorAll(".menu-link");

function changeTheme () {
    const currentTheme = rootHtml.getAttribute("data-theme");

    currentTheme === "dark" ? rootHtml.setAttribute("data-theme", "light") : rootHtml.setAttribute("data-theme", "dark");

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");
}

toggleTheme.addEventListener("click", changeTheme);
// fim função mudar Tema do site

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const accordionActive = accordionItem.classList.contains("active");

        accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
        
    })
})

menuLinks.forEach(item => {
    item.addEventListener("click", () => {
        menuLinks.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    })
})

/** * Animation on scroll */ 
window.addEventListener('load', () => { 
    AOS.init({
         duration: 1000, 
         easing: 'ease-in-out',
         once: false,
         mirror: false }) 
        });