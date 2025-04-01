const featuresPath = new URL('features.html', import.meta.url).href;

export async function loadFeatures() {
    const featuresElement = document.getElementById("features");
    if (featuresElement) {
        try {
            const response = await fetch(featuresPath);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            featuresElement.innerHTML = await response.text();
        } catch (error) {
            console.error("Помилка завантаження features:", error);
        }
    }
}