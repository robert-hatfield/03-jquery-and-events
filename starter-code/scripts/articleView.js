//  REVIEW: Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
      $('#author-filter').append(optionTag);
    }
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    // If the category exists, do not append a duplicate <option> tag.
    // If the category does not exist, append it.
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      /* DONE: If the select box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on on the author
            that was aselected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */
      $('#articles article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
    /* Otherwise, we should:
        1. Show all the articles except the template */
      $('article').not('.template').fadeIn();
    }
    $('#category-filter').val(''); // reset category filter
  });
};

articleView.handleCategoryFilter = function() {
  /* DONE: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      // Do something
      $('#articles article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      // Do something else
      $('article').not('.template').fadeIn();
    }
    $('#author-filter').val(''); // reset author filter
  })
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    /* DONE:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

// All of this is a stretch goal
articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  /* TODO: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the default action of a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!
    */
    // FIXME: Incorrectly hiding first 2 elements when toggling. Need to exclude them from the toggle - see line 86
  $('article').on('click', '.read-on', function(event) {
    event.preventDefault();
    console.log($(this).offset().top);
    $(this).prev().children().toggle();
    console.log($(this).offset().top);
    $(this).scrollTop($(this).offset().top);
    console.log($(this).text());
    if ($(this).text() === 'Read on →') {
      console.log('It says to read on.');
      $(this).text('← Show Less');
    } else {
      $(this).text('Read on →');
    }
  })
    // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
};

// DONE: Invoke all of the above functions (I mean, methods!):
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
// DONE: Invoke this method when it has been completed above
articleView.setTeasers();
