<% require css("../css/FlexColumn.css") %>
<div class="g-flex-col{$xs} {$sm} {$md} {$lg} {$xsOffset} {$smOffset} {$mdOffset} {$lgOffset} <% if $isReversed %> g-flex-reverse<% end_if %>">
  <% control children %><% end_control %>

</div>
