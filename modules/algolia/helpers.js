export const getHeaders = (algoliaConfig) => {
  return {
    "X-Algolia-API-Key": algoliaConfig.apiKey,
    "X-Algolia-Application-Id": algoliaConfig.appId
  };
}

export const sendJson = (data, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(data));
}
