"use client";

import { useRouter } from "next/navigation";

const OPTIONS: { group: string; items: { label: string; href: string }[] }[] = [
  {
    group: "Get started",
    items: [{ label: "Benefits Eligibility Checker", href: "/tools/benefits-eligibility-checker" }],
  },
  {
    group: "Explore a benefit",
    items: [
      { label: "Universal Credit", href: "/benefits/universal-credit" },
      { label: "PIP", href: "/benefits/pip" },
      { label: "Carer's Allowance & Support", href: "/benefits/carers-allowance" },
      { label: "Council Tax Reduction & Support", href: "/benefits/council-tax-support" },
    ],
  },
  {
    group: "Open a planner",
    items: [
      { label: "PIP Planner", href: "/planners/pip" },
      { label: "Universal Credit Planner", href: "/planners/universal-credit" },
      { label: "SEND/EHCP Planner", href: "/planners/send-ehcp" },
      { label: "Carer's Support Planner", href: "/planners/carers-support" },
    ],
  },
];

export function BenefitSelector() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md">
      <label htmlFor="benefit-selector" className="mb-2 block text-sm font-medium text-navy-deep">
        What would you like to explore?
      </label>
      <select
        id="benefit-selector"
        className="focus-ring w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy-deep shadow-sm"
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) router.push(e.target.value);
        }}
      >
        <option value="" disabled>
          Choose where to start…
        </option>
        {OPTIONS.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.items.map((item) => (
              <option key={item.href} value={item.href}>
                {item.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
