import React from 'react'
import './CategoryList.scss'

const CategoryList = () => {
  return (
    <div>
      <div className="category-box">
        <div className="box-add">
          <button>+</button>
          <input placeholder='Kategori Oluşturunuz...' type="text" />
        </div>
        <hr />
        <div className="box-categories">
          <button>Category Name 1</button>
          <button>Category Name 2</button>
          <button>Category Name 3</button>
          <button>Category Name 4</button>
          <button>Category Name 5</button>
        </div>
      </div>

    </div>
  )
}

export default CategoryList