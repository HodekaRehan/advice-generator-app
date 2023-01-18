'use strict'

const loader = document.querySelector('.loader')
const btn = document.querySelector('.dice-btn')
const adviceID = document.querySelector('.advice-id')
const adviceText = document.querySelector('.advice-text')

const showLoader = function () {
   loader.style.display = 'inline-block'
   adviceID.classList.add('hidden')
   adviceText.classList.add('hidden')
}

const hideLoader = function () {
   loader.style.display = 'none'
   adviceID.classList.remove('hidden')
   adviceText.classList.remove('hidden')
}

const fetchAdvice = async function() {
   try {
      showLoader()

      const response = await fetch('https://api.adviceslip.com/advice');

      if(!response.ok) { 
         throw new Error(response.statusText)
      }
      
      const data = await response.json()

      adviceID.textContent = `ADVICE #${data.slip.id}`
      adviceText.textContent = `"${data.slip.advice}"`
      
      hideLoader()
      
   } catch (error) {
      
      hideLoader()
      console.error('Something went wrong');
   }
}

btn.addEventListener('click', function() {
   fetchAdvice()
})

fetchAdvice()