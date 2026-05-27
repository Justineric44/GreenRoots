'use client';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <main>
      <p>Une erreur est survenue.</p>
      <p>
        {error.message ||
          'Une erreur inattendue a empêché le chargement du contenu.'}
      </p>
      <button type="button" onClick={reset}>
        Réessayer
      </button>
    </main>
  );
}
