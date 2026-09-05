import { HugeiconsIcon } from "@hugeicons/react";

export function ThemedIcon({ icon }) {
  return (
    <HugeiconsIcon
      aria-hidden="true"
      className="themed-community-icon"
      data-icon-family="hugeicons"
      icon={icon}
      strokeWidth={1.9}
    />
  );
}
