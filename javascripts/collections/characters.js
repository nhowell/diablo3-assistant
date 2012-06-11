var Characters = Backbone.Collection.extend({

  model: Character,

  // Save all of the Characters in the browser's localStorage.
  localStorage: new Backbone.LocalStorage('characters'),

  initialize: function() {
    // Set the 'order' on Characters that are added to the list
    this.on('add', function(character) {
      character.set('order', this.length);
    });
  },

  // Characters are sorted by their 'order'.
  comparator: function(character) {
    return character.get('order');
  }

});
