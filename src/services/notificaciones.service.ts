import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');
var twilio = require('twilio');



@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   *  envio del correo electronico
   */

  EnviarCorreoElectronico(destino: string, asunto: string, contenido: string) {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino,
      from: llaves.origenCorreoElectronico,
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }
  /**
  * Enviar mensaje de texto al celular del usuario
  */
  EnviarNotificacionPorSMS(telefono: string, contenido: string) {
    var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
    var authToken = process.env.TWILIO_TK;   // Your Auth Token from www.twilio.com/console

    var client = new twilio(accountSid, authToken);

    client.messages.create({
      body: contenido,
      to: telefono,
      from: llaves.twilioPhone
    })
      .then((message: any) => console.log(message.sid));
  }

}




