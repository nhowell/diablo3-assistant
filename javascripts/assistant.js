var Character = Backbone.Model.extend({

  // Default attributes for the Character.
  defaults: function() {
    return {
      order: Characters.nextOrder(),
      level: 60,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      vitality: 0,
      armor: 0
    };
  },

  // Validation requirements for the Character.
  validation: {
    name: {
      required: true
    },
    level: {
      required: true,
      range: [1, 60]
    },
    class: {
      required: true,
      oneOf: ['Barbarian', 'Demon Hunter', 'Monk', 'Witch Doctor', 'Wizard']
    },
    gender: {
      required: true,
      oneOf: ['Male', 'Female']
    }
  },

  initialize: function() {
    
  },

  life: function() {
    return 36 + (4 * this.get('level')) +
      (Math.max(10, this.get('level') - 25) * this.get('vitality'));
  },

  // Remove this Character from localStorage and delete its view.
  delete: function() {
    this.destroy();
  }

});

var CharacterList = Backbone.Collection.extend({

  model: Character,

  // Save all of the Characters in the browser's localStorage.
  localStorage: new Store('characters'),

  // Generates the next order number for new Characters.
  nextOrder: function() {
    if (!this.length) return 1;
    return this.last().get('order') + 1;
  },

  // Characters are sorted by their 'order'.
  comparator: function(character) {
    return character.get('order');
  }

});

// Create our global collection of Characters
var Characters = new CharacterList;
