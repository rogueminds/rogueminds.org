(($) ->
  $ ->
    $(".scroll").on "click", (event) ->
      event.preventDefault()
      $('html,body').animate
        scrollTop: $(this.hash).offset().top
        1200
) jQuery