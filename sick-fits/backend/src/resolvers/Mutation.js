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
    }
};

module.exports = Mutations;
