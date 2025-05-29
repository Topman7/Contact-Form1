// Grap the form and all the inputs
let form = document.querySelector(".contactForm");
let firstNameInput = document.querySelector(".firstName");
let lastNameInput = document.querySelector(".lastName");
let emailInput = document.querySelector(".emailAddress");
let queryTypeInput = document.querySelectorAll(".query");
let messageInput = document.querySelector(".messageContent");
let consentInput = document.querySelector(".consent");
let submitButton = document.querySelector("button");

// Grap all error spans
let errFirstName = document.querySelector(".error-fn");
let errLastName = document.querySelector(".error-ln");
let errEmail = document.querySelector(".error-em");
let errQueryType = document.querySelector(".error-qt");
let errMessage = document.querySelector(".error-msg");
let errConsent = document.querySelector(".error-checkbox");

// Grap Success toaster
let SuccessToaster = document.querySelector(".success");

// Show /hide the toaster
let toggletoaster = (show) => {
  if (show) {
    SuccessToaster.classList.remove("hidden");
    setTimeout(() => {
      SuccessToaster.classList.add("hidden")
    },3000 );
  } else {
    SuccessToaster.classList.add("hidden");
  }
};

// Helper to show/hide error span
let showError = (errMsg, see, inputBorder) => {
  if (see) {
    errMsg.classList.remove("hidden");
    //set red border in error state
    inputBorder.style.borderColor = "var(--Red)";
  } else {
    errMsg.classList.add("hidden");
    // reset to default border without any error state
    inputBorder.style.borderColor = "var(--Grey-500-medium)";
  };
};

// Add change listener to radio for background highlight
queryTypeInput.forEach((eachRadio) => {
  eachRadio.addEventListener("change", () => {
    queryTypeInput.forEach((eachDiv) => {
      let wrapper = eachDiv.parentElement;
      if (eachDiv.checked) {
        wrapper.style.backgroundColor = "var(--Green-200-lighter)";
      } else {
        wrapper.style.backgroundColor = "";
      }
    });
    // hide error once a choice is made
    errQueryType.classList.add("hidden"); 
  });
});

// Event Listner
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stops the form from reloading/refreshing the page after submiting

  let isValid = true;

  // Validating FisrtName
  if (firstNameInput.value === "") {
    showError(errFirstName, true, firstNameInput);
    isValid = false;
  } else {
    showError(errFirstName, false, firstNameInput);
  }

  // Validating LastName
  if (lastNameInput.value === "") {
    showError(errLastName, true, lastNameInput);
    isValid = false;
  } else {
    showError(errLastName, false, lastNameInput);
  }

  // Validating Email
  if (emailInput.value === "") {
    showError(errEmail, true, emailInput);
    isValid = false;
  } else {
    showError(errEmail, false, emailInput);
  }

  // Grap the radio input that as been checked
  // let checked = document.querySelector("input.query:checked");

  //   Validate Query Type (at least one radio checked befor submission)
  // let queryTypeValue = checked ? checked.value : "";

  //   Show or hide the error message
  // if (!queryTypeValue) {
    // showError(errQueryType, true);
    // isValid = false;
  // } else {
    // showError(errQueryType, false);
  // }

  let checkedRadio = document.querySelector("input.query:checked");
  if (!checkedRadio) {
    errQueryType.classList.remove("hidden");
    isValid = false;
  }

  // Validate Message
  if (messageInput.value === "") {
    showError(errMessage, true, messageInput);
    isValid = false;
  } else {
    showError(errMessage, false, messageInput);
  }

  // Validate Consent
  if (!consentInput.checked) {
    showError(errConsent, true, consentInput);
    isValid = false;
  } else {
    showError(errConsent, false, consentInput);
  }

  // If all fields are valid, log the data in an object
  if (isValid) {
    let formData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      queryType: checkedRadio.value,
      message: messageInput.value,
      consent: consentInput.checked,
    };

    console.log("Form Submission", formData);

    toggletoaster(true);

    form.reset();

    queryTypeInput.forEach((eachRadio) => {
      eachRadio.parentElement.style.backgroundColor = "";
    });
  };
});