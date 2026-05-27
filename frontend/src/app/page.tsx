export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4efe4] text-[#163122]">
      <section className="relative isolate min-h-[540px] overflow-hidden bg-[linear-gradient(180deg,rgba(15,32,19,0.3),rgba(15,32,19,0.3)),linear-gradient(180deg,rgba(125,133,127,0.2),rgba(19,48,29,0.15)),url('https://images.unsplash.com/photo-1453253897334-0d5fdc0a0b58?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <h1 className="max-w-5xl text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Plantez un arbre
            <br />
            avec GreenRoots
          </h1>
          <p className="mt-10 max-w-2xl text-lg font-semibold leading-7 text-white sm:text-2xl">
            Choisissez un arbre, contribuez a la reforestation, suivez votre
            impact !
          </p>
        </div>
      </section>

      <section className="bg-[#252e26] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Arbres disponibles a la plantation
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[auto,1fr,auto] lg:items-center">
            <button
              type="button"
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-white/80 transition hover:bg-white/10 lg:flex"
              aria-label="Faire défiler à gauche"
            >
              ←
            </button>

            <div className="grid gap-6 md:grid-cols-3"></div>

            <button
              type="button"
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-white/80 transition hover:bg-white/10 lg:flex"
              aria-label="Faire défiler à droite"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe4] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-stretch">
          <div className="rounded-[28px] border border-stone-200 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <p className="max-w-xl text-2xl leading-tight text-[#1c2f22] sm:text-3xl">
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
