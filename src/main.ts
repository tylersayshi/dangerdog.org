const fetchSignatureCount = async () => {
  const countElement = document.querySelector("#signature-count") as HTMLParagraphElement;
  if (!countElement) return;

  try {
    // Replace with your actual Val Town endpoint URL after deployment
    const response = await fetch("YOUR_VAL_TOWN_ENDPOINT_URL_HERE");

    if (response.ok) {
      const data = await response.json();
      const count = data.count || 0;
      countElement.textContent = `${count.toLocaleString()} ${count === 1 ? 'signature' : 'signatures'}`;
    } else {
      countElement.textContent = "";
    }
  } catch (error) {
    console.error("Error fetching signature count:", error);
    countElement.textContent = "";
  }
};

const addFormListener = () => {
  const form = document.querySelector("#newsletter-form") as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("#bd-name") as HTMLInputElement;
    const emailInput = document.querySelector("#bd-email") as HTMLInputElement;
    const submitButton = form.querySelector(
      'input[type="submit"]'
    ) as HTMLInputElement;

    if (!nameInput || !emailInput || !submitButton) return;

    const formData = new FormData();
    formData.append("email", emailInput.value);
    formData.append("metadata__name", nameInput.value);

    submitButton.disabled = true;
    submitButton.value = "Signing...";

    try {
      const response = await fetch(
        "https://buttondown.com/api/emails/embed-subscribe/dangerdog.org",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        submitButton.value = "Signed!";
        form.reset();
        // Refresh the signature count after successful sign
        fetchSignatureCount();
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.value = "Sign the Letter";
        }, 3000);
      } else {
        submitButton.value = "Error - Try again";
        submitButton.disabled = false;
      }
    } catch (error) {
      submitButton.value = "Error - Try again";
      submitButton.disabled = false;
    }
  });
};

addFormListener();
fetchSignatureCount();
