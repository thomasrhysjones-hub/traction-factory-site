/* Traction Factory: progressively enhanced article discovery and contact actions.
   No analytics service, cookies, personal data capture or network collection is enabled by this file.
   Optional Umami/Plausible/GA4 events run only if a configured provider is present. */
(function () {
  'use strict';

  function track(eventName, source, extra) {
    var properties = Object.assign({ source: source || 'unspecified' }, extra || {});
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, properties);
    } else if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: properties });
    } else if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, properties);
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[data-track]');
    if (link) track(link.dataset.track, link.dataset.source);
  });

  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-topic-filter]'));
  var entries = Array.prototype.slice.call(document.querySelectorAll('[data-article-category]'));
  var count = document.getElementById('article-filter-count');

  if (filters.length && entries.length) {
    function setArticleFilter(category) {
      var shown = 0;
      entries.forEach(function (entry) {
        var visible = category === 'all' || entry.dataset.articleCategory === category;
        entry.hidden = !visible;
        if (visible) shown++;
      });
      filters.forEach(function (filter) {
        filter.setAttribute('aria-pressed', String(filter.dataset.topicFilter === category));
      });
      if (count) count.textContent = shown + ' article' + (shown === 1 ? '' : 's') + ' shown';
    }
    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        setArticleFilter(filter.dataset.topicFilter);
        track('article_filter', 'articles', { topic: filter.dataset.topicFilter });
      });
    });
    setArticleFilter('all');
  }

  var builder = document.getElementById('enquiry-builder');
  if (builder) {
    var topic = document.getElementById('enquiry-topic');
    var company = document.getElementById('enquiry-company');
    var context = document.getElementById('enquiry-context');
    var timing = document.getElementById('enquiry-timing');
    var parameters = new URLSearchParams(window.location.search);
    var suggestedTopic = parameters.get('topic');
    var matchedTopic = Array.prototype.some.call(topic.options, function (option) {
      return option.value === suggestedTopic && option.value !== '';
    });
    if (matchedTopic) topic.value = suggestedTopic;

    builder.addEventListener('submit', function (event) {
      if (!builder.reportValidity()) { event.preventDefault(); return; }
      if (builder.dataset.delivery !== 'formspree') event.preventDefault();

      var label = topic.options[topic.selectedIndex].text;
      var source = parameters.get('source') || 'website';
      if (!/^[a-z0-9-]{1,50}$/i.test(source)) source = 'website';

      var subject = 'Traction Factory enquiry: ' + label + ' [' + source + ']';

      if (builder.dataset.delivery === 'formspree') {
        var subjectField = document.getElementById('enquiry-subject');
        var sourceField = document.getElementById('enquiry-source');
        if (subjectField) subjectField.value = subject;
        if (sourceField) sourceField.value = source;
        // This is an attempt, NOT confirmation of delivery.
        track('enquiry_submit_attempt', source, { topic: topic.value });
        return;
      }

      var lines = [
        'Area: ' + label,
        'Company / project: ' + (company.value.trim() || 'Not specified'),
        'Indicative timing: ' + (timing.value || 'Not specified'),
        '',
        'What I would like to achieve:',
        context.value.trim(),
        '',
        'Sent via tractionfactory.co'
      ];
      track('enquiry_compose', source, { topic: topic.value });
      window.location.href = 'mailto:hello@tractionfactory.co?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }
})();