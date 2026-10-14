/**
 * ==========================================================================
 * LIB • PORTAL DE ACOMPANHAMENTO DE PRODUÇÃO
 * Lógica da Aplicação, Animações e Gerenciador de Status
 * ==========================================================================
 */

(function () {
  'use strict';

  // Obter dados: window.PRODUCTION_CONFIG é a fonte oficial da produção
  function getMergedConfig() {
    let base = JSON.parse(JSON.stringify(window.PRODUCTION_CONFIG || {}));

    // Suporte a preview local apenas se explicitamente salvo no editor desta máquina
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('preview')) {
      const savedLocal = localStorage.getItem('LIB_PRODUCTION_CUSTOM_DATA');
      if (savedLocal) {
        try {
          const parsed = JSON.parse(savedLocal);
          base = { ...base, ...parsed };
        } catch (e) {
          console.warn('Erro ao carregar dados do LocalStorage:', e);
        }
      }
    }

    // Suporte opcional a parâmetros na URL para testes (Ex: ?completed=15&total=500)
    if (urlParams.has('completed')) {
      const q = parseInt(urlParams.get('completed'), 10);
      if (!isNaN(q)) {
        base.quantities = base.quantities || {};
        base.quantities.completed = Math.min(Math.max(q, 0), base.quantities.total || 500);
      }
    }
    if (urlParams.has('total')) {
      const t = parseInt(urlParams.get('total'), 10);
      if (!isNaN(t)) {
        base.quantities = base.quantities || {};
        base.quantities.total = t;
      }
    }

    return base;
  }

  const state = getMergedConfig();

  // Ícones SVG reutilizáveis
  const ICONS = {
    check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    shoppingBag: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
    packageCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-1.8 0l-3.3 1.9A1.78 1.78 0 0 0 1.5 7.7v8.6a1.78 1.78 0 0 0 .95 1.56l3.3 1.9a1.78 1.78 0 0 0 1.8 0l8.95-5.16a1.78 1.78 0 0 0 .95-1.56V9.4z"></path><polyline points="3.29 7 12 12.01 20.71 7"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line><polyline points="16 16 18 18 22 13"></polyline></svg>`,
    flame: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"></path></svg>`,
    shieldCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
    truck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
    palette: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path></svg>`,
    box: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    sparkles: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`
  };

  // Animação de número progressivo
  function animateValue(element, start, end, duration) {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current.toLocaleString('pt-BR');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString('pt-BR');
      }
    };
    window.requestAnimationFrame(step);
  }

  // Renderiza toda a interface
  function renderDashboard() {
    const total = state.quantities.total || 500;
    const completed = state.quantities.completed || 0;
    const remaining = Math.max(total - completed, 0);
    const percentage = Math.min(Math.round((completed / total) * 100), 100);

    // 1. Cabeçalho e Informações Básicas
    document.querySelectorAll('.order-code-display').forEach(el => {
      el.textContent = state.client.orderCode;
    });
    
    const lastUpdateEl = document.getElementById('last-updated-text');
    if (lastUpdateEl) {
      lastUpdateEl.textContent = `Atualizado: ${state.dates.lastUpdated}`;
    }

    // 2. Porcentagem e Barra de Progresso Principal
    const percNumberEl = document.getElementById('progress-percentage-num');
    if (percNumberEl) {
      animateValue(percNumberEl, 0, percentage, 1200);
    }

    const completedRatioEl = document.getElementById('progress-completed-ratio');
    if (completedRatioEl) {
      completedRatioEl.textContent = `${completed.toLocaleString('pt-BR')} de ${total.toLocaleString('pt-BR')} chaveiros`;
    }

    const progressBarFill = document.getElementById('main-progress-bar-fill');
    if (progressBarFill) {
      progressBarFill.style.width = `${percentage}%`;
    }

    // Mensagem dinâmica da etapa atual
    const activeMsgEl = document.getElementById('progress-active-msg-text');
    if (activeMsgEl) {
      if (state.activeMessage) {
        activeMsgEl.textContent = state.activeMessage;
      } else if (percentage >= 100) {
        activeMsgEl.textContent = '🎉 Todos os 500 chaveiros foram concluídos e estão prontos para envio!';
      } else {
        const batchSize = state.quantities.batchSize || 100;
        const currentBatch = Math.min(Math.floor(completed / batchSize) + 1, Math.ceil(total / batchSize));
        const currentBatchProgress = completed % batchSize === 0 && completed > 0 ? batchSize : (completed % batchSize);
        activeMsgEl.textContent = `✨ Produção ativa: ${completed} chaveiros prontos para embalar! Lote 01 finalizado e Lote 0${currentBatch} em andamento (${currentBatchProgress}/${batchSize}). Filamento oficial Rosa Púrpura no ateliê!`;
      }
    }

    // 3. Cards de Métricas Principais
    const metricTotalEl = document.getElementById('metric-total-val');
    if (metricTotalEl) animateValue(metricTotalEl, 0, total, 800);

    const metricCompletedEl = document.getElementById('metric-completed-val');
    if (metricCompletedEl) animateValue(metricCompletedEl, 0, completed, 1000);

    const metricRemainingEl = document.getElementById('metric-remaining-val');
    if (metricRemainingEl) animateValue(metricRemainingEl, 0, remaining, 900);

    const metricDeliveryEl = document.getElementById('metric-delivery-val');
    if (metricDeliveryEl) metricDeliveryEl.textContent = state.dates.estimatedDelivery;

    // Métricas com badges e subtextos
    const metricPurchasedDateEl = document.getElementById('metric-purchased-date');
    if (metricPurchasedDateEl) metricPurchasedDateEl.textContent = state.dates.materialPurchased;

    const metricPurchasedSubtextEl = document.getElementById('metric-purchased-subtext');
    if (metricPurchasedSubtextEl && state.dates.materialPurchasedSubtext) {
      metricPurchasedSubtextEl.textContent = state.dates.materialPurchasedSubtext;
    }

    const metricArrivedDateEl = document.getElementById('metric-arrived-date');
    if (metricArrivedDateEl) metricArrivedDateEl.textContent = state.dates.materialArrived;

    const metricArrivedSubtextEl = document.getElementById('metric-arrived-subtext');
    if (metricArrivedSubtextEl && state.dates.materialArrivedSubtext) {
      metricArrivedSubtextEl.textContent = state.dates.materialArrivedSubtext;
    }

    // 4. Lotes de Produção (Batches Breakdown)
    renderBatches(total, completed);

    // 5. Linha do Tempo (Timeline)
    renderTimeline(percentage);

    // 6. Feed de Atualizações & Ficha Técnica
    renderUpdates();
    renderSpecs();

    // 7. Configurar Botões de Contato e Compartilhamento
    setupActionButtons();
  }

  // Renderiza os lotes de produção (ex: 5 lotes de 100)
  function renderBatches(total, completed) {
    const container = document.getElementById('batches-container');
    if (!container) return;

    const batchSize = state.quantities.batchSize || 100;
    const numBatches = Math.ceil(total / batchSize);
    container.innerHTML = '';

    for (let i = 0; i < numBatches; i++) {
      const batchNumber = i + 1;
      const batchStart = i * batchSize;
      const batchEnd = Math.min((i + 1) * batchSize, total);
      const batchTarget = batchEnd - batchStart;

      // Quantos deste lote já foram preenchidos
      let batchFilled = 0;
      if (completed >= batchEnd) {
        batchFilled = batchTarget;
      } else if (completed > batchStart) {
        batchFilled = completed - batchStart;
      }

      const batchPerc = Math.round((batchFilled / batchTarget) * 100);
      let batchStatus = 'pending';
      let statusIcon = ICONS.clock;

      if (batchPerc === 100) {
        batchStatus = 'completed';
        statusIcon = ICONS.check;
      } else if (batchPerc > 0) {
        batchStatus = 'in_progress';
        statusIcon = ICONS.flame;
      }

      const batchCard = document.createElement('div');
      batchCard.className = `batch-card ${batchStatus}`;
      batchCard.innerHTML = `
        <div class="batch-top">
          <span class="batch-name">Lote 0${batchNumber}</span>
          <div class="batch-status-icon">${statusIcon}</div>
        </div>
        <div class="batch-counter">${batchFilled} <span style="font-size: 0.85rem; font-weight: 500; color: var(--color-text-muted);">/ ${batchTarget} un</span></div>
        <div class="batch-progress-mini">
          <div class="batch-progress-mini-bar" style="width: ${batchPerc}%"></div>
        </div>
        <div class="batch-subtext">
          ${batchPerc === 100 ? '100% finalizado' : batchPerc > 0 ? `${batchPerc}% preenchido` : 'Aguardando lote anterior'}
        </div>
      `;
      container.appendChild(batchCard);
    }
  }

  // Renderiza a linha do tempo com base no estado e nas datas
  function renderTimeline(percentage) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = '';

    const stages = state.stages || [];

    stages.forEach((stage, idx) => {
      // Ajustar status dinamicamente se necessário baseado em datas e preenchimento
      let currentStatus = stage.status;
      if (stage.id === 'production') {
        if (percentage >= 100) currentStatus = 'completed';
        else if (percentage > 0) currentStatus = 'in_progress';
      }

      let bulletIcon = ICONS.clock;
      let statusLabel = 'Pendente';
      let tagClass = 'pending';

      if (currentStatus === 'completed') {
        bulletIcon = ICONS.check;
        statusLabel = 'Concluído';
        tagClass = 'completed';
      } else if (currentStatus === 'in_progress') {
        bulletIcon = ICONS.flame;
        statusLabel = 'Em Andamento';
        tagClass = 'in_progress';
      }

      // Substituir ícone temático se pendente
      if (currentStatus === 'pending' && ICONS[stage.icon]) {
        bulletIcon = ICONS[stage.icon];
      }

      // Injetar datas dinâmicas se for compra ou chegada de material
      let stageDate = stage.date;
      if (stage.id === 'material_purchase' && state.dates.materialPurchased) {
        stageDate = state.dates.materialPurchased;
      }
      if (stage.id === 'material_arrival' && state.dates.materialArrived) {
        stageDate = state.dates.materialArrived;
      }

      const itemEl = document.createElement('div');
      itemEl.className = `timeline-item ${currentStatus}`;
      itemEl.innerHTML = `
        <div class="timeline-bullet">${bulletIcon}</div>
        <div class="timeline-content-card">
          <div class="timeline-header-row">
            <h4 class="timeline-step-title">${stage.title}</h4>
            <span class="timeline-date-badge">${stageDate}</span>
          </div>
          <p class="timeline-desc">${stage.description}</p>
          <div class="timeline-status-tag ${tagClass}">
            ${currentStatus === 'completed' ? ICONS.check : currentStatus === 'in_progress' ? ICONS.flame : ICONS.clock}
            <span>${statusLabel}</span>
          </div>
        </div>
      `;
      container.appendChild(itemEl);
    });
  }

  // Renderiza o feed de atualizações
  function renderUpdates() {
    const container = document.getElementById('updates-feed-container');
    if (!container) return;

    container.innerHTML = '';
    const updates = state.updates || [];

    updates.forEach(item => {
      const entry = document.createElement('div');
      entry.className = 'update-entry';
      entry.innerHTML = `
        <div class="update-meta">
          <span class="update-date">${item.date}</span>
          <span class="update-category">${item.badge}</span>
        </div>
        <h5 class="update-title">${item.title}</h5>
        <p class="update-text">${item.content}</p>
      `;
      container.appendChild(entry);
    });
  }

  // Renderiza especificações do pedido
  function renderSpecs() {
    const container = document.getElementById('specs-container');
    if (!container) return;

    container.innerHTML = '';
    const specs = state.specs || [];

    specs.forEach(spec => {
      const item = document.createElement('div');
      item.className = 'spec-item';
      item.innerHTML = `
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      `;
      container.appendChild(item);
    });
  }

  // Configurações de botões de interação
  function setupActionButtons() {
    // WhatsApp CTA
    const whatsappLinks = document.querySelectorAll('.btn-whatsapp-action');
    const phone = (state.contact.whatsappNumber || '5511937183232').replace(/\D/g, '');
    const msg = encodeURIComponent(state.contact.customMessage || 'Olá! Gostaria de acompanhar o pedido dos 500 chaveiros da Lib.');
    const whatsappUrl = `https://wa.me/${phone}?text=${msg}`;

    whatsappLinks.forEach(link => {
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    // Compartilhar / Copiar Link
    const shareBtns = document.querySelectorAll('.btn-share-link');
    shareBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          showToast('Link do acompanhamento copiado para a área de transferência!');
        }).catch(() => {
          showToast('Copie o link na barra de endereços do seu navegador.');
        });
      };
    });

    // Imprimir / Salvar PDF
    const printBtns = document.querySelectorAll('.btn-print-page');
    printBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        window.print();
      };
    });
  }

  // Toast notification
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `${ICONS.check} <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Inicialização no carregamento da página
  document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
  });

})();
