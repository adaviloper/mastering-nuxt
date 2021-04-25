import fetch from 'node-fetch';
import {
  getErrorResponse,
  unWrap,
} from '../../../utils/fetchUtils';
import {
  getHeaders,
  sendJson,
} from '../helpers';

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig)
  return async function getUserRoute(request, response, next) {
    const identity = request.identity;
    const userData = await getUserById(identity);

    if (userData.status === 200) {
      return sendJson(userData.json, response);
    }

    createUser(identity);
    sendJson(makeUserPayload(identity), response);
    next();
  }

  async function createUser(identity) {
    try {
      return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
        headers,
        method: 'PUT',
        body: JSON.stringify(makeUserPayload(identity))
      }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserById(identity) {
    try {
      return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
        headers,
      }));
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  function makeUserPayload(identity) {
    return {
      name: identity.name,
      email: identity.email,
      image: identity.image,
      homeId: [],
      reviewCount: 0,
      description: '',
      joined: new Date().toISOString(),
    };
  }
}
