import { z } from "zod";

export const SpellCheckMessage = z.object({
  ruleId: z.string(),
  message: z.string(),
  range: z.array(z.number()),
  fix: z.object({
    range: z.array(z.number()),
    text: z.string(),
  }),
});

export const SpellCheckResult = z.object({
  messages: z.array(SpellCheckMessage),
});

export type SpellCheckResultType = z.infer<typeof SpellCheckResult>;
