const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length > 0) {
        const likes = blogs.reduce( (previousValue, currentValue) => {
            if(currentValue.likes && typeof currentValue.likes === 'number' ) {
                return previousValue + currentValue.likes
            } else {
                return previousValue
            }
        }, 0);
        return likes
    } else {
        return 0
    }
}

const favoriteblog = (blogs) => {
    if(blogs.length > 0) {
        const favoriteblog = blogs.reduce( (previousValue, currentValue) => {
            if( previousValue.likes > currentValue.likes && typeof currentValue.likes === 'number' ) {
                return previousValue
            } else {
                return currentValue
            }
        }, blogs[0]);
        return favoriteblog
    } else {
        return 'no blogs'
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length > 0) {
        const authors = blogs.reduce( (listOfAuthors, currentValue) => {
            if( listOfAuthors.find( author => author.author === currentValue.author )) {
                const index = listOfAuthors.findIndex((obj => obj.author == currentValue.author))
                listOfAuthors[index].blogs++
                return listOfAuthors;
            } else {
                updatedAuthorsList = listOfAuthors.concat([{
                    author: currentValue.author,
                    blogs: 1
                }])
                return updatedAuthorsList
            }
        }, [])

        const mostBlogs = authors.reduce( (previousValue, currentValue) => {
            if( previousValue.blogs > currentValue.blogs && typeof currentValue.blogs === 'number' ) {
                return previousValue
            } else {
                return currentValue
            }
        }, authors[0])
        return mostBlogs
    } else {
        return 'no blogs'
    }
}

const mostLikes = (blogs) => {
    if(blogs.length > 0) {
        const authors = blogs.reduce( (listOfAuthors, currentValue) => {
            if( listOfAuthors.find( author => author.author === currentValue.author )) {
                const author = listOfAuthors.find( author => author.author === currentValue.author )
                const newLikes = author.likes + currentValue.likes
                const updatedAuthorsList = listOfAuthors.map(p =>
                    p.author === currentValue.author
                      ? { ...p, likes: newLikes }
                      : p
                  );
                return updatedAuthorsList
            } else {
                const updatedAuthorsList = listOfAuthors.concat([{
                    author: currentValue.author,
                    likes: currentValue.likes
                }])
                return updatedAuthorsList
            }
        }, [])

        const mostBlogs = authors.reduce( (previousValue, currentValue) => {
            if( previousValue.likes > currentValue.likes && typeof currentValue.likes === 'number' ) {
                return previousValue
            } else {
                return currentValue
            }
        }, authors[0])
        return mostBlogs
    } else {
        return 'no blogs'
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteblog,
    mostBlogs,
    mostLikes
}