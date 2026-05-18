/* =========================================================
   ARQUIVO DA CAMPANHA — JAVASCRIPT GLOBAL
   Base oficial de interações do site
   ========================================================= */

const ArquivoCampanha = {
  mobile: window.matchMedia("(max-width: 760px)").matches,
  movimentoReduzido: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  paginaVisivel: !document.hidden,
  efeitosAtivos: true
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarArquivoCampanha();
});

function iniciarArquivoCampanha() {
  marcarLinkAtual();
  iniciarAbasGlobais();
  iniciarFiltrosGlobais();
  iniciarCardsBloqueados();
  iniciarDocumentosCorrompidos();
  iniciarRevelacaoAoScroll();
  iniciarTerminalAnimado();
  iniciarSistemaDeSomVisual();
  iniciarControleDePerformance();
  iniciarAtalhosBasicos();
}

/* =========================================================
   NAV — LINK ATUAL
   ========================================================= */

function marcarLinkAtual() {
  const paginaAtual = normalizarPagina(window.location.pathname);
  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const paginaLink = normalizarPagina(href);

    if (paginaAtual === paginaLink) {
      link.classList.add("ativo");
      link.setAttribute("aria-current", "page");
    }
  });
}

function normalizarPagina(caminho) {
  const partes = caminho.split("/");
  const arquivo = partes[partes.length - 1] || "index.html";
  return arquivo.replace("./", "");
}

/* =========================================================
   ABAS GLOBAIS
   Funciona com:
   .aba[data-aba="id"]
   .tab[data-aba="id"]
   .aba-documento[data-aba="id"]
   .conteudo-aba#id
   .conteudo#id
   ========================================================= */

function iniciarAbasGlobais() {
  const botoes = document.querySelectorAll(
    ".aba[data-aba], .tab[data-aba], .aba-documento[data-aba], .aba-personagem[data-aba]"
  );

  if (!botoes.length) return;

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const alvo = botao.dataset.aba;
      if (!alvo) return;

      const grupo = botao.closest("[data-grupo-abas]") || document;
      const botoesDoGrupo = grupo.querySelectorAll(
        ".aba[data-aba], .tab[data-aba], .aba-documento[data-aba], .aba-personagem[data-aba]"
      );

      const conteudos = document.querySelectorAll(
        ".conteudo-aba, .conteudo, .painel-aba, .secao-aba"
      );

      botoesDoGrupo.forEach((item) => item.classList.remove("ativa", "ativo"));

      conteudos.forEach((conteudo) => {
        if (conteudo.id === alvo) {
          conteudo.classList.remove("oculto");
          conteudo.classList.add("ativo", "ativa");
          conteudo.setAttribute("aria-hidden", "false");
          animarEntrada(conteudo);
        } else if (conteudo.dataset.grupo === botao.dataset.grupo || !botao.dataset.grupo) {
          conteudo.classList.remove("ativo", "ativa");
          conteudo.classList.add("oculto");
          conteudo.setAttribute("aria-hidden", "true");
        }
      });

      botao.classList.add("ativa", "ativo");
      efeitoCliqueArquivo(botao);
    });
  });
}

/* =========================================================
   FILTROS GLOBAIS
   Funciona com:
   .filtro[data-filtro="valor"]
   itens com data-categoria="valor"
   botão com data-filtro="todos"
   ========================================================= */

function iniciarFiltrosGlobais() {
  const filtros = document.querySelectorAll(".filtro[data-filtro], .botao-filtro[data-filtro]");
  if (!filtros.length) return;

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      const valor = filtro.dataset.filtro;
      const escopo = filtro.closest("[data-area-filtros]") || document;
      const itens = escopo.querySelectorAll("[data-categoria]");

      filtros.forEach((item) => {
        if (item.closest("[data-area-filtros]") === escopo || escopo === document) {
          item.classList.remove("ativo", "ativa");
        }
      });

      filtro.classList.add("ativo", "ativa");

      itens.forEach((item) => {
        const categorias = String(item.dataset.categoria || "")
          .split(" ")
          .map((cat) => cat.trim())
          .filter(Boolean);

        const mostrar = valor === "todos" || categorias.includes(valor);

        item.classList.toggle("oculto", !mostrar);
        item.setAttribute("aria-hidden", String(!mostrar));

        if (mostrar) animarEntrada(item);
      });

      efeitoCliqueArquivo(filtro);
    });
  });
}

/* =========================================================
   CARDS BLOQUEADOS
   ========================================================= */

function iniciarCardsBloqueados() {
  const bloqueados = document.querySelectorAll(".bloqueado, [data-bloqueado='true']");

  bloqueados.forEach((card) => {
    card.addEventListener("click", (evento) => {
      const link = evento.target.closest("a");

      if (link && card.dataset.permitirClique !== "true") {
        evento.preventDefault();
      }

      mostrarAvisoTemporario(card, "ACESSO NEGADO — PATENTE INSUFICIENTE");
      efeitoErroArquivo(card);
    });
  });
}

/* =========================================================
   DOCUMENTOS CORROMPIDOS
   ========================================================= */

function iniciarDocumentosCorrompidos() {
  const corrompidos = document.querySelectorAll(".corrompido, .documento-corrompido, [data-corrompido='true']");

  corrompidos.forEach((documento) => {
    if (!ArquivoCampanha.movimentoReduzido) {
      setInterval(() => {
        if (!ArquivoCampanha.paginaVisivel) return;
        documento.classList.add("falha-corrompida");

        setTimeout(() => {
          documento.classList.remove("falha-corrompida");
        }, 180);
      }, intervaloAleatorio(4500, 9500));
    }

    documento.addEventListener("mouseenter", () => {
      efeitoErroArquivo(documento);
    });
  });

  inserirCSSCorrompido();
}

