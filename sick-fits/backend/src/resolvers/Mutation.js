const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const Mutations = {
    async createItem(parent, args, ctx, info){
        //Todo: check if they are logged in
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);
        return item;
    },

    async deleteItem(parent, args, ctx, info){
        const where = {id: args.id};
        // (1) find the item
        const item = await ctx.db.query.item({where}, `{id title}`)
        // (2) check if they own that item or have the permissions
        // TODO
        // (3) delete it
        return ctx.db.mutation.deleteItem({where}, info)
    },

    updateItem(parent, args, ctx, info){
        //first take copy of hte updates
        const updates = {...args};
        // remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
            //info is how it knows what to return to us
        }, info);
    },

    async signUp(parent, args, ctx, info){
        const email     = args.email.toLowerCase();
        const password  = await bcrypt.hash(args.password, 32);

        const user      = await ctx.db.mutation.createUser({
            data: {
                ...args, 
                email, 
                password, 
                permissions: {set: ['USER']}
            }
        }, info)

        //create the JWT token for them
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly:   true,
            maxAge:     (1000 * 60 * 60 * 24 * 365) // 1 year cookie
        });
        // Finally we return the user to the browser
        return user;
    }
};

module.exports = Mutations;
