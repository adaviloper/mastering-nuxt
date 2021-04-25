import userRouter from './routers/user';

export default function() {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/user', userRouter(algoliaConfig));
  })
}
