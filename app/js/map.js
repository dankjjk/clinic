ymaps.ready(init);

var placemarks = [
	{
		latitude: 62.03444742,
		longitude: 129.74793831,
	},

	{
		latitude: 62.03562644,
		longitude: 129.75611368,
	},

	{
		latitude: 62.03334390,
		longitude: 129.74476114,
	}
];

function init() {
	var map = new ymaps.Map("map", {
		center: [62.03425171, 129.74900556],
		zoom: 16,
		controls: ['zoomControl'],
		behaviors: ['drag']
	});

	placemarks.forEach(function(obj) {
		var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {

		},
		{
			// iconLayout: 'default/image'
		});

		map.geoObjects.add(placemark);
	});

	map.geoObjects.add(cluster);
}