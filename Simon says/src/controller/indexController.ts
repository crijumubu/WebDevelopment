import { indexModel } from "../model/indexModel";
import { indexView } from "../view/indexView";

export class indexController {

    public model: indexModel;
    public view: indexView;

    constructor(model: indexModel, view: indexView) {
        this.model = model;
        this.view = view;
        this.addModalEvents();
    }

    public addModalEvents(): void{

        let openModalBtn = document.getElementsByClassName('btn')[0]!;
        let closeModalBtn = document.getElementsByClassName('close')[0]!;

        openModalBtn.addEventListener('click', () => {
            this.view.displayModal('block');
            this.userLevels();
        });

        closeModalBtn.addEventListener('click', () => {
            this.view.displayModal('none');
        });

        window.addEventListener('click', (event) => {
            if (event.target == this.view.modal) {
                this.view.displayModal('none');
            }
        });
    }

    private userLevels(): void{

        const levels : string[] = ['Easy', 'Intermediate', 'Hard'];

        this.view.addToModal(levels);

        const levelBtn = document.getElementsByClassName('levelBtn');

        for (let i=0; i<levelBtn.length; i++){
            levelBtn[i].addEventListener('click', (event) => {
                this.view.displayModal('none');
                this.play(levelBtn[i].innerHTML);
            });
        }
    }

    private play(level : string): void{

        switch (level){
            case 'Easy':
                console.log('Easy');
                break;

            case 'Intermediate':
                console.log('Intermediate');
                break;
                
            case 'Hard':
                console.log('Hard');
                break;
        }
    }
}