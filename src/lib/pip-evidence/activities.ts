export interface PipActivity {
  id: string;
  group: "daily-living" | "mobility";
  label: string;
}

export const PIP_ACTIVITIES: PipActivity[] = [
  { id: "dl-food", group: "daily-living", label: "Preparing food and drink" },
  { id: "dl-eating", group: "daily-living", label: "Taking nutrition (eating and drinking)" },
  { id: "dl-meds", group: "daily-living", label: "Managing treatments/medication" },
  { id: "dl-wash", group: "daily-living", label: "Washing and bathing" },
  { id: "dl-toilet", group: "daily-living", label: "Managing toilet needs or incontinence" },
  { id: "dl-dress", group: "daily-living", label: "Dressing and undressing" },
  { id: "dl-communicate", group: "daily-living", label: "Communicating verbally" },
  { id: "dl-read", group: "daily-living", label: "Reading and understanding signs, symbols and words" },
  { id: "dl-social", group: "daily-living", label: "Engaging with other people face to face" },
  { id: "dl-budget", group: "daily-living", label: "Making budgeting decisions" },
  { id: "mob-plan", group: "mobility", label: "Planning and following journeys" },
  { id: "mob-move", group: "mobility", label: "Moving around" },
];
