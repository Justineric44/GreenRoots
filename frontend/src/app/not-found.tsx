import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <Image
        src="/images/background-image-main.jpg"
        alt="Forêt et reforestation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_top]"
      />
      <section className="flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8 py-36">
        <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-brand-dark/60 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10">
          <h1 className="mx-auto max-w-2xl text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            GreenRoots
          </h1>
          <p className="mt-6 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            404 - Page non trouvée
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-200 sm:text-lg">
            Cette page n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Button variant="outline" className="w-full sm:w-auto">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
