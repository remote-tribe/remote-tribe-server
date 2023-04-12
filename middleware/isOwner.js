const Article = require("../models/Article.model");
const User = require("../models/User.model");

// Define the isOwner middleware function
const isOwner = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.currentUser._id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const article = await Article.findById(req.params.articleId);
        if (req.session.currentUser._id.toString() !== article.author.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // If the user is the owner, pass control to the next middleware
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isOwner;