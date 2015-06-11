# Iconography

The Predix Experience Iconography module defines styles for icon sets like FontAwesome.

## Sass Documentation

You can review Sass Documentation here: https://github.build.ge.com/pages/PXd/px-iconography-design/sassdoc

## Dependencies

Px's Buttons module depends on one other Px module and third party library Font Awesome:

* [Font Awesome](http://fontawesome.io)
* [px-functions-design](https://github.build.ge.com/PXd/px-functions-design)

## Installation

Install this module using bower

    bower install --save https://github.build.ge.com/PXd/px-iconography-design.git

Once installed, `@import` into your project's Sass file in its Base layer:

    @import "../px-iconography-design/base.iconography";

See [px-getting-started](https://github.build.ge.com/PXd/px-getting-started#a-note-about-relative-import-paths) for an explanation of the `../`

## Import once

All rulesets are wrapped in the following `@if` statement:

    @if import-once('base.iconography') { ... }

## Usage

The following variables are available for use in the module:

    $fa-font-path

Icons currently available under Font Awesome are in this [cheatsheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/)
