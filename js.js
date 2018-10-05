$(function() {

    var windowWidth = $(window).width() - 59;
    var windowHeight = $(window).height() - 59;
    var target = $("#target");
    var doRandomShifting = false;
    var pricesBox = new PricesBox();
    var winScreen = new WinScreen();
  
    target.offset({ top: ((windowHeight - 59) / 2), left: ((windowWidth - 59) / 2) });

    window.document.addEventListener("keydown", function (e) {
      if (e.keyCode === 65)
        doRandomShifting = !doRandomShifting;
    });

    target.mouseover(function () {
        if (doRandomShifting === true)
          target.offset({ top: (rand(0, windowHeight - 1)), left: (rand(0, windowWidth - 1)) });
    });


    target.click(function () {
        target.attr("src", "./img/good.png");
        target.css("border-color", "green")
        winScreen.setPrice(pricesBox.getPrice());
        winScreen.show();

        (function () {
            var count = 3;
            winScreen.jQEl.append(" >> [" + count + "]");
            var timerID = window.setInterval(function () {
                if (--count > 0)
                    winScreen.jQEl.append(" >> [" + count + "]");

                else
                    window.clearInterval(timerID); 
            }, 1000);
        })();

        window.setTimeout(function (){
            winScreen.hide();
            target.attr("src", "./img/quest.png");
            target.css("border-color", "red")
            target.offset({ top: (rand(0, windowHeight - 1)), left: (rand(0, windowWidth - 1)) });
        }, 3000);
    });
})

function rand(pMin, pMax)
{
    return (Math.floor(((Math.random() * (pMax-pMin+1)) + pMin)));
}

function PricesBox()
{
    this.prices = [
    "une bicyclette", 
    "un formidable rhododendron", 
    "une cuillère déformable", 
    "un ballon de baudruche", 
    "une salopette en papier maché",
    "une authentique photographie de Mamie Popin's", 
    "une super punaise", 
    "une partie gratuite supplémentaire",
    "un cadeau surprise caché quelque part dans le code source", 
    "un voyage pour deux personnes à Tourcoing", 
    "une table basse en authentique cartons d'emballages de corn flakes", 
    "une chaise pliante Ikea", 
    "un tableau noir pour écrire des histoires et des équations", 
    "un feutre qui sent bon", 
    "une pochette en carton pour ranger ses papiers importants", 
    "un morceau de carrelage de 18cm sur 39.7cm", 
    "une tige en bambou", 
    "un masque de canard à mettre lors de ses promenades matinales avec sa bande de canard le long du canal", 
    "une collection de 765 boutons de toutes les couleurs et de toutes les formes", 
    "un magnifique candélabre noir d'une hauteur de 20 cm, bougies non fournies", 
    "un superbe accordeur pour violon d'ingre, piles non fournies",
    "un superbe accordéon d'ingre, piles non fournies",
    "le droit à l'exaltation, droit inaliénable dû à tout individu"
    ];

    this.getPrice = function () {
        return (this.prices[rand(0, (this.prices.length - 1))]);
    }
}

function WinScreen()
{
    this.jQEl = $("<div id=\"win_screen\">");
    this.jQEl.css({
        "background-color": "#8cff66",
        "padding": "15px",
        "border": "black 1px dotted",
        "opacity": "0",
        "transition": "opacity 0.2s" });

    this.jQEl.appendTo($("body"));

    this.setPrice = function (pPrice) {
        this.jQEl.html("GAGNÉ !<br />Bravo vous avez gagné <mark>" + pPrice + "</mark> !<br /><br />Attention prochaine partie dans... ");
    }

    this.show = function () {
        this.jQEl.css("opacity", "1");
    }

    this.hide = function () {
        this.jQEl.css("opacity", "0");
    }
}