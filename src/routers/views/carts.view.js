// // Ruta que renderiza la pagina del carro de compras
// router.get('/cart/:cid', async (req, res) => {
//     const { cid }  = req.params;
//     const filter = {_id: cid}
//     const process = await cartController.get(filter)
//     const [ data ] = process
//     if(process) {
//         res.status(200).render('cart', {products: data.product });
//     } else {
//         res.status(404).send({ error: 'Dato invalido', data: "" });
//     }
// });