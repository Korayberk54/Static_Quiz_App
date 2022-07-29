function UI() {
    this.btn_start = document.querySelector(".btn_start");
    this.next_btn = document.querySelector(".next_btn");
    this.btn_replay = document.querySelector(".btn_replay");
    this.btn_quit = document.querySelector(".btn_quit");
    this.quiz_box = document.querySelector(".quiz_box");
    this.score_box = document.querySelector(".score_box");
    this.option_list = document.querySelector(".option_list")
    this.correctIcon = `<div class="icon"><i class="fas fa-check"></i></div>`;
    this.incorrectIcon = `<div class="icon"><i class="fas fa-times"></i></div>`;
    this.time_text = document.querySelector(".time_text");
    this.time_second = document.querySelector(".time_second");
    this.time_line = document.querySelector(".time_line");
}