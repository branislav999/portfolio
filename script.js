// Initialize EmailJS
(function () {
  emailjs.init("zB1RBM7_6bFgBO5At");
})();

function toggleExperience(button) {
  button.classList.toggle("expanded");
  const experienceItem = button.closest(".experience-item");
  const description = experienceItem.querySelector(".experience-description");
  description.classList.toggle("expanded");
}

// Tech stack infinite scroll
document.addEventListener("DOMContentLoaded", function () {
  const techScroll = document.querySelector(".tech-scroll");
  if (
    techScroll &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const scrollerContent = Array.from(techScroll.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      techScroll.appendChild(duplicatedItem);
    });
  }
});

// Projects carousel
let currentProjectIndex = 0;

function scrollProjects(direction) {
  const grid = document.getElementById("projectsGrid");
  const cards = grid.querySelectorAll(".project-card");
  const cardWidth = cards[0].offsetWidth + 10;

  if (direction === "next" && currentProjectIndex < cards.length - 2) {
    currentProjectIndex += 2;
  } else if (direction === "prev" && currentProjectIndex > 0) {
    currentProjectIndex -= 2;
  }

  if (currentProjectIndex > cards.length - 2) {
    currentProjectIndex = cards.length - 2;
  }
  if (currentProjectIndex < 0) {
    currentProjectIndex = 0;
  }

  const peekOffset = 45;
  let scrollAmount;

  if (currentProjectIndex === 0) {
    scrollAmount = 0;
  } else {
    scrollAmount = currentProjectIndex * cardWidth - peekOffset;
  }

  grid.style.transform = `translateX(-${scrollAmount}px)`;
  updateArrows(cards.length);
}

function updateArrows(totalCards) {
  const prevBtn = document.getElementById("prevProject");
  const nextBtn = document.getElementById("nextProject");

  if (currentProjectIndex === 0) {
    prevBtn.classList.remove("visible");
    nextBtn.classList.add("visible");
  } else if (currentProjectIndex >= totalCards - 2) {
    prevBtn.classList.add("visible");
    nextBtn.classList.remove("visible");
  } else {
    prevBtn.classList.add("visible");
    nextBtn.classList.add("visible");
  }

  prevBtn.classList.toggle("disabled", currentProjectIndex === 0);
  nextBtn.classList.toggle("disabled", currentProjectIndex >= totalCards - 2);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("projectsGrid");
  if (grid) {
    const totalCards = grid.querySelectorAll(".project-card").length;
    updateArrows(totalCards);
  }
});

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  emailjs
    .sendForm("service_g91ru5a", "template_cg6uiq9", this)
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Thank you for your message! I will get back to you soon.");
        document.getElementById("contactForm").reset();
      },
      function (error) {
        console.log("FAILED...", error);
        alert(
          "Sorry, something went wrong. Please try emailing me directly at bbogosavac1999@gmail.com",
        );
      },
    )
    .finally(function () {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});
