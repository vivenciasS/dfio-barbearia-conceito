/*
 * PERSONALIZAÇÃO DO CLIENTE
 * Este é o principal arquivo a editar para reutilizar o site.
 * Mantenha os nomes das propriedades e altere apenas os valores.
 */
window.SITE_CONFIG = {
  // Use false quando o site deixar de ser uma demonstração.
  isDemo: true,

  company: {
    name: "Empresa Modelo",
    logoText: "Empresa",
    logoHighlight: "Modelo",
    initials: "EM",
    monogram: "MODELO",
    slogan: "Boas ideias. Resultados que aproximam.",
    description: "Soluções cuidadosas e atendimento próximo para tornar cada experiência simples, confiável e memorável.",
    foundedYear: "2020"
  },

  contact: {
    // Telefone visível e WhatsApp somente com dígitos, incluindo código do país e DDD.
    phone: "(00) 00000-0000",
    whatsapp: "5500000000000",
    whatsappMessage: "Olá! Gostaria de saber mais sobre os serviços.",
    address: "Rua Exemplo, 123 - Centro, Sua Cidade - UF",
    hours: "Segunda a sexta, das 9h às 18h"
  },

  // Adicione, remova ou reordene os itens. Use featured: true em apenas um destaque.
  services: [
    {
      name: "Serviço Essencial",
      description: "Uma solução prática, personalizada e pensada para as necessidades do cliente.",
      priceLabel: "A partir de",
      price: "R$ 00",
      icon: "◆",
      featured: false
    },
    {
      name: "Serviço Completo",
      description: "Atendimento completo com acompanhamento cuidadoso em todas as etapas.",
      priceLabel: "A partir de",
      price: "R$ 00",
      icon: "✦",
      featured: true
    },
    {
      name: "Solução Personalizada",
      description: "Uma proposta sob medida para objetivos e desafios específicos de cada projeto.",
      priceLabel: "Sob consulta",
      price: "Solicite uma proposta",
      icon: "◇",
      featured: false
    }
  ],

  // Apague uma rede ou deixe a URL vazia para ocultá-la.
  social: [
    { name: "Instagram", url: "https://instagram.com/seu_perfil" },
    { name: "Facebook", url: "https://facebook.com/sua_pagina" },
    { name: "LinkedIn", url: "https://linkedin.com/company/sua_empresa" }
  ],

  // Textos das seções. Normalmente basta ajustar estes campos e os dados acima.
  content: {
    demoLabel: "Site fictício para demonstração",
    hero: {
      title: "Seu objetivo.",
      titleHighlight: "Nossa dedicação.",
      visualTagline: "Propósito & qualidade",
      highlights: [
        { value: "10+", label: "Anos de experiência" },
        { value: "3 mil+", label: "Clientes atendidos" },
        { value: "4,9", label: "Avaliação média" }
      ]
    },
    services: {
      eyebrow: "O que fazemos",
      title: "Soluções para cada necessidade",
      description: "Atendimento próximo, processos bem definidos e soluções pensadas para entregar uma experiência de qualidade."
    },
    about: {
      eyebrow: "Nossa história",
      title: "Experiência no presente. Visão de futuro.",
      paragraphs: [
        "Nossa história começou com o propósito de oferecer soluções confiáveis e um atendimento que valoriza cada pessoa.",
        "Combinamos experiência, atenção aos detalhes e melhoria contínua para construir relações duradouras."
      ],
      visualPhrase: "Cuidado em cada detalhe",
      experienceValue: "10",
      experienceLabel: "anos criando boas experiências",
      features: [
        "Equipe preparada",
        "Qualidade em cada etapa",
        "Atendimento acolhedor",
        "Soluções personalizadas"
      ]
    },
    testimonials: {
      eyebrow: "Depoimentos demonstrativos",
      title: "O que clientes poderiam dizer",
      description: "Os textos abaixo são fictícios e servem apenas para demonstrar o layout deste modelo.",
      items: [
        { quote: "Atendimento excelente e uma experiência muito agradável. O cuidado com os detalhes fez toda a diferença.", author: "Cliente A.", initials: "CA" },
        { quote: "A equipe entendeu o que eu precisava e apresentou uma solução clara, prática e muito bem executada.", author: "Cliente B.", initials: "CB" },
        { quote: "Pontualidade, atenção e um resultado acima das expectativas. Uma experiência realmente diferenciada.", author: "Cliente C.", initials: "CC" }
      ]
    },
    contact: {
      eyebrow: "Vamos conversar?",
      title: "Encontre a solução ideal para você.",
      description: "Fale com nossa equipe e conte como podemos ajudar."
    }
  },

  seo: {
    title: "Empresa Modelo | Soluções para o seu negócio",
    description: "Site demonstrativo de uma empresa fictícia. Modelo reutilizável para apresentar serviços, diferenciais e formas de contato."
  }
};
