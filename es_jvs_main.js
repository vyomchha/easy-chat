function enter_data(){
	var dat = document.getElementById("query");
	var ele = "<div class='es_body_content_text'><div class='es_body_content_text_user'>" + dat.value + "</div></div>";
	dat.value = '';
	var par = document.getElementById('es_body_content');
	var div = document.createElement('div');
	div.innerHTML = ele;
	par.appendChild(div);
};

var input_dat = document.getElementById("query");
input_dat.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {enter_data();}
}); 