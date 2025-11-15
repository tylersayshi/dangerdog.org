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
