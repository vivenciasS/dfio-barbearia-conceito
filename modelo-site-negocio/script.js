const config = window.SITE_CONFIG;

if (!config) {
  throw new Error("SITE_CONFIG nao foi carregado. Verifique se config.js vem antes de script.js.");
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const menuBackdrop = document.querySelector(".nav-backdrop");
const header = document.querySelector(".header");
const whatsappButton = document.querySelector("#whatsapp-button");
const contactNotice = document.querySelector("#contact-notice");
const currentYear = document.querySelector("#current-year");
const mobileMenu = window.matchMedia("(max-width: 900px)");

function getConfigValue(path) {
  return path.split(".").reduce((value, key) => value?.[key], config);
}

function bindSimpleContent() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const value = getConfigValue(element.dataset.config);

    if (value !== undefined && value !== null) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-company-initials]").forEach((element) => {
    element.textContent = config.company.initials;
  });

  document.querySelectorAll("[data-company-logo]").forEach((element) => {
    element.replaceChildren(document.createTextNode(`${config.company.logoText} `));
    const highlight = document.createElement("strong");
    highlight.textContent = config.company.logoHighlight;
    element.append(highlight);
  });

  document.querySelectorAll(".js-company-logo").forEach((logo) => {
    logo.setAttribute("aria-label", `${config.company.name} - inicio`);
  });

  document.querySelector("[data-demo-label]").textContent = config.content.demoLabel;
  document.querySelector("[data-company-watermark]").dataset.companyWatermark = config.company.monogram;

  if (!config.isDemo) {
    document.querySelector("[data-highlights]").removeAttribute("aria-describedby");
    document.querySelector("[data-services]").removeAttribute("aria-describedby");
    whatsappButton.setAttribute("aria-describedby", "contact-notice");
    document.querySelectorAll(".demo-only, [data-demo-label]").forEach((element) => element.remove());
  }
}

function renderHighlights() {
  const list = document.querySelector("[data-highlights]");

  config.content.hero.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    const value = document.createElement("strong");
    const label = document.createElement("span");
    value.textContent = highlight.value;
    label.textContent = highlight.label;
    item.append(value, label);
    list.append(item);
  });
}

function renderServices() {
  const grid = document.querySelector("[data-services]");

  config.services.forEach((service, index) => {
    const card = document.createElement("article");
    card.className = `service-card${service.featured ? " service-card--featured" : ""}`;

    if (service.featured) {
      const tag = document.createElement("span");
      tag.className = "service-card__tag";
      tag.textContent = "Destaque";
      card.append(tag);
    }

    const number = document.createElement("span");
    number.className = "service-card__number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1).padStart(2, "0");

    const icon = document.createElement("div");
    icon.className = "service-card__icon";
    icon.setAttribute("aria-hidden", "true");
    const iconContent = document.createElement("span");
    iconContent.textContent = service.icon;
    icon.append(iconContent);

    const title = document.createElement("h3");
    title.textContent = service.name;
    const description = document.createElement("p");
    description.textContent = service.description;

    const footer = document.createElement("div");
    footer.className = "service-card__footer";
    const priceLabel = document.createElement("span");
    priceLabel.textContent = service.priceLabel;
    const price = document.createElement("strong");
    price.textContent = service.price;
    footer.append(priceLabel, price);

    card.append(number, icon, title, description, footer);
    grid.append(card);
  });
}

function renderAbout() {
  const paragraphs = document.querySelector("[data-about-paragraphs]");
  const features = document.querySelector("[data-about-features]");

  config.content.about.paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraphs.append(paragraph);
  });

  config.content.about.features.forEach((text) => {
    const item = document.createElement("li");
    const check = document.createElement("span");
    check.setAttribute("aria-hidden", "true");
    check.textContent = "✓";
    item.append(check, document.createTextNode(text));
    features.append(item);
  });
}

