"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProgramKey } from "@/data/coachingPlatform";

/**
 * Business Planning tool — the real planner, not the trackers. A loan officer
 * sets an annual income goal and the funnel/commission assumptions; the tool
 * works backwards to the transaction goal and the activity required, then
 * breaks it down by month and week. Persists per program in localStorage.
 */

type Plan = {
  annualIncomeGoal: number;
  commissionPerClosing: number;
  // Conversion assumptions, each stage as a percentage (0–100).
  closingRate: number; // applications -> closings
  appToCloseStart: number; // appointments -> applications
  convToAppt: number; // conversations -> appointments
  workingWeeks: number; // productive weeks per year
};

const DEFAULT_PLAN: Plan = {
  annualIncomeGoal: 150000,
  commissionPerClosing: 4500,
  closingRate: 80,
  appToCloseStart: 50,
  convToAppt: 25,
  workingWeeks: 48,
};

function storageKey(program: ProgramKey) {
  return `lf-business-plan-${program}`;
}

function readPlan(program: ProgramKey): Plan {
  if (typeof window === "undefined") return DEFAULT_PLAN;
  try {
    const saved = window.localStorage.getItem(storageKey(program));
    if (!saved) return DEFAULT_PLAN;
    return { ...DEFAULT_PLAN, ...(JSON.parse(saved) as Partial<Plan>) };
  } catch {
    return DEFAULT_PLAN;
  }
}

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const count = (n: number) => (Number.isFinite(n) ? Math.ceil(n) : 0);

function NumberField({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-lf-navy">
      {label}
      <div className="flex items-center rounded-lg border border-lf-line bg-white focus-within:border-lf-orange">
        {prefix && <span className="pl-3 text-sm text-lf-slate">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          className="h-11 w-full bg-transparent px-3 text-sm font-normal text-lf-charcoal outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-lf-slate">{suffix}</span>}
      </div>
      {hint && <span className="text-xs font-normal text-lf-slate">{hint}</span>}
    </label>
  );
}

