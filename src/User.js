module.exports = class User {
    constructor(name){
        this.name = name;
    }
    name = "";
    timeline = [];
    following = [];
    followers = [];

    publish = (post) => {
        this.timeline.push(post);
        this.timeline.sort(this.sortByTimestamp)
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
        const postsOfFollowedUsers = [
            ...this.following.flatMap(followed => followed.timeline),
            ...this.timeline
        ]
        postsOfFollowedUsers.sort(this.sortByTimestamp)
        return postsOfFollowedUsers.map(post => {
            return `${post.user.name} - ${post.message} (${this.minutesSinceTimeStamp(post.timestamp)} minute ago)`
        });
    };

    sortByTimestamp = (current, next) => current.timestamp - next.timestamp

    minutesSinceTimeStamp = (timestamp) => {
        var diffMs = (Date.now() - timestamp);
        return Math.round(((diffMs % 86400000) % 3600000) / 60000);
    }
}