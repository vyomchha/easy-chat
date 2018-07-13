var baseUrl = "https://api.api.ai/v1/";
var voices = [];

var ebc_height1 = '63vh';
var ebc_height2 = '68vh';

var mute = false;

function changeMute(){
	if (mute == false) {
		mute = true;
		document.getElementById("mute-btn").innerHTML = "Un-Mute Me";
		window.speechSynthesis.cancel();
	}
	else {
		mute = false;
		document.getElementById("mute-btn").innerHTML = "Mute Me";
	}
}

function enter_req(){
	
	var dat = document.getElementById("query");
	if (String(dat.value)) {
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
	var msg = new SpeechSynthesisUtterance();
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
				document.getElementById("es_body_content").style.height = ebc_height1;
			};
		}
		var ele = "<div class='es_body_content_text'><div class='es_body_content_text_reply'>" + arr[0] + "</div></div>";
		var par = document.getElementById('es_body_content');
		var div = document.createElement('div');
		div.innerHTML = ele;
		par.appendChild(div);
		var objDiv = document.getElementById("es_body_content");
		objDiv.scrollTop = objDiv.scrollHeight;
		msg.text = arr[0];
		
	}
	else {
		var ele = "<div class='es_body_content_text'><div class='es_body_content_text_reply'>" + dat + "</div></div>";
		var par = document.getElementById('es_body_content');
		var div = document.createElement('div');
		div.innerHTML = ele;
		par.appendChild(div);
		var objDiv = document.getElementById("es_body_content");
		objDiv.scrollTop = objDiv.scrollHeight;
		msg.text = dat;
	}
	
	msg.lang = 'en-US';
	msg.voice = voices[1];
	if (mute == false) {window.speechSynthesis.speak(msg);}
};

function startDictation() {
	if (!('webkitSpeechRecognition' in window)) {
		//Speech API not supported here…
		alert('Your browser does not support this feature!');
	} else { //Let’s do some cool stuff :)
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.lang = "en-US";

		recognition.onerror = function(event) {
			console.error(event);
		};

		recognition.onstart = function() {
			console.log('Speech recognition service has started');
			document.getElementById("speech-btn").className = "es_body_footer_btn fa fa-assistive-listening-systems";
		};

		recognition.onend = function() {
			console.log('Speech recognition service disconnected');
			document.getElementById("speech-btn").className = "es_body_footer_btn fa fa-microphone";
		};

		recognition.onresult = function(event) {
			var interim_transcript = '';
			var final_transcript = '';

			for (var i = event.resultIndex; i < event.results.length; ++i) {
				// Verify if the recognized text is the last with the isFinal property
				if (event.results[i].isFinal) {
					final_transcript += event.results[i][0].transcript;
				} else {
					interim_transcript += event.results[i][0].transcript;
				}
			}

			// Choose which result may be useful for you

			console.log("Interim: ", interim_transcript);

			console.log("Final: ",final_transcript);

			console.log("Simple: ", event.results[0][0].transcript);
			$('#query').val(final_transcript);
			$('#es_op_form').submit();
		};

		recognition.start();		
	}
}
		  
$(document).ready(function() {
	
	var timer = setInterval(function() {
		voices = speechSynthesis.getVoices();
		console.log(voices);
		if (voices.length !== 0) {
			var msg = new SpeechSynthesisUtterance('Hello, I am Doctor Joy and I am here to help you.');
			msg.voice = voices[1];
			msg.lang = 'en-US';
			speechSynthesis.speak(msg);
			clearInterval(timer);
		}
	}, 200);
	
	var accessToken = $('#capi').val();
	if ($(window).width() < 600) {
		ebc_height1 = '79vh';
		ebc_height2 = '84vh';
	}
	$(window).on('resize', function(){
		if($(this).width() < 600){
		   ebc_height1 = '79vh';
		   ebc_height2 = '84vh';
		}
		else {
		   ebc_height1 = '63vh';
		   ebc_height2 = '68vh';
		}
	});

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
				window.speechSynthesis.cancel();
				enter_req();
				var par = document.getElementById('es_op_form');
				par.innerHTML = "";
				document.getElementById("es_body_content").style.height = ebc_height2;
            },
		}).done(function(data) {
			enter_res(data['result']['fulfillment']['speech']);
		}).fail(function() {
			alert('server unavailable!');
		});

		event.preventDefault();
	});
		
	window.setTimeout(function(){$('#query').val('start');$('#es_op_form').submit()}, 5000);
});