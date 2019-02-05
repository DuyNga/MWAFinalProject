const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Invitation = db.Invitation;

module.exports = {
    getRandom,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getRandom(){
    return await Invitation.aggregate().sample(3);
      
}

async function getAll() {
    return await Invitation.find();
}

async function getById(id) {
    return await Invitation.findById(id);
}

async function create(invitationParam) {
    // validate
    if (await Invitation.findOne({ invitation: invitationParam.invitation })) {
        throw 'This invitation is already registed';
    }

    const invitation = new Invitation(invitationParam);

    // save invitation
    await invitation.save();
}

async function update(id, invitationParam) {
    const invitation = await Invitation.findById(id);

    // validate
    if (!invitation) throw 'Invitation not found';
    if (invitation.invitation !== invitationParam.invitation && await Invitation.findOne({ invitation: invitationParam.invitation })) {
        throw 'This invitation is already registed';
    }

    // copy invitationParam properties to invitation
    Object.assign(invitation, invitationParam);

    await invitation.save();
}

async function _delete(id) {
    await Invitation.findByIdAndRemove(id);
}