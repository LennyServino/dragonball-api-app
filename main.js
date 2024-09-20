import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { getAllCharacters, getPlanets } from './characters.js'

getAllCharacters();
getPlanets();


document.querySelector('#app').innerHTML = `
  <div>
    <h1>API DRAGON BALL</h1>
    <div id="planet">
      <label>Selecciona un planeta:</label>
    </div>
    <div id="list-dragon-ball" class="container"></div>
  </div>
`

