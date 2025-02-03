import { model, Schema } from 'mongoose'

// product schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
    },
    image:{
      type: String,
      required: [true, 'Image is required.'],

    },
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [1, 'Price must be at least 1.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity must be at least 1.'],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          'Desk Accessories',
          'Files & Folders',
          'Office Basics',
          'Paper & Notebooks',
          'Pens & Writing',
          'School Supplies',
          'Uncategorized',
        ],
        message: '{VALUE} is not a valid category.',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const Product = model('Product', productSchema)

export default Product
