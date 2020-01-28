function priceMatches(order, incomingOrder) {
  return order.type === 'buy'
    ? order.price >= incomingOrder.price
    : order.price <= incomingOrder.price
}

function findMatchingOrderIndex(existingBook, incomingOrder) {
  return existingBook.findIndex((order) => {
    return order.type !== incomingOrder.type && priceMatches(order, incomingOrder)
  })
}

function fulfillOrder(matchingOrder, incomingOrder) {
  return matchingOrder.quantity >= incomingOrder.quantity
    ? { ...matchingOrder, quantity: matchingOrder.quantity - incomingOrder.quantity }
    : { ...incomingOrder, quantity: incomingOrder.quantity - matchingOrder.quantity }
}

function reconcileOrder(existingBook, incomingOrder) {
  const matchingOrderIndex = findMatchingOrderIndex(existingBook, incomingOrder)

  if (matchingOrderIndex < 0) {
    return existingBook.concat([incomingOrder])
  }

  const remainingOrder = fulfillOrder(existingBook[matchingOrderIndex], incomingOrder)

  existingBook.splice(matchingOrderIndex, 1)

  return remainingOrder.quantity > 0
    ? reconcileOrder(existingBook, remainingOrder)
    : existingBook
}

module.exports = reconcileOrder
