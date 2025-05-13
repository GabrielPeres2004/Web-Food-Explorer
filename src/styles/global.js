import { createGlobalStyle } from "styled-components";
import { LAYOUTBREAKPOINTS } from "./layoutBreakpoints";

export default createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 1.6rem;

    text-decoration: none;
    list-style: none;

}

::-webkit-scrollbar {
  width: 2px;  
}


::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.COLORS.DARK_1000};
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.COLORS.BLUE}; 
  border-radius: 10px;
  transition: filter 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  filter: brightness(0.9);
  
  cursor: pointer;
}

@media (min-width: ${LAYOUTBREAKPOINTS.MD}) {
  ::-webkit-scrollbar {
    width: 8px; 
  }

}


:root {
    font-size: 62.5%;
}

body{
    background-color: ${({ theme }) => theme.COLORS.DARK_800};
}

:root, button , a , input, textarea{
  font-family: "Poppins", sans-serif;
  
}

button, a {
    cursor: pointer;
    transition: filter .5s;
}

button:hover , a:hover{
    filter: brightness(0.9);
}


.Toastify__toast {
  gap: .2rem;
}

`