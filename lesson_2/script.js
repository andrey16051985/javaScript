

var viewBlock = this.document.getElementById("divRes");
var viewInfo = this.document.getElementById("infoStr");
var index = 0;


function parseTextArea() {
	var str = this.document.getElementById("textArea").value;
	var str_1 = "";
	var newLabel;
	
	while(str.indexOf(".") !== -1){

		str_1 = str.slice(0 , str.indexOf(".") + 1);//извлекаем подстроку из всей строки
		str = str.replace(str_1 , "");//вырезаем найденую подстроку из основной строки
		
		newLabel = this.document.createElement("label");//создаём новый элемент
		newLabel.textContent = str_1;//помещаем в него текcт
		viewBlock.appendChild(newLabel);//добавляем на страницу новый элемент
		viewBlock.appendChild(this.document.createElement("br"));
		newLabel.addEventListener("click" , infoString);
	}
}


function infoString () {
	let str = this.innerHTML;
	viewInfo.innerHTML = str + "<br><br>";
	
//определяем количество букв в предложении
	var counterLetter = 0;
	var counterWord = 0;
	var arrayWord = [];
	var counterLetterWord = 0;
	var middleWord = 0;

	for(var i = 0; i < str.length; i++) {
		if(str.charCodeAt(i) >= "A".charCodeAt(0)) {
			counterLetter++;
			counterLetterWord++;
		}

		if(str.charCodeAt(i) == " ".charCodeAt(0) || str.charCodeAt(i) == ".".charCodeAt(0)) {
			arrayWord[counterWord] = counterLetterWord;//загружаем в массив количество слов с количеством букв в слове
			counterLetterWord = 0;//сбрасываем счётчик букв в слове
			counterWord++;
		}

	}

	//middleWord = arrayWord[median(arrayWord)];

	str = str + "<br><br>" + "Количество букв: " + counterLetter;
	str = str + "<br><br>" + "Количество слов: " + counterWord;
	str = str + "<br><br>" + "Средняя длина слова: " + arrayWord[median(arrayWord)];   //middleWord;
	
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