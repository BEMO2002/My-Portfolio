// filter projects
document.addEventListener("DOMContentLoaded", function () {
  const mixer = mixitup(".mix-container");

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const activeButton = document.querySelector(".filter-btn.active");
      if (activeButton) activeButton.classList.remove("active");
      this.classList.add("active");
    });
  });
});

//change active buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.classList.remove("bg-assent-secondary", "text-[#fff]");
        btn.classList.add(
          "bg-white",
          "text-assent-secondary",
          "border",
          "border-[#ccc]"
        );
      });

      this.classList.remove("bg-white", "text-assent-secondary");
      this.classList.add("bg-assent-secondary", "text-[#fff]");
    });
  });
});

// up and down button
let btn = document.querySelector(".top");
window.onscroll = function () {
  if (window.scrollY >= 600) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

btn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

// notification message
setTimeout(function () {
  var notification = document.getElementById("Notification");
  notification.classList.add("show");
}, 1000);

function closeNotification() {
  var notification = document.getElementById("Notification");
  notification.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitButton = document.getElementById("submitButton");
  const formStatus = document.getElementById("formStatus");
  const messageCount = document.getElementById("messageCount");

  // Character counter for message
  messageInput.addEventListener("input", function () {
    const count = this.value.length;
    messageCount.textContent = count;
    if (count > 20) {
      this.value = this.value.substring(0, 20);
      messageCount.textContent = 20;
    }

    if (this.value.length < 10) {
      showError(this, "Message must be at least 10 characters long");
    } else if (this.value.length > 20) {
      showError(this, "Message must be less than 20 characters");
    } else {
      hideError(this);
    }
  });

  // Function to show error
  function showError(element, message) {
    const errorSpan = document.getElementById(element.id + "Error");
    errorSpan.textContent = message;
    errorSpan.classList.remove("hidden");
    element.classList.add("border-red-500", "bg-red-50");
    element.classList.remove("border-[#ccc]");
  }

  // Function to hide error
  function hideError(element) {
    const errorSpan = document.getElementById(element.id + "Error");
    errorSpan.classList.add("hidden");
    element.classList.remove("border-red-500", "bg-red-50");
    element.classList.add("border-[#ccc]");
  }

  nameInput.addEventListener("input", function () {
    if (this.value.length < 2) {
      showError(this, "Name must be at least 2 characters long");
    } else if (this.value.length > 50) {
      showError(this, "Name must be less than 50 characters");
    } else {
      hideError(this);
    }
  });

  emailInput.addEventListener("input", function () {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.value)) {
      showError(this, "Please enter a valid email address");
    } else {
      hideError(this);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset previous errors
    hideError(nameInput);
    hideError(emailInput);
    hideError(messageInput);

    // Validate all fields
    let isValid = true;

    if (nameInput.value.length < 2 || nameInput.value.length > 50) {
      showError(nameInput, "Name must be between 2 and 50 characters");
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    if (messageInput.value.length < 10 || messageInput.value.length > 20) {
      showError(messageInput, "Message must be between 10 and 20 characters");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(this);

    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        formStatus.classList.remove("hidden", "bg-red-100", "bg-green-100");
        if (data.status === "success") {
          formStatus.classList.add("bg-green-100", "text-green-700");
          formStatus.textContent = "Message sent successfully!";
          form.reset();
          messageCount.textContent = "0";
        } else {
          formStatus.classList.add("bg-red-100", "text-red-700");
          formStatus.textContent =
            data.message || "Error sending message. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        formStatus.classList.remove("hidden", "bg-green-100");
        formStatus.classList.add("bg-red-100", "text-red-700");
        formStatus.textContent = "Error sending message. Please try again.";
      })
      .finally(() => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        // Scroll status into view
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const buttons = document.querySelectorAll(".filter-btn");

//   buttons.forEach(button => {
//       button.addEventListener("click", function () {
//           if (this.classList.contains("bg-assent-secondary")) {

//               this.classList.remove("bg-assent-secondary", "text-[#fff]");
//               this.classList.add("bg-white", "text-assent-secondary");
//           } else {

//               this.classList.remove("bg-white", "text-assent-secondary");
//               this.classList.add("bg-assent-secondary", "text-white");
//           }
//       });
//   });
// });

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("data").style.display = "block";
  }, 3000);
});
