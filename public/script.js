const loginForm = document.querySelector("#loginForm");
const message = document.querySelector("#message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = loginForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending demo event...";

  try {
    const response = await fetch("/api/training", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Intentionally send only a non-sensitive training event.
      body: JSON.stringify({ submitted: true })
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "The training event could not be sent.");
    }

    message.textContent = result.message;
    loginForm.reset();
  } catch (error) {
    message.textContent = error.message;
    message.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Log In";
  }
});
