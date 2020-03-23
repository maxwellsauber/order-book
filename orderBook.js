const reconcileOrder = (existingBook, incomingOrder) =>
  existingBook.length
    ? checkType(existingBook, incomingOrder)
    : addToBook(existingBook, incomingOrder)

const checkType = (existing, incoming) =>
  existing.every((obj) => obj.type === incoming.type)
    ? addToBook(existing, incoming)
    : checkPrice(existing, incoming)

const checkPrice = (existing, incoming) => {
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].price === incoming.price) {
      return checkQuantity(existing, incoming)
    }
  }
  return addToBook(existing, incoming)
}

const checkQuantity = (existing, incoming) => {
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].quantity === incoming.quantity) {
      existing.splice(i, 1)
      return existing
    } else if (existing[i].quantity > incoming.quantity) {
      existing[i].quantity -= incoming.quantity
      return existing
    } else if (existing[i].quantity < incoming.quantity) {
      incoming.quantity -= existing[i].quantity
      existing.splice(i, 1)
      return checkType(existing, incoming) //Recursion fun time
    }
  }
}

const addToBook = (existing, incoming) => {
  existing.push(incoming)
  return existing
}

module.exports = reconcileOrder