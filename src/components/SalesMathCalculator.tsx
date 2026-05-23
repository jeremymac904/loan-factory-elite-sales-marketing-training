"use client";

import { FormEvent, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

function money(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return currencyFormatter.format(Math.max(0, value));
}

function count(value: number) {
  if (!Number.isFinite(value)) return "0";
  return numberFormatter.format(Math.max(0, value));
}

export default function SalesMathCalculator() {
  const [incomeGoal, setIncomeGoal] = useState(200000);
  const [averageLoanAmount, setAverageLoanAmount] = useState(425000);
  const [bps, setBps] = useState(150);
  const [customBps, setCustomBps] = useState(150);
  const [splitPercent, setSplitPercent] = useState(90);
  const [houseFee, setHouseFee] = useState(595);
  const [manualClosingsGoal, setManualClosingsGoal] = useState(0);
  const [applicationToClosing, setApplicationToClosing] = useState(65);
  const [prequalToApplication, setPrequalToApplication] = useState(55);
  const [conversationToPrequal, setConversationToPrequal] = useState(30);
  const [results, setResults] = useState(() =>
    calculate({
      incomeGoal,
      averageLoanAmount,
      effectiveBps: bps,
      splitPercent,
      houseFee,
      manualClosingsGoal,
      applicationToClosing,
      prequalToApplication,
      conversationToPrequal,
    }),
  );

  function updateResults(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setResults(
      calculate({
        incomeGoal,
        averageLoanAmount,
        effectiveBps: bps === 0 ? customBps : bps,
        splitPercent,
        houseFee,
        manualClosingsGoal,
        applicationToClosing,
        prequalToApplication,
        conversationToPrequal,
      }),
    );
  }

  return (
    <form
      className="rounded-2xl border border-lf-line bg-white p-5 shadow-card"
      onSubmit={updateResults}
    >
      <h3 className="h-display text-2xl">Sales math calculator</h3>
      <p className="mt-2 text-sm leading-6 text-lf-slate">
        Work backward from an income goal to the conversations you need each
        week. Adjust the assumptions, then update the results.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <NumberField
          label="Annual income goal"
          value={incomeGoal}
          onChange={setIncomeGoal}
          prefix="$"
        />
        <NumberField
          label="Average loan amount"
          value={averageLoanAmount}
          onChange={setAverageLoanAmount}
          prefix="$"
        />
        <label className="grid gap-2 text-sm font-semibold text-lf-charcoal">
          Compensation bps
          <select
            value={bps}
            onChange={(event) => setBps(Number(event.target.value))}
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm"
          >
            <option value={250}>250 bps</option>
            <option value={150}>150 bps</option>
            <option value={100}>100 bps</option>
            <option value={0}>Custom</option>
          </select>
        </label>
        {bps === 0 && (
          <NumberField
            label="Custom bps"
            value={customBps}
            onChange={setCustomBps}
          />
        )}
        <NumberField
          label="Split percentage"
          value={splitPercent}
          onChange={setSplitPercent}
          suffix="%"
        />
        <NumberField
          label="House fee"
          value={houseFee}
          onChange={setHouseFee}
          prefix="$"
        />
        <NumberField
          label="Closings goal (optional)"
          value={manualClosingsGoal}
          onChange={setManualClosingsGoal}
        />
        <NumberField
          label="Application to closing"
          value={applicationToClosing}
          onChange={setApplicationToClosing}
          suffix="%"
        />
        <NumberField
          label="Prequal to application"
          value={prequalToApplication}
          onChange={setPrequalToApplication}
          suffix="%"
        />
        <NumberField
          label="Conversation to prequal"
          value={conversationToPrequal}
          onChange={setConversationToPrequal}
          suffix="%"
        />
      </div>

      <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
        Calculate / Update Results
      </button>

      <div className="mt-6 grid gap-3 rounded-xl bg-lf-mist p-4 sm:grid-cols-2">
        <Result label="Gross revenue per closing" value={money(results.grossRevenuePerClosing)} />
        <Result label="Estimated LO comp per closing" value={money(results.loCompPerClosing)} />
        <Result label="Closings needed" value={count(results.closingsNeeded)} />
        <Result label="Applications needed" value={count(results.applicationsNeeded)} />
        <Result label="Prequals needed" value={count(results.prequalsNeeded)} />
        <Result label="Weekly conversations" value={count(results.weeklyConversations)} />
        <Result label="Daily conversations" value={count(results.dailyConversations)} />
      </div>

      <p className="mt-4 text-xs leading-5 text-lf-slate">
        For internal planning only. Actual compensation depends on current Loan
        Factory compensation plan, role, team agreement, and approved company
        policy.
      </p>
    </form>
  );
}

function calculate({
  incomeGoal,
  averageLoanAmount,
  effectiveBps,
  splitPercent,
  houseFee,
  manualClosingsGoal,
  applicationToClosing,
  prequalToApplication,
  conversationToPrequal,
}: {
  incomeGoal: number;
  averageLoanAmount: number;
  effectiveBps: number;
  splitPercent: number;
  houseFee: number;
  manualClosingsGoal: number;
  applicationToClosing: number;
  prequalToApplication: number;
  conversationToPrequal: number;
}) {
    const grossRevenuePerClosing = averageLoanAmount * (effectiveBps / 10000);
    const loShare = grossRevenuePerClosing * (splitPercent / 100);
    const loCompPerClosing = Math.max(0, loShare - houseFee);
    const closingsNeededByIncome =
      loCompPerClosing > 0 ? incomeGoal / loCompPerClosing : 0;
    const closingsNeeded =
      manualClosingsGoal > 0 ? manualClosingsGoal : closingsNeededByIncome;
    const applicationsNeeded = closingsNeeded / (applicationToClosing / 100);
    const prequalsNeeded = applicationsNeeded / (prequalToApplication / 100);
    const conversationsNeeded = prequalsNeeded / (conversationToPrequal / 100);
    const weeklyConversations = conversationsNeeded / 50;
    const dailyConversations = weeklyConversations / 5;

    return {
      grossRevenuePerClosing,
      loCompPerClosing,
      closingsNeeded,
      applicationsNeeded,
      prequalsNeeded,
      weeklyConversations,
      dailyConversations,
    };
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-lf-charcoal">
      {label}
      <span className="flex items-center rounded-lg border border-lf-line bg-white px-3 focus-within:border-lf-orange focus-within:ring-2 focus-within:ring-lf-orange/20">
        {prefix && <span className="text-lf-slate">{prefix}</span>}
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none"
        />
        {suffix && <span className="text-lf-slate">{suffix}</span>}
      </span>
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      <p className="mt-1 break-words font-display text-xl font-semibold text-lf-navy">
        {value}
      </p>
    </div>
  );
}
