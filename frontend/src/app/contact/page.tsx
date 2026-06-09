'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Field from '@/components/layout/Field';

export default function ContactPage() {
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    object: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!form.lastName.trim()) {
      setErrorMessage('Le nom est obligatoire.');
      setIsLoading(false);
      return;
    }

    if (!form.firstName.trim()) {
      setErrorMessage('Le prénom est obligatoire.');
      setIsLoading(false);
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage("L'adresse email est obligatoire.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      setIsLoading(false);
      return;
    }

    if (!form.object.trim()) {
      setErrorMessage("L'objet est obligatoire.");
      setIsLoading(false);
      return;
    }

    if (!form.message.trim()) {
      setErrorMessage('Le message est obligatoire.');
      setIsLoading(false);
      return;
    }

    if (!acceptPrivacy) {
      setErrorMessage(
        'Vous devez accepter que vos données soient utilisées pour répondre à votre demande.'
      );
      setIsLoading(false);
      return;
    }

    const emailjs = (await import('@emailjs/browser')).default;

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: `${form.firstName} ${form.lastName}`,
          from_email: form.email,
          subject: form.object,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setSuccessMessage('Votre message a bien été envoyé 🌱');
        setForm({
          lastName: '',
          firstName: '',
          email: '',
          object: '',
          message: '',
        });
        setAcceptPrivacy(false);
      })
      .catch(() => setErrorMessage("Erreur lors de l'envoi du message."))
      .finally(() => setIsLoading(false));
  }

  return (
    <main className="min-h-screen bg-brand-bg text-brand-dark">
      <section className="relative min-h-screen overflow-hidden">
        {/* IMAGE DE FOND */}
        <Image
          src="/images/background-image-main.jpg"
          alt="Forêt luxuriante servant de fond à la page de contact GreenRoots"
          fill
          priority
          className="object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-36 pb-20">
          <div className="w-full max-w-2xl rounded-[28px] bg-brand-white/95 p-6 shadow-sm backdrop-blur-sm md:p-7">
            <h1 className="mb-4 text-3xl font-bold">Contact</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NOM / PRÉNOM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  id="lastName"
                  label="Nom"
                  value={form.lastName}
                  onChange={(v) => updateField('lastName', v)}
                />
                <Field
                  id="firstName"
                  label="Prénom"
                  value={form.firstName}
                  onChange={(v) => updateField('firstName', v)}
                />
              </div>

              {/* EMAIL */}
              <Field
                id="email"
                label="Email"
                value={form.email}
                onChange={(v) => updateField('email', v)}
              />

              {/* OBJET */}
              <Field
                id="object"
                label="Objet"
                value={form.object}
                onChange={(v) => updateField('object', v)}
              />

              {/* MESSAGE */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm text-brand-dark">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="min-h-[110px] w-full rounded-md border border-gray-200 bg-white p-3 text-sm"
                  placeholder="Écrivez votre message..."
                />
              </div>

              {/* ERROR */}
              {errorMessage && (
                <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              {/* SUCCESS */}
              {successMessage && (
                <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                  {successMessage}
                </p>
              )}

              <div className="rounded-md border border-gray-200 p-3">
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={(event) => setAcceptPrivacy(event.target.checked)}
                    className="mt-1"
                    required
                  />

                  <span>
                    J&apos;accepte que les informations saisies dans ce
                    formulaire soient utilisées pour me recontacter dans le
                    cadre de ma demande, conformément à la{' '}
                    <a
                      href="/politique-confidentialite"
                      target="_blank"
                      className="font-medium underline"
                    >
                      Politique de confidentialité
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* BUTTON */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-brand-accent text-white hover:bg-brand-dark"
                >
                  {isLoading ? 'Envoi...' : 'Envoyer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
