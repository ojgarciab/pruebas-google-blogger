const authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const clientId = "507875559835-l3sdlaagl3fedbqvk22jt6ck2aeiaq3m.apps.googleusercontent.com";
const redirect = "https://ojgarciab.github.io/pruebas-google-blogger/";
const scope = "https://www.googleapis.com/auth/blogger";
const aleatorio = Math.random(0).toString(36).substr(2);

/* null si no tenemos aún el testigo almacenado */
let access_token = sessionStorage.getItem('access_token');

if (document.location.hash !== "") {
    const token_obtenido = document.location.hash.match(/\#(?:access_token)\=([\S\s]*?)\&/);
    console.log("token_obtenido", token_obtenido);
    /* Actualizamos el testigo de sesión */
    if (token_obtenido.length === 2) {
        access_token = token_obtenido[1];
        sessionStorage.setItem('access_token', access_token);
        boton_login.style.display = "none";
    }
}

console.log("access_token", access_token);
if (access_token === null) {
    addEventListener('DOMContentLoaded', (event) => {
        boton_login.addEventListener('click', () => {
            let url = new URL(authUrl);
            url.searchParams.append("client_id", clientId);
            url.searchParams.append("redirect_uri", clientId);
            url.searchParams.append("response_type", "token");
            url.searchParams.append("scope", scope);
            url.searchParams.append("state", aleatorio);
            /* Redirigimos a la URL de autenticación del API */
            console.log("url", url);
            window.location = url;
        });
    });
}
