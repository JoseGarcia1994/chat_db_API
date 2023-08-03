const {
    ValidationError,
    DatabaseError,
    ConnectionError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    InvalidConnectionError
} = require('sequelize');

const logError = (err, req, res, next) => {
    console.log(err);
    next(err);
}

const handleORMError = (err, req, res, next) => {
    if (
        err instanceof ConnectionError ||
        err instanceof ConnectionRefusedError ||
        err instanceof ConnectionTimedOutError ||
        err instanceof InvalidConnectionError
    ) {
        return res.status(409).json({
            error: "Database connection error",
            message: err.name,
        });
    }
    if(err instanceof ValidationError) {
        return res.status(400).json({
            name: err.name,
            message: err.message,
            errors: err.errors,
        });
    }
    if(err instanceof DatabaseError) {
        return res.status(409).json({
            name: err.name,
            message: err.message,
            errors: err.errors,
        });
    }
    
    next(err);
}

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.errorName,
        message: err.error
    });
};

const notFoundErrorHandler = (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message:'resource you are looking for doesnot exist',
    });
};

module.exports = {
    logError,
    handleORMError,
    errorHandler,
    notFoundErrorHandler,
}