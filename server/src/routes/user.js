const express = require ( 'express' );
const router = express.Router ();


router.get ( '/' , (req , res) => {
        res.send ( 'Hello from user route' );
    }
);

router.get ( '/:id' , (req , res) => {
        res.send ( `Hello from user route with id ${req.params.id}` );
    }
);

router.post ( '/add' , (req , res) => {
        res.send ( 'Hello from user route' );
    }
);

router.put ( '/update/:id' , (req , res) => {
        res.send ( `Hello from user route with id ${req.params.id}` );
    }
);

router.delete ( '/delete/:id' , (req , res) => {
        res.send ( `Hello from user route with id ${req.params.id}` );
    }
);
