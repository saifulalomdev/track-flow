import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const verifyTrackingScript = defineAction({
  accept: "json",
  input: z.object({
    url: z.string().url(),
    websiteId: z.string(),
  }),
  handler: async ({ url, websiteId }) => {

    const response = await fetch(url, {
      headers: {
        "User-Agent": "TrackFlow-Verification-Bot/1.0",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Could not reach site. Server responded with status ${response.status}.`,
      });
    }

    const html = await response.text();

    const allowedDomains = [
      "localhost:3000",
      "tf.saifulalom.com",
      "trackflow.saifulalom.com",
    ]

    const hasScriptSrc = allowedDomains.some(domain => html.includes(`${domain}/script.js`));
    const hasWebsiteId = html.includes(`data-website-id="${websiteId}"`);

    const isVerified = hasScriptSrc && hasWebsiteId;

    if (isVerified) {
      return {
        success: isVerified,
        id: websiteId
      };
    }

    if (!hasScriptSrc) {
      throw new ActionError({
        code: "NOT_FOUND",
        message: "Tracking script tag could not be found. Please ensure the script tag is added to your website's <head>.",
      });
    }

    if (!hasWebsiteId) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Script detected, but the 'data-website-id' attribute is missing or incorrect for this website.",
      });
    }
  },
});