export const SITE_URL = "https://rmc-kgp.netlify.app";

export enum Semester {
  Spring,
  Automn,
}

export function semesterToString(s: Semester): string {
  if (s == 0) return "Spring";
  else if (s == 1) return "Automn";
  else throw "invalid value for semester";
}

export function startSemesterYear(
  month: number,
  year: number,
): [Semester, number] {
  let start_sem;
  if (month > 10 || month < 3) {
    start_sem = Semester.Automn;
  } else if (month > 3) {
    start_sem = Semester.Spring;
  }
  if (month < 3) year -= 1;

  return [start_sem, year];
}
