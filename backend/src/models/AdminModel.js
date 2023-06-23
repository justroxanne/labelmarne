const BaseModel = require ('./BaseModel')

class AdminModel extends BaseModel{
    constructor(){
        super('admins')
    }
};

module.exports = AdminModel;