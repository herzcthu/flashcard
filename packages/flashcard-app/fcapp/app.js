let vocab = [];
let currentIndex = -1;
let remainingIndices = [];
let currentLang = 'en'; // English is default

async function fetchVocab() {
  // For DigitalOcean Function, vocab is served at /vocab
  const url = '/vocab';
  const res = await fetch(url);
  vocab = await res.json();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getNextIndex() {
  if (remainingIndices.length === 0) {
    remainingIndices = shuffle([...Array(vocab.length).keys()]);
  }
  return remainingIndices.pop();
}

function showCard(idx) {
  const card = document.getElementById('flashcard');
  card.classList.remove('flipped');
  card.querySelector('.front').textContent = vocab[idx].word;
  document.getElementById('meaning-en').innerHTML = vocab[idx].meaning +
    (vocab[idx].examples ? '<ul class="examples">' + vocab[idx].examples.map(e => `<li>${e}</li>`).join('') + '</ul>' : '');
  document.getElementById('meaning-mm').textContent = vocab[idx].meaning_mm;
  document.getElementById('meaning-jp').textContent = vocab[idx].meaning_jp;
  // Hide all meanings
  document.getElementById('meaning-en').style.display = 'none';
  document.getElementById('meaning-mm').style.display = 'none';
  document.getElementById('meaning-jp').style.display = 'none';
  // Remove active from all lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  // Set active lang button
  document.getElementById('show' + currentLang.charAt(0).toUpperCase() + currentLang.slice(1) + 'Btn').classList.add('active');
  currentIndex = idx;
}

document.getElementById('flashcard').addEventListener('click', function() {
  if (currentLang) {
    this.classList.toggle('flipped');
    // Show only the selected language meaning
    document.getElementById('meaning-en').style.display = currentLang === 'en' && this.classList.contains('flipped') ? '' : 'none';
    document.getElementById('meaning-mm').style.display = currentLang === 'mm' && this.classList.contains('flipped') ? '' : 'none';
    document.getElementById('meaning-jp').style.display = currentLang === 'jp' && this.classList.contains('flipped') ? '' : 'none';
  }
});

document.getElementById('nextBtn').addEventListener('click', function() {
  showCard(getNextIndex());
});

document.getElementById('showEnBtn').addEventListener('click', function() {
  setLang('en');
});
document.getElementById('showMmBtn').addEventListener('click', function() {
  setLang('mm');
});
document.getElementById('showJpBtn').addEventListener('click', function() {
  setLang('jp');
});

function setLang(lang) {
  if (currentLang === lang) return; // already selected
  currentLang = lang;
  // Remove active from all lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('show' + lang.charAt(0).toUpperCase() + lang.slice(1) + 'Btn').classList.add('active');
  // Hide all meanings
  document.getElementById('meaning-en').style.display = 'none';
  document.getElementById('meaning-mm').style.display = 'none';
  document.getElementById('meaning-jp').style.display = 'none';
  // If card is flipped, show the new language
  if (document.getElementById('flashcard').classList.contains('flipped')) {
    document.getElementById('meaning-en').style.display = lang === 'en' ? '' : 'none';
    document.getElementById('meaning-mm').style.display = lang === 'mm' ? '' : 'none';
    document.getElementById('meaning-jp').style.display = lang === 'jp' ? '' : 'none';
  }
}

// Initialize app
window.addEventListener('DOMContentLoaded', async () => {
  await fetchVocab();
  currentLang = 'en'; // Ensure English is default on load
  showCard(getNextIndex());
  // Always show the front word on load
  document.querySelector('.front').style.display = '';
});
