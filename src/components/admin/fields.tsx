"use client";

export function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold text-zinc-500 mb-1">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold text-zinc-500 mb-1">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
      />
    </label>
  );
}

export function StringListField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="mb-4">
      <span className="block text-xs font-semibold text-zinc-500 mb-1">{label}</span>
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const copy = values.slice();
                copy[i] = e.target.value;
                onChange(copy);
              }}
              className="flex-1 rounded border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="px-2 text-zinc-400 hover:text-red-600"
              title="Supprimer"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="self-start text-xs font-semibold text-zinc-600 hover:text-zinc-900"
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-800">{title}</h3>
      {children}
    </div>
  );
}
