"use strict";

// didn't test rate limit exceeded error

const btn = document.querySelector(".generate");
const quotesContainer = document.querySelector(".quote");
let check = false;
let thereIsError = false;

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    if (thereIsError) {
      document.querySelector(".error").remove();
      check = false;
      thereIsError = false;
    }
    const res = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=leadership",
      {
        method: "GET",
        url: "https://api.api-ninjas.com/v1/quotes?category=leadership",
        headers: { "X-Api-Key": "ye4QNZtsImyhfCBp8pHVPg==8UG9Xngv6LCgi3DF" },
        contentType: "application/json",
        success: function (result) {
          console.log(result);
        },
        error: function ajaxError(jqXHR) {
          console.error("Error: ", jqXHR.responseText);
        },
      }
    );
  } catch (err) {}
});
