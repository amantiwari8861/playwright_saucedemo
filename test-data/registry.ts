import fs from "node:fs";
import path from "node:path";

export type ResourceKind = "users" | "products";

/**
 * The API suite writes to a real MongoDB cluster, so every record it creates
 * has to be removed again at the end of the run.
 *
 * Resources are tracked as one marker file per id rather than as a single
 * shared JSON file: `fullyParallel` runs specs in separate worker processes,
 * and a shared read-modify-write file would silently lose records whenever two
 * workers tracked a resource at the same time. Marker files are keyed by Mongo
 * id, which is unique, so concurrent writes can never collide.
 */
const ROOT = path.join(__dirname, "..", ".test-run");

function dirFor(kind: ResourceKind): string {
  return path.join(ROOT, kind);
}

export function trackResource(kind: ResourceKind, id: string): void {
  const dir = dirFor(kind);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${id}.json`),
    JSON.stringify({ kind, id, createdAt: new Date().toISOString() }, null, 2),
  );
}

export function listTracked(kind: ResourceKind): string[] {
  const dir = dirFor(kind);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.basename(file, ".json"));
}

export function clearTracked(): void {
  fs.rmSync(ROOT, { recursive: true, force: true });
}
