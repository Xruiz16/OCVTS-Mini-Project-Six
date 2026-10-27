const quizForm = document.querySelector("#quiz-form");
const questionCards = [...document.querySelectorAll(".question-card")];
const progressLabel = document.querySelector("#progress-label");
const results = document.querySelector("#results");
const scoreHeading = document.querySelector("#score-heading");
const scoreMessage = document.querySelector("#score-message");
const resetButton = document.querySelector("#reset-button");

quizForm.addEventListener("change", (event) => {
  if (event.target.matches('input[type="radio"]')) {
    const answered = questionCards.filter((card) =>
      card.querySelector('input[type="radio"]:checked')
    ).length;
    progressLabel.innerHTML = `${answered} <span>/ ${questionCards.length} answered</span>`;
  }
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;

  questionCards.forEach((card) => {
    const selected = card.querySelector('input[type="radio"]:checked');
    const feedback = card.querySelector(".answer-feedback");
    const isCorrect = selected && selected.value === card.dataset.answer;

    card.classList.remove("correct", "incorrect");
    if (isCorrect) {
      score += 1;
      card.classList.add("correct");
      feedback.textContent = "Correct!";
    } else {
      card.classList.add("incorrect");
      const correctOption = card.querySelector(`input[value="${card.dataset.answer}"]`);
      const correctAnswer = correctOption.closest("label").querySelector("span:last-child").textContent;
      feedback.textContent = selected
        ? `Not quite. The correct answer is ${correctAnswer}.`
        : `Unanswered. The correct answer is ${correctAnswer}.`;
    }

    card.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.disabled = true;
    });
  });

  const percentage = Math.round((score / questionCards.length) * 100);
  scoreHeading.textContent = `You scored ${score} out of ${questionCards.length}!`;
  if (score === questionCards.length) {
    scoreMessage.textContent = `Perfect score — ${percentage}%. You're a true Soul Reaper!`;
  } else if (score >= 3) {
    scoreMessage.textContent = `Final Score: ${percentage}%. Great job, keep up your training!`;
  } else {
    scoreMessage.textContent = `Final Score: ${percentage}%. There's more to discover in the Soul Society!`;
  }
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

resetButton.addEventListener("click", () => {
  quizForm.reset();
  questionCards.forEach((card) => {
    card.classList.remove("correct", "incorrect");
    card.querySelector(".answer-feedback").textContent = "";
    card.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.disabled = false;
    });
  });
  progressLabel.innerHTML = `0 <span>/ ${questionCards.length} answered</span>`;
  results.hidden = true;
});