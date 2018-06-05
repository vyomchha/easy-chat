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
	var objDiv = document.getElementById("es_body_content");
	objDiv.scrollTop = objDiv.scrollHeight;	
};

function enter_res(dat){
	var arr = dat.split("01p0");
	if (arr.length > 1) {
		var op_arr = arr[1].split(",");
		if (op_arr[0] == '') {
			var par = document.getElementById('es_op_form');
			par.innerHTML = "";
			for (var i = 1; i < op_arr.length; i++) {
				var ele = document.createElement('input');
				ele.setAttribute("type", "submit");
				ele.setAttribute("name", "es_op");
				ele.setAttribute("value", op_arr[i]);
				ele.classList.add("es_body_options_btn");
				par.appendChild(ele);
			};
		}
		var ele = "<div class='es_body_content_text'><div class='es_body_content_text_reply'>" + arr[0] + "</div></div>";
		var par = document.getElementById('es_body_content');
		var div = document.createElement('div');
		div.innerHTML = ele;
		par.appendChild(div);
		var objDiv = document.getElementById("es_body_content");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	else {
		var ele = "<div class='es_body_content_text'><div class='es_body_content_text_reply'>" + dat + "</div></div>";
		var par = document.getElementById('es_body_content');
		var div = document.createElement('div');
		div.innerHTML = ele;
		par.appendChild(div);
		var objDiv = document.getElementById("es_body_content");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
};

var accessToken = "226071ee70a84d7097454a21fe48a65b";
var baseUrl = "https://api.api.ai/v1/";
		
$(document).ready(function() {
	$(document).on("click", "input[name='es_op']" , function() {
		$('#query').val($(this).val());
		$('#es_op_form').submit();
	});
	var $frm = $('form');
	$frm.on('submit', function(event) {
		var $dat = $('#query').val();
		$.ajax({
			type: "POST",
			data: JSON.stringify({ query: $dat, lang: "en", sessionId: "somerandomthing" }),
			url: baseUrl + "query?v=20150910",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			processData: true,
            beforeSend: function() {
               enter_req();
				var par = document.getElementById('es_op_form');
				par.innerHTML = "";
            },
		}).done(function(data) {
			enter_res(data['result']['fulfillment']['speech']);
		}).fail(function() {
			alert('server unavailable!');
		});

		event.preventDefault();
	});

});