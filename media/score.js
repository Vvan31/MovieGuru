// need to assign score dynamically
const score = localStorage.getItem('score')
const amount = localStorage.getItem('amount')
function showEverything() {
  document.querySelector('#score span + span').innerHTML = amount
  setTimeout(() => {
    makeChart()
    countScore()
    showCongratsText(score)
  }, 1000)
}
window.addEventListener('DOMContentLoaded', showEverything)

function makeChart() {
  const ctx = document.getElementById('myChart')
  const config = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [score, amount - score],
          backgroundColor: ['#28AFB0', 'transparent'],
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: false,
        },
      },
    },
  }

  new Chart(ctx, config)
}

function countScore() {
  let count = 0
  setInterval(function () {
    if (count <= score) {
      showScore(count)
      count += 1
    }
  }, 30)
}
function showScore(count) {
  const scoreEl = document.querySelector('#score span')
  scoreEl.textContent = count
}

function showCongratsText(score) {
  const congratsEl = document.getElementById('congrats')
  const CONGRATS_TEXTS = [
    'Perfect🥳🎉',
    'Great Job👍',
    'Good Job😁',
    'Not Bad😏',
    'Not Good😱',
  ]

  console.log((score / amount) * 100)

  if (score === amount) {
    congratsEl.textContent = CONGRATS_TEXTS[0]
  } else if ((score / amount) * 100 >= 75) {
    congratsEl.textContent = CONGRATS_TEXTS[1]
  } else if ((score / amount) * 100 >= 50) {
    congratsEl.textContent = CONGRATS_TEXTS[2]
  } else if ((score / amount) * 100 >= 20) {
    congratsEl.textContent = CONGRATS_TEXTS[3]
  } else {
    congratsEl.textContent = CONGRATS_TEXTS[4]
  }
}

// ===================================
// GSAP
// ===================================
const Timeline = gsap.timeline({
  defaults: {
    alpha: 0,
    duration: 0.8,
    ease: 'InOut',
  },
})

Timeline.from('.score-content', {
  scale: 0,
}).from('.congrats', {
  delay: 1.2,
  y: 10,
})
