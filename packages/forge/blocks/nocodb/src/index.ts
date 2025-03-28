import { createBlock } from "@typebot.io/forge";
import { createRecord } from "./actions/createRecord";
import { searchRecords } from "./actions/searchRecords";
import { updateExistingRecord } from "./actions/updateExistingRecord";
import { auth } from "./auth";
import { NocodbLogo } from "./logo";

export const nocodbBlock = createBlock({
  id: "nocodb",
  name: "NocoDB",
  tags: ["database"],
  LightLogo: NocodbLogo,
  auth,
  actions: [searchRecords, createRecord, updateExistingRecord],
  docsUrl: "https://docs.zazubot.com/editor/blocks/integrations/nocodb",
  onboarding: {
    youtubeId: "cRLFeQNrTwM",
    deployedAt: new Date("2023-06-20"),
  },
});
