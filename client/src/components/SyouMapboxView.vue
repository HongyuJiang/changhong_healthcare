<template>
  <div id="map"></div>
</template>

<script>
import DataProvider from '../DataProvider';
import * as mapboxgl from 'mapbox-gl';

export default {
  name: 'mapbox-view',

  mounted() {
    this.map = ''
    this.mapInit(this);
    this.mapLoadGeojson(this);

    this.$root.$on('addAIcon', () => {
      this.mapAddIcon()
    })
    
  },
  methods: {

    addRegion2Map(features){

      this.map.addSource("region_json", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": features.features
        },
      })

      this.map.addLayer({
        "id": "region",
        "type": "fill",
        "source": "region_json",
        "paint": {
            "fill-color": "#fff",
            "fill-opacity": 0.1
        },
        minzoom: 7,
        maxzoom: 10,
      });

      this.map.addLayer({
        "id": "region_boundry",
        "type": "line",
        "source": "region_json",
        "paint": {
            'line-width': 1.5,
            'line-color': "black",
        },
        minzoom: 7,
        maxzoom: 10,
      });

      this.map.addLayer({
        "id": "region-label",
        "type": "symbol",
        "source": "region_json",
        "layout": {
          "text-field": "{name}",
          "text-size": 12,
         
        },
        "paint": {

           "text-color": '#fff'
        }
    });
    },
     addCounty2Map(features){

      this.map.addSource("town_json", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": features.features
        },
      })

      this.map.addLayer({
        "id": "county-overlay",
        "type": "fill",
        "source": "town_json",
        "paint": {
            "fill-color": "#fff",
            "fill-opacity": 0.1
        },
        minzoom: 10,
        maxzoom: 20,
      });

      
      this.map.addLayer({
        "id": "county-outline",
        "type": "line",
        "source": "town_json",
        "paint": {
            'line-width': 1,
            'line-color': "#000",
            'line-opacity': 1,
        },
        minzoom: 9,
        maxzoom: 20,
      });


      this.map.addLayer({
          "id": "county-label",
          "type": "symbol",
          "source": "town_json",
          "layout": {
            "text-field": "{name}",
            "text-size": 12,
          },
          "paint": {
            "text-color": '#fff'
          },
          minzoom: 9,
          maxzoom: 20,
      });
    },
    
    mapInit(that){
      mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3l1amlhbmciLCJhIjoiY2o1Y2VldHpuMDlyNTJxbzh5dmx2enVzNCJ9.y40wPiYB9y6qJE6H4PrzDw';
      this.map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/hongyujiang/cjl1ya0sn4m0m2sqj0pbkuqor', // stylesheet location
          center: [104.737877,31.457893], // starting position [lng, lat]
          zoom: 8 // starting zoom
      });

    },
    mapLoadGeojson(that){

    this.map.on('load', function(){

           DataProvider.getRegionJson().then(response => {
              
                that.data = response.data;
                that.addRegion2Map(that.data)

              }, error => {
                that.loading = false;
                //console.error(error);
            });

            DataProvider.getCountyJson().then(response => {
              
                that.data = response.data;
                that.addCounty2Map(that.data)

              }, error => {
                that.loading = false;
                //console.error(error);
            });
      })
    },
    mapAddIcon(){

      this.map.addLayer({
        "id": "wudu",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [104.783758,31.891391]
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "cafe-15"
        }
      });

    }
  },

   data() {
      return {
        data: [],
        loading: true,
       };
    },

};
</script>

<style lang="css">

div #map { 
    position:absolute; 
    width:100%; 
    height:100%;
}

body { margin:0; padding:0; }

</style>