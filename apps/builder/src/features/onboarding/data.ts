import type { Block } from "@typebot.io/blocks-core/schemas/schema";
import { IntegrationBlockType } from "@typebot.io/blocks-integrations/constants";
import type { TEventWithOptions } from "@typebot.io/events/schemas";

type Feature =
  | "editor"
  | "groupTitlesAutoGeneration"
  | Block["type"]
  | TEventWithOptions["type"];

export const onboardingVideos: Partial<
  Record<
    Feature,
    | {
        key: string;
        youtubeId: string;
        deployedAt?: Date;
      }
    | undefined
  >
> = {
  editor: {
    key: "editor",
    youtubeId: "cRLFeQNrTwM",
    deployedAt: new Date("2024-06-04"),
  },
  groupTitlesAutoGeneration: {
    key: "groupTitlesAutoGeneration",
    youtubeId: "cRLFeQNrTwM",
  },
  [IntegrationBlockType.ZAPIER]: {
    key: IntegrationBlockType.ZAPIER,
    youtubeId: "cRLFeQNrTwM",
    deployedAt: new Date("2024-06-04"),
  },
  [IntegrationBlockType.MAKE_COM]: {
    key: IntegrationBlockType.MAKE_COM,
    youtubeId: "cRLFeQNrTwM",
    deployedAt: new Date("2024-06-04"),
  },
};
