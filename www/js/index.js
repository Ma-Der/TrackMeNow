/*
const mql = window.matchMedia('(max-width: 1024px)');
const handleMediaChange = (mediaQueryList) => {
  if(mediaQueryList.matches) {
    console.log('Finally its tablet')
  } else {
    throw new Error("It's for mobile devices and tablets only.");
  }
}
mql.addListener(handleMediaChange);
handleMediaChange(mql);

*/

const offBtn = document.getElementById('offBtn');
const startData = document.getElementById('start-data');
const startCoordinates = document.getElementById('start-coordinates');
const currentData = document.getElementById('current-data');
const currentCoordinates = document.getElementById('current-coordinates');

let map, infoWindow, currMark;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53, lng: 24 },
    zoom: 15,
  });
  function addMarker(options) {
    const marker = new google.maps.Marker(options);
    return marker;
  }

  const getLocation = (str) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startData.innerHTML = new Date(position.timestamp);
      startCoordinates.innerHTML = JSON.stringify(pos);
      infoWindow.open(map);
      map.setCenter(pos);
      addMarker({position: pos, map: map, label: str});
      currMark = addMarker({position: pos, map: map, label: 'Cur'});
    }, () => handleLocationError(true, infoWindow, map.getCenter()));
  }
  getLocation('Start');
  
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => { 
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        infoWindow.open(map);
        currMark.setPosition(new google.maps.LatLng(pos))
        map.panTo(pos);
        currentData.innerHTML = new Date(position.timestamp);
        currentCoordinates.innerHTML = JSON.stringify(pos);
    });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


function geoOff() {
  
  navigator.permissions.query({name: 'geolocation'}).then(function(result) {
    if(window.confirm('Currenly geolocation is: ' + result.state + '\n if you want to turn it on/off click "ok" and you will be redirected to info what to do to turn it on/off.')) {
      window.open('https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DDesktop&oco=1', '_blank');
    }

  })
}

offBtn.addEventListener('click', () => geoOff());