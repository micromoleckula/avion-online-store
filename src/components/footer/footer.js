const footerPath = new URL('../footer/footer.html', import.meta.url).href;

export async function loadFooter() {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
        try {
            const response = await fetch(footerPath);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            footerElement.innerHTML = await response.text();
        } catch (error) {
            console.error("Помилка завантаження footer:", error);
        }
    }
}