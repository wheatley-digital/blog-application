import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;
var globalIndex = 0

app.use(express.urlencoded({ extended: false })); // Allow for parsing of requests
app.use(express.static('public')); // Serves resources from the public folder
app.set("view engine", "ejs") // Allows ejs to work as a template engine

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

// Get Home Page
app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogs});
})

app.post("/", (req, res) => {
    let newBlog = {
        title: req.body["blog_title_index"],
        date: req.body["blog_date_index"],
        category: req.body["blog_category_index"],
        content: req.body["blog_content_index"],
        thanks: req.body["blog_thanks_index"]
    }
    blogs.push(newBlog);
    res.render("index.ejs", {blogs: blogs});
})

// View Blog
app.post("/blog", (req,res) => {
    var title = req.body["blog-unedited"];
    var titlesArray = [];
    for (let i=0; i < blogs.length; i++) {
        titlesArray.push(blogs[i].title)
    }
    var index = titlesArray.findIndex(x => x == title); 
    globalIndex = index;
    res.render("blog.ejs", {blog: blogs[index]})
})

// Edit Blog Content
app.post("/edit-blog", (req, res) => {
    res.render("edit-blog.ejs", {blog: blogs[globalIndex]});
})

// Edit Blog Thanks
app.post("/edit-thanks-blog", (req, res) => {
    res.render("edit-thanks-blog.ejs", {blog: blogs[globalIndex]});
})

// Updated Blog Content
app.post("/updated-blog", (req, res) => {
    var updatedContent = req.body["new-content-edit-blog"];
    blogs[globalIndex].content = updatedContent;
    res.render("index.ejs", {blogs: blogs});
})

// Updated Blog Thanks
app.post("/updated-thanks-blog", (req, res) => {
    var updatedThanks = req.body["new-thanks-edit-blog"];
    blogs[globalIndex].thanks = updatedThanks;
    res.render("index.ejs", {blogs: blogs});
})

// Delete Blog
app.post("/delete-blog", (req, res) => {
    var deleteIndex = req.body["delete-blog"];
    blogs.splice(deleteIndex,1);
    res.render("index.ejs", {blogs: blogs});
})

// Starting Blogs
var blogs = [
    {title: "Superlinear Returns",
    date: "October 2023",
    category: "Performance",
    content: "One of the most important things I didn't understand about the world when I was a child is the degree to which the returns for performance are superlinear. Teachers and coaches implicitly told us the returns were linear. 'You get out,' I heard a thousand times, 'what you put in.' They meant well, but this is rarely true. If your product is only half as good as your competitor's, you don't get half as many customers. You get no customers, and you go out of business. It's obviously true that the returns for performance are superlinear in business. Some think this is a flaw of capitalism, and that if we changed the rules it would stop being true. But superlinear returns for performance are a feature of the world, not an artifact of rules we've invented. We see the same pattern in fame, power, military victories, knowledge, and even benefit to humanity. In all of these, the rich get richer. [1] You can't understand the world without understanding the concept of superlinear returns. And if you're ambitious you definitely should, because this will be the wave you surf on.",
    thanks: "Thanks to Trevor Blackwell, Patrick Collison, Tyler Cowen, Jessica Livingston, Harj Taggar, and Garry Tan for reading drafts of this."},
    
    {title: "How To Do Great Work",
    date: "July 2023",
    category: "Career",
    content: "If you collected lists of techniques for doing great work in a lot of different fields, what would the intersection look like? I decided to find out by making it. Partly my goal was to create a guide that could be used by someone working in any field. But I was also curious about the shape of the intersection. And one thing this exercise shows is that it does have a definite shape; it's not just a point labelled 'work hard.' The following recipe assumes you're very ambitious.",
    thanks: "Thanks to Trevor Blackwell, Daniel Gackle, Pam Graham, Tom Howard, Patrick Hsu, Steve Huffman, Jessica Livingston, Henry Lloyd-Baker, Bob Metcalfe, Ben Miller, Robert Morris, Michael Nielsen, Courtenay Pipkin, Joris Poort, Mieke Roos, Rajat Suri, Harj Taggar, Garry Tan, and my younger son for suggestions and for reading drafts."},
    
    {title: "How To Get New Ideas",
    date: "January 2023",
    category: "Creativity",
    content: "The way to get new ideas is to notice anomalies: what seems strange, or missing, or broken? You can see anomalies in everyday life (much of standup comedy is based on this), but the best place to look for them is at the frontiers of knowledge. Knowledge grows fractally. From a distance its edges look smooth, but when you learn enough to get close to one, you'll notice it's full of gaps. These gaps will seem obvious; it will seem inexplicable that no one has tried x or wondered about y. In the best case, exploring such gaps yields whole new fractal buds.",
    thanks: ""}
    ]
