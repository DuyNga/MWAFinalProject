const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const SUBJECT = "Inviation For Computer Science Exam";

dotenv.config();
const {
    USER_EMAIL: userEmail,
    PASS_EMAIL: password
} = process.env;
const Invitation = db.Invitation;

module.exports = {
    sendEmail,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updateStatus
};

async function sendEmail(invitationParam) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userEmail,
            pass: password
        }
    });
    let mailOptions = {
        from: userEmail,
        to: invitationParam.email,
        subject: SUBJECT,
        text: invitationParam.link
    };
    return await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        }
    });

}

async function getAll() {
    return await Invitation.find();
}

async function getById(id) {
    return await Invitation.findById(id);
}

async function create(invitationParam) {
    // validate
    if (await Invitation.findOne({ invitation: invitationParam.token })) {
        throw 'This invitation is already registed';
    }

    const invitation = new Invitation(invitationParam);

    // save invitation
    await invitation.save((function (_id) {
        return function () {
          console.log(_id);
          return _id;
          // your save callback code in here
        };
      })(invitation._id));
}

async function update(id, invitationParam) {
    const invitation = await Invitation.findById(id);

    // validate
    if (!invitation) throw 'Invitation not found';
    if (invitation.token !== invitationParam.token && await Invitation.findOne({ invitation: invitationParam.token })) {
        throw 'This invitation is already registed';
    }

    // copy invitationParam properties to invitation
    Object.assign(invitation, invitationParam);

    await invitation.save();
}

async function _delete(id) {
    await Invitation.findByIdAndRemove(id);
}

async function updateStatus(id, invitationParam) {
    const invitation = await Invitation.findById(id);
    console.log(invitation);
    // validate
    if (!invitation) throw 'Invitation not found';
 
    if(invitation.status==='Deactive'){
       invitation.status ='Active';
    }else{
        invitation.status ='Deactive';
    }

    await invitation.save();
}