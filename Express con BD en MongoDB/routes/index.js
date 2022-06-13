var express = require('express');
var router = express.Router();
const users = require("../usersData");
var methods = require("../methods");
var save_control = require('../saveControl')
const User = require('../models/user');
const async = require('hbs/lib/async');

const registerPage = "../views/users/register";
const loginPage = "../views/users/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/home', function(req, res) {
  if(req.user){
    res.render(
      'home',
      {title:"bienvenido",userName:req.user.fullName}
      )
  }else{
    res.render(loginPage,{
      message:"inicie session para continuar",
      messageClass:'alert-danger'
    })
  }
  
  //res.render('home');
});
router.get('/login', (req, res) => {
  res.render(loginPage);
});
router.get('/register', (req, res) => {
  res.render(registerPage);
});

router.post('/register', async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  try{
    //validar
  if ( password === confirmPassword) {
    
    /*
    //validar si el correo existe
    if (users.data.find(u => u.email === email)) {
      res.render(registerPage, {
        message: "El usuario ya esta registrado",
        messageClass: "alert-danger"
      });
    }
    const phash = methods.getHashedPassword(password);

    //almacenar los datos
    
    users.data.push({
      fullName,
      email,
      password: phash
    });
    
    save_control.escribir(fullName,email,phash)
    res.render(loginPage, {
      message: "Registro Completo. Inicie sesion",
      messageClass: "alert-success"
    });
    */
    //validad si el correo existe
    user = await User.findOne({email:email})
    .then(user => {
      if(user){
        res.render(registerPage, {
          message: "El usuario ya esta registrado",
          messageClass: "alert-danger"
        });
      }
      else{
        const hashedPassword = methods.getHashedPassword(password)
        const userDB = new User({
          'fullName':fullName,
          'email':email,
          'password':hashedPassword
                })
          
        userDB.save()
        res.render(loginPage, {
          message: "Registro Completo. Inicie sesion",
          messageClass: "alert-success"
        });
      }
    })





  } else {
    res.render(registerPage, {
      message: "Las contraseñas no coinciden",
      messageClass: "alert-danger"
    });
  }
  }
  catch{

  }
  
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = methods.getHashedPassword(password);
  
  //validar que los datos coincidan
  
  user = await User.findOne(
    {email:email,
      password:hashedPassword
    })
  .then(user =>{
    if(user) {
      const authToken = methods.generateToken();
      //almacenar token de autenticacion
      methods.authTokens[authToken] = user;
      res.cookie('AuthToken', authToken);
      res.redirect('/home');
    } else {
      res.render(loginPage, {
        message: "El usuario o clave no coinciden",
        messageClass: "alert-danger"
      });
    }
  })
  /*
  const dataUser = users.data.find(u => {
    var a = u.email === email && hashedPassword === u.password; 
    //console.log(a)
    return a
  });
  */


});

router.get('/logout',(req,res)=>{
  res.clearCookie('AuthToken')
  return res.redirect('/')
})
module.exports = router;
