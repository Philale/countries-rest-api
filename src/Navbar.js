import React from "react";

export default function Navbar(){
    return <nav className="row splitItems centerItems side-padding bg-col-2">
        <h1>Where in the world?</h1>
        <button onClick={() => {
            // HANDLE COLOR SWITCH
            const body = document.querySelector("body");
            const bodyStyle = getComputedStyle(body);
            const currentTheme = bodyStyle.getPropertyValue("--current").replace(" ", "");
            const icon = document.getElementById("theme-icon");
            switch(currentTheme){
                case "light": 
                    body.style.setProperty("--bg-color", "var(--d-very-dark-blue)");
                    body.style.setProperty("--bg-color2", "var(--d-dark-blue)");
                    body.style.setProperty("--current", "dark");
                    body.style.setProperty("--shade", "var(--l-very-dark-blue)");
                    body.style.setProperty("--txt-color", "var(--l-very-light-gray)");
                    icon.classList = "txt-col fa-solid fa-sun";
                    break;
                case "dark":
                    body.style.setProperty("--bg-color", "var(--l-very-light-gray)");
                    body.style.setProperty("--bg-color2", "var(--white)");
                    body.style.setProperty("--current", "light");
                    body.style.setProperty("--shade", "var(--l-shade)");
                    body.style.setProperty("--txt-color", "var(--d-very-dark-blue)");
                    icon.classList = "txt-col fa-solid fa-moon";
                    break;
            }
        }}><i id="theme-icon" className={"txt-col fa-solid fa-moon"}></i></button>
    </nav>
}