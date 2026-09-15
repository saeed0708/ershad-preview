const fieldKeys = new Set([
    "title", "subtitle", "original-title", "contributors", "contributor-years", "contributor-details", "audience",
    "page-count", "subjects", "identifier-type", "isbn", "national-bibliography",
    "publishers", "first-publication", "previous-print", "first-title", "revision", "first-publisher"
]);

// A preview click targets only this feature's own editor; no form values leave the page.
export function focusBookField(key) {
    if (!fieldKeys.has(key)) return false;
    const target = key === "contributor-details"
        ? document.querySelector("input[data-book-nickname='true']")
        : document.getElementById(`preprint-field-${key}`);
    if (!target) return false;
    const editor = target.matches("input, textarea, select, summary")
        ? target
        : target.querySelector("input[type='text'], textarea, select, summary, input, button");
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === "DETAILS") parent.open = true;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ block: "center", behavior: reduceMotion ? "instant" : "smooth" });
    (editor ?? target).focus({ preventScroll: true });
    return true;
}
