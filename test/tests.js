var CharacterList = new Characters;

// Use a separate localStorage namespace for testing.
CharacterList.localStorage = new Backbone.LocalStorage('test-characters');

// Remove any existing characters from localStorage.
CharacterList.fetch();

while (CharacterList.models.length > 0) {
  CharacterList.models[0].destroy();
}

// Force validations to run on models.
_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);


$(function(){

  module('Character', {

    setup: function() {
      this.therra = CharacterList.create({name: 'Therra', level: 10,
        char_class: 'Barbarian', gender: 'Female'});
      this.illidan = CharacterList.create({name: 'Illidan', level: 35,
        char_class: 'Demon Hunter', gender: 'Male'});
      this.therron = CharacterList.create({name: 'Therron', level: 56,
        char_class: 'Monk', gender: 'Male'});
    },

    teardown: function() {
      // Can't use something like CharacterList.each { character.destroy() }
      // because destroy() removes the model from the collection and
      // therefore the each iterator gets all confused.
      while (CharacterList.models.length > 0) {
        CharacterList.models[0].destroy();
      }
    }

  });

  test('Storage', function() {
    equal( CharacterList.length, 3, 'There should be 3 Characters stored' );
  });

  test('Order', function() {
    CharacterList.sort();
    equal( CharacterList.pluck('name').join(), 'Therra,Illidan,Therron', 'Characters should be in the order: Therra, Illidan, Therron' );
    this.therra.save({order: 3});
    this.illidan.save({order: 1});
    this.therron.save({order: 2});
    // We must force a sort
    CharacterList.sort();
    equal( CharacterList.pluck('name').join(), 'Illidan,Therron,Therra', 'Characters should be in the order: Illidan, Therron, Therra' );
  });

  test('Base strength', function() {
    equal( this.therra.strength(),  37, 'Barbarian base strength at level 10 should be 37' );
    equal( this.illidan.strength(), 42, 'Demon Hunter base strength at level 35 should be 42' );
    equal( this.therron.strength(), 63, 'Monk base strength at level 56 should be 63' );
  });

  test('Base dexterity', function() {
    equal( this.therra.dexterity(),   17, 'Barbarian base dexterity at level 10 should be 17' );
    equal( this.illidan.dexterity(), 112, 'Demon Hunter base dexterity at level 35 should be 112' );
    equal( this.therron.dexterity(), 175, 'Monk base dexterity at level 56 should be 175' );
  });

  test('Base intelligence', function() {
    equal( this.therra.intelligence(),  17, 'Barbarian base intelligence at level 10 should be 17' );
    equal( this.illidan.intelligence(), 42, 'Demon Hunter base intelligence at level 35 should be 42' );
    equal( this.therron.intelligence(), 63, 'Monk base intelligence at level 56 should be 63' );
  });

  test('Base vitality', function() {
    equal( this.therra.vitality(),   27, 'Base vitality at level 10 should be 27' );
    equal( this.illidan.vitality(),  77, 'Base vitality at level 35 should be 77' );
    equal( this.therron.vitality(), 119, 'Base vitality at level 56 should be 119' );
  });

  test('Base damage', function() {
    equal( this.therra.damage(),  3.51, 'Base damage for level 10 should be 3.51' );
    equal( this.illidan.damage(), 5.43, 'Base damage at level 35 should be 5.43' );
    equal( this.therron.damage(), 7.05, 'Base damage at level 56 should be 7.05' );
  });

  test('Base maximum life', function() {
    equal( this.therra.maximum_life(),   346, 'Base maximum life at level 10 should be 346' );
    equal( this.illidan.maximum_life(),  946, 'Base maximum life at level 35 should be 946' );
    equal( this.therron.maximum_life(), 3949, 'Base maximum life at level 56 should be 3949' );
  });

});
