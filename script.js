const secretWords = ['apple', 'banana', 'grape', 'mango', 'peach', 'kiwi', 'orange'];
let secretWord = '';
let maxAttempts = 5;
let attemptsLeft = maxAttempts;
let gameOver = false;

function pickSecretWord() {
  secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];
  console.log('Secret word (for testing):', secretWord);
  document.getElementById('hint').textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;
}

function submitGuess() {
  if (gameOver) return;

  const input = document.getElementById('userGuess');
  let guess = input.value.trim().toLowerCase();

  if (!guess) {
    updateFeedback(`⚠️ Please enter a word! ${attemptsLeft} attempts left.`);
    return;
  }

  if (guess === secretWord) {
    updateFeedback("🎉 Congratulations! You guessed it!");
    endGame(true);
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      updateFeedback(`❌ Incorrect! ${attemptsLeft} attempts left.`);
    } else {
      updateFeedback(`💀 Game over! The word was '${secretWord}'.`);
      endGame(false);
    }
  }

  input.value = '';
  input.focus();
}

function updateFeedback(message) {
  document.getElementById('feedback').textContent = message;
}

function endGame(won) {
  gameOver = true;
  document.getElementById('restartBtn').style.display = 'block';
  document.body.style.background = won
    ? "linear-gradient(135deg, #85ffbd, #fffb7d)"
    : "linear-gradient(135deg, #ff6b6b, #f6416c)";
}

function restartGame() {
  attemptsLeft = maxAttempts;
  gameOver = false;
  pickSecretWord();
  updateFeedback('');
  document.getElementById('userGuess').value = '';
  document.getElementById('restartBtn').style.display = 'none';
  document.body.style.background = "linear-gradient(135deg, #db1608, #1cb75a)";
  document.getElementById('userGuess').focus();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    submitGuess();
  }
}

// Ensure secret word is picked when the game starts
pickSecretWord();
