export default function (context, inject) {
  const APP_ID = context.env.algolia.appId;
  const API_KEY = context.env.algolia.apiKey;

  const headers = {
    "X-Algolia-API-Key": API_KEY,
    "X-Algolia-Application-Id": APP_ID
  };

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
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

  async function unWrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
