'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ================================================================
// PAGE D'AUTHENTIFICATION
// ================================================================
// Ce composant gère les deux écrans d'authentification :
// - connexion (login)
// - inscription (register)
//
// Il conserve l'état local des formulaires, traite la logique de
// soumission et bascule l'affichage entre les deux modes.

type AuthMode = 'login' | 'register';
type AccountType = 'particulier' | 'entreprise';

export default function AuthenticationPage() {
  const router = useRouter();

  // Mode de la page : indique si l'utilisateur est en train de se connecter
  // ou de créer un compte. Cette valeur pilote l'affichage de l'interface.
  const [mode, setMode] = useState<AuthMode>('login');

  // Type de compte choisi pour l'inscription.
  // Le parcours est légèrement différent selon qu'il s'agit d'un particulier
  // ou d'un professionnel, notamment pour les champs SIRET et raison sociale.
  const [accountType, setAccountType] = useState<AccountType>('particulier');

  // === CONNEXION (login) ===
  // Données du formulaire de connexion stockées dans des variables séparées.
  // Cette séparation est volontaire : elle rend les validations et l'envoi de la requête
  // plus lisibles que si tout était regroupé dans un objet unique, surtout pour une page
  // qui gère aussi un second parcours d'inscription.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // === INSCRIPTION (register) ===
  // Données du formulaire d'inscription regroupées dans un objet unique.
  // Ce choix facilite la mise à jour dynamique de plusieurs champs avec une seule fonction
  // de mise à jour, et permet de construire facilement le payload envoyé au backend.
  const [registerData, setRegisterData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    postalCode: '',
    city: '',
    siret: '',
    companyName: '',
  });

  // Message d'erreur affiché à l'utilisateur si la validation locale
  // ou la requête serveur échoue. Il est réinitialisé au démarrage de chaque action
  // pour éviter qu'un ancien message reste visible alors que l'utilisateur tente autre chose.
  const [errorMessage, setErrorMessage] = useState('');

  // Indique si une requête réseau est en cours.
  // Cette variable sert à désactiver les boutons et à afficher un état de chargement
  // pendant la connexion ou l'inscription, pour éviter les actions multiples.
  const [isLoading, setIsLoading] = useState(false);

  // État du consentement aux CGU et politique de confidentialité.
  // La case doit être cochée avant toute création de compte, sinon l'inscription est bloquée.
  const [acceptTerms, setAcceptTerms] = useState(false);

  /**
   * Met à jour un champ du formulaire d'inscription.
   * On travaille sur une copie de l'objet pour conserver l'immuabilité du state React.
   * Cela permet de garder un rendu propre et prévisible lors des saisies utilisateur.
   */
  function updateRegisterField(
    field: keyof typeof registerData,
    value: string
  ) {
    setRegisterData({
      ...registerData,
      [field]: value,
    });
  }

  /**
   * Bascule entre l'écran de connexion et l'écran d'inscription.
   * On réinitialise également le message d'erreur pour éviter qu'un ancien message
   * reste affiché quand l'utilisateur change de mode.
   */
  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage('');
  }

  // === LOGIQUE: CONNEXION ===
  /**
   * Gère la soumission du formulaire de connexion.
   * La page envoie une requête à l'API interne Next.js /api/auth/login,
   * qui elle-même délègue la vérification des identifiants au backend.
   */
  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    // Validation côté navigateur du format de l'adresse email.
    // Elle évite d'envoyer une requête inutile si l'utilisateur a déjà saisi
    // une valeur manifestement invalide.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      setIsLoading(false);
      return;
    }

    try {
      // Requête vers l'API interne Next.js qui sert de passerelle au backend.
      // Cette étape est essentielle pour que le navigateur puisse gérer les cookies
      // d'authentification lors de la connexion.
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        // Si l'API répond avec une erreur, on affiche un message générique
        // sans révéler de détails techniques sur le fonctionnement du backend.
        setErrorMessage('Email ou mot de passe incorrect.');
        return;
      }

      // Si la connexion réussit, on redirige l'utilisateur vers son espace client.
      // La méthode refresh force Next.js à remettre à jour les données de navigation
      // après une connexion qui a pu modifier l'état de l'application.
      router.push('/espace-client');
      router.refresh();
    } catch {
      setErrorMessage('Impossible de contacter le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  // === LOGIQUE: INSCRIPTION ===
  /**
   * Gère la soumission du formulaire d'inscription.
   * Cette fonction effectue d'abord une validation locale (champs obligatoires,
   * format email, mot de passe, SIRET si professionnel, etc.), puis envoie
   * les données au backend pour créer le compte utilisateur.
   */
  const handleRegister: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    // Validation des champs obligatoires avant d'appeler le backend.
    // Cette étape évite les requêtes inutiles et donne un retour immédiat
    // à l'utilisateur lorsqu'un champ essentiel est manquant.
    if (!registerData.lastName.trim()) {
      setErrorMessage('Le nom est obligatoire.');
      setIsLoading(false);
      return;
    }

    if (!registerData.firstName.trim()) {
      setErrorMessage('Le prénom est obligatoire.');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(registerData.email)) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
      setIsLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }

    if (!registerData.address.trim()) {
      setErrorMessage("L'adresse est obligatoire.");
      setIsLoading(false);
      return;
    }

    if (!/^\d{5}$/.test(registerData.postalCode)) {
      setErrorMessage('Le code postal doit contenir 5 chiffres.');
      setIsLoading(false);
      return;
    }

    if (!registerData.city.trim()) {
      setErrorMessage('La ville est obligatoire.');
      setIsLoading(false);
      return;
    }

    // Validation spécifique aux comptes professionnels.
    // Le SIRET est obligatoire pour les entreprises et doit respecter un format précis.
    if (accountType === 'entreprise' && !/^\d{14}$/.test(registerData.siret)) {
      setErrorMessage('Le numéro de SIRET doit contenir 14 chiffres.');
      setIsLoading(false);
      return;
    }

    if (accountType === 'entreprise' && !registerData.companyName.trim()) {
      // Pour un compte entreprise, la raison sociale est essentielle pour identifier la structure.
      setErrorMessage('La raison sociale est obligatoire.');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      // La validation des mentions légales est obligatoire avant toute création de compte.
      setErrorMessage(
        "Vous devez accepter les Conditions d'utilisation et la Politique de confidentialité."
      );
      setIsLoading(false);
      return;
    }

    // Construction du payload envoyé au backend.
    // On distingue les champs communs et les champs spécifiques aux professionnels
    // pour respecter le format attendu par l'API d'inscription.
    const payload = {
      lastName: registerData.lastName,
      firstName: registerData.firstName,
      email: registerData.email,
      password: registerData.password,
      address: registerData.address,
      postalCode: registerData.postalCode,
      city: registerData.city,
      type: accountType,
      ...(accountType === 'entreprise' && {
        siret: registerData.siret,
        companyName: registerData.companyName,
      }),
      acceptedTerms: true,
    };

    try {
      // Appel au backend d'inscription, avec l'URL publique définie côté Next.js.
      // Cette requête est distincte de la connexion car elle crée le compte avant de l'authentifier.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        // Si le backend signale un conflit, cela veut souvent dire qu'un compte
        // existe déjà avec la même adresse email ou le même SIRET.
        if (response.status === 409) {
          setErrorMessage('Un compte existe déjà avec cet email ou ce SIRET.');
          return;
        }

        setErrorMessage(
          'Impossible de créer le compte. Vérifiez les informations saisies.'
        );
        return;
      }

      // Après inscription, on revient au mode connexion et on pré-remplit
      // l'email pour faciliter la connexion immédiate de l'utilisateur.
      setMode('login');
      setEmail(registerData.email);
      setPassword('');
    } catch {
      setErrorMessage('Impossible de contacter le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg text-brand-dark">
      <section className="relative isolate min-h-screen overflow-hidden">
        <Image
          src="/images/background-image-main.jpg"
          alt="Forêt et reforestation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_top]"
        />

        <div className="relative z-10">
          <section
            className={
              mode === 'login'
                ? 'flex min-h-screen items-start justify-center px-4 pt-28 pb-10 md:pt-36'
                : 'flex min-h-screen items-start justify-center px-4 pt-24 pb-10 md:pt-32'
            }
          >
            <div
              className={
                mode === 'login'
                  ? 'w-full max-w-lg rounded-[28px] bg-brand-white px-6 py-6 text-brand-dark shadow-sm sm:px-10 md:py-10'
                  : 'w-full max-w-2xl rounded-[28px] bg-brand-white px-6 py-5 text-brand-dark shadow-sm sm:px-8 md:px-10'
              }
            >
              {mode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <h1 className="text-3xl font-bold">Connexion</h1>
                      <p className="mt-2 text-brand-muted">
                        Connectez-vous à votre espace GreenRoots.
                      </p>
                    </div>

                    <FormField
                      id="login-email"
                      label="Email"
                      type="text"
                      value={email}
                      onChange={setEmail}
                    />

                    <FormField
                      id="login-password"
                      label="Mot de passe"
                      type="password"
                      value={password}
                      onChange={setPassword}
                    />
                  </div>

                  {errorMessage && <ErrorMessage message={errorMessage} />}

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-11 cursor-pointer rounded-md bg-brand-dark px-6 font-semibold text-brand-white hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? 'Connexion...' : 'Suivant'}
                    </Button>
                  </div>

                  <div className="space-y-3 pt-4">
                    <p className="text-sm">
                      Pas de compte ? Créez-en un en quelques clics !
                    </p>

                    <Button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="h-11 cursor-pointer rounded-md bg-brand-accent px-6 font-semibold text-brand-white hover:bg-brand-dark"
                    >
                      Inscription
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold">Créer un compte</h1>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-16">
                    <button
                      type="button"
                      onClick={() => setAccountType('particulier')}
                      className={
                        accountType === 'particulier'
                          ? 'cursor-pointer border-b-2 border-brand-accent pb-1 font-semibold text-brand-dark'
                          : 'cursor-pointer pb-1 text-brand-dark hover:border-b-2 hover:border-brand-accent'
                      }
                    >
                      Je suis un particulier
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('entreprise')}
                      className={
                        accountType === 'entreprise'
                          ? 'cursor-pointer border-b-2 border-brand-accent pb-1 font-semibold text-brand-dark'
                          : 'cursor-pointer pb-1 text-brand-dark hover:border-b-2 hover:border-brand-accent'
                      }
                    >
                      Je suis un professionnel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
                    <FormField
                      id="lastName"
                      label="Nom"
                      value={registerData.lastName}
                      onChange={(value) =>
                        updateRegisterField('lastName', value)
                      }
                    />

                    <FormField
                      id="firstName"
                      label="Prénom"
                      value={registerData.firstName}
                      onChange={(value) =>
                        updateRegisterField('firstName', value)
                      }
                    />

                    <div className="md:col-span-2">
                      <FormField
                        id="register-email"
                        label="Email"
                        type="text"
                        value={registerData.email}
                        onChange={(value) =>
                          updateRegisterField('email', value)
                        }
                      />
                    </div>

                    <div>
                      <FormField
                        id="register-password"
                        label="Mot de passe"
                        type="password"
                        value={registerData.password}
                        onChange={(value) =>
                          updateRegisterField('password', value)
                        }
                      />

                      <p className="mt-1 text-xs text-brand-muted">
                        Minimum 8 caractères, avec une majuscule, un chiffre et
                        un caractère spécial.
                      </p>
                    </div>

                    <FormField
                      id="confirmPassword"
                      label="Confirmation du mot de passe"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(value) =>
                        updateRegisterField('confirmPassword', value)
                      }
                    />

                    <div className="md:col-span-2">
                      <FormField
                        id="address"
                        label="Adresse"
                        value={registerData.address}
                        onChange={(value) =>
                          updateRegisterField('address', value)
                        }
                      />
                    </div>

                    <FormField
                      id="postalCode"
                      label="Code postal"
                      value={registerData.postalCode}
                      onChange={(value) =>
                        updateRegisterField('postalCode', value)
                      }
                    />

                    <FormField
                      id="city"
                      label="Ville"
                      value={registerData.city}
                      onChange={(value) => updateRegisterField('city', value)}
                    />

                    {accountType === 'entreprise' && (
                      <>
                        <FormField
                          id="siret"
                          label="Numéro de SIRET"
                          value={registerData.siret}
                          onChange={(value) =>
                            updateRegisterField('siret', value)
                          }
                        />

                        <FormField
                          id="companyName"
                          label="Raison sociale"
                          value={registerData.companyName}
                          onChange={(value) =>
                            updateRegisterField('companyName', value)
                          }
                        />
                      </>
                    )}
                  </div>

                  <div className="rounded-md border border-gray-200 p-3">
                    {/* Bloc de validation légale obligatoire pour l'inscription. */}
                    <label className="flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1"
                      />

                      <span>
                        J&apos;ai lu et j&apos;accepte les{' '}
                        <a
                          href="/conditions-generales-utilisations"
                          target="_blank"
                          className="font-medium underline"
                        >
                          Conditions Générales d&apos;Utilisation
                        </a>{' '}
                        ainsi que la{' '}
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

                  {errorMessage && <ErrorMessage message={errorMessage} />}

                  <div className="flex items-center justify-between gap-4 pt-1">
                    {/* Lien retour vers le mode connexion et bouton de validation de l'inscription. */}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="cursor-pointer text-sm text-brand-dark underline-offset-4 hover:underline"
                    >
                      Déjà un compte ? Se connecter
                    </button>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-11 cursor-pointer rounded-md bg-brand-accent px-6 font-semibold text-brand-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? 'Inscription...' : 'Je m’inscris'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
}: FormFieldProps) {
  // Composant utilitaire réutilisable pour chaque champ de saisie.
  // Il garantit un rendu homogène du label et de l'input partout dans la page.
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm text-brand-dark">
        {label}
      </label>

      <Input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md bg-brand-white"
      />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  // Composant d'affichage d'erreur simple et visuel.
  // Il ne contient aucune logique de validation, uniquement l'affichage du message.
  return (
    <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}
