const User = require("../User");
const Post = require("../Post");

//Feature
describe("Following", () => {
  //Scenario
  describe("Charlie can follow Alice and Bob, and he views an aggregated list of all timelines.", () => {
    //Given
    // Given
    const alice = new User("Alice");
    const weatherLoveDate = Date.now();
    alice.timeline.push(new Post("I love the weather today.", alice, weatherLoveDate));

    const bob = new User("Bob");
    const weLostDate = Date.now();
    const goodGamedate = Date.now();
    bob.timeline.push(new Post("Darn! We lost!", bob, weLostDate));
    bob.timeline.push(new Post("Good game though.", bob, goodGamedate));

    const charlie = new User("Charlie");
    const newyorkCoffeeDate = Date.now();
    charlie.timeline.push(new Post("I'm in New York today! Anyone wants to have a coffee?", charlie, newyorkCoffeeDate));

    charlie.follow(alice);
    charlie.follow(bob);

    test("Charlie views his wall", () => {
      const charliesWall = charlie.wall();
      expect(charliesWall).toEqual(expect.arrayContaining(["Charlie - I'm in New York today! Anyone wants to have a coffee? (0 minute ago)"]));
      expect(charliesWall).toEqual(expect.arrayContaining(["Bob - Darn! We lost! (0 minute ago)", "Bob - Good game though. (0 minute ago)"]));
      expect(charliesWall).toEqual(expect.arrayContaining(["Alice - I love the weather today. (0 minute ago)"]));
    });
  });
});