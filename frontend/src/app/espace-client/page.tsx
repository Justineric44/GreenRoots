import {
  CalendarDays,
  Mail,
  MapPin,
  Package,
  User as UserIcon,
} from 'lucide-react';

import Title from '@/components/layout/Title';

// ============================================================
//  Espace client — version statique (non branchée au backend).
//  Les données ci-dessous sont des mocks et seront remplacées
//  par des appels API quand les endpoints /api/users/me et
//  /api/users/me/orders seront disponibles.
// ============================================================

const mockUser = {
  firstName: 'Thomas',
  lastName: 'Martin',
  email: 'thomas.martin@email.fr',
  type: 'particulier',
  address: '45 avenue des Chênes',
  postalCode: '69001',
  city: 'Lyon',
  phone: '0612345678',
  companyName: null as string | null,
  siret: null as string | null,
};

const mockOrders = [
  {
    id: 1042,
    status: 'validated' as const,
    amount: 89.5,
    createdAt: '2026-04-12T10:00:00.000Z',
    items: [{ id: 1 }, { id: 2 }, { id: 3 }],
  },
  {
    id: 1018,
    status: 'canceled' as const,
    amount: 24.0,
    createdAt: '2026-03-02T15:30:00.000Z',
    items: [{ id: 4 }],
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CustomerAreaPage() {
  const user = mockUser;
  const orders = mockOrders;

  return (
    <main>
      <Title title="Espace client" />

      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-10 text-brand-dark">
          <header>
            <h2 className="text-3xl font-bold">Bonjour {user.firstName} 👋</h2>
            <p className="text-muted-foreground mt-1">
              Votre espace personnel GreenRoots.
            </p>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UserIcon className="size-5 text-primary" aria-hidden="true" />
              Mes informations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-border p-5 bg-card">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Nom complet
                </p>
                <p className="mt-1">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Email
                </p>
                <p className="mt-1 flex items-center gap-1.5">
                  <Mail
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Type de compte
                </p>
                <p className="mt-1 capitalize">{user.type}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Adresse
                </p>
                <p className="mt-1 flex items-center gap-1.5">
                  <MapPin
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {user.address}, {user.postalCode} {user.city}
                </p>
              </div>

              {user.companyName && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Raison sociale
                  </p>
                  <p className="mt-1">{user.companyName}</p>
                </div>
              )}

              {user.siret && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    SIRET
                  </p>
                  <p className="mt-1 font-mono text-sm">{user.siret}</p>
                </div>
              )}
            </div>
          </section>

          {/* Commandes */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Package className="size-5 text-primary" aria-hidden="true" />
              Mes commandes ({orders.length})
            </h3>

            <ul className="space-y-3">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="rounded-2xl border border-border p-4 bg-card flex items-center justify-between gap-4 flex-wrap"
                >
                  <div>
                    <p className="font-semibold">Commande #{order.id}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {formatDate(order.createdAt)}
                      {' · '}
                      {order.items.length} article
                      {order.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        order.status === 'validated'
                          ? 'rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium'
                          : 'rounded-full bg-destructive/10 text-destructive px-3 py-1 text-xs font-medium'
                      }
                    >
                      {order.status === 'validated' ? 'Validée' : 'Annulée'}
                    </span>
                    <span className="font-semibold">
                      {order.amount.toFixed(2)} €
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
