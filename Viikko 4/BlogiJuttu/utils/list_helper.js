const { getMaxListeners } = require("../app")

const dummy = (blogs) =>{
    return 1
}

const likes = (blogs) =>{
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    console.log(blogs.length)
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) =>{
    const reducer = (prev, current) =>{
        if(prev === null){
            prev = {
                likes: 0
            }
        }
        return (prev.likes > current.likes)
        ? prev
        : current
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, null)
}

module.exports = {
    dummy,
    likes,
    favoriteBlog
}