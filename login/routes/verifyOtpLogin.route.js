export function verifyOtpLoginRoute(fastify, opts) {
    fastify.route(
        {
            method: "POST",
            url: "/",
            schema: {},
            preHandler: "cew",
            handler: "3"
        }
    );
};
