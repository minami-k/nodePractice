const Article = require('../models/article.model')

exports.getPosts = (req,res,next) => {
    Article.fetchAll().then((articles) => {
        res.render('post/article-list', {
            pageTitle: 'All Posts',
            articles: articles,
        })
    
    }).catch(err => console.log(err))

}

exports.getAddPost = (req,res,next) => {
    res.render('post/add-edit-post', {
        pageTitle: 'Creat a post',
        editing: false
    })
}

exports.postAddPost = (req,res,next) => {
    const {title, imageUrl, description} = req.body

    const article = new Article(title, imageUrl, description)
    article.save()
    Article.addPost(title, imageUrl, description)
    res.redirect('/')
}

exports.getEditPost = (req,res,next) => {
    const editMode = req.query.edit 
    if(!editMode) res.redirect('/')

    const postId = req.params.postId
    Article.findById(postId)
    .then((article) => {
        res.render('post/add-edit-post', {
            pageTitle: 'Edit Article',
            editing: editMode,
            article: article
        })
    })
    .catch(err => console.log(err))
}

exports.postEditPost = (req,res,next) => {
    const {postId, title, imageUrl, description} = req.body
    const updatedPost = new Article(title, imageUrl, description)
    updatedPost.edit(postId)
    res.redirect('/')
}

exports.getPostById = (req,res,next) => {
    const postId = req.params.postId
    Article.findById(postId)
    .then((article) => {
        res.render('post/post-detail', {
            pageTitle: article.title,
            article:article
        })
    })
    .catch((err) => console.log(err))
}

exports.postDeletePost = (req, res, next) => {
    const postId = req.body.postId
    Article.deleteById(postId)

/*     Article.findById(postId)
    .then((article) => {
        Article.postDelete(postId)
        res.redirect('/')   

    })
    .catch(err => console.log(err))
 */}

/* exports.postComment = (req,res,next) => {
    const comment = req.body.content
    Product.save(comment)
    res.redirect('/')

} */
