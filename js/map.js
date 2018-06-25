    //<![CDATA[
    var map;
    var point;

    function initialize() {
        //создаем объект для работы с картой
        map = new GMap2(document.getElementById("map_canvas"));
        if (GBrowserIsCompatible()) {
            //устанавливаем координаты и начальное приближение
            map.setCenter(new GLatLng(50.453629, 30.502838), 8);
            //добавляем шкалу зума
            map.addControl(new GLargeMapControl());
            //добавляем переключатель типа карт (Карта, Спутник, Гибрид)
            map.addControl(new GMapTypeControl());
            //указываем тип карты по-умолчанию (Спутник)

        }
    }
    
    //этот объект используется для определения координат
    var geocoder = new GClientGeocoder();
    
    function getAdress() {
        var address = document.getElementById("city").value;
        $("#map").show();
        geocoder.getLatLng(
            address,
            function(point) {
                if (!point) {
                    // alert(address + " не найден!");
                    $("#map").hide();
                } else {
                    geocoder.getLocations(address, addAdr);
                }
            }
        );
    }
    
    function addAdr(response) {
        //удаляем слои, если они есть
        map.clearOverlays();
        if (!response || response.Status.code != 200) {
            alert("\"" + address + "\" не найден");
        } else {
            //создаем объект типа GLatLng и надпись
            place = response.Placemark[0];
            point = new GLatLng(place.Point.coordinates[1],
                               place.Point.coordinates[0]);
            marker = new GMarker(point);

            map.setCenter(new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]), 8);
            //размещаем надпись на карте
            map.addOverlay(marker);
            //добавляем текст на надпись
            marker.openInfoWindowHtml(place.address + '<br />' + 
                'Широта: ' + place.Point.coordinates[1] + '<br />' +
                'Долгота: ' + place.Point.coordinates[0]);
        }  
    }
    //]]>