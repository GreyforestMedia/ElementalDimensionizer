# Elemental Dimensionizer
A small jQuery-based function for transforming elements in multiple dimensions based on cursor position.

VIEW DEMO: https://greyforestmedia.github.io/ElementalDimensionizer/

![Demonstration](/media/GreyforestElementalDimensionizer.gif)

## OPTIONS
* **dimension-x-inverse:** invert x rotation
* **dimension-y-inverse:** invert y rotation
* **dimension-x-sensitivity:** sensitivity of x rotation
* **dimension-y-sensitivity:** sensitivity of y rotation


## USAGE

**Create a parent element to hold the layers**

    <div id="element">

**Apply "element-dimension" class to desired layers**

    <h2 class="element-dimension"

**Add optional data attributes**

    data-dimension-x-inverse="true"
    data-dimension-x-sensitivity="2"
    data-dimension-y-inverse="false"
    data-dimension-y-sensitivity="3"

**Include layer text/img/etc and close parent element**

    >Greyforest Elemental Dimensionalizer</h2></div>

**Initialize script and target parent element**
* **element:** set ID of parent element that contains layers
* **log:** true or false for small box to display coordinates legend

`<script> ElementalDimensionizer(element, log); </script>`


