$(function() {

	function setLogin(cedula, pass) {
	    $.ajax({
	        url: urlAPI + "/login",
	        type: "POST",
	        dataType: 'JSON',
	        contentType: 'application/json',
	        data: JSON.stringify({cedula: cedula, pass: pass}),
	        success: function (res){
	        	localStorage.setItem('tokenGT', res.data.token);
	        	localStorage.setItem('userDataGT', JSON.stringify(res.data.userData));

	        	let dataUser = JSON.parse(localStorage.getItem('userDataGT'));
				let empresaSelect = [{id: 8, empresa: "LACAROLINA_GEMA"}];
				dataUser.empresas = empresaSelect;
				localStorage.setItem('userDataGT', JSON.stringify(dataUser));

	        	// ANIMACION ROTACION DE BODY
	        	$("body").addClass("classAnimationBodyLogin");
	        	setTimeout(function(){
					$(location).attr('href','views/app.html');	
				}, 3000);

	            return false;
	        },
	        error: function (res){
	        	swal.error(res.responseJSON.message);
	            return false;
	        }
	    });
    }
    
	$("#btnlogin").click(function(){

		if($("#inputCedula").val()==""){
			swal.error('Debe ingresar una cedula');
			return false;
		}

		if($("#inputPassword").val()==""){
			swal.error('Debe ingresar una contraseña');
			return false;
		}

		setLogin($("#inputCedula").val(), $("#inputPassword").val());			
	});

	$(window).resize(function(){
		if($(window).height() < 600){
			$("#footerLogin").addClass("displayNone");
		}else{
			$("#footerLogin").removeClass("displayNone");
		}
	});


});