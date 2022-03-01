const jwt = require('jsonwebtoken');
let salt = 'hs09fghMHfas23ghH61g';
const users = global.db.users;

const authenticateUser = async (req, res, next) => {
    try {
        let headerToken;
        if (req && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');

            if (parts.length === 2) {
                const scheme = parts[0],
                    credentials = parts[1];

                if (/^Bearer$/i.test(scheme)) {
                    headerToken = credentials;
                }
            } else {
                return res
                    .status(message.BAD_REQUEST)
                    .send({ message: message.FORMAT_AUTHORIZATION_BEARER });
            }
        }
        if(headerToken) {
            const user = jwt.verify(
                headerToken, // The token to be verified
                salt, // The secret we used to sign it.
                {}, // Options, none in this case
            );

            if (user && user.id) {
                const tokenUser = await users.findOne({
                    where : {
                        id : user.id,
                        email : user.email
                    }
                });

                if (tokenUser && tokenUser.id) {
                    next();
                }
            } else {
                
            }
        }
    } catch (err) {
        console.log(err);
    } 
}

module.exports = {
    authenticateUser
}