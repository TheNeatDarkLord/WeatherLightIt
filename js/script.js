$("#get-weather").click(function () {
var mistake = 0;
var city = $("#city").val();
var date = $("#datepicker").val();

    if ($("#city").val() == "")
    {
       $("#mistake1").show();
       mistake = 1;
    }
    else{
    	$("#mistake1").hide();
        $("#cite").html(city+" на карте");
    }

     if ($("#datepicker").val() == "")
    {
       $("#mistake2").show();
       mistake = 1;
    }
    else{
    	$("#mistake2").hide();
        $("#weath").html("Погода в "+city+" на "+date);
    }

var daters = $("#datepicker").val();

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = dd + '.' + mm + '.' + yyyy;

    var width = 0;
    if (self.screen) {
        width = screen.width
    }
    if (mistake == 0) {
        $.ajax({
        type: "POST",
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $("#city").val() + "&appid=8877707839064c9331f975ece3ad7cc6&units=metric&lang=ru",
        dataType: "json",
        success: function (result, status, xhr) {
            var i = parseInt(daters) - parseInt(today);
                    var elem = result.list[i];

                    console.log(result);

                             $("#myimage").attr("src","http://openweathermap.org/img/w/" + elem.weather[0].icon +".png"); 
                             $("#myimage1").attr("src","http://openweathermap.org/img/w/" + elem.weather[0].icon +".png"); 
                             $("#myimage2").attr("src","http://openweathermap.org/img/w/" + elem.weather[0].icon +".png"); 
                             $("#myimage3").attr("src","http://openweathermap.org/img/w/" + elem.weather[0].icon +".png"); 

                             $("#weather .col-md-3 #temp").html(elem.temp.morn + "°C");
                             $("#weather .col-md-3 #temp1").html(elem.temp.day + "°C");
                             $("#weather .col-md-3 #temp2").html(elem.temp.eve + "°C");
                             $("#weather .col-md-3 #temp3").html(elem.temp.night + "°C");

                             $("#weather .col-md-3 #descr").html(elem.weather[0].description);
                             $("#weather .col-md-3 #descr1").html(elem.weather[0].description);
                             $("#weather .col-md-3 #descr2").html(elem.weather[0].description);
                             $("#weather .col-md-3 #descr3").html(elem.weather[0].description);

                            $.each($('#weather .col-md-3'), function(i, el){
                            $(el).css({'opacity':0});
                            $(el).css({'display':'block'});
                            setTimeout(function(){
                                $(el).animated("zoomIn", "flipOutX");
                                },200 + ( i * 200 ));});
                    },
                    error: function (xhr, status, error) {
                        alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                    }
                });     
    }
    else{return;}
});


$(function() {
    $(document).keydown(function(e) {
        switch (e.which) {
            case 13: // up key
                $("#get-weather").click();
                break;
        }
    });
});