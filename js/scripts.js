const date = new Date().toJSON();
console.log(date); // Fri Jun 17 2022 11:27:28 GMT+0100 (British Summer Time)

const dateTarget = document.getElementById ("data");
dateTarget.innerHTML = date;

const btnDecoder = document.getElementById ("clickDecoder")
var element = document.getElementById("encoder");
btnDecoder.onclick = function () {
	
	element.scrollIntoView({ behavior: 'smooth', block: 'end'});
}
