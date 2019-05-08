<% require css("../css/column.css") %>
<div class="g-flex-col{$xs} {$sm} {$md} {$lg} {$xsOffset} {$smOffset} {$mdOffset} {$lgOffset} <% if $isReversed %> g-flex-reverse<% end_if %>"> 
  {$children}

</div>