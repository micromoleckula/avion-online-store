export async function loadFooter() {
  const footerElement = document.getElementById("footer");
  if (footerElement) {
      try {
          const response = await fetch("/src/components/footer/footer.html");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          footerElement.innerHTML = await response.text();
      } catch (error) {
          console.error("Помилка завантаження footer:", error);
      }
  }
}
