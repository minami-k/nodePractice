const Article = require("../models/article.model");
const Like = require("../models/likes.model")

const getById = (postId) => {
  return Article.findById(postId, (err, data) => {
    if(err) console.log(err);
    return data
  }).clone()

}

exports.getPosts = (req, res, next) => {
  Article.find((err, data) => {
    if(err) console.log(err);

    res.render("post/article-list", {
      pageTitle: "All Posts",
      articles: data,
    });
  });
  
  
  /* .exec().then((articles) => {

    const tempArticle = articles.map(i => ({ ...i, description: `${i.description.slice(0, 100)}.....`}))
    
    res.render("post/article-list", {
      pageTitle: "All Posts",
      articles: tempArticle,
      isAuth: req.user
    });
  })
  .catch((err) => console.log(err)); */
};

exports.getPostById = async (req, res, next) => {
  const { params: { postId } } = req
  const article = await getById(postId)

  res.render("post/post-detail", {
    pageTitle: article.title,
    article: article,
});
};

exports.postLike = (req, res, next) => {
  const {id, likeNum} = req.body;
  Like.addLike(id, likeNum)
  res.redirect('/') 
};
