var Item = Backbone.Model.extend({

  // Validation requirements for the Item.
  validation: {
    slot: {
      required: true,
      oneOf: ['Head', 'Shoulders', 'Neck', 'Torso', 'Hands', 'Wrists',
        'Waist', 'Finger', 'Legs', 'Feet', '1-Hand', 'Off-Hand', '2-Hand']
    }
  },

  initialize: function(attributes) {

  },

});
