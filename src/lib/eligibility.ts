/**
 * Shared branch and eligibility matching utilities for CampusRise
 */

export function checkBranchMatch(studentBranch: string, allowedBranches: string[]): boolean {
  if (!allowedBranches || allowedBranches.length === 0 || allowedBranches.includes("ALL")) {
    return true;
  }
  const s = (studentBranch || "").toLowerCase().trim();
  return allowedBranches.some((rawAllowed) => {
    const a = (rawAllowed || "").toLowerCase().trim();
    if (a === "all" || !a) return true;
    if (s === a) return true;
    if (s.includes(a) || a.includes(s)) return true;

    // Computer Science & Engineering aliases (CSE, CS, Computer Science, etc.)
    if (
      (a === "cse" || a === "cs" || a === "computer science" || a === "comp sci" || a === "c.s.e.") &&
      (s.includes("computer") || s.includes("cse") || s.includes("cs ") || s.endsWith("cs") || s.includes("software"))
    ) {
      return true;
    }

    // Information Technology aliases
    if (
      (a === "it" || a === "information technology" || a === "i.t.") &&
      (s.includes("information") || s.includes("technology") || s.includes("it"))
    ) {
      return true;
    }

    // Electronics & Communication aliases
    if (
      (a === "ece" || a === "electronics" || a === "ec" || a === "e.c.e.") &&
      (s.includes("electronics") || s.includes("ece") || s.includes("communication"))
    ) {
      return true;
    }

    // Artificial Intelligence & Data Science aliases
    if (
      (a === "ai_ds" || a === "ai" || a === "ds" || a === "data science" || a === "artificial intelligence") &&
      (s.includes("ai") || s.includes("data") || s.includes("intelligence") || s.includes("artificial"))
    ) {
      return true;
    }

    // Mechanical
    if (
      (a === "me" || a === "mech" || a === "mechanical") &&
      (s.includes("mechanical") || s.includes("mech") || s === "me")
    ) {
      return true;
    }

    // Civil
    if (
      (a === "ce" || a === "civil") &&
      (s.includes("civil") || s === "ce")
    ) {
      return true;
    }

    // Electrical
    if (
      (a === "ee" || a === "eee" || a === "electrical") &&
      (s.includes("electrical") || s.includes("electronics") || s === "ee")
    ) {
      return true;
    }

    return false;
  });
}
