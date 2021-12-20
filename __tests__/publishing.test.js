const User = require('../src/User');
const Post = require("../src/Post");


describe("publishing", () => {
  const alice = new User("Alice");
  describe("Alice publishes a message to her personal timeline", () => {
    test("When alice views her timeline", () => {
      const post = new Post("I love the weather today.", alice)
      alice.publish(post);
      expect(alice.timeline.map(post => post.message)).toContain("I love the weather today.");
    });
  });
  describe("published messages are sorted by timeline date", () => {
    test("When alice views her timeline", () => {
      alice.publish(new Post("I love the weather today.", alice, new Date()));
      alice.publish(new Post("I don't love the weather today.", alice, new Date(Date.now() - 60000)));
      const timeline = alice.timeline;
      expect(timeline[0].message).toEqual("I don't love the weather today.");
      expect(timeline[1].message).toEqual("I love the weather today.");
    });
  });
});

