const nodemailer = require("nodemailer");
var GUSER = "busxpress4@gmail.com";
var GPASS = "kjmhxdngwvwfzjqu";
var apih = 'http://localhost';

const controllers = {};


controllers.verificaremail = async function(email,nom,id) {
  try {
    var linkverif = apih + `/views/users/verificaremail.html?inf=${id}`;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: GUSER, // generated ethereal user
        pass: GPASS, // generated ethereal password
      },
    });
    
    var mailoptions = {
      from: 'BUSXPRESS', // sender address
      to: `${email}`, // list of receivers
      subject: "Verficación de cuenta.", // Subject line
      html: `
      <body>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
  
          <div style="background-color: white; color: black; text-align: center;">
              <h1 style="color: #007bff;">BUSXP</h1>
              <p style="font-size: 18px; font-weight: 600;">
              Bienvenido ${nom} a formar parte de nuestro servicios BUSXP, porfavor verifíca tu cuenta presionando el boton de "verificar correo".</p>
              <a href="${linkverif}" style="text-decoration: none; color: black; font-size: 22px; font-weight: 600; background-color: #007bff; color: white;  border: 5px #007bff; border-radius: 5px;">VERIFICAR CORREO</a>
          </div>
  
      </body>
      ` // html body
      }
  
    // send mail with defined transport object
      transporter.sendMail(mailoptions);
  } catch (error) {
    console.error(error)
  }

}

controllers.emailrecordatorio = async function(emails) {
  try {
    for(var i=0; i < emails.length; i++){
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: GUSER, // generated ethereal user
          pass: GPASS, // generated ethereal password
        },
      });
      
      var mailoptions = {
        from: 'BUSXPRESS', // sender address
        to: `${emails[i].email}`, // list of receivers
        subject: "Recordatorio.", // Subject line
        html: `
        <body>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    
            <div style="background-color: white; color: black; text-align: center;">
                <h1 style="color: #007bff;">BUSXP</h1>
                <p style="font-size: 18px; font-weight: 600;">
                  Hey! Recuerda llegar a tiempo para que puedas abordar tu viaje sin ningún problema. 😄
                </p>
            </div>
    
        </body>
        ` // html body
        }
    
      // send mail with defined transport object
      transporter.sendMail(mailoptions);
    }
  } catch (error) {
    console.error(error)
  }

}

controllers.emailrecordatorio = async function(emails,msg) {
  try {
    for(var i=0; i < emails.length; i++){
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: GUSER, // generated ethereal user
          pass: GPASS, // generated ethereal password
        },
      });
      
      var mailoptions = {
        from: 'BUSXPRESS', // sender address
        to: `${emails[i].email}`, // list of receivers
        subject: "¡Aviso importante!.", // Subject line
        html: `
        <body>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    
            <div style="background-color: white; color: black; text-align: center;">
                <h1 style="color: #007bff;">BUSXP</h1>
                <p style="font-size: 18px; font-weight: 600;">
                  ${msg}
                </p>
            </div>
        </body>
        ` // html body
        }
    
      // send mail with defined transport object
      transporter.sendMail(mailoptions);
    }
  } catch (error) {
    console.error(error)
  }

}

module.exports = controllers;

