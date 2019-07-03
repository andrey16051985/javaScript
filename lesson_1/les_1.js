var buttRez = this.document.getElementById("butt");		//кнопка расчета
var num_1 = this.document.getElementById("number_1");	//первое числовое поле
var num_2 = this.document.getElementById("number_2");	//второе числовое поле
var view_rez = this.document.getElementById("rezult");	//вывод результата
var action = this.document.getElementById("what_doing");





buttRez.onclick = function(){
	
	var temp_1 = num_1.value;
	var temp_2 = num_2.value;
	var act = action.value;
	var rez;
	
	if(act == "add"){rez = +temp_1 + +temp_2;}
	if(act == "sub"){rez = temp_1 - temp_2;}
	if(act == "mul"){rez = temp_1 * temp_2;}
	if(act == "div"){rez = temp_1 / temp_2;}
	
	view_rez.innerHTML = rez;
	
	buttRez.style.backgroundColor = getRandomColor();
}


function getRandomColor(){
	var r = Math.random()*255;
	var g = Math.random()*255;
	var b = Math.random()*255;
	return "rgb("+r+","+g+","+b+")";
}
