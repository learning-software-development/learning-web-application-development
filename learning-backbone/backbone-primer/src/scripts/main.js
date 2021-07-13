import Backbone from 'backbone';

const PokemonLinkModel = Backbone.Model.extend({
  defaults: {
    name: null,
    url: null
  }
});

const PokemonCollection = Backbone.Collection.extend({
  url: 'https://pokeapi.co/api/v2/pokemon',
  model: PokemonLinkModel,

  parse: (data) => {
    console.dir(data);
    return data.results;
  }
});

let pokemons = new PokemonCollection();

pokemons.fetch().then(() => {
  console.log(pokemons.length);

  console.dir(pokemons.at(0));
  console.dir(pokemons.at(19));
  console.dir(pokemons.findWhere({name: 'squirtle'}));
});


let PokemonsListView = Backbone.View.extend({
  el: '#pokemon-list',

  initialize: () => {
    console.log(this.collection);
  }
});

const PokemonModel = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null
  }
});

const PokemonsListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'pokemon',

  initialize: () => {
    console.log(this.model);
  }
});

// Create Model and View instances:
let pokemonModel = new PokemonModel();
let PokemonView = new PokemonsListItemView({model: pokemonModel});
let PokemonsView = new PokemonsListView({collection: pokemons});

// Append content into the view's container element:
pokemonsList.$el.append('<li>Hello World</li>');
