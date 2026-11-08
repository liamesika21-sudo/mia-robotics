/**
 * Team members — publish only with confirmed names/roles AND approved photography.
 * Draft list from the brief (unconfirmed): Founder & CEO, COO, Mechanical Designer, Systems Engineer,
 * Technology & Operations, Chairman. Add entries here once approved; the grid renders only when
 * site.teamApproved is true and every member has a photo.
 */
export type TeamMember = { name: { en: string; he: string }; role: { en: string; he: string }; photo: string };
export const team: TeamMember[] = [];
