const tableResizer = (function () {
    
  // Keep this variable private inside this closure scope
  let dragColumn = null;
  let nextColumn = null;
  let columnOffset = null;
  let pageX = null;
  let nextWidth = null;
  let currWidth = null;
  
  const paddingDiff = (col) => {
     if (getStyleVal(col,'box-sizing') == 'border-box'){
            return 0;
        }
        const padLeft = getStyleVal(col,'padding-left');
        const padRight = getStyleVal(col,'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));

  };

  const getStyleVal = (elm,css) => {
    return (window.getComputedStyle(elm, null).getPropertyValue(css));
  }


  const init = (element) => {
      let arrElements = element.querySelectorAll('tr th');

       arrElements.forEach((el) => {
             const resizer = document.createElement('div');
             Object.assign(resizer.style, { 
              position:"absolute",
              top:"0px",
              left:"0px", 
              bottom: '0px', 
              cursor: 'col-resize',
              width: '5px'});
           el.style.position = 'relative';
           el.appendChild(resizer);
           resizer.addEventListener('mousedown', (e) => {
              dragColumn = e.target.parentElement;
              nextColumn = dragColumn.nextElementSibling;
              columnOffset = dragColumn.offsetWidth - e.pageX;
              pageX = e.pageX;
              let padding = paddingDiff(dragColumn);
              currWidth = dragColumn.offsetWidth - padding;
              if (nextColumn) {
                  nextWidth = nextColumn.offsetWidth - padding;
              }
           });
       });

      table.addEventListener('mousemove', (e) => {
          if (dragColumn) {
            let difX = e.pageX - pageX;
            if (nextColumn) {
                  nextColumn.style.width = (nextWidth - (difX))+'px';
                  dragColumn.style.width = (currWidth + difX)+'px';
            }
          }
      });

      table.addEventListener('mouseup', (e) => {
          dragColumn = null;
          nextColumn = null;
          columnOffset = null;
          pageX = null;
          nextWidth = null;
          currWidth = null;
      });
  };

  // Explicitly reveal public pointers to the private functions 
  // that we want to reveal publicly

  return {
    init: init,
  }
})();


export default tableResizer;


