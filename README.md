# Simple jQuery Scrollspy Plugin

Usage

```javascript
$('.nav').scrollspy(options);
```

Options (defaults)

```javascript
{
  scrollEl    : window, // Scrollable context
  offset      : 0, // Offset from top
  selector    : 'a[href^="#"]', // Element with target section id
  activeClass : 'current'  // Class that will be applied to element in selector
}
```


Example

```html
<nav class="navigation">
  <a href="#firstSection" class="navigation-item current">First Section</a>
  <a href="#otherSection" class="navigation-item">Other Section</a>
  ...
</nav>

<div id="firstSection" class="section">Content</div>
<div id="otherSection" class="section">Content</div>
...
```

```javascript
$('.navigation').scrollspy();
```