export default function BusinessPlanner({ program }: { program: ProgramKey }) {
  const [plan, setPlan] = useState<Plan>(DEFAULT_PLAN);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved plan after hydration to avoid SSR/client mismatch.
    setPlan(readPlan(program));
    setHydrated(true);
  }, [program]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey(program), JSON.stringify(plan));
    } catch {
      /* quota — keep working in memory */
    }
  }, [plan, hydrated, program]);

  const set = <K extends keyof Plan>(key: K, value: Plan[K]) =>
    setPlan((p) => ({ ...p, [key]: value }));

  const calc = useMemo(() => {
    const closings = count(plan.annualIncomeGoal / Math.max(1, plan.commissionPerClosing));
    const applications = count(closings / Math.max(0.01, plan.closingRate / 100));
    const appointments = count(applications / Math.max(0.01, plan.appToCloseStart / 100));
    const conversations = count(appointments / Math.max(0.01, plan.convToAppt / 100));
    const weeks = Math.max(1, plan.workingWeeks);
    const perMonth = (n: number) => count(n / 12);
    const perWeek = (n: number) => count(n / weeks);
    const perDay = (n: number) => count(n / (weeks * 5));
    return { closings, applications, appointments, conversations, weeks, perMonth, perWeek, perDay };
  }, [plan]);

  const funnel: { label: string; annual: number }[] = [
    { label: "Closings", annual: calc.closings },
    { label: "Applications", annual: calc.applications },
    { label: "Appointments", annual: calc.appointments },
    { label: "Conversations", annual: calc.conversations },
  ];

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <h2 className="h-display text-xl">Business Planning</h2>
        <p className="mt-1 text-sm text-lf-slate">
          Set your income goal and your real conversion numbers. The plan works backward to the
          transactions and weekly activity that get you there — bring it to your weekly coaching call.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <section className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">Your goal & assumptions</p>
          <div className="mt-4 grid gap-4">
            <NumberField
              label="Annual income goal"
              prefix="$"
              value={plan.annualIncomeGoal}
              onChange={(v) => set("annualIncomeGoal", v)}
              hint="What you want to earn in commission this year."
            />
            <NumberField
              label="Average commission per closing"
              prefix="$"
              value={plan.commissionPerClosing}
              onChange={(v) => set("commissionPerClosing", v)}
              hint="Your typical net commission per closed loan."
            />
            <div className="rounded-xl border border-lf-line bg-lf-mist p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">Conversion assumptions</p>
              <div className="mt-3 grid gap-4">
                <NumberField
                  label="Applications → closings"
                  suffix="%"
                  min={1}
                  value={plan.closingRate}
                  onChange={(v) => set("closingRate", Math.min(100, v))}
                  hint="Of the applications you take, how many close."
                />
                <NumberField
                  label="Appointments → applications"
                  suffix="%"
                  min={1}
                  value={plan.appToCloseStart}
                  onChange={(v) => set("appToCloseStart", Math.min(100, v))}
                  hint="Of the appointments you run, how many become applications."
                />
                <NumberField
                  label="Conversations → appointments"
                  suffix="%"
                  min={1}
                  value={plan.convToAppt}
                  onChange={(v) => set("convToAppt", Math.min(100, v))}
                  hint="Of your real conversations, how many become appointments."
                />
              </div>
            </div>
            <NumberField
              label="Productive weeks per year"
              value={plan.workingWeeks}
              onChange={(v) => set("workingWeeks", Math.min(52, Math.max(1, v)))}
              min={1}
              hint="Subtract vacation and holidays — most LOs use 46–48."
            />
            <button
              type="button"
              onClick={() => setPlan(DEFAULT_PLAN)}
              className="btn-secondary w-fit"
            >
              Reset to defaults
            </button>
          </div>
        </section>

        {/* Headline results */}
        <section className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-lf-orange/40 bg-lf-orangeSoft/40 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">Income goal</p>
              <p className="mt-1 text-2xl font-bold text-lf-navy">{money(plan.annualIncomeGoal)}</p>
              <p className="text-xs text-lf-slate">per year</p>
            </div>
            <div className="rounded-2xl border border-lf-orange/40 bg-lf-orangeSoft/40 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">Transaction goal</p>
              <p className="mt-1 text-2xl font-bold text-lf-navy">{calc.closings}</p>
              <p className="text-xs text-lf-slate">closings per year · ~{calc.perMonth(calc.closings)}/mo</p>
            </div>
          </div>

          <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">Activity required</p>
            <p className="mt-1 text-sm text-lf-slate">
              Working backward through your funnel at the rates above.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lf-line text-left text-xs uppercase tracking-wide text-lf-slate">
                    <th className="py-2 pr-3 font-bold">Stage</th>
                    <th className="py-2 px-3 text-right font-bold">Year</th>
                    <th className="py-2 px-3 text-right font-bold">Month</th>
                    <th className="py-2 px-3 text-right font-bold">Week</th>
                    <th className="py-2 pl-3 text-right font-bold">Day</th>
                  </tr>
                </thead>
                <tbody>
                  {funnel.map((row) => (
                    <tr key={row.label} className="border-b border-lf-line last:border-0">
                      <td className="py-2 pr-3 font-semibold text-lf-navy">{row.label}</td>
                      <td className="py-2 px-3 text-right text-lf-charcoal">{row.annual}</td>
                      <td className="py-2 px-3 text-right text-lf-charcoal">{calc.perMonth(row.annual)}</td>
                      <td className="py-2 px-3 text-right font-bold text-lf-navy">{calc.perWeek(row.annual)}</td>
                      <td className="py-2 pl-3 text-right text-lf-charcoal">{calc.perDay(row.annual)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-lf-slate">
              Your weekly numbers are the ones to protect — log them in Today and they roll into your
              Friday scorecard.
            </p>
          </div>
        </section>
      </div>

      {/* Monthly + weekly breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">Monthly breakdown</p>
          <ul className="mt-3 grid gap-2 text-sm text-lf-charcoal">
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Income</span>
              <span className="font-bold text-lf-navy">{money(plan.annualIncomeGoal / 12)}</span>
            </li>
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Closings</span>
              <span className="font-bold text-lf-navy">{calc.perMonth(calc.closings)}</span>
            </li>
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Applications</span>
              <span>{calc.perMonth(calc.applications)}</span>
            </li>
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Appointments</span>
              <span>{calc.perMonth(calc.appointments)}</span>
            </li>
            <li className="flex justify-between">
              <span>Conversations</span>
              <span>{calc.perMonth(calc.conversations)}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Weekly breakdown ({calc.weeks} productive weeks)
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-lf-charcoal">
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Income</span>
              <span className="font-bold text-lf-navy">{money(plan.annualIncomeGoal / calc.weeks)}</span>
            </li>
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Closings</span>
              <span className="font-bold text-lf-navy">{calc.perWeek(calc.closings)}</span>
            </li>
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Applications</span>
              <span>{calc.perWeek(calc.applications)}</span>
            </li>
            <li className="flex justify-between border-b border-lf-line pb-2">
              <span>Appointments</span>
              <span>{calc.perWeek(calc.appointments)}</span>
            </li>
            <li className="flex justify-between">
              <span>Conversations</span>
              <span className="font-bold text-lf-navy">{calc.perWeek(calc.conversations)}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
