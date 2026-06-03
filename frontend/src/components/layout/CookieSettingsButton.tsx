'use client';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.tarteaucitron?.userInterface.openPanel()}
      className="transition-colors hover:text-brand-accent"
    >
      Gestion des cookies
    </button>
  );
}
