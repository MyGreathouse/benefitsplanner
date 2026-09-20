import type { PipEvidenceData, EvidenceFileMeta, VoiceNoteMeta } from "./types";

const NS = "benefitsplanner:pip-evidence";
const DB_NAME = "benefitsplanner-pip-evidence";
const DB_VERSION = 1;
const FILES_STORE = "evidenceFiles";
const VOICE_STORE = "voiceNotes";

function emptyData(): PipEvidenceData {
  return {
    profile: {},
    conditions: [],
    symptoms: [],
    medications: [],
    diary: [],
    appointments: [],
    examples: [],
    prepNotes: [],
    timeline: [],
    settings: {},
  };
}

export function loadPipData(): PipEvidenceData {
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = window.localStorage.getItem(NS);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw);
    return { ...emptyData(), ...parsed };
  } catch {
    return emptyData();
  }
}

export function savePipData(data: PipEvidenceData): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(NS, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearPipData(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(NS);
  } catch {
    // ignore
  }
}

// ---- IndexedDB for binary evidence files and voice notes ----
// Each record: { id, meta (JSON-serialisable), blob (Blob) }

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(FILES_STORE)) db.createObjectStore(FILES_STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains(VOICE_STORE)) db.createObjectStore(VOICE_STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut<T>(store: string, record: T): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGetAll<T>(store: string): Promise<T[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(store: string, id: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).get(id);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

async function idbDelete(store: string, id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

interface StoredFile {
  id: string;
  meta: EvidenceFileMeta;
  blob: Blob;
}

export async function addEvidenceFile(meta: EvidenceFileMeta, blob: Blob): Promise<void> {
  await idbPut<StoredFile>(FILES_STORE, { id: meta.id, meta, blob });
}

export async function listEvidenceFiles(): Promise<EvidenceFileMeta[]> {
  const all = await idbGetAll<StoredFile>(FILES_STORE);
  return all.map((f) => f.meta).sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
}

export async function getEvidenceFileBlob(id: string): Promise<Blob | undefined> {
  const record = await idbGet<StoredFile>(FILES_STORE, id);
  return record?.blob;
}

export async function deleteEvidenceFile(id: string): Promise<void> {
  await idbDelete(FILES_STORE, id);
}

interface StoredVoiceNote {
  id: string;
  meta: VoiceNoteMeta;
  blob: Blob;
}

export async function addVoiceNote(meta: VoiceNoteMeta, blob: Blob): Promise<void> {
  await idbPut<StoredVoiceNote>(VOICE_STORE, { id: meta.id, meta, blob });
}

export async function listVoiceNotes(): Promise<VoiceNoteMeta[]> {
  const all = await idbGetAll<StoredVoiceNote>(VOICE_STORE);
  return all.map((v) => v.meta).sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
}

export async function getVoiceNoteBlob(id: string): Promise<Blob | undefined> {
  const record = await idbGet<StoredVoiceNote>(VOICE_STORE, id);
  return record?.blob;
}

export async function deleteVoiceNote(id: string): Promise<void> {
  await idbDelete(VOICE_STORE, id);
}

export async function clearAllEvidenceFilesAndVoiceNotes(): Promise<void> {
  const files = await listEvidenceFiles();
  const voices = await listVoiceNotes();
  await Promise.all(files.map((f) => deleteEvidenceFile(f.id)));
  await Promise.all(voices.map((v) => deleteVoiceNote(v.id)));
}
