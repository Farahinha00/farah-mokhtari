create table if not exists site_content (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;
-- Aucune policy n'est créée : la table n'est accessible que via la clé
-- service_role utilisée côté serveur (jamais exposée au navigateur).
