import type { PageLoad } from "./$types";
import { Mode } from "../../../lib/apiclient";

export const load = (({ params }) => {
  const modekey = params.mode as keyof typeof Mode;
  return {
    mode: Mode[modekey],
    uuid: params.uuid
  };
}) satisfies PageLoad;