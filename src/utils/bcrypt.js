const bcrypt = require('bcrypt')


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
 

const comparePassword = async (password, hash) => {
    const response = bcrypt.compareSync(password, hash); 
    return response; 
}

module.exports = {
    hashPassword,
    comparePassword
}