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
    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("API rate limit exceeded! Retry after 1 minute.");
      } else {
        throw new Error(res.status);
      }
    }
    const [data] = await res.json();
    if (!check) {
      const html = `<div class="quotes">
    <h1><q class="actualQuote">${data.quote}</q></h1>
  </div>
  <p class="author">- ${data.author}</p>`;
      quotesContainer.insertAdjacentHTML("beforeend", html);
      check = true;
    } else {
      document.querySelector(".actualQuote").textContent = data.quote;
      document.querySelector(".author").textContent = `- ${data.author}`;
    }
  } catch (err) {
    if (check) {
      document.querySelector(".quotes").remove();
      document.querySelector(".author").remove();
    }
    const html = `
  <div class="error">
    <h1> There was an error in getting quote! Please check your internet connection. (Error: ${err.message})</h1>
  </div>
  `;
    quotesContainer.insertAdjacentHTML("beforeend", html);
    thereIsError = true;
  }
});
