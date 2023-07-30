const errorResponse = (res, err) => {
    return(
        res.status(500).send(`Error: ${err.message}`)
    )
}

module.exports = {
    error: errorResponse
}

//create success and incomplete