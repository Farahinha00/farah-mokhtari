"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lang, SiteContent } from "@/lib/content-types";
import { Section, StringListField, TextAreaField, TextField } from "./fields";

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [lang, setLang] = useState<Lang>("fr");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const t = content[lang];

  function updateLang(updater: (t: SiteContent[Lang]) => SiteContent[Lang]) {
    setContent((c) => ({ ...c, [lang]: updater(c[lang]) }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'enregistrement.");
      setMessage("Contenu enregistré ✓");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-900">Administration du contenu</h1>
          <p className="text-xs text-zinc-500">Modifiez le texte du site, puis enregistrez.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-xs font-medium text-zinc-600">{message}</span>}
          <div className="flex rounded-full border border-zinc-300 p-1">
            <button
              onClick={() => setLang("fr")}
              className={`rounded-full px-3 py-1 text-xs font-bold ${lang === "fr" ? "bg-zinc-900 text-white" : "text-zinc-600"}`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-xs font-bold ${lang === "en" ? "bg-zinc-900 text-white" : "text-zinc-600"}`}
            >
              EN
            </button>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Voir le site
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button onClick={handleLogout} className="text-xs font-semibold text-zinc-400 hover:text-zinc-700">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        <Section title="Navigation">
          <div className="grid grid-cols-2 gap-x-4">
            <TextField label="À propos" value={t.nav.about} onChange={(v) => updateLang((c) => ({ ...c, nav: { ...c.nav, about: v } }))} />
            <TextField label="Services" value={t.nav.services} onChange={(v) => updateLang((c) => ({ ...c, nav: { ...c.nav, services: v } }))} />
            <TextField
              label="Parcours / Expérience"
              value={t.nav.experience}
              onChange={(v) => updateLang((c) => ({ ...c, nav: { ...c.nav, experience: v } }))}
            />
            <TextField label="Contact" value={t.nav.contact} onChange={(v) => updateLang((c) => ({ ...c, nav: { ...c.nav, contact: v } }))} />
          </div>
        </Section>

        <Section title="Hero">
          <TextField label="Eyebrow" value={t.hero.eyebrow} onChange={(v) => updateLang((c) => ({ ...c, hero: { ...c.hero, eyebrow: v } }))} />
          <TextField label="Titre" value={t.hero.subtitle} onChange={(v) => updateLang((c) => ({ ...c, hero: { ...c.hero, subtitle: v } }))} />
          <TextAreaField label="Texte d'intro" value={t.hero.lede} onChange={(v) => updateLang((c) => ({ ...c, hero: { ...c.hero, lede: v } }))} />
          <div className="grid grid-cols-2 gap-x-4">
            <TextField
              label="Bouton principal"
              value={t.hero.ctaPrimary}
              onChange={(v) => updateLang((c) => ({ ...c, hero: { ...c.hero, ctaPrimary: v } }))}
            />
            <TextField
              label="Bouton secondaire"
              value={t.hero.ctaSecondary}
              onChange={(v) => updateLang((c) => ({ ...c, hero: { ...c.hero, ctaSecondary: v } }))}
            />
          </div>
          <TextField
            label="Disponibilité"
            value={t.hero.availability}
            onChange={(v) => updateLang((c) => ({ ...c, hero: { ...c.hero, availability: v } }))}
          />
        </Section>

        <Section title="Chiffres clés">
          {t.metrics.map((m, i) => (
            <div key={i} className="mb-3 grid grid-cols-[1fr_2fr_auto] items-end gap-2">
              <TextField
                label="Valeur"
                value={m.value}
                onChange={(v) =>
                  updateLang((c) => {
                    const metrics = c.metrics.slice();
                    metrics[i] = { ...metrics[i], value: v };
                    return { ...c, metrics };
                  })
                }
              />
              <TextField
                label="Libellé"
                value={m.label}
                onChange={(v) =>
                  updateLang((c) => {
                    const metrics = c.metrics.slice();
                    metrics[i] = { ...metrics[i], label: v };
                    return { ...c, metrics };
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  updateLang((c) => ({ ...c, metrics: c.metrics.filter((_, idx) => idx !== i) }))
                }
                className="mb-4 px-2 text-zinc-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => updateLang((c) => ({ ...c, metrics: [...c.metrics, { value: "", label: "" }] }))}
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            + Ajouter un chiffre
          </button>
        </Section>

        <Section title="À propos">
          <TextField label="Titre" value={t.about.title} onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, title: v } }))} />
          <TextAreaField
            label="Paragraphe 1"
            value={t.about.p1}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, p1: v } }))}
          />
          <TextAreaField
            label="Paragraphe 2"
            value={t.about.p2}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, p2: v } }))}
          />
          <StringListField
            label="Valeurs (tags)"
            values={t.about.values}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, values: v } }))}
          />
          <TextField
            label="Titre 'Secteurs'"
            value={t.about.sectorsTitle}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, sectorsTitle: v } }))}
          />
          <StringListField
            label="Secteurs"
            values={t.about.sectors}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, sectors: v } }))}
          />
          <TextField
            label="Titre 'Centres d'intérêt'"
            value={t.about.interestsTitle}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, interestsTitle: v } }))}
          />
          <StringListField
            label="Centres d'intérêt"
            values={t.about.interests}
            onChange={(v) => updateLang((c) => ({ ...c, about: { ...c.about, interests: v } }))}
          />
        </Section>

        <Section title="Services">
          <TextField
            label="Indication"
            value={t.services.hint}
            onChange={(v) => updateLang((c) => ({ ...c, services: { ...c.services, hint: v } }))}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <TextField
              label="Label 'Ce que je fais'"
              value={t.services.doLabel}
              onChange={(v) => updateLang((c) => ({ ...c, services: { ...c.services, doLabel: v } }))}
            />
            <TextField
              label="Label 'Ce que vous obtenez'"
              value={t.services.getLabel}
              onChange={(v) => updateLang((c) => ({ ...c, services: { ...c.services, getLabel: v } }))}
            />
          </div>
          <TextField
            label="Label retour"
            value={t.services.backLabel}
            onChange={(v) => updateLang((c) => ({ ...c, services: { ...c.services, backLabel: v } }))}
          />

          {t.services.list.map((s, i) => (
            <div key={i} className="mt-6 rounded border border-zinc-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-zinc-400">Service {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    updateLang((c) => ({
                      ...c,
                      services: { ...c.services, list: c.services.list.filter((_, idx) => idx !== i) },
                    }))
                  }
                  className="text-xs font-semibold text-red-500 hover:text-red-700"
                >
                  Supprimer ce service
                </button>
              </div>
              <TextField
                label="Titre"
                value={s.title}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], title: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
              <TextField
                label="Label 'Pour qui'"
                value={s.audienceLabel}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], audienceLabel: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
              <TextAreaField
                label="Public visé"
                value={s.audience}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], audience: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
              <TextAreaField
                label="Problème"
                value={s.problem}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], problem: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
              <StringListField
                label="Compétences clés (tags)"
                values={s.skills}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], skills: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
              <StringListField
                label="Ce que je fais concrètement"
                values={s.whatIDo}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], whatIDo: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
              <StringListField
                label="Ce que vous obtenez"
                values={s.whatYouGet}
                onChange={(v) =>
                  updateLang((c) => {
                    const list = c.services.list.slice();
                    list[i] = { ...list[i], whatYouGet: v };
                    return { ...c, services: { ...c.services, list } };
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              updateLang((c) => ({
                ...c,
                services: {
                  ...c.services,
                  list: [
                    ...c.services.list,
                    { title: "", audienceLabel: "", audience: "", problem: "", skills: [], whatIDo: [], whatYouGet: [] },
                  ],
                },
              }))
            }
            className="mt-4 text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            + Ajouter un service
          </button>
        </Section>

        <Section title="Parcours / Expérience">
          {t.experience.map((e, i) => (
            <div key={i} className="mb-4 rounded border border-zinc-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-zinc-400">Poste {i + 1}</span>
                <button
                  type="button"
                  onClick={() => updateLang((c) => ({ ...c, experience: c.experience.filter((_, idx) => idx !== i) }))}
                  className="text-xs font-semibold text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <TextField
                  label="Entreprise"
                  value={e.company}
                  onChange={(v) =>
                    updateLang((c) => {
                      const experience = c.experience.slice();
                      experience[i] = { ...experience[i], company: v };
                      return { ...c, experience };
                    })
                  }
                />
                <TextField
                  label="Poste"
                  value={e.role}
                  onChange={(v) =>
                    updateLang((c) => {
                      const experience = c.experience.slice();
                      experience[i] = { ...experience[i], role: v };
                      return { ...c, experience };
                    })
                  }
                />
              </div>
              <TextField
                label="Période"
                value={e.period}
                onChange={(v) =>
                  updateLang((c) => {
                    const experience = c.experience.slice();
                    experience[i] = { ...experience[i], period: v };
                    return { ...c, experience };
                  })
                }
              />
              <TextAreaField
                label="Résumé (optionnel)"
                rows={2}
                value={e.summary ?? ""}
                onChange={(v) =>
                  updateLang((c) => {
                    const experience = c.experience.slice();
                    experience[i] = { ...experience[i], summary: v };
                    return { ...c, experience };
                  })
                }
              />
              <StringListField
                label="Points clés"
                values={e.highlights}
                onChange={(v) =>
                  updateLang((c) => {
                    const experience = c.experience.slice();
                    experience[i] = { ...experience[i], highlights: v };
                    return { ...c, experience };
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              updateLang((c) => ({
                ...c,
                experience: [...c.experience, { company: "", role: "", period: "", highlights: [] }],
              }))
            }
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            + Ajouter une expérience
          </button>
        </Section>

        <Section title="Contact">
          <TextField label="Titre" value={t.contact.title} onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, title: v } }))} />
          <TextAreaField
            label="Sous-titre"
            value={t.contact.subtitle}
            onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, subtitle: v } }))}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <TextField
              label="Champ Nom"
              value={t.contact.formName}
              onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, formName: v } }))}
            />
            <TextField
              label="Champ Email"
              value={t.contact.formEmail}
              onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, formEmail: v } }))}
            />
            <TextField
              label="Champ Type de mission"
              value={t.contact.formProject}
              onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, formProject: v } }))}
            />
            <TextField
              label="Champ Message"
              value={t.contact.formMessage}
              onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, formMessage: v } }))}
            />
          </div>
          <TextField
            label="Bouton envoyer"
            value={t.contact.formSubmit}
            onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, formSubmit: v } }))}
          />
          <TextField
            label="Message de remerciement"
            value={t.contact.thanks}
            onChange={(v) => updateLang((c) => ({ ...c, contact: { ...c.contact, thanks: v } }))}
          />
        </Section>

        <Section title="Pied de page">
          <TextField label="Texte du footer" value={t.footer} onChange={(v) => updateLang((c) => ({ ...c, footer: v }))} />
        </Section>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded bg-zinc-900 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>
      </div>
    </div>
  );
}
