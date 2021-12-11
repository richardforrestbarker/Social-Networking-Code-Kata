const Post = require('../src/Post');
const User = require('../src/User');

//Feature
describe("Timeline", () => {
  //Scenario
  describe("Alice views", () => {
    //Given
    const alice = new User("Alice");
    const bob = new User("Bob");
    const weLostDate = Date.now();
    const goodGamedate = Date.now();
    bob.timeline.push(new Post("Darn! We lost!", bob, weLostDate))
    bob.timeline.push(new Post("Good game though.", bob, goodGamedate))

    //When
    test("Bob's timeline", () => {
      
      const timeLine = alice.viewTimeline(bob);
      //Then
      expect(timeLine).toContain(`Darn! We lost! (0 minute ago)`);
      expect(timeLine).toContain(`Good game though. (0 minute ago)`);
    });
  });
});


