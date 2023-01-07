const date = new Date().toJSON();
console.log(date); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)
//data atual quando a página é carregada.

const dateTarget = document.getElementById ("data");
dateTarget.innerHTML = date;

const MenuEncoder = document.getElementById ("clickEncoder")
const MenuDecoder = document.getElementById ("clickDecoder")
var element = document.getElementById("encoder");
MenuDecoder.onclick = bubble;
MenuEncoder.onclick = bubble;

//emula o dump de um terminal com um tempo aleatorio de scroll
//remove o html da página para um array, escreve uma linha por vez de volta no dom
var n = 0;
var element = document.getElementById('dump');
var content = element.innerText;
const splits = new RegExp('\n');
var item = content.split(splits);
var linhas  = item.length;
element.innerHTML = "";
var programa;
var scrollTempo= 1; //aqui seleciona o tempo do scroll
var programaSelecao;
var a;

function escreve () {
  	element.insertAdjacentHTML('beforeEnd',(item[n]+"<br>"));
    element.scrollIntoView({ behavior: 'auto', block: 'end'});
}


//faz um loop pela lista do dump, chamando a função de escrever uma linha por vez. 
//escapa o loop quando acaba o dump e carrega um "programa"
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
    }, rand);//chama a função em um tempo aleatório para simular um terminal mais realístico

}

//funcao que "carrega" um programa - pega o nome do botão que foi clicado e passa como parm
//chama a funcao loop que escreve o texto do dump na tela.
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
	//Limpa a string dos caracteres especiais:
	//normalize() -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
	//NFD -> Canonical decomposition - https://en.wikipedia.org/wiki/Unicode_equivalence#Sources_of_equivalence
	//replace() -> todo o unicode de acentos (regex buscando todos as marcacoes diacríticas) https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
	//toLowerCase -> converte para lowercase 
	let cleanStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	//buraco do coelho: https://unicode.org/reports/tr15/
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

//botão de decodificar
button2.onclick = function (){
	//pega o valor do input como variavel
	let textoOriginal = document.getElementById("TextoDeCodificador");
	let str = textoOriginal.value; 
	//Limpa a string dos caracteres especiais:
	//normalize() -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
	//NFD -> Canonical decomposition - https://en.wikipedia.org/wiki/Unicode_equivalence#Sources_of_equivalence
	//replace() -> todo o unicode de acentos (regex buscando todos as marcacoes diacríticas) https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
	//toLowerCase -> converte para lowercase 
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
  // pega o texto de acordo com qual programa está ativo
  alvoRespostaCodigo[index].select();
  alvoRespostaCodigo[index].setSelectionRange(0, 99999); // para compatibilidade com celulares

   // copia o texto dentro da caixa utilizando o método de escrever o conteúdo no clipboard.
  //https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
  navigator.clipboard.writeText(alvoRespostaCodigo[index].value);
	}



//botoes de "fechar" os programas
buttonFecharCodificar = document.getElementById("BtnFecharCodificador");
buttonFecharDeCodificar = document.getElementById("BtnFecharDeCodificador");
buttonFecharCodificar.onclick = fecharPrograma;
buttonFecharDeCodificar.onclick = fecharPrograma;

//função que "fecha" o programa. 
//altera visibilidade de alguns divs, limpa o dump, reseta variáveis.
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