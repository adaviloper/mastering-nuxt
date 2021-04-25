export const getHeaders = (algoliaConfig) => {
  return {
    "X-Algolia-API-Key": algoliaConfig.apiKey,
    "X-Algolia-Application-Id": algoliaConfig.appId
  };
}
