const date = new Date().toJSON();
console.log(date); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)

const dateTarget = document.getElementById ("data");
dateTarget.innerHTML = date;

const MenuDecoder = document.getElementById ("clickDecoder")
var element = document.getElementById("encoder");
MenuDecoder.onclick = bubble;


var n = 0;
var element = document.getElementById('dump');
var content = element.innerText;
const splits = new RegExp('\n');
var item = content.split(splits);
var linhas  = item.length;
element.innerHTML = "";
var programa;
var scrollTempo= 100;
var programaSelecao;


function escreve () {
  	element.insertAdjacentHTML('beforeEnd',(item[n]+"<br>"));
    element.scrollIntoView({ behavior: 'auto', block: 'end'});
}



function loop() {
    var rand = Math.round(Math.random()*scrollTempo);
    let i = setTimeout(function() {
    	if (n++ < linhas-1) {
    		n++;
            escreve();
            loop();  
        } else {
        	window.clearTimeout(i);
        	programaSelecao = document.getElementById(programa+"Programa");
        	console.log(programaSelecao)
        	programaSelecao.setAttribute("class","visible textshadow");      	
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

var index = 0;
//pega o click no botão e inicializa uma função sem nome
var button1 = document.getElementById('BtnCodificar');
var textoFinal = document.getElementById("TextoCodificadoFinal");
var alvoRespostaCodigo = document.getElementsByClassName("AlvoRespostaCodigo");
var copiarWrap = document.getElementsByClassName("copiar invisible");

button1.onclick = function (){
	//pega o valor do input como variavel
	let str = document.getElementById("TextoCodificador").value; 
	index = 0;

	//inicializa uma variavel local, troca com regex a letra e por enter, case insensitive
	let res = str.replace(/e/gim, "enter");
	//faz o replace da string utilizando regex. Flags gim = global, case insensitive, multiline
	res = res.replace(/i/gim, "imes");
	res = res.replace(/a/gim, "ai");
	res = res.replace(/o/gim, "ober");
	res = res.replace(/u/gim, "ufat");
	//escreve na página o resultado da string criptografada
	textoFinal.setAttribute("class", "visible textofinal");
	copiarWrap[index].setAttribute("class","visible copiar");
	alvoRespostaCodigo[index].value = res;

}
var btnCopiar = document.getElementById("BtnCodificarCopiar");
btnCopiar.onclick = copiar;
function copiar() {
  // Get the text field
  

  // Select the text field
  alvoRespostaCodigo[index].select();
  alvoRespostaCodigo[index].setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(alvoRespostaCodigo[index].value);

  // Alert the copied text
  
}
buttonFecharCodificar = document.getElementById("BtnFecharCodificador");
buttonFecharCodificar.onclick = fecharPrograma;

function fecharPrograma () {
	element.innerHTML = "";
	alvoRespostaCodigo[index].value = "";
	textoFinal.value="";
	textoFinal.setAttribute("class", "visible textofinal");
	programaSelecao.setAttribute("class","invisible");
	document.getElementsByClassName("visible copiar")[index].setAttribute("class","copiar invisible");
	document.getElementById("TextoCodificador").value = "";
}