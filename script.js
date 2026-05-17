const abas = document.querySelectorAll(".aba");
const conteudos = document.querySelectorAll(".conteudo-aba");

function formatarTexto(texto) {
  if (!texto) return "";

  return texto
    .split("||")
    .map((paragrafo) => paragrafo.trim())
    .filter((paragrafo) => paragrafo.length > 0)
    .map((paragrafo) => `<p>${paragrafo}</p>`)
    .join("");
}

abas.forEach((aba) => {
  aba.addEventListener("click", () => {
    const alvo = aba.dataset.aba;

    abas.forEach((item) => item.classList.remove("ativa"));
    conteudos.forEach((conteudo) => conteudo.classList.remove("ativo"));

    aba.classList.add("ativa");

    const conteudoAlvo = document.getElementById(alvo);

    if (conteudoAlvo) {
      conteudoAlvo.classList.add("ativo");
    }
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

    if (detalheAtributo) {
      detalheAtributo.innerHTML = `
        <h4>${titulo}</h4>
        <div class="texto-formatado">
          ${formatarTexto(texto)}
        </div>
      `;
    }
  });
});

const itensInterativos = document.querySelectorAll(".item-interativo");

itensInterativos.forEach((item) => {
  item.addEventListener("click", () => {
    const titulo = item.dataset.titulo;
    const texto = item.dataset.texto;

    const areaAtual = item.closest(".conteudo-aba");

    if (!areaAtual) return;

    const caixaDetalhe = areaAtual.querySelector(".detalhe-lista");
    const itensDaArea = areaAtual.querySelectorAll(".item-interativo");

    itensDaArea.forEach((botao) => botao.classList.remove("selecionado"));

    item.classList.add("selecionado");

    if (caixaDetalhe) {
      caixaDetalhe.innerHTML = `
        <h4>${titulo}</h4>
        <div class="texto-formatado">
          ${formatarTexto(texto)}
        </div>
      `;
    }
  });
});
