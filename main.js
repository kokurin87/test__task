document
  .querySelector(".header__menuButton")
  .addEventListener("click", function () {
    document.querySelector(".main__list").classList.add("active");
    document.querySelector(".main__overlay").classList.add("active");
    document.body.classList.add("disable-scroll");
  });

document.querySelector(".main__overlay").addEventListener("click", function () {
  document.querySelector(".main__list").classList.remove("active");
  document.querySelector(".main__overlay").classList.remove("active");
  document.body.classList.remove("disable-scroll");
});

document
  .querySelector(".footer__formButton")
  .addEventListener("click", function () {
    document.querySelector(".form").classList.add("activeForm");
    document.querySelector(".main__overlay").classList.add("activeForm");
    document.body.classList.add("disable-scroll");
  });

document.querySelector(".main__overlay").addEventListener("click", function () {
  document.querySelector(".form").classList.remove("activeForm");
  document.querySelector(".main__overlay").classList.remove("activeForm");
  document.body.classList.remove("disable-scroll");
});

let form = document.querySelector(".form"),
  formInputs = document.querySelectorAll(".form__input"),
  inputEmail = document.querySelector(".form__input-email"),
  inputPhone = document.querySelector(".form__input-phone"),
  inputAge = document.querySelector(".form__input-age");

function validateEmail(email) {
  let req =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return req.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  let req = /^((7|8|\+7)[\- ]?)?(\(?\d{3,5}\)?[\- ]?)?[\d\- ]{5,15}$/;
  return req.test(String(phone));
}

function validateAge(age) {
  if (age < 18) {
    return false;
  } else if (age > 65) {
    return false;
  } else return true;
}

let sexFormInp = document.getElementsByName("sex");
for (let i = 0; i < sexFormInp.length; i++) {
  sexFormInp[i].onchange = showAgeInput;
}

function showAgeInput() {
  if (this.value == 1) {
    document
      .querySelector(".form__item-age")
      .classList.remove("form__item-hide");
    return;
  } else {
    document.querySelector(".form__item-age").classList.add("form__item-hide");
  }
}

form.onsubmit = function () {
  let emailVal = inputEmail.value,
    phoneVal = inputPhone.value,
    ageVal = inputAge.value,
    emptyInputs = Array.from(formInputs).filter((input) => input.value === "");

  formInputs.forEach(function (input) {
    if (input.value === "") {
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (emptyInputs.length !== 0) {
    console.log("inputs not filled");
    return false;
  }

  if (!validateEmail(emailVal)) {
    console.log("email not valid");
    inputEmail.classList.add("error");
    return false;
  } else {
    inputEmail.classList.remove("error");
  }

  if (!validatePhone(phoneVal)) {
    console.log("phone not valid");
    inputPhone.classList.add("error");
    return false;
  } else {
    inputPhone.classList.remove("error");
  }

  if (!validateAge(ageVal)) {
    console.log("age not valid");
    inputAge.classList.add("error");
    return false;
  } else {
    inputAge.classList.remove("error");
  }

  let formData = {
    phone: document.querySelector('input[name="phone"]').value,
    email: document.querySelector('input[name="email"]').value,
    sex: document.querySelector('input[name="sex"]').value,
    age: document.querySelector('input[name="age"]').value,
  };

  var request = new XMLHttpRequest();

  request.addEventListener("load", function () {
    console.log(request.response);
    alert("Ваша заявка успешно отправлена!");
    form.innerHTML = "<h2>Спасибо за заявку!</h2>";
  });

  request.open("POST", "/send.php", true);
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.send(
    "phone=" +
      encodeURIComponent(formData.phone) +
      "&email=" +
      encodeURIComponent(formData.email) +
      "sex=" +
      encodeURIComponent(formData.sex) +
      "age=" +
      encodeURIComponent(formData.age)
  );
};
