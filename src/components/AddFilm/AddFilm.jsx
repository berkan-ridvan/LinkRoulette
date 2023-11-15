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
          <div className='box-categories-item'>
            <h3>Hızlı ve Öfkeli 1</h3>
            <textarea name="" id="" >https://www.asdasdsadsda...</textarea>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default AddFilm