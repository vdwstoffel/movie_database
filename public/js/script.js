"use strict";

// An overlay with the movie description when you hover over the poster

const description = document.querySelectorAll(".movie-description");
const moviePoster = document.querySelectorAll(".moviePoster");

for (let i = 0; i <= moviePoster.length - 1; i++) {
  moviePoster[i].addEventListener("mouseover", () => {
    description[i].classList.remove("hidden");
  });

  document.addEventListener("mouseout", () => {
    description[i].classList.add("hidden");
  });
}
