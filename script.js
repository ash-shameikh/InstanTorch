function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    const locateButton = document.getElementById("locate");
    locateButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "You are here",
                });
            }, () => {
                handleLocationError(true, map.getCenter());
            });
        } else {
            handleLocationError(false, map.getCenter());
        }
    });

    const searchButton = document.getElementById("searchBtn");
    searchButton.addEventListener("click", () => {
        const address = document.getElementById("search").value;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                map.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    });
}

function handleLocationError(browserHasGeolocation, pos) {
    new google.maps.InfoWindow({
        content: browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    }).open(map);
}

window.onload = initMap;
