import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param) => {
  return /^(show|edit|new)$/.test(param);
}) satisfies ParamMatcher;