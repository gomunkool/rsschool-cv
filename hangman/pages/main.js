export class Main {

  constructor(app) {
    this.app = app;
  }

  init() {
    const apiUrl = 'https://the-trivia-api.com/v2/questions'

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const letterCollection = document.querySelectorAll('.keyboard__letter')
        const questionCount = document.querySelector('.question')
        const question = data[0].question.text
        let wordCount;
        let word = data[0].correctAnswer
        const wordArr = word.toUpperCase().split('')
        const guess = []
        const tryCount = document.querySelector('.try')
        let wrongTry = 0
        let correctTry = wordArr.filter(char => char !== ' ').length
        const humanPartsCollection = document.querySelectorAll('.human__img')
        const wordCountStart = document.querySelector('.word-count')

        function displayWordAnswerStartGame(word) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] === ' ') {
              const childDiv = document.createElement('div')
              childDiv.className = 'word-letter_spase';
              childDiv.textContent = ``;
              wordCountStart.appendChild(childDiv);
            } else {
              const childDiv = document.createElement('div')
              childDiv.className = 'word-letter';
              childDiv.textContent = '_'
              wordCountStart.appendChild(childDiv);
            }
          }
          wordCount = document.querySelectorAll('.word-letter')
        }

        displayWordAnswerStartGame(wordArr)

        questionCount.innerHTML = question

        letterCollection.forEach((letter) => {
          letter.addEventListener('click', (e) => {
            guess.push(e.target.innerHTML)
            guessLetter(e.target.innerHTML)
          })
        })

        document.addEventListener('keydown', (e) => {
          if (!guess.includes(e.key.toUpperCase())) {
            guess.push(e.key.toUpperCase())
            guessLetter(e.key.toUpperCase())
          }
        });

        function guessLetter(letter) {
          letterCollection.forEach((el) => {
            if (guess.includes(el.innerHTML)) {
              el.classList.add('keyboard__letter_block')
            }
          })
          displayLetter(letter)
        }

        function displayLetter(letter) {
          const newWordArray = wordArr.filter(char => char !== ' ')
          const indexLetter = []
          for (let i = 0; i < newWordArray.length; i++) {
            if (newWordArray[i] === letter) {
              indexLetter.push(i)
            }
          }
          if (indexLetter.length > 0) {
            indexLetter.forEach((index) => {
              wordCount[index].innerHTML = letter
              correctTry--
            })
          } else {
            wrongTry++
            tryCount.innerHTML = `${wrongTry}/6`
            displayHuman()
            if (wrongTry >= 6) {
              openModalWindow('LOOSE')
            }
          }
          if (correctTry === 0) {
            openModalWindow("WIN")
          }
        }

        function displayHuman() {
          for (let i = wrongTry - 1; i >= 0; i--) {
            humanPartsCollection[i].classList.remove('human__img_disabled')
          }
        }

        const openModalWindow = (res) => {
          const modalWindowCount = document.querySelector('.modal-window-count')
          const modalWindowResult = document.querySelector('.modal-window__result')
          const modalWindowAnswer = document.querySelector('.modal-window__answer')
          const modalWindowTryAgain = document.querySelector('.modal-window__button-try')
          modalWindowCount.classList.add('modal-window-count_active')
          modalWindowResult.innerHTML = res
          res === "WIN" ? modalWindowResult.style.color = '#008080' : modalWindowResult.style.color = '#800000'
          modalWindowAnswer.innerHTML = word

          modalWindowTryAgain.addEventListener('click', () => {
            modalWindowCount.classList.remove('modal-window-count_active')
            wrongTry = 0
            word = ''
            this.delete()
            this.render()
          })
        }
      })
      .catch(error => {
        console.error('Something with the API, please contact me in Discord.', error);
      });
  }

  render() {
    this.app.node.innerHTML = `
        <div class="count">
    <div class="content">
        <div class="content__left">
            <div class="title">Hangman game</div>
            <div class="hanging-count">
                <div class="human-count">
                    <div class="human__head">
                        <img class="human__img human__img_disabled" src="images/head.png" alt="head">
                    </div>
                    <div class="human-center-count">
                         <div class="human__body">
                            <img class="human__img human__img_disabled" src="images/body.png" alt="body">
                        </div>
                        <div class="human__hand-left">
                            <img class="human__img human__img_disabled" src="images/hand-one.png" alt="hand">
                        </div>
                        <div class="human__hand-right">
                            <img class="human__img human__img_disabled" src="images/hand-two.png" alt="hand">
                        </div>
                    </div>
                    <div class="human-bottom-count">
                        <div class="human__leg-left">
                            <img class="human__img human__img_disabled" src="images/leg-one.png" alt="leg">
                        </div>
                        <div class="human__leg-right">
                            <img class="human__img human__img_disabled" src="images/leg-two.png" alt="leg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content__right">
            <div class="question"></div>
            <div class="word-count"></div>
            <div class="try-count">
                <div class="try-description">Incorrect guesses:</div>
                <div class="try">0/6</div>
            </div>
            <div class="keyboard-count">
                <div class="keyboard__row keyboard__top">
                    <div class="keyboard__letter">A</div>
                    <div class="keyboard__letter">B</div>
                    <div class="keyboard__letter">C</div>
                    <div class="keyboard__letter">D</div>
                    <div class="keyboard__letter">E</div>
                    <div class="keyboard__letter">F</div>
                    <div class="keyboard__letter">G</div>
                    <div class="keyboard__letter">H</div>
                    <div class="keyboard__letter">I</div>
                </div>
                <div class="keyboard__row keyboard__center">
                    <div class="keyboard__letter">J</div>
                    <div class="keyboard__letter">K</div>
                    <div class="keyboard__letter">L</div>
                    <div class="keyboard__letter">M</div>
                    <div class="keyboard__letter">N</div>
                    <div class="keyboard__letter">O</div>
                    <div class="keyboard__letter">P</div>
                    <div class="keyboard__letter">Q</div>
                    <div class="keyboard__letter">R</div>
                </div>
                <div class="keyboard__row keyboard__bottom">
                    <div class="keyboard__letter">S</div>
                    <div class="keyboard__letter">T</div>
                    <div class="keyboard__letter">U</div>
                    <div class="keyboard__letter">V</div>
                    <div class="keyboard__letter">W</div>
                    <div class="keyboard__letter">X</div>
                    <div class="keyboard__letter">Y</div>
                    <div class="keyboard__letter">Z</div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-window-count">
     <div class="modal-window__result"></div>
     <div class="modal-window__answer"></div>
     <div class="modal-window__button-try">TRY AGAIN</div>
</div>
</div>
    `;
    this.init();
  }

  delete() {
    this.app.node.innerHTML = '';
  }
}
