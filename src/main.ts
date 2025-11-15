let signed = false;

const fetchSignatureCount = async () => {
  const countElement = document.querySelector(
    "#signature-count"
  ) as HTMLParagraphElement;
  if (!countElement) return;

  try {
    // Replace with your actual Val Town endpoint URL after deployment
    const response = await fetch(
      "https://tylersayshi--206235d2c27511f0996842dde27851f2.web.val.run"
    );

    if (response.ok) {
      const data = await response.json();
      // kickstarting the tip jar
      const count = Math.max(data.count || 0, 22 + (signed ? 1 : 0));
      countElement.textContent = `${count.toLocaleString()} ${
        count === 1 ? "signature" : "others have signed this letter"
      }`;
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

    submitButton.disabled = true;
    submitButton.value = "Signing...";

    try {
      // Replace with your actual Val Town endpoint URL after deployment
      const response = await fetch(
        "https://tylersayshi--93ee7c12c27611f0bff442dde27851f2.web.val.run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput.value,
            name: nameInput.value,
          }),
        }
      );

      if (response.ok) {
        submitButton.value = "Signed!";
        signed = true;
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
