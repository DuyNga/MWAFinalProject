const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updateStatus
};

async function authenticate({ userName, password }) {
    const user = await User.findOne({ userName });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ user: userWithoutHash }, config.secret,{
            expiresIn:86400
        });
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ userName: userParam.userName })) {
        throw 'userName "' + userParam.userName + '" is already taken';
    }
    
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.userName !== userParam.userName && await User.findOne({ userName: userParam.userName })) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function updateStatus(id, userParam) {
    const user = await User.findById(id);
    console.log(user);
    // validate
    if (!user) throw 'User not found';
 
    if(user.status==='active'){
       user.status ='deactive';
    }else{
        user.status ='active';
    }

    await user.save();
}

  