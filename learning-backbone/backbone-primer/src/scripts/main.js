import Backbone from 'backbone';

const KermitModel = Backbone.Model.extend({
  url: '/muppets/1',
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

let kermit = new KermitModel();

kermit.fetch().then(() => {
  kermit.get('name'); // >> "Kermit"
  kermit.get('occupation'); // >> "being green"
  kermit.set('occupation', 'muppet ringleader');
  kermit.save();
});

const MuppetModel = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

const MuppetsCollection = Backbone.Collection.extend({
  url: '/muppets',
  model: MuppetModel,
  parse: (data) => {
    return data.muppets;
  }
});

let muppets = new MuppetsCollection();

muppets.fetch().then(function() {
  console.log(muppets.length); // >> length: 2
});

muppets.get(1); // >> Returns the "Kermit" model, by id reference
muppets.get(2); // >> Returns the "Gonzo" model, by id reference
muppets.at(0); // >> Returns the "Kermit" model, by index
muppets.findWhere({name: 'Gonzo'}); // >> returns the "Gonzo" model
