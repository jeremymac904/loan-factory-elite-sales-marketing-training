"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getPlatformVideoAssetPath,
  getPlatformVideoFilters,
  getPlatformVideosByType,
  platformVideoLibrary,
  platformVideoStats,
  type PlatformHostingStatus,
  type PlatformPiiReviewStatus,
  type PlatformReviewStatus,
  type PlatformVideoRecord,
  type PlatformVideoType,
} from "@/data/platformVideoLibrary";

type Props = {
  className?: string;
  initialVideoType?: PlatformVideoType | "all";
};

type Filters = {
  query: string;
  videoType: PlatformVideoType | "all";
  section: string;
  category: string;
  hostingStatus: string;
  reviewStatus: string;
  piiStatus: string;
};

const allValue = "all";

const initialFilters: Filters = {
  query: "",
  videoType: "clip",
  section: allValue,
  category: allValue,
  hostingStatus: allValue,
  reviewStatus: allValue,
  piiStatus: allValue,
};

export default function PlatformVideoLibraryExplorer({
  className = "",
  initialVideoType = "clip",
}: Props) {
  const [filters, setFilters] = useState<Filters>({
    ...initialFilters,
    videoType: initialVideoType,
  });
  const [selectedVideoId, setSelectedVideoId] = useState<string>("");

  const filterOptions = useMemo(() => getPlatformVideoFilters(), []);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return getPlatformVideosByType(filters.videoType).filter((video) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          video.id,
          video.title,
          video.description,
          video.video_type,
          video.source_file_name,
          video.source_folder,
          video.source_report_file,
          video.category,
          video.platform_section,
          video.recommended_route,
          video.duration,
          video.thumbnail_file,
          video.caption_file,
          video.markdown_file,
          video.google_drive_file_id,
          video.google_drive_url,
          video.youtube_video_id,
          video.youtube_url,
          video.youtube_embed_url,
          video.hosting_status,
          video.upload_status,
          video.manual_review_status,
          video.pii_review_status,
          video.visibility,
          video.priority,
          video.notes,
          ...(video.tags ?? []),
          ...(video.audience ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        matches(filters.section, video.platform_section) &&
        matches(filters.category, video.category) &&
        matches(filters.hostingStatus, video.hosting_status) &&
        matches(filters.reviewStatus, video.manual_review_status) &&
        matches(filters.piiStatus, video.pii_review_status)
      );
    });
  }, [filters.category, filters.hostingStatus, filters.piiStatus, filters.query, filters.reviewStatus, filters.section, filters.videoType]);

  const selectedVideo = useMemo(() => {
    return filteredVideos.find((video) => video.id === selectedVideoId) ?? filteredVideos[0];
  }, [filteredVideos, selectedVideoId]);

  const selectedThumbnail = selectedVideo
    ? getPlatformVideoAssetPath("thumbnail", selectedVideo.thumbnail_file)
    : "";
  const selectedCaption = selectedVideo
    ? getPlatformVideoAssetPath("caption", selectedVideo.caption_file)
    : "";
  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard label="Total videos" value={platformVideoStats.total} />
        <StatCard label="Long form" value={platformVideoStats.longForm} />
        <StatCard label="Cutdown clips" value={platformVideoStats.clips} />
        <StatCard label="Drive pending" value={platformVideoStats.drivePending} />
        <StatCard label="Manual review" value={platformVideoStats.manualReviewNeeded} />
        <StatCard label="Source issues" value={platformVideoStats.sourceIssue} />
      </div>

      <div className="mt-6 rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(5,minmax(0,1fr))]">
          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal lg:col-span-2">
            Search
            <input
              value={filters.query}
              onChange={(event) =>
                setFilters((current) => ({ ...current, query: event.target.value }))
              }
              className="rounded-xl border border-lf-line px-3 py-2 text-base font-normal outline-none transition focus:border-lf-orange"
              placeholder="Search title, source file, tag, or status"
              aria-label="Search videos"
            />
          </label>

          <FilterSelect
            label="Video type"
            value={filters.videoType}
            options={["all", "long_form", "clip"]}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                videoType: value as Filters["videoType"],
              }))
            }
          />

          <FilterSelect
            label="Platform section"
            value={filters.section}
            options={filterOptions.sections}
            onChange={(value) =>
              setFilters((current) => ({ ...current, section: value }))
            }
          />

          <FilterSelect
            label="Category"
            value={filters.category}
            options={filterOptions.categories}
            onChange={(value) =>
              setFilters((current) => ({ ...current, category: value }))
            }
          />

          <FilterSelect
            label="Hosting status"
            value={filters.hostingStatus}
            options={filterOptions.hostingStatuses}
            onChange={(value) =>
              setFilters((current) => ({ ...current, hostingStatus: value }))
            }
          />

          <FilterSelect
            label="Manual review"
            value={filters.reviewStatus}
            options={filterOptions.reviewStatuses}
            onChange={(value) =>
              setFilters((current) => ({ ...current, reviewStatus: value }))
            }
          />

          <FilterSelect
            label="PII review"
            value={filters.piiStatus}
            options={filterOptions.piiStatuses}
            onChange={(value) =>
              setFilters((current) => ({ ...current, piiStatus: value }))
            }
          />

          <div className="flex items-end lg:col-span-2">
            <button
              type="button"
              onClick={() =>
                setFilters({
                  ...initialFilters,
                  videoType: initialVideoType,
                })
              }
              className="btn-secondary w-full justify-center"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-4 text-sm leading-6 text-lf-charcoal">
        <strong>Safety:</strong> clip uploads stay on YouTube hold until review is complete.
        Drive links stay pending until a real Loan Factory Google Drive URL is available.
        No public URLs are invented here.
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_360px]">
        <section className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lf-line px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                Video inventory
              </p>
              <p className="mt-1 text-sm font-semibold text-lf-slate">
                Showing {filteredVideos.length} of {getPlatformVideosByType(filters.videoType).length} in the current type view
              </p>
            </div>
            <p className="text-sm font-semibold text-lf-charcoal">
              {displayFilterSummary(filters)}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1080px] w-full border-collapse text-left">
              <thead className="bg-lf-mist/80 text-xs uppercase tracking-wide text-lf-slate">
                <tr>
                  <th className="px-4 py-3 font-semibold">Thumbnail</th>
                  <th className="px-4 py-3 font-semibold">Title and summary</th>
                  <th className="px-4 py-3 font-semibold">Type and section</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">Hosting</th>
                  <th className="px-4 py-3 font-semibold">Review</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((video) => {
                  const active = video.id === selectedVideo?.id;
                  const thumbnail = video.thumbnail_file
                    ? getPlatformVideoAssetPath("thumbnail", video.thumbnail_file)
                    : "";

                  return (
                    <tr
                      key={video.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedVideoId(video.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedVideoId(video.id);
                        }
                      }}
                      className={`cursor-pointer border-t border-lf-line transition hover:bg-lf-mist/70 ${
                        active ? "bg-lf-orangeSoft/40" : ""
                      }`}
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="relative h-16 w-28 overflow-hidden rounded-xl border border-lf-line bg-lf-mist">
                          {thumbnail ? (
                            <Image
                              src={thumbnail}
                              alt={video.title}
                              fill
                              className="object-cover"
                              sizes="112px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                              No thumbnail
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="max-w-2xl">
                          <h3 className="text-sm font-bold text-lf-charcoal">
                            {video.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-lf-slate">
                            {video.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {video.thumbnail_file && (
                              <Badge tone="neutral">Thumbnail</Badge>
                            )}
                            {video.caption_file && (
                              <Badge tone="neutral">Caption</Badge>
                            )}
                            {video.markdown_file && (
                              <Badge tone="neutral">Markdown notes</Badge>
                            )}
                            {video.source_report_file && (
                              <Badge tone="neutral">Source report</Badge>
                            )}
                            {video.manual_review_status === "manual_review_needed" && (
                              <Badge tone="warning">Manual review needed</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="space-y-2">
                          <Badge tone="accent">
                            {displayVideoType(video.video_type)}
                          </Badge>
                          <p className="text-sm font-semibold text-lf-charcoal">
                            {video.platform_section}
                          </p>
                          <p className="text-sm text-lf-slate">{video.category}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <p className="text-sm font-semibold text-lf-charcoal">
                          {video.duration}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-lf-slate">
                          {video.priority}
                        </p>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="space-y-2">
                          <Badge tone={hostingTone(video.hosting_status)}>
                            {displayHostingStatus(video.hosting_status)}
                          </Badge>
                          <p className="text-xs leading-5 text-lf-slate">
                            {displayUploadStatus(video.upload_status)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="space-y-2">
                          <Badge tone={reviewTone(video.manual_review_status)}>
                            {displayReviewStatus(video.manual_review_status)}
                          </Badge>
                          <p className="text-xs leading-5 text-lf-slate">
                            PII {displayPiiStatus(video.pii_review_status)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-col gap-2">
                          <ActionLink
                            href={video.google_drive_url}
                            label={
                              video.google_drive_url
                                ? "Open Drive fallback"
                                : "Drive pending"
                            }
                            disabled={!video.google_drive_url}
                          />
                          <ActionLink
                            href={video.youtube_embed_url}
                            label={
                              video.youtube_embed_url
                                ? "Open YouTube embed"
                                : "YouTube pending"
                            }
                            disabled={!video.youtube_embed_url}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredVideos.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center">
                      <p className="text-sm font-semibold text-lf-charcoal">
                        No videos match the current filters.
                      </p>
                      <p className="mt-2 text-sm text-lf-slate">
                        Clear the search or reset the filters to show the
                        library again.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-4">
          {selectedVideo ? (
            <>
              <section className="overflow-hidden rounded-2xl border border-lf-line bg-white shadow-card">
                <div className="p-4">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-lf-line bg-lf-mist">
                    {selectedThumbnail ? (
                      <Image
                        src={selectedThumbnail}
                        alt={selectedVideo.title}
                        fill
                        className="object-cover"
                        sizes="360px"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-start justify-end bg-[linear-gradient(135deg,rgba(17,17,17,0.92),rgba(242,106,31,0.46))] p-4 text-white">
                        <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                          Thumbnail not staged
                        </p>
                        <p className="mt-1 text-sm leading-6 text-white/90">
                          {selectedVideo.video_type === "long_form"
                            ? "Source video ready"
                            : "Cutdown thumbnail available in the source package"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="accent">{displayVideoType(selectedVideo.video_type)}</Badge>
                    <Badge tone={hostingTone(selectedVideo.hosting_status)}>
                      {displayHostingStatus(selectedVideo.hosting_status)}
                    </Badge>
                    <Badge tone={reviewTone(selectedVideo.manual_review_status)}>
                      {displayReviewStatus(selectedVideo.manual_review_status)}
                    </Badge>
                    <Badge tone="neutral">{selectedVideo.visibility}</Badge>
                  </div>

                  <h2 className="h-display mt-4 text-2xl">{selectedVideo.title}</h2>
                  <p className="prose-lf mt-3 text-sm text-lf-slate">
                    {selectedVideo.description}
                  </p>

                  {selectedVideo.video_type === "long_form" && (
                    <div className="mt-4 rounded-xl border border-lf-orange/30 bg-lf-orangeSoft p-4 text-sm leading-6 text-lf-charcoal">
                      <p className="font-semibold text-lf-orangeDark">
                        Upload pending
                      </p>
                      <p className="mt-1">Source video ready.</p>
                      <p>Timestamp report available.</p>
                      <p>No local file path is exposed here.</p>
                    </div>
                  )}

                  {selectedVideo.manual_review_status === "manual_review_needed" && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                      Manual review is still required before any YouTube live
                      promotion. No automated OCR or PII detection has been used
                      to clear this record.
                    </div>
                  )}

                  <div className="mt-5 grid gap-3 text-sm">
                    <DetailRow
                      label="Hosting status"
                      value={displayHostingStatus(selectedVideo.hosting_status)}
                    />
                    <DetailRow
                      label="Upload status"
                      value={displayUploadStatus(selectedVideo.upload_status)}
                    />
                    <DetailRow label="Source folder" value={selectedVideo.source_folder} />
                    <DetailRow label="Source file" value={selectedVideo.source_file_name} />
                    <DetailRow
                      label="Source report"
                      value={
                        selectedVideo.source_report_file || "Timestamp report available"
                      }
                    />
                    <DetailRow
                      label="Thumbnail file"
                      value={selectedVideo.thumbnail_file || "Not staged"}
                      href={selectedThumbnail}
                    />
                    <DetailRow
                      label="Caption file"
                      value={selectedVideo.caption_file || "Not staged"}
                      href={selectedCaption}
                    />
                    <DetailRow
                      label="Markdown notes"
                      value={selectedVideo.markdown_file || "Markdown notes available"}
                    />
                    <DetailRow
                      label="Recommended route"
                      value={selectedVideo.recommended_route}
                      href={selectedVideo.recommended_route}
                    />
                  </div>

                  <div className="mt-5 grid gap-2">
                    <ActionLink
                      href={selectedVideo.google_drive_url}
                      label={
                        selectedVideo.google_drive_url
                          ? "Open Google Drive fallback"
                          : "Google Drive fallback pending"
                      }
                      disabled={!selectedVideo.google_drive_url}
                    />
                    <ActionLink
                      href={selectedVideo.youtube_embed_url}
                      label={
                        selectedVideo.youtube_embed_url
                          ? "Open YouTube embed"
                          : "YouTube embed pending"
                      }
                      disabled={!selectedVideo.youtube_embed_url}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-lf-line bg-white p-4 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                  Additional notes
                </p>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  {selectedVideo.notes}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedVideo.tags.slice(0, 6).map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="rounded-2xl border border-lf-line bg-white p-4 shadow-card">
              <p className="text-sm font-semibold text-lf-charcoal">
                No video selected.
              </p>
              <p className="mt-2 text-sm text-lf-slate">
                Adjust the filters to surface a video record.
              </p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="grid gap-1 rounded-xl border border-lf-line bg-lf-mist/50 px-3 py-2">
      <p className="text-[11px] font-bold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      {href ? (
        <Link
          href={href}
          target={opensInNewTab(href) ? "_blank" : undefined}
          rel={opensInNewTab(href) ? "noreferrer noopener" : undefined}
          className="break-all text-sm font-semibold text-lf-charcoal underline decoration-lf-orange/40 underline-offset-4 transition hover:text-lf-orangeDark"
        >
          {value}
        </Link>
      ) : (
        <p className="break-all text-sm font-semibold text-lf-charcoal">{value}</p>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-lf-line bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-lf-orange"
      >
        <option value={allValue}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {displayValue(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ActionLink({
  href,
  label,
  disabled,
}: {
  href: string;
  label: string;
  disabled?: boolean;
}) {
  if (disabled || !href) {
    return (
      <span className="inline-flex items-center justify-center rounded-xl border border-dashed border-lf-line px-3 py-2 text-sm font-semibold text-lf-slate">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      target={opensInNewTab(href) ? "_blank" : undefined}
      rel={opensInNewTab(href) ? "noreferrer noopener" : undefined}
      className="inline-flex items-center justify-center rounded-xl border border-lf-orange/40 bg-lf-orangeSoft px-3 py-2 text-sm font-semibold text-lf-orangeDark transition hover:border-lf-orange hover:bg-lf-orange/10"
    >
      {label}
    </Link>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "accent" | "neutral" | "warning" | "success" | "danger";
  children: string;
}) {
  const classes =
    tone === "accent"
      ? "bg-lf-orangeSoft text-lf-orangeDark border-lf-orange/30"
      : tone === "warning"
        ? "bg-amber-100 text-amber-900 border-amber-200"
        : tone === "success"
          ? "bg-emerald-100 text-emerald-900 border-emerald-200"
          : tone === "danger"
            ? "bg-rose-100 text-rose-900 border-rose-200"
            : "bg-lf-mist text-lf-slate border-lf-line";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${classes}`}
    >
      {children}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-lf-navy">{value}</p>
    </div>
  );
}

function matches(filterValue: string, candidate: string) {
  return filterValue === allValue || candidate === filterValue;
}

function displayFilterSummary(filters: Filters) {
  const parts = [
    filters.videoType === "all" ? "All types" : displayVideoType(filters.videoType),
    filters.section === allValue ? "All sections" : filters.section,
    filters.category === allValue ? "All categories" : filters.category,
  ];

  return parts.join(" · ");
}

function displayValue(value: string) {
  if (value === allValue) return "All";
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function displayVideoType(videoType: PlatformVideoType) {
  return videoType === "long_form" ? "Long form" : "Cutdown clip";
}

function displayHostingStatus(status: PlatformHostingStatus) {
  const labels: Record<PlatformHostingStatus, string> = {
    local_only: "Local only",
    google_drive_pending: "Drive pending",
    google_drive_live: "Drive live",
    youtube_pending: "YouTube pending",
    youtube_live: "YouTube live",
    manual_review_needed: "Manual review",
    source_issue: "Source issue",
  };

  return labels[status];
}

function displayReviewStatus(status: PlatformReviewStatus) {
  const labels: Record<PlatformReviewStatus, string> = {
    manual_review_needed: "Review needed",
    reviewed: "Reviewed",
    source_issue: "Source issue",
  };

  return labels[status];
}

function displayPiiStatus(status: PlatformPiiReviewStatus) {
  const labels: Record<PlatformPiiReviewStatus, string> = {
    manual_review_needed: "manual review needed",
    clear: "clear",
    flagged: "flagged",
    unknown: "unknown",
  };

  return labels[status];
}

function displayUploadStatus(status: string) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "youtube_hold" || normalized === "hold") return "Hold";
  if (normalized === "pending") return "Pending";
  if (normalized === "uploaded") return "Uploaded";
  if (normalized === "not_started") return "Not started";
  return displayValue(status);
}

function opensInNewTab(href: string) {
  return href.startsWith("http") || href.startsWith("/training-assets/");
}

function hostingTone(status: PlatformHostingStatus): "accent" | "neutral" | "warning" | "success" | "danger" {
  if (status === "youtube_live" || status === "google_drive_live") return "success";
  if (status === "source_issue") return "danger";
  if (status === "manual_review_needed") return "warning";
  return "neutral";
}

function reviewTone(status: PlatformReviewStatus): "accent" | "neutral" | "warning" | "success" | "danger" {
  if (status === "reviewed") return "success";
  if (status === "source_issue") return "danger";
  return "warning";
}
