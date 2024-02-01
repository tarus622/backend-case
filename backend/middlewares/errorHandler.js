function errorHandler(err, req, res, next) {
    if (err.statusCode && typeof err.statusCode === 'number') {
        res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = errorHandler;
