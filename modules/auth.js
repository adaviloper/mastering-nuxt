import cookie from 'cookie';
import { OAuth2Client } from 'google-auth-library';

export default function() {
  const authConfig = this.options.publicRuntimeConfig.auth;

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api', handler);
  });

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/admin', (request, response, next) => {
      response.spa = true;
      next();
    });
  });

  async function handler(request, response, next) {
    const idToken = cookie.parse(request.headers.cookie)[authConfig.cookieName];
    if (!idToken) {
      return rejectHit(response);
    }

    const ticket = await getUser(idToken);
    request.identity = {
      id: ticket.sub,
      email: ticket.email,
      name: ticket.name,
      image: ticket.picture,
    };
    next()
  }

  async function getUser(idToken) {
    const client = new OAuth2Client(authConfig.clientId);
    try {
      return (await client.verifyIdToken({
        idToken,
        audience: authConfig.clientId,
      })).getPayload();
    } catch (error) {
      console.error(error);
    }
  }

  function rejectHit(response) {
    response.statusCode = 401;
    response.end();
  }
}
