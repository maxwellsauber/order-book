const reconcileOrder = (existingBook, incomingOrder) => {
  if (existingBook.length < 1) { // Empty Existing Book
    return [incomingOrder]
  }

  for (let i = 0; existingBook.length; i++) {
    if (existingBook[i].type == incomingOrder.type || existingBook[0].price != incomingOrder.price) {
      // If both books have same type OR if prices do not match
      const returnBook = []

      returnBook.push(existingBook[0])
      returnBook.push(incomingOrder)

      return returnBook
    }

  }

}

module.exports = reconcileOrder