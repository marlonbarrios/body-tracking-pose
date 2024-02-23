/* - - MediaPipe Body tracking - - */

/*

Which tracking points can I use?
https://developers.google.com/static/mediapipe/images/solutions/pose_landmarks_index.png

We have a total of 33 points on the body:
(our points are mirrored, so left and right are switched)

0 = nose
12 = right shoulder
11 = left shoulder
26 = right knee
25 = left knee
32 = right foot
31 = left foot
20 = right hand
19 = left hand

Full documentation
https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/index

What we do in this example:
- lerp the landmarks to make them smoother
- based on https://github.com/amcc/easydetect by Alistair McClymont

*/


/* - - Variables - - */

// webcam variables
let capture; // our webcam
let captureEvent; // callback when webcam is ready

// lerping (i.e. smoothing the landmarks)
let lerpRate = 0.2; // smaller = smoother, but slower to react
let madeClone = false;
let lerpLandmarks;

// styling
let ellipseSize = 20; // size of the ellipses
let letterSize = 20; // size of the letter


/* - - Setup - - */
function setup() {

  createCanvas(windowWidth, windowHeight);
  captureWebcam(); // launch webcam

  // styling
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(255);

}


/* - - Draw - - */
function draw() {

  // background(0);


  /* WEBCAM */
  push();
  centerOurStuff(); // center the webcam
  scale(-1, 1); // mirror webcam
  image(capture, -capture.scaledWidth, 0, capture.scaledWidth, capture.scaledHeight); // draw webcam
  scale(-1, 1); // unset mirror
  pop();


  /* TRACKING */
  if (mediaPipe.landmarks[0]) { // is hand tracking ready?

    // clone the landmarks array for lerping
    if (!madeClone) {
      lerpLandmarks = JSON.parse(JSON.stringify(mediaPipe.landmarks));
      madeClone = true;
    }

    // lerp the landmarks
    for (let i = 0; i < mediaPipe.landmarks[0].length; i++) {
      lerpLandmarks[0][i].x = lerp(lerpLandmarks[0][i].x, mediaPipe.landmarks[0][i].x, lerpRate);
      lerpLandmarks[0][i].y = lerp(lerpLandmarks[0][i].y, mediaPipe.landmarks[0][i].y, lerpRate);
    }

    //console.log("we have a total of " + mediaPipe.landmarks[0].length + " points");

    // nose
    let noseX = map(lerpLandmarks[0][0].x, 1, 0, 0, capture.scaledWidth);
    let noseY = map(lerpLandmarks[0][0].y, 0, 1, 0, capture.scaledHeight);

    // left shoulder
    let leftShoulderX = map(lerpLandmarks[0][11].x, 1, 0, 0, capture.scaledWidth);
    let leftShoulderY = map(lerpLandmarks[0][11].y, 0, 1, 0, capture.scaledHeight);

    // right shoulder
    let rightShoulderX = map(lerpLandmarks[0][12].x, 1, 0, 0, capture.scaledWidth);
    let rightShoulderY = map(lerpLandmarks[0][12].y, 0, 1, 0, capture.scaledHeight);

    // left hand
    let leftHandX = map(lerpLandmarks[0][19].x, 1, 0, 0, capture.scaledWidth);
    let leftHandY = map(lerpLandmarks[0][19].y, 0, 1, 0, capture.scaledHeight);

    // right hand
    let rightHandX = map(lerpLandmarks[0][20].x, 1, 0, 0, capture.scaledWidth);
    let rightHandY = map(lerpLandmarks[0][20].y, 0, 1, 0, capture.scaledHeight);

    // left Elbow
    let leftElbowX = map(lerpLandmarks[0][13].x, 1, 0, 0, capture.scaledWidth);
    let leftElbowY = map(lerpLandmarks[0][13].y, 0, 1, 0, capture.scaledHeight);

    // right Elbow
    let rightElbowX = map(lerpLandmarks[0][14].x, 1, 0, 0, capture.scaledWidth);
    let rightElbowY = map(lerpLandmarks[0][14].y, 0, 1, 0, capture.scaledHeight);

    // right wrist
    let rightWristX = map(lerpLandmarks[0][16].x, 1, 0, 0, capture.scaledWidth);
    let rightWristY = map(lerpLandmarks[0][16].y, 0, 1, 0, capture.scaledHeight);

    // left wrist
    let leftWristX = map(lerpLandmarks[0][15].x, 1, 0, 0, capture.scaledWidth);
    let leftWristY = map(lerpLandmarks[0][15].y, 0, 1, 0, capture.scaledHeight);

    // right hip
    let hipX = map(lerpLandmarks[0][24].x, 1, 0, 0, capture.scaledWidth);
    let hipY = map(lerpLandmarks[0][24].y, 0, 1, 0, capture.scaledHeight);

    // left hip
    let hipX2 = map(lerpLandmarks[0][23].x, 1, 0, 0, capture.scaledWidth);
    let hipY2 = map(lerpLandmarks[0][23].y, 0, 1, 0, capture.scaledHeight);

    // right knee
    let kneeX = map(lerpLandmarks[0][26].x, 1, 0, 0, capture.scaledWidth);
    let kneeY = map(lerpLandmarks[0][26].y, 0, 1, 0, capture.scaledHeight);

    // left knee
    let kneeX2 = map(lerpLandmarks[0][25].x, 1, 0, 0, capture.scaledWidth);
    let kneeY2 = map(lerpLandmarks[0][25].y, 0, 1, 0, capture.scaledHeight);

    // right ankle
    let ankleX = map(lerpLandmarks[0][28].x, 1, 0, 0, capture.scaledWidth);
    let ankleY = map(lerpLandmarks[0][28].y, 0, 1, 0, capture.scaledHeight);

    // left ankle
    let ankleX2 = map(lerpLandmarks[0][27].x, 1, 0, 0, capture.scaledWidth);
    let ankleY2 = map(lerpLandmarks[0][27].y, 0, 1, 0, capture.scaledHeight);

    // right foot
    let rightFootX = map(lerpLandmarks[0][30].x, 1, 0, 0, capture.scaledWidth);
    let rightFootY = map(lerpLandmarks[0][30].y, 0, 1, 0, capture.scaledHeight);

    // left foot
    let leftFootX = map(lerpLandmarks[0][29].x, 1, 0, 0, capture.scaledWidth);
    let leftFootY = map(lerpLandmarks[0][29].y, 0, 1, 0, capture.scaledHeight);

    // right foot2
    let rightFoot2X = map(lerpLandmarks[0][32].x, 1, 0, 0, capture.scaledWidth);
    let rightFoot2Y = map(lerpLandmarks[0][32].y, 0, 1, 0, capture.scaledHeight);

    // left foot2
    let leftFoot2X = map(lerpLandmarks[0][31].x, 1, 0, 0, capture.scaledWidth);
    let leftFoot2Y = map(lerpLandmarks[0][31].y, 0, 1, 0, capture.scaledHeight);

    





    push();
    centerOurStuff();

  
  //     // puppet lines
  // strokeWeight(5);
  // stroke('grey');
  // line(rightShoulderX, rightShoulderY, rightShoulderX, 0); // nose to left shoulder
  // line(leftShoulderX, leftShoulderY, leftShoulderX, 0); // nose to right shoulder
  
  // line(rightElbowX, rightElbowY, rightElbowX, 0); // right shoulder to right elbow
  // line(leftElbowX, leftElbowY, leftElbowX, 0); // shoulder to elbow
  // line(rightWristX, rightWristY, rightWristX, 0); // right wrist to right hand
  // line(leftWristX, leftWristY, leftWristX, 0); // left wrist to left hand
  // line(hipX, hipY, hipX, 0); // right shoulder to right hip
  // line(hipX2, hipY2, hipX2, 0); // left shoulder to left hip
  // line(kneeX, kneeY, kneeX, 0); // right hip to right knee
  // line(kneeX2, kneeY2, kneeX2, 0); // left hip to left knee
  // line(rightHandX, rightHandY, rightHandX, 0); // right knee to right ankle
  // line(leftHandX, leftHandY, leftHandX, 0); // left knee to left ankle

    // skeleton
    stroke('white');
    strokeWeight(50);
    line(rightShoulderX, rightShoulderY, leftShoulderX, leftShoulderY); // nose to left shoulder
    line(rightShoulderX, rightShoulderY, rightElbowX, rightElbowY); // nose to right shoulder
    line(rightElbowX, rightElbowY, rightWristX, rightWristY); // right shoulder to right elbow  
    line(leftShoulderX, leftShoulderY, leftElbowX, leftElbowY); // shoulder to elbow
    line(leftElbowX, leftElbowY, leftWristX, leftWristY); // elbow to wrist
    line(rightWristX, rightWristY, rightHandX, rightHandY); // right wrist to right hand  
    line(leftWristX, leftWristY, leftHandX, leftHandY); // left wrist to left hand
    line(rightShoulderX, rightShoulderY, hipX, hipY); // right shoulder to right hip
    line(leftShoulderX, leftShoulderY, hipX2, hipY2); // left shoulder to left hip
    line(hipX, hipY, kneeX, kneeY); // right hip to right knee
    line(hipX2, hipY2, kneeX2, kneeY2); // left hip to left knee
    line(kneeX, kneeY, ankleX, ankleY); // right knee to right ankle
    line(kneeX2, kneeY2, ankleX2, ankleY2); // left knee to left ankle
    line(ankleX, ankleY, rightFootX, rightFootY); // right ankle to right foot
    line(ankleX2, ankleY2, leftFootX, leftFootY); // left ankle to left foot
    line(rightFootX, rightFootY, rightFoot2X, rightFoot2Y); // right foot to right foot2
    line(leftFootX, leftFootY, leftFoot2X, leftFoot2Y); // left foot to left foot2
    line(hipX, hipY, hipX2, hipY2); // right hip to left hip
    line((rightShoulderX + leftShoulderX)/2, (rightShoulderY + leftShoulderY)/2, noseX, noseY); // right shoulder to right elbow
   

    // draw labels
    fill('red');
    textSize(letterSize);
    noStroke();
    text("nose", noseX + 20, noseY); // nose
    text("left shoulder", leftShoulderX - 120, leftShoulderY); // left shoulder
    text("right shoulder", rightShoulderX + 20, rightShoulderY); // right shoulder
    text("left hand", leftHandX  - 120, leftHandY); // left hand
    text("right hand", rightHandX + 20, rightHandY); // right hand
    text("left elbow", leftElbowX  - 120, leftElbowY); // left elbow
    text("right elbow", rightElbowX + 20, rightElbowY); // right elbow
    text("right wrist", rightWristX + 20, rightWristY); // right wrist
    text("left wrist", leftWristX  - 120, leftWristY); // left wrist
    text("right hip", hipX + 20, hipY); // right hip
    text("left hip", hipX2  - 120, hipY2); // left hip
    text("right knee", kneeX + 20, kneeY); // right knee
    text("left knee", kneeX2  - 120, kneeY2); // left knee
    text("right ankle", ankleX + 20, ankleY); // right ankle
    text("left ankle", ankleX2  - 120, ankleY2); // left ankle
    text("right foot", rightFootX + 20, rightFootY); // right foot
    text("left foot", leftFootX  - 120, leftFootY); // left foot


      // draw points
   
      strokeWeight(20);
      // stroke('red');
      
      // fill('white');
      ellipse(noseX, noseY, ellipseSize + 100, ellipseSize + 150); // nose
  
    
      ellipse(leftShoulderX, leftShoulderY, ellipseSize, ellipseSize); // left shoulder
      ellipse(rightShoulderX, rightShoulderY, ellipseSize, ellipseSize); // right shoulder
      ellipse(leftHandX, leftHandY, ellipseSize, ellipseSize); // left hand
      ellipse(rightHandX, rightHandY, ellipseSize, ellipseSize); // right hand
      ellipse(leftElbowX, leftElbowY, ellipseSize, ellipseSize); // left elbow
      ellipse(rightElbowX, rightElbowY, ellipseSize, ellipseSize); // right elbow
      ellipse(rightWristX, rightWristY, ellipseSize, ellipseSize); // right wrist
      ellipse(leftWristX, leftWristY, ellipseSize, ellipseSize); // left wrist
      ellipse(hipX, hipY, ellipseSize, ellipseSize); // right hip
      ellipse(hipX2, hipY2, ellipseSize, ellipseSize); // left hip
      ellipse(kneeX, kneeY, ellipseSize, ellipseSize); // right knee
      ellipse(kneeX2, kneeY2, ellipseSize, ellipseSize); // left knee
      ellipse(ankleX, ankleY, ellipseSize, ellipseSize); // right ankle
      ellipse(ankleX2, ankleY2, ellipseSize, ellipseSize); // left ankle
      ellipse(rightFootX, rightFootY, ellipseSize, ellipseSize); // right foot
      ellipse(leftFootX, leftFootY, ellipseSize, ellipseSize); // left foot
      ellipse(rightFoot2X, rightFoot2Y, ellipseSize, ellipseSize); // right foot2
      ellipse(leftFoot2X, leftFoot2Y, ellipseSize, ellipseSize); // left foot2

    

    pop();

  }
}


