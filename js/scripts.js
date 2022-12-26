const date = new Date().toJSON();
console.log(date); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)

const dateTarget = document.getElementById ("data");
dateTarget.innerHTML = date;

const btnDecoder = document.getElementById ("clickDecoder")
var element = document.getElementById("encoder");
btnDecoder.onclick = bubble;


var n = 0;
var intervalID = null;
var element = document.getElementById('dump');
var content = element.innerText;
const splits = new RegExp('\n');
var item = content.split(splits);
var linhas  = item.length;
element.innerHTML = "";
var programa;


function escreve () {
  	element.insertAdjacentHTML('beforeEnd',(item[n]+"<br>"));
    element.scrollIntoView({ behavior: 'smooth', block: 'end'});
}



function loop() {
    var rand = Math.round(Math.random()*100);
    var i = setTimeout(function() {
    	if (n++ < linhas-1) {
    		n++;
            escreve();
            loop();  
        } else {
        	clearTimeout(i);
        	var jump = document.getElementById(programa);
        	jump.scrollIntoView({ behavior: 'smooth', block: 'end'});
        	console.log(programa)
        }
    }, rand);
}

function bubble (event) {
	element.innerHTML = "";
	n=0;
	console.log (event.target.getAttribute('name'));
	programa= event.target.getAttribute('name')
	loop();
}