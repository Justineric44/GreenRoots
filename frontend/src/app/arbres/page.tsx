import Image from 'next/image';
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
import { notFound } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

type Tree = {
  id: number;
  commonName: string;
  family: string;
  origin: string;
  slug: string;
  picture: string;
  price: number;
};

async function getTrees(): Promise<Tree[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trees`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(
        `[TreesPage] fetch failed: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const data = await res.json();
    return data.trees ?? [];
  } catch (err) {
    console.error('[TreesPage] fetch error:', err);
    return [];
  }
}

export default async function TreesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const trees = await getTrees();

  if (trees.length === 0) notFound();

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
                className="flex w-full flex-col overflow-hidden pt-0"
              >
                <div className="relative h-48 w-full shrink-0 overflow-hidden">
                  <Image
                    src={tree.picture}
                    alt={tree.commonName}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardHeader className="flex-1 text-center">
                  <CardTitle>{tree.commonName}</CardTitle>
                  <CardDescription className="italic">
                    {tree.family}
                  </CardDescription>
                  <p className="pt-1 text-sm font-semibold text-muted-foreground">
                    {new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(tree.price)}
                  </p>
                </CardHeader>

                <CardFooter>
                  <Button className="w-full bg-[#88B75D] hover:bg-[#76a54f] text-white">
                    Voir l&apos;arbre
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`?page=${p}`}
                        isActive={p === currentPage}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? `?page=${currentPage + 1}`
                        : '#'
                    }
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
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
