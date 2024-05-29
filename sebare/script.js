const main = document.getElementById("main");
const quote = document.getElementById("quote");
const myName = document.getElementById("js-name");

myName.style.display = "flex";
quote.style.display = "none";

function ShowQuote(){
    if(myName.style.display == "flex")
    {
        myName.style.display = "none";
        quote.style.display = "flex";

        main.style.scale = "1.35";
    }
    else
    {
        myName.style.display = "flex";
        quote.style.display = "none";

        main.style.scale = "1";
    }
}

function HideScreenCover(){
    const screenCover = document.getElementById("screen-cover");
    screenCover.style.visibility = "hidden";
}

setTimeout(HideScreenCover, 2000);