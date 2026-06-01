'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TreesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      router.push(`/arbres?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Filtres à gauche */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Rechercher par nom..."
          defaultValue={searchParams.get('search') ?? ''}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-60"
        />
        <Input
          type="number"
          placeholder="Prix min (€)"
          defaultValue={searchParams.get('minPrice') ?? ''}
          onChange={(e) => updateFilter('minPrice', e.target.value)}
          className="w-36"
        />
        <Input
          type="number"
          placeholder="Prix max (€)"
          defaultValue={searchParams.get('maxPrice') ?? ''}
          onChange={(e) => updateFilter('maxPrice', e.target.value)}
          className="w-36"
        />
      </div>

      {/* Tri à droite */}
      <Select
        defaultValue={`${searchParams.get('sortBy') ?? 'commonName'}-${searchParams.get('sortOrder') ?? 'asc'}`}
        onValueChange={(value) => {
          const [sortBy, sortOrder] = value.split('-');
          const params = new URLSearchParams(searchParams.toString());
          params.set('sortBy', sortBy);
          params.set('sortOrder', sortOrder);
          params.set('page', '1');
          router.push(`/arbres?${params.toString()}`);
        }}
      >
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Trier par..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="commonName-asc">Nom (A → Z)</SelectItem>
          <SelectItem value="commonName-desc">Nom (Z → A)</SelectItem>
          <SelectItem value="price-asc">Prix (croissant)</SelectItem>
          <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
