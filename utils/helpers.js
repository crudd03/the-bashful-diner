module.exports = {
  
  getSub:  (billItems) => {
    var total = billItems.reduce(function (a, b) { return a + b.menu_item.price; }, 0);
    return total;
},   

  getTax:  (billItems) => {
  var total = billItems.reduce(function (a, b) { return a + b.menu_item.price; }, 0);
  return (total * .06).toFixed(2);
},
  getTip:  (billItems) => {
  var total = billItems.reduce(function (a, b) { return a + b.menu_item.price; }, 0);
  return (total * .18).toFixed(2);
}, 
getTotal:  (billItems) => {
  var total = billItems.reduce(function (a, b) { return a + b.menu_item.price; }, 0);
  return (total + (total * .18) + (total * .06)).toFixed(2);
},       
};
