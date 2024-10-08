const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
  
    next()
}

const userExtractor = async (request, response, next) => {

    if(request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        if( !user ) {
            return response.status(401).json({ error: 'User not found' })
        }
        request.user = user
    }

    next()
}

const errorHandler = (error, request, response, next) => {

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
		  error: 'invalid token'
		})
	}

	next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}