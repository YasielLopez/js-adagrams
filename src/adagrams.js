export const drawLetters = () => {
  const letterPool = [];
  const letterDistribution = {
    'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
    'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
    'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
  };

  for (const letter in letterDistribution) {
    for (let i = 0; i < letterDistribution[letter]; i++) {
      letterPool.push(letter);
    }
  }

  const drawnLetters = [];
  const poolCopy = [...letterPool]; 

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    drawnLetters.push(poolCopy[randomIndex]);
    poolCopy.splice(randomIndex, 1);
  }

  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const word = input.toUpperCase();
  
  const availableLetters = {};
  for (const letter of lettersInHand) {
    availableLetters[letter] = (availableLetters[letter] || 0) + 1;
  }

  for (const letter of word) {
    if (!availableLetters[letter] || availableLetters[letter] === 0) {
      return false;
    }
    availableLetters[letter]--;
  }

  return true;
};

export const scoreWord = (word) => {
  if (!word || word.length === 0) {
    return 0;
  }

  const upperWord = word.toUpperCase();
  
  const letterScores = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };

  let score = 0;
  for (const letter of upperWord) {
    score += letterScores[letter] || 0;
  }

  if (upperWord.length >= 7 && upperWord.length <= 10) {
    score += 8;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  let bestWord = null;
  let bestScore = 0;

  for (const word of words) {
    const currentScore = scoreWord(word);
    
    if (currentScore > bestScore) {
      bestWord = word;
      bestScore = currentScore;
    }
    else if (currentScore === bestScore && bestWord !== null) {
      if (word.length === 10 && bestWord.length !== 10) {
        bestWord = word;
      }
      else if (word.length !== 10 && bestWord.length !== 10 && word.length < bestWord.length) {
        bestWord = word;
      }
    }
  }

  return {
    word: bestWord,
    score: bestScore
  };
};
