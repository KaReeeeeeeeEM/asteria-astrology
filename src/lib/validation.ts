import { z } from "zod";
export const birthSchema = z.object({
  name: z.string().trim().min(1).max(80),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((v) => {
      const d = new Date(`${v}T12:00:00Z`);
      return (
        Number.isFinite(d.getTime()) &&
        d.toISOString().slice(0, 10) === v &&
        v >= "1900-01-01" &&
        v <= new Date().toISOString().slice(0, 10)
      );
    }, "Enter a real birth date between 1900 and today."),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  timezone: z
    .string()
    .min(1)
    .max(80)
    .refine((v) => {
      try {
        new Intl.DateTimeFormat("en", { timeZone: v });
        return true;
      } catch {
        return false;
      }
    }, "Choose a valid IANA time zone."),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  place: z.string().trim().min(1).max(160),
  unknownTime: z.boolean(),
});
export const journalSchema = z.object({
  text: z.string().trim().min(1).max(5000),
  mood: z.enum(["Grounded", "Inspired", "Reflective", "Restless", "Tender"]),
});
