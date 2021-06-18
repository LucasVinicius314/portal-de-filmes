/// <reference path="bootstrap.min.js"  />
/// <reference path="jquery.min.js"  />
/// <reference path="app.js"  />

$(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('q')

  $.get(`${baseUrl}/tv/${id}?${key}`).then((_d) => {
    /**
     * @type {import("../typescript").Read}
     */
    const d = _d
    $('#img-cover').attr('src', `${cdnUrl}${d.poster_path}`)
    $('#titulo').text(d.name)
    $('#ep').text(`Número de episódios: ${d.number_of_episodes}`)
    $('#se').text(`Temporadas: ${d.number_of_seasons}`)
    $('#original').text(`${d.original_name} - ${d.spoken_languages[0].name}`)
    const [, y, m, u] = d.last_air_date.match(/(\d{4})-(\d{2})-(\d{2})/)
    $('#ano').text(`${u}/${m}/${y}`)
    if (d.overview === '') $('#sinopse').text('Não há descrição')
    else $('#sinopse').text(d.overview)
    if (d.homepage.length === 0) $('#button').text('Não há link externo')
    else $('#button').attr('href', d.homepage)
  })
})
