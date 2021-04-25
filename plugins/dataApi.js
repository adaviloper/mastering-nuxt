import { unWrap, getErrorResponse } from '~/utils/fetchUtils';

export default function (context, inject) {
  const APP_ID = context.env.algolia.appId;
  const API_KEY = context.env.algolia.apiKey;

  const headers = {
    "X-Algolia-API-Key": API_KEY,
    "X-Algolia-Application-Id": APP_ID
  };

  inject('dataApi', {
    getHome,
    getHomesByLocation,
    getReviewsByHomeId,
    getUserByHomeId,
  })

  async function getHome(homeId) {
    try {
      return unWrap(await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }));
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/reviews/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: [],
        })
      }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unWrap(await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/users/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          attributesToHighlight: [],
        })
      }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      return unWrap(await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/homes/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: radiusInMeters,
          attributesToHighlight: [],
          hitsPerPage: 10,
        })
      }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
