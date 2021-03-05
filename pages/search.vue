<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title">Stays in {{ label }}</h2>
        <nuxt-link
            v-for="home in homes"
            :key="home.objectID"
            :to="`/home/${home.objectID}`"
        >
          <HomeRow
              :home="home"
              @mouseover.native="hightlightMarker(home.objectID, true)"
              @mouseout.native="hightlightMarker(home.objectID, false)"
          />
        </nuxt-link>
      </div>
      <div class="app-search-results-map">
        <div class="app-map" ref="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeRow from '@/components/HomeRow';
export default {
  components: {HomeRow},
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },
  mounted() {
    this.updateMap();
  },
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng);
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.updateMap();
    next();
  },

  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    }
  },

  methods: {
    hightlightMarker(homeId, isHighlighted) {
      document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted);
    },
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers());
    },

    getHomeMarkers() {
      if (this.homes.length === 0) {
        return null;
      }
      return this.homes.map(home => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        };
      });
    },
  },
}
</script>

<style>
.marker {
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 20px;
  font-weight: bold;
  padding: 5px 8px;
}

.marker-highlight {
  background-color: black;
  border-color: black;
  color: white !important;
}
</style>
