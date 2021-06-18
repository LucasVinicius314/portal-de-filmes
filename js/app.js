/// <reference path="bootstrap.min.js"  />
/// <reference path="jquery.min.js"  />

// /movie/${id}?api_key=${baseUrl}

const key = 'api_key=56f1a9a645cb79777b36bd923c32bba8'
const baseUrl = 'https://api.themoviedb.org/3'
const cdnUrl = 'https://image.tmdb.org/t/p/w500'

/**
 * @param {import("../typescript").SortBy} sortBy
 * @returns
 */
const getUrl = (sortBy) => {
  return `${baseUrl}/discover/tv?sort_by=${sortBy}.desc&${key}&language=de`
}

/**
 * @param {number} id
 */
const redirect = (id) => {
  location = `read.html?q=${id}`
}

class Controller {
  /** @type {JQuery<HTMLElement>} */
  #maisPopulares

  /** @type {import("../typescript").Response} */
  populares

  constructor() {
    this.#maisPopulares = $('#mais-populares')
  }

  async fetch() {
    await Promise.all([
      await $.get(getUrl('popularity')).then((d) => (this.populares = d)),
    ])
  }

  render() {
    this.#maisPopulares.html('')
    this.#maisPopulares.append(
      this.populares.results.map((v) => {
        return $(`
        <div class="col-12 col-sm-6 col-lg-3 p-2 align-items-center">
          <div class="card shadow custom h-100" onclick="redirect(${v.id})">
            <img src="${cdnUrl}${v.poster_path}" class="card-img-top" />
            <div class="card-body">
              <div class="card-title d-flex justify-content-between">
                <h6 class="mt-1">${v.name}</h6>
                <div class="d-flex align-items-center">
                  <b>${v.vote_average}</b>
                  <span class="mdi mdi-star-outline"></span>
                </div>
              </div>
              <small class="text-muted">${v.first_air_date}</small>
            </div>
          </div>
        </div>
        `)
      })
    )
  }
}

/**
 * @type {number | null}
 */
let buffer = null

$(async () => {
  const controller = new Controller()
  await controller.fetch()
  controller.render()

  const search = $('#search')
  const searchList = $('#search-list')

  $('#clear').on('click', function () {
    $(this).val('')
  })

  search.on('keyup', () => {
    if (buffer != null) clearTimeout(buffer)
    if (search.val().length === 0) return
    buffer = setTimeout(() => {
      $.get(`${baseUrl}/search/tv?${key}&query=${search.val()}`).then((d) => {
        /**
         * @type {import("../typescript").Response}
         */
        const data = d
        searchList.html('')
        searchList.append(
          data.results
            .filter((f) => f.poster_path !== null)
            .slice(0, 6)
            .map((v) => {
              return $(`
                <div class="p-2">
                  <div class="d-flex">
                    <div>
                      <img class="search-img"
                        src="${cdnUrl}${v.poster_path}"
                        alt="${v.original_name}">
                    </div>
                    <div class="flex-shrink px-3 py-1">
                      <h6>${v.name}</h6>
                      <p>${v.overview || 'Descrição não informada'}</p>
                    </div>
                  </div>
                </div>
              `).on('click', () => {
                redirect(v.id)
              })
            })
        )
      })
    }, 1000)
  })
})
