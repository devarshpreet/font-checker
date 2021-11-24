chrome.action.onClicked.addListener( (tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fontCheckerInit
  });
});

function fontCheckerInit(){

  let styleDetailsDiv = document.createElement("div");
  styleDetailsDiv.id = "styleDetails";

  let closeButton = document.createElement("div");
  closeButton.id = "closeFontDetails";
  closeButton.innerHTML = "Exit FontChecker";

  document.body.appendChild(styleDetailsDiv);
  document.body.appendChild(closeButton);

  closeButton.addEventListener("click", function(){
    document.getElementById("styleDetails").remove();
    document.getElementById("closeFontDetails").remove();
  });


  document.onmouseover = function(e){
    styleDetailsDiv.innerHTML = "";
    let compStyles = window.getComputedStyle(e.target).getPropertyValue('font-family').split(",");

    styleDetailsDiv.innerHTML = "Font-family: <span> "+ compStyles[0]+" </span>";
  }

  document.onmousemove = function(e){
    let posX = e.pageX;
    let posY = e.pageY;


    if( posX >= ( 
      window.innerWidth - parseInt( window.getComputedStyle(document.getElementById("styleDetails")).getPropertyValue('width') )
      )
      )
    {
      posX = ( window.innerWidth - parseInt( window.getComputedStyle(document.getElementById("styleDetails")).getPropertyValue('width') ) );
    }

    styleDetailsDiv.style.left = posX + 10 +"px";
    styleDetailsDiv.style.top =  posY + 10 +"px";
  }
}