function inserirCSSCorrompido() {
  if (document.getElementById("css-corrompido-global")) return;

  const estilo = document.createElement("style");
  estilo.id = "css-corrompido-global";
  estilo.textContent = `
    .falha-corrompida {
      animation: falhaCorrompidaGlobal 0.18s steps(2, end);
    }

    @keyframes falhaCorrompidaGlobal {
      0% { transform: translate(0); filter: none; }
      33% { transform: translate(1px, -1px); filter: contrast(1.2); }
      66% { transform: translate(-1px, 1px); filter: hue-rotate(12deg); }
      100% { transform: translate(0); filter: none; }
    }

    .aviso-temporario-arquivo {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 12px;
      z-index: 20;
      border: 1px solid rgba(255, 77, 104, 0.38);
      border-radius: 12px;
      padding: 10px 12px;
      background: rgba(40, 0, 8, 0.86);
      color: #ffd6dc;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.4px;
      text-align: center;
      box-shadow: 0 0 18px rgba(181, 31, 53, 0.18);
      pointer-events: none;
      animation: avisoArquivoEntrar 0.18s ease both;
    }

    @keyframes avisoArquivoEntrar {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  document.head.appendChild(estilo);
}

/* =========================================================
   REVELAÇÃO AO SCROLL
   ========================================================= */

function iniciarRevelacaoAoScroll() {
  const elementos = document.querySelectorAll(
    ".card, .personagem-card, .dossie-card, .documento-card, .local-card, .sala-card, .missao-card, .bloco, .secao"
  );

  if (!elementos.length) return;

  if (ArquivoCampanha.movimentoReduzido || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visivel"));
    return;
  }

  elementos.forEach((el) => {
    el.classList.add("revelar-scroll");
  });

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "80px 0px"
  });

  elementos.forEach((el) => observador.observe(el));

  inserirCSSRevelacao();
}

function inserirCSSRevelacao() {
  if (document.getElementById("css-revelacao-global")) return;

  const estilo = document.createElement("style");
  estilo.id = "css-revelacao-global";
  estilo.textContent = `
    .revelar-scroll {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.45s ease, transform 0.45s ease;
    }

    .revelar-scroll.visivel {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 760px) {
      .revelar-scroll {
        transform: translateY(8px);
        transition-duration: 0.28s;
      }
    }
  `;

  document.head.appendChild(estilo);
}

/* =========================================================
   TERMINAL ANIMADO
   Usa elementos com:
   data-terminal
   ========================================================= */

function iniciarTerminalAnimado() {
  const terminais = document.querySelectorAll("[data-terminal]");
  if (!terminais.length || ArquivoCampanha.movimentoReduzido) return;

  terminais.forEach((terminal) => {
    const textoOriginal = terminal.textContent.trim();
    const velocidade = Number(terminal.dataset.velocidade || 18);

    terminal.textContent = "";
    terminal.setAttribute("aria-label", textoOriginal);

    let indice = 0;

    const escrever = () => {
      if (!ArquivoCampanha.paginaVisivel) {
        requestAnimationFrame(escrever);
        return;
      }

      terminal.textContent = textoOriginal.slice(0, indice);
      indice++;

      if (indice <= textoOriginal.length) {
        setTimeout(escrever, velocidade);
      }
    };

    escrever();
  });
}

/* =========================================================
   SISTEMA VISUAL DE SOM
   Não toca áudio sozinho. Só prepara botão visual.
   Usa:
   [data-som-toggle]
   ========================================================= */

function iniciarSistemaDeSomVisual() {
  const botoesSom = document.querySelectorAll("[data-som-toggle]");

  botoesSom.forEach((botao) => {
    botao.addEventListener("click", () => {
      const ativo = botao.classList.toggle("ativo");
      botao.setAttribute("aria-pressed", String(ativo));
      botao.textContent = ativo ? "Som: ligado" : "Som: desligado";
      efeitoCliqueArquivo(botao);
    });
  });
}

/* =========================================================
   PERFORMANCE / VISIBILIDADE
   ========================================================= */

function iniciarControleDePerformance() {
  document.addEventListener("visibilitychange", () => {
    ArquivoCampanha.paginaVisivel = !document.hidden;
    document.body.classList.toggle("pagina-oculta", !ArquivoCampanha.paginaVisivel);
  });

  window.addEventListener("resize", debounce(() => {
    ArquivoCampanha.mobile = window.matchMedia("(max-width: 760px)").matches;
    ArquivoCampanha.desktop = !ArquivoCampanha.mobile;
  }, 200));
}

/* =========================================================
   ATALHOS
   ========================================================= */

function iniciarAtalhosBasicos() {
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharAvisosTemporarios();
    }
  });
}

/* =========================================================
   EFEITOS UTILITÁRIOS
   ========================================================= */

function efeitoCliqueArquivo(elemento) {
  if (!elemento || ArquivoCampanha.movimentoReduzido) return;

  elemento.classList.remove("efeito-clique-arquivo");
  void elemento.offsetWidth;
  elemento.classList.add("efeito-clique-arquivo");

  inserirCSSEfeitosBasicos();

  setTimeout(() => {
    elemento.classList.remove("efeito-clique-arquivo");
  }, 240);
}

function efeitoErroArquivo(elemento) {
  if (!elemento || ArquivoCampanha.movimentoReduzido) return;

  elemento.classList.remove("efeito-erro-arquivo");
  void elemento.offsetWidth;
  elemento.classList.add("efeito-erro-arquivo");

  inserirCSSEfeitosBasicos();

  setTimeout(() => {
    elemento.classList.remove("efeito-erro-arquivo");
  }, 240);
}

function inserirCSSEfeitosBasicos() {
  if (document.getElementById("css-efeitos-basicos-global")) return;

  const estilo = document.createElement("style");
  estilo.id = "css-efeitos-basicos-global";
  estilo.textContent = `
    .efeito-clique-arquivo {
      animation: cliqueArquivoGlobal 0.22s ease;
    }

    @keyframes cliqueArquivoGlobal {
      0% { transform: scale(1); }
      45% { transform: scale(0.985); }
      100% { transform: scale(1); }
    }

    .efeito-erro-arquivo {
      animation: erroArquivoGlobal 0.20s steps(2, end);
    }

    @keyframes erroArquivoGlobal {
      0% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      50% { transform: translateX(2px); }
      75% { transform: translateX(-1px); }
      100% { transform: translateX(0); }
    }

    .pagina-oculta * {
      animation-play-state: paused !important;
    }
  `;

  document.head.appendChild(estilo);
}

function mostrarAvisoTemporario(container, mensagem) {
  if (!container) return;

  const estiloAtual = window.getComputedStyle(container).position;

  if (estiloAtual === "static") {
    container.style.position = "relative";
  }

  container.querySelectorAll(".aviso-temporario-arquivo").forEach((aviso) => aviso.remove());

  const aviso = document.createElement("div");
  aviso.className = "aviso-temporario-arquivo";
  aviso.textContent = mensagem;

  container.appendChild(aviso);

  setTimeout(() => {
    aviso.remove();
  }, 1800);
}

function fecharAvisosTemporarios() {
  document.querySelectorAll(".aviso-temporario-arquivo").forEach((aviso) => aviso.remove());
}

function animarEntrada(elemento) {
  if (!elemento || ArquivoCampanha.movimentoReduzido) return;

  elemento.classList.remove("aparecer");
  void elemento.offsetWidth;
  elemento.classList.add("aparecer");
}

function intervaloAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debounce(funcao, espera = 200) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => funcao.apply(null, args), espera);
  };
}
