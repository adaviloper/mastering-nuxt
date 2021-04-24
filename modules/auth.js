import cookie from 'cookie';

export default function() {
  const authConfig = this.options.publicRuntimeConfig.auth;

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api', handler);
  });
  function handler(request, response, next) {
    const idToken = cookie.parse(request.headers.cookie)[authConfig.cookieName];
    console.log('auth.js@handler:10', request.originalUrl);
    console.log(idToken);
    next()
  }
}
