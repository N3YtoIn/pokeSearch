/******************************************************************************
 * Objetivo: Manipular dados da API Pokemon
 * Data: 30/10/2024
 * Autor: Nathan
 * Versão: 1.1
 *****************************************************************************/


let allPokemonData = [];

// Função para criar e exibir o card de cada Pokémon
const setCreateCard = function(pokemonData) {
    // Recebe o elemento principal do HTML para colocar os cards
    let divCardPokemon = document.getElementById('cardPokemon');    

    // Cria os elementos HTML dinamicamente
    let divCaixaProduto = document.createElement('div');
    let h2CaixaTitulo = document.createElement('h2');
    let figureCaixaImagem = document.createElement('figure');
    let img = document.createElement('img');
    let divCaixaTexto = document.createElement('div');
    let pCaixaTexto = document.createElement('p');
    let divType = document.createElement('div');
    let pType   =   document.createElement('p');

    // Define o conteúdo do card
    let textoTitulo = document.createTextNode(pokemonData.name);
    let textoParagrafo = document.createTextNode(`ID: ${pokemonData.id}`);
    //let textoElement = document.createTextNode(`Type: ${pokemonData.types[']}`);

    // Define os atributos para estilização
    divCaixaProduto.setAttribute('class', 'caixa_produto');
    h2CaixaTitulo.setAttribute('class', 'caixa_titulo');
    figureCaixaImagem.setAttribute('class', 'caixa_imagem');
    img.setAttribute('src', pokemonData.sprites.front_default);
    img.setAttribute('alt', pokemonData.name);
    img.setAttribute('title', pokemonData.name);
    pCaixaTexto.setAttribute('class', 'caixa_texto');
    //pType.setAttribute('class','typeElement');

    // Associa os elementos pais e filhos
    divCardPokemon.appendChild(divCaixaProduto);
    divCaixaProduto.appendChild(h2CaixaTitulo);
    h2CaixaTitulo.appendChild(textoTitulo);
    divCaixaProduto.appendChild(figureCaixaImagem);
    figureCaixaImagem.appendChild(img);
    divCaixaProduto.appendChild(divCaixaTexto);
    divCaixaTexto.appendChild(pCaixaTexto);
    pCaixaTexto.appendChild(textoParagrafo);
    //divCaixaProduto.appendChild(divType);
    //divType.appendChild(pType);
    //pType.appendChild(textoElement);
}

// Função para obter os dados dos Pokémon da API
const getDadosPokemonAPI = async function() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10000'; // Limite ajustável

    try {
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data.results) {
            let pokemonResponse = await fetch(item.url);
            let pokemonData = await pokemonResponse.json();
            allPokemonData.push(pokemonData); 

            setCreateCard(pokemonData);
        }
    } catch (error) {
        console.error("Erro ao buscar lista de Pokémon:", error);
    }
};

// Função para buscar um Pokémon pelo nome ou ID
const searchPokemon = async () => {
    let query = document.getElementById('input-filter').value.toLowerCase();
    if (query) {
        clearPokemonCards(); // Limpa cards atuais antes de exibir resultado da busca
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
            let response = await fetch(url);

            if (response.ok) {
                let pokemonData = await response.json();
                setCreateCard(pokemonData);
            } else {
                alert("Pokémon não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar Pokémon:", error);
            alert("Erro ao buscar Pokémon. Tente novamente.");
        }
    } else {
        alert("Digite o nome de um Pokémon para pesquisar.");
    }
}

// Função para limpar todos os cards da tela
const clearPokemonCards = () => {
    let divCardPokemon = document.getElementById('cardPokemon');
    divCardPokemon.innerHTML = ''; // Limpa o conteúdo do container
}

// Função para resetar a busca e recarregar a lista inicial
const resetSearch = () => {
    document.getElementById('input-filter').value = '';
    clearPokemonCards();
    getDadosPokemonAPI();
}

// Event listeners para botões de pesquisa e reset
document.getElementById('input-search').addEventListener('click', searchPokemon);
document.getElementById('input-reset').addEventListener('click', resetSearch);

// Evento para carregar a lista inicial ao carregar a página
window.addEventListener('load', function() {
    getDadosPokemonAPI();
});
