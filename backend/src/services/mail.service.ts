import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY ?? '',
});

const sender = {
  email: process.env.MAIL_FROM_EMAIL ?? '',
  name: process.env.MAIL_FROM_NAME ?? 'GreenRoots',
};

export async function sendOrderConfirmationEmail(
  email: string,
  firstName: string,
  orderNumber: string
) {
  await brevo.transactionalEmails.sendTransacEmail({
    sender,
    to: [{ email, name: firstName }],
    subject: 'Confirmation de votre commande GreenRoots',
    htmlContent: `
      <h1>Merci ${firstName} 🌱</h1>
      <p>Votre commande <strong>${orderNumber}</strong> a bien été enregistrée.</p>
      <p>Merci de participer au reboisement avec GreenRoots.</p>
      <p>À bientôt sur GreenRoots !</p>
    `,
  });
}

export async function sendRegistrationConfirmationEmail(
  to: string,
  firstName: string
) {
  await brevo.transactionalEmails.sendTransacEmail({
    sender,
    to: [{ email: to, name: firstName }],
    subject: 'Bienvenue sur GreenRoots 🌱',
    htmlContent: `
      <h1>Bienvenue ${firstName} 🌱</h1>
      <p>Votre compte GreenRoots a bien été créé.</p>
      <p>Vous pouvez maintenant vous connecter à votre espace client.</p>
    `,
  });
}
