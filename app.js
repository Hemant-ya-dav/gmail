const nodemailer = require('nodemailer')
const {google} = require ('googleapis')

const CLIENT_ID ='71974316492-sotsucab1rg101guhulfvl8cltt5oh3e.apps.googleusercontent.com'
const CLIENT_SECRET ='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'
const REDIRECT_URI ='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04DhSg96SydRoCgYIARAAGAQSNwF-L9Ir1muBQ2VU4hZ9RZEHKJ7h3USKwae7F58TauLpIYUd_bj8eVjvsO-4dFWEfqrkQp_XlZ4';

const oAuth2Client =new  google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(){

 try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
            type :'oauth2',
            user:'hemant1062002@gmail.com',
            clientId : CLIENT_ID,
            clientSecret : CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

  const mailOptions ={
      from :'hemant1062002@gmail.com',
      to : 'thisishemantyadav@gmail.com',
      subject : 'hello hemant how are you?',
      text: 'hello my best friend ',
      html: '<h1> hello hemant how are you?</h1>',
  };

  const result= await transport.sendMail(mailOptions)
  return result


 } catch (error) {
     return error
 }

}

sendMail().then(result=> console.log('Email sent....',result))
.catch((error)=>console.log(error.message));