export const ORG_TYPES = ["Federally Qualified Health Center (FQHC)", "Community health center", "Safety-net or community hospital", "Other healthcare organization", "Nonprofit", "Professional services", "Financial services", "Other"] as const;
export const SIZES = ["Under 25 people", "25–100", "101–500", "501–2,000", "Over 2,000"] as const;
export const FOLLOWUPS = ["Email", "Phone call", "Video meeting"] as const;

export type ContactInput = { fullName: string; organization: string; role: string; email: string; phone?: string; orgType: string; size?: string; concern?: string; followUp: string; website?: string; startedAt?: number; token?: string };
export function validate(b: Record<string, unknown>): { ok: true; data: ContactInput } | { ok: false; errors: Record<string, string> } {
  const s = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const errors: Record<string, string> = {};
  const d = { fullName: s("fullName"), organization: s("organization"), role: s("role"), email: s("email"), phone: s("phone"), orgType: s("orgType"), size: s("size"), concern: s("concern"), followUp: s("followUp") };
  if (d.fullName.length < 2 || d.fullName.length > 100) errors.fullName = "Please enter your full name.";
  if (d.organization.length < 2 || d.organization.length > 150) errors.organization = "Please enter your organization.";
  if (d.role.length < 2 || d.role.length > 100) errors.role = "Please enter your title or role.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || d.email.length > 254) errors.email = "Please enter a valid business email.";
  if (d.phone && !/^[0-9+().\-\s]{7,25}$/.test(d.phone)) errors.phone = "Please enter a valid phone number or leave blank.";
  if (!(ORG_TYPES as readonly string[]).includes(d.orgType)) errors.orgType = "Please select an organization type.";
  if (d.size && !(SIZES as readonly string[]).includes(d.size)) errors.size = "Please choose a listed size.";
  if (d.concern.length > 500) errors.concern = "Please keep this under 500 characters.";
  if (!(FOLLOWUPS as readonly string[]).includes(d.followUp)) errors.followUp = "Please choose a follow-up method.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { ...d, website: s("website"), startedAt: Number(b.startedAt) || 0, token: s("token") } };
}
