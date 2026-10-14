# 🌸 Lib • Portal de Acompanhamento de Produção

Portal web exclusivo e responsivo desenvolvido para a **Lib** acompanhar em tempo real a linha de produção dos seus **500 chaveiros personalizados**.

Desenvolvido exclusivamente com tecnologias web estáticas (**HTML5**, **CSS3** e **JavaScript vanilla**), 100% pronto para publicação no **GitHub Pages**.

---

## 🎨 Branding & Identidade Visual

O design foi concebido com base na identidade oficial da **Lib** ([uselib.com.br](https://uselib.com.br)):
- **Paleta de Cores**: Tons suaves de rosa pétala (`#F489A4`), blush coral (`#FA969B`), ameixa/púrpura elegante (`#46253F`), champanhe suave (`#FAF7F5`) e fundo claro.
- **Tipografia**: Montserrat (Google Fonts) com espaçamento de letras delicado nas etiquetas e títulos.
- **Logotipo Oficial**: Vetores e imagens oficiais da Lib em alta definição com suporte a modo transparente e roxo.
- **Microinterações**: Efeito de brilho na barra de progresso (*shimmer*), pulso de status ao vivo, transições suaves e design *mobile-first* (otimizado para abertura direta pelo WhatsApp).

---

## 🚀 Funcionalidades

1. **Visão Geral & Barra de Progresso Interativa**:
   - Porcentagem de conclusão calculada automaticamente.
   - Indicador de chaveiros preenchidos em relação ao total (ex: 360 / 500).
   - Efeito visual de progresso e marcos (0%, 25%, 50%, 75%, 100%).

2. **Destaque das Informações Solicitadas**:
   - **Data de Compra da Matéria-Prima**: Exibida com destaque em cards e na linha do tempo.
   - **Data de Chegada dos Materiais no Ateliê**: Exibida com confirmação de conferência.
   - **Quantidade de Chaveiros Preenchidos / Restantes**: Contadores automáticos.
   - **Previsão de Envio**: Data estimada de expedição.

3. **Divisão Operacional por Lotes (Batches)**:
   - Visualização dos 500 chaveiros divididos em 5 lotes de 100 unidades cada, com status individual (Concluído, Em Andamento, Aguardando).

4. **Linha do Tempo Completa**:
   - Etapas do pedido: Briefing/Aprovação, Compra de Insumos, Chegada no Ateliê, Preenchimento artesanal, Controle de Qualidade/Embalagem e Expedição.

5. **Diário de Bordo & Ficha Técnica**:
   - Histórico de atualizações com datas e mensagens de cada avanço da produção.
   - Especificações completas dos chaveiros.

6. **Canal de Contato Rápido & Compartilhamento**:
   - Botão direto para WhatsApp com mensagem pré-configurada para alinhamentos com a produção.
   - Botão para copiar o link com um clique.

---

## 🛠️ Como Atualizar os Dados da Produção

Para atualizar as quantidades ou datas de forma definitiva no GitHub Pages, basta editar o arquivo [`js/data.js`](js/data.js):

```javascript
window.PRODUCTION_CONFIG = {
  quantities: {
    total: 500,
    completed: 400, // <- Altere para a quantidade de chaveiros preenchidos
    batchSize: 100,
  },
  dates: {
    materialPurchased: "28/09/2026",  // <- Data de compra
    materialArrived: "04/10/2026",    // <- Data de chegada
    estimatedDelivery: "18/10/2026",  // <- Previsão de entrega
    lastUpdated: "Hoje às 18:30"      // <- Data/hora da última atualização
  },
  // ...
};
```

> **Dica**: Você também pode testar valores via parâmetros na URL! Exemplo:  
> `https://seu-usuario.github.io/lib-rastreio/?completed=420`

---

## 🌐 Como Ativar no GitHub Pages

1. Faça o commit e envie os arquivos para o GitHub:
   ```bash
   git add .
   git commit -m "feat: site de acompanhamento de produção Lib"
   git push origin main
   ```
2. No repositório no GitHub:
   - Vá em **Settings** > **Pages** (no menu lateral esquerdo).
   - Em **Build and deployment > Source**, selecione **Deploy from a branch**.
   - Em **Branch**, selecione `main` e a pasta `/(root)`.
   - Clique em **Save**.
3. Em poucos segundos, o link estará disponível (ex: `https://seu-usuario.github.io/lib-rastreio/`). Basta enviar esse link para a Lib!
