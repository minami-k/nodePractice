const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const postPath = path.join(path.dirname(process.mainModule.filename), 'data', 'post.json')

module.exports = class Likes{
    static addLike(id, likeNum){
        fs.readFile(postPath, (err, content) => {
            let detail = {
                info: [],
                totalLikes: 0
            }
            if(!err){
                detail = JSON.parse(content)
            }

            const articleIndex = detail.info.findIndex(x => x.id === id)

            const article = detail.info[articleIndex]

            let updatedArticle

            if(article){
                updatedArticle = { ...article }
                updatedArticle.num = updatedArticle.num +1
                detail.info = [ ...detail.info ]
                detail.info[articleIndex] = updatedArticle
            }else{
                updatedArticle = { id: id, num: 1 }
                detail.info = [...detail.info, updatedArticle]
            }

            detail.totalLikes = detail.totalLikes + parseInt(likeNum)

            fs.writeFile(postPath, JSON.stringify(detail), err => { console.log(err)})
        })
    }

    static unlike(id, like){
        fs.readFile(postPath, (err, content) => {
            if(err){
                return
            }
            const updatedList = { ...JSON.parse(content) }
            const article = updatedList.likes.find(i => i.id === id )
            if(!article){
                return
            }

            const numberOfLikes = article.quantity
            updatedList.likes = updatedList.likes.filter(i => i.id === id)
            updatedList.totalLikes = updatedList.totalLikes - likeNum * numberOfLikes

            fs.writeFile(postPath, JSON.stringify(updatedList), err => { console.log(err)})
        })
    }
}

