import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import OpenAI, { type ClientOptions } from "openai";

type Props = {
  apiKey?: string;
  baseUrl?: string;
  apiVersion?: string;
};

export const fetchGPTModels = async ({
  apiKey,
  baseUrl,
  apiVersion,
}: Props) => {
  if (!apiKey) return { data: [] };

  const config = {
    apiKey: apiKey,
    baseURL: baseUrl,
    defaultHeaders: {
      "api-key": apiKey,
    },
    defaultQuery: apiVersion
      ? {
          "api-version": apiVersion,
        }
      : undefined,
  } satisfies ClientOptions;

  const openai = new OpenAI(config);

  try {
    const models = await openai.models.list();
    return {
      data:
        models.data
          .filter(
            (model) =>
              model.id.includes("gpt") &&
              !model.id.includes("-audio-") &&
              !model.id.includes("-realtime-"),
          )
          .sort((a, b) => b.created - a.created)
          .map((model) => model.id) ?? [],
    };
  } catch (err) {
    return {
      error: await parseUnknownError({ err, context: "While fetching models" }),
    };
  }
};
