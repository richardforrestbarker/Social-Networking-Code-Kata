const User = require('../User');


describe("publishing", () => {
  const alice = new User("Alice");
  describe("Alice publishes a message to her personal timeline", () => {  
    alice.pubilsh("I love the weather today.");
    test("When alice views her timeline", () => {
      expect(alice.timeline.map(post => post.message)).toContain("I love the weather today.");
    });
  });
});

