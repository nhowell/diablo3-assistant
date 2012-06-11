var Items = Backbone.Collection.extend({

  model: Item,
  
  localStorage: new Backbone.LocalStorage('items')

});
