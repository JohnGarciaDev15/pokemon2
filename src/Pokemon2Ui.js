import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon2-ui.css.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@pokedex/pokemon2-dm/pokemon2-dm.js';

export class Pokemon2Ui extends LitElement {
  static get properties() {
    return {
      pokemons: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
  }

  async firstUpdated() {
    const pokemon2Dm = this.shadowRoot.querySelector('pokemon2-dm');
    this.pokemons = await pokemon2Dm.fetchPokemons();    
  }


  handleDetails(pokemonName) {
    alert(`Ver detalles de ${pokemonName}`);
  }


  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon2-ui-shared-styles'),
      css`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          margin: 10px;
          overflow: hidden;
          width: 150px;
          text-align: center;
        }
        .card img {
          width: 100;
        }
        .card h2 {
          font-size : 1.2em;
          margin: 10px 0;
        }
        .card p{
          font-size: 0.9em;
          color: #555;
        }
      `,
    ];
  }

  render() {
    return html`
      <h1>Pokémon List</h1>     
      <div class="container">
        ${this.pokemons.map(pokemon => html`
          <div class="card">
            <img src="${pokemon.image}" alt="${pokemon.name}"/>
              <p>${pokemon.name}</p>
              <p>${pokemon.abilities}</p>
              <bbva-button-default
                text="Details"
                @click="${() => this.handleDetails(pokemon.name)}">
                </bbva-button-default>        
          </div>
        `)}
      </div>
      <pokemon2-dm></pokemon2-dm>
    `;    
  }
}
