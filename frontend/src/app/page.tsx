import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-dark">
      <section className="relative isolate min-h-[540px] overflow-hidden px-4 py-24 text-brand-white sm:px-6 lg:px-8 lg:py-28">
        <Image
          src="/images/background-image-main.jpg"
          alt="Forêt et reforestation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center pt-20">
          <h1 className="max-w-5xl text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Plantez un arbre
            <br />
            avec GreenRoots
          </h1>
          <p className="mt-10 max-w-2xl text-lg font-semibold leading-7 text-brand-white sm:text-2xl">
            Choisissez un arbre, contribuez a la reforestation, suivez votre
            impact !
          </p>
        </div>
      </section>

      <section className="bg-brand-dark px-4 py-16 text-brand-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Arbres disponibles a la plantation
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[auto,1fr,auto] lg:items-center"></div>
        </div>
      </section>

      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-stretch">
          <div className="rounded-[28px] border border-brand-dark/10 bg-brand-white p-8 shadow-[0_20px_50px_rgba(33,42,37,0.08)]">
            <p className="max-w-xl text-2xl leading-tight text-brand-dark sm:text-3xl">
              une plateforme claire pour choisir un arbre a planter et
              contribuer a des projets de reforestation
            </p>

            <div className="mt-8 space-y-4"></div>
          </div>

          <div className="grid gap-0 overflow-hidden rounded-[28px]">
            <div className="grid min-h-[420px] grid-cols-4 gap-0">
              <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.3)),url('https://images.unsplash.com/photo-1502472584811-0a2b0d8c1b5d?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
              <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28)),url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
              <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28)),url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
              <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.28)),url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
