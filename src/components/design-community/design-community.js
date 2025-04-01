const designCommunityPath = new URL('design-community.html', import.meta.url).href;

export async function loadDesignCommunity() {
    const designCommunityElement = document.getElementById("design-community");
    if (designCommunityElement) {
        try {
            const response = await fetch(designCommunityPath);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            designCommunityElement.innerHTML = await response.text();
        } catch (error) {
            console.error("Помилка завантаження design-community:", error);
        }
    }
}