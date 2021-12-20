const User = require("../src/User");
const Post = require("../src/Post");

//Feature
describe("Following", () => {

  //Scenario
  describe("Charlie can follow Alice and Bob, and he views an aggregated list of all timelines.", () => {
    //Given
    const ONE_MINUTE = 60000
    // Given
    const alice = new User("Alice");
    const weatherLoveDate = new Date(Date.now() - ONE_MINUTE*10);
    const weatherDislikeDate = new Date(Date.now() - ONE_MINUTE*2);
    const weatherOkayDate = new Date(Date.now() - ONE_MINUTE*5);
    alice.publish(new Post("I love the weather today.", alice, weatherLoveDate));
    alice.publish(new Post("I don't love the weather today.", alice, weatherDislikeDate));
    alice.publish(new Post("The weather is okay I guess.", alice, weatherOkayDate));

    const bob = new User("Bob");
    const weLostDate = new Date(Date.now() - ONE_MINUTE*5);;
    const goodGamedate = Date.now();
    bob.publish(new Post("Darn! We lost!", bob, weLostDate));
    bob.publish(new Post("Good game though.", bob, goodGamedate));

    const charlie = new User("Charlie");
    const newyorkCoffeeDate = new Date(Date.now() - ONE_MINUTE*5);
    charlie.publish(new Post("I'm in New York today! Anyone wants to have a coffee?", charlie, newyorkCoffeeDate));
    charlie.publish(new Post("Thanks for meeting for coffee", charlie));

    charlie.follow(alice);
    charlie.follow(bob);

    test("Charlie views his wall", () => {
      const charliesWall = charlie.wall();
      expect(charliesWall).toEqual([
        "Alice - I love the weather today. (10 minute ago)",
        "Alice - The weather is okay I guess. (5 minute ago)",
        "Bob - Darn! We lost! (5 minute ago)",
        "Charlie - I'm in New York today! Anyone wants to have a coffee? (5 minute ago)",
        "Alice - I don't love the weather today. (2 minute ago)",
        "Bob - Good game though. (0 minute ago)",
        "Charlie - Thanks for meeting for coffee (0 minute ago)"
      ])
      expect(charliesWall).toEqual(expect.arrayContaining(["Charlie - I'm in New York today! Anyone wants to have a coffee? (5 minute ago)", "Charlie - Thanks for meeting for coffee (0 minute ago)"]));
      expect(charliesWall).toEqual(expect.arrayContaining(["Bob - Darn! We lost! (5 minute ago)", "Bob - Good game though. (0 minute ago)"]));
      expect(charliesWall).toEqual(expect.arrayContaining(["Alice - I love the weather today. (10 minute ago)","Alice - I don't love the weather today. (2 minute ago)","Alice - The weather is okay I guess. (5 minute ago)"]));
    });
  });
});