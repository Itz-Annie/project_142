song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses()
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+ scoreRightWrist + "scoreLeftWrist = "+ scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWistX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    if(scoreLeftWrist > 0.2)
    {
        song1.play();
        song1.setVolume(1);
        song1.rate(1)
        song2.stop();        
        document.getElementById("song_name").innerHTML = "Now Playing Horro Song"
    }
    if(scoreRightWrist > 0.2)
    {
        song2.play();
        song2.setVolume(1);
        song2.rate(1)
        song1.stop();  
        document.getElementById("song_name").innerHTML = "Now Playing Peter Pan"      
    }


}


