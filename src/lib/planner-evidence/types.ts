export interface EvidenceFileMeta {
  id: string;
  plannerSlug: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  note?: string;
  /** Free-text or fixed-option tag, e.g. a PIP activity, or "Income", "Housing" for other planners. */
  tag?: string;
  dateAdded: string;
}

export interface VoiceNoteMeta {
  id: string;
  plannerSlug: string;
  label: string;
  mimeType: string;
  durationSeconds?: number;
  dateAdded: string;
}
