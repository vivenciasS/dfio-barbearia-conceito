const config = window.SITE_CONFIG;

if (!config) {
  throw new Error("SITE_CONFIG nao foi carregado. Verifique a ordem dos scripts.");
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const menuBackdrop = document.querySelector(".nav-backdrop");
const header = document.querySelector(".header");
const mobileMenu = window.matchMedia("(max-width: 820px)");

function getConfigValue(path) {
  return path.split(".").reduce((value, key) => value?.[key], config);
}

function bindContent() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const value = getConfigValue(element.dataset.config);
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll(".js-company-logo").forEach((logo) => {
    logo.setAttribute("aria-label", `${config.company.name} - início`);
  });

  const whatsappUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(config.contact.whatsappMessage)}`;
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Agendar horário pelo WhatsApp (abre em nova aba)");
  });

  const mapLink = document.querySelector("[data-map-link]");
  mapLink.href = config.contact.mapUrl;
  mapLink.setAttribute("aria-label", "Ver endereço no Google Maps (abre em nova aba)");
}

function renderServices() {
  const grid = document.querySelector("[data-services]");
  config.services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card";

    const number = document.createElement("span");
    number.className = "service-card__number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = service.number;

    const title = document.createElement("h3");
    title.textContent = service.name;

    const line = document.createElement("span");
    line.className = "service-card__line";
    line.setAttribute("aria-hidden", "true");

    card.append(number, title, line);
    grid.append(card);
  });
}

function renderHours() {
  const list = document.querySelector("[data-hours]");
  config.contact.hours.forEach(({ days, time }) => {
    const day = document.createElement("dt");
    day.textContent = days;
    const hours = document.createElement("dd");
    hours.textContent = time;
    list.append(day, hours);
  });
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
    "@type": "BarberShop",
    name: config.company.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Piauí, 1110 - Centro",
      addressLocality: "Gurupi",
      addressRegion: "TO",
      postalCode: "77410-030",
      addressCountry: "BR"
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "19:00" }
    ]
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
  if (restoreFocus) menuButton.focus();
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

function syncMenu() {
  if (mobileMenu.matches) return closeMenu();
  navigation.classList.remove("open");
  navigation.removeAttribute("aria-hidden");
  navigation.inert = false;
  document.body.classList.remove("menu-open");
}

bindContent();
renderServices();
renderHours();
updateSeo();
document.querySelector("#current-year").textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => menuIsOpen() ? closeMenu(true) : openMenu());
menuBackdrop.addEventListener("click", () => closeMenu(true));
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuIsOpen()) closeMenu(true);
});
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 16), { passive: true });
mobileMenu.addEventListener("change", syncMenu);
syncMenu();
