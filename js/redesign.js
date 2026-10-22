(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const emailTo = "studio.hashinf.lk@gmail.com";
  let lastFocused = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const focusTarget = $("input, select, textarea, button", modal);
    if (focusTarget) focusTarget.focus();
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (!$(".site-modal.is-open")) document.body.classList.remove("modal-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }
  $$("[data-open-enquiry]").forEach(button => button.addEventListener("click", () => {
    openModal("enquiry-modal");
    const division = button.getAttribute("data-division");
    const select = $('#enquiry-form select[name="division"]');
    if (division && select) select.value = division;
  }));
  $$("[data-open-feedback]").forEach(button => button.addEventListener("click", () => openModal("feedback-modal")));
  $$("[data-open-search]").forEach(button => button.addEventListener("click", () => openModal("search-modal")));
  $$(".site-modal").forEach(modal => $$("[data-close-modal]", modal).forEach(button => button.addEventListener("click", () => closeModal(modal))));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal($(".site-modal.is-open"));
  });

  function mailto(subject, body) {
    window.location.href = "mailto:" + emailTo + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  const enquiryForm = $("#enquiry-form");
  if (enquiryForm) enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const body = [
      "Studio HASH iNf Lk™ — Project Enquiry", "",
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Division: " + data.get("division"), "",
      "Project details:", data.get("details")
    ].join("\n");
    mailto("Project enquiry — " + data.get("division"), body);
  });
  const feedbackForm = $("#feedback-form");
  if (feedbackForm) feedbackForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(feedbackForm);
    const body = [
      "Studio HASH iNf Lk™ — Feedback for review", "",
      "Name / display name: " + data.get("name"),
      "Service: " + data.get("service"),
      "Rating: " + data.get("rating") + " / 5", "",
      "Feedback:", data.get("comment"), "",
      "Please review this submission before publishing."
    ].join("\n");
    mailto("Feedback submission — " + data.get("service"), body);
  });

  const searchInput = $("#site-search-input");
  const searchResults = $("#search-results");
  const searchable = [
    {title:"iNfpirex — Graphic Design", description:"Visual identities, branding and digital artwork.", href:"pages/graphics.html", terms:"graphics design artwork logo branding poster"},
    {title:"iNfyzora — Software & Technology", description:"Software, digital tools and technology projects.", href:"pages/software.html", terms:"software technology apps web development"},
    {title:"iNfysona — Music & Audio", description:"Music creation, audio and sound projects.", href:"pages/music.html", terms:"music audio mixing mixdown sound dubbing"},
    {title:"iNframex — Photography & Videography", description:"Photography and visual storytelling. Currently in development.", href:"#brands", terms:"photography video videography portraits events"},
    {title:"About the Studio", description:"Learn about the studio and its creative direction.", href:"#about", terms:"about studio mission"},
    {title:"The Studio Approach", description:"Explore the creative disciplines and collaborative approach.", href:"#team", terms:"team people process collaborators"},
    {title:"Reviews & Feedback", description:"Share feedback or read verified client experiences as they become available.", href:"#reviews", terms:"reviews feedback rating"},
    {title:"Contact", description:"Email, WhatsApp and phone contact details.", href:"#contact", terms:"contact email whatsapp phone"},
    {title:"Frequently Asked Questions", description:"Answers about services, availability and project enquiries.", href:"#faq", terms:"faq questions answers payment"}
  ];
  function renderSearch(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = "<p>Search services, pages and topics across the studio.</p>";
      return;
    }
    const matches = searchable.filter(item => (item.title + " " + item.description + " " + item.terms).toLowerCase().includes(q));
    searchResults.replaceChildren();
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.textContent = "No matching pages yet. Try a service name or contact the studio.";
      searchResults.appendChild(empty);
      return;
    }
    matches.forEach(item => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = item.href;
      const copy = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = item.title;
      const desc = document.createElement("small");
      desc.textContent = item.description;
      copy.append(title, desc);
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      link.append(copy, arrow);
      link.addEventListener("click", () => closeModal($("#search-modal")));
      searchResults.appendChild(link);
    });
  }
  if (searchInput) searchInput.addEventListener("input", () => renderSearch(searchInput.value));

  const navToggle = $(".menu-toggle");
  const nav = $(".main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "×" : "☰";
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    }));
  }
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();