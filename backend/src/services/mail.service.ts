import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendOrderConfirmationEmail(
  email: string,
  firstName: string,
  orderNumber: string
) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Confirmation de votre commande GreenRoots',
    html: `
      <h1>Merci ${firstName} 🌱</h1>

      <p>
        Votre commande <strong>${orderNumber}</strong> a bien été enregistrée.
      </p>

      <p>
        Merci de participer au reboisement avec GreenRoots.
      </p>

      <p>
        À bientôt sur GreenRoots !
      </p>
    `,
  });
}

export async function sendRegistrationConfirmationEmail(
  to: string,
  firstName: string
) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: 'Bienvenue sur GreenRoots 🌱',
    html: `
      <h1>Bienvenue ${firstName} 🌱</h1>
      <p>Votre compte GreenRoots a bien été créé.</p>
      <p>Vous pouvez maintenant vous connecter à votre espace client.</p>
    `,
  });
}
