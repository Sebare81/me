var canvas = document.querySelector("canvas");
var textHours = document.getElementById("jd__hours");
var textDate = document.getElementById("jd__date");
var ctx = canvas.getContext("2d");
canvas.style.border = "solid 1px black";
var arrTxt = [
    '', 
    '', 
    '', 
    ''
],
    arrFont = [
    '12px Big Shoulders Display', 
    '20px Gruppo', 
    '16px sans-serif', 
    '14px Oswald'
],
    arrColor = [
    '#030A30', 
    '#00098D', 
    '#51F3FF', 
    '#5E9FFF', 
    '#FFF'
], 
    arrObj = [],
    maxName = 100;


canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
function clock(){
    var date = new Date();
    var lang = navigator.linguage;
    var day = date.getDate();
    var month = date.toLocaleDateString(lang, {month: 'long'});
    
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    
    var form = (hour < 10 ? '0' + hour : hour) + ' : ' + (min < 10 ? '0' + min : min) + ' : ' + (sec < 10 ? '0' + sec : sec);
    
    var formDate = day + ' ' + month;
    
    textHours.innerHTML = form;
    textDate.innerHTML = formDate;
}
window.setInterval(clock, 1000);

function itemObj(x, y, w, h, vx, vy){
    this.fonTxt = arrFont[Math.floor(Math.random() * arrTxt.length)];
    this.colorTxt = arrColor[Math.floor(Math.random() * arrColor.length)];
    this.textContent = arrTxt[Math.floor(Math.random() * arrTxt.length)];
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    
    this.DrawTxt = function(){
        ctx.font = this.fonTxt;
        ctx.align = "center";
        ctx.fillStyle = this.colorTxt;
        ctx.fillText(this.textContent, this.x, this.y, this.w, this.h);
    }
    
    this.update = function(){
        if(this.x + this.w / 2 > innerWidth || this.x < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.h > innerHeight){
            this.vy = + this.vy;
        }else if(this.y + this.h < 0){
            this.y = innerHeight + this.h;
            this.y += this.vy;
        }
        
        this.x += this.vx;
        this.y -= this.vy;
        
        this.DrawTxt();
    }
}

function init(){
    for(var i = 0; i < maxName; i++){
        var w = 120,
            h = 32,
            x = Math.random() * (innerWidth - w * 2) + w,
            y = innerHeight + h,
            vx = (Math.random() - 0.5) * 2,
            vy = (Math.random() - 0.5);
        
        arrObj.push(new itemObj(x, y, w, h, vx, vy));
        
    }
}

function animate(){
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < arrObj.length; i++){
        arrObj[i].update();
        
    }
}

animate();
