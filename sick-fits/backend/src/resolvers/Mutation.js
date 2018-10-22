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

    async deleteItem(parent, args, ctx, info){
        const where = {id: args.id};
        // (1) find the item
        const item = await ctx.db.query.item({where}, `{id title}`)
        // (2) check if they own that item or have the permissions
        // TODO
        // (3) delete it
        return ctx.db.mutation.deleteItem({where}, info)
    }
};

module.exports = Mutations;
