var cardsHolder = document.getElementById("cards");
var solutionHolder = document.getElementById("solution");
var cardsImages = [];
var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
var operators = ["+", "-", "*", "/"];
var selected;
for (var i = 0; i < suits.length; i++) {
    var suit = suits[i];
    for (var num = 1; num <= 10; num ++) {
        var numStr = num == 1 ? "A" : num;
        cardsImages.push({
            img: "card" + suit + numStr + ".png",
            val: num
        });
    }
}

function newPile() {
    shuffle(cardsImages);
    var append = "";
    selected = [];
    for (var i = 0; i < 4; i++) {
        append += "<img src=\"img/" + cardsImages[i].img + "\">";
        selected.push(cardsImages[i].val);
    }

    cardsHolder.innerHTML = append;

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    while (!solve(true)) {
        newPile();
    }
    
    solutionHolder.innerHTML = "";
}

function solve(dontShow) {
    var pos = [];
    for (var one = 0; one < 4; one++) {
        for (var two = 0; two < 4; two++) {
            for (var three = 0; three < 4; three++) {
                for (var four = 0; four < 4; four++) {
                    var sameCheck = [];
                    sameCheck[one] = true;
                    if (sameCheck[two]) continue;
                    sameCheck[two] = true;
                    if (sameCheck[three]) continue;
                    sameCheck[three] = true;
                    if (sameCheck[four]) continue;
                    sameCheck[four] = true;

                    pos[0] = selected[one];
                    pos[2] = selected[two];
                    pos[4] = selected[three];
                    pos[6] = selected[four];
                    for (var i = 0; i < operators.length; i++) {
                        pos[1] = operators[i];
                        for (var j = 0; j < operators.length; j++) {
                            pos[3] = operators[j];
                            for (var k = 0; k < operators.length; k++) {
                                pos[5] = operators[k];
                                var acc = pos[0];
                                var step1 = acc;
                                acc = eval(acc + pos[1] + pos[2]);
                                var step2 = acc;
                                if (step2 % 1 !== 0 || step2 < 0) continue;
                                acc = eval(acc + pos[3] + pos[4]);
                                var step3 = acc;
                                if (step3 % 1 !== 0 || step3 < 0) continue;
                                acc = eval(acc + pos[5] + pos[6]);
                                var step4 = acc;
                                if (acc == 24) {
                                    if (!dontShow) {
                                        var solution = "";
                                        solution += step1 + " " + pos[1] + " " + pos[2] + " = " + step2 + "<br>";
                                        solution += step2 + " " + pos[3] + " " + pos[4] + " = " + step3 + "<br>";
                                        solution += step3 + " " + pos[5] + " " + pos[6] + " = " + step4 + "<br>";
                                        solutionHolder.innerHTML = solution;
                                    }

                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    return false;
}

newPile();