function renderTestimonials() {
  const grid = document.querySelector("[data-testimonials]");

  config.content.testimonials.items.forEach((testimonial) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";

    const label = document.createElement("span");
    label.className = "testimonial-card__label";
    label.textContent = "Exemplo fictício";

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", "Avaliação ilustrativa: 5 de 5 estrelas");
    stars.textContent = "★★★★★";

    const quote = document.createElement("blockquote");
    quote.textContent = `“${testimonial.quote}”`;

    const author = document.createElement("div");
    author.className = "testimonial-card__author";
    const initials = document.createElement("span");
    initials.textContent = testimonial.initials;
    const authorDetails = document.createElement("div");
    const authorName = document.createElement("strong");
    authorName.textContent = testimonial.author;
    const authorNote = document.createElement("small");
    authorNote.textContent = "Personagem fictício";
    authorDetails.append(authorName);

    if (config.isDemo) {
      authorDetails.append(authorNote);
    }
    author.append(initials, authorDetails);

    if (config.isDemo) {
      card.append(label);
    }

    card.append(stars, quote, author);
    grid.append(card);
  });
}

function renderContactAndSocial() {
  const phoneLink = document.querySelector("[data-phone-link]");
  const phoneDigits = config.contact.phone.replace(/\D/g, "");

  if (!config.isDemo && phoneDigits) {
    phoneLink.href = `tel:${phoneDigits}`;
  } else {
    phoneLink.removeAttribute("href");
  }

  const socialContainer = document.querySelector("[data-social]");
  config.social.filter((network) => network.url).forEach((network) => {
    const link = document.createElement("a");
    link.href = network.url;
    link.textContent = network.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${network.name} da ${config.company.name} (abre em nova aba)`);
    socialContainer.append(link);
  });

  const whatsappNumber = config.contact.whatsapp.replace(/\D/g, "");
  const isPlaceholder = /^0+$/.test(whatsappNumber.slice(2)) || whatsappNumber.length < 12;

  if (!config.isDemo && !isPlaceholder) {
    whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(config.contact.whatsappMessage)}`;
    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";
  } else {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      contactNotice.textContent = config.isDemo
        ? "Demonstração: cadastre um WhatsApp real no config.js e desative o modo de demonstração para habilitar o contato."
        : "Cadastre um número de WhatsApp válido no config.js para habilitar este contato.";
    });
  }
}

function updateSeo() {
  document.title = config.seo.title;
  document.querySelector('meta[name="description"]').content = config.seo.description;
  document.querySelector('meta[property="og:title"]').content = config.seo.title;
  document.querySelector('meta[property="og:description"]').content = config.seo.description;
  document.querySelector('meta[property="og:site_name"]').content = config.company.name;

  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.company.name,
    description: config.company.description,
    telephone: config.contact.phone,
    address: config.contact.address,
    openingHours: config.contact.hours,
    sameAs: config.social.map((network) => network.url).filter(Boolean)
  });
  document.head.append(schema);
}

function menuIsOpen() {
  return menuButton.getAttribute("aria-expanded") === "true";
}

function closeMenu(restoreFocus = false) {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");

  if (mobileMenu.matches) {
    navigation.setAttribute("aria-hidden", "true");
    navigation.inert = true;
  }

  if (restoreFocus) {
    menuButton.focus();
  }
}

function openMenu() {
  navigation.classList.add("open");
  navigation.removeAttribute("aria-hidden");
  navigation.inert = false;
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fechar menu");
  document.body.classList.add("menu-open");
  navigation.querySelector("a").focus();
}

function syncMenuToViewport() {
  if (mobileMenu.matches) {
    closeMenu();
    return;
  }

  navigation.classList.remove("open");
  navigation.removeAttribute("aria-hidden");
  navigation.inert = false;
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

bindSimpleContent();
renderHighlights();
renderServices();
renderAbout();
renderTestimonials();
renderContactAndSocial();
updateSeo();

menuButton.addEventListener("click", () => {
  if (menuIsOpen()) {
    closeMenu(true);
  } else {
    openMenu();
  }
});

menuBackdrop.addEventListener("click", () => closeMenu(true));

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu(mobileMenu.matches));
});

document.addEventListener("keydown", (event) => {
  if (!menuIsOpen()) {
    return;
  }

  if (event.key === "Escape") {
    closeMenu(true);
    return;
  }

  if (event.key === "Tab") {
    const menuLinks = [...navigation.querySelectorAll("a")];
    const firstItem = menuButton;
    const lastItem = menuLinks.at(-1);

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
mobileMenu.addEventListener("change", syncMenuToViewport);

currentYear.textContent = new Date().getFullYear();
updateHeader();
syncMenuToViewport();
