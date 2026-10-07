import { toast as original, type ExternalToast } from "sonner";
import { runtimeTranslate } from "@/i18n/translation";
const message = (value: Parameters<typeof original>[0]) =>
  typeof value === "string" ? runtimeTranslate(value) : value;
const options = (data?: ExternalToast) =>
  data
    ? {
        ...data,
        description:
          typeof data.description === "string"
            ? runtimeTranslate(data.description)
            : data.description,
      }
    : undefined;
export const toast = Object.assign(
  (value: Parameters<typeof original>[0], data?: ExternalToast) =>
    original(message(value), options(data)),
  original,
  {
    success: (
      value: Parameters<typeof original.success>[0],
      data?: ExternalToast,
    ) => original.success(message(value), options(data)),
    error: (
      value: Parameters<typeof original.error>[0],
      data?: ExternalToast,
    ) => original.error(message(value), options(data)),
  },
);
