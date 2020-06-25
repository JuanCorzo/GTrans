
var urlAPI = "http://192.190.42.212:3000";






var aggregatesRender = function (aggregates) {
	var value = aggregates['sum'];
	if( value == null){
	     value=0
	}
	var renderstring = '<div style="float: right; margin: 4px; overflow: hidden;"><b>' +   value  + '</b></div>';
	return renderstring;
}   

if ($(window).width() <= 530) {  
	var canvas = document.getElementsByClassName("chartResize");  
    if(canvas.length > 0) {
        canvas[0].height = 150;
    }
}     

function dateNow() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    return today;
}

function timeNow() {
    var now = new Date();
    var hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
    var minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    var time = hours + ':' + minutes;
    return time;
}

function imagenRumbo(rumbo, idEvento, enruta, ruta, velocidad) {
    var url = '../images/markers/';
    var imagen = "";
    if (velocidad >= 50) {
        return url + 'otros/excesoVelocidad.svg';
    }
    if(rumbo == 0){
        return  url + 'otros/pausado.svg';
    }
    if(velocidad == 0){
        return  url + 'otros/pausado.svg';
    }

    if (idEvento == 1) {
        return  url + 'otros/pausado.svg';
    } else if (rumbo > 315 || (rumbo >= 0 && rumbo <= 45))
    {
        imagen = url + 'SinRuta/1.svg';
    } else if (rumbo > 45 && rumbo <= 135)
    {
        imagen = url + 'SinRuta/3.svg';
    } else if (rumbo > 135 && rumbo <= 225)
    {
        imagen = url + 'SinRuta/2.svg';
    } else if (rumbo > 225 && rumbo <= 315)
    {
        imagen = url + 'SinRuta/4.svg';
    }

    return imagen;
}

function CoordenadasKml(kml) {
    var result = [];            
    var coords = kml.getElementsByTagName('coordinates');
    var points = coords[0].textContent.trim().split(',0');
    var latLog = new Array();
    for (var i=0;i<points.length-1;i++) {                                
        latLog.push({lat:  parseFloat(  points[i].split(',')[1]), lng:  parseFloat(  points[i].split(',')[0])})                                  
    }        
    var flightPath = new google.maps.Polyline({
        path: latLog,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    return flightPath
}

/* ALERTAS Y MENSAJES */

var toast = {
    type: null,
    success: function(msg) {
        this.type = "success";
        this.launch(msg);
    },
    error : function(msg) {
        this.type = "error";
        this.launch(msg);
    }, 
    question : function(msg) {
        this.type = "question";
        this.launch(msg);
    }, 
    warning : function(msg) {
        this.type = "warning";
        this.launch(msg);
    },
    launch: function(msg){
        Swal.fire({title: msg, icon: this.type, toast: true, position: "top-end", 
                    timer: 3000, timerProgressBar: true, showConfirmButton: false,
        });
    }
}

var swal = {
    type: null,
    success: function(msg, title = "Perfecto!") {
        this.type = "success";
        this.launch(msg, title);
    },
    error : function(msg, title = "Oops...") {
        this.type = "error";
        this.launch(msg, title);
    }, 
    question : function(msg, title = "Informacion") {
        this.type = "question";
        this.launch(msg, title);
    }, 
    warning : function(msg, title = "Cuidado!") {
        this.type = "warning";
        this.launch(msg, title);
    },
    launch: function(msg, title){
        Swal.fire({title: title, text: msg, icon: this.type, width: "15em"});
    }
}

