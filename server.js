const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const ConnectDb = require("./Database.js");
const User = require("./models/user.model.js");
const DefaultCourse = require("./models/CourseCategory_Model.js");
const DefaultCourseRouter = require("./routes/CoursesCategory_Routes.js");
const CourseScraping = require("./routes/CourseScarphing.js");
const BlogSchema = require("./models/Blog_Schema.js");
const BlogRouter = require("./routes/BlogRouter.js");
const CommentSchema = require("./models/CommentSchema.js");
const CommentRoutes = require("./routes/CommentRoutes.js");


dotenv.config();



const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res) => {
            res.set("Access-Control-Allow-Origin", "http://localhost:5173");
        },
    })
);

app.use("/Default", DefaultCourseRouter);
app.use("/Scrap", CourseScraping);
app.use("/Blog", BlogRouter);
app.use("/Comment", CommentRoutes);

app.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch (error) {
        console.error("error", error);
        res.status(500).send("Server Error");
    }
});


const port = process.env.Port || 3000;
server.listen(port, () => {
    console.log(`App Listening at Port ${port}`);
});
