export function Disclaimer({ text }: { text?: string }) {
  return (
    <div className="rounded-xl border border-border bg-off-white px-4 py-3 text-sm text-slate">
      <p>
        {text ??
          "BenefitsPlanner is an independent planning tool. It is not GOV.UK, DWP, HMRC, your local authority, or the NHS, and nothing here is an official entitlement decision. Always check current rules on GOV.UK or with the relevant authority."}
      </p>
    </div>
  );
}
