"use client";

import { useId } from "react";
import { Card } from "@/components/ui/Card";
import type { PipProfile } from "@/lib/pip-evidence/types";

export function ProfileSection({
  profile,
  onChange,
}: {
  profile: PipProfile;
  onChange: (profile: PipProfile) => void;
}) {
  const id = useId();
  return (
    <Card>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
        Personal profile
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Kept on this device only — used to personalise your evidence pack.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1 block text-xs font-medium text-navy-deep">Full name</label>
          <input
            id={`${id}-name`}
            type="text"
            value={profile.name ?? ""}
            onChange={(e) => onChange({ ...profile, name: e.target.value })}
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
        </div>
        <div>
          <label htmlFor={`${id}-dob`} className="mb-1 block text-xs font-medium text-navy-deep">Date of birth</label>
          <input
            id={`${id}-dob`}
            type="date"
            value={profile.dateOfBirth ?? ""}
            onChange={(e) => onChange({ ...profile, dateOfBirth: e.target.value })}
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
        </div>
        <div>
          <label htmlFor={`${id}-nino`} className="mb-1 block text-xs font-medium text-navy-deep">National Insurance number</label>
          <input
            id={`${id}-nino`}
            type="text"
            value={profile.niNumber ?? ""}
            onChange={(e) => onChange({ ...profile, niNumber: e.target.value })}
            placeholder="Optional"
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-contact`} className="mb-1 block text-xs font-medium text-navy-deep">
            Emergency / primary contact note
          </label>
          <textarea
            id={`${id}-contact`}
            value={profile.primaryContactNote ?? ""}
            onChange={(e) => onChange({ ...profile, primaryContactNote: e.target.value })}
            rows={2}
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
        </div>
      </div>
    </Card>
  );
}
