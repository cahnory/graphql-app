import Middleware from 'node-sass-middleware';

export default function (options) {
    let middleware = Middleware(options);
    return function *(next) {
        yield middleware.bind(middleware, this.req, this.res);
        yield next;
    };
};