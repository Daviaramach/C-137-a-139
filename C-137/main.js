img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide();

    //Código Antigo
    //objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    //document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function preload() {
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(video, 0, 0, 380, 380)
    //image(img,0, 0, 640, 420);

    if(status !="")
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++) {
                document.getElementById("status").innerHTML = "Status: Objeto Detectado!";
                document.getElementById("numberOfObjects").innerHTML = "Quantidade de objetos detectados: "+ objects.length;
                fill(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y,objects[i].width, objects[i].heigth);
            }
        }

        //Código Antigo com detecção manual
    // fill("#FF0000");
    // text("Dog", 45, 75);
    // text("Cat", 225, 80);
    // noFill();
    // stroke("#FF0000");
    // rect(30, 60, 450, 350 );
    // rect(210, 65, 420, 330);
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}




