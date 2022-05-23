import { createGlobalStyle } from 'styled-components'

// Global style of project
export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;


}
html,body, #root {
  min-height: 100%;
}
body {
  background: #0D2636 ;
  font-size: 14px;
  -webkit-font-smooting: antialised !important;
}
body, input , button {
  color: #222;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  cursor: pointer;
}
`