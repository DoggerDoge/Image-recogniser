Webcam.set({
    width: 400,
    height: 300,
    image_format: "png",
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function snapshot() {
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageclassifier('https://teachablemachine.withgoogle.com/models/K2RnD_4So/', modelLoaded);

function modelLoaded() {
    console.log('modelLoaded!');
}

function identify() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("objectName").innerHTML=results[0].label;
        document.getElementById("accuracyValue").innerHTML=results[0].confidence.tofixed(3);
    }
}



