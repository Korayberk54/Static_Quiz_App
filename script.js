//                                                               UYGULAMA

// 1)  ---------------------------------------------------- QUIZ CONSTRUCTORUNUN OLUŞTURULMASI----------------------------------------------

function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap) {
    return cevap === this.dogruCevap;
}

let sorular = [
    new Soru("1-Hangisi Javascript paket Yönetim Uygulamasıdır?", { "a" : "Node.Js", "b" : "Typescript", "c" : "Npm"}, "c"),
    new Soru("2-Hangisi Javascript paket Yönetim Uygulamasıdır?", { "a" : "Node.Js", "b" : "Typescript", "c" : "Npm"}, "c"),
    new Soru("3-Hangisi Javascript paket Yönetim Uygulamasıdır?", { "a" : "Node.Js", "b" : "Typescript", "c" : "Npm"}, "c"),
    new Soru("4-Hangisi Javascript paket Yönetim Uygulamasıdır?", { "a" : "Node.Js", "b" : "Typescript", "c" : "Npm"}, "c")
];

function Quiz(sorular) {
    this.sorular = sorular;
    this.dogruCevapSayisi = 0;
    this.soruIndex = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);
const ui = new UI();

ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    startTimer(10);
    startTimerLine();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.next_btn.classList.remove("show");
});

ui.next_btn.addEventListener("click", function(){
    if(quiz.sorular.length != quiz.soruIndex+1) {
    quiz.soruIndex += 1;
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(10);
    startTimerLine();
    soruGoster(quiz.soruGetir ());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Quiz Bitti");
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

// const option_list = document.querySelector(".option_list")
// const correctIcon = `<div class="icon"><i class="fas fa-check"></i></div>`;
// const incorrectIcon = `<div class="icon"><i class="fas fa-times"></i></div>`;

// 2)  ---------------------------------------------------- QUIZ KARTLARININ OLUŞTURULMASI----------------------------------------------
// Bu bölümde JS ilgilendiren bir şey yapılmamıştır. Index.html ve Style.css incele

// 3) -----------------------------------------------------    SORULARIN GÖSTERİLMESİ     ----------------------------------------------
//  *3.1) İlk olarak 36. satırdaki console.log(quiz.sorugetir()); ibaresini  let soru = quiz.soruGetir(); ile değiştirdik, çünkü artık örnek olarak console'da bir şey
//  göstermemize gerek kalmamıştır, bunun yerine quiz.soruGetir(); fonksiyonunu dinamik olarak soru çekme işleminde kullanmaya başlayabiliriz. 
//  *3.2) 52. satırda bir fonksiyon oluşturduk. Bu fonksiyonun amacı dışarıdan aldığı soru objesine göre bir listeleme yapmak ve soruyu göstermektir. Bunun için parametreler
//  içinde fonksiyona aktarılan soru objesinin soruMetni kısmını bir variable içinde tuttuk(question), ayrıca sorunun içerisindeki cevap listesini de dinamik olarak ayarlayıp, her gelen
//  şık bilgisi için bir "option" divi oluşturucaz(option). Bunu yapabilmek için bir döngü kurduk çünkü dinamik olarak gelecek bir liste bilgimiz var. Biz burada key bilgisi ile ilgileniyoruz.
//  Bu key bilgileri Soru objesi içerisindeki a-b-c cevaplarına karşılık geliyor. Bundan ötürü döngümüzün içerisindeki her "cevap" değişkeni aslında Soru objesi içerisindeki
//  cevapSecenekleri listesindeki bilgilerin indexlerini gösterecek. Bu sayede bu keyler cevapSecenekleri[] içerisine köşeli parantezlerle yerleştirildiğinde istediğimiz value'yu
//  çekebileceğiz.
//  *3.3) Satır 38. Bir queryselector aracılığı ile next butonumuza eriştik ve bazı koşullara bağlı olarak bu butonun sıradaki soruları getirmesini sağladık

function soruGoster(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = ``;

    for(let cevap in soru.cevapSecenekleri) {
        options += 
            `
                <div class="option">
                    <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>        
                </div>
            `;
    }

// 4) -----------------------------------------------------    CEVAP SEÇENEKLERİNİN KONTROLÜ     ----------------------------------------------
    
    document.querySelector(".question_text").innerHTML = question;
    ui.option_list.innerHTML = options;

    const optns = ui.option_list.querySelectorAll(".option");

    for(let opt of optns) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

function optionSelected(optns) {
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = optns.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        optns.classList.add("correct");
        optns.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        optns.classList.add("incorrect");
        optns.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for(let i = 0; i< ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.next_btn.classList.add("show");
}

// 5) -----------------------------------------------------    SORU SAYISININ GÖSTERİLMESİ     ----------------------------------------------

function soruSayisiniGoster(soruSirasi, toplamSoru) {
    let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}

// 6) -----------------------------------------------------    SKOR BİLGİSİNİN GÖSTERİLMESİ     ----------------------------------------------

function skoruGoster(toplamSoru, dogruCevap) {
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score_box .score_text").innerHTML = tag;
}

ui.btn_quit.addEventListener("click", function() {
    window.location.reload();
});

ui.btn_replay.addEventListener("click", function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
});

// 7) -----------------------------------------------------    CEVAPLAMA SÜRESİNİN EKLENMESİ     ----------------------------------------------
let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.time_second.textContent = time;
        time--;

        if(time < 0)
        {
            clearInterval(counter);
            ui.time_text.textContent = "Süre Bitti";
            let cevap = quiz.soruGetir().dogruCevap;

            for(let option of ui.option_list.children) {
                if(option.querySelector("span b").textContent == cevap) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", ui.correctIcon);
                } else {
                    option.classList.add("incorrect");
                    option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
                }

                option.classList.add("disabled");
            }

            ui.next_btn.classList.add("show");
        }
    }
}

// 8) -----------------------------------------------------    SÜRE ANİMASYONU     ----------------------------------------------
let counterLine;
function startTimerLine(){
    let line_width = 0;

    counterLine = setInterval(timer, 10);

    function timer() {
        line_width += 0.5;
        ui.time_line.style.width = line_width +"px";

        if(line_width == 549) {
            clearInterval(counterLine);
        }
    }
}