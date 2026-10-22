export function isGameReady(
  event: Pick<MessageEvent<unknown>, "source" | "origin" | "data">,
  frame: Window | null,
): boolean {
  return frame !== null && event.source === frame && event.origin === "null" &&
    typeof event.data === "object" && event.data !== null &&
    "type" in event.data && event.data.type === "little-clip-factory:ready";
}