/* - - Helper functions - - */

// function: launch webcam
function captureWebcam() {
  capture = createCapture(
    {
      audio: false,
      video: {
        facingMode: "user",
      },
    },
    function (e) {
      captureEvent = e;
      console.log(captureEvent.getTracks()[0].getSettings());
      // do things when video ready
      // until then, the video element will have no dimensions, or default 640x480
      capture.srcObject = e;

      setCameraDimensions(capture);
      mediaPipe.predictWebcam(capture);
      //mediaPipe.predictWebcam(parentDiv);
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.hide();
}

// function: resize webcam depending on orientation
function setCameraDimensions(video) {

  const vidAspectRatio = video.width / video.height; // aspect ratio of the video
  const canvasAspectRatio = width / height; // aspect ratio of the canvas

  if (vidAspectRatio > canvasAspectRatio) {

    // Image is wider than canvas aspect ratio
    video.scaledHeight = height;
    video.scaledWidth = video.scaledHeight * vidAspectRatio;
  } else {
    // Image is taller than canvas aspect ratio
    video.scaledWidth = width;
    video.scaledHeight = video.scaledWidth / vidAspectRatio;
  }
}


// function: center our stuff
function centerOurStuff() {
  translate(width / 2 - capture.scaledWidth / 2, height / 2 - capture.scaledHeight / 2); // center the webcam
}

// function: window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCameraDimensions(capture);
}
