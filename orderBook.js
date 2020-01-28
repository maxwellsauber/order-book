const hasMatchingPrice = (existingOrder, incomingOrder) => existingOrder.type === 'buy'
  ? existingOrder.price >= incomingOrder.price
  : existingOrder.price <= incomingOrder.price

const findMatchingOrderIndex = (existingBook, incomingOrder) => existingBook.findIndex((order) =>
  order.type !== incomingOrder.type && hasMatchingPrice(order, incomingOrder)
)

const fulfillOrder = (matchingOrder, incomingOrder) => matchingOrder.quantity >= incomingOrder.quantity
  ? { ...matchingOrder, quantity: matchingOrder.quantity - incomingOrder.quantity }
  : { ...incomingOrder, quantity: incomingOrder.quantity - matchingOrder.quantity }

const reconcileOrder = (existingBook, incomingOrder) => {
  const matchingOrderIndex = findMatchingOrderIndex(existingBook, incomingOrder)

  if (matchingOrderIndex < 0) {
    return existingBook.concat([incomingOrder])
  }

  const remainingOrder = fulfillOrder(existingBook[matchingOrderIndex], incomingOrder)

  const updatedBook = [].concat(existingBook.slice(0, matchingOrderIndex)).concat(existingBook.slice(matchingOrderIndex + 1))

  return remainingOrder.quantity > 0
    ? reconcileOrder(updatedBook, remainingOrder)
    : updatedBook
}

module.exports = reconcileOrder
