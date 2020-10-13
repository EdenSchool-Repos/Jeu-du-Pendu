if(localStorage.getItem('names') === null){
    fetch('https://bafybeiaxp3c3npbla44khqbyagwqcbkxxxqjowo6tgnnilfkj2qpu55v5i.ipfs.infura-ipfs.io/').then(function (response) {
        return response.json();
    }).then(function (obj){
        localStorage.setItem('names', JSON.stringify(obj));
        location.reload();
    }).catch(function (error){
        console.log("Erreur " + error)
    });
}

function startCustom() {
    let customWord = prompt("Quel votre mot personnalisé ?")
    location.assign("?custom=" + customWord);
  }

function start() {
    location.assign("/");
}

let params = (new URL(document.location)).searchParams;
let names = "null"

if(params.get('custom') === null){
    names = JSON.parse(localStorage.getItem('names'));
} else {
    names = JSON.parse('["' + params.get("custom") + '"]');
}

console.log(names)
let random = Math.floor(Math.random() * names.length);

const str = names[random]
let firstname = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
firstname = firstname.toUpperCase();
while(firstname.includes(" ")){
    firstname = firstname.replace(" ", "-")
}
console.log(firstname)

let firstnameSplit = firstname.split('')
console.log(firstnameSplit);

let hangedStat = 0;
let hangedStatVictory = 0;

let btns = document.querySelector(".letters-button")
let hangedimg = document.querySelector(".hanged-stat")
let lettersempty = document.querySelector(".empty-letters .cases")
document.addEventListener('keyup', clicked);

let points = localStorage.getItem('points');
if(points === null){
    document.getElementById('points').innerHTML = "Tu as 0 points"
} else {
    document.getElementById('points').innerHTML = "Tu as " + localStorage.getItem('points') + " points"
}

//Hanged Image
hangedimg.innerHTML += '<img class="fit-picture" src="assets/images/pendu_0.jpg">'


let LettersNumber = 65
while(LettersNumber <= 90){
    let LettersButton = String.fromCharCode(LettersNumber)
    btns.innerHTML += `<button type="button" onclick="clicked('${LettersButton}');" id="letterbutton" class="btn btn-dark letter${LettersButton}">${LettersButton}</button>`;
    LettersNumber++;
}

function clicked(LettersButton) {
    if(LettersButton.code){
        LettersButton = LettersButton.code;
        LettersButton = LettersButton.replace("Key", "")
        console.log(LettersButton)
    }

    document.querySelector(".letter" + LettersButton).style.display = "none";
    if(firstnameSplit.includes(LettersButton)){
        if(hangedStatVictory === firstname.length - 1){
            console.log("Victory !")
            document.querySelector(".empty-letters .cases").style.background = "#26de81";
            lettersempty.innerHTML = '<h1 id="result">' + firstname + '</h1>';
        } else {
            //console.log(hangedStatVictory)
            const regexp = new RegExp(LettersButton, 'g');
            const matches = [...firstname.matchAll(regexp)];

            let matcheslength = 0
            while(matcheslength <= matches.length - 1){
                matchesindex = matches[matcheslength].index + 1

                let lettersID = document.getElementById("letter" + matchesindex)

                lettersID.innerHTML = '<h1 id="letter' + matchesindex + '">' + LettersButton + '</h1>';

                let points = localStorage.getItem('points');
                if(points === "NaN"){
                    localStorage.setItem('points', 0);
                    document.getElementById('points').innerHTML = "Tu as " + localStorage.getItem('points') + " points"
                } else {
                    points++;
                    localStorage.setItem('points', points);
                    document.getElementById('points').innerHTML = "Tu as " + localStorage.getItem('points') + " points"
                    console.log(points);
                }

                matcheslength++;
                hangedStatVictory++;
            }
        }
    } else {
        hangedStat++;
        if(hangedStat >= 9){
            console.log("Fin")
            document.querySelector(".letters-button").style.display = "none";
            document.querySelector(".empty-letters .cases").style.background = "#eb3b5a";
            hangedimg.innerHTML = '<img class="fit-picture" src="assets/images/pendu_9.jpg">'
            lettersempty.innerHTML = '<h1 id="resultfalse">' + firstname + '</h1>';

            if(points <= "5"){
                localStorage.setItem('points', 0);
                document.getElementById('points').innerHTML = "Tu as " + localStorage.getItem('points') + " points"
            } else {
                let calc = localStorage.getItem('points');
                calc = calc - 5;
                localStorage.setItem('points', calc);
                document.getElementById('points').innerHTML = "Tu as " + localStorage.getItem('points') + " points"
                console.log(points);
            }
        } else {
            hangedimg.innerHTML = '<img class="fit-picture" src="assets/images/pendu_' + hangedStat + '.jpg">'
        }
    }
};

//LettersName
if (firstname.includes("-")){
    const regexp = new RegExp('-', 'g');
    const matches = [...firstname.matchAll(regexp)];

    let LettersNameNumber = 1
    while(LettersNameNumber <= firstname.length){
        lettersempty.innerHTML += '<h1 id="letter' + LettersNameNumber + '">_</h1>';
        LettersNameNumber++;
    };

    let matcheslength = 0
    while(matcheslength <= matches.length - 1){
        matchesindex = matches[matcheslength].index + 1
        console.log(matchesindex)

        let lettersID = document.getElementById("letter" + matchesindex)
        lettersID.innerHTML = '<h1 id="letter' + matchesindex + '">-</h1>'
        hangedStatVictory++;
        matcheslength++;
    };
} else {
    let LettersNameNumber = 1
    while(LettersNameNumber <= firstname.length){
        lettersempty.innerHTML += '<h1 id="letter' + LettersNameNumber + '">_</h1>';
        LettersNameNumber++;
    };
}

function resetpoints() {
    localStorage.removeItem('points');
    document.getElementById('points').innerHTML = "Tu as 0 points"
};

console.log("Le nom est : " + firstname + " et il contient " + firstname.length + " lettres")
