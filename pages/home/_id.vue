<template>
  <div>
    <PropertyGallery :images="home.images"/>
    <PropertyDetails :home="home"/>
    <PropertyDescription :home="home"/>
    <PropertyMap :home="home"/>
    <PropertyReviews :reviews="reviews"/>
    <PropertyHost :user="user"/>
  </div>
</template>

<script>
import ShortText from '@/components/ShortText';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyDescription from '@/components/PropertyDescription';
import PropertyMap from '@/components/PropertyMap';
import PropertyReviews from '@/components/PropertyReviews';
import PropertyHost from '@/components/PropertyHost';
import shortDate from '@/utils/shortDate';

export default {
  components: {
    PropertyDescription,
    PropertyDetails,
    PropertyGallery,
    PropertyMap,
    PropertyReviews,
    PropertyHost,
    ShortText,
  },

  head() {
    return {
      title: this.home.title,
    };
  },

  async asyncData({
    params,
    $dataApi,
    error,
  }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);

    if (badResponse) {
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });
    }

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },

  methods: {
    shortDate,
  },
};
</script>

<style scoped>

</style>
