function makeEditable (div) {
    div.contentEditable = true;
}

function makeReadonly (div) {
    div.contentEditable = false;
}

document.getElementById('progressBar').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft;
    var startPos = document.getElementById('progressBar').position;
    var xconvert = x/300;
    var finalx = (xconvert).toFixed(1);
    document.getElementById('progressBar').value = finalx;
});


document.getElementById('progressBar1').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft;
    var startPos = document.getElementById('progressBar1').position;
    var xconvert = x/300;
    var finalx = (xconvert).toFixed(1);
    document.getElementById('progressBar1').value = finalx;
});

document.getElementById('progressBar2').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft;
    var startPos = document.getElementById('progressBar2').position;
    var xconvert = x/300;
    var finalx = (xconvert).toFixed(2);
    document.getElementById('progressBar2').value = finalx;
});

document.getElementById('progressBar3').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft;
    var startPos = document.getElementById('progressBar3').position;
    var xconvert = x/300;
    var finalx = (xconvert).toFixed(2);
    document.getElementById('progressBar3').value = finalx;
});

function downloadtable() {

    var node = document.getElementById('tablecontainer');

    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            downloadURI(dataUrl, "Persona.png")
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}



function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
