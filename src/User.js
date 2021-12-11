module.exports = class User {
    constructor(name){
        this.name = name;
    }
    name = "";
    timeline = [];
    following = [];
    followers = [];

    pubilsh = (message) => {
        const Post = require('./Post');
        this.timeline.push(new Post(message, this));
    }

    follow = (user) => {
        this.following.push(user);
        user.followers.push(this);
    };

    viewTimeline = (user) => user.timeline.map(entry => {
        const timeSince = this.minutesSinceTimeStamp(entry.timestamp);
        return `${entry.message} (${timeSince} minute ago)`;
    });

    wall = () => {
        const postsofFollowedUsers = this.following.flatMap(followed =>{
            return this.viewTimeline(followed).map(entry => `${followed.name} - ${entry}`)
        });
        return [...this.viewTimeline(this).map(entry => `${this.name} - ${entry}`), ...(postsofFollowedUsers)];
    };

    minutesSinceTimeStamp = (timestamp) => {
        var diffMs = (timestamp - Date.now());
        return Math.round(((diffMs % 86400000) % 3600000) / 60000);
    }
}