const track = document.getElementById("image-track");
const image = document.getElementsByClassName("image");

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt == 0) return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = percentage + parseFloat(track.dataset.prevPercentage);
  nextPercentageUnconstrained = Math.max(Math.min(nextPercentage, 0), -100);
  console.log(nextPercentage);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentageUnconstrained}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("images")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentageUnconstrained}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};
