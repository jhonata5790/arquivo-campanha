document.addEventListener("DOMContentLoaded", () => {
  configurarAbas();
  configurarAtributos();
  configurarItensInterativos();
});

/* ===================== */
/* ABAS DAS FICHAS ANTIGAS */
/* ===================== */

function configurarAbas() {
  const abas = document.querySelectorAll(".aba");
  const conteudos = document.querySelectorAll(".conteudo-aba");

  if (!abas.length || !conteudos.length) return;

  abas.forEach((aba) => {
    aba.addEventListener("click", () => {
      const alvo = aba.dataset.aba;

      abas.forEach((botao) => {
        botao.classList.remove("ativa");
      });

      conteudos.forEach((conteudo) => {
        conteudo.classList.remove("ativo");
      });

      aba.classList.add("ativa");

      const conteudoAlvo = document.getElementById(alvo);

      if (conteudoAlvo) {
        conteudoAlvo.classList.add("ativo");
      }
    });
  });
}

/* ===================== */
/* ATRIBUTOS */
/* ===================== */

function configurarAtributos() {
  const atributos = document.querySelectorAll(".atributo-card");
  const caixaAtributo = document.querySelector("#detalhe-atributo");

  if (!atributos.length || !caixaAtributo) return;

  atributos.forEach((atributo) => {
    atributo.addEventListener("click", () => {
      atributos.forEach((item) => {
        item.classList.remove("selecionado");
      });

      atributo.classList.add("selecionado");

      const titulo = atributo.dataset.titulo || "Atributo";
      const texto = atributo.dataset.texto || "Nenhuma descrição registrada.";

      caixaAtributo.innerHTML = `
        <h4>${titulo}</h4>
        <div class="texto-formatado">
          ${formatarTexto(texto)}
        </div>
      `;
    });
  });
}

/* ===================== */
/* HABILIDADES, RITUAIS, ITENS E DESCRIÇÕES */
/* ===================== */

function configurarItensInterativos() {
  const itens = document.querySelectorAll(".item-interativo");

  if (!itens.length) return;

  itens.forEach((item) => {
    item.addEventListener("click", () => {
      const blocoAtual = item.closest(".dossie-bloco") || item.closest(".conteudo-aba");

      if (!blocoAtual) return;

      const caixaDetalhe = blocoAtual.querySelector(".detalhe-lista") || blocoAtual.querySelector(".dossie-detalhe");

      if (!caixaDetalhe) return;

      const itensDoMesmoBloco = blocoAtual.querySelectorAll(".item-interativo");

      itensDoMesmoBloco.forEach((botao) => {
        botao.classList.remove("selecionado");
      });

      item.classList.add("selecionado");

      const titulo = item.dataset.titulo || "Registro";
      const texto = item.dataset.texto || "Nenhuma descrição registrada.";

      caixaDetalhe.innerHTML = `
        <h4>${titulo}</h4>
        <div class="texto-formatado">
          ${formatarTexto(texto)}
        </div>
      `;
    });
  });
}

/* ===================== */
/* FORMATAÇÃO DE TEXTO */
/* ===================== */

function formatarTexto(texto) {
  return texto
    .split("||")
    .map((paragrafo) => `<p>${paragrafo.trim()}</p>`)
    .join("");
}
