const date = new Date().toJSON();
console.log(date); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)

const dateTarget = document.getElementById ("data");
dateTarget.innerHTML = date;

const MenuEncoder = document.getElementById ("clickEncoder")
const MenuDecoder = document.getElementById ("clickDecoder")
var element = document.getElementById("encoder");
MenuDecoder.onclick = bubble;
MenuEncoder.onclick = bubble;


var n = 0;
var element = document.getElementById('dump');
var content = element.innerText;
const splits = new RegExp('\n');
var item = content.split(splits);
var linhas  = item.length;
element.innerHTML = "";
var programa;
var scrollTempo= 300;
var programaSelecao;
var a;

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
var copiarWrap = document.getElementById("copiarCodificarWrap");

button1.onclick = function (){
	//pega o valor do input como variavel
	let textoOriginal = document.getElementById("TextoCodificador");
	let str = textoOriginal.value; 
	let cleanStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	textoOriginal.value = cleanStr;

	index = 0;

	//inicializa uma variavel local, troca com regex a letra e por enter, case insensitive
	let res = cleanStr.replace(/e/gim, "enter");
	//faz o replace da string utilizando regex. Flags gim = global, case insensitive, multiline
	res = res.replace(/i/gim, "imes");
	res = res.replace(/a/gim, "ai");
	res = res.replace(/o/gim, "ober");
	res = res.replace(/u/gim, "ufat");
	//escreve na página o resultado da string criptografada
	textoFinal.setAttribute("class", "visible textofinal");
	copiarWrap.setAttribute("class","visible copiar");
	alvoRespostaCodigo[index].value = res;

}

// programa decodificar
var button2 = document.getElementById('BtnDeCodificar');
var textoFinal2 = document.getElementById("TextoDeCodificadoFinal");
var alvoRespostaCodigo = document.getElementsByClassName("AlvoRespostaCodigo");
var copiarWrap2 = document.getElementById("copiarDeCodificarWrap");

var btnCopiar = document.getElementById("BtnCodificarCopiar");
var btnCopiar2 = document.getElementById("BtnDeCodificarCopiar")
btnCopiar.onclick = copiar;
btnCopiar2.onclick = copiar;

button2.onclick = function (){
	//pega o valor do input como variavel
	let textoOriginal = document.getElementById("TextoDeCodificador");
	let str = textoOriginal.value; 
	let cleanStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	textoOriginal.value = cleanStr;

	index = 1;

	
	//faz o replace da string utilizando regex. Flags gim = global, case insensitive, multiline
	let res2 = cleanStr.replace(/enter/gim, "e");
	res2 = res2.replace(/imes/gim, "i");
	res2 = res2.replace(/ai/gim, "a");
	res2 = res2.replace(/ober/gim, "o");
	res2 = res2.replace(/ufat/gim, "u");
	//escreve na página o resultado da string criptografada
	textoFinal2.setAttribute("class", "visible textofinal");
	copiarWrap2.setAttribute("class","visible copiar");
	alvoRespostaCodigo[index].value = res2;

}


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
buttonFecharDeCodificar = document.getElementById("BtnFecharDeCodificador");
buttonFecharCodificar.onclick = fecharPrograma;
buttonFecharDeCodificar.onclick = fecharPrograma;

function fecharPrograma () {
	element.innerHTML = "";
	alvoRespostaCodigo[index].value = "";
	textoFinal.value="";
	textoFinal.setAttribute("class", "invisible textofinal");
	textoFinal2.value="";
	textoFinal2.setAttribute("class", "invisible textofinal");
	programaSelecao.setAttribute("class","invisible");
	a = document.getElementsByClassName("visible copiar");
	a[0].setAttribute("class","copiar invisible");
	document.getElementsByClassName("ExchangeArea")[index].value = "";
}