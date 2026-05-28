"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { ProfileRow } from "@/lib/supabase/auth";

type Props = {
  profile: ProfileRow | null;
};

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved" }
  | { status: "error"; message: string };

export default function ProfileEditForm({ profile }: Props) {
  const router = useRouter();
  const [state, setState] = useState<SaveState>({ status: "idle" });
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [secondaryPhone, setSecondaryPhone] = useState(
    profile?.secondary_phone ?? "",
  );
  const [title, setTitle] = useState(profile?.title ?? "");
  const [department, setDepartment] = useState(profile?.department ?? "");
  const [teamBrand, setTeamBrand] = useState(profile?.team_brand ?? "");
  const [profileUrl, setProfileUrl] = useState(profile?.profile_url ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [nmls, setNmls] = useState(profile?.nmls ?? "");
  const [statesLicensed, setStatesLicensed] = useState(
    profile?.states_licensed?.join(", ") ?? "",
  );
  const [timezone, setTimezone] = useState(
    profile?.timezone ?? "America/Los_Angeles",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "saving" });

    const payload = {
      full_name: fullName.trim() || null,
      phone: phone.trim() || null,
      secondary_phone: secondaryPhone.trim() || null,
      title: title.trim() || null,
      department: department.trim() || null,
      team_brand: teamBrand.trim() || null,
      profile_url: profileUrl.trim() || null,
      bio: bio.trim() || null,
      nmls: nmls.trim() || null,
      states_licensed: statesLicensed
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      timezone: timezone.trim() || null,
    };

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setState({
          status: "error",
          message: body.error ?? "Profile save failed.",
        });
        return;
      }

      setState({ status: "saved" });
      router.refresh();
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Profile save failed.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-3xl gap-6">
      <div className="card grid gap-4">
        <h2 className="h-display text-2xl">Identity</h2>
        <Field label="Full name" value={fullName} onChange={setFullName} />
        <Field label="Title" value={title} onChange={setTitle} placeholder="e.g. Senior Loan Officer" />
        <Field label="Department" value={department} onChange={setDepartment} />
        <Field label="Team / Brand" value={teamBrand} onChange={setTeamBrand} placeholder="e.g. The Legends Mortgage Team" />
      </div>

      <div className="card grid gap-4">
        <h2 className="h-display text-2xl">Contact</h2>
        <Field label="Primary phone" value={phone} onChange={setPhone} placeholder="904-442-3213" />
        <Field label="Secondary phone" value={secondaryPhone} onChange={setSecondaryPhone} />
        <Field
          label="Profile URL"
          value={profileUrl}
          onChange={setProfileUrl}
          placeholder="https://www.loanfactory.com/yourname"
        />
      </div>

      <div className="card grid gap-4">
        <h2 className="h-display text-2xl">Loan Officer details</h2>
        <Field label="NMLS #" value={nmls} onChange={setNmls} />
        <Field
          label="States licensed (comma separated)"
          value={statesLicensed}
          onChange={setStatesLicensed}
          placeholder="CA, FL, TX"
        />
        <TextArea label="Bio" value={bio} onChange={setBio} placeholder="A short bio used in FaceGram and team directory." />
      </div>

      <div className="card grid gap-4">
        <h2 className="h-display text-2xl">Preferences</h2>
        <Field label="Timezone" value={timezone} onChange={setTimezone} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={state.status === "saving"}
          className="btn-primary disabled:opacity-50"
        >
          {state.status === "saving" ? "Saving..." : "Save profile"}
        </button>
        {state.status === "saved" && (
          <span className="text-sm font-semibold text-green-700">Saved.</span>
        )}
        {state.status === "error" && (
          <span className="text-sm font-semibold text-red-600">
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-lf-slate">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-lf-slate">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
      />
    </label>
  );
}
