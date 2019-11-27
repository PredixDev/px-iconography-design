/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Demo DOM module */
/* 6: Handle selectedOptions, update demo */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-sass-doc/px-sass-doc.js';
import '../css/px-iconography-design-demo-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
  <!-- 0: Import the styles-->
  <style include="px-iconography-design-demo-styles" is="custom-style"></style>

<!-- 1: Describe Module -->
<px-sass-doc module-name="px-iconography-design" description="The Predix UI Iconography module defines styles for icon sets like FontAwesome." layer="base" sassdoc-path="sassdoc.json" dependencies="[
    &quot;http://fontawesome.io&quot;
  ]" selected-options="{{selectedOptions}}">

<!-- 2: Set Options -->
<px-sass-doc-option slot="options" option-name="Icons" choose-with="dropdown" choices="[
    &quot;Hand-peace-o&quot;,
    &quot;Hand-o-right&quot;
  ]" default-choice="Hand-peace-o">
</px-sass-doc-option>

<!-- 3: Make HTML Demo -->
<section slot="demo-html">
<i class\$="{{iconClass}}"></i>
</section>

<!-- 4: Set Import Slot -->
<section slot="import">
{{importCode}}
</section>

<!-- 5: Set Usage HTML -->

<section slot="usage">
\`\`\`
<i class="fa fa-briefcase"></i>
\`\`\`
</section>

</px-sass-doc>
`,

  is: 'px-iconography-design-demo',

  attached : function(){
    var boundHandler = this._handleOptionsUpdated.bind(this);
    this.addEventListener('px-sass-doc-options-updated', boundHandler)
  },

  detached : function(){
    this.removeEventListener('px-sass-doc-options-updated', boundHandler);
  },

  _handleOptionsUpdated : function(evt) {
    //call functions created below
    this.iconClass = this._iconClass();
    this.importCode = this._importCode();

    // Wait, then tell the highlighter to run after dom-if restamps
    this.async(function(){ this.fire('px-sass-doc-demo-updated', {}) }, 10);
  },

  _iconClass : function() {
    var opts = this.selectedOptions || {}, strings = [];
    if (opts.Icons === "Hand-peace-o")      strings.push("fa-hand-peace-o");
    if (opts.Icons === "Hand-o-right")      strings.push("fa-hand-o-right");
    return ("fa " + strings.join(" ")).trim();
  },

  _importCode : function() {
    return '@import "px-iconography-design/_base.iconography.scss";';
  }
});
