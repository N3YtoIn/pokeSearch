 // Função para carregar HTML em um elemento específico
 function loadHTML(elementId, filePath) {
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      });
  }

  // Carrega o cabeçalho e o rodapé
  loadHTML("header", "../pages/header.html");
  loadHTML("footer", "../pages/footer.html");