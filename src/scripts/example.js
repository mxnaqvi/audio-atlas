class Example {
    constructor(htmlElement){
        this.htmlElement = htmlElement
        this.htmlElement.innerHTML = "<h1> its ALIVE</h1>"


        this.handleCLick = this.handleCLick.bind(this)
        this.htmlElement.addEventListener('click', this.handlClick)
    }

    handleCLick(){
        this.htmlElement.children[0].innerText = "OCUH"
    }
}