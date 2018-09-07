const imageProduct = document.getElementById('image-product')
const radios = document.getElementsByName('coupons')
const noneCoupons = document.getElementById('none-coupons')
const withCoupons = document.getElementById('with-coupons')
const valueCoupon = document.getElementById('value-coupon')
const discount = document.getElementById('discount')
const price = document.getElementById('price')
const shippingPrice = document.getElementById('shipping-price')
const totalPrice = document.getElementById('total-price')
const modalConfirmOffer = document.getElementById('modal-confirm-offer')
const modalCancelOffer = document.getElementById('modal-cancel-offer')
const closeModalConfirm = document.getElementById('close-modal-confirm')
const closeModalCancel = document.getElementById('close-modal-cancel')
const close = document.getElementById('close')
const buttonCancelOffer = document.getElementById('button-cancel-offer')
const buttonConfirmOffer = document.getElementById('button-confirm-offer')


const getCheckout = () => {
  const request = fetch('/api/checkouts/6544', {
    method: 'get'
  })
  request.then(response => {
    response.json()
    .then(data => {
      const product = data.product
      const checkout = data.checkout
      imageProduct.setAttribute('src', product.image)
      imageProduct.setAttribute('alt', product.title)

      price.innerText = `R$ ${product.price}`

      shippingPrice.innerText = `R$ ${checkout.shippingPrice}`
      totalPrice.innerText = `R$ ${checkout.totalPrice}` 
      
      checkout.availableCoupons.map(availableCoupon => {
        withCoupons.labels[0].innerText = availableCoupon.title
        valueCoupon.innerText = `- R$ ${availableCoupon.discount}`
        discount.innerText = `- R$ ${availableCoupon.discount}`
        
        withCoupons.addEventListener('change', () => {
          if ( withCoupons.checked === true ) {
            totalPrice.innerText = `R$ ${checkout.totalPrice - availableCoupon.discount}`
            valueCoupon.removeAttribute('hidden')
            discount.removeAttribute('hidden')
          }
          if (noneCoupons.checked === true) {
            valueCoupon.getAttribute('hidden')
            discount.getAttribute('hidden')
          }
        })
      })
    })
  })
}
getCheckout()

buttonConfirmOffer.addEventListener('click', () => modalConfirmOffer.classList.add('is-active'))
buttonCancelOffer.addEventListener('click', () => modalCancelOffer.classList.add('is-active'))
closeModalConfirm.addEventListener('click', () => modalConfirmOffer.classList.remove('is-active'))
closeModalCancel.addEventListener('click', () => modalCancelOffer.classList.remove('is-active'))
