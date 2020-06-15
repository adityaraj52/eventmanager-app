// var express = require("express");
// var klarna = require("klarna-checkout");
// var bodyParser = require("body-parser");
//
// klarna.init({
//     eid: 'PK18575_dfa138d8a432',
//     secret: 'QHrpM3bF4ku7yOhT'
// });
//
// klarna.config({
//     terms_uri: 'http://www.example.com',
//     cancellation_terms_uri: 'http://www.example.com',
//     checkout_uri: 'http://www.example.com',
//     confirmation_uri: 'http://localhost:3000/confirmation?klarna_order_id={checkout.order.id}',
//     push_uri: 'http://www.example.com'
// });
//
// var klarnasetup = express();
//
// klarnasetup.use(bodyParser.json());
//
// klarnasetup.use(express["static"]('public'));
//
// var order2html = function(order) {
//     var html, key, value, value2;
//     html = '';
//     for (key in order) {
//         value = order[key];
//         if (typeof value === 'object') {
//             html += '<strong>' + key + '</strong><br>';
//             for (key in value) {
//                 value2 = value[key];
//                 if (key === 'snippet') {
//                     value2 = '(We don\'t want to render this now...)';
//                 }
//                 html += '&nbsp;&nbsp;' + key + ': ' + value2 + '<br>';
//             }
//         } else {
//             html += key + ': ' + value + '<br>';
//         }
//     }
//     return html;
// };
//
// klarnasetup.post('/order', function(req, res) {
//     console.log("Placing order");
//     return klarna.place(req.body).then(function(id) {
//         return klarna.fetch(id);
//     }, function(error) {
//         return res.status(500).send(error);
//     }).then(function(order) {
//         console.log("Snippet received");
//         return res.send(order.gui.snippet);
//     }, function(error) {
//         return res.status(500).send(error);
//     });
// });
//
// klarnasetup.get('/confirmation', function(req, res) {
//     var id;
//     console.log("Confirming order");
//     id = req.query.klarna_order_id;
//     return klarna.confirm(id, '1000').then(function(order) {
//         var html;
//         console.log("Order confirmed");
//         html = order.gui.snippet;
//         html += '<div style="font-family: Helvetica, sans-serif; text-align: center"><a href="/order/' + id + '">View order</a>';
//         return res.send(html);
//     }, function(error) {
//         return res.status(500).send(error);
//     });
// });
//
// klarnasetup.get('/order/:id', function(req, res) {
//     var id;
//     id = req.params.id;
//     return klarna.fetch(id).then(function(order) {
//         return res.send(order2html(order));
//     }, function(error) {
//         return res.status(500).send(error);
//     });
// });
//
// var server = klarnasetup.listen(3000, 'localhost', function() {
//     var port;
//     port = server.address().port;
//     console.log("Klarna Checkout example server is up and running!".green);
//     return console.log(("Visit http://localhost:" + port + " in a browser to try it.").green);
// });
//
//
// export default klarnasetup;
