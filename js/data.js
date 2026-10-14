/**
 * ====================================================================
 * CONFIGURAÇÃO DO PEDIDO - LIB (500 CHAVEIROS PERSONALIZADOS)
 * ====================================================================
 * 
 * Atualizado com os dados reais da produção:
 * - Pagamento: 06/10/2026 (terça-feira)
 * - Restante do filamento Rosa Púrpura comprado e recebido no ateliê (100% dos insumos disponíveis)
 * - 120 unidades produzidas e prontas para embalar (14/10/2026)
 */

window.PRODUCTION_CONFIG = {
  // Informações Gerais do Cliente e Pedido
  client: {
    name: "Lib",
    legalName: "Lib - Modeladores e Protetores de Seios",
    website: "https://uselib.com.br",
    orderCode: "LIB-500",
    orderTitle: "Chaveiros Personalizados Exclusivos Lib",
    productDescription: "Chaveiros personalizados produzidos em impressão 3D de alta precisão com a cor oficial Rosa Púrpura da Lib.",
  },

  // Quantidades
  quantities: {
    total: 500,             // Total de chaveiros contratados
    completed: 120,         // 120 unidades já produzidas e prontas para embalar!
    batchSize: 100,         // Tamanho de cada lote de produção (5 lotes de 100)
  },

  // Datas Principais do Processo
  dates: {
    orderCreated: "06/10/2026",          // Pagamento confirmado pela Lib (terça-feira)
    materialPurchased: "100% Adquirido", // Todo o filamento Rosa Púrpura comprado
    materialPurchasedSubtext: "Filamento Rosa Púrpura (100% comprado)",
    materialArrived: "14/10/2026",       // Chegada do restante do filamento no ateliê
    materialArrivedSubtext: "100% dos insumos no ateliê",
    productionStarted: "08/10/2026",     // Início da produção e calibração
    estimatedDelivery: "Em andamento (lotes contínuos)", // Previsão
    lastUpdated: "Hoje (14/10) às 09:30",// Data/hora da última atualização
  },

  // Mensagem personalizada para o destaque principal (opcional, calculada automaticamente se omitida)
  activeMessage: "✨ Produção ativa: 120 chaveiros prontos para embalar! Lote 01 finalizado e Lote 02 em andamento. Restante do filamento já recebido no ateliê!",

  // Contato para Dúvidas (WhatsApp)
  contact: {
    whatsappNumber: "5511937183232", // WhatsApp oficial de acompanhamento
    responsibleName: "Bruno",
    customMessage: "Olá! Gostaria de acompanhar a produção dos 500 chaveiros da Lib (#LIB-500)."
  },

  // Especificações Técnicas do Produto (Ficha técnica)
  specs: [
    { label: "Item", value: "Chaveiro Personalizado Lib" },
    { label: "Quantidade", value: "500 unidades" },
    { label: "Processo", value: "Impressão 3D de alta resolução e acabamento manual" },
    { label: "Matéria-Prima", value: "Filamento Premium PLA Rosa Púrpura" },
    { label: "Tonalidade", value: "Rosa Púrpura (Paleta Oficial Lib)" },
    { label: "Estoque de Insumos", value: "100% disponível no ateliê (todo o filamento recebido; 120 peças prontas para embalar)" },
    { label: "Argola & Corrente", value: "Metal banho especial com argola reforçada" },
    { label: "Embalagem", value: "Tag individual personalizada Lib" }
  ],

  // Etapas da Linha de Produção
  stages: [
    {
      id: "approval",
      title: "Pagamento Confirmado & Layout Aprovado",
      description: "Confirmação do pagamento pela Lib e validação do modelo 3D digital dos chaveiros.",
      date: "06/10/2026",
      status: "completed",
      icon: "palette"
    },
    {
      id: "material_purchase",
      title: "Compra do Filamento Rosa Púrpura",
      description: "100% da matéria-prima adquirida! Após o 1º lote inicial, o restante do filamento oficial Rosa Púrpura foi comprado com sucesso para suprir todo o pedido de 500 chaveiros.",
      date: "100% Adquirido",
      status: "completed",
      icon: "shopping-bag"
    },
    {
      id: "material_arrival",
      title: "Chegada do Restante do Material no Ateliê",
      description: "O restante do filamento Rosa Púrpura já chegou ao ateliê e foi conferido. Estoque 100% disponível para produção contínua de todos os lotes.",
      date: "14/10/2026",
      status: "completed",
      icon: "package-check"
    },
    {
      id: "production",
      title: "Produção dos Chaveiros (Lote 01 Concluído • Lote 02 em Andamento)",
      description: "120 unidades já impressas, finalizadas e prontas para embalar! Lote 01 (100 unidades) 100% concluído e Lote 02 iniciado com 20 unidades prontas.",
      date: "Em andamento (120 prontas)",
      status: "in_progress",
      icon: "flame"
    },
    {
      id: "quality_packaging",
      title: "Controle de Qualidade & Embalagem",
      description: "Inspeção visual unitária de cada chaveiro, remoção de suportes, polimento e fixação das tags Lib (120 peças já aguardando esta etapa).",
      date: "Próxima etapa (120 prontas)",
      status: "pending",
      icon: "shield-check"
    },
    {
      id: "delivery",
      title: "Expedição & Entrega para a Lib",
      description: "Envio seguro com código de rastreamento direto para a equipe da Lib.",
      date: "Previsto",
      status: "pending",
      icon: "truck"
    }
  ],

  // Diário de Bordo da Produção
  updates: [
    {
      date: "14/10/2026 - Hoje",
      title: "120 chaveiros prontos e restante do filamento entregue!",
      content: "Alcançamos a marca de 120 chaveiros produzidos com acabamento impecável e 100% prontos para embalar! O Lote 01 (100 unidades) foi concluído com sucesso e o Lote 02 já conta com 20 unidades prontas. Além disso, todo o restante do filamento Rosa Púrpura comprado já chegou ao ateliê, garantindo 100% da matéria-prima necessária para a conclusão dos 500 chaveiros sem interrupções.",
      badge: "Produção & Insumos"
    },
    {
      date: "10/10/2026 - Sábado",
      title: "45 unidades produzidas com sucesso!",
      content: "Produção em ritmo acelerado: atingimos a marca de 45 chaveiros impressos, inspecionados e aprovados com acabamento de alta qualidade. Seguimos avançando no Lote 01.",
      badge: "Produção"
    },
    {
      date: "09/10/2026 - Sexta-feira",
      title: "Primeiras 15 unidades produzidas com sucesso!",
      content: "As 15 primeiras peças foram impressas e inspecionadas. A cor Rosa Púrpura atingiu exata harmonia com a identidade visual da Lib e o acabamento ficou impecável. Seguimos produzindo o Lote 01 e monitorando a chegada de mais filamento no fornecedor.",
      badge: "Produção"
    },
    {
      date: "08/10/2026 - Quinta-feira",
      title: "Filamento Rosa Púrpura chegou ao ateliê",
      content: "Recebemos o primeiro rolo de 1 kg de filamento Rosa Púrpura. Realizamos os testes de calibração de camada e as primeiras matrizes de teste foram 100% aprovadas.",
      badge: "Logística"
    },
    {
      date: "06/10/2026 - Terça-feira",
      title: "Pagamento confirmado & Compra da matéria-prima",
      content: "Pagamento do pedido confirmado pela equipe da Lib! Compramos imediatamente a unidade de 1 kg do filamento especial Rosa Púrpura que estava disponível no fornecedor e já deixamos encomendados os próximos rolos.",
      badge: "Início"
    }
  ]
};

