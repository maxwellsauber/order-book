const reconcileOrder = (existingBook, incomingOrder) =>
  existingBook.length
    ? checkAllTypesMatch(existingBook, incomingOrder)
    : addToBook(existingBook, incomingOrder)

const checkAllTypesMatch = (existing, incoming) =>
  existing.every((obj) => obj.type === incoming.type)
    ? addToBook(existing, incoming)
    : checkPricesMatch(existing, incoming)

const checkPricesMatch = (existing, incoming) => {
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].price === incoming.price) {
      return checkQuantities(existing, incoming)
    }
  }
  return addToBook(existing, incoming)
}

const checkQuantities = (existing, incoming) => {
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].quantity === incoming.quantity) {
      existing.splice(i, 1)
      return existing
    }
    if (existing[i].quantity > incoming.quantity) {
      existing[i].quantity -= incoming.quantity
      return existing
    }
    if (existing[i].quantity < incoming.quantity) {
      incoming.quantity -= existing[i].quantity
      existing.splice(i, 1)
      return checkAllTypesMatch(existing, incoming)
    }
  }
}

const addToBook = (existing, incoming) => {
  existing.push(incoming)
  return existing
}

module.exports = reconcileOrder