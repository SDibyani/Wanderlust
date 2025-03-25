
  //  mapboxgl.accessToken=mapToken;
      
  //     const map = new mapboxgl.Map({
  //       container: "map",
  //       style: "mapbox://styles/mapbox/streets-v12",
  //       // center:listing.geometry.coordinates,//longitude,latitude
  //       center: [listing.lng, listing.lat], // Longitude, Latitude
  //       zoom: 10, // Zoom level
  //       zoom: 9,
  //     });

  //   console.log(coordinates);

  //     const marker= new mapboxgl.Marker({color:"red"})
  //     .setLngLat(listing.geometry.coordinates)
  //     .setPopup(new mapboxgl.Popup({offset:25})
  //     .setHTML(`<h4>${listing.location}</h4> <p>Exact Location provided after booking</p>`))
  //     .addTo(map);
 



  mapboxgl.accessToken = mapToken;

if (listing.geometry && listing.geometry.coordinates) {
  const [longitude, latitude] = listing.geometry.coordinates;
  const mapCenter = {
    longitude: longitude,
    latitude: latitude,
};

if (isNaN(mapCenter.longitude) || isNaN(mapCenter.latitude)) {
  console.error(`Invalid map center: longitude=${mapCenter.longitude}, latitude=${mapCenter.latitude}`);
  // Provide default values or handle the error appropriately
  mapCenter.longitude = 0;
  mapCenter.latitude = 0;
}

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    // center: listing.geometry.coordinates, // Longitude, Latitude
    // center: [longitude, latitude],
    center: [mapCenter.longitude, mapCenter.latitude],
    zoom: 9, // Zoom level
  });

  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h4>${listing.title}</h4> <p>Exact Location provided after booking</p>`
      )
    )
    .addTo(map);
} else {
  console.error("Geometry or coordinates are missing for this listing.");
}