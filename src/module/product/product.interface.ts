// product interface
export interface IProduct {
  name: string
  brand: string
  image: string
  price: number
  category:
    | 'Desk Accessories'
    | 'Files & Folders'
    | 'Office Basics'
    | 'Paper & Notebooks'
    | 'Pens & Writing'
    | 'School Supplies'
    | 'Uncategorized'

  description: string
  quantity: number
  inStock: boolean
}
