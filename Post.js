module.exports = class Post {
    constructor(message, user, timestamp=Date.now()){
      this.message = message;
      this.user = user;
      this.timestamp = timestamp;
    }
    message;
    timestamp;
    user;
  }