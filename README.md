# Description
	
  The code presented, makes it possible to use the scroll, so that there is a transition from block to block, without removing the scroll bar of the page and taking into account the position of the slider.

# Dependencies
  - NOT

# Initial
```javascript
  ScrollTo.init(selector)
```
# Example
```javascript
  <body>
    <div class="anchor"><p class="h1">1</p></div>
    <div class="anchor"><p class="h1">2</p></div>
    <div class="anchor"><p class="h1">3</p></div>
    <div class="anchor"><p class="h1">4</p></div>
  </body>
  <script>
    ScrollTo.init('.anchor')
  </script>
```
