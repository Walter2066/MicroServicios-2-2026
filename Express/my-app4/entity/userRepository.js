const { User } = require("./User");

function createUserRepository(AppDataSource) {
    return AppDataSource.getRepository(User).extend({
        async findByName(name) {
            return this.findBy({ name });
        }
    });
}

module.exports = { createUserRepository };