import { getCart } from '@/lib/api';
import Image from 'next/image';
import CartItemQuantity from '@/components/layout/CartItemQuantity';
import CartEmpty from '@/components/layout/CartEmpty';
import CartDeleteItem from '@/components/layout/CartDeleteItem';
import OrderModal from '@/components/layout/OrderModal';
import { formatPrice } from '@/lib/format';

export default async function CartPage() {
  const { data, meta } = await getCart();

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
          <section className="flex flex-col gap-6 min-h-screen items-center justify-center px-4 pt-28 pb-10 md:pt-36">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col gap-4 w-full max-w-4xl rounded-2xl bg-brand-white px-5 py-4 text-brand-dark shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:pr-14"
              >
                {/* Image : pleine largeur sur mobile, vignette fixe sur desktop */}
                <div className="relative w-full h-40 shrink-0 sm:w-28 sm:h-20">
                  <Image
                    src={item.tree.picture}
                    alt={item.tree.commonName}
                    fill
                    sizes="(min-width: 640px) 200px, 100vw"
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Infos : 2 colonnes sur mobile, alignées en ligne sur desktop */}
                <div className="absolute top-1/2 right-3 z-10 -translate-y-1/2 sm:right-0 sm:translate-x-1/2">
                  <CartDeleteItem cartItemId={item.id} />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:flex-1 sm:grid-cols-[1fr_1fr_6rem_6rem] sm:items-center">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Arbre
                    </p>
                    <p className="mt-1 break-words">{item.tree.commonName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Projet
                    </p>
                    <p className="mt-1 break-words">{item.project.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Quantité
                    </p>
                    <CartItemQuantity
                      cartItemId={item.id}
                      quantity={item.quantity}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Prix unitaire
                    </p>
                    <p className="mt-1">
                      {formatPrice(Number(item.tree.price))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-4 w-full max-w-4xl rounded-2xl bg-brand-white px-5 py-4 text-brand-dark shadow-sm sm:px-6">
              <div className="flex justify-between items-center gap-2 w-full">
                <p>Total du panier</p>
                <p className="text-lg font-semibold">
                  {formatPrice(meta.total)}
                </p>
              </div>
              <div className="flex justify-end">
                <OrderModal items={data.items} total={meta.total} />
              </div>
            </div>
            {data.items.length > 0 && <CartEmpty />}
          </section>
        </div>
      </section>
    </main>
  );
}
