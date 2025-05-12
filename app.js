const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("contactModal");

openBtn?.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn?.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu?.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});

// === ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ ===
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse) {
    Swal.fire({
      title: "reCAPTCHA Required",
      text: "Please confirm you are not a robot.",
      icon: "warning",
      confirmButtonText: "OK"
    });
    return;
  }

  // Escape HTML characters to prevent XSS
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Basic email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Get and sanitize inputs
  const rawName = document.getElementById("name").value.trim();
  const rawEmail = document.getElementById("email").value.trim();
  const rawMessage = document.getElementById("message").value.trim();

  const name = escapeHTML(rawName);
  const email = escapeHTML(rawEmail);
  const message = escapeHTML(rawMessage).replace(/\n/g, "<br>");

  // Validation
  if (!name || !email || !message) {
    Swal.fire({
      title: "Missing Info",
      text: "Please fill in all fields.",
      icon: "warning",
      confirmButtonText: "OK"
    });
    return;
  }

  if (!isValidEmail(rawEmail)) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address.",
      icon: "warning",
      confirmButtonText: "OK"
    });
    return;
  }

  // Email body
  const body = `Full Name: ${name}<br>Email: ${email}<br>Message: ${message}`;

  // Send email
  Email.send({
    SecureToken: "",
    To: 'manosgrammos9@gmail.com',
    From: "manosgrammos9@gmail.com",
    Subject: "New Contact from Hotelier With An Accent",
    Body: body
  }).then(msg => {
    if (msg === "OK") {
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });
      document.getElementById("contactForm").reset();
      grecaptcha.reset();
    } else {
      Swal.fire({
        title: "Error!",
        text: "There was a problem sending your message. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  });
});
