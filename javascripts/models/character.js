var Character = Backbone.Model.extend({

  // Default attributes for the Character.
  defaults: function() {
    return {
      level: 60
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
    char_class: {
      required: true,
      oneOf: ['Barbarian', 'Demon Hunter', 'Monk', 'Witch Doctor', 'Wizard']
    },
    gender: {
      required: true,
      oneOf: ['Male', 'Female']
    }
  },

  initialize: function(attributes) {
    this.items = new Items();
    this.items.localStorage = new Backbone.LocalStorage('items-' + this.id);
    this.items.fetch();
  },

  // All stats start at this value at (a theoretical) level 0.
  base_stat: 7,

  base_primary_stat: function() {
    // Increases by 3 per character level
    return this.base_stat + (3 * this.get('level'));
  },

  base_secondary_stat: function() {
    // Increases by 1 per character level
    return this.base_stat + this.get('level');
  },

  primary_stat: function() {
    var char_class = this.get('char_class');

    if (char_class == 'Barbarian')
      return this.strength();
    else if (char_class == 'Demon Hunter' || char_class == 'Monk')
      return this.dexterity();
    else if (char_class == 'Witch Doctor' || char_class == 'Wizard')
      return this.intelligence();
  },

  strength: function() {
    return (this.get('char_class') == 'Barbarian') ?
      this.base_primary_stat() : this.base_secondary_stat();
  },

  dexterity: function() {
    var char_class = this.get('char_class')
    return (char_class == 'Demon Hunter' || char_class == 'Monk') ?
      this.base_primary_stat() : this.base_secondary_stat();
  },

  intelligence: function() {
    var char_class = this.get('char_class')
    return (char_class == 'Witch Doctor' || char_class == 'Wizard') ?
      this.base_primary_stat() : this.base_secondary_stat();
  },

  vitality: function() {
    return this.base_stat + (2 * this.get('level'));
  },

  armor: function() {
    return this.strength();
  },

  attacks_per_second: function () {
    return 1; // TODO
  },

  critical_hit_chance: function() {
    return 0.05; // TODO
  },

  critical_hit_bonus: function() {
    return 0.5; // TODO
  },

  damage: function() {
    return (
      // Weapon damage
      2.5 // TODO

      // Increase by your primary stat
      * (1 + (this.primary_stat() / 100))

      // Critical hits
      * (1 + (this.critical_hit_chance() * this.critical_hit_bonus()))

      // Attack speed
      * this.attacks_per_second()

      // Round to two decimal places
      ).toFixed(2);
  },

  maximum_life: function() {
    return 36 + (4 * this.get('level')) +
      (Math.max(10, this.get('level') - 25) * this.vitality());
  },

  // Remove this Character from localStorage.
  remove: function() {
    this.destroy();
  }

});
