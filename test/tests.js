$(function(){

  module('Character', {

    setup: function() {
      Characters.fetch();
      this.tempStorage = JSON.stringify(Characters);
      Characters.reset();

      _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

      this.therron = Characters.create({name: 'Therron', level: 56,
        class: 'Monk', gender: 'Male', vitality: 119});
      this.illidan = Characters.create({name: 'Illidan', level: 35,
        class: 'Demon Hunter', gender: 'Male', vitality: 77});
      this.therra = Characters.create({name: 'Therra', level: 10,
        class: 'Barbarian', gender: 'Female', vitality: 27});
    },

    teardown: function() {
      Characters.reset(this.tempStorage);
    }

  });

  test('Storage', function() {
    equal( Characters.length, 3, 'There should be 3 Characters stored' );
  });

  test('Base life', function() {
    equal( this.therra.life(), 346, 'Base life at level 10 should be 346' );
    equal( this.illidan.life(), 946, 'Base life at level 35 should be 946' );
    equal( this.therron.life(), 3949, 'Base life at level 56 should be 3949' );
  });

});
