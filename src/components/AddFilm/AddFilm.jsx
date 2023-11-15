import React from 'react'
import './AddFilm.scss'

const AddFilm = () => {
  return (
    <div>
      <div className="add-film-box">
        <div className="box-add">
          <h3>Category Name 1</h3>
          <input className='box-add-name' placeholder='Film Name...' type="text" />
          <input placeholder='Film Link...' type="text" />
          <button>+</button>
        </div>
        <hr />
        <div className="box-categories">
          <button>Category Name 1</button>
          <button>Category Name 2</button>
          <button>Category Name 3</button>
          <button>Category Name 4</button>
          <button>Category Name 5</button>
          <button>Category Name 1</button>
          <button>Category Name 2</button>
          <button>Category Name 5</button>
          <button>Category Name 1</button>
          <button>Category Name 2</button>
          

        </div>
      </div>
    </div>
  )
}

export default AddFilm