package course;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BlogPostDAO {
    MongoCollection<Document> postsCollection;

    public BlogPostDAO(final MongoDatabase blogDatabase) {
        postsCollection = blogDatabase.getCollection("posts");
    }

    // Return a single post corresponding to a permalink
    public Document findByPermalink(String permalink) {
        Document post = postsCollection.find(Filters.eq("permalink", permalink)).first();
        return post;
    }

    // Return a list of posts in descending order. Limit determines
    // how many posts are returned.
    public List<Document> findByDateDescending(int limit) {

        List<Document> posts = postsCollection.find()
                .limit(limit)
                .sort(new Document("date", -1))
                .into(new ArrayList<>());

        return posts;
    }


    public String addPost(String title, String body, List tags, String username) {

        System.out.println("inserting blog entry " + title + " " + body);

        String permalink = title.replaceAll("\\s", "_"); // whitespace becomes _
        permalink = permalink.replaceAll("\\W", ""); // get rid of non alphanumeric
        permalink = permalink.toLowerCase();

        // Build the post object and insert it
        Document post = new Document()
                .append("author", username)
                .append("title", title)
                .append("body", body)
                .append("permalink", permalink)
                .append("tags", tags)
                .append("comments", new ArrayList())
                .append("date", new Date());

        postsCollection.insertOne(post);

        return permalink;
    }




    // White space to protect the innocent








    // Append a comment to a blog post
    public void addPostComment(final String name, final String email, final String body,
                               final String permalink) {
        Document post = findByPermalink(permalink);
        Document comment = new Document("author", name)
                .append("body", body);

        if (email != null) {
            comment = comment.append("email", email);
        }

        postsCollection.updateOne(Filters.eq("_id", post.get("_id")),
                new Document("$push", new Document("comments", comment)));
    }
}
