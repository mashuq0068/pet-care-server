import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Searching
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Filtering
  filter() {
    const queryObj = { ...this.query };

    // Filter by category (tip or story)
    if (queryObj.category) {
      this.modelQuery = this.modelQuery.find({
        category: queryObj.category,
      });
    }

    // Exclude unnecessary fields from query
    const excludeFields = ['searchTerm', 'sort', 'limit', 'category', 'filterBy'];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  // Sorting
  sort() {
    const sortBy = this.query.sort || '-createdAt';
    
    // Custom sorting logic for most upvoted and most commented
    if (sortBy === 'most-upvoted') {
      this.modelQuery = this.modelQuery.sort({ upvoteCount: -1 });
    } else if (sortBy === 'most-commented') {
      this.modelQuery = this.modelQuery.sort({ 'comments.length': -1 });
    } else {
      this.modelQuery = this.modelQuery.sort(sortBy as string);
    }

    return this;
  }

  // Limiting
  limit() {
    const limit = Number(this.query.limit) || 10;
    this.modelQuery = this.modelQuery.limit(limit);
    return this;
  }
}

export default QueryBuilder;
