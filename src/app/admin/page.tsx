import { AdminEditor } from "@/components/admin/AdminEditor";
import { getContent } from "@/lib/get-content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
