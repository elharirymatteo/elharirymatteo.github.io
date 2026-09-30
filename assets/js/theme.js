// Theme toggle shared by all pages. Loaded in <head> so the saved theme
// is applied before first paint (no light flash in dark mode).
(function () {
    var saved = 'light';
    try { saved = localStorage.getItem('theme') || 'light'; } catch (e) {}
    document.documentElement.setAttribute('data-theme', saved);
})();

function updateThemeToggleLabel() {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
}

function toggleTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch (e) {}
    updateThemeToggleLabel();
}

document.addEventListener('DOMContentLoaded', updateThemeToggleLabel);
