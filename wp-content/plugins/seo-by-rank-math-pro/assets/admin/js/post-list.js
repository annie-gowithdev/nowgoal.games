(()=>{"use strict";var n={n:t=>{var a=t&&t.__esModule?()=>t.default:()=>t;return n.d(a,{a}),a},d:(t,a)=>{for(var e in a)n.o(a,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:a[e]})},o:(n,t)=>Object.prototype.hasOwnProperty.call(n,t)};const t=jQuery;var a=n.n(t);const e=wp.i18n;function r(n){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},r(n)}a()((function(){if("undefined"!=typeof inlineEditPost){var n=a()("#rank-math-seo-filter"),t=a()("#rank-math-schema-filter");n.length&&n.on("change",(function(){t.addClass("hidden"),"schema_type"===a()(this).val()&&t.removeClass("hidden")})).trigger("change");var i=function(n){var t=n.find(".cat-checklist").not(".rank-math-robots-checklist").find("input");n.find("#rank_math_primary_term option").each((function(n,e){var r=a()(e),i=r.val();if("0"===i)return!0;t.filter('[value="'+i+'"]').prop("checked")?r.prop("hidden",!1):r.prop("hidden",!0)})),t.filter(":checked").length?n.find(".inline-edit-rank-math-primary-term").removeClass("hidden"):n.find(".inline-edit-rank-math-primary-term").addClass("hidden"),1===t.filter(":checked").length&&n.find("#rank_math_primary_term").val(t.filter(":checked").val()),t.off().on("change",(function(e){var r=a()(e.target),i=r.val();r.prop("checked")?n.find("#rank_math_primary_term").find('option[value="'+i+'"]').prop("hidden",!1):(n.find("#rank_math_primary_term").val()===i&&n.find("#rank_math_primary_term").val("0"),n.find("#rank_math_primary_term").find("option[value="+i+"]").prop("hidden",!0)),t.filter(":checked").length?n.find(".inline-edit-rank-math-primary-term").removeClass("hidden"):n.find(".inline-edit-rank-math-primary-term").addClass("hidden"),1===t.filter(":checked").length&&n.find("#rank_math_primary_term").val(t.filter(":checked").val())}))},o=inlineEditPost.edit;inlineEditPost.edit=function(n){o.apply(this,arguments);var t=0;if("object"===r(n)&&(t=parseInt(this.getId(n))),0!==t){var e=a()("#edit-"+t),d=a()("#post-"+t);e.find("#rank_math_title").val(d.find(".rank-math-title-value").val()),e.find("#rank_math_description").val(d.find(".rank-math-description-value").val());var l=d.find(".rank-math-robots-meta-value").val(),c=l?JSON.parse(l):[];e.find(".rank_math_robots input").prop("checked",!1),a().each(c,(function(n,t){e.find("#rank_math_robots_"+t+"_input").prop("checked",!0)})),e.find("#rank_math_robots_index_input, #rank_math_robots_noindex_input").on("click",(function(){var n="rank_math_robots_noindex_input"===this.id;if(this.checked){var t="#rank_math_robots_"+(n?"":"no")+"index_input";e.find(t).prop("checked",!1)}})),e.find("#rank_math_focus_keyword").val(a().trim(d.find(".rank-math-focus-keywords-value").val())),e.find("#rank_math_canonical_url").val(d.find(".rank-math-canonical-url-value").val()),e.find("#rank_math_canonical_url").attr("placeholder",d.find(".rank-math-canonical-placeholder-value").val()),i(e),e.find("#rank_math_primary_term").val(d.find(".rank-math-primary-term-value").val())}};var d=inlineEditPost.setBulk;inlineEditPost.setBulk=function(){d.apply(this,arguments);var n=a()("tr.bulk-edit-row");i(n),n.find(".rank-math-robots-checklist input").prop("checked",!1)};var l=function(n,t){a()(n).on("click",(function(){var n=a()(t).val();return"rank_math_bulk_schema_none"!==n&&"rank_math_bulk_schema_default"!==n||confirm((0,e.__)("Are you sure you want to change the Schema type for the selected posts? Doing so may irreversibly delete the existing Schema data.","rank-math-pro"))}))};l("#doaction","#bulk-action-selector-top"),l("#doaction2","#bulk-action-selector-bottom")}}))})();