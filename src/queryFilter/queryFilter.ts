import { FilterQuery, Query } from 'mongoose'

class QueryFilter<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }
  search(searchableFields: string[]) {
    const search = this?.query?.search?.toString().trim(); // Trim whitespace and ensure it's a string
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' }, // Case-insensitive regex
        })),
      });
    }
    return this;
  }
  
  filter() {
    const queryObj = { ...this.query };
  
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];
    excludeFields.forEach((el) => delete queryObj[el]);
  
    // Convert numeric fields and handle range filters
    Object.keys(queryObj).forEach((key) => {
      if (!isNaN(Number(queryObj[key]))) {
        queryObj[key] = Number(queryObj[key]); // Convert strings to numbers
      } else if (key === 'price') {
        if (queryObj[key].includes(',')) {
          // Handle range: price=100,500
          const [min, max] = queryObj[key].split(',');
          queryObj[key] = { $gte: Number(min), $lte: Number(max) };
        } else if (!isNaN(parseFloat(queryObj[key]))) {
          // Handle single price with decimal like 2.5, 44.5, etc.
          queryObj[key] = parseFloat(queryObj[key]);
        }
      }
    });
  
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
  
    return this;
  }
  
  

  sortBy() {
    // eslint-disable-next-line prefer-const
    let sortField = (this?.query?.sortBy as string) || 'createdAt';  
    const sortOrder = (this?.query?.sortOrder as string) || 'desc'; 

    // Format sort query based on sortOrder
    const sort = sortOrder === 'asc' ? sortField : `-${sortField}`; 
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }
}


export default QueryFilter
