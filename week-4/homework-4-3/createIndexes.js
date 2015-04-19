// Fast lookup of posts by date (descending).
db.posts.createIndex( { date: -1 } );

// Fast lookup of posts by tag with date descending -- the latter part should be satisfied by the previous index.
db.posts.createIndex( { tags: 1 }, { isMultiKey: true } );

// Fast lookup of posts by permalink.
db.posts.createIndex( { permalink: 1 } );
