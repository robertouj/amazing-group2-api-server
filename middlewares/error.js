const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something got stupidly wrong here and somebody will get fired!!!")
}

module.exports = errorHandler;