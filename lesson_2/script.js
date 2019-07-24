

var viewBlock = document.getElementById("divRes");
var viewInfo = document.getElementById("infoStr");


function parseTextArea() {
	var str = document.getElementById("textArea").value;
	var newLabel;

	var subString = str.split(/[".","!","?"]/);

	subString.forEach(function(element){
		newLabel = document.createElement("label");// создаём новый элемент.
		newLabel.textContent = element.trim();// помещаем в него строку и заодно обрезаем в ней пробелы по краям.
		viewBlock.appendChild(newLabel);// добавляем на страницу новый элемент
		viewBlock.appendChild(document.createElement("br"));// перевод на новую строку
		newLabel.addEventListener("click" , infoString);// вешаем событие по клику на элемент
	});
}


function infoString () {
	this.style.backgroundColor = "red";
	let str = this.innerHTML;
	viewInfo.innerHTML = str + "<br><br>";
	
	var counterLetter = 0;
	var counterLetterWord = 0;
	var lettersInWords = [];

	var arrayWord = str.split(" ");
	arrayWord.forEach( function(element , index) {
		lettersInWords[index] = element.length;
		counterLetter += element.length;
	});

	str = str + "<br><br>" + "Количество букв: " + counterLetter;
	str = str + "<br><br>" + "Количество слов: " + arrayWord.length;
	str = str + "<br><br>" + "Средняя длина слова: " + lettersInWords[median(lettersInWords)];
	viewInfo.innerHTML = str;
}


function median(arr){
  arr = arr.sort(function(a, b){ return a - b; });
  var i;
  if (arr.length % 2 == 0) {
  	i = arr.length / 2;
  }else{
  	i = ((arr.length - 1) / 2) + 1;
  }
  return --i;
}