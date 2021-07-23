const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
         const verified = bcrypt.compareSync(password, users[i].passwordHash)
         if (verified) {
           let userToReturn = {...users[i]}
           delete userToReturn.passwordHash
          res.status(200).send(userToReturn)
          return
        }
      res.status(400).send("User not found.")
      
      }
    }
    },
    
    register: (req, res) => {
        console.log('Registering User')
        const { username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(password, salt)

           let userObj = {
            username,
            email,
            firstName,
            lastName,
            password: passwordHash,}

          users.push(userObj)
          let userToReturn ={...userObj}
          delete userToReturn.passwordHash
          res.status(200).send(userToReturn)
          console.log(userToReturn)
          
        }

    }  

//for(i = 0;i < users.length;i++){
  // const existing = bcrypt.compareSync(password, users[i].passwordHash)
  //  let userObj = {
    // username,
    // email,
    // firstName,
    // lastName,
    // password: passwordHash,
    // confirmPassword: passwordHash