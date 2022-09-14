const authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const clientId = "507875559835-l3sdlaagl3fedbqvk22jt6ck2aeiaq3m.apps.googleusercontent.com";
const redirect = "https://ojgarciab.github.io/pruebas-google-blogger/";
const scope = "https://www.googleapis.com/auth/blogger";

/* null si no tenemos aún el testigo almacenado */
let parametros = JSON.parse(sessionStorage.getItem('parametros'));

if (document.location.hash !== "") {
    /* Obtenemos todos los parámetros recibidos en el flujo OAuth */
    const nuevos_parametros = Object.fromEntries(
        new URLSearchParams(document.location.hash.substr(1))
    );
    console.log("nuevos_parametros", nuevos_parametros);
    /* Actualizamos el testigo de sesión */
    if (nuevos_parametros.hasOwnProperty("access_token") === true) {
        console.log("state", sessionStorage.getItem('state'), nuevos_parametros.state)
        sessionStorage.setItem('parametros', JSON.stringify(nuevos_parametros));
        parametros = nuevos_parametros;
        boton_login.style.display = "none";
    }
}

console.log("access_token", parametros.access_token);
if (parametros.access_token === undefined) {
    addEventListener('DOMContentLoaded', (event) => {
        /* Generamos un valor aleatorio de estado que deberá ser devuelto igual */
        const state = Math.random(0).toString(36).substr(2);
        sessionStorage.setItem('state', state);
        boton_login.addEventListener('click', () => {
            let url = new URL(authUrl);
            url.searchParams.append("client_id", clientId);
            url.searchParams.append("redirect_uri", redirect);
            url.searchParams.append("response_type", "token");
            url.searchParams.append("scope", scope);
            url.searchParams.append("state", state);
            /* Redirigimos a la URL de autenticación del API */
            console.log("url", url);
            window.location = url;
        });
    });
} else {
    fetch(
        "https://www.googleapis.com/blogger/v3/users/userId/blogs",
        {
            "headers": {
                "Authorization": parametros.access_token,
            },
        "method": "GET",
        }
    )
    .then(respuesta => respuesta.json())
    .then(datos => console.log(datos));
}
