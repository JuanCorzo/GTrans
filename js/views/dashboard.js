$(function() {

    const dataUser = JSON.parse(localStorage.getItem('userData'));


    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';


    function getSumTimbradas() {
        $.ajax({
            url: urlAPI + "/viajes/getSumTimbradasByCarro/"+dataUser.idPropietario,
            type: "GET",
            dataType: 'JSON',
            contentType: 'application/json',
            beforeSend: function (xhr){ 
                xhr.setRequestHeader('Authorization', localStorage.getItem('token')); 
            },
            success: function (res){
                var rtn = {name: [], data: []};
                $.each(res.data, function(key, value) {
                    rtn.name.push(value.Codigo);
                    rtn.data.push(value.timbradas);
                });
                cargarGrafica(rtn);
                return false;
            },
            error: function (res){
                swal.error(res.responseJSON.message);
                return false;
            }
        });
    }

    function cargarGrafica(data){
        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
              labels: data.name,
              datasets: [{
                label: 'Timbradas',
                backgroundColor: "#007BFF",
                borderColor: "#007BFF",
                borderWidth: 1,
                data: data.data
              }]
            },
            options: {
              elements: {
                rectangle: {
                  borderWidth: 2,
                }
              },
              responsive: true,
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Consolidado ventas por vehiculo'
              }
            }
        });
    }

    
    getSumTimbradas();


});