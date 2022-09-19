export class indexView{

    private _display: any;
    private _modal: HTMLElement;
    /*private _openModalBtn: any;
    private _closeModalBtn: any;*/

    constructor() {
        this._display = this.getElement('container');
        this._modal = document.getElementsByClassName('modal')[0]! as HTMLElement;
    }

    private getElement = (selector: string): HTMLElement | null => document.querySelector(selector);

    public set display(display: HTMLElement) {
        this._display = display;
    }

    public get display() {
        return this._display;
    }

    public addToDisplay(content: string): void {
        this._display.innerHTML += `${content}`;
    }

    /*public setModalAsDisplay(){
        this._display = this._modal;
    }*/

    public get modal() {
        return this._modal;
    }

    public displayModal(display: string): void {
        this._modal.style.display = display;
    }

    public addToModal(levels: string[]): void{

        this._display = this._modal.children[0].childNodes[5];

        for (let i = 0; i < levels.length; i++){
            const levelBtn = document.createElement("button");
            levelBtn.className = 'btn levelBtn';
            levelBtn.innerHTML += `${levels[i]}`;
            
            if (i + 1 == levels.length){
                levelBtn.style.gridColumn = "1/3";
                levelBtn.style.width = "40%";
            }

            this._display.appendChild(levelBtn);
        }
    }
}