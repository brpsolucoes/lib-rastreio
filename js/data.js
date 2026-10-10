/**
 * ====================================================================
 * CONFIGURAÇÃO DO PEDIDO - LIB (500 CHAVEIROS PERSONALIZADOS)
 * ====================================================================
 * 
 * Atualizado com os dados reais da produção:
 * - Pagamento: 06/10/2026 (terça-feira)
 * - 1 kg de filamento Rosa Púrpura comprado (fornecedor tinha 1 unidade)
 * - Chegada do material: 08/10/2026 (ontem)
 * - 15 unidades já impressas e prontas hoje (09/10/2026)
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
    completed: 15,          // 15 unidades já produzidas e prontas!
    batchSize: 100,         // Tamanho de cada lote de produção (5 lotes de 100)
  },

  // Datas Principais do Processo
  dates: {
    orderCreated: "06/10/2026",          // Pagamento confirmado pela Lib (terça-feira)
    materialPurchased: "06/10/2026",     // Compra do 1º kg de filamento Rosa Púrpura
    materialArrived: "08/10/2026",       // Chegada do filamento no ateliê (ontem)
    productionStarted: "08/10/2026",     // Início da produção e calibração
    estimatedDelivery: "Em andamento (lotes contínuos)", // Previsão
    lastUpdated: "Hoje (09/10) às 23:45",// Data/hora da última atualização
  },

  // Contato para Dúvidas (WhatsApp)
  contact: {
    whatsappNumber: "5511999999999", // Altere para o seu número WhatsApp com DDD se desejar
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
    { label: "Estoque de Insumos", value: "1 kg em uso (15 prontos); aguardando reposição de mais bobinas pelo fornecedor" },
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
      description: "Adquirido 1 kg de filamento especial Rosa Púrpura (única unidade disponível no fornecedor; aguardando novo lote para os próximos ciclos).",
      date: "06/10/2026",
      status: "completed",
      icon: "shopping-bag"
    },
    {
      id: "material_arrival",
      title: "Chegada do Material no Ateliê",
      description: "Recebimento da primeira bobina de filamento Rosa Púrpura, testes de extrusão e calibração dimensional das primeiras peças.",
      date: "08/10/2026",
      status: "completed",
      icon: "package-check"
    },
    {
      id: "production",
      title: "Produção dos Chaveiros (1º Lote)",
      description: "15 unidades já impressas, finalizadas e aprovadas! Produção do primeiro lote de 100 unidades em ritmo constante.",
      date: "Em andamento (15 prontas)",
      status: "in_progress",
      icon: "flame"
    },
    {
      id: "quality_packaging",
      title: "Controle de Qualidade & Embalagem",
      description: "Inspeção visual unitária de cada chaveiro, remoção de suportes, polimento e fixação das tags Lib.",
      date: "Previsto",
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
      date: "09/10/2026 - Hoje",
      title: "Primeiras 15 unidades produzidas com sucesso!",
      content: "As 15 primeiras peças foram impressas e inspecionadas. A cor Rosa Púrpura atingiu exata harmonia com a identidade visual da Lib e o acabamento ficou impecável. Seguimos produzindo o Lote 01 e monitorando a chegada de mais filamento no fornecedor.",
      badge: "Produção"
    },
    {
      date: "08/10/2026 - Ontem",
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
