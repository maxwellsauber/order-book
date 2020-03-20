const reconcileOrder = (existingBook, incomingOrder) => {

  if (existingBook.length < 1) { // Empty Existing Book... test 1
    return [incomingOrder]
  }

  const returnBook = []

  for (let i = 0; i < existingBook.length; i++) {


    if (existingBook[i].type === incomingOrder.type || existingBook[i].price !== incomingOrder.price) {
      // If both books have same type (test 2) OR if prices do not match (test 3)

      returnBook.push(existingBook[i])
      returnBook.push(incomingOrder)

      //return returnBook // WHY DOES THHIS NOT WORK OUTSIDE IF/FOR Statement????? returns first item
    }
    else if (existingBook[i].price === incomingOrder.price && existingBook[i].price === incomingOrder.price) {

      returnBook.push(existingBook[i])

    }



  }

  return returnBook //This should work out here?


}

module.exports = reconcileOrder