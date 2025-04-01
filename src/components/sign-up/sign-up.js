const signUpPath = new URL('sign-up.html', import.meta.url).href;

export async function loadSignUp() {
    const signUpElement = document.getElementById("sign-up");
    if (signUpElement) {
        try {
            const response = await fetch(signUpPath);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            signUpElement.innerHTML = await response.text();
        } catch (error) {
            console.error("Помилка завантаження sign-up:", error);
        }
    }
}