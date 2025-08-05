// Class to handle API features like filtering, sorting, pagination, and field limiting
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Filter the query based on query parameters
  filter() {
    // Create a copy of the query object
    const queryObj = { ...this.queryString };
    
    // Exclude special fields that are not used for filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Advanced filtering for operators like gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Apply the filter to the query
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Sort the results
  sort() {
    if (this.queryString.sort) {
      // Handle multiple sort fields separated by comma
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by creation date (newest first)
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // Limit the fields returned in the response
  limitFields() {
    if (this.queryString.fields) {
      // Include only specified fields
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Exclude the MongoDB __v field by default
      this.query = this.query.select('-__v');
    }

    return this;
  }

  // Implement pagination
  paginate() {
    // Convert page and limit to numbers with defaults
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 100;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Apply pagination to the query
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;