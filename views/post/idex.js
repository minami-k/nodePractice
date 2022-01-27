const axios = require('axios')

const updateStatus = {
    Like: function (postId){
        document.querySelector('#likes-count-' + postId).textContent++;
    },
    Unlike: function(postId){
        document.querySelector('#likes-count-'+ postId).textContent--;
    }
}

const toggleButton = {
    Like: function(button){
        button.textContent = 'Unlike';
    },
    Unlike: function(button){
        button.textContent = 'Like';
    }
}

const toPost = function(e){
    const postId = e.target.dataset.postId
    const action = e.target.textContent.trim()
    toggleButton[action](e.target)
    updateStatus[action](postId)
    axios.post('/' + postId + '/act', {action: action})
}