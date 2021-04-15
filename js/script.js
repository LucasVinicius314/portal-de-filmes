/// <reference path="bootstrap.min.js"  />

const hz = 30

let h = 0

$(() => {
  setSize()
  $(window).on('resize', setSize)
  setInterval(
    () =>
      (document.getElementById('footer-text').style.color = `hsl(${
        h++ % 255
      }, 70%, 50%)`),
    1000 / 30
  )
})

const setSize = () => {
  const heights = [
    $('.carousel-inner>div:nth(0)').height(),
    $('.carousel-inner>div:nth(1)').height(),
    $('.carousel-inner>div:nth(2)').height(),
    $('.carousel-inner>div:nth(3)').height(),
  ].sort()
  $('.carousel-inner').height(heights[heights.length - 1])
}
