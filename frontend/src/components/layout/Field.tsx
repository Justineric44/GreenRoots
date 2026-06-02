'use client';

import { Input } from '@/components/ui/input';

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm text-brand-dark">
        {label}
      </label>

      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 bg-brand-white"
      />
    </div>
  );
}
