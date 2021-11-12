// adding swift control to the ball
setInterval(() => {
  document.addEventListener("mousemove", (e) => {
    let footballSVG = d3.select("#football > svg");
    let mx = e.clientX;
    let ballR = document.querySelector("#football>svg").getBoundingClientRect();
    let containerR = document
      .getElementById("container")
      .getBoundingClientRect();
    let containerWidth = containerR.right - containerR.left;
    let translateX = 0;
    if (!(mx > containerR.left && mx < containerR.right)) {
      translateX =
        mx < containerR.left
          ? (-1 * containerWidth) / 2 + 50
          : containerWidth / 2 - 50;
    } else {
      let midContainer = (containerR.right + containerR.left) / 2;
      let midBall = (ballR.right + ballR.left) / 2;
      // if(midContainer > midBall){
      //     console.log("ball on left");
      // }
      // else{
      //     console.log("ball on right");
      // }
      translateX =
        mx < midContainer ? -1 * (midContainer - mx) : mx - midContainer;
      // translateX = mx;
      if (
        translateX + ballR.x < containerR.left ||
        translateX + ballR.x > containerR.right
      ) {
        translateX =
          translateX + ballR.x <= containerR.left
            ? (-1 * containerWidth) / 2 + 50
            : containerWidth / 2 - 50;
      }
    }

    let rotateFactor = (translateX * 2) / containerWidth;
    footballSVG
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr(
        "transform",
        `translate(${translateX},0)rotate(${
          translateX < 0 ? -1 * rotateFactor * 90 : rotateFactor * 90
        })`
      );
  });
}, 800);

// adding circle around the cursor for better sense of control
document.addEventListener("DOMContentLoaded", () => {
  let mousePosX = 0,
    mousePosY = 0,
    mouseCircle = document.getElementById("mouse-circle");

  document.onmousemove = (e) => {
    mousePosX = e.pageX;
    mousePosY = e.pageY;
  };

  let delay = 6,
    revisedMousePosX = 0,
    revisedMousePosY = 0;

  function delayMouseFollow() {
    requestAnimationFrame(delayMouseFollow);

    revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
    revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

    mouseCircle.style.top = revisedMousePosY + "px";
    mouseCircle.style.left = revisedMousePosX + "px";
  }
  delayMouseFollow();
});
