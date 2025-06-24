const errorMiddleware = (err , req , res , next) => {
    console.log(
        "holaaaa"
    )
    try {

        console.log("lol?");

        let error = {...err}
        error.message = err.message;
        console.error(err.message);

        //Mongoose bad objectId
        if (err.name === 'CastError') {
            const message = err.message ;
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if (err.code === 11000) {
            const message = "Duplicate field value entered"
            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }



        return res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server error middleware'
        });

    } catch (error) {
        next(error);
    }
}

export default errorMiddleware