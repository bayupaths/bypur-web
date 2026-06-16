import type { Profile } from "@/lib/types";

interface StatsRowProps {
  profileData: Profile;
  yearLabel: string;
}

export function StatsRow({ profileData, yearLabel }: StatsRowProps) {
  return (
    <dl className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-border pt-6">
      <div className="flex items-baseline gap-2">
        <dt className="font-mono text-2xl font-bold tabular-nums text-text-1">
          5+
        </dt>
        <dd className="text-[13px] text-text-3">{yearLabel}</dd>
      </div>
      {profileData.stats?.map((stat) => (
        <div key={stat.label} className="flex items-baseline gap-2">
          <dt className="font-mono text-2xl font-bold tabular-nums text-text-1">
            {stat.value}
          </dt>
          <dd className="text-[13px] text-text-3">
            {stat.label.toLowerCase()}
          </dd>
        </div>
      ))}
    </dl>
  );
}
