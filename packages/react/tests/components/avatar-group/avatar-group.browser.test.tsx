import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Avatar} from "@/components/avatar";
import {AvatarGroup} from "@/components/avatar-group";

// The clip seam is a mask; only a real engine paints it. Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

/** Themes below the radius scale's ceiling turn the avatars into rounded squares. */
const SQUARISH_RADIUS = "0.125rem";
/** Painted behind the group so a cleared pixel is unmistakable. */
const BACKDROP = "rgb(255, 0, 255)";

const Group = ({
  dir,
  overlap = "clip",
  radius,
  size,
}: {
  dir?: "ltr" | "rtl";
  overlap?: "clip" | "ring";
  radius: string;
  size?: "sm" | "md" | "lg";
}) => (
  <div
    data-testid="stage"
    dir={dir}
    style={{"--radius": radius, background: BACKDROP, width: "fit-content"} as React.CSSProperties}
  >
    <AvatarGroup overlap={overlap} size={size}>
      <Avatar>
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar>
    </AvatarGroup>
  </div>
);

/**
 * Counts how many rows down the first avatar's trailing edge were cleared by
 * the mask. A seam that traces the neighbour's outline clears every row; a
 * circular cut on a rounded-square avatar only clears the middle ones.
 */
const seamRows = async ({
  circular = false,
  rtl = false,
}: {circular?: boolean; rtl?: boolean} = {}) => {
  const stage = page.getByTestId("stage").element() as HTMLElement;
  const avatars = stage.querySelectorAll<HTMLElement>(".avatar");
  const first = avatars[0]!;
  const second = avatars[1]!;

  // `save: false` hands back a data URL rather than writing a file.
  const shot = await page.screenshot({
    base64: true,
    element: page.elementLocator(stage),
    save: false,
  });
  const binary = atob(shot.replace(/^data:[^,]*,/, ""));
  const bitmap = await createImageBitmap(
    new Blob([Uint8Array.from(binary, (char) => char.charCodeAt(0))], {type: "image/png"}),
  );
  const canvas = document.createElement("canvas");

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(bitmap, 0, 0);

  const stageRect = stage.getBoundingClientRect();
  const box = first.getBoundingClientRect();
  const scale = bitmap.width / stageRect.width;
  const size = box.width;
  const originX = box.left - stageRect.left;
  const originY = box.top - stageRect.top;

  // Measured off the DOM: the custom properties are in rem, so parsing them as
  // px would land the probe inside the neighbour.
  const overlap = size - Math.abs(second.getBoundingClientRect().left - box.left);
  const seam = Number.parseFloat(getComputedStyle(first).getPropertyValue("--avatar-group-seam"));
  const bandStart = rtl ? overlap - 1 : size - overlap - seam - 1;

  const isCleared = (x: number, y: number) => {
    const pixel = ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data;

    return pixel[0]! > 200 && pixel[1]! < 120 && pixel[2]! > 200;
  };

  const rows = Array.from({length: 17}, (_, i) => (circular ? 0.25 + i / 32 : 0.06 + i * 0.055));

  if (circular) {
    // Follow the middle of the crescent where both avatar outlines overlap.
    // An opaque pixel just outside the seam proves this is a cut, not empty backdrop.
    const radius = size / 2;

    return rows.filter((t) => {
      const y = size * t;
      const x = size - overlap + radius - Math.sqrt((radius + seam / 2) ** 2 - (y - radius) ** 2);

      return isCleared(originX + x, originY + y) && !isCleared(originX + x - seam - 1, originY + y);
    }).length;
  }

  return rows.filter((t) =>
    Array.from({length: Math.ceil(seam) + 3}, (_, dx) =>
      isCleared(originX + bandStart + dx, originY + size * t),
    ).some(Boolean),
  ).length;
};

describe("AvatarGroup (browser)", () => {
  describe('overlap="clip"', () => {
    it("clears a seam down the full edge when the theme radius squares the avatars", async () => {
      await render(<Group radius={SQUARISH_RADIUS} />);

      expect(await seamRows()).toBe(17);
    });

    it("clears a seam down the full edge in RTL", async () => {
      await render(<Group dir="rtl" radius={SQUARISH_RADIUS} />);

      expect(await seamRows({rtl: true})).toBe(17);
    });

    it.each(["sm", "lg"] as const)("clears a seam down the full edge at size=%s", async (size) => {
      await render(<Group radius={SQUARISH_RADIUS} size={size} />);

      expect(await seamRows()).toBe(17);
    });

    it("keeps the crescent seam on circular avatars", async () => {
      await render(<Group radius="0.5rem" />);

      // A circle curves away from the straight probe band near its poles.
      expect(await seamRows({circular: true})).toBeGreaterThanOrEqual(15);
    });
  });

  describe('overlap="ring"', () => {
    it.each([false, true])(
      "draws no cut, leaving the avatars opaque (circular: %s)",
      async (circular) => {
        await render(<Group overlap="ring" radius={circular ? "0.5rem" : SQUARISH_RADIUS} />);

        expect(await seamRows({circular})).toBe(0);
      },
    );
  });
});
