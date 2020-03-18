const reconcileOrder = (existingBook, incomingOrder) => {
  if (existingBook.length < 1) { // Empty Existing Book
    return [incomingOrder]
  }

  //!-------- Shoud loop through all existing books!!! only asks for first------- !!!!!
  if (existingBook[0].type == incomingOrder.type) { // If both books have same type
    const returnBook = []

    returnBook.push(existingBook[0])
    returnBook.push(incomingOrder)

    return returnBook
  }
}

module.exports = reconcileOrder