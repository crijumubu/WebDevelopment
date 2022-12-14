export class indexController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.addModalEvents();
        this.addSimonEvent();
    }
    addSimonEvent() {
        let playButtons = this.view.simonButtons;
        for (let i = 0; i < playButtons.length; i++) {
            let button = playButtons[i];
            let buttonLetter = button.textContent;
            button.addEventListener('click', () => {
                if (this.model.onGame) {
                    if (buttonLetter == this.model.sequence[this.model.userContSequence].textContent) {
                        this.model.sounds[buttonLetter].play();
                        if (this.model.sequence.length - 1 == this.model.userContSequence) {
                            this.model.userContSequence = 0;
                            this.round();
                        }
                        else {
                            this.model.userContSequence++;
                        }
                    }
                    else {
                        this.model.sounds['E'].play();
                        this.gameOver();
                    }
                }
            });
            button.addEventListener('mouseenter', () => {
                if (this.model.round != 0 && this.model.onGame) {
                    this.view.blinkButton(buttonLetter, button, true);
                    button.style.cursor = 'pointer';
                }
                else {
                    button.style.cursor = 'default';
                }
            });
            button.addEventListener('mouseleave', () => {
                if (this.model.round != 0) {
                    this.view.blinkButton(buttonLetter, button, false);
                }
            });
        }
    }
    generateSequence() {
        this.model.clearSequence();
        for (let i = 0; i < this.model.round; i++) {
            let random = Math.floor(Math.random() * 4);
            let button = this.view.simonButtons[random];
            this.model.pushToSequence(button);
        }
    }
    showSequence() {
        let i = 0;
        this.model.onGame = false;
        let transitionTimer = setInterval(() => {
            let button = this.model.sequence[i];
            let buttonLetter = button.textContent;
            this.view.blinkButton(buttonLetter, button, true);
            setTimeout(() => this.view.blinkButton(buttonLetter, button, false), this.model.transitionTime);
            this.model.sounds[buttonLetter].play();
            i++;
            if (i == this.model.sequence.length) {
                this.model.onGame = true;
                clearInterval(transitionTimer);
            }
        }, this.model.transitionTime * 2);
    }
    gameOver() {
        this.view.addToModalNewScore();
        this.view.displayModal('block');
        let buttonSubmit = this.view.getElement('submit');
        buttonSubmit.addEventListener('click', () => {
            let input = this.view.getElement('name');
            if (input.value != '') {
                this.model.postScores(JSON.stringify({ name: input.value, level: Object.keys(this.model.level).find(key => this.model.level[key] === this.model.transitionTime), score: this.model.round }));
                this.model.reset();
                this.view.displayModal('none');
            }
        });
        this.view.roundCounter(false);
    }
    round() {
        this.model.round++;
        this.view.updateCounter(this.model.round.toString());
        this.generateSequence();
        this.showSequence();
    }
    play(level) {
        this.model.transitionTime = this.model.level[level];
        this.view.roundCounter(true);
        this.round();
    }
    addModalEvents() {
        let modalsBtn = this.view.getElements('btn');
        for (let i = 0; i < modalsBtn.length; i++) {
            modalsBtn[i].addEventListener('click', () => {
                this.view.displayModal('block');
                if (i == 0) {
                    this.userLevels();
                }
                else if (i == 1) {
                    this.bestScores();
                }
                let closeModalBtn = this.view.getElement('close');
                closeModalBtn.addEventListener('click', () => {
                    this.view.displayModal('none');
                });
            });
        }
    }
    userLevels() {
        this.view.addToModalLevels();
        const levelsBtn = this.view.getElements('levelBtn');
        for (let i = 0; i < levelsBtn.length; i++) {
            levelsBtn[i].addEventListener('click', () => {
                this.view.displayModal('none');
                this.play(levelsBtn[i].textContent);
            });
        }
    }
    bestScores() {
        this.view.displayModal('block');
        let score = JSON.parse(localStorage.getItem("score") || "[]");
        score.sort(function (a, b) {
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            return 0;
        });
        this.view.addToModalScore(score);
    }
}
