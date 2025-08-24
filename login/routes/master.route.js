export function masterRoute(fastify,opts) {
    fastify.register(import('./session.route.js'), { prefix: '/login' });
    fastify.register(import('./mfa.route.js'), { prefix: '/multifactorauthentication' });
    fastify.register(import('./password.route.js'), { prefix: '/twofactorAuthentication' });
    fastify.register(import('./user.route.js'), { prefix: '/verifyotplogin' });
}