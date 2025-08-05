import Property from '../models/Property.js';

// Get all properties with filtering, sorting, and pagination
export const getAllProperties = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Property.find(JSON.parse(queryStr));
    
    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = query.find({
        $or: [
          { name: searchRegex },
          { location: searchRegex },
          { description: searchRegex },
          { type: searchRegex },
          { amenities: searchRegex },
          { tags: searchRegex }
        ]
      });
    }

    // Filtering by type
    if (req.query.type && req.query.type !== 'all') {
      query = query.find({ type: req.query.type });
    }

    // Filtering by price range
    if (req.query.minPrice && req.query.maxPrice) {
      query = query.find({
        price: { $gte: req.query.minPrice, $lte: req.query.maxPrice },
      });
    }

    // Filtering by guests
    if (req.query.guests) {
      query = query.find({ 'details.guests': { $gte: req.query.guests } });
    }

    // Filtering by amenities
    if (req.query.amenities) {
      const amenities = req.query.amenities.split(',');
      query = query.find({ amenities: { $all: amenities } });
    }

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // PAGINATION
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // EXECUTE QUERY
    const properties = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get property by ID
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('reviewsData');

    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'No property found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Create new property
export const createProperty = async (req, res) => {
  try {
    // Add host ID from authenticated user
    req.body.host = req.user.id;

    const newProperty = await Property.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        property: newProperty,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'No property found with that ID',
      });
    }

    // Check if user is the property host or an admin
    if (property.host.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to update this property',
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        property: updatedProperty,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'No property found with that ID',
      });
    }

    // Check if user is the property host or an admin
    if (property.host.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this property',
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get top rated properties
export const getTopProperties = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating';
  req.query.fields = 'name,price,rating,images,location,type';
  next();
};

// Get properties by host
export const getHostProperties = async (req, res) => {
  try {
    const properties = await Property.find({ host: req.user.id });

    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};