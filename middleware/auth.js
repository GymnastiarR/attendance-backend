const Authorization = ( roles ) => {
    return ( req, res, next ) => {
        try {
            const { user } = req;
            if ( user && roles.includes( user.role ) ) {
                next();
            } else {
                res.status( 403 ).json( { message: "Forbidden" } );
            }
        } catch ( error ) {
            next( error );
        }
    };
};