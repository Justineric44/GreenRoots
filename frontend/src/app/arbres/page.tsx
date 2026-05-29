'use client';

import Title from '@/components/layout/Title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';

const trees = [
  { id: 1, name: 'Chêne pédonculé', family: 'Fagacées', price: 29.9 },
  { id: 2, name: 'Hêtre commun', family: 'Fagacées', price: 24.9 },
  { id: 3, name: 'Pin sylvestre', family: 'Pinacées', price: 19.9 },
  { id: 4, name: 'Bouleau blanc', family: 'Bétulacées', price: 22.5 },
  { id: 5, name: 'Érable sycomore', family: 'Sapindacées', price: 27.9 },
  { id: 6, name: 'Frêne élevé', family: 'Oléacées', price: 21.0 },
  {
    id: 7,
    name: 'Tilleul à grandes feuilles',
    family: 'Malvacées',
    price: 26.5,
  },
  { id: 8, name: 'Châtaignier', family: 'Fagacées', price: 23.9 },
  { id: 9, name: 'Sapin pectiné', family: 'Pinacées', price: 18.5 },
  { id: 10, name: 'Orme champêtre', family: 'Ulmacées', price: 20.9 },
  { id: 11, name: 'Charme commun', family: 'Bétulacées', price: 17.9 },
  { id: 12, name: 'Noyer commun', family: 'Juglandacées', price: 32.0 },
  { id: 13, name: 'Merisier', family: 'Rosacées', price: 25.0 },
  { id: 14, name: 'Aulne glutineux', family: 'Bétulacées', price: 19.0 },
  { id: 15, name: 'Épicéa commun', family: 'Pinacées', price: 16.5 },
  { id: 16, name: 'Robinier faux-acacia', family: 'Fabacées', price: 18.0 },
  { id: 17, name: 'Platane commun', family: 'Platanacées', price: 28.0 },
  { id: 18, name: 'Cèdre de l&apos;Atlas', family: 'Pinacées', price: 35.0 },
];

const ITEMS_PER_PAGE = 9;

export default function TreesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(trees.length / ITEMS_PER_PAGE);
  const paginated = trees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main>
      <Title title="Nos arbres" />

      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((tree) => (
              <Card
                key={tree.id}
                className="flex flex-col w-full pt-0 overflow-hidden"
              >
                <div className="h-48 w-full shrink-0 bg-muted" />
                <CardHeader className="text-center flex-1">
                  <CardTitle>{tree.name}</CardTitle>
                  <CardDescription className="text-center italic">
                    {tree.family}
                  </CardDescription>
                  <p className="text-center font-semibold text-lg pt-1">
                    {tree.price.toFixed(2)} €
                  </p>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">Voir l&apos;arbre</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  );
}
