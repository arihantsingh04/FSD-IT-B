import React from 'react'
import './Book.css'
const Book = () => {
  return (
    <div className="card">
        <img src="img.jpg" alt="msg" height={200} width={200} />
        <h3>Title : Physics</h3>
        <h4>Price: ₹400 </h4>
    </div>
  )
}

export default Book