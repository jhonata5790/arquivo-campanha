const abas = document.querySelectorAll(".aba");
const conteudos = document.querySelectorAll(".conteudo-aba");

abas.forEach((aba) => {
  aba.addEventListener("click", () => {
    const alvo = aba.dataset.aba;

    abas.forEach((item) => item.classList.remove("ativa"));
    conteudos.forEach((conteudo) => conteudo.classList.remove("ativo"));

    aba.classList.add("ativa");
    document.getElementById(alvo).classList.add("ativo");
  });
});

const atributos = document.querySelectorAll(".atributo-card");
const detalheAtributo = document.getElementById("detalhe-atributo");

atributos.forEach((atributo) => {
  atributo.addEventListener("click", () => {
    const titulo = atributo.dataset.titulo;
    const texto = atributo.dataset.texto;

    atributos.forEach((item) => item.classList.remove("selecionado"));
    atributo.classList.add("selecionado");

    detalheAtributo.innerHTML = `
      <h4>${titulo}</h4>
      <p>${texto}</p>
    `;
  });
});

const itensInterativos = document.querySelectorAll(".item-interativo");

itensInterativos.forEach((item) => {
  item.addEventListener("click", () => {
    const titulo = item.dataset.titulo;
    const texto = item.dataset.texto;

    const areaAtual = item.closest(".conteudo-aba");
    const caixaDetalhe = areaAtual.querySelector(".detalhe-lista");

    const itensDaArea = areaAtual.querySelectorAll(".item-interativo");
    itensDaArea.forEach((botao) => botao.classList.remove("selecionado"));

    item.classList.add("selecionado");

    caixaDetalhe.innerHTML = `
      <h4>${titulo}</h4>
      <p>${texto}</p>
    `;
  });
});
