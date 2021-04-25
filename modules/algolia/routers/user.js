import { sendJson } from '../helpers';

export default (apis) => {
  return async function getUserRoute(request, response, next) {
    const identity = request.identity;
    const userData = await apis.user.getById(identity);

    if (userData.status === 200) {
      return sendJson(userData.json, response);
    }

    const payload = makeUserPayload(identity);
    apis.user.create(identity, payload);
    sendJson(payload, response);
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
