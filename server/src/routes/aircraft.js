const express = require ( 'express' );
const { Aircraft } = require ( "../models/aircraft.model" );
const router = express.Router ();
router.get('/', async (req, res) => {
    try {
        const query = {};
        const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
        const limit = 10;
        const skip = (page - 1) * limit;

        // Filter by operator if provided
        if (req.query.operator) {
            query.operator = req.query.operator;
        }

        // Filter by aircraft name if provided
        if (req.query.aircraftName) {
            query.aircraft_name = req.query.aircraftName;
        }

        // Filter by aircraft type if provided
        if (req.query.aircraftType) {
            query.aircraft_type = req.query.aircraftType;
        }

        // Filter by registry if provided
        if (req.query.registry) {
            query["aircraft_identification.registry"] = req.query.registry;
        }

        // Filter by serial number if provided
        if (req.query.serialNumber) {
            query["aircraft_identification.serial_number"] = req.query.serialNumber;
        }

        // Fetch aircrafts based on the built query
        const aircrafts = await Aircraft.find(query)
            .populate('operator')
            .populate('aircraft_name')
            .skip(skip)
            .limit(limit);

        res.status(200).json(aircrafts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get ( '/:id' , async (req , res) => {
    try {
        const aircraft = await Aircraft.findById ( req.params.id ).populate ( 'operator' ).populate ( 'aircraft_name' );
        if ( !aircraft ) {
            return res.status ( 404 ).json ( { message : 'Aircraft not found' } );
        }
        res.status ( 200 ).json ( aircraft );
    } catch (error) {
        res.status ( 500 ).json ( { message : error.message } );
    }
} );

router.post ( '/create' , async (req , res) => {
    try {
        const aircraft = new Aircraft ( req.body );
        const savedAircraft = await aircraft.save ();
        res.status ( 201 ).json ( savedAircraft );
    } catch (error) {
        res.status ( 500 ).json ( { message : error.message } );
    }
} );

router.put ( '/:id/edit' , async (req , res) => {
    try {
        const updatedAircraft = await Aircraft.findByIdAndUpdate ( req.params.id , req.body , { new : true } );
        if ( !updatedAircraft ) {
            return res.status ( 404 ).json ( { message : 'Aircraft not found' } );
        }
        res.status ( 200 ).json ( updatedAircraft );
    } catch (error) {
        res.status ( 500 ).json ( { message : error.message } );
    }
} );

router.delete ( '/:id/delete' , async (req , res) => {
    try {
        const deletedAircraft = await Aircraft.findByIdAndDelete ( req.params.id );
        if ( !deletedAircraft ) {
            return res.status ( 404 ).json ( { message : 'Aircraft not found' } );
        }
        res.status ( 200 ).json ( deletedAircraft );
    } catch (error) {
        res.status ( 500 ).json ( { message : error.message } );
    }
} );

module.exports = router;
