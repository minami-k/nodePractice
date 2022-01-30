const Article = require("../models/article.model");
const Like = require("../models/likes.model")

exports.getPosts = (req, res, next) => {
  Article.find()
  .then((articles) => {

    const tempArticle = articles.map(i => ({ ...i, description: `${i.description.slice(0, 100)}.....`}))
    
    res.render("post/article-list", {
      pageTitle: "All Posts",
      articles: tempArticle,
      isAuth: req.user
    });
  })
  .catch((err) => console.log(err));
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;
  Article.findById(postId)
    .then((article) => {
      res.render("post/post-detail", {
        pageTitle: article.title,
        article: article,
      });
    })
    .catch((err) => console.log(err));
};

exports.postLike = (req, res, next) => {
  const {id, likeNum} = req.body;
  Like.addLike(id, likeNum)
  res.redirect('/') 
};
