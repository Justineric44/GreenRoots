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

    const emailjs = (await import('@emailjs/browser')).default;

    emailjs
      .send(
        'service_rq000bb',
        'template_7avtwn9',
        {
          from_name: `${form.firstName} ${form.lastName}`,
          from_email: form.email,
          subject: form.object,
          message: form.message,
        },
        'dwcxnpBQEakoaHAVw'
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
          alt="Forêt"
          fill
          priority
          className="object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
          <div className="w-full max-w-2xl rounded-[28px] bg-brand-white/95 p-8 shadow-sm backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-6">Contact</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <label className="text-sm text-brand-dark">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="w-full min-h-[140px] rounded-md border border-gray-200 p-3 text-sm bg-white"
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
