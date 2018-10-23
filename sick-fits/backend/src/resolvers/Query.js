const {forwardTo} = require('prisma-binding');

const Query = {
    items:              forwardTo('db'),
    item:               forwardTo('db'),
    itemsConnection:    forwardTo('db'),
    me(parent, args, ctx, info){
        return (ctx.request.userId) ? ctx.db.query.user({where: {id: ctx.request.userId}}, info) : null;
    }
};

module.exports = Query;