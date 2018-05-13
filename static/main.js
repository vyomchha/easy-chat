function enter_req(){
	
	var dat = document.getElementById("query");
	if (String(dat).length>0) {
		var ele = "<div class='es_body_content_text'><div class='es_body_content_text_user'>" + dat.value + "</div></div>";
		dat.value = '';
		var par = document.getElementById('es_body_content');
		var div = document.createElement('div');
		div.innerHTML = ele;
		par.appendChild(div);
	}
		
};

function enter_res(dat){
	
	if (String(dat).length>0) {
		var ele = "<div class='es_body_content_text'><div class='es_body_content_text_reply'>" + dat + "</div></div>";
		var par = document.getElementById('es_body_content');
		var div = document.createElement('div');
		div.innerHTML = ele;
		par.appendChild(div);
	}
		
};

$(document).ready(function() {

	$('form').on('submit', function(event) {

		$.ajax({
			data : {
				name : $('#query').val()
			},
			type : 'POST',
			dataType: 'json',
			url : '/process',
			processData: true,
            beforeSend: function() {
               enter_req();
            },
		}).done(function(data) {
			enter_res(data.output);
		}).fail(function() {
			alert('server unavailable!');
		});

		event.preventDefault();

	});